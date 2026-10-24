import { Link } from '../../router/Router'
import type { Treatment } from '../../content/treatments'
import { tonePhotos } from '../../content/media'
import { Photo } from '../ui/Photo'

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="treatment-card">
      <Link
        to={`/treatments/${treatment.slug}`}
        className="treatment-card__media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo src={tonePhotos[treatment.image]} alt="" ratio="4/5" />
      </Link>
      <div className="treatment-card__body">
        <p className="label">{treatment.category}</p>
        <h3 className="treatment-card__title">
          <Link to={`/treatments/${treatment.slug}`}>{treatment.title}</Link>
        </h3>
        <p className="treatment-card__text">{treatment.shortDescription}</p>
        <Link
          to={`/treatments/${treatment.slug}`}
          className="arrow-link arrow-link--small"
          aria-label={`View ${treatment.title}`}
        >
          <span>View treatment</span>
          <span aria-hidden="true" className="arrow-link__icon">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}
