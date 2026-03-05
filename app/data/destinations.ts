/**
 * AMCABI Turismo - Destinations Fallback Data
 *
 * Fallback data for destinations when Sanity is not configured.
 * Types imported from @/app/types for consistency.
 *
 * HOW TO UPDATE (each season):
 * - Add a new object to the array below
 * - Update priceFrom as needed
 * - Run `npm run build` then push to Vercel
 */

import type { Destination } from '@/app/types'

export const destinations: Destination[] = [
  {
    slug: 'bariloche',
    name: 'Bariloche',
    province: 'Rio Negro',
    priceFrom: 180000,
    nights: 5,
    bestMonth: 'Jul - Ago - Ene - Feb',
    includes: ['Vuelo ida y vuelta', 'Hotel 3 estrellas', 'Traslados aeropuerto', 'Seguro de viaje'],
    image: 'https://images.unsplash.com/photo-1598549985-bd278b63eb0a?w=800&q=80',
    imageAlt:
      'Vista panoramica del lago Nahuel Huapi en San Carlos de Bariloche, Patagonia Argentina, con montanas nevadas al fondo',
    description:
      'Nevados eternos, lagos cristalinos y chocolate artesanal. La joya de la Patagonia te espera.',
    longDescription:
      'San Carlos de Bariloche es el destino mas iconico de la Patagonia argentina. Rodeada por el lago Nahuel Huapi y la imponente cordillera de los Andes, ofrece una combinacion unica de naturaleza salvaje, gastronomia de montana y actividades para todo el ano. En invierno, esqui en el Cerro Catedral; en verano, trekking, kayak y pesca. Los amantes del chocolate encontraran aqui la capital nacional de esta delicia artesanal.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', imageAlt: 'Cerro Catedral nevado con cielo azul en Bariloche' },
      { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', imageAlt: 'Lago Nahuel Huapi con montanas de fondo' },
      { image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d9?w=800&q=80', imageAlt: 'Bosque de lengas en otono en la Patagonia' },
      { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', imageAlt: 'Vista aerea del lago y las montanas patagonicas' },
    ],
    hotelName: 'Hotel Quime Quipan 3* Superior',
    hotelDescription: 'Ubicado en el centro de Bariloche, a pasos de la calle Mitre y del lago Nahuel Huapi. Habitaciones con calefaccion, TV LED, WiFi. Desayuno buffet incluido. Pileta climatizada y spa.',
    hotelGallery: [
      { image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', imageAlt: 'Habitacion doble del hotel con vista al lago' },
      { image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', imageAlt: 'Lobby del hotel con decoracion de montana' },
      { image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', imageAlt: 'Pileta climatizada del hotel' },
    ],
  },
  {
    slug: 'cataratas',
    name: 'Cataratas del Iguazu',
    province: 'Misiones',
    priceFrom: 220000,
    nights: 4,
    bestMonth: 'Mar - Abr - Sep - Oct',
    includes: ['Vuelo ida y vuelta', 'Hotel frente al parque', 'Traslados', 'Entradas al parque nacional'],
    image: 'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?w=800&q=80',
    imageAlt:
      'Cataratas del Iguazu en Misiones, Argentina - una de las siete maravillas naturales del mundo, con sus imponentes cascadas en la selva misionera',
    description:
      'Una de las siete maravillas naturales del mundo. Imponentes cascadas rodeadas de selva subtropical.',
    longDescription:
      'Las Cataratas del Iguazu son una de las maravillas naturales mas impresionantes del planeta. Declaradas Patrimonio de la Humanidad por la UNESCO, el sistema de 275 saltos abarca casi 3 km de ancho y alcanza los 80 metros de altura en la Garganta del Diablo. La selva misionera que las rodea alberga una biodiversidad unica: tucanes, coaties, mariposas y orquideas forman parte de la experiencia. El parque argentino permite acercarse mucho mas que el lado brasileno.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?w=800&q=80', imageAlt: 'Garganta del Diablo en las Cataratas del Iguazu' },
      { image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&q=80', imageAlt: 'Pasarelas sobre las cataratas con arcoiris' },
      { image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&q=80', imageAlt: 'Vista panoramica de los saltos de agua' },
    ],
    hotelName: 'Amerian Portal del Iguazu 4*',
    hotelDescription: 'Hotel 4 estrellas ubicado a 5 minutos del Parque Nacional Iguazu. Pileta al aire libre, restaurante con cocina regional, WiFi en todas las areas. Habitaciones amplias con balcon y vista al jardin tropical.',
    hotelGallery: [
      { image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', imageAlt: 'Pileta del hotel rodeada de vegetacion tropical' },
      { image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', imageAlt: 'Habitacion del hotel con cama doble' },
    ],
  },
  {
    slug: 'salta',
    name: 'Salta',
    province: 'Salta',
    priceFrom: 195000,
    nights: 5,
    bestMonth: 'May - Jun - Sep - Oct',
    includes: ['Vuelo ida y vuelta', 'Hotel boutique colonial', 'City tour incluido', 'Traslados'],
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80',
    imageAlt:
      'Paisaje de quebradas y montanas multicolores en el noroeste argentino, Salta - destino de historia colonial y paisajes unicos',
    description:
      'La Linda del Norte. Historia colonial, quebradas multicolores y la mejor gastronomia del NOA.',
    longDescription:
      'Salta "La Linda" combina historia colonial, paisajes de otro mundo y una gastronomia que conquista a todos. El centro historico con su cabildo, la catedral y el MAAM son visita obligada. Pero lo que deja sin aliento son los viajes al interior: la Quebrada de Humahuaca (Patrimonio UNESCO), los Valles Calchaquies, las Salinas Grandes y el Tren a las Nubes, uno de los recorridos ferroviarios mas altos del mundo.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80', imageAlt: 'Quebradas multicolores del noroeste argentino' },
      { image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', imageAlt: 'Salinas Grandes con cielo celeste' },
      { image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80', imageAlt: 'Iglesia colonial en el centro de Salta' },
    ],
    hotelName: 'Hotel Boutique Legado Mitico 4*',
    hotelDescription: 'Casona colonial restaurada en el corazon del centro historico. Habitaciones tematicas, patio con fuente, desayuno regional incluido. A pasos de la plaza principal y el MAAM.',
    hotelGallery: [
      { image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', imageAlt: 'Habitacion del hotel boutique colonial' },
      { image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', imageAlt: 'Patio interior del hotel con fuente' },
    ],
  },
  {
    slug: 'mar-del-plata',
    name: 'Mar del Plata',
    province: 'Buenos Aires',
    priceFrom: 140000,
    nights: 4,
    bestMonth: 'Dic - Ene - Feb',
    includes: ['Omnibus cama suite', 'Apart con cocina equipada', 'Traslados terminal', 'City tour'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    imageAlt:
      'Playa y costa maritima de Mar del Plata, Buenos Aires Argentina - la perla del Atlantico con sus playas y escolleras',
    description:
      'La Perla del Atlantico. Playas, casino, mariscos frescos y la mejor vida nocturna de la costa.',
    longDescription:
      'Mar del Plata es el destino de verano por excelencia de los argentinos. Sus playas, la Rambla, el Puerto con sus lobos marinos y la Av. Constitucion con restaurantes de mariscos fresco son iconos irresistibles. Mas alla de la playa, la ciudad ofrece teatros, cines, el casino mas grande del pais, y excursiones a la laguna de los Padres y la sierra de los Padres para quienes buscan paisajes naturales cercanos.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', imageAlt: 'Playa de Mar del Plata al atardecer' },
      { image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80', imageAlt: 'Costa atlantica con olas y arena dorada' },
      { image: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80', imageAlt: 'Puerto de Mar del Plata con lobos marinos' },
    ],
    hotelName: 'Apart Hotel Costa Galana',
    hotelDescription: 'Apart hotel frente al mar en Playa Grande. Departamentos con cocina equipada, balcon con vista al mar, pileta climatizada. A metros de la playa y de los mejores restaurantes de la costa.',
    hotelGallery: [
      { image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', imageAlt: 'Vista desde el balcon del apart hotel al mar' },
      { image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', imageAlt: 'Departamento del apart hotel con cocina' },
    ],
  },
  {
    slug: 'villa-carlos-paz',
    name: 'Villa Carlos Paz',
    province: 'Cordoba',
    priceFrom: 160000,
    nights: 4,
    bestMonth: 'Dic - Ene - Jul',
    includes: ['Omnibus cama', 'Hotel con pileta', 'Traslados terminal', 'Tour por las sierras'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageAlt:
      'Serranias de Cordoba y lago San Roque en Villa Carlos Paz - sierras y actividades para toda la familia',
    description:
      'Las sierras cordobesas en todo su esplendor. Lago San Roque, relax y diversion para toda la familia.',
    longDescription:
      'Villa Carlos Paz, orgullo de las Sierras de Cordoba, es el destino ideal para descansar y desconectarse. El lago San Roque invita al kayak, la pesca y los paseos en catamaran. Las sierras ofrecen trekking, ciclismo de montana y parapente. En enero la ciudad se convierte en la capital del teatro de verano argentino, con temporadas que convocan a los mejores artistas del pais. Para el invierno, el relax en los spas y cabanas con vista a las sierras es incomparable.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', imageAlt: 'Sierras de Cordoba con lago San Roque' },
      { image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', imageAlt: 'Cascada en las sierras cordobesas' },
      { image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', imageAlt: 'Sendero de trekking entre las sierras' },
    ],
    hotelName: 'Hotel con pileta y vista a las sierras',
    hotelDescription: 'Hotel familiar con pileta al aire libre, vista panoramica a las sierras y al lago San Roque. Desayuno incluido, estacionamiento, WiFi. Ideal para familias.',
    hotelGallery: [
      { image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', imageAlt: 'Pileta del hotel con vista a las sierras' },
      { image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', imageAlt: 'Habitacion del hotel con decoracion serrana' },
    ],
  },
]
