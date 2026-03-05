// Sanity Studio schema for bookings (reservas)

export const bookingSchema = {
  name: 'booking',
  title: 'Reserva',
  type: 'document',
  fields: [
    {
      name: 'bookingNumber',
      title: 'Número de reserva',
      type: 'string',
      readOnly: true,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'departure',
      title: 'Salida / Paquete',
      type: 'reference',
      to: [{ type: 'departure' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'roomType',
      title: 'Tipo de habitación',
      type: 'string',
    },
    {
      name: 'infantCount',
      title: 'Menores de 2 años (sin cargo)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'passengers',
      title: 'Pasajeros',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'firstName', title: 'Nombre', type: 'string' },
            { name: 'lastName', title: 'Apellido', type: 'string' },
            { name: 'dni', title: 'DNI', type: 'string' },
            { name: 'birthDate', title: 'Fecha de nacimiento', type: 'date' },
            { name: 'embarkPoint', title: 'Punto de embarque', type: 'string' },
          ],
          preview: {
            select: { title: 'firstName', subtitle: 'lastName' },
            prepare: ({ title, subtitle }: any) => ({ title: `${title} ${subtitle}` }),
          },
        },
      ],
    },
    {
      name: 'contactEmail',
      title: 'Email de contacto',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Teléfono de contacto',
      type: 'string',
    },
    {
      name: 'discountCode',
      title: 'Código de descuento',
      type: 'string',
    },
    {
      name: 'totalPrice',
      title: 'Precio total (ARS)',
      type: 'number',
    },
    {
      name: 'paymentStatus',
      title: 'Estado de pago',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Pagado', value: 'paid' },
          { title: 'Cancelado', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'notes',
      title: 'Observaciones',
      type: 'text',
      rows: 3,
    },
    {
      name: 'createdAt',
      title: 'Fecha de reserva',
      type: 'datetime',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'bookingNumber',
      subtitle: 'paymentStatus',
    },
  },
  orderings: [
    {
      title: 'Fecha de reserva (más reciente)',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
}
