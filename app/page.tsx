import type { Metadata } from 'next'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import BookingBar from './components/BookingBar'
import PromosSection from './components/PromosSection'
import DestinationsGrid from './components/DestinationsGrid'
import WhyUs from './components/WhyUs'
import Footer from './components/Footer'
import { getDestinations, getPromos, getDepartures, getSiteSettings } from '@/sanity/lib/fetchers'
import { toDepartureOption } from './types'

export const metadata: Metadata = {
  title: 'AMCABI Turismo | Paquetes de Viaje en Argentina',
  description:
    'Agencia de viajes AMCABI Turismo – Legajo EVT 14703. Paquetes turísticos completos a Bariloche, Cataratas del Iguazú, Salta, Mar del Plata y Villa Carlos Paz. Vuelo, hotel y traslados incluidos. Financiación en cuotas.',
  alternates: { canonical: 'https://amcabiturismo.com.ar' },
  openGraph: {
    title: 'AMCABI Turismo | Paquetes de Viaje en Argentina',
    description:
      'Agencia de viajes habilitada por el Ministerio de Turismo – Legajo EVT 14703. Paquetes con vuelo, hotel y traslados incluidos.',
    url: 'https://amcabiturismo.com.ar',
  },
}

export const revalidate = false // static by default; revalidated on-demand via webhook

export default async function HomePage() {
  // Fetchers handle the dual data source pattern internally
  const [destinations, promos, departures, settings] = await Promise.all([
    getDestinations(),
    getPromos(),
    getDepartures(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection destinations={destinations.slice(0, 3)} />
        {settings.showBookingBar && <BookingBar departures={departures.map(toDepartureOption)} />}
        {settings.showPromos && <PromosSection promos={promos} />}
        {settings.showDestinations && <DestinationsGrid destinations={destinations} />}
        {settings.showWhyUs && <WhyUs />}
      </main>
      <Footer />
    </>
  )
}
