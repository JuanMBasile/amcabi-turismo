// Sanity Studio schema — used when setting up the Studio project on sanity.io
// This file is NOT compiled by Next.js, it's used only in the Sanity Studio

export const destinationSchema = {
  name: 'destination',
  title: 'Destino turístico',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del destino',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'province',
      title: 'Provincia / Región',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'priceFrom',
      title: 'Precio desde (ARS)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'nights',
      title: 'Noches',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive().integer(),
    },
    {
      name: 'bestMonth',
      title: 'Mejor época',
      type: 'string',
      placeholder: 'Ej: Julio y Agosto',
    },
    {
      name: 'includes',
      title: 'Qué incluye',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'image',
      title: 'Foto principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Descripción de la foto (accesibilidad)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción corta (para las tarjetas)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'longDescription',
      title: 'Descripción larga (para la página del destino)',
      type: 'text',
      rows: 6,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Galería de fotos del destino',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Descripción de la foto',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'hotelName',
      title: 'Nombre del hotel',
      type: 'string',
      placeholder: 'Ej: Hotel Quime Quipán 3* Superior',
    },
    {
      name: 'hotelDescription',
      title: 'Descripción del hotel',
      type: 'text',
      rows: 4,
    },
    {
      name: 'hotelGallery',
      title: 'Fotos del hotel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Descripción de la foto',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'province', media: 'image' },
  },
}
