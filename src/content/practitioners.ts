/**
 * Care team records.
 *
 * No verified practitioner information has been supplied, so every record is an
 * explicitly labelled development placeholder with no invented name,
 * qualification, registration number or biography. Replace `profileStatus` with
 * `verified` only once the clinic has confirmed the details.
 */

export type Practitioner = {
  id: string
  slug: string
  fullName: string | null
  professionalTitle: string
  qualifications: string[]
  registration: string | null
  areasOfPractice: string[]
  languages: string[]
  summary: string | null
  profileStatus: 'verified' | 'placeholder'
  portraitAlt: string | null
}

export const practitioners: Practitioner[] = [
  {
    id: 'pr-medical-director',
    slug: 'medical-director',
    fullName: null,
    professionalTitle: 'Medical Director — Aesthetic Medicine',
    qualifications: [],
    registration: null,
    areasOfPractice: ['Aesthetic medicine consultations', 'Facial assessment'],
    languages: [],
    summary: null,
    profileStatus: 'placeholder',
    portraitAlt: null,
  },
  {
    id: 'pr-dermatology',
    slug: 'consultant-dermatologist',
    fullName: null,
    professionalTitle: 'Consultant Dermatologist',
    qualifications: [],
    registration: null,
    areasOfPractice: ['Skin assessment', 'Skin-quality treatment planning'],
    languages: [],
    summary: null,
    profileStatus: 'placeholder',
    portraitAlt: null,
  },
  {
    id: 'pr-nursing',
    slug: 'aesthetic-nurse-specialist',
    fullName: null,
    professionalTitle: 'Aesthetic Nurse Specialist',
    qualifications: [],
    registration: null,
    areasOfPractice: ['Skin treatments', 'Laser treatments'],
    languages: [],
    summary: null,
    profileStatus: 'placeholder',
    portraitAlt: null,
  },
]

export const teamContentStatus = {
  verified: false,
  notice:
    'Development placeholder. Practitioner names, qualifications, registration details and portraits have not been supplied, and nothing on this page identifies a real member of staff.',
  requirements: [
    'Full name and professional title',
    'Verified qualifications and registration or licence number',
    'Scope of practice and treatments provided',
    'Languages spoken, where relevant',
    'A portrait authorised for publication',
  ],
}
