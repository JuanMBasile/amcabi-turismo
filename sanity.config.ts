/**
 * Sanity Studio Configuration
 *
 * This configures the embedded Sanity Studio at /studio
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  destinationSchema,
  departureSchema,
  bookingSchema,
  promoSchema,
  serviceSchema,
  faqSchema,
  voucherSchema,
  siteSettingsSchema,
} from './sanity/schemas'

export default defineConfig({
  name: 'amcabi-studio',
  title: 'AMCABI Turismo',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Configuración del sitio')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Configuración del sitio')
              ),
            S.divider(),
            // Destinations
            S.listItem()
              .title('Destinos')
              .icon(() => '📍')
              .child(S.documentTypeList('destination').title('Destinos')),
            // Departures
            S.listItem()
              .title('Salidas / Paquetes')
              .icon(() => '✈️')
              .child(S.documentTypeList('departure').title('Salidas')),
            // Promos
            S.listItem()
              .title('Promos / Preventas')
              .icon(() => '🏷️')
              .child(S.documentTypeList('promo').title('Promos')),
            S.divider(),
            // Bookings
            S.listItem()
              .title('Reservas')
              .icon(() => '📋')
              .child(S.documentTypeList('booking').title('Reservas')),
            // Vouchers
            S.listItem()
              .title('Vouchers')
              .icon(() => '🎫')
              .child(S.documentTypeList('voucher').title('Vouchers')),
            S.divider(),
            // Services
            S.listItem()
              .title('Servicios')
              .icon(() => '🛎️')
              .child(S.documentTypeList('service').title('Servicios')),
            // FAQs
            S.listItem()
              .title('Preguntas Frecuentes')
              .icon(() => '❓')
              .child(S.documentTypeList('faq').title('FAQs')),
          ]),
    }),
  ],

  schema: {
    types: [
      destinationSchema,
      departureSchema,
      bookingSchema,
      promoSchema,
      serviceSchema,
      faqSchema,
      voucherSchema,
      siteSettingsSchema,
    ],
  },
})
