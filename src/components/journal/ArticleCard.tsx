import { Link } from '../../router/Router'
import { formatDate, type Article } from '../../content/articles'
import { ArtPanel } from '../ui/ArtPanel'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link to={`/journal/${article.slug}`} className="article-card__media" tabIndex={-1} aria-hidden="true">
        <ArtPanel tone={article.art} alt="" ratio="16/9" motif="column" />
      </Link>
      <p className="article-card__meta">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTime}</span>
      </p>
      <h3 className="article-card__title">
        <Link to={`/journal/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="article-card__summary">{article.summary}</p>
      <Link to={`/journal/${article.slug}`} className="arrow-link arrow-link--small">
        <span>Read article</span>
        <span aria-hidden="true" className="arrow-link__icon">
          →
        </span>
      </Link>
    </article>
  )
}
