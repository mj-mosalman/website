import { usePageMeta } from '../lib/seo'
import { LinkButton } from '../components/ui/Button'
import { Link } from '../router/Router'

export function NotFoundPage({ message }: { message?: string }) {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you requested could not be found.',
  })

  return (
    <section className="section section--ivory not-found">
      <div className="container not-found__inner">
        <p className="label">404</p>
        <h1 className="page-title">This page could not be found.</h1>
        <p className="lede">
          {message ?? 'The link may be out of date, or the page may have moved.'}
        </p>
        <div className="not-found__actions">
          <LinkButton to="/">Return home</LinkButton>
          <Link to="/treatments" className="arrow-link">
            <span>Browse treatments</span>
            <span aria-hidden="true" className="arrow-link__icon">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
