import { usePageMeta } from '../lib/seo'
import { practitioners, teamContentStatus } from '../content/practitioners'
import { SpecialistCard } from '../components/specialists/SpecialistCard'
import { LinkButton } from '../components/ui/Button'

export function SpecialistsPage() {
  usePageMeta({
    title: 'Specialists',
    description:
      'The Aurelia care team. Practitioner profiles are published once names, qualifications and registration details are verified by the clinic.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Care team</p>
          <h1 className="page-title">Meet Your Care Team</h1>
          <p className="lede">
            Every treatment at Aurelia is performed by an appropriately qualified
            practitioner. Individual profiles are published once their details have been
            verified.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container">
          <div className="status-banner" role="note">
            <p className="status-banner__title">Profiles pending verification</p>
            <p>{teamContentStatus.notice}</p>
          </div>

          <ul className="specialist-grid">
            {practitioners.map((practitioner) => (
              <li key={practitioner.id}>
                <SpecialistCard practitioner={practitioner} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container editorial">
          <div className="editorial__body">
            <h2>What is required before publication</h2>
            <p>
              Publishing a clinician’s details carries responsibilities. We only publish a
              profile once the clinic has supplied and confirmed the following:
            </p>
            <ul className="bullet-list">
              {teamContentStatus.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Until then, this page describes roles rather than people. No name,
              qualification, registration number or portrait on this site identifies a real
              practitioner.
            </p>
          </div>
          <div className="editorial__aside">
            <h3>Questions about who will treat you?</h3>
            <p>
              Ask during consultation. It is a reasonable question, and the answer should
              be specific.
            </p>
            <LinkButton to="/consultation">Request a Consultation</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
