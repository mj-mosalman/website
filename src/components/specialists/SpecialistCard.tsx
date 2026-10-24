import type { Practitioner } from '../../content/practitioners'
import { photos, practitionerPhotos } from '../../content/media'

export function SpecialistCard({ practitioner }: { practitioner: Practitioner }) {
  const verified = practitioner.profileStatus === 'verified'
  const portrait = practitionerPhotos[practitioner.slug] ?? photos.practitioner.src

  return (
    <article className="specialist-card">
      <div className="specialist-card__portrait" aria-hidden="true">
        <img src={portrait} alt="" loading="lazy" decoding="async" />
        <span className="specialist-card__note">
          {verified ? 'Portrait' : 'Development image'}
        </span>
      </div>
      <div className="specialist-card__body">
        <p className="label">
          {verified ? practitioner.qualifications.join(' · ') || 'Verified' : 'Awaiting verification'}
        </p>
        <h3 className="specialist-card__name">
          {verified && practitioner.fullName ? practitioner.fullName : practitioner.professionalTitle}
        </h3>
        {verified && practitioner.fullName ? (
          <p className="specialist-card__role">{practitioner.professionalTitle}</p>
        ) : null}
        <ul className="specialist-card__areas">
          {practitioner.areasOfPractice.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <p className="specialist-card__status">
          {verified
            ? 'Profile verified by the clinic.'
            : 'Role placeholder. Name, qualifications and registration are added once verified by the clinic.'}
        </p>
      </div>
    </article>
  )
}
