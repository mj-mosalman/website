type PhotoProps = {
  src: string
  alt: string
  /** CSS aspect-ratio, e.g. "4/5". Defaults to 4/5. */
  ratio?: string
  className?: string
  /** CSS object-position for the crop, e.g. "center 30%". */
  focus?: string
  /** Set on the first image above the fold so it is not deferred. */
  priority?: boolean
}

/**
 * Photographic media with the site's shared colour grade.
 *
 * All photography on the site goes through this component so crops, corner
 * radius and grading stay consistent. Pass `alt=""` only for decorative images.
 */
export function Photo({
  src,
  alt,
  ratio = '4/5',
  className = '',
  focus,
  priority = false,
}: PhotoProps) {
  return (
    <figure className={`photo ${className}`.trim()} style={{ aspectRatio: ratio }}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        /* React 18 warns on the camelCase `fetchPriority`; the lowercase
           attribute is passed straight through and browsers honour it. */
        {...(priority ? { fetchpriority: 'high' as const } : {})}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </figure>
  )
}
