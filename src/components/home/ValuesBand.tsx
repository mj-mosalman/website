import { ArrowLink } from '../ui/Button'
import { photos } from '../../content/media'
import { Photo } from '../ui/Photo'

export function ValuesBand() {
  return (
    <section className="hvalues" aria-labelledby="values-title">
      <div className="container hvalues__grid">
        <div className="hvalues__badge">
          <span className="hvalues__badge-num">01</span>
          <span className="hvalues__badge-text">
            A conversation
            <br />
            before any plan
          </span>
        </div>

        <div className="hvalues__note">
          <h2 id="values-title">Care that is also quietly considered.</h2>
          <p>
            Aesthetic work is a series of small decisions. We make them together: what suits
            your skin, what to leave alone, and what a realistic result looks like for you.
          </p>
          <ArrowLink to="/philosophy">Our approach</ArrowLink>
        </div>

        <figure className="hvalues__expert">
          <Photo src={photos.practitioner.src} alt={photos.practitioner.alt} ratio="4/5" />
          <figcaption>
            <span className="hvalues__expert-role">Lead aesthetic practitioner</span>
            <span className="hvalues__expert-note">Sample profile — name added after verification</span>
          </figcaption>
        </figure>
      </div>

      <div className="container hvalues__type">
        <h2>
          Expert
          <br />
          hands
        </h2>
        <h2 className="hvalues__type-right">
          Considered
          <br />
          <em>results</em>
        </h2>
      </div>
    </section>
  )
}
