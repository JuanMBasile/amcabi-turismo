/**
 * ConfettiDecor — Decorative confetti elements inspired by AMCABI logo
 *
 * Renders floating colored bars that match the brand's playful aesthetic.
 * Use in hero sections and dark backgrounds for visual interest.
 */

interface ConfettiBar {
  color: 'pink' | 'yellow' | 'cyan' | 'orange'
  x: string      // CSS position (e.g., "10%", "85%")
  y: string      // CSS position
  height: number // in px
  rotation: number // degrees
  delay: number  // animation delay in seconds
  duration: number // animation duration in seconds
  opacity?: number
}

const DEFAULT_BARS: ConfettiBar[] = [
  // Top area
  { color: 'cyan',   x: '8%',  y: '12%', height: 28, rotation: -35, delay: 0,   duration: 5,   opacity: 0.7 },
  { color: 'pink',   x: '18%', y: '8%',  height: 20, rotation: 55,  delay: 0.8, duration: 4.2, opacity: 0.5 },
  { color: 'yellow', x: '88%', y: '15%', height: 32, rotation: -50, delay: 0.3, duration: 4.8, opacity: 0.65 },
  { color: 'orange', x: '78%', y: '6%',  height: 18, rotation: 40,  delay: 1.2, duration: 5.5, opacity: 0.5 },

  // Middle area
  { color: 'cyan',   x: '5%',  y: '45%', height: 24, rotation: 65,  delay: 0.5, duration: 4.5, opacity: 0.6 },
  { color: 'yellow', x: '92%', y: '38%', height: 26, rotation: -55, delay: 0.2, duration: 5.2, opacity: 0.55 },
  { color: 'pink',   x: '95%', y: '55%', height: 20, rotation: 35,  delay: 1.0, duration: 4.0, opacity: 0.45 },

  // Bottom area
  { color: 'orange', x: '12%', y: '78%', height: 22, rotation: -40, delay: 0.7, duration: 4.8, opacity: 0.55 },
  { color: 'cyan',   x: '85%', y: '82%', height: 30, rotation: 50,  delay: 0.4, duration: 5.0, opacity: 0.6 },
  { color: 'yellow', x: '75%', y: '88%', height: 18, rotation: -60, delay: 1.5, duration: 4.3, opacity: 0.5 },
]

interface ConfettiDecorProps {
  bars?: ConfettiBar[]
  className?: string
}

export default function ConfettiDecor({ bars = DEFAULT_BARS, className = '' }: ConfettiDecorProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`confetti-bar confetti-bar-${bar.color} confetti-animate`}
          style={{
            left: bar.x,
            top: bar.y,
            height: `${bar.height}px`,
            opacity: bar.opacity ?? 0.6,
            '--rotation': `${bar.rotation}deg`,
            '--delay': `${bar.delay}s`,
            '--duration': `${bar.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
