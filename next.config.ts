import type { NextConfig } from 'next'

/**
 * AMCABI Turismo — Next.js 16.1 Configuration
 *
 * Key features:
 * - Turbopack is default in Next.js 16 (no flag needed for `next dev`)
 * - Remote image patterns for Unsplash and Sanity CDN
 * - React Compiler can be enabled via `reactCompiler: true` when ready
 */

const nextConfig: NextConfig = {
  /**
   * Remote image patterns
   * Required for next/image to load images from these domains
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },

  /**
   * React Compiler (Stable in Next.js 16)
   *
   * Enables automatic memoization and optimizations.
   * Reduces the need for manual useMemo/useCallback.
   */
  reactCompiler: true,

  /**
   * Experimental features
   *
   * Note: In Next.js 16, many formerly experimental features are now stable:
   * - Turbopack is default for dev
   * - Server Actions are stable
   * - PPR (Partial Prerendering) can be enabled if needed
   */
  experimental: {
    // Enable Partial Prerendering when ready for production
    // ppr: true,
  },

  /**
   * Strict mode for React
   * Helps catch potential issues during development
   */
  reactStrictMode: true,

  /**
   * TypeScript configuration
   * Build will fail on type errors (recommended for production)
   */
  typescript: {
    // Set to false to fail builds on type errors
    ignoreBuildErrors: false,
  },

  /**
   * Headers configuration
   * Security and caching headers
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  /**
   * Redirects configuration
   * Handle legacy URLs and common typos
   */
  async redirects() {
    return [
      // Common Spanish typos/alternatives
      {
        source: '/destino/:slug',
        destination: '/destinos/:slug',
        permanent: true,
      },
      {
        source: '/paquetes/:slug',
        destination: '/destinos/:slug',
        permanent: true,
      },
      {
        source: '/reservas/:bookingNumber',
        destination: '/reserva/:bookingNumber',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/quienes-somos',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/preguntas-frecuentes',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/servicios',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
