'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { DestinationWithDepartures } from './page'
import { TRANSPORT_LABELS } from '@/app/types'

type Filter = 'todos' | 'bus' | 'avion'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'bus', label: 'Bus' },
  { id: 'avion', label: 'Avión' },
]

function formatDepartureDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface Props {
  items: DestinationWithDepartures[]
  initialSlugsFilter?: string[]
}

export default function DestinationsClient({ items, initialSlugsFilter }: Props) {
  const [filter, setFilter] = useState<Filter>('todos')
  const [slugsFilter, setSlugsFilter] = useState<string[] | undefined>(initialSlugsFilter)
  const [selectedDepartures, setSelectedDepartures] = useState<Record<string, string>>({})

  // Filter by destination slugs (from promo), then by transport type
  const filteredItems = items
    .filter((dest) => !slugsFilter || slugsFilter.includes(dest.slug))
    .map((dest) => ({
      ...dest,
      departures: dest.departures.filter((dep) => {
        if (filter === 'todos') return true
        if (filter === 'bus') return dep.transport === 'bus_semicama' || dep.transport === 'bus_cama'
        return dep.transport === 'avion'
      }),
    }))
    .filter((dest) => dest.departures.length > 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Slug filter banner */}
      {slugsFilter && (
        <div className="flex items-center gap-3 mb-4 bg-pink/10 border border-pink/20 rounded-full px-4 py-2">
          <span className="font-body text-pink font-bold text-sm">
            Mostrando destinos de la promo
          </span>
          <button
            type="button"
            onClick={() => setSlugsFilter(undefined)}
            className="ml-auto inline-flex items-center gap-1 text-pink hover:text-pink/70 font-body font-semibold text-sm transition-colors"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full font-body font-bold text-sm transition-all duration-200 ${
              filter === f.id
                ? 'bg-pink text-white'
                : 'bg-surface border border-border text-ink-muted hover:border-pink/40 hover:text-pink'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="flex items-center font-body text-ink-faint text-xs ml-2">
          {filteredItems.length} destino{filteredItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* No results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-ink-muted text-lg">
            No hay destinos disponibles con ese filtro.
          </p>
        </div>
      )}

      {/* Destinations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((dest) => {
          const selected = selectedDepartures[dest.slug] ?? ''
          const selectedDep = dest.departures.find((d) => d._id === selected)

          return (
            <div
              key={dest.slug}
              className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={dest.image}
                  alt={dest.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Nights badge */}
                <span className="absolute top-3 left-3 bg-pink text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {dest.nights} noches
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <Link href={`/destinos/${dest.slug}`} className="group">
                  <h2 className="font-display font-black text-ink text-lg group-hover:text-pink transition-colors">
                    {dest.name}
                  </h2>
                </Link>
                <p className="font-body text-ink-muted text-xs mt-0.5">{dest.province}</p>
                <p className="font-display font-black text-pink text-xl mt-2">
                  Desde ${dest.priceFrom.toLocaleString('es-AR')}
                </p>

                {/* Departure select */}
                <div className="mt-4 flex-1">
                  <label
                    htmlFor={`dep-${dest.slug}`}
                    className="font-body text-ink-muted text-xs uppercase tracking-wider block mb-1.5"
                  >
                    Elegí la fecha
                  </label>
                  <select
                    id={`dep-${dest.slug}`}
                    value={selected}
                    onChange={(e) =>
                      setSelectedDepartures((prev) => ({ ...prev, [dest.slug]: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 bg-white border border-border rounded-lg font-body text-sm text-ink focus:border-pink focus:ring-1 focus:ring-pink/30 outline-none transition-colors"
                  >
                    <option value="">Elegí la fecha</option>
                    {dest.departures.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {formatDepartureDate(dep.departureDate)} — {TRANSPORT_LABELS[dep.transport]} — ${dep.pricePerPerson.toLocaleString('es-AR')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reserve button */}
                <div className="mt-4 flex gap-2">
                  {selectedDep ? (
                    <Link
                      href={`/reservar/${selectedDep._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink/90 text-white px-4 py-2.5 rounded-full font-body font-bold text-sm transition-all duration-200"
                    >
                      Reservar
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-border text-ink-faint px-4 py-2.5 rounded-full font-body font-bold text-sm cursor-not-allowed"
                    >
                      Elegí una fecha
                    </button>
                  )}
                  <Link
                    href={`/destinos/${dest.slug}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-border hover:border-pink/40 text-ink-muted hover:text-pink rounded-full font-body font-semibold text-sm transition-all duration-200"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
