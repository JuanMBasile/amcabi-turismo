type BadgeVariant = 'pink' | 'cyan' | 'yellow' | 'purple' | 'muted'

interface BadgeProps {
  /** Color variant */
  variant?: BadgeVariant
  /** Badge content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Make badge larger */
  large?: boolean
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  pink: 'bg-pink/10 text-pink',
  cyan: 'bg-cyan/10 text-cyan-dark',
  yellow: 'bg-yellow/10 text-yellow-dark',
  purple: 'bg-purple/10 text-purple',
  muted: 'bg-ink-faint/20 text-ink-muted',
}

/**
 * Badge Component
 *
 * Small label for status indicators, categories, or tags.
 * Uses brand colors from the design system.
 *
 * @example
 * <Badge variant="pink">PREVENTA</Badge>
 * <Badge variant="cyan">NUEVO</Badge>
 * <Badge variant="yellow" large>OFERTA</Badge>
 */
export function Badge({
  variant = 'pink',
  children,
  className = '',
  large,
}: BadgeProps) {
  const sizeStyles = large
    ? 'px-3 py-1 text-xs'
    : 'px-2 py-0.5 text-[10px]'

  return (
    <span
      className={`inline-flex items-center font-body font-bold uppercase tracking-wider rounded-full ${sizeStyles} ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
