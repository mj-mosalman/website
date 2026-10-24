/**
 * Clinic settings and verified contact details.
 *
 * Nothing here is verified clinic information yet: contact fields are `null` and
 * `contactVerified` is false, so the interface must not present an address,
 * phone number or email address as real. Replace these values with verified
 * details before launch.
 */

export type ContactDetails = {
  phone: string | null
  email: string | null
  addressLines: string[] | null
  openingHours: string[] | null
  directionsUrl: string | null
}

export const clinic = {
  name: 'Aurelia Aesthetic Clinic',
  wordmark: { first: 'Aurelia', second: 'Aesthetic Clinic' },
  monogram: 'A',
  tagline:
    'A considered approach to aesthetic care, shaped around individual goals and informed choices.',
  shortDescription:
    'A quiet clinic for considered aesthetic medicine: consultation first, individual planning, and clear expectations at every step.',
  generalDisclaimer:
    'Information on this website is general. It is not a substitute for an individual consultation or for medical advice from a qualified practitioner.',
  consultationPolicy:
    'Submitting this form requests a consultation. Your appointment is confirmed only after the clinic contacts you.',
  enquiryPrivacy:
    'We ask only for what is needed to arrange contact. Do not include medical history, photographs or identity documents.',
  jurisdiction: null as string | null,
  contactVerified: false,
  contact: {
    phone: null,
    email: null,
    addressLines: null,
    openingHours: null,
    directionsUrl: null,
  } as ContactDetails,
  socials: [] as { label: string; href: string }[],
  legal: {
    privacyLastUpdated: '24 October 2026',
    policyStatus:
      'Review notice: this notice is a working draft. It requires review against the clinic’s jurisdiction, retention policy and data-processing arrangements before launch.',
  },
}

export function hasVerifiedContact(): boolean {
  const { phone, email, addressLines } = clinic.contact
  return Boolean(phone || email || addressLines)
}
