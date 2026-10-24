import { useQuery, useRouter } from '../router/Router'
import { usePageMeta } from '../lib/seo'
import {
  concerns,
  publishedTreatments,
  type ConcernId,
} from '../content/treatments'
import { TreatmentCard } from '../components/treatments/TreatmentCard'
import { TreatmentFilters, type TreatmentFilterValue } from '../components/treatments/TreatmentFilters'
import { LinkButton } from '../components/ui/Button'

function matchesTerm(haystack: string[], term: string): boolean {
  if (!term) return true
  return haystack.join(' ').toLowerCase().includes(term)
}

export function TreatmentsPage() {
  usePageMeta({
    title: 'Treatments',
    description:
      'Explore Aurelia Aesthetic Clinic treatment pathways by category or area of interest. Filters help you browse information; suitability is discussed in consultation.',
  })

  const { navigate } = useRouter()
  const query = useQuery()
  const value: TreatmentFilterValue = {
    q: query.get('q') ?? '',
    category: query.get('category') ?? '',
    concern: query.get('concern') ?? '',
  }

  const applyFilters = (next: TreatmentFilterValue, options?: { replace?: boolean }) => {
    const params = new URLSearchParams()
    if (next.q.trim()) params.set('q', next.q)
    if (next.category) params.set('category', next.category)
    if (next.concern) params.set('concern', next.concern)
    const suffix = params.toString()
    navigate(suffix ? `/treatments?${suffix}` : '/treatments', options)
  }

  const term = value.q.trim().toLowerCase()
  const results = publishedTreatments.filter((treatment) => {
    const matchesCategory = !value.category || treatment.category === value.category
    const matchesConcern =
      !value.concern || treatment.concerns.includes(value.concern as ConcernId)
    const matchesSearch = matchesTerm(
      [
        treatment.title,
        treatment.category,
        treatment.shortDescription,
        ...treatment.concernsDiscussed,
      ],
      term,
    )
    return matchesCategory && matchesConcern && matchesSearch
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Curated Care</p>
          <h1 className="page-title">Treatments</h1>
          <p className="lede">
            Explore treatment options, then discuss suitability with a qualified
            practitioner. These pages explain what a consultation covers; they do not
            assess your suitability or recommend a treatment.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container">
          <TreatmentFilters
            value={value}
            onChange={applyFilters}
            onReset={() => navigate('/treatments')}
            resultCount={results.length}
            totalCount={publishedTreatments.length}
          />

          {results.length > 0 ? (
            <ul className="treatment-grid">
              {results.map((treatment) => (
                <li key={treatment.id}>
                  <TreatmentCard treatment={treatment} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h2>No treatments match those filters.</h2>
              <p>
                Try a broader search, or clear the filters to see every treatment
                pathway. If you are unsure where to start, a consultation is the
                appropriate first step.
              </p>
              <div className="empty-state__actions">
                <button type="button" className="btn btn--outline" onClick={() => navigate('/treatments')}>
                  Reset filters
                </button>
                <LinkButton to="/consultation">Request a Consultation</LinkButton>
              </div>
            </div>
          )}

          <p className="note note--spaced">
            Areas of interest describe reasons people explore these pages. They are not a
            diagnosis, and they do not determine eligibility for treatment. Available
            concern areas: {concerns.map((concern) => concern.label).join(', ')}.
          </p>
        </div>
      </section>
    </>
  )
}
