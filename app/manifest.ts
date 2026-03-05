import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AMCABI Turismo – Paquetes de Viaje en Argentina',
    short_name: 'AMCABI Turismo',
    description:
      'Agencia de viajes habilitada – Legajo EVT 14703. Paquetes turísticos a Bariloche, Cataratas del Iguazú, Salta, Mar del Plata y más.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#E91E8C',
    background_color: '#1A0A12',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
