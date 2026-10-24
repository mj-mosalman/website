import { useEffect } from 'react'
import { Link, normalizePath, useRouter } from '../../router/Router'
import { mainNav, footerUtility } from '../../content/navigation'
import { clinic, hasVerifiedContact } from '../../content/clinic'

const year = new Date().getFullYear()

export function Footer() {
  const { pathname } = useRouter()
  const current = normalizePath(pathname)
  const contactReady = hasVerifiedContact()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="wordmark wordmark--light" aria-label={`${clinic.name} — home`}>
            <span className="wordmark__mark" aria-hidden="true">
              {clinic.monogram}
            </span>
            <span className="wordmark__text">
              <span className="wordmark__first">{clinic.wordmark.first}</span>
              <span className="wordmark__second">{clinic.wordmark.second}</span>
            </span>
          </Link>
          <p className="site-footer__tagline">{clinic.tagline}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <h2 className="site-footer__heading">Explore</h2>
          <ul>
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={
                    (item.to === '/' ? current === '/' : current.startsWith(item.to))
                      ? 'page'
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__nav">
          <h2 className="site-footer__heading">Clinic</h2>
          <ul>
            {footerUtility.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="site-footer__contact">
            {contactReady
              ? 'Contact details are listed on the contact page.'
              : 'Phone, email and address have not been supplied yet. Requests are received through the consultation form.'}
          </p>
        </div>
      </div>

      <div className="container site-footer__base">
        <p className="site-footer__small">
          © {year} {clinic.name}. All rights reserved.
        </p>
        <p className="site-footer__small site-footer__small--muted">
          Imagery on this site is illustrative pending authorised clinic photography.
          General information only — not medical advice.
        </p>
      </div>
    </footer>
  )
}

/** Moves focus to the main landmark after a route change. */
export function useRouteFocus() {
  const { pathname } = useRouter()

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    main.focus({ preventScroll: true })
  }, [pathname])
}
