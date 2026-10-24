import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from '../../router/Router'
import { publishedTreatments } from '../../content/treatments'
import { clinic } from '../../content/clinic'
import {
  emptyConsultation,
  submitConsultation,
  timeWindows,
  validateConsultation,
  type ConsultationInput,
  type FieldErrors,
} from '../../lib/consultation'
import { Button } from '../ui/Button'

function todayIso(): string {
  const now = new Date()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  const day = `${now.getDate()}`.padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

type FieldProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

function Field({ id, label, required = false, error, hint, children }: FieldProps) {
  return (
    <div className={`field${error ? ' field--invalid' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        <span className="field__requirement">{required ? 'Required' : 'Optional'}</span>
      </label>
      {children}
      {hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
}

export function ConsultationForm() {
  const [values, setValues] = useState<ConsultationInput>(emptyConsultation)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')
  const alertRef = useRef<HTMLDivElement>(null)

  const update = (patch: Partial<ConsultationInput>) =>
    setValues((current) => ({ ...current, ...patch }))

  const focusAlert = () => {
    window.setTimeout(() => alertRef.current?.focus(), 0)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validateConsultation(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setMessage('Please check the highlighted fields before sending your request.')
      focusAlert()
      return
    }

    setStatus('submitting')
    setMessage('')

    const result = await submitConsultation(values)

    if (result.ok) {
      setStatus('success')
      setReference(result.reference)
      setErrors({})
      return
    }

    setStatus('error')
    setMessage(result.message)
    setErrors(result.fields ?? {})
    focusAlert()
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <p className="label">Request received</p>
        <h3 className="form-success__title">Your consultation request has been received.</h3>
        <p>
          The clinic will contact you to discuss availability. Your appointment is
          confirmed only after the clinic contacts you.
        </p>
        {reference ? (
          <p className="form-success__reference">
            Your reference is <strong>{reference}</strong>. Please quote it if you get in
            touch.
          </p>
        ) : null}
        <ul className="form-success__next">
          <li>The clinic reviews your request and the treatment you selected.</li>
          <li>You are contacted using the method you chose.</li>
          <li>Availability and next steps are agreed directly with the clinic.</li>
        </ul>
        <p className="note">
          No appointment is reserved by this request, and no confirmation email has
          been sent automatically.
        </p>
        <Link to="/treatments" className="arrow-link">
          <span>Continue exploring treatments</span>
          <span aria-hidden="true" className="arrow-link__icon">
            →
          </span>
        </Link>
      </div>
    )
  }

  return (
    <form className="consultation-form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && message ? (
        <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef}>
          <p className="form-alert__title">Your request was not sent</p>
          <p>{message}</p>
        </div>
      ) : null}

      <div className="form-grid">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="fullName"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.fullName}
            onChange={(event) => update({ fullName: event.target.value })}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName', errors.fullName)}
          />
        </Field>

        <Field id="email" label="Email address" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={values.email}
            onChange={(event) => update({ email: event.target.value })}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email', errors.email)}
          />
        </Field>
      </div>

      <fieldset className="field field--group">
        <legend className="field__label">
          Preferred contact method
          <span className="field__requirement">Required</span>
        </legend>
        <div className="radio-row">
          <label className="radio">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={values.contactMethod === 'email'}
              onChange={() => update({ contactMethod: 'email' })}
            />
            <span>Email</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={values.contactMethod === 'phone'}
              onChange={() => update({ contactMethod: 'phone' })}
            />
            <span>Phone call</span>
          </label>
        </div>
      </fieldset>

      {values.contactMethod === 'phone' ? (
        <Field
          id="phone"
          label="Phone number"
          required
          error={errors.phone}
          hint="Used only to arrange your consultation."
        >
          <input
            id="phone"
            name="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={32}
            value={values.phone}
            onChange={(event) => update({ phone: event.target.value })}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone', errors.phone, 'hint')}
          />
        </Field>
      ) : null}

      <Field id="treatmentInterest" label="Treatment interest" hint="Choose one, or leave it open.">
        <select
          id="treatmentInterest"
          name="treatmentInterest"
          value={values.treatmentInterest}
          onChange={(event) => update({ treatmentInterest: event.target.value })}
          aria-describedby={describedBy('treatmentInterest', undefined, 'hint')}
        >
          <option value="Not sure yet">Not sure yet</option>
          {publishedTreatments.map((treatment) => (
            <option key={treatment.id} value={treatment.title}>
              {treatment.title}
            </option>
          ))}
        </select>
      </Field>

      <div className="form-grid">
        <Field
          id="preferredDate"
          label="Preferred date"
          error={errors.preferredDate}
          hint="A preference only — not a reserved appointment."
        >
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={todayIso()}
            value={values.preferredDate}
            onChange={(event) => update({ preferredDate: event.target.value })}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={describedBy('preferredDate', errors.preferredDate, 'hint')}
          />
        </Field>

        <Field id="preferredTimeWindow" label="Preferred time" hint="A preference only.">
          <select
            id="preferredTimeWindow"
            name="preferredTimeWindow"
            value={values.preferredTimeWindow}
            onChange={(event) => update({ preferredTimeWindow: event.target.value })}
            aria-describedby={describedBy('preferredTimeWindow', undefined, 'hint')}
          >
            {timeWindows.map((window) => (
              <option key={window.value} value={window.value}>
                {window.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <p className="form-note">
        {clinic.enquiryPrivacy} Please do not include medical history, photographs or
        identity documents.
      </p>

      <div className="checkbox-stack">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={values.privacyAccepted}
            onChange={(event) => update({ privacyAccepted: event.target.checked })}
            aria-invalid={Boolean(errors.privacyAccepted)}
            aria-describedby={describedBy('privacyAccepted', errors.privacyAccepted)}
            id="privacyAccepted"
          />
          <span>
            I have read the{' '}
            <Link to="/privacy" className="inline-link">
              privacy notice
            </Link>{' '}
            and understand that this form requests a consultation.{' '}
            <span className="field__requirement">Required</span>
          </span>
        </label>
        {errors.privacyAccepted ? (
          <p className="field__error" id="privacyAccepted-error">
            {errors.privacyAccepted}
          </p>
        ) : null}

        <label className="checkbox">
          <input
            type="checkbox"
            checked={values.marketingConsent}
            onChange={(event) => update({ marketingConsent: event.target.checked })}
          />
          <span>
            I am happy to receive occasional clinic news. This is optional and does not
            affect my request.
          </span>
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending request…' : 'Request a Consultation'}
        </Button>
        <p className="form-actions__note" aria-live="polite">
          {status === 'submitting'
            ? 'Sending your request…'
            : 'Requests are reviewed by the clinic. Nothing is booked automatically.'}
        </p>
      </div>
    </form>
  )
}
