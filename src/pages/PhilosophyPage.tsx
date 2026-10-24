import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import { ArtPanel } from '../components/ui/ArtPanel'
import { LinkButton } from '../components/ui/Button'

const commitments = [
  'Recommendations are based on suitability, not on what can be sold.',
  'The limitations of a treatment are explained as clearly as its potential.',
  'Doing nothing, or doing less, remains a legitimate outcome of a consultation.',
  'Recovery and cost are stated in plain language before anything is agreed.',
]

const boundaries = [
  'We do not diagnose skin conditions through a website.',
  'We do not promise specific outcomes, and we do not describe treatment as risk-free.',
  'We do not treat during pregnancy where an option is not appropriate.',
  'We refer to other specialists when a concern sits outside aesthetic medicine.',
]

export function PhilosophyPage() {
  usePageMeta({
    title: 'Our Philosophy',
    description:
      'How Aurelia approaches aesthetic care: consultation first, individual planning, and clear expectations about suitability, recovery and limitations.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Our Philosophy</p>
          <h1 className="page-title">
            Considered Care.
            <br />
            Individual Expression.
          </h1>
          <p className="lede">
            Aesthetic care is a series of decisions, not a single appointment. Our role is
            to make those decisions well informed.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container editorial">
          <div className="editorial__body">
            <h2>Beginning with listening</h2>
            <p>
              Most people arrive with a concern rather than a treatment name. What follows
              is a conversation: what you have noticed, how long it has been present, what
              you have tried, and what you hope will change.
            </p>
            <p>
              That conversation determines whether aesthetic treatment is appropriate at
              all. Sometimes it is not, and saying so is part of the work.
            </p>

            <h2>Individual planning</h2>
            <p>
              Two people with a similar concern can leave with different plans, because
              skin behaviour, history, medication, recovery tolerance and personal
              preference differ. A plan states what is proposed, in what order, what
              recovery to expect, and when the result will be reviewed.
            </p>

            <h2>Clear expectations</h2>
            <p>
              Aesthetic treatment changes appearance in ways that are usually gradual and
              sometimes subtle. We describe what is realistic before treatment, and we
              explain what happens if the result falls short of what was discussed.
            </p>
          </div>

          <div className="editorial__media">
            <ArtPanel
              tone="linen"
              alt="Illustrative warm ivory composition suggesting a quiet clinic interior."
              ratio="3/4"
              motif="arch"
            />
            <p className="editorial__caption">
              Development imagery. Authorised photography of the clinic is still required.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container split-lists">
          <div>
            <h2 className="section-title">What we commit to</h2>
            <ul className="bullet-list">
              {commitments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-title">What we do not do</h2>
            <ul className="bullet-list">
              {boundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="container consultation-steps">
          <p className="label label--light">The process</p>
          <h2 className="section-title">From enquiry to plan</h2>
          <ol className="steps">
            <li>
              <span className="steps__index">01</span>
              <h3>Request a consultation</h3>
              <p>
                Send a short enquiry through the website. The clinic reviews it and
                contacts you to arrange availability.
              </p>
            </li>
            <li>
              <span className="steps__index">02</span>
              <h3>Attend the consultation</h3>
              <p>
                A conversation about your concerns, history and options — including the
                option of no treatment.
              </p>
            </li>
            <li>
              <span className="steps__index">03</span>
              <h3>Decide in your own time</h3>
              <p>
                You receive a written summary. Any treatment proceeds only after a
                separate, informed decision.
              </p>
            </li>
          </ol>
          <LinkButton to="/consultation" variant="light">
            Request a Consultation
          </LinkButton>
          <p className="note note--on-dark">{clinic.consultationPolicy}</p>
        </div>
      </section>
    </>
  )
}
