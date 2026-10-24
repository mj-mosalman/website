import type { Practitioner } from '../../content/practitioners'

export function SpecialistCard({ practitioner }: { practitioner: Practitioner }) {
  const verified = practitioner.profileStatus === 'verified'

  return (
    <article className="specialist-card">
      <div className="specialist-card__portrait" aria-hidden="true">
        <span className="specialist-card__mark" />
        <span className="specialist-card__note">
          {verified ? 'Portrait' : 'Portrait pending'}
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
