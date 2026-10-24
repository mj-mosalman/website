import { Link } from '../../router/Router'
import { clinic } from '../../content/clinic'
import { photos } from '../../content/media'
import { LinkButton } from '../ui/Button'
import { Photo } from '../ui/Photo'

const assurances = [
  { title: 'Consultation first', note: 'No plan before we talk.' },
  { title: 'Clinician-led', note: 'Assessed by qualified hands.' },
  { title: 'Individual plans', note: 'Shaped around you only.' },
]

export function Hero() {
  return (
    <section className="hhero" aria-labelledby="hero-title">
      <div className="container hhero__grid">
        <div className="hhero__copy">
          <p className="hhero__eyebrow">{clinic.name}</p>

          <h1 id="hero-title" className="hhero__display">
            <span>Glow</span>
            <span>with</span>
            <span className="hhero__display-em">intent</span>
          </h1>

          <p className="hhero__claim">Aesthetic care. Confident you.</p>
          <p className="hhero__lede">
            Considered treatments, unhurried consultations and clear expectations — shaped
            around the face you actually live in.
          </p>

          <div className="hhero__actions">
            <LinkButton to="/treatments" variant="light">
              Explore treatments
              <span aria-hidden="true">→</span>
            </LinkButton>
            <Link to="/consultation" className="hhero__ghost">
              Book a consultation
            </Link>
          </div>

          <ul className="hhero__assurances">
            {assurances.map((item) => (
              <li key={item.title}>
                <span className="hhero__assurance-dot" aria-hidden="true" />
                <span>
                  <strong>{item.title}</strong>
                  <em>{item.note}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hhero__media">
          <Photo
            src={photos.hero.src}
            alt={photos.hero.alt}
            ratio="4/5"
            className="hhero__photo"
            focus="center 35%"
            priority
          />

          <article className="hcard hcard--feature">
            <Photo
              src={photos.treatment.src}
              alt=""
              ratio="16/10"
              className="hcard__thumb"
            />
            <p className="hcard__eyebrow">Signature pathway</p>
            <h2 className="hcard__title">Skin quality, planned properly.</h2>
            <p className="hcard__copy">Assessment, options and a plan you can question.</p>
            <Link to="/treatments" className="hcard__link">
              View treatments
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          <article className="hcard hcard--trust">
            <div className="hcard__avatars" aria-hidden="true">
              <img src={photos.portrait.src} alt="" loading="lazy" decoding="async" />
              <img src={photos.practitioner.src} alt="" loading="lazy" decoding="async" />
              <img src={photos.detail.src} alt="" loading="lazy" decoding="async" />
            </div>
            <p className="hcard__trust-title">
              Every plan starts
              <br />
              with a conversation.
            </p>
            <p className="hcard__trust-note">Consultation-led care</p>
          </article>
        </div>
      </div>
    </section>
  )
}
