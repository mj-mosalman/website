import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'

export function PrivacyPage() {
  usePageMeta({
    title: 'Privacy Notice',
    description:
      'How consultation requests and personal information submitted through the Aurelia Aesthetic Clinic website are handled.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Privacy</p>
          <h1 className="page-title">Privacy Notice</h1>
          <p className="lede">
            A short, plain explanation of what happens to the information you send through
            this website.
          </p>
          <p className="note">Last updated {clinic.legal.privacyLastUpdated}</p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container prose">
          <div className="status-banner status-banner--inline" role="note">
            <p className="status-banner__title">Draft — subject to legal review</p>
            <p>{clinic.legal.policyStatus}</p>
          </div>

          <h2>What this notice covers</h2>
          <p>
            This notice covers the information you provide when you request a consultation
            through this website. It does not cover information collected in the clinic
            during an appointment, which is handled under the clinic’s clinical records
            policy.
          </p>

          <h2>Information we collect</h2>
          <p>The consultation form collects:</p>
          <ul>
            <li>Your name and email address</li>
            <li>Your preferred contact method, and a phone number if you choose phone contact</li>
            <li>The treatment you are interested in, or “Not sure yet”</li>
            <li>An optional preferred date and time window</li>
            <li>Whether you opted in to occasional clinic news</li>
          </ul>
          <p>
            We deliberately do not ask for medical history, medication lists, photographs,
            identity documents or payment details through this form.
          </p>

          <h2>How the information is used</h2>
          <p>
            Your request is used to contact you about availability and to answer your
            enquiry. Marketing consent is separate, optional, and never a condition of
            requesting care. Declining it does not affect your request.
          </p>

          <h2>Storage and access</h2>
          <p>
            Requests are stored by this website’s own service so that clinic staff can
            review and respond to them. They are not sent to third-party analytics or
            advertising services, and form contents are not included in server logs.
          </p>

          <h2>Retention</h2>
          <p>
            A retention period has not yet been set. It must be defined by the clinic — in
            line with the legal requirements of its jurisdiction — before this site is used
            to receive real enquiries.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct or delete
            the information you have submitted. To exercise them, contact the clinic using
            the details on the contact page once they are published.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website sets no analytics or advertising cookies. Fonts and other static
            assets may be requested from third-party delivery networks, which can receive
            your IP address as part of that request.
          </p>

          <h2>Jurisdiction</h2>
          <p>
            The clinic’s operating jurisdiction has not been supplied, so the specific
            regulatory framework that applies to this notice is unresolved. This notice
            must not be read as a claim of compliance with any particular regulation.
          </p>
        </div>
      </section>
    </>
  )
}
