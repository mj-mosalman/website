import { Link } from '../router/Router'
import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import { featuredTreatments } from '../content/treatments'
import { practitioners, teamContentStatus } from '../content/practitioners'
import { publishedArticles } from '../content/articles'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ArrowLink, LinkButton } from '../components/ui/Button'
import { ArtPanel } from '../components/ui/ArtPanel'
import { SignatureCarousel } from '../components/treatments/SignatureCarousel'
import { ArticleCard } from '../components/journal/ArticleCard'
import { SpecialistCard } from '../components/specialists/SpecialistCard'
import { PatientStories } from '../components/stories/PatientStories'

const pillars = [
  {
    title: 'Consultation First',
    body: 'Time to discuss your goals, questions, and appropriate options before any plan is made.',
  },
  {
    title: 'Individual Planning',
    body: 'Recommendations shaped around suitability and personal preferences, not a fixed menu.',
  },
  {
    title: 'Clear Expectations',
    body: 'Balanced conversations about limitations, recovery, and potential risks.',
  },
  {
    title: 'Privacy and Discretion',
    body: 'A thoughtful approach to your information and the consultation experience.',
  },
]

const environmentPanels = [
  { tone: 'stone' as const, label: 'Reception' },
  { tone: 'linen' as const, label: 'Consultation room' },
  { tone: 'sand' as const, label: 'Treatment space' },
  { tone: 'dusk' as const, label: 'Material detail' },
]

function FeatureIcon({ kind }: { kind: 'leaf' | 'flask' | 'droplet' }) {
  const paths: Record<typeof kind, string> = {
    leaf: 'M19 4C9 4 4 9.5 4 17c0 1 0 2 .4 3C6 13 11 9 19 8.6V4Z M4 20C4 14 8 10 14 8',
    flask: 'M9 3h6 M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 17l-5-8V3',
    droplet: 'M12 3c3.5 4.2 5.5 7 5.5 9.6A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.4C6.5 10 8.5 7.2 12 3Z',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="pillar__icon">
      <path d={paths[kind]} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function HomePage() {
  usePageMeta({
    title: 'Aesthetic care, considered',
    description:
      'Aurelia Aesthetic Clinic: consultation-led aesthetic medicine, individual planning and clear expectations. Explore treatments or request a consultation.',
  })

  const journalPreview = publishedArticles.slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="label label--light">{clinic.name}</p>
            <h1 className="hero__title">
              An Elevated Approach
              <br />
              to Aesthetic Care.
            </h1>
            <p className="hero__lede">
              Thoughtfully considered treatments, personalised guidance, and a refined
              approach to your individual goals.
            </p>
            <div className="hero__actions">
              <LinkButton to="/treatments" variant="light">
                Explore Treatments
              </LinkButton>
              <LinkButton to="/consultation" variant="outline" className="btn--on-dark">
                Request a Consultation
              </LinkButton>
            </div>
          </div>

          <div className="hero__media">
            <ArtPanel
              tone="stone"
              alt="Illustrative composition of warm stone surfaces and soft daylight, standing in for clinic photography."
              ratio="4/5"
              motif="arch"
            />
            <div className="hero__float">
              <p className="label">Signature care</p>
              <p className="hero__float-title">Eight treatment pathways, explained plainly.</p>
              <ArrowLink to="/treatments" className="arrow-link--small">
                Treatment guide
              </ArrowLink>
            </div>
          </div>
        </div>

        <div className="container hero__pillars">
          <ul>
            <li>
              <FeatureIcon kind="leaf" />
              <span>Consultation first</span>
            </li>
            <li>
              <FeatureIcon kind="flask" />
              <span>Clinician-led planning</span>
            </li>
            <li>
              <FeatureIcon kind="droplet" />
              <span>Individual treatment plans</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--ivory philosophy" aria-labelledby="philosophy-title">
        <div className="container philosophy__grid">
          <div className="philosophy__copy">
            <p className="label">Our Philosophy</p>
            <h2 id="philosophy-title" className="section-title">
              Considered Care.
              <br />
              Individual Expression.
            </h2>
            <p className="lede">
              At Aurelia, aesthetic care begins with listening. We take time to understand
              your goals, explain appropriate options, and build an individual plan around
              suitability, informed choices, and realistic expectations.
            </p>
            <ArrowLink to="/philosophy">Discover our approach</ArrowLink>
          </div>

          <div className="philosophy__media">
            <ArtPanel
              tone="linen"
              alt="Illustrative quiet consultation setting in warm ivory tones."
              ratio="3/4"
              motif="arch"
              className="philosophy__art-main"
            />
            <ArtPanel
              tone="clay"
              alt="Illustrative close-up of tactile material and soft shadow."
              ratio="1/1"
              motif="column"
              className="philosophy__art-detail"
            />
          </div>
        </div>
      </section>

      <section className="section section--porcelain" aria-labelledby="signature-title">
        <div className="container">
          <div className="section-head section-head--split">
            <SectionHeading
              label="Curated Care"
              title="Signature Treatments"
              intro="Explore treatment options, then discuss suitability with a qualified practitioner."
            />
            <Link to="/treatments" className="arrow-link section-head__link">
              <span>All treatments</span>
              <span aria-hidden="true" className="arrow-link__icon">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="container container--wide">
          <SignatureCarousel treatments={featuredTreatments} />
        </div>
      </section>

      <section className="section section--espresso standards" aria-labelledby="standards-title">
        <div className="container standards__grid">
          <div className="standards__intro">
            <p className="label label--light">Why Aurelia</p>
            <h2 id="standards-title" className="section-title">
              A More Considered Standard of Care.
            </h2>
            <div className="seal" aria-hidden="true">
              <span className="seal__ring" />
              <span className="seal__mark">{clinic.monogram}</span>
            </div>
          </div>

          <ul className="standards__list">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <span className="standards__index">{`0${index + 1}`}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="container standards__note">
          These statements describe the clinic’s intended approach. They are not
          accreditations or outcome claims.
        </p>
      </section>

      <section className="section section--ivory" aria-labelledby="environment-title">
        <div className="container">
          <SectionHeading
            label="The clinic"
            title="A Space Designed Around Your Visit."
            intro="Reception, consultation and treatment spaces considered for calm and privacy."
          />
          <div className="environment">
            {environmentPanels.map((panel) => (
              <figure key={panel.label} className="environment__item">
                <ArtPanel tone={panel.tone} alt="" ratio="4/5" motif="arch" />
                <figcaption>{panel.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="note">
            Development imagery. These panels are illustrative and do not depict the
            clinic; authorised photography is required before launch.
          </p>
        </div>
      </section>

      <section className="section section--porcelain" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading
            label="Care team"
            title="Meet Your Care Team"
            intro="Roles are shown as placeholders until verified practitioner details are supplied."
          />
          <ul className="specialist-grid">
            {practitioners.map((practitioner) => (
              <li key={practitioner.id}>
                <SpecialistCard practitioner={practitioner} />
              </li>
            ))}
          </ul>
          <p className="note">{teamContentStatus.notice}</p>
          <ArrowLink to="/specialists">About verification</ArrowLink>
        </div>
      </section>

      <PatientStories />

      <section className="section section--ivory" aria-labelledby="journal-title">
        <div className="container">
          <div className="section-head section-head--split">
            <SectionHeading
              label="Journal"
              title="Notes Before You Decide"
              intro="General guidance on consultations, preparation and treatment planning."
            />
            <Link to="/journal" className="arrow-link section-head__link">
              <span>All articles</span>
              <span aria-hidden="true" className="arrow-link__icon">
                →
              </span>
            </Link>
          </div>
          <ul className="article-grid">
            {journalPreview.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta-band" aria-labelledby="cta-title">
        <div className="container cta-band__inner">
          <p className="label">Consultations</p>
          <h2 id="cta-title" className="cta-band__title">
            Begin with a Conversation.
          </h2>
          <p className="cta-band__lede">
            Explore your options with an individual consultation.
          </p>
          <LinkButton to="/consultation">Request a Consultation</LinkButton>
          <p className="cta-band__note">{clinic.consultationPolicy}</p>
        </div>
      </section>
    </>
  )
}
