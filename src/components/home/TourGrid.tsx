import { ArrowLink } from '../ui/Button'
import { photos } from '../../content/media'
import { Photo } from '../ui/Photo'

export function TourGrid() {
  return (
    <section className="htour" aria-labelledby="tour-title">
      <div className="container htour__grid">
        <div className="htour__intro">
          <Photo
            src={photos.lounge.src}
            alt={photos.lounge.alt}
            ratio="1/1"
            className="htour__thumb"
          />
          <h2 id="tour-title">
            Take a tour
            <br />
            of the clinic.
          </h2>
          <p>
            Reception, consultation and treatment rooms, considered for calm, discretion
            and daylight.
          </p>
          <ArrowLink to="/contact">Visit information</ArrowLink>
        </div>

        <div className="htour__media">
          <Photo src={photos.reception.src} alt={photos.reception.alt} ratio="3/4" />
          <Photo src={photos.room.src} alt={photos.room.alt} ratio="3/4" />
        </div>
      </div>
    </section>
  )
}
