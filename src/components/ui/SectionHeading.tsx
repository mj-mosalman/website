import type { ReactNode } from 'react'

type SectionHeadingProps = {
  label?: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  as?: 'h2' | 'h3'
}

export function SectionHeading({
  label,
  title,
  intro,
  tone = 'light',
  align = 'start',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading--${tone} section-heading--${align}`}
    >
      {label ? <p className="label">{label}</p> : null}
      <Tag className="section-heading__title">{title}</Tag>
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </div>
  )
}
