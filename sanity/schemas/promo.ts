// Sanity Studio schema — used when setting up the Studio project on sanity.io
// This file is NOT compiled by Next.js, it's used only in the Sanity Studio

export const promoSchema = {
  name: 'promo',
  title: 'Promo / Preventa',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo (opcional)',
      type: 'string',
    },
    {
      name: 'badge',
      title: 'Badge / Etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'PREVENTA', value: 'PREVENTA' },
          { title: 'OUTLET', value: 'OUTLET' },
          { title: 'NUEVO', value: 'NUEVO' },
          { title: 'OFERTA', value: 'OFERTA' },
          { title: 'ÚLTIMOS LUGARES', value: 'ÚLTIMOS LUGARES' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Foto de la promo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Descripción de la foto',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'destinations',
      title: 'Destinos incluidos (para promos multi-destino)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
      description: 'Si se agregan destinos, al clickear la promo se muestran estos destinos filtrados en /destinos',
    },
    {
      name: 'href',
      title: 'Enlace (URL o ruta interna)',
      type: 'string',
      placeholder: 'Ej: /destinos/bariloche',
      description: 'Se usa solo si no hay destinos seleccionados arriba',
    },
    {
      name: 'cta',
      title: 'Texto del botón',
      type: 'string',
      initialValue: 'Ver paquete',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Destacada (ocupa más espacio)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'badge', media: 'image' },
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
