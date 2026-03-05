// Sanity Studio schema for site settings (configuración del sitio)

export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    {
      name: 'showBookingBar',
      title: 'Mostrar buscador de reservas',
      description: 'El formulario "Hacé tu reserva" debajo del hero',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showPromos',
      title: 'Mostrar preventas y ofertas',
      description: 'La sección de preventas y ofertas especiales',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showDestinations',
      title: 'Mostrar destinos',
      description: 'La grilla de destinos disponibles',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showWhyUs',
      title: 'Mostrar "Por qué elegirnos"',
      description: 'La sección de beneficios de AMCABI',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Configuración del sitio',
      subtitle: 'Activar/desactivar secciones',
    }),
  },
}
