import type { ArtTone } from '../../content/treatments'

type ArtPanelProps = {
  tone: ArtTone
  /** Describes what the panel illustrates. Empty string marks it decorative. */
  alt: string
  ratio?: '4/5' | '1/1' | '3/2' | '16/9' | '3/4'
  motif?: 'arch' | 'ring' | 'column'
  className?: string
}

/**
 * Development imagery.
 *
 * No licensed photography of the clinic, its team or its patients is available
 * yet, so imagery is deliberately abstract: layered warm tones, sculptural light
 * and fine champagne lines. These panels are labelled as development imagery in
 * the interface and must be replaced with authorised photography before launch.
 */
export function ArtPanel({
  tone,
  alt,
  ratio = '4/5',
  motif = 'arch',
  className = '',
}: ArtPanelProps) {
  return (
    <div
      className={`art art--${tone} art--${motif} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <span className="art__glow" />
      <span className="art__shape" />
      <span className="art__grain" />
    </div>
  )
}
