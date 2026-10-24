import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'

export function TermsPage() {
  usePageMeta({
    title: 'Terms',
    description:
      'Website terms for Aurelia Aesthetic Clinic: general information only, no medical advice, and how consultation requests are handled.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Terms</p>
          <h1 className="page-title">Website Terms</h1>
          <p className="lede">
            The basis on which this website is provided. Short by design.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container prose">
          <div className="status-banner status-banner--inline" role="note">
            <p className="status-banner__title">Draft — subject to legal review</p>
            <p>
              These terms are a working draft and require review by the clinic’s legal
              adviser before launch.
            </p>
          </div>

          <h2>General information only</h2>
          <p>{clinic.generalDisclaimer}</p>

          <h2>No doctor–patient relationship</h2>
          <p>
            Reading this website, or submitting a consultation request, does not create a
            doctor–patient relationship. That relationship begins with an appointment and
            appropriate assessment.
          </p>

          <h2>Consultation requests</h2>
          <p>
            Submitting the form requests a consultation. It does not book or reserve an
            appointment. An appointment exists only once the clinic has confirmed it with
            you directly.
          </p>

          <h2>Accuracy</h2>
          <p>
            Treatment descriptions are general and may change as clinical guidance develops.
            Nothing on this site should be relied upon as a statement that a treatment is
            suitable for you.
          </p>

          <h2>Content and imagery</h2>
          <p>
            Text and design belong to the clinic. Imagery currently shown is illustrative
            and does not depict the clinic, its team or its patients; it must be replaced
            with authorised photography before launch.
          </p>

          <h2>Changes</h2>
          <p>These terms may be updated. The current version is always the one published here.</p>
        </div>
      </section>
    </>
  )
}
