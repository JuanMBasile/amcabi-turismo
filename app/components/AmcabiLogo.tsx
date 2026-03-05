interface AmcabiLogoProps {
  className?: string
  /** Controls overall scale. Default 1. */
  scale?: number
  /** Use on dark backgrounds — makes ".com" and subtitle lighter. */
  dark?: boolean
  /** All-white variant for use on colorful/dark banners. */
  white?: boolean
}

/**
 * AMCABI wordmark logo — "amcabi" bold italic pink + ".com" muted.
 * Matches the original amcabi.com.ar header identity.
 */
export default function AmcabiLogo({ className, scale = 1, dark = false, white = false }: AmcabiLogoProps) {
  const w = 180 * scale
  const h = 44 * scale

  const mainFill = white ? '#FFFFFF' : '#E91E8C'
  const comFill = white
    ? 'rgba(255,255,255,0.75)'
    : dark
      ? 'rgba(255,255,255,0.55)'
      : '#C4A8B4'
  const subtitleFill = white
    ? 'rgba(255,255,255,0.5)'
    : dark
      ? 'rgba(255,255,255,0.35)'
      : '#C4A8B4'

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 180 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* "amcabi" — extra-bold italic */}
      <text
        x="2"
        y="32"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="34"
        fill={mainFill}
        letterSpacing="-1"
      >
        amcabi
      </text>
      {/* ".com" — normal weight */}
      <text
        x="131"
        y="32"
        fontFamily="Montserrat, sans-serif"
        fontWeight="500"
        fontSize="18"
        fill={comFill}
      >
        .com
      </text>
      {/* Legajo — tiny subtitle */}
      <text
        x="3"
        y="42"
        fontFamily="Montserrat, sans-serif"
        fontWeight="500"
        fontSize="7"
        fill={subtitleFill}
        letterSpacing="0.5"
      >
        LEGAJO N° 14703 · DISP. N° 307/11
      </text>
    </svg>
  )
}
