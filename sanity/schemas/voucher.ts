// Sanity Studio schema for vouchers (comprobantes de viaje)

export const voucherSchema = {
  name: 'voucher',
  title: 'Voucher',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Código de voucher',
      type: 'string',
      readOnly: true,
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'booking',
      title: 'Reserva asociada',
      type: 'reference',
      to: [{ type: 'booking' }],
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'validFrom',
      title: 'Válido desde',
      type: 'date',
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'validUntil',
      title: 'Válido hasta',
      type: 'date',
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'qrData',
      title: 'Datos del QR',
      type: 'string',
      description: 'Contenido codificado para el código QR',
    },
    {
      name: 'isUsed',
      title: 'Utilizado',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'usedAt',
      title: 'Fecha de uso',
      type: 'datetime',
    },
    {
      name: 'notes',
      title: 'Observaciones',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'isUsed',
    },
    prepare(selection: Record<string, unknown>) {
      return {
        title: selection.title as string,
        subtitle: selection.subtitle ? 'Utilizado' : 'Pendiente',
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de validez',
      name: 'validFromDesc',
      by: [{ field: 'validFrom', direction: 'desc' }],
    },
  ],
}
