import { usePageMeta } from '../lib/seo'

export function AccessibilityPage() {
  usePageMeta({
    title: 'Accessibility',
    description:
      'Accessibility practices on the Aurelia Aesthetic Clinic website, and how to report a barrier.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Accessibility</p>
          <h1 className="page-title">Accessibility Statement</h1>
          <p className="lede">
            What this site does to be usable with a keyboard, a screen reader, and reduced
            motion.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container prose">
          <h2>What is implemented</h2>
          <ul>
            <li>Semantic landmarks and a skip link to the main content</li>
            <li>A logical heading order on every page</li>
            <li>Visible keyboard focus styling, not suppressed outlines</li>
            <li>
              A mobile menu that can be closed with Escape and returns focus to the button
              that opened it
            </li>
            <li>Form fields with persistent labels, inline error messages and autocomplete hints</li>
            <li>A carousel operable with pointer, touch and arrow keys, without autoplay</li>
            <li>Motion that respects the operating system’s reduced-motion preference</li>
            <li>Text checked for contrast against its background, including on dark sections</li>
          </ul>

          <h2>Known limitations</h2>
          <ul>
            <li>
              Typography is delivered from a third-party font service. Where it is blocked,
              the site falls back to system serif and sans-serif faces, and layout remains
              intact.
            </li>
            <li>
              Imagery is currently illustrative abstract artwork with descriptive text. It
              will be replaced by photography, which will require new alt text.
            </li>
            <li>
              A formal audit against WCAG 2.2 AA has not been carried out. The practices
              above are implemented and partially verified, not certified.
            </li>
          </ul>

          <h2>Reporting a barrier</h2>
          <p>
            If something on this site is difficult to use, please describe it in your
            consultation request or raise it at your appointment. Contact details will be
            published on the contact page once verified.
          </p>
        </div>
      </section>
    </>
  )
}
