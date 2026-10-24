/**
 * Treatment content.
 *
 * Every record is deliberately conservative: no prices, durations, outcome
 * statistics or recovery timelines are stated because none have been verified by
 * the clinic. Medical-review fields stay empty until a qualified practitioner
 * reviews the copy.
 */

export type TreatmentCategory =
  | 'Consultation'
  | 'Skin Quality'
  | 'Skin Renewal'
  | 'Skin Texture'
  | 'Laser Treatments'
  | 'Skin Concerns'
  | 'Aesthetic Medicine'

export type ConcernId =
  | 'skin-texture'
  | 'uneven-tone'
  | 'unwanted-hair'
  | 'visible-signs-of-ageing'
  | 'facial-balance'

export type ArtTone =
  | 'sand'
  | 'clay'
  | 'sage'
  | 'stone'
  | 'linen'
  | 'dusk'
  | 'pearl'
  | 'moss'

export type Faq = { question: string; answer: string }

export type Treatment = {
  id: string
  slug: string
  title: string
  category: TreatmentCategory
  shortDescription: string
  overview: string[]
  concerns: ConcernId[]
  concernsDiscussed: string[]
  consultationCovers: string[]
  suitabilityNotes: string[]
  preparation: string[]
  recoveryNotes: string[]
  risksAndLimitations: string[]
  aftercare: string[]
  frequentlyAskedQuestions: Faq[]
  relatedTreatmentIds: string[]
  image: ArtTone
  imageAlt: string
  featured: boolean
  publicationStatus: 'published' | 'draft'
  medicalReviewStatus: 'pending-review' | 'reviewed'
  medicallyReviewedBy: string | null
  lastReviewedAt: string | null
  indicativeDuration: string | null
  priceFrom: number | null
  currency: string | null
  practitionerIds: string[]
}

export const concerns: { id: ConcernId; label: string }[] = [
  { id: 'skin-texture', label: 'Skin texture' },
  { id: 'uneven-tone', label: 'Uneven-looking tone' },
  { id: 'unwanted-hair', label: 'Unwanted hair' },
  { id: 'visible-signs-of-ageing', label: 'Visible signs of ageing' },
  { id: 'facial-balance', label: 'Facial balance' },
]

export const treatments: Treatment[] = [
  {
    id: 'tr-consultation',
    slug: 'aesthetic-consultation',
    title: 'Aesthetic Consultation',
    category: 'Consultation',
    shortDescription:
      'A dedicated conversation about your concerns, goals, and appropriate next steps.',
    overview: [
      'An aesthetic consultation is the starting point for care at Aurelia. It is a conversation rather than a treatment appointment: we take time to understand what you have noticed, what you would like to change, and which options would be appropriate to consider.',
      'The discussion usually covers your skin history, any previous aesthetic treatments and the general health factors that matter for the options you are interested in. You are under no obligation to proceed with anything discussed.',
    ],
    concerns: [],
    concernsDiscussed: [
      'What you would like to address, and why it matters to you',
      'Your skin history, sensitivity and relevant general health',
      'Previous aesthetic treatments and how you responded',
      'Anything you would prefer to avoid',
      'The realistic limits of what aesthetic treatment can achieve',
    ],
    consultationCovers: [
      'An assessment of your concerns and an explanation of available options',
      'A discussion of suitability, including when treatment should be declined or deferred',
      'Expected recovery and aftercare in practical terms',
      'A written summary of what was discussed, so you can consider it in your own time',
    ],
    suitabilityNotes: [
      'Open to anyone considering aesthetic treatment for the first time',
      'Useful for reviewing an existing treatment plan or a previous result',
      'No treatment is performed during this appointment',
    ],
    preparation: [
      'No preparation is required',
      'It helps to bring a note of current skin-care products and any treatments in the past twelve months',
    ],
    recoveryNotes: ['No recovery time is needed, as no treatment is performed.'],
    risksAndLimitations: [
      'A consultation does not guarantee that a treatment is appropriate for you',
      'A practitioner may recommend declining or deferring treatment where suitability is unclear',
      'Aesthetic treatment is not a substitute for medical care of a skin condition',
    ],
    aftercare: [
      'You will receive a written summary of what was discussed',
      'Take as long as you need before deciding whether to proceed',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Do I need to know which treatment I want?',
        answer:
          'No. Most consultations begin with a concern rather than a treatment name. Part of the conversation is identifying which options are appropriate, if any.',
      },
      {
        question: 'Will I be asked to decide on the day?',
        answer:
          'No. There is no expectation or pressure to proceed during the appointment.',
      },
      {
        question: 'Is this the same as a dermatology appointment?',
        answer:
          'No. An aesthetic consultation covers aesthetic options. Concerns that need medical assessment are referred appropriately.',
      },
    ],
    relatedTreatmentIds: ['tr-skin-quality', 'tr-wrinkle-consultation'],
    image: 'linen',
    imageAlt: 'Illustrative warm ivory and stone composition suggesting a quiet consultation space.',
    featured: true,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-skin-quality',
    slug: 'personalised-skin-treatments',
    title: 'Personalised Skin Treatments',
    category: 'Skin Quality',
    shortDescription:
      'Skin-focused treatment options discussed around your skin history, preferences, and suitability.',
    overview: [
      'Skin quality treatments are planned around the condition of your skin, your history and what you would like to change. There is no single protocol: the combination of options, and the interval between them, differs between people.',
      'This page explains what a plan usually involves and what is discussed before one is agreed. It does not recommend a specific treatment.',
    ],
    concerns: ['skin-texture', 'uneven-tone'],
    concernsDiscussed: [
      'Texture, tone and how your skin behaves day to day',
      'Sensitivity, reactivity and previous reactions',
      'Current skin-care routine and how much you want to change it',
      'Your tolerance for recovery time',
    ],
    consultationCovers: [
      'A skin assessment and a discussion of what is realistic to change',
      'The options that are appropriate, and those that are not',
      'A proposed sequence, with review points',
      'Aftercare, and what to avoid while the skin settles',
    ],
    suitabilityNotes: [
      'Suitability depends on skin condition, history and any relevant medication',
      'Some options are not appropriate during pregnancy or breastfeeding',
      'Active skin infection or irritation may mean deferring treatment',
    ],
    preparation: [
      'Come with a clean face if possible, so the skin can be assessed directly',
      'Bring details of products and any recent treatments',
    ],
    recoveryNotes: [
      'Recovery depends on the specific options selected',
      'Your practitioner will explain what to expect for your plan during consultation',
    ],
    risksAndLimitations: [
      'Response varies between individuals and cannot be guaranteed',
      'Some options carry a risk of temporary redness, sensitivity or pigmentation change',
      'Results are usually gradual and may require more than one appointment',
    ],
    aftercare: [
      'A written aftercare plan is provided for the options you choose',
      'Sun protection and a simplified routine are commonly advised while the skin settles',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'How many appointments will I need?',
        answer:
          'It depends on the options chosen and how your skin responds. A sequence and review points are agreed during consultation rather than promised in advance.',
      },
      {
        question: 'Can this replace my current skin-care routine?',
        answer:
          'Not necessarily. The aim is a routine you can maintain. Changes are discussed rather than imposed.',
      },
      {
        question: 'Is there any downtime?',
        answer:
          'Some options involve temporary redness or sensitivity. Recovery is discussed specifically for your plan.',
      },
    ],
    relatedTreatmentIds: ['tr-peels', 'tr-microneedling', 'tr-consultation'],
    image: 'sand',
    imageAlt: 'Illustrative sand-toned gradient panel with a soft arch of light.',
    featured: true,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-peels',
    slug: 'chemical-peels',
    title: 'Chemical Peels',
    category: 'Skin Renewal',
    shortDescription:
      'Professionally selected peel options with suitability and aftercare discussed during consultation.',
    overview: [
      'A chemical peel applies a professional solution to the skin to encourage renewal. Peels vary considerably in strength and in what they are used for, so the choice is made after assessing your skin rather than from a menu.',
      'This page describes the consultation process around peels. It does not recommend a peel for your skin.',
    ],
    concerns: ['uneven-tone', 'skin-texture'],
    concernsDiscussed: [
      'Tone, texture and any areas of concern',
      'Previous peels, reactions or sensitivity',
      'Recent sun exposure, waxing or other treatments',
      'Time you can allow for recovery',
    ],
    consultationCovers: [
      'Assessment of skin type and current condition',
      'Which peel options are appropriate, and at what strength',
      'Preparation, including any pre-treatment skin care',
      'Recovery, aftercare and when to seek advice',
    ],
    suitabilityNotes: [
      'Not appropriate with active infection, broken skin or recent significant sun exposure',
      'Some peels are unsuitable during pregnancy or breastfeeding',
      'A history of cold sores or keloid scarring is discussed in advance',
    ],
    preparation: [
      'Avoid sun exposure and tanning before treatment',
      'Some practitioners advise specific skin care in the weeks beforehand',
      'Disclose all current products, including retinoids and acids',
    ],
    recoveryNotes: [
      'Some redness and flaking is common with many peels',
      'The extent and duration depend on the peel selected and your skin',
      'Your practitioner explains what is expected for your specific plan',
    ],
    risksAndLimitations: [
      'Temporary redness, dryness, flaking or sensitivity',
      'Risk of pigmentation change, particularly with inadequate sun protection',
      'Deeper peels carry a higher risk profile than superficial ones',
      'Outcomes vary and are not guaranteed',
    ],
    aftercare: [
      'Follow the written aftercare instructions for your peel',
      'Use sun protection and avoid active ingredients until advised',
      'Contact the clinic if you experience unexpected or severe reactions',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Will my skin peel visibly?',
        answer:
          'It depends on the peel. Some cause noticeable flaking, others very little. This is discussed before treatment.',
      },
      {
        question: 'Can I have a peel before an event?',
        answer:
          'Timing matters. Tell your practitioner about any event so recovery can be planned around it.',
      },
      {
        question: 'How often can peels be repeated?',
        answer:
          'Intervals depend on the peel and your skin. A sequence with review points is agreed during consultation.',
      },
    ],
    relatedTreatmentIds: ['tr-skin-quality', 'tr-microneedling'],
    image: 'clay',
    imageAlt: 'Illustrative clay-toned composition with a soft vertical band of light.',
    featured: true,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-microneedling',
    slug: 'microneedling',
    title: 'Microneedling',
    category: 'Skin Texture',
    shortDescription:
      'A consultation-led approach to treatment planning, expected recovery, and skin-care considerations.',
    overview: [
      'Microneedling uses fine needles to create controlled micro-channels in the skin. It is used for a range of texture and tone concerns, and protocols differ between clinics and practitioners.',
      'This page explains what is discussed before treatment is planned. It is not a recommendation.',
    ],
    concerns: ['skin-texture', 'uneven-tone'],
    concernsDiscussed: [
      'Texture, scarring and pore appearance',
      'Skin sensitivity and previous reactions',
      'Any tendency to keloid scarring or infection',
      'Recovery time available',
    ],
    consultationCovers: [
      'Skin assessment and review of your history',
      'Whether microneedling is an appropriate option for you',
      'The planned number of sessions and review points',
      'Aftercare, sun protection and product guidance',
    ],
    suitabilityNotes: [
      'Not performed over active infection, inflammation or broken skin',
      'Not appropriate during pregnancy or breastfeeding',
      'Certain skin conditions and medications require assessment first',
    ],
    preparation: [
      'Avoid sun exposure and active ingredients for the period advised',
      'Disclose all medications, including blood thinners',
    ],
    recoveryNotes: [
      'Temporary redness and mild sensitivity are common immediately afterwards',
      'Recovery varies by depth and area treated',
      'Your practitioner explains expected recovery for your plan',
    ],
    risksAndLimitations: [
      'Redness, swelling, bruising or temporary sensitivity',
      'Small risk of infection or pigmentation change',
      'Results build gradually and vary between individuals',
    ],
    aftercare: [
      'Keep the skin clean and use only recommended products',
      'Avoid intense exercise, heat and sun exposure as advised',
      'Contact the clinic if redness or discomfort is worsening',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Is microneedling painful?',
        answer:
          'Comfort varies. Topical anaesthetic may be offered. Describe your sensitivity during consultation so comfort can be planned for.',
      },
      {
        question: 'How soon can I wear makeup?',
        answer:
          'Guidance depends on the depth of treatment. Your practitioner provides specific aftercare instructions.',
      },
      {
        question: 'Can it be combined with other treatments?',
        answer:
          'Sometimes, with appropriate spacing. Combinations are decided during consultation.',
      },
    ],
    relatedTreatmentIds: ['tr-peels', 'tr-skin-quality'],
    image: 'stone',
    imageAlt: 'Illustrative warm stone-toned panel with a fine arch outline.',
    featured: true,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-laser-hair',
    slug: 'laser-hair-reduction',
    title: 'Laser Hair Reduction',
    category: 'Laser Treatments',
    shortDescription:
      'Treatment planning that considers skin type, hair characteristics, and relevant safety factors.',
    overview: [
      'Laser hair reduction uses light energy to reduce hair growth over a course of sessions. Suitability depends on skin type, hair colour and medical history, and results vary between individuals.',
      'This page describes how a plan is approached. It does not promise permanent hair removal.',
    ],
    concerns: ['unwanted-hair'],
    concernsDiscussed: [
      'Areas of concern and hair characteristics',
      'Skin type and how your skin responds to light',
      'Previous laser or waxing history',
      'Medications and hormonal factors that may influence growth',
    ],
    consultationCovers: [
      'Assessment of skin and hair type',
      'Whether laser is appropriate, and which device settings may be used',
      'The likely number of sessions and intervals',
      'Risks, including pigment change, and aftercare',
    ],
    suitabilityNotes: [
      'Not suitable during pregnancy',
      'Recent sun exposure or tanning requires postponing treatment',
      'Some medications and skin conditions require assessment first',
    ],
    preparation: [
      'Avoid sun exposure and self-tan for the period advised',
      'Do not wax or epilate before sessions; shaving is usually permitted',
    ],
    recoveryNotes: [
      'Mild redness and sensitivity around treated follicles is common briefly',
      'Most people return to normal activity the same day',
    ],
    risksAndLimitations: [
      'Hair reduction is not permanent for everyone and maintenance may be needed',
      'Risk of temporary or, rarely, longer-lasting pigment change',
      'Discomfort during treatment varies',
    ],
    aftercare: [
      'Use sun protection on treated areas',
      'Avoid heat, saunas and intense exercise as advised',
      'Contact the clinic if blistering or persistent irritation occurs',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Is it permanent?',
        answer:
          'It is described as hair reduction rather than permanent removal. Many people need occasional maintenance sessions.',
      },
      {
        question: 'Does it work on light hair?',
        answer:
          'Laser targets pigment, so very light or grey hair responds less predictably. This is assessed during consultation.',
      },
      {
        question: 'How many sessions?',
        answer:
          'Hair grows in cycles, so a course is usually required. The number is discussed individually.',
      },
    ],
    relatedTreatmentIds: ['tr-laser-skin', 'tr-consultation'],
    image: 'dusk',
    imageAlt: 'Illustrative dusk-toned panel with a soft horizontal band of light.',
    featured: true,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-laser-skin',
    slug: 'laser-skin-treatments',
    title: 'Laser Skin Treatments',
    category: 'Skin Concerns',
    shortDescription:
      'An overview of available laser options, subject to practitioner assessment and equipment availability.',
    overview: [
      'Laser skin treatments cover a range of devices and intentions, from tone and pigmentation to texture. Because devices differ substantially, the options available depend on the clinic’s equipment and your assessment.',
      'This page explains what is discussed. It does not indicate that every device is available.',
    ],
    concerns: ['uneven-tone', 'skin-texture', 'visible-signs-of-ageing'],
    concernsDiscussed: [
      'Pigmentation, redness and tone',
      'Texture and pore appearance',
      'Skin type and recent sun exposure',
      'Previous laser treatments and outcomes',
    ],
    consultationCovers: [
      'Assessment and confirmation of which devices are available at the clinic',
      'Whether laser is appropriate for your concern and skin type',
      'A test patch where indicated',
      'Recovery, risks and aftercare',
    ],
    suitabilityNotes: [
      'Not appropriate with active infection, recent sun exposure or tanning',
      'Some medications increase light sensitivity',
      'Pregnancy and breastfeeding require discussion before any laser treatment',
    ],
    preparation: [
      'Avoid sun exposure and tanning beforehand',
      'Disclose all medications and supplements',
    ],
    recoveryNotes: [
      'Depends entirely on the device and settings used',
      'Your practitioner explains what to expect for the planned treatment',
    ],
    risksAndLimitations: [
      'Pigment change, redness, swelling and, rarely, scarring',
      'Not all concerns respond to laser treatment',
      'Results vary and may require a series of sessions',
    ],
    aftercare: [
      'Follow device-specific aftercare instructions',
      'Use sun protection consistently',
      'Report unexpected reactions promptly',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Which laser do you use?',
        answer:
          'Device availability is confirmed with the clinic. Details are not listed here until they are verified.',
      },
      {
        question: 'Is a test patch needed?',
        answer:
          'Often, particularly where skin type or history suggests it. This is decided during consultation.',
      },
      {
        question: 'Can laser treat pigmentation?',
        answer:
          'Some forms of pigmentation respond to laser, others do not. Assessment is needed before any expectation is set.',
      },
    ],
    relatedTreatmentIds: ['tr-laser-hair', 'tr-skin-quality'],
    image: 'moss',
    imageAlt: 'Illustrative muted moss-toned panel with a sculptural arch.',
    featured: false,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-wrinkle',
    slug: 'wrinkle-consultation',
    title: 'Wrinkle Consultation',
    category: 'Aesthetic Medicine',
    shortDescription:
      'A clinician-led discussion of facial movement, treatment options, suitability, and limitations.',
    overview: [
      'A wrinkle consultation is a clinical assessment of facial movement and the options that may be appropriate. It is a discussion first: suitability, likely effect and limitations are covered before anything is planned.',
      'This page does not recommend treatment. Injectable treatments are prescription medicines in many jurisdictions and require assessment by an appropriately qualified practitioner.',
    ],
    concerns: ['visible-signs-of-ageing', 'facial-balance'],
    concernsDiscussed: [
      'Which facial movements you notice, and when',
      'Previous aesthetic treatments and any concerns about them',
      'Medical history and current medications',
      'Your preference for subtle or more visible change',
    ],
    consultationCovers: [
      'Facial assessment at rest and in movement',
      'Whether treatment is appropriate, and what it can and cannot do',
      'Risks, limitations and expected duration of effect',
      'Alternatives, including doing nothing',
    ],
    suitabilityNotes: [
      'Requires assessment by a qualified clinician',
      'Not appropriate during pregnancy or breastfeeding',
      'Certain neuromuscular conditions and medications mean treatment is unsuitable',
    ],
    preparation: [
      'Come without heavy makeup if possible',
      'Bring details of previous treatments and current medications',
    ],
    recoveryNotes: [
      'Recovery is discussed for the specific option selected',
      'Some temporary redness or small marks are common with injectable treatments',
    ],
    risksAndLimitations: [
      'Effects are temporary and vary between individuals',
      'Possible bruising, asymmetry or, rarely, more significant complications',
      'Results cannot be guaranteed',
    ],
    aftercare: [
      'Follow the written instructions given after treatment',
      'Avoid heat, exercise and lying flat for the period advised',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Will I look expressionless?',
        answer:
          'The aim is a considered, natural-looking result. Your preference is discussed and planned before treatment.',
      },
      {
        question: 'How long does it last?',
        answer:
          'Duration varies between individuals and treatments. Your practitioner gives an estimate based on your assessment.',
      },
      {
        question: 'Who performs the treatment?',
        answer:
          'Only an appropriately qualified clinician. Practitioner details are published once verified.',
      },
    ],
    relatedTreatmentIds: ['tr-contour', 'tr-consultation'],
    image: 'pearl',
    imageAlt: 'Illustrative pearl-toned panel with a fine ring of champagne light.',
    featured: false,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
  {
    id: 'tr-contour',
    slug: 'facial-contouring-consultation',
    title: 'Facial Contouring Consultation',
    category: 'Aesthetic Medicine',
    shortDescription:
      'An individual assessment of facial proportions, available options, and realistic treatment goals.',
    overview: [
      'Facial contouring covers a group of treatments intended to alter volume or proportion. Assessment is individual: proportions are reviewed at rest and in movement, and options are discussed against realistic goals.',
      'This page explains the consultation. It does not recommend a specific treatment, and not every option will be appropriate for every face.',
    ],
    concerns: ['facial-balance', 'visible-signs-of-ageing'],
    concernsDiscussed: [
      'Which areas you notice and how they affect how you feel',
      'Facial proportions and asymmetry',
      'Previous treatments and any dissatisfaction with them',
      'Your preference for restraint or more visible change',
    ],
    consultationCovers: [
      'A structured facial assessment',
      'Which options are available and appropriate, if any',
      'The limits of what treatment can achieve',
      'Risks, recovery and review points',
    ],
    suitabilityNotes: [
      'Requires assessment by a qualified clinician',
      'Not appropriate during pregnancy or breastfeeding',
      'Some options are unsuitable where there is a history of certain medical conditions',
    ],
    preparation: [
      'Come without heavy makeup if possible',
      'Bring details of previous treatments',
    ],
    recoveryNotes: [
      'Depends on the option selected and is discussed in consultation',
      'Swelling or bruising may occur with injectable options',
    ],
    risksAndLimitations: [
      'Outcomes vary and cannot be guaranteed',
      'Over-treatment is a real risk; a conservative approach is preferred',
      'Possible bruising, swelling, asymmetry or, rarely, vascular complications',
    ],
    aftercare: [
      'Follow written aftercare for the treatment performed',
      'Attend any review appointment offered',
    ],
    frequentlyAskedQuestions: [
      {
        question: 'Is this the same as cosmetic surgery?',
        answer:
          'No. Aesthetic medicine options are non-surgical. Surgical consultation would be referred to an appropriate specialist.',
      },
      {
        question: 'Will it change how I look to others?',
        answer:
          'The goal is a considered result, not a different face. Expectations are discussed honestly before treatment.',
      },
      {
        question: 'Can I start with something small?',
        answer:
          'Yes. A conservative first step with review is often the sensible approach and can be discussed.',
      },
    ],
    relatedTreatmentIds: ['tr-wrinkle', 'tr-consultation'],
    image: 'sage',
    imageAlt: 'Illustrative sage-toned panel with soft layered light.',
    featured: false,
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
    medicallyReviewedBy: null,
    lastReviewedAt: null,
    indicativeDuration: null,
    priceFrom: null,
    currency: null,
    practitionerIds: ['pr-medical-director'],
  },
]

export const publishedTreatments = treatments.filter(
  (treatment) => treatment.publicationStatus === 'published',
)

export const featuredTreatments = publishedTreatments.filter((t) => t.featured)

export const treatmentCategories: TreatmentCategory[] = Array.from(
  new Set(publishedTreatments.map((t) => t.category)),
)

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return publishedTreatments.find((treatment) => treatment.slug === slug)
}

export function getRelatedTreatments(treatment: Treatment): Treatment[] {
  return treatment.relatedTreatmentIds
    .map((id) => publishedTreatments.find((item) => item.id === id))
    .filter((item): item is Treatment => Boolean(item))
    .slice(0, 3)
}
