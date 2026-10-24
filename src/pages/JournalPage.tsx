import { usePageMeta } from '../lib/seo'
import { publishedArticles } from '../content/articles'
import { ArticleCard } from '../components/journal/ArticleCard'

export function JournalPage() {
  usePageMeta({
    title: 'Journal',
    description:
      'General guidance from Aurelia Aesthetic Clinic on consultations, choosing a treatment and preparing for a first visit.',
  })

  return (
    <>
      <section className="page-intro">
        <div className="container page-intro__inner">
          <p className="label">Journal</p>
          <h1 className="page-title">Notes Before You Decide</h1>
          <p className="lede">
            General, practical guidance on consultations and treatment planning. These
            articles are educational and are not a substitute for individual advice.
          </p>
        </div>
      </section>

      <section className="section section--porcelain section--tight">
        <div className="container">
          <ul className="article-grid">
            {publishedArticles.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
          <p className="note note--spaced">
            Articles are written for general information and are awaiting clinical review by
            a qualified practitioner before launch.
          </p>
        </div>
      </section>
    </>
  )
}
