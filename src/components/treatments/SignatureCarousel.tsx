import { useCallback, useEffect, useRef, useState } from 'react'
import type { Treatment } from '../../content/treatments'
import { TreatmentCard } from './TreatmentCard'

type DragState = { active: boolean; startX: number; startScroll: number; moved: boolean }

export function SignatureCarousel({ treatments }: { treatments: Treatment[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const drag = useRef<DragState>({ active: false, startX: 0, startScroll: 0, moved: false })
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [progress, setProgress] = useState(0)

  const measure = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(max <= 4 || el.scrollLeft >= max - 4)
    setProgress(max <= 0 ? 100 : Math.min(100, Math.max(0, (el.scrollLeft / max) * 100)))
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const step = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.treatment-card')
    const gap = 24
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div
        ref={scrollerRef}
        className="carousel__scroller"
        role="group"
        aria-label="Signature treatments carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            step(1)
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            step(-1)
          }
        }}
        onPointerDown={(event) => {
          const el = scrollerRef.current
          if (!el || event.pointerType !== 'mouse' || event.button !== 0) return
          drag.current = {
            active: true,
            startX: event.clientX,
            startScroll: el.scrollLeft,
            moved: false,
          }
        }}
        onPointerMove={(event) => {
          const el = scrollerRef.current
          if (!el || !drag.current.active || event.buttons !== 1) return
          const delta = event.clientX - drag.current.startX
          if (Math.abs(delta) > 4) drag.current.moved = true
          el.scrollLeft = drag.current.startScroll - delta
        }}
        onPointerUp={() => {
          drag.current.active = false
        }}
        onPointerCancel={() => {
          drag.current.active = false
        }}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault()
            event.stopPropagation()
            drag.current.moved = false
          }
        }}
      >
        {treatments.map((treatment) => (
          <div className="carousel__slide" key={treatment.id} draggable={false}>
            <TreatmentCard treatment={treatment} />
          </div>
        ))}
      </div>

      <div className="carousel__controls">
        <div className="carousel__track" aria-hidden="true">
          <span className="carousel__progress" style={{ width: `${progress}%` }} />
        </div>
        <div className="carousel__buttons">
          <button
            type="button"
            className="round-button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous treatments"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="round-button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next treatments"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
