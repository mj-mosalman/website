import { Link } from '../router/Router'
import { usePageMeta } from '../lib/seo'
import { clinic } from '../content/clinic'
import {
  formatDate,
  getArticleBySlug,
  getRelatedArticles,
  type Article,
} from '../content/articles'
import { ArtPanel } from '../components/ui/ArtPanel'
import { LinkButton } from '../components/ui/Button'
import { ArticleCard } from '../components/journal/ArticleCard'
import { NotFoundPage } from './NotFoundPage'

export function ArticlePage({ article }: { article: Article }) {
  usePageMeta({
    title: article.title,
    description: article.summary,
    type: 'article',
  })

  const related = getRelatedArticles(article)

  return (
    <>
      <article>
        <header className="article-header">
          <div className="container article-header__inner">
            <p className="breadcrumb">
              <Link to="/journal">Journal</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Article</span>
            </p>
            <h1 className="page-title">{article.title}</h1>
            <p className="lede">{article.summary}</p>
            <p className="article-meta">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              {article.author ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{article.author}</span>
                </>
              ) : null}
            </p>
          </div>
        </header>

        <div className="container article-media">
          <ArtPanel tone={article.art} alt={article.imageAlt} ratio="16/9" motif="column" />
        </div>

        <div className="container article-body">
          <p className="status-banner status-banner--inline" role="note">
            <strong>Editorial review pending.</strong> This article is general information,
            not medical advice, and is awaiting review by a qualified practitioner.
          </p>

          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <p className="disclaimer-box">
            <strong>General information.</strong> {clinic.generalDisclaimer}
          </p>

          <div className="article-cta">
            <p className="label">Next step</p>
            <h2>Discuss your own situation</h2>
            <p>
              An individual consultation is the appropriate place to discuss suitability.
            </p>
            <LinkButton to="/consultation">Request a Consultation</LinkButton>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section section--ivory" aria-labelledby="related-articles">
          <div className="container">
            <h2 id="related-articles" className="section-title">
              Related reading
            </h2>
            <ul className="article-grid">
              {related.map((item) => (
                <li key={item.id}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}

export function ArticleRoute({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)
  if (!article) return <NotFoundPage message="That article could not be found." />
  return <ArticlePage article={article} />
}
