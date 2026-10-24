import { useEffect, useRef, type RefObject } from 'react'
import { Link } from '../../router/Router'
import { mainNav } from '../../content/navigation'
import { LinkButton } from '../ui/Button'

type MobileNavProps = {
  open: boolean
  onClose: () => void
  returnFocusTo: RefObject<HTMLButtonElement | null>
  currentPath: string
}

export function MobileNav({ open, onClose, returnFocusTo, currentPath }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusable?.[0]?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      // Only reclaim focus when it was inside the panel being removed, so opening
      // a link (which moves focus to main) is not fought over.
      const active = document.activeElement
      if (!active || active === document.body || panel?.contains(active)) {
        returnFocusTo.current?.focus()
      }
    }
  }, [open, onClose, returnFocusTo])

  if (!open) return null

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      className="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <nav aria-label="Mobile">
        <ul className="mobile-nav__list">
          {mainNav.map((item) => {
            const active = item.to === '/' ? currentPath === '/' : currentPath.startsWith(item.to)
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`mobile-nav__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="mobile-nav__cta">
        <LinkButton to="/consultation" variant="light" onClick={onClose}>
          Request a Consultation
        </LinkButton>
      </div>
      <p className="mobile-nav__note">
        Consultation requests are received through the website form. Appointment
        times are confirmed by the clinic.
      </p>
    </div>
  )
}
