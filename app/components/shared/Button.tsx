import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant
  /** Size preset */
  size?: ButtonSize
  /** Button content */
  children: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Loading state - shows spinner */
  loading?: boolean
  /** Additional CSS classes */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset'
  /** Accessible label */
  'aria-label'?: string
}

interface ButtonLinkProps extends Omit<ButtonProps, 'onClick' | 'type'> {
  /** Link destination */
  href: string
  /** Open in new tab */
  external?: boolean
}

const BASE_STYLES =
  'inline-flex items-center justify-center gap-2 font-body font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-pink hover:bg-pink-dark text-white focus-visible:ring-pink hover:shadow-lg hover:shadow-pink/25 hover:scale-105 active:scale-100',
  secondary:
    'bg-cyan hover:bg-cyan-dark text-ink hover:text-white focus-visible:ring-cyan hover:shadow-lg hover:shadow-cyan/25',
  ghost:
    'bg-transparent hover:bg-pink/10 text-pink focus-visible:ring-pink',
  outline:
    'bg-transparent border-2 border-pink text-pink hover:bg-pink hover:text-white focus-visible:ring-pink',
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-sm rounded-full',
}

function LoadingSpinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Button Component
 *
 * Reusable button with multiple variants and sizes.
 * Supports loading state with spinner.
 *
 * @example
 * <Button variant="primary" size="lg">Reservar ahora</Button>
 * <Button variant="outline" loading>Procesando...</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  loading,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const combinedStyles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  )
}

/**
 * ButtonLink Component
 *
 * Button styled as a link for navigation.
 * Uses Next.js Link for internal routes.
 *
 * @example
 * <ButtonLink href="/destinos" variant="primary">Ver destinos</ButtonLink>
 * <ButtonLink href="https://wa.me/..." external>WhatsApp</ButtonLink>
 */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  loading,
  className = '',
  href,
  external,
  'aria-label': ariaLabel,
}: ButtonLinkProps) {
  const combinedStyles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className} ${
    disabled ? 'pointer-events-none opacity-50' : ''
  }`

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedStyles}
        aria-label={ariaLabel}
        aria-busy={loading}
      >
        {loading && <LoadingSpinner />}
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={combinedStyles} aria-label={ariaLabel}>
      {loading && <LoadingSpinner />}
      {children}
    </Link>
  )
}

export default Button
