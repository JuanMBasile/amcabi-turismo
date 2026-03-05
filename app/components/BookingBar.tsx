'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Departure } from '@/app/types'

interface Props {
  departures: Departure[]
}

function formatDate(iso: string) {
  // "2026-05-01" → "Vie. 01. Mayo 2026"
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function BookingBar({ departures }: Props) {
  const router = useRouter()

  // Build unique package titles preserving order
  const packages = useMemo(() => {
    const seen = new Set<string>()
    const list: string[] = []
    for (const d of departures) {
      if (!seen.has(d.title)) {
        seen.add(d.title)
        list.push(d.title)
      }
    }
    return list
  }, [departures])

  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedDepartureId, setSelectedDepartureId] = useState('')

  // Filter departures by selected package title
  const filteredDepartures = useMemo(
    () => departures.filter((d) => d.title === selectedPackage),
    [departures, selectedPackage]
  )

  function handlePackageChange(title: string) {
    setSelectedPackage(title)
    setSelectedDepartureId('')
  }

  function handleReservar() {
    if (!selectedDepartureId) return
    router.push(`/reservar/${selectedDepartureId}`)
  }

  if (departures.length === 0) return null

  return (
    <div className="bg-pink py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">

        {/* Label */}
        <span className="font-display font-black text-white text-base shrink-0 flex items-center gap-2">
          Hacé tu reserva
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>

        {/* Package title dropdown */}
        <select
          value={selectedPackage}
          onChange={(e) => handlePackageChange(e.target.value)}
          className="flex-1 min-w-0 bg-white text-ink font-body text-sm px-4 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
          aria-label="Elegí el destino"
        >
          <option value="">Elegí el Destino</option>
          {packages.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        {/* Date / departure dropdown */}
        <select
          value={selectedDepartureId}
          onChange={(e) => setSelectedDepartureId(e.target.value)}
          disabled={!selectedPackage}
          className="flex-1 min-w-0 bg-white text-ink font-body text-sm px-4 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Elegí la fecha de salida"
        >
          <option value="">Elegí la Fecha</option>
          {filteredDepartures.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {formatDate(dep.departureDate)}
            </option>
          ))}
        </select>

        {/* CTA button */}
        <button
          onClick={handleReservar}
          disabled={!selectedDepartureId}
          className="shrink-0 bg-yellow hover:bg-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed text-ink font-display font-black text-sm px-6 py-2.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 uppercase tracking-wide"
          aria-label="Reservar online"
        >
          Reserva Online
        </button>

      </div>
    </div>
  )
}
