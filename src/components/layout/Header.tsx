import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, normalizePath, useRouter } from '../../router/Router'
import { mainNav } from '../../content/navigation'
import { clinic } from '../../content/clinic'
import { LinkButton } from '../ui/Button'
import { MobileNav } from './MobileNav'

export function Header({ overlay = false }: { overlay?: boolean }) {
  const { pathname } = useRouter()
  const current = normalizePath(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // Stable identity: the menu's focus/escape effect depends on this callback, and
  // an inline arrow would re-run it on every scroll-driven header re-render.
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const transparent = overlay && !stuck

  return (
    <header
      className={`site-header ${transparent ? 'site-header--overlay' : 'site-header--solid'}`}
    >
      <div className="container site-header__inner">
        <Link to="/" className="wordmark" aria-label={`${clinic.name} — home`}>
          <span className="wordmark__mark" aria-hidden="true">
            {clinic.monogram}
          </span>
          <span className="wordmark__text">
            <span className="wordmark__first">{clinic.wordmark.first}</span>
            <span className="wordmark__second">{clinic.wordmark.second}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {mainNav.map((item) => {
              const active = item.to === '/' ? current === '/' : current.startsWith(item.to)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`site-nav__link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LinkButton
            to="/consultation"
            variant={transparent ? 'light' : 'primary'}
            className="site-header__cta"
          >
            <span className="header-cta__full">Book a Consultation</span>
            <span className="header-cta__short" aria-hidden="true">
              Book
            </span>
          </LinkButton>
          <button
            type="button"
            ref={triggerRef}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={closeMenu}
        returnFocusTo={triggerRef}
        currentPath={current}
      />
    </header>
  )
}
