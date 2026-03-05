/**
 * AMCABI Turismo - Departures Fallback Data
 *
 * Fallback data for departures when Sanity is not configured.
 * Types imported from @/app/types for consistency.
 */

import type { Departure, RegimeType } from '@/app/types'

export const departures: Departure[] = [
  {
    _id: 'demo-bariloche-mar-2026',
    title: 'Bariloche en avion | Marzo 2026',
    destinationSlug: 'bariloche',
    destinationName: 'Bariloche',
    destinationImage: 'https://images.unsplash.com/photo-1598549985-bd278b63eb0a?w=1200&q=75',
    destinationImageAlt: 'Lagos y montanas de Bariloche',
    transport: 'avion',
    departureDate: '2026-03-19',
    returnDate: '2026-03-26',
    nights: 7,
    hotel: 'Hotel Quime Quipan 3* Superior / similar',
    regime: 'desayuno' as RegimeType,
    pricePerPerson: 239990,
    extraFees: [
      { label: 'tasa de embarque', amount: 5000 },
      { label: 'gastos administrativos', amount: 5000 },
    ],
    roomTypes: [
      { type: 'doble', surcharge: 0, capacity: 2 },
      { type: 'triple', surcharge: 0, capacity: 3 },
      { type: 'cuadruple', surcharge: 0, capacity: 4 },
    ],
    embarkPoints: ['Escobar', 'CABA', 'La Plata'],
    maxPassengers: 40,
    importantNotes: 'Gastos administrativos $5000 | Tasa de embarque $5000 por persona.\nMenores de 2 anos SIN CARGO y sin servicio, acompanados por dos mayores.\nEl horario para el ascenso al avion es informado 48hs antes de la salida.',
  },
  {
    _id: 'demo-bariloche-may-2026',
    title: 'Bariloche | Mayo 2026',
    destinationSlug: 'bariloche',
    destinationName: 'Bariloche',
    destinationImage: 'https://images.unsplash.com/photo-1598549985-bd278b63eb0a?w=1200&q=75',
    destinationImageAlt: 'Lagos y montanas de Bariloche',
    transport: 'bus_cama',
    departureDate: '2026-05-14',
    returnDate: '2026-05-22',
    nights: 8,
    hotel: 'Hotel Tres Reyes 4* / similar',
    regime: 'desayuno' as RegimeType,
    pricePerPerson: 189990,
    extraFees: [
      { label: 'gastos administrativos', amount: 5000 },
    ],
    roomTypes: [
      { type: 'doble', surcharge: 0, capacity: 2 },
      { type: 'triple', surcharge: 0, capacity: 3 },
      { type: 'individual', surcharge: 35000, capacity: 1 },
    ],
    embarkPoints: ['Escobar', 'CABA', 'La Plata'],
    maxPassengers: 48,
    importantNotes: 'Gastos administrativos $5000 por persona.\nMenores de 2 anos SIN CARGO, acompanados por dos mayores.',
  },
  {
    _id: 'demo-cataratas-mar-2026',
    title: 'Cataratas del Iguazu | Marzo 2026',
    destinationSlug: 'cataratas',
    destinationName: 'Cataratas del Iguazu',
    destinationImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=75',
    destinationImageAlt: 'Cataratas del Iguazu',
    transport: 'avion',
    departureDate: '2026-03-26',
    returnDate: '2026-03-30',
    nights: 4,
    hotel: 'Hotel Saint George 4* / similar',
    regime: 'desayuno' as RegimeType,
    pricePerPerson: 219990,
    extraFees: [
      { label: 'tasa de embarque', amount: 5000 },
      { label: 'gastos administrativos', amount: 5000 },
    ],
    roomTypes: [
      { type: 'doble', surcharge: 0, capacity: 2 },
      { type: 'triple', surcharge: 0, capacity: 3 },
    ],
    embarkPoints: ['CABA', 'La Plata'],
    maxPassengers: 36,
    importantNotes: 'Tasa de embarque $5000 | Gastos administrativos $5000 por persona.\nMenores de 2 anos SIN CARGO, acompanados por dos mayores.',
  },
  {
    _id: 'demo-salta-may-2026',
    title: 'Salta La Linda | Mayo 2026',
    destinationSlug: 'salta',
    destinationName: 'Salta',
    destinationImage: 'https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=1200&q=75',
    destinationImageAlt: 'Ciudad de Salta',
    transport: 'avion',
    departureDate: '2026-05-07',
    returnDate: '2026-05-12',
    nights: 5,
    hotel: 'Hotel Alejandro I 4* / similar',
    regime: 'desayuno' as RegimeType,
    pricePerPerson: 229990,
    extraFees: [
      { label: 'tasa de embarque', amount: 5000 },
      { label: 'gastos administrativos', amount: 5000 },
    ],
    roomTypes: [
      { type: 'doble', surcharge: 0, capacity: 2 },
      { type: 'triple', surcharge: 0, capacity: 3 },
      { type: 'individual', surcharge: 40000, capacity: 1 },
    ],
    embarkPoints: ['CABA', 'La Plata'],
    maxPassengers: 36,
    importantNotes: 'Tasa de embarque $5000 | Gastos administrativos $5000 por persona.\nMenores de 2 anos SIN CARGO, acompanados por dos mayores.',
  },
]
