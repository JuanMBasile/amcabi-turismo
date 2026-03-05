/**
 * AMCABI Turismo - Servicios
 *
 * Fallback data for services when Sanity is not configured.
 * Import types from @/app/types for consistency.
 */

import type { Service } from '@/app/types'

export const services: Service[] = [
  {
    id: 'viajes-grupales',
    title: 'Viajes grupales',
    description:
      'Organizamos viajes grupales a los mejores destinos de Argentina. Bus, avion o combinado, siempre con el mejor servicio y precios accesibles.',
    icon: 'group',
    features: [
      'Grupos reducidos de hasta 40 pasajeros',
      'Coordinador de viaje en todo momento',
      'Seguro de viajero incluido',
      'Asientos asignados y etiquetados',
    ],
  },
  {
    id: 'transporte',
    title: 'Transporte de calidad',
    description:
      'Buses cama y semicama de ultima generacion, vuelos con las principales aerolineas del pais. Tu comodidad es nuestra prioridad.',
    icon: 'bus',
    features: [
      'Buses cama con WiFi y enchufes USB',
      'Aire acondicionado y calefaccion',
      'Servicio a bordo (snacks y bebidas)',
      'Paradas programadas en estaciones seguras',
    ],
  },
  {
    id: 'alojamiento',
    title: 'Alojamiento seleccionado',
    description:
      'Hoteles de 3 y 4 estrellas cuidadosamente elegidos por su ubicacion, confort y servicios. Desayuno incluido en todos los paquetes.',
    icon: 'hotel',
    features: [
      'Hoteles centricos con desayuno buffet',
      'Habitaciones dobles, triples y cuadruples',
      'WiFi gratuito en todos los alojamientos',
      'Opciones de media pension y all inclusive',
    ],
  },
  {
    id: 'asistencia',
    title: 'Asistencia 24/7',
    description:
      'Linea de emergencia disponible las 24 horas, los 7 dias de la semana. Nunca estas solo cuando viajas con AMCABI.',
    icon: 'shield',
    features: [
      'Linea de emergencia activa todo el viaje',
      'Asistencia medica coordinada',
      'Gestion de imprevistos y cambios',
      'Respaldo de una empresa con 20 anos de experiencia',
    ],
  },
]
