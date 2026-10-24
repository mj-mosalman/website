import { hasApprovedStories, patientStories } from '../../content/stories'

/**
 * Unpublished by default: renders nothing until authentic, consented patient
 * statements exist. No testimonial is generated to fill the section.
 */
export function PatientStories() {
  if (!hasApprovedStories()) return null

  return (
    <section className="section section--ivory" aria-labelledby="stories-title">
      <div className="container">
        <p className="label">In their words</p>
        <h2 id="stories-title" className="section-title">
          Patient Stories
        </h2>
        <ul className="stories">
          {patientStories.map((story) => (
            <li key={story.id}>
              <blockquote>
                <p>{story.statement}</p>
                <footer>
                  <span>{story.treatment}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
        <p className="note">Individual outcomes vary. Statements are published with consent.</p>
      </div>
    </section>
  )
}
