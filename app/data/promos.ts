/**
 * AMCABI Turismo - Promos Fallback Data
 *
 * Fallback data for promotions when Sanity is not configured.
 * Types imported from @/app/types for consistency.
 *
 * HOW TO UPDATE (each season):
 * - Edit, add or remove objects in the array below
 * - Set featured: true on the main promo (only one at a time)
 * - href can be an internal route (/destinos/bariloche) or an external URL
 * - Run `npm run build` then push to Vercel - site updates automatically
 */

import type { Promo } from '@/app/types'

export const promos: Promo[] = [
  // Featured promo (large card)
  {
    id: 'verano-2026',
    title: 'Verano AMCABI 2026',
    subtitle: 'Playas, montanas y aventura',
    badge: 'VERANO 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    imageAlt: 'Playa de Mar del Plata con sombrillas coloridas',
    href: '/destinos',
    destinationSlugs: ['bariloche', 'cataratas', 'mar-del-plata', 'salta', 'villa-carlos-paz'],
    cta: 'Ver paquetes de verano',
    featured: true,
  },
  // Secondary promos
  {
    id: 'semana-santa-2026',
    title: 'Semana Santa 2026',
    subtitle: 'Escapate del 14 al 21 de abril',
    badge: 'SEMANA SANTA',
    image: 'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?w=800&q=80',
    imageAlt: 'Cataratas del Iguazu con luz dorada al atardecer',
    href: '/destinos/cataratas',
    cta: 'Ver paquetes',
  },
  {
    id: 'outlet-amcabi',
    title: 'Outlet AMCABI',
    subtitle: 'Descuentos hasta 30% off',
    badge: 'OUTLET',
    image: 'https://images.unsplash.com/photo-1598549985-bd278b63eb0a?w=800&q=80',
    imageAlt: 'Bariloche en invierno con nieve',
    href: '/destinos/bariloche',
    cta: 'Aprovechar oferta',
  },
  {
    id: 'marzo-2026',
    title: 'Paquetes Marzo 2026',
    subtitle: 'El mejor mes para viajar',
    badge: 'MARZO',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80',
    imageAlt: 'Quebradas multicolores del noroeste argentino',
    href: '/destinos/salta',
    cta: 'Ver paquetes',
  },
  {
    id: 'abril-2026',
    title: 'Paquetes Abril 2026',
    subtitle: 'Colores de otono',
    badge: 'ABRIL',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d9?w=800&q=80',
    imageAlt: 'Bosque de lengas en otono en la Patagonia',
    href: '/destinos/bariloche',
    cta: 'Ver paquetes',
  },
  {
    id: 'mayo-2026',
    title: 'Paquetes Mayo 2026',
    subtitle: 'Finde largo 25 de mayo',
    badge: 'MAYO',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    imageAlt: 'Cascada en las sierras de Cordoba',
    href: '/destinos/villa-carlos-paz',
    cta: 'Ver paquetes',
  },
]
