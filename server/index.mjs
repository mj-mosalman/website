import { createServer } from 'node:http'
import { appendFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { randomBytes } from 'node:crypto'

/**
 * Consultation request service.
 *
 * Receives only the information needed to arrange contact, validates it
 * server-side, rate-limits by client address and appends accepted requests to a
 * file that the clinic can read. Nothing is emailed and no appointment is booked.
 * Request contents are never written to logs.
 */

const PORT = Number(process.env.API_PORT ?? 8787)
const DATA_DIR = process.env.DATA_DIR ?? '/data'
const STORE = join(DATA_DIR, 'consultations.jsonl')

const MAX_BODY_BYTES = 16 * 1024
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const requestIdPattern = /^[A-Za-z0-9-]{8,64}$/
const timeWindows = new Set(['', 'morning', 'afternoon', 'late-afternoon'])

/** client address -> recent request timestamps */
const rateLimit = new Map()
/** requestId -> reference, so a retried submission does not create a duplicate */
const accepted = new Map()

function send(response, status, body, extraHeaders = {}) {
  const payload = JSON.stringify(body)
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  })
  response.end(payload)
}

function clientAddress(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return request.socket.remoteAddress ?? 'unknown'
}

function isRateLimited(address) {
  const now = Date.now()
  const recent = (rateLimit.get(address) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  rateLimit.set(address, recent)
  if (rateLimit.size > 5000) rateLimit.clear()
  return recent.length > MAX_PER_WINDOW
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []

    request.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('payload_too_large'))
        request.destroy()
        return
      }
      chunks.push(chunk)
    })

    request.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('invalid_json'))
      }
    })

    request.on('error', () => reject(new Error('read_error')))
  })
}

function asString(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function validate(payload) {
  const fields = {}

  const fullName = asString(payload.fullName, 100)
  if (fullName.length < 2) fields.fullName = 'Enter your full name.'

  const email = asString(payload.email, 254)
  if (!email) fields.email = 'Enter an email address so the clinic can reply.'
  else if (!emailPattern.test(email)) fields.email = 'Enter a valid email address.'

  const contactMethod = payload.contactMethod === 'phone' ? 'phone' : 'email'

  const phone = asString(payload.phone, 32)
  if (contactMethod === 'phone' && phone.length < 5) {
    fields.phone = 'Enter a phone number for phone contact.'
  }
  if (phone && !/^[0-9+()\-.\s]{5,32}$/.test(phone)) {
    fields.phone = 'Enter a phone number using digits, spaces and + ( ) - only.'
  }

  const treatmentInterest = asString(payload.treatmentInterest, 100) || 'Not sure yet'

  const preferredDate = asString(payload.preferredDate, 10)
  if (preferredDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      fields.preferredDate = 'Enter a valid date.'
    } else {
      const chosen = new Date(`${preferredDate}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (Number.isNaN(chosen.getTime())) fields.preferredDate = 'Enter a valid date.'
      else if (chosen < today) fields.preferredDate = 'Choose today or a later date.'
    }
  }

  const preferredTimeWindow = asString(payload.preferredTimeWindow, 20)
  if (!timeWindows.has(preferredTimeWindow)) {
    fields.preferredTimeWindow = 'Choose one of the listed time windows.'
  }

  const requestId = asString(payload.requestId, 64)
  if (!requestIdPattern.test(requestId)) {
    fields.requestId = 'Invalid request identifier.'
  }

  if (payload.privacyAccepted !== true) {
    fields.privacyAccepted = 'Please acknowledge the privacy notice to continue.'
  }

  return {
    fields,
    record: {
      fullName,
      email,
      contactMethod,
      phone: contactMethod === 'phone' ? phone : '',
      treatmentInterest,
      preferredDate,
      preferredTimeWindow,
      marketingConsent: payload.marketingConsent === true,
      requestId,
    },
  }
}

function reference() {
  return `AR-${randomBytes(4).toString('hex').toUpperCase()}`
}

async function handleConsultation(request, response) {
  const address = clientAddress(request)

  if (isRateLimited(address)) {
    send(
      response,
      429,
      { error: 'rate_limited' },
      { 'Retry-After': String(Math.ceil(WINDOW_MS / 1000)) },
    )
    return
  }

  let payload
  try {
    payload = await readJsonBody(request)
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === 'payload_too_large'
    send(response, tooLarge ? 413 : 400, {
      error: tooLarge ? 'payload_too_large' : 'invalid_json',
    })
    return
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    send(response, 400, { error: 'invalid_json' })
    return
  }

  const { fields, record } = validate(payload)

  if (Object.keys(fields).length > 0) {
    // Field names and messages only; submitted values are never echoed back or logged.
    send(response, 400, { error: 'validation_failed', fields })
    return
  }

  if (accepted.has(record.requestId)) {
    send(response, 201, { ok: true, reference: accepted.get(record.requestId), duplicate: true })
    return
  }

  const newReference = reference()

  try {
    await mkdir(DATA_DIR, { recursive: true })
    await appendFile(
      STORE,
      `${JSON.stringify({ reference: newReference, receivedAt: new Date().toISOString(), ...record })}\n`,
      { mode: 0o600 },
    )
  } catch {
    console.error('consultation store unavailable')
    send(response, 503, { error: 'store_unavailable' })
    return
  }

  accepted.set(record.requestId, newReference)
  if (accepted.size > 2000) {
    const oldest = accepted.keys().next().value
    if (oldest !== undefined) accepted.delete(oldest)
  }

  send(response, 201, { ok: true, reference: newReference })
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost')
  const path = url.pathname

  if (path === '/api/health' && request.method === 'GET') {
    send(response, 200, { status: 'ok' })
    return
  }

  if (path === '/api/consultations') {
    if (request.method !== 'POST') {
      send(response, 405, { error: 'method_not_allowed' }, { Allow: 'POST' })
      return
    }
    handleConsultation(request, response).catch(() => {
      if (!response.headersSent) send(response, 500, { error: 'server_error' })
    })
    return
  }

  send(response, 404, { error: 'not_found' })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`consultation service listening on port ${PORT}`)
})

const shutdown = () => {
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 5000).unref()
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
