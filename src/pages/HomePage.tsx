import { Link } from '../router/Router'
import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import { featuredTreatments } from '../content/treatments'
import { practitioners, teamContentStatus } from '../content/practitioners'
import { publishedArticles } from '../content/articles'
import { photos } from '../content/media'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ArrowLink, LinkButton } from '../components/ui/Button'
import { Photo } from '../components/ui/Photo'
import { SignatureCarousel } from '../components/treatments/SignatureCarousel'
import { ArticleCard } from '../components/journal/ArticleCard'
import { SpecialistCard } from '../components/specialists/SpecialistCard'
import { Hero } from '../components/home/Hero'
import { ValuesBand } from '../components/home/ValuesBand'
import { TourGrid } from '../components/home/TourGrid'

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

export function HomePage() {
  usePageMeta({
    title: 'Aesthetic care, considered',
    description:
      'Aurelia Aesthetic Clinic: consultation-led aesthetic medicine, individual planning and clear expectations. Explore treatments or request a consultation.',
  })

  const journalPreview = publishedArticles.slice(0, 3)

  return (
    <>
      <Hero />
      <ValuesBand />

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
            <Photo
              src={photos.room.src}
              alt={photos.room.alt}
              ratio="3/4"
              className="philosophy__art-main"
            />
            <Photo
              src={photos.detail.src}
              alt={photos.detail.alt}
              ratio="1/1"
              className="philosophy__art-detail"
            />
          </div>
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

      <TourGrid />

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
