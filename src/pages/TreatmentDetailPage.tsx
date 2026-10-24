import { Link } from '../router/Router'
import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import {
  getRelatedTreatments,
  getTreatmentBySlug,
  type Treatment,
} from '../content/treatments'
import { ArtPanel } from '../components/ui/ArtPanel'
import { LinkButton } from '../components/ui/Button'
import { TreatmentCard } from '../components/treatments/TreatmentCard'
import { NotFoundPage } from './NotFoundPage'

function Section({
  id,
  title,
  items,
}: {
  id: string
  title: string
  items: string[]
}) {
  if (items.length === 0) return null
  return (
    <section className="treatment-section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <ul className="bullet-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export function TreatmentDetailPage({ treatment }: { treatment: Treatment }) {
  usePageMeta({
    title: treatment.title,
    description: treatment.shortDescription,
  })

  const related = getRelatedTreatments(treatment)

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div className="detail-hero__copy">
            <p className="breadcrumb">
              <Link to="/treatments">Treatments</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{treatment.category}</span>
            </p>
            <p className="label">{treatment.category}</p>
            <h1 className="page-title">{treatment.title}</h1>
            <p className="lede">{treatment.shortDescription}</p>
            <div className="detail-hero__actions">
              <LinkButton to="/consultation">Request a Consultation</LinkButton>
              <Link to="/treatments" className="arrow-link">
                <span>All treatments</span>
                <span aria-hidden="true" className="arrow-link__icon">
                  →
                </span>
              </Link>
            </div>
            <p className="detail-meta">
              {treatment.medicalReviewStatus === 'reviewed'
                ? `Medically reviewed${treatment.lastReviewedAt ? ` · ${treatment.lastReviewedAt}` : ''}`
                : 'Copy awaiting clinical review'}
              {treatment.indicativeDuration ? ` · ${treatment.indicativeDuration}` : ''}
            </p>
          </div>
          <div className="detail-hero__media">
            <ArtPanel tone={treatment.image} alt={treatment.imageAlt} ratio="4/5" motif="arch" />
          </div>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container detail-layout">
          <div className="detail-body">
            <section className="treatment-section" aria-labelledby="overview">
              <h2 id="overview">Overview</h2>
              {treatment.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <Section id="concerns" title="Concerns discussed" items={treatment.concernsDiscussed} />
            <Section
              id="consultation"
              title="What a consultation covers"
              items={treatment.consultationCovers}
            />
            <Section id="suitability" title="Suitability considerations" items={treatment.suitabilityNotes} />
            <Section id="preparation" title="Preparation" items={treatment.preparation} />
            <Section id="recovery" title="Recovery and aftercare overview" items={treatment.recoveryNotes} />
            <Section id="risks" title="Risks and limitations" items={treatment.risksAndLimitations} />
            <Section id="aftercare" title="Aftercare" items={treatment.aftercare} />

            <section className="treatment-section" aria-labelledby="faqs">
              <h2 id="faqs">Frequently asked questions</h2>
              <div className="faq">
                {treatment.frequentlyAskedQuestions.map((faq) => (
                  <details key={faq.question} className="faq__item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <p className="disclaimer-box">
              <strong>General information.</strong> {clinic.generalDisclaimer}
            </p>
          </div>

          <aside className="detail-aside" aria-label="Consultation and related information">
            <div className="aside-card">
              <p className="label">Next step</p>
              <h2 className="aside-card__title">Discuss suitability</h2>
              <p>
                A consultation is the appropriate way to find out whether this treatment
                is suitable for you.
              </p>
              <LinkButton to="/consultation" className="aside-card__button">
                Request a Consultation
              </LinkButton>
              <p className="aside-card__note">{clinic.consultationPolicy}</p>
            </div>

            <div className="aside-card aside-card--quiet">
              <p className="label">Practitioners</p>
              <p>
                Verified practitioner details have not been supplied yet. Profiles will be
                published once qualifications and registration are confirmed.
              </p>
              <Link to="/specialists" className="arrow-link arrow-link--small">
                <span>Care team</span>
                <span aria-hidden="true" className="arrow-link__icon">
                  →
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section--ivory" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="section-title">
              Related treatments
            </h2>
            <ul className="treatment-grid">
              {related.map((item) => (
                <li key={item.id}>
                  <TreatmentCard treatment={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="sticky-cta-spacer" aria-hidden="true" />
      <div className="sticky-cta">
        <LinkButton to="/consultation" className="sticky-cta__button">
          Request a Consultation
        </LinkButton>
      </div>
    </>
  )
}

export function TreatmentRoute({ slug }: { slug: string }) {
  const treatment = getTreatmentBySlug(slug)
  if (!treatment) return <NotFoundPage message="That treatment page could not be found." />
  return <TreatmentDetailPage treatment={treatment} />
}
