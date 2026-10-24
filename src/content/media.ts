import type { ArtTone } from './treatments'

export type Photo = { src: string; alt: string }

/**
 * Development photography.
 *
 * These are openly licensed stock photographs (see `public/media/CREDITS.md`),
 * not photography of this clinic, its team or its patients. They give the design
 * its intended visual language and are marked in the interface as development
 * imagery; replace them with authorised clinic photography before launch — the
 * file names are stable, so swapping the files is enough.
 */
export const photos = {
  hero: {
    src: '/media/hero-ritual.jpg',
    alt: 'Close-up of a facial treatment in progress, in soft low light.',
  },
  treatment: {
    src: '/media/treatment-closeup.jpg',
    alt: 'A practitioner guiding a treatment tool across the skin.',
  },
  detail: {
    src: '/media/skin-detail.jpg',
    alt: 'Skin preparation during a facial treatment.',
  },
  portrait: {
    src: '/media/guest-portrait.jpg',
    alt: 'Portrait of a woman with natural skin in warm light.',
  },
  practitioner: {
    src: '/media/practitioner.jpg',
    alt: 'A practitioner carrying out a skin assessment.',
  },
  reception: {
    src: '/media/clinic-reception.jpg',
    alt: 'Waiting area with curved upholstered seating and soft daylight.',
  },
  lounge: {
    src: '/media/clinic-lounge.jpg',
    alt: 'Lounge seating in warm neutral tones.',
  },
  room: {
    src: '/media/clinic-room.jpg',
    alt: 'A quiet treatment room with a bed beside a window.',
  },
  ambience: {
    src: '/media/ambience.jpg',
    alt: 'Candlelight and shadow on a dark surface.',
  },
  care: {
    src: '/media/care-detail.jpg',
    alt: 'Close-up of gloved hands working on skin.',
  },
} satisfies Record<string, Photo>

/** Team card photography, keyed by practitioner slug. Scenes, not faces: no stock model is presented as a named clinician. */
export const practitionerPhotos: Record<string, string> = {
  'medical-director': '/media/practitioner.jpg',
  'consultant-dermatologist': '/media/skin-detail.jpg',
  'aesthetic-nurse-specialist': '/media/care-detail.jpg',
}

/** Card photography per art tone, so treatment and article cards share one visual language. */
export const tonePhotos: Record<ArtTone, string> = {
  sand: '/media/clinic-lounge.jpg',
  clay: '/media/treatment-closeup.jpg',
  sage: '/media/clinic-room.jpg',
  stone: '/media/clinic-reception.jpg',
  linen: '/media/skin-detail.jpg',
  dusk: '/media/ambience.jpg',
  pearl: '/media/care-detail.jpg',
  moss: '/media/hero-ritual.jpg',
}
