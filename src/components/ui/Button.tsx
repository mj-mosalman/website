import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from '../../router/Router'

type Variant = 'primary' | 'outline' | 'light' | 'quiet'

const classes: Record<Variant, string> = {
  primary: 'btn btn--primary',
  outline: 'btn btn--outline',
  light: 'btn btn--light',
  quiet: 'btn btn--quiet',
}

type LinkButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'className'
> & {
  to: string
  variant?: Variant
  children: ReactNode
  className?: string
}

export function LinkButton({
  to,
  variant = 'primary',
  children,
  className = '',
  ...rest
}: LinkButtonProps) {
  return (
    <Link to={to} className={`${classes[variant]} ${className}`.trim()} {...rest}>
      {children}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${classes[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}

export function ArrowLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`arrow-link ${className}`.trim()}>
      <span>{children}</span>
      <span aria-hidden="true" className="arrow-link__icon">
        →
      </span>
    </Link>
  )
}
