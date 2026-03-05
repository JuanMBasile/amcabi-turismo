'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Lottie library (~45KB) - only loads when component mounts
const Lottie = dynamic(() => import('lottie-react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-pink/20 rounded-full" />
  ),
})

// Lazy load animation data
const getAnimationData = async (variant: 'loader' | 'transaction') => {
  if (variant === 'transaction') {
    return (await import('@/app/assets/lottie/airplane-transaction.json')).default
  }
  return (await import('@/app/assets/lottie/airplane-loader.json')).default
}

interface LottieLoaderProps {
  /** Which animation to show */
  variant?: 'loader' | 'transaction'
  /** Size in pixels */
  size?: number
  /** Optional message below animation */
  message?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * LottieLoader — Animated loader using Lottie animations
 *
 * Variants:
 * - loader: For page loading states (airplaneLoader.json)
 * - transaction: For booking/reservation submissions (Airplane.json)
 *
 * Performance: Lottie library and animation data are lazy-loaded
 * to reduce initial bundle size by ~45KB
 */
export default function LottieLoader({
  variant = 'loader',
  size = 180,
  message,
  className = '',
}: LottieLoaderProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    getAnimationData(variant).then((data) => {
      if (!cancelled) setAnimationData(data)
    })
    return () => { cancelled = true }
  }, [variant])

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="animate-pulse bg-pink/20 rounded-full"
          style={{ width: size, height: size }}
        />
      )}
      {message && (
        <p className="font-body text-ink-muted text-sm mt-4 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

/**
 * FullPageLoader — Centered loader for full page loading states
 */
export function FullPageLoader({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div
      className="min-h-screen bg-page flex items-center justify-center"
      aria-busy="true"
      aria-label={message}
    >
      <LottieLoader variant="loader" size={200} message={message} />
    </div>
  )
}

/**
 * InlineLoader — Smaller loader for inline/button states
 */
export function InlineLoader({ size = 24 }: { size?: number }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    getAnimationData('transaction').then((data) => {
      if (!cancelled) setAnimationData(data)
    })
    return () => { cancelled = true }
  }, [])

  if (!animationData) {
    return (
      <div
        className="animate-spin rounded-full border-2 border-pink border-t-transparent"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: size, height: size }}
    />
  )
}
