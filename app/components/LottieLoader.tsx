'use client'

import Lottie from 'lottie-react'
import airplaneLoaderData from '@/app/assets/lottie/airplane-loader.json'
import airplaneTransactionData from '@/app/assets/lottie/airplane-transaction.json'

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
 */
export default function LottieLoader({
  variant = 'loader',
  size = 180,
  message,
  className = '',
}: LottieLoaderProps) {
  const animationData = variant === 'transaction' ? airplaneTransactionData : airplaneLoaderData

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: size, height: size }}
      />
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
  return (
    <Lottie
      animationData={airplaneTransactionData}
      loop
      autoplay
      style={{ width: size, height: size }}
    />
  )
}
