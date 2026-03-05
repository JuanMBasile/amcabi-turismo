// Sanity Studio schema for FAQs (preguntas frecuentes)

export const faqSchema = {
  name: 'faq',
  title: 'Pregunta frecuente',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 4,
      description: 'Puede contener HTML básico para formato',
      validation: (Rule: unknown) => (Rule as { required: () => unknown }).required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Reservas', value: 'reservas' },
          { title: 'Pagos', value: 'pagos' },
          { title: 'Transporte', value: 'transporte' },
          { title: 'Documentación', value: 'documentacion' },
          { title: 'Cancelaciones', value: 'cancelaciones' },
        ],
      },
      initialValue: 'general',
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
      description: 'Menor número = aparece primero',
    },
    {
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
