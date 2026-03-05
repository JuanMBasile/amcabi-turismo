import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  // Weights: normal, medium, semibold, bold, black
  // Removed 800 (extrabold) - not used in the codebase
  weight: ['400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'AMCABI Turismo | Paquetes de Viaje en Argentina',
    template: '%s | AMCABI Turismo',
  },
  description:
    'Agencia de viajes AMCABI Turismo – Legajo EVT 14703. Paquetes turísticos completos a Bariloche, Cataratas del Iguazú, Salta, Mar del Plata y Villa Carlos Paz. Vuelo, hotel y traslados incluidos. Financiación en cuotas.',
  keywords: [
    'agencia de viajes argentina',
    'paquetes turísticos argentina',
    'viajes bariloche',
    'cataratas iguazu paquete',
    'turismo salta',
    'mar del plata viajes',
    'villa carlos paz paquetes',
    'agencia de turismo buenos aires',
    'legajo EVT 14703',
    'amcabi turismo',
  ],
  authors: [{ name: 'AMCABI Turismo' }],
  creator: 'AMCABI Turismo',
  metadataBase: new URL('https://amcabiturismo.com.ar'),
  alternates: {
    canonical: 'https://amcabiturismo.com.ar',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://amcabiturismo.com.ar',
    siteName: 'AMCABI Turismo',
    title: 'AMCABI Turismo | Paquetes de Viaje en Argentina',
    description:
      'Agencia de viajes habilitada por el Ministerio de Turismo – Legajo EVT 14703. Paquetes con vuelo, hotel y traslados incluidos. Financiación disponible.',
    // OG image is auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMCABI Turismo | Paquetes de Viaje en Argentina',
    description:
      'Paquetes turísticos completos a los mejores destinos de Argentina. Legajo EVT 14703.',
  },
  verification: {
    google: 'RmdiabB1voeJ81MDNxKOGV0NOsblkPsSSHujOffi1Gw',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'AMCABI Turismo',
  description:
    'Agencia de viajes y turismo habilitada por el Ministerio de Turismo y Deportes de la Nación Argentina. Legajo EVT N° 14703. Paquetes turísticos completos a destinos nacionales.',
  url: 'https://amcabiturismo.com.ar',
  telephone: ['+5491162203682', '+5491123836286', '+541153689948'],
  email: 'info@amcabiturismo.com.ar',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Arbono 799',
    addressLocality: 'Escobar',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  identifier: {
    '@type': 'PropertyValue',
    name: 'Legajo EVT',
    value: '14703',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Efectivo, Tarjeta de crédito, Tarjeta de débito, Transferencia bancaria',
  sameAs: ['https://www.instagram.com/amcabiturismo'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={montserrat.variable}>
      <body className="font-body bg-dark text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        {children}
      </body>
    </html>
  )
}
