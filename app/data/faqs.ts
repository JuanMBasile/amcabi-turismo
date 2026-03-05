/**
 * AMCABI Turismo - Preguntas Frecuentes
 *
 * Fallback data for FAQs when Sanity is not configured.
 * Import types from @/app/types for consistency.
 */

import type { FAQ } from '@/app/types'

export const faqs: FAQ[] = [
  {
    id: 'como-reservar',
    question: 'Como hago una reserva?',
    answer:
      'Podes reservar directamente desde nuestra web: elegi el destino y la fecha de salida, completa los datos de los pasajeros y confirma tu reserva. Recibiras un email con el numero de reserva y los pasos siguientes para el pago.',
    category: 'reservas',
    order: 1,
  },
  {
    id: 'formas-de-pago',
    question: 'Cuales son las formas de pago?',
    answer:
      'Aceptamos transferencia bancaria, deposito, Mercado Pago y tarjetas de credito en hasta 12 cuotas sin interes (sujeto a promociones vigentes). Tambien podes abonar en efectivo en nuestras oficinas.',
    category: 'pagos',
    order: 2,
  },
  {
    id: 'documentacion-necesaria',
    question: 'Que documentacion necesito para viajar?',
    answer:
      'Para viajes nacionales solo necesitas tu DNI vigente. Menores de 18 anos que viajen sin ambos padres deben presentar autorizacion de viaje certificada por escribano o juez de paz.',
    category: 'documentacion',
    order: 3,
  },
  {
    id: 'cancelacion',
    question: 'Puedo cancelar mi reserva?',
    answer:
      'Si, podes cancelar tu reserva. Las condiciones de reembolso dependen de la anticipacion: hasta 30 dias antes se reintegra el 80%, entre 15 y 30 dias el 50%, y menos de 15 dias no hay reembolso. Los gastos administrativos no son reembolsables.',
    category: 'cancelaciones',
    order: 4,
  },
  {
    id: 'menores-de-2',
    question: 'Los menores de 2 anos pagan?',
    answer:
      'Los menores de 2 anos (infantes) viajan sin cargo siempre que no ocupen asiento ni cama. Deben viajar acompanados por al menos dos adultos responsables.',
    category: 'reservas',
    order: 5,
  },
  {
    id: 'puntos-de-embarque',
    question: 'Donde se toma el bus o el vuelo?',
    answer:
      'Los puntos de embarque se informan al momento de la reserva y varian segun el destino. Generalmente incluyen Escobar, CABA (Retiro u Obelisco) y La Plata. Para vuelos, el punto de encuentro es el aeropuerto indicado.',
    category: 'transporte',
    order: 6,
  },
  {
    id: 'equipaje',
    question: 'Cuanto equipaje puedo llevar?',
    answer:
      'En bus podes llevar una valija grande (hasta 23 kg) en bodega y un bolso de mano. En avion, las franquicias dependen de la aerolinea, pero generalmente incluyen 1 valija de 15-23 kg mas equipaje de mano.',
    category: 'transporte',
    order: 7,
  },
  {
    id: 'seguro-de-viaje',
    question: 'El paquete incluye seguro de viaje?',
    answer:
      'Si, todos nuestros paquetes incluyen seguro de viajero con cobertura medica, perdida de equipaje y asistencia legal. La cobertura es valida durante todo el viaje.',
    category: 'general',
    order: 8,
  },
]
