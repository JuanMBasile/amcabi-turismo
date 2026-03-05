// Sanity Studio schema for services (servicios)

export const serviceSchema = {
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del servicio',
      type: 'string',
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Identificador del icono (ej: bus, plane, hotel, shield)',
      options: {
        list: [
          { title: 'Bus', value: 'bus' },
          { title: 'Avión', value: 'plane' },
          { title: 'Hotel', value: 'hotel' },
          { title: 'Escudo/Seguro', value: 'shield' },
          { title: 'Maleta', value: 'luggage' },
          { title: 'Mapa', value: 'map' },
          { title: 'Cámara', value: 'camera' },
          { title: 'Grupo', value: 'group' },
        ],
      },
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de beneficios o características del servicio',
      validation: (Rule: unknown) => (Rule as { required: () => { min: (n: number) => unknown } }).required().min(1),
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
