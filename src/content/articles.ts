/**
 * Journal content.
 *
 * These articles are general, administrative and educational in tone. None makes
 * a clinical claim, and every article is marked as awaiting clinical review until
 * a qualified practitioner signs it off.
 */

export type ArticleSection = { heading: string; paragraphs: string[] }

export type Article = {
  id: string
  slug: string
  title: string
  summary: string
  art: 'sand' | 'clay' | 'sage' | 'stone' | 'linen' | 'dusk' | 'pearl' | 'moss'
  imageAlt: string
  author: string | null
  medicalReviewer: string | null
  publishedAt: string
  updatedAt: string
  readingTime: string
  sections: ArticleSection[]
  relatedSlugs: string[]
  publicationStatus: 'published' | 'draft'
  medicalReviewStatus: 'pending-review' | 'reviewed'
}

export const articles: Article[] = [
  {
    id: 'ar-first-consultation',
    slug: 'what-to-expect-at-an-aesthetic-consultation',
    title: 'What to Expect at an Aesthetic Consultation',
    summary:
      'A calm walkthrough of the first appointment: what is discussed, what is not decided on the day, and how to arrive prepared.',
    art: 'linen',
    imageAlt: 'Illustrative warm ivory composition suggesting a quiet consultation room.',
    author: null,
    medicalReviewer: null,
    publishedAt: '2026-10-24',
    updatedAt: '2026-10-24',
    readingTime: '4 min read',
    sections: [
      {
        heading: 'Before you arrive',
        paragraphs: [
          'There is nothing to prepare beyond a note of what you have noticed and what you would like to change. If you have had aesthetic treatment before, it helps to know what was done and roughly when.',
          'A list of your current skin-care products is useful. Some products influence what can be planned, and it is easier to discuss them when they are in front of you rather than recalled from memory.',
        ],
      },
      {
        heading: 'In the room',
        paragraphs: [
          'The conversation starts with your concerns rather than with a treatment. What have you noticed, how long has it been present, and how does it affect you? The answers shape everything that follows.',
          'Your practitioner will review relevant history, examine the area in question and explain which options are appropriate. It is equally part of the conversation to explain which options are not appropriate, and why.',
        ],
      },
      {
        heading: 'Questions worth asking',
        paragraphs: [
          'Ask what the realistic outcome is, what recovery involves in practical terms, and what happens if you are unhappy with the result. Ask who would perform the treatment and what their qualifications are.',
          'Ask, too, what happens if you decide to do nothing. A good consultation should leave that as a comfortable option.',
        ],
      },
      {
        heading: 'After the appointment',
        paragraphs: [
          'You should leave with a clear summary and no obligation. Decisions made after reflection are usually better than decisions made in the room.',
        ],
      },
    ],
    relatedSlugs: ['questions-before-choosing-a-treatment', 'preparing-for-your-first-visit'],
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
  },
  {
    id: 'ar-questions',
    slug: 'questions-before-choosing-a-treatment',
    title: 'Questions to Ask Before Choosing a Treatment',
    summary:
      'A short, practical list of questions that make a treatment decision clearer — about suitability, recovery, and who is treating you.',
    art: 'clay',
    imageAlt: 'Illustrative clay-toned panel with a soft vertical light band.',
    author: null,
    medicalReviewer: null,
    publishedAt: '2026-10-24',
    updatedAt: '2026-10-24',
    readingTime: '3 min read',
    sections: [
      {
        heading: 'About suitability',
        paragraphs: [
          'Ask why this treatment is being suggested for you specifically, and what would make it unsuitable. A recommendation that cannot explain its own reasoning is worth a second conversation.',
          'Ask what alternatives exist, including doing nothing, and how they compare in terms of commitment and recovery.',
        ],
      },
      {
        heading: 'About the practitioner',
        paragraphs: [
          'Ask who will perform the treatment, what their qualifications are, and what they do if a complication occurs. For injectable treatments, ask whether the practitioner is qualified to prescribe and to manage complications.',
        ],
      },
      {
        heading: 'About recovery and cost',
        paragraphs: [
          'Ask what the days afterwards realistically look like, and how much time away from work or social plans to allow. Ask what the full cost includes, including any review appointments.',
          'Ask what happens if the result falls short of what was discussed. Understanding the review process in advance removes a source of anxiety later.',
        ],
      },
    ],
    relatedSlugs: ['what-to-expect-at-an-aesthetic-consultation', 'understanding-treatment-plans'],
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
  },
  {
    id: 'ar-plans',
    slug: 'understanding-treatment-plans',
    title: 'Understanding Individual Treatment Plans',
    summary:
      'Why two people with similar concerns may leave with different plans, and what a well-explained plan should contain.',
    art: 'sage',
    imageAlt: 'Illustrative sage-toned panel with layered soft light.',
    author: null,
    medicalReviewer: null,
    publishedAt: '2026-10-24',
    updatedAt: '2026-10-24',
    readingTime: '4 min read',
    sections: [
      {
        heading: 'Why plans differ',
        paragraphs: [
          'Skin behaviour, history, medication, tolerance for recovery and personal preference all influence which options are appropriate. A plan designed for one person is not transferable to another, even where the concern sounds the same.',
        ],
      },
      {
        heading: 'What a plan should include',
        paragraphs: [
          'A useful plan states what is being treated, which options are proposed and in what order, what recovery to expect, and when the result will be reviewed. It should also state what is being deliberately left out, and why.',
          'Review points matter. Skin and faces change, and a plan that cannot be adjusted after the first stage is not really a plan.',
        ],
      },
      {
        heading: 'When to slow down',
        paragraphs: [
          'If a plan involves many treatments at once, or is difficult to explain in plain language, it is reasonable to ask for a simpler first step. Conservative treatment with review is a legitimate and often preferable approach.',
        ],
      },
    ],
    relatedSlugs: ['questions-before-choosing-a-treatment', 'what-to-expect-at-an-aesthetic-consultation'],
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
  },
  {
    id: 'ar-preparing',
    slug: 'preparing-for-your-first-visit',
    title: 'Preparing for Your First Clinic Visit',
    summary:
      'Small, practical preparations that make a first appointment more useful — and the things you do not need to bring.',
    art: 'stone',
    imageAlt: 'Illustrative stone-toned panel with a fine arch outline.',
    author: null,
    medicalReviewer: null,
    publishedAt: '2026-10-24',
    updatedAt: '2026-10-24',
    readingTime: '3 min read',
    sections: [
      {
        heading: 'Practical preparation',
        paragraphs: [
          'Arrive with a clean face where possible, so the skin can be assessed directly. Bring a note of current products and any treatments in the last twelve months.',
          'If you are considering treatment before an event, mention the date. Recovery can then be planned around it rather than discovered afterwards.',
        ],
      },
      {
        heading: 'What to disclose',
        paragraphs: [
          'Disclose medications, including blood thinners and anything that increases light sensitivity, along with relevant medical conditions and previous reactions to treatments. This is safety information, and it changes what can be offered.',
        ],
      },
      {
        heading: 'What not to bring',
        paragraphs: [
          'There is no need to bring medical records, identity documents or photographs of the area unless the clinic has specifically asked. Please do not send photographs with an enquiry: the enquiry form is intended only to arrange contact.',
        ],
      },
    ],
    relatedSlugs: ['what-to-expect-at-an-aesthetic-consultation', 'understanding-treatment-plans'],
    publicationStatus: 'published',
    medicalReviewStatus: 'pending-review',
  },
]

export const publishedArticles = articles.filter(
  (article) => article.publicationStatus === 'published',
)

export function getArticleBySlug(slug: string): Article | undefined {
  return publishedArticles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => publishedArticles.find((item) => item.slug === slug))
    .filter((item): item is Article => Boolean(item))
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
