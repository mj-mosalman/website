import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import { ConsultationForm } from '../components/consultation/ConsultationForm'
import { Link } from '../router/Router'

export function ConsultationPage() {
  usePageMeta({
    title: 'Request a Consultation',
    description:
      'Request a consultation at Aurelia Aesthetic Clinic. Submitting the form requests an appointment; confirmation follows when the clinic contacts you.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Consultations</p>
          <h1 className="page-title">Request a Consultation</h1>
          <p className="lede">{clinic.consultationPolicy}</p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container consultation-layout">
          <div className="consultation-layout__form">
            <ConsultationForm />
          </div>

          <aside className="consultation-layout__aside" aria-label="What happens next">
            <div className="aside-card">
              <p className="label">What happens next</p>
              <ol className="steps steps--compact">
                <li>
                  <span className="steps__index">01</span>
                  <div>
                    <h3>Your request is received</h3>
                    <p>The clinic reviews the details you have submitted.</p>
                  </div>
                </li>
                <li>
                  <span className="steps__index">02</span>
                  <div>
                    <h3>The clinic contacts you</h3>
                    <p>
                      Using your chosen method, to discuss availability and any questions
                      before an appointment is agreed.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="steps__index">03</span>
                  <div>
                    <h3>An appointment is confirmed</h3>
                    <p>
                      Only at this point is an appointment booked. Nothing is reserved by
                      submitting the form.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="aside-card aside-card--quiet">
              <p className="label">Privacy</p>
              <p>
                This form collects only what is needed to arrange contact. Please do not
                include medical history, medication lists, photographs or identity
                documents.
              </p>
              <Link to="/privacy" className="arrow-link arrow-link--small">
                <span>Privacy notice</span>
                <span aria-hidden="true" className="arrow-link__icon">
                  →
                </span>
              </Link>
            </div>

            <div className="aside-card aside-card--quiet">
              <p className="label">Urgent concerns</p>
              <p>
                This form is not monitored for urgent medical matters. If you need urgent
                help, contact your local emergency services or a medical professional
                directly.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
