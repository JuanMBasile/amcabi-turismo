// Sanity Studio schema for departure/package (salida turística)

export const departureSchema = {
  name: 'departure',
  title: 'Salida / Paquete',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del paquete',
      type: 'string',
      placeholder: 'Ej: Bariloche | Mayo 2026',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'destination',
      title: 'Destino',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'transport',
      title: 'Transporte',
      type: 'string',
      options: {
        list: [
          { title: 'Bus semicama', value: 'bus_semicama' },
          { title: 'Avión', value: 'avion' },
          { title: 'Bus cama', value: 'bus_cama' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'departureDate',
      title: 'Fecha de salida',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'returnDate',
      title: 'Fecha de regreso',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nights',
      title: 'Noches',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive().integer(),
    },
    {
      name: 'hotel',
      title: 'Hotel',
      type: 'string',
      placeholder: 'Ej: Hotel Quime Quipán 3* Superior',
    },
    {
      name: 'regime',
      title: 'Régimen',
      type: 'string',
      options: {
        list: [
          { title: 'Desayuno incluido', value: 'desayuno' },
          { title: 'Media pensión', value: 'media_pension' },
          { title: 'Todo incluido', value: 'all_inclusive' },
          { title: 'Sin comidas', value: 'sin_comidas' },
        ],
      },
    },
    {
      name: 'pricePerPerson',
      title: 'Precio por persona (ARS)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'extraFees',
      title: 'Cargos adicionales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Descripción', type: 'string' },
            { name: 'amount', title: 'Monto (ARS)', type: 'number' },
          ],
          preview: { select: { title: 'label', subtitle: 'amount' } },
        },
      ],
    },
    {
      name: 'roomTypes',
      title: 'Tipos de habitación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Habitación doble', value: 'doble' },
                  { title: 'Habitación triple', value: 'triple' },
                  { title: 'Habitación cuádruple', value: 'cuadruple' },
                  { title: 'Habitación individual', value: 'individual' },
                ],
              },
            },
            { name: 'surcharge', title: 'Suplemento (ARS) — 0 si no hay', type: 'number', initialValue: 0 },
            { name: 'capacity', title: 'Capacidad (personas)', type: 'number' },
          ],
          preview: { select: { title: 'type', subtitle: 'capacity' } },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'embarkPoints',
      title: 'Puntos de embarque',
      type: 'array',
      of: [{ type: 'string' }],
      placeholder: 'Ej: Escobar, CABA, La Plata',
    },
    {
      name: 'maxPassengers',
      title: 'Cupos máximos',
      type: 'number',
      initialValue: 40,
    },
    {
      name: 'importantNotes',
      title: 'Notas importantes',
      type: 'text',
      rows: 4,
      placeholder: 'Ej: Gastos administrativos $5000 | Tasa de embarque $5000. Menores de 2 años SIN CARGO...',
    },
    {
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'departureDate',
    },
  },
}
