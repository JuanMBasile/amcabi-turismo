import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { getDestinations, getDepartures } from '@/sanity/lib/fetchers'
import type { Destination, Departure } from '@/app/types'
import DestinationsClient from './DestinationsClient'

export const metadata: Metadata = {
  title: 'Destinos – AMCABI Turismo',
  description:
    'Explorá todos los destinos disponibles de AMCABI Turismo. Bariloche, Cataratas, Mar del Plata, Salta y más. Elegí tu fecha y reservá online.',
}

export interface DestinationWithDepartures extends Destination {
  departures: Departure[]
}

export default async function DestinosPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>
}) {
  const [{ filtro }, destinations, departures] = await Promise.all([
    searchParams,
    getDestinations(),
    getDepartures(),
  ])

  const slugsFilter = filtro ? filtro.split(',').filter(Boolean) : undefined

  // Group departures by destination slug
  const departuresBySlug = new Map<string, Departure[]>()
  for (const dep of departures) {
    const slug = dep.destinationSlug
    if (!departuresBySlug.has(slug)) departuresBySlug.set(slug, [])
    departuresBySlug.get(slug)!.push(dep)
  }

  // Merge destinations with their departures
  const items: DestinationWithDepartures[] = destinations.map((dest) => ({
    ...dest,
    departures: departuresBySlug.get(dest.slug) ?? [],
  }))

  return (
    <>
      <Header />
      <main className="min-h-screen bg-page pt-16">
        {/* Banner */}
        <div className="bg-pink px-4 py-8 md:py-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-display font-black text-white text-3xl md:text-4xl">
              Todos los destinos
            </h1>
            <p className="font-body text-white/80 text-sm md:text-base mt-2">
              Elegí tu destino, seleccioná la fecha y reservá online.
            </p>
          </div>
        </div>

        <DestinationsClient items={items} initialSlugsFilter={slugsFilter} />
      </main>
      <Footer />
    </>
  )
}
