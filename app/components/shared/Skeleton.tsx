interface SkeletonProps {
  /** Width (Tailwind class or custom) */
  width?: string
  /** Height (Tailwind class or custom) */
  height?: string
  /** Make it circular */
  rounded?: boolean
  /** Additional CSS classes */
  className?: string
}

interface SkeletonTextProps {
  /** Number of lines to render */
  lines?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Skeleton Component
 *
 * Base skeleton placeholder for loading states.
 * Uses pulse animation defined in globals.css.
 *
 * @example
 * <Skeleton width="w-32" height="h-8" />
 * <Skeleton width="w-full" height="h-40" className="rounded-2xl" />
 */
export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  rounded,
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${width} ${height} ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Skeleton.Text
 *
 * Multiple skeleton lines for text content.
 *
 * @example
 * <Skeleton.Text lines={3} />
 */
export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton-text ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton.Title
 *
 * Skeleton for headings/titles.
 *
 * @example
 * <Skeleton.Title />
 */
export function SkeletonTitle({ className = '' }: { className?: string }) {
  return <div className={`skeleton-title w-3/4 ${className}`} aria-hidden="true" />
}

/**
 * Skeleton.Image
 *
 * Skeleton for image placeholders.
 *
 * @example
 * <Skeleton.Image />
 */
export function SkeletonImage({ className = '' }: { className?: string }) {
  return <div className={`skeleton-image ${className}`} aria-hidden="true" />
}

/**
 * Skeleton.Avatar
 *
 * Circular skeleton for avatars/icons.
 *
 * @example
 * <Skeleton.Avatar size={48} />
 */
export function SkeletonAvatar({
  size = 40,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={`skeleton rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}

/**
 * Skeleton.Card
 *
 * Complete card skeleton with image and text.
 *
 * @example
 * <Skeleton.Card />
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`border border-border rounded-2xl overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <SkeletonImage />
      <div className="p-5 space-y-3">
        <Skeleton width="w-3/4" height="h-6" />
        <Skeleton width="w-1/2" height="h-4" />
        <SkeletonText lines={2} />
        <div className="flex gap-2 pt-2">
          <Skeleton width="flex-1" height="h-10" className="rounded-xl" />
          <Skeleton width="flex-1" height="h-10" className="rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Attach sub-components
Skeleton.Text = SkeletonText
Skeleton.Title = SkeletonTitle
Skeleton.Image = SkeletonImage
Skeleton.Avatar = SkeletonAvatar
Skeleton.Card = SkeletonCard

export default Skeleton
