type CardVariant = 'default' | 'elevated' | 'glass'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps {
  /** Visual style variant */
  variant?: CardVariant
  /** Internal padding */
  padding?: CardPadding
  /** Card content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Make card interactive with hover effects */
  interactive?: boolean
  /** Click handler for interactive cards */
  onClick?: () => void
  /** Accessible label for interactive cards */
  'aria-label'?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const VARIANT_STYLES: Record<CardVariant, string> = {
  default:
    'bg-surface border border-border shadow-sm transition-all duration-200',
  elevated:
    'bg-surface shadow-xl shadow-ink/10 transition-all duration-200',
  glass:
    'glass-card transition-all duration-200',
}

const PADDING_STYLES: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6 md:p-8',
}

const INTERACTIVE_STYLES =
  'cursor-pointer hover:border-pink/40 hover:shadow-lg hover:shadow-pink/8 hover:-translate-y-1 card-3d'

/**
 * Card Component
 *
 * Versatile card container with multiple variants.
 * Supports composition via Card.Header, Card.Body, Card.Footer.
 *
 * @example
 * <Card variant="elevated" padding="md">
 *   <Card.Header>Titulo</Card.Header>
 *   <Card.Body>Contenido...</Card.Body>
 *   <Card.Footer>Acciones</Card.Footer>
 * </Card>
 */
function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  interactive,
  onClick,
  'aria-label': ariaLabel,
}: CardProps) {
  const combinedStyles = `rounded-2xl ${VARIANT_STYLES[variant]} ${PADDING_STYLES[padding]} ${
    interactive ? INTERACTIVE_STYLES : ''
  } ${className}`

  if (interactive && onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        className={combinedStyles}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    )
  }

  return <div className={combinedStyles}>{children}</div>
}

/**
 * Card.Header
 *
 * Optional header section for cards.
 */
function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`border-b border-border pb-4 mb-4 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Card.Body
 *
 * Main content area of the card.
 */
function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={className}>{children}</div>
}

/**
 * Card.Footer
 *
 * Optional footer section for cards (actions, links).
 */
function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`border-t border-border pt-4 mt-4 ${className}`}>
      {children}
    </div>
  )
}

// Attach sub-components
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card, CardHeader, CardBody, CardFooter }
export default Card
