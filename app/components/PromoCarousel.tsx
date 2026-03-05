'use client'

import { useReducer, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Promo } from '@/app/types'

const BADGE_STYLES: Record<string, string> = {
  PREVENTA: 'bg-pink text-white',
  OUTLET: 'bg-cyan-dark text-white',
  NUEVO: 'bg-purple text-white',
  OFERTA: 'bg-yellow text-ink',
  'ÚLTIMOS LUGARES': 'bg-pink-dark text-white',
  'VERANO 2026': 'bg-yellow text-ink',
  'SEMANA SANTA': 'bg-purple text-white',
  MARZO: 'bg-cyan text-ink',
  ABRIL: 'bg-pink text-white',
  MAYO: 'bg-purple-light text-white',
}

const AUTO_ROTATE_INTERVAL = 5000 // 5 seconds
const MIN_SWIPE_DISTANCE = 50

// ─── Reducer for carousel state ─────────────────────────────────────────────────
interface CarouselState {
  currentIndex: number
  isPaused: boolean
}

type CarouselAction =
  | { type: 'GO_TO'; index: number; total: number }
  | { type: 'NEXT'; total: number }
  | { type: 'PREV'; total: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'GO_TO':
      return { ...state, currentIndex: (action.index + action.total) % action.total }
    case 'NEXT':
      return { ...state, currentIndex: (state.currentIndex + 1) % action.total }
    case 'PREV':
      return { ...state, currentIndex: (state.currentIndex - 1 + action.total) % action.total }
    case 'PAUSE':
      return { ...state, isPaused: true }
    case 'RESUME':
      return { ...state, isPaused: false }
    default:
      return state
  }
}

interface PromoCarouselProps {
  promos: Promo[]
}

export default function PromoCarousel({ promos }: PromoCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
    isPaused: false,
  })

  // Touch tracking via ref (doesn't cause re-renders)
  const touchRef = useRef({ start: 0, end: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSlides = promos.length
  const { currentIndex, isPaused } = state

  const goToSlide = useCallback((index: number) => {
    dispatch({ type: 'GO_TO', index, total: totalSlides })
  }, [totalSlides])

  const goNext = useCallback(() => {
    dispatch({ type: 'NEXT', total: totalSlides })
  }, [totalSlides])

  const goPrev = useCallback(() => {
    dispatch({ type: 'PREV', total: totalSlides })
  }, [totalSlides])

  // Auto-rotate
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return

    const interval = setInterval(goNext, AUTO_ROTATE_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused, goNext, totalSlides])

  // Touch handlers for swipe (using refs to avoid re-renders)
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { start: e.targetTouches[0].clientX, end: 0 }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchRef.current.end = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    const { start, end } = touchRef.current
    if (!start || !end) return

    const distance = start - end
    if (distance > MIN_SWIPE_DISTANCE) {
      goNext()
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      goPrev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => dispatch({ type: 'PAUSE' })}
      onMouseLeave={() => dispatch({ type: 'RESUME' })}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Promociones destacadas"
    >
      {/* Main carousel slide */}
      <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 lg:h-96 shadow-xl">
        {promos.map((promo, index) => {
          const href = promo.destinationSlugs?.length
            ? `/destinos?filtro=${promo.destinationSlugs.join(',')}`
            : promo.href

          return (
          <Link
            key={promo.id}
            href={href}
            className={`group absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={index !== currentIndex}
            tabIndex={index === currentIndex ? 0 : -1}
            aria-label={`${promo.badge}: ${promo.title} – ${promo.cta}`}
          >
            <Image
              src={promo.image}
              alt={promo.imageAlt}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={index === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
              <span
                className={`inline-block self-start font-body font-bold text-xs px-3 py-1 rounded-full mb-3 tracking-wider ${
                  BADGE_STYLES[promo.badge] ?? 'bg-pink text-white'
                }`}
              >
                {promo.badge}
              </span>
              <h3 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-1">
                {promo.title}
              </h3>
              {promo.subtitle && (
                <p className="font-body text-white/75 text-sm sm:text-base mb-4 max-w-lg">
                  {promo.subtitle}
                </p>
              )}
              <span className="inline-flex items-center gap-2 self-start bg-yellow text-ink font-body font-black text-sm px-5 py-2.5 rounded-full transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg">
                {promo.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </Link>
          )
        })}

        {/* Navigation arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                goPrev()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Promoción anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                goNext()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Siguiente promoción"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Indicador de diapositivas">
          {promos.map((promo, index) => (
            <button
              key={promo.id}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-pink w-8'
                  : 'bg-ink/20 hover:bg-ink/40'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Ir a promoción ${index + 1}: ${promo.title}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {totalSlides > 0 && (
        <div className="absolute top-4 right-4 z-20 bg-ink/60 backdrop-blur-sm text-white font-body text-xs px-2.5 py-1 rounded-full">
          {currentIndex + 1} / {totalSlides}
        </div>
      )}
    </div>
  )
}
