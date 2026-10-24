import type { ReactNode } from 'react'
import { normalizePath, useRouter } from '../../router/Router'
import { Header } from './Header'
import { Footer, useRouteFocus } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter()
  const overlay = normalizePath(pathname) === '/'
  useRouteFocus()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header overlay={overlay} />
      <main id="main" tabIndex={-1} className={overlay ? 'main--over-hero' : 'main--offset'}>
        {children}
      </main>
      <Footer />
    </>
  )
}
