export type ContactMethod = 'email' | 'phone'

export type ConsultationInput = {
  requestId: string
  fullName: string
  email: string
  contactMethod: ContactMethod
  phone: string
  treatmentInterest: string
  preferredDate: string
  preferredTimeWindow: string
  marketingConsent: boolean
  privacyAccepted: boolean
}

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>

export const timeWindows = [
  { value: '', label: 'No preference' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'late-afternoon', label: 'Late afternoon' },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function emptyConsultation(): ConsultationInput {
  return {
    requestId:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `req-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    fullName: '',
    email: '',
    contactMethod: 'email',
    phone: '',
    treatmentInterest: 'Not sure yet',
    preferredDate: '',
    preferredTimeWindow: '',
    marketingConsent: false,
    privacyAccepted: false,
  }
}

/** Mirrors the server rules so inline errors appear before a request is sent. */
export function validateConsultation(input: ConsultationInput): FieldErrors {
  const errors: FieldErrors = {}
  const name = input.fullName.trim()

  if (name.length < 2) errors.fullName = 'Enter your full name.'
  else if (name.length > 100) errors.fullName = 'Please use 100 characters or fewer.'

  const email = input.email.trim()
  if (!email) errors.email = 'Enter an email address so the clinic can reply.'
  else if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.'
  else if (email.length > 254) errors.email = 'Please use a shorter email address.'

  if (input.contactMethod === 'phone' && input.phone.trim().length < 5) {
    errors.phone = 'Enter a phone number for phone contact.'
  }

  if (input.preferredDate) {
    const chosen = new Date(`${input.preferredDate}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (Number.isNaN(chosen.getTime())) errors.preferredDate = 'Enter a valid date.'
    else if (chosen < today) errors.preferredDate = 'Choose today or a later date.'
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted = 'Please acknowledge the privacy notice to continue.'
  }

  return errors
}

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fields?: FieldErrors }

export async function submitConsultation(input: ConsultationInput): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (response.status === 201) {
      const data = (await response.json()) as { reference?: string }
      return { ok: true, reference: data.reference ?? '' }
    }

    if (response.status === 400) {
      const data = (await response.json()) as { fields?: FieldErrors }
      return {
        ok: false,
        message: 'Please check the highlighted fields and try again.',
        fields: data.fields ?? {},
      }
    }

    if (response.status === 429) {
      return {
        ok: false,
        message:
          'Too many requests have been sent from this connection. Please wait a few minutes before trying again.',
      }
    }

    return {
      ok: false,
      message:
        'The request could not be sent just now. Nothing has been submitted — please try again, or contact the clinic once contact details are available.',
    }
  } catch {
    return {
      ok: false,
      message:
        'The request could not reach the clinic. Check your connection and try again — nothing has been submitted.',
    }
  }
}
