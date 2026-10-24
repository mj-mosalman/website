import { usePageMeta } from '../lib/seo'
import { clinic, hasVerifiedContact } from '../content/clinic'
import { LinkButton } from '../components/ui/Button'
import { Link } from '../router/Router'

export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'How to reach Aurelia Aesthetic Clinic. Consultation requests are received through the website form; verified phone, email and address details will be listed here.',
  })

  const verified = hasVerifiedContact()

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Contact</p>
          <h1 className="page-title">Speak With the Clinic</h1>
          <p className="lede">
            Consultation requests are received through the website form. The clinic then
            contacts you to discuss availability.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container contact-grid">
          <div className="contact-primary">
            <h2 className="section-title">Request a consultation</h2>
            <p>
              The most direct way to reach the clinic is the consultation request form. It
              asks only for what is needed to arrange contact.
            </p>
            <LinkButton to="/consultation">Request a Consultation</LinkButton>

            <h2 className="section-title section-title--spaced">Clinic details</h2>
            {verified ? (
              <dl className="contact-details">
                {clinic.contact.phone ? (
                  <>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${clinic.contact.phone.replace(/\s+/g, '')}`}>
                        {clinic.contact.phone}
                      </a>
                    </dd>
                  </>
                ) : null}
                {clinic.contact.email ? (
                  <>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${clinic.contact.email}`}>{clinic.contact.email}</a>
                    </dd>
                  </>
                ) : null}
                {clinic.contact.addressLines ? (
                  <>
                    <dt>Address</dt>
                    <dd>
                      {clinic.contact.addressLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                      {clinic.contact.directionsUrl ? (
                        <a
                          className="inline-link"
                          href={clinic.contact.directionsUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Open directions
                        </a>
                      ) : null}
                    </dd>
                  </>
                ) : null}
                {clinic.contact.openingHours ? (
                  <>
                    <dt>Opening hours</dt>
                    <dd>
                      {clinic.contact.openingHours.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </dd>
                  </>
                ) : null}
              </dl>
            ) : (
              <div className="status-banner status-banner--inline" role="note">
                <p className="status-banner__title">Clinic contact details are not yet supplied</p>
                <p>
                  A phone number, email address, opening hours and street address have not
                  been provided. Nothing is displayed here until those details are verified,
                  because an inaccurate address or number in a clinical setting is worse
                  than none.
                </p>
                <p>
                  Requests sent through the website form reach the clinic’s consultation
                  inbox and are the supported contact route for now.
                </p>
              </div>
            )}
          </div>

          <aside className="contact-aside">
            <div className="aside-card aside-card--quiet">
              <p className="label">Urgent concerns</p>
              <p>
                This website and its forms are not monitored for urgent medical matters. If
                you need urgent help, contact your local emergency services or a medical
                professional directly.
              </p>
            </div>
            <div className="aside-card aside-card--quiet">
              <p className="label">Before you write</p>
              <p>
                Please do not send medical history, medication lists, photographs or
                identity documents through the enquiry form. Those are discussed at
                consultation.
              </p>
              <Link to="/journal/preparing-for-your-first-visit" className="arrow-link arrow-link--small">
                <span>Preparing for your visit</span>
                <span aria-hidden="true" className="arrow-link__icon">
                  →
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
