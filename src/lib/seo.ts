import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  type?: 'website' | 'article'
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/**
 * Preview and development environments stay out of search indexes. A production
 * build emits indexable metadata instead.
 */
export function usePageMeta({ title, description, type = 'website' }: PageMeta) {
  useEffect(() => {
    const fullTitle = `${title} — Aurelia Aesthetic Clinic`
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      import.meta.env.DEV ? 'noindex, nofollow' : 'index, follow',
    )
  }, [title, description, type])
}
