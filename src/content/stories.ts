/**
 * Patient stories and before/after imagery.
 *
 * Deliberately empty. This section stays unpublished until the clinic supplies
 * authentic statements with documented publication consent and genuine,
 * comparable imagery. Nothing is fabricated to fill the space.
 */

export type PatientStory = {
  id: string
  statement: string
  consentRecordedAt: string | null
  treatment: string
}

export const patientStories: PatientStory[] = []

export function hasApprovedStories(): boolean {
  return patientStories.some((story) => Boolean(story.consentRecordedAt))
}
