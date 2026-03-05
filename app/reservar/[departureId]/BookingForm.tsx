'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Departure } from '@/app/types'
import { ROOM_TYPE_LABELS, ROOM_TYPE_CAPACITY } from '@/app/types'
import { InlineLoader } from '@/app/components/LottieLoader'

interface Passenger {
  firstName: string
  lastName: string
  dni: string
  birthDate: string
  embarkPoint: string
}

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function emptyPassenger(): Passenger {
  return { firstName: '', lastName: '', dni: '', birthDate: '', embarkPoint: '' }
}

const fieldClass = 'w-full font-body text-sm text-ink bg-page-soft border-0 border-b-2 border-border rounded-t-lg px-3 py-2.5 focus:border-pink focus:outline-none focus:bg-white transition-colors placeholder:text-ink-faint'
const labelClass = 'block font-body text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 flex items-center gap-1.5'

export default function BookingForm({ departure }: { departure: Departure }) {
  const router = useRouter()
  const [roomType, setRoomType] = useState('')
  const [infantCount, setInfantCount] = useState(0)
  const [discountCode, setDiscountCode] = useState('')
  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()])
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleRoomTypeChange(rt: string) {
    setRoomType(rt)
    const cap = ROOM_TYPE_CAPACITY[rt] ?? 1
    setPassengers(Array.from({ length: cap }, () => emptyPassenger()))
  }

  function updatePassenger(i: number, field: keyof Passenger, value: string) {
    setPassengers((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)))
  }

  const selectedRoom = departure.roomTypes.find((r) => r.type === roomType)
  const extraFeesTotal = departure.extraFees.reduce((sum, f) => sum + f.amount, 0)
  const surcharge = selectedRoom?.surcharge ?? 0
  const passengerCount = ROOM_TYPE_CAPACITY[roomType] ?? 1
  const pricePerPax = departure.pricePerPerson + surcharge + extraFeesTotal
  const totalPrice = pricePerPax * passengerCount

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!roomType) { setError('Seleccioná un tipo de habitación'); return }
    if (!contactEmail && !contactPhone) { setError('Ingresá tu email o teléfono'); return }

    const incomplete = passengers.some((p) => !p.firstName || !p.lastName || !p.dni)
    if (incomplete) { setError('Completá nombre, apellido y DNI de todos los pasajeros'); return }

    setLoading(true)
    const minDelay = new Promise(resolve => setTimeout(resolve, 4000))

    try {
      const [res] = await Promise.all([
        fetch('/api/reservar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            departureId: departure._id,
            departureTitle: departure.title,
            roomType,
            infantCount,
            passengers,
            contactEmail,
            contactPhone,
            discountCode,
            totalPrice,
          }),
        }),
        minDelay,
      ])
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error desconocido')
      router.push(`/reserva/${data.bookingNumber}?title=${encodeURIComponent(departure.title)}&dest=${encodeURIComponent(departure.destinationName)}&date=${departure.departureDate}&pax=${passengerCount}&price=${totalPrice}&room=${encodeURIComponent(ROOM_TYPE_LABELS[roomType] ?? roomType)}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo crear la reserva. Intentá de nuevo.'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Price header ── */}
      <div className="bg-gradient-to-r from-pink/8 via-pink/4 to-transparent rounded-2xl px-4 py-4 -mx-1">
        <p className="font-display font-black text-5xl text-pink leading-none">
          {priceFormatter.format(departure.pricePerPerson)}
        </p>
        {departure.extraFees.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {departure.extraFees.map((f) => (
              <span key={f.label} className="inline-flex items-center font-body text-xs bg-pink/10 text-pink px-2 py-0.5 rounded-full font-semibold">
                + {priceFormatter.format(f.amount)} {f.label}
              </span>
            ))}
          </div>
        )}
        <p className="font-body text-ink-muted text-xs mt-2.5 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-pink shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Salida: {formatDate(departure.departureDate)}
        </p>
      </div>

      {/* ── Room type ── */}
      <div>
        <label className={labelClass}>
          <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Habitación
        </label>
        <select
          value={roomType}
          onChange={(e) => handleRoomTypeChange(e.target.value)}
          required
          className={fieldClass + ' appearance-none'}
        >
          <option value="">Seleccionar</option>
          {departure.roomTypes.map((rt) => (
            <option key={rt.type} value={rt.type}>
              {ROOM_TYPE_LABELS[rt.type] ?? rt.type}
              {rt.surcharge > 0 ? ` (+ ${priceFormatter.format(rt.surcharge)})` : ''}
            </option>
          ))}
        </select>
        {roomType && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 font-body text-xs bg-pink/10 text-pink border border-pink/20 px-3 py-1 rounded-full font-bold">
              ✓ {ROOM_TYPE_LABELS[roomType] ?? roomType} · {passengerCount} {passengerCount === 1 ? 'pasajero' : 'pasajeros'}
            </span>
          </div>
        )}
      </div>

      {/* ── Infants ── */}
      <div>
        <label className={labelClass}>
          <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Menores de 2 años
        </label>
        <select
          value={infantCount}
          onChange={(e) => setInfantCount(Number(e.target.value))}
          className={fieldClass + ' appearance-none'}
        >
          {[0, 1, 2, 3].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {infantCount > 0 && (
          <p className="font-body text-ink-faint text-xs mt-1.5 flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            SIN CARGO · acompañados por dos mayores
          </p>
        )}
      </div>

      {/* ── Discount code ── */}
      <div>
        <label className={labelClass}>
          <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Código de Descuento
        </label>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
          placeholder="Ingresá tu código"
          className={fieldClass}
        />
      </div>

      {/* ── Passengers accordion ── */}
      <div className={`passengers-accordion${roomType ? ' open' : ''}`}>
        <div>
          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="font-body font-bold text-sm text-ink uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Datos de pasajeros
            </h3>
            {passengers.map((pax, i) => (
              <div key={i} className="bg-page-soft rounded-2xl p-4 space-y-3 border-l-2 border-pink/30">
                <p className="font-body font-bold text-xs text-pink uppercase tracking-wider">
                  Pasajero {i + 1}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Nombre *</label>
                    <input
                      type="text"
                      value={pax.firstName}
                      onChange={(e) => updatePassenger(i, 'firstName', e.target.value)}
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Apellido *</label>
                    <input
                      type="text"
                      value={pax.lastName}
                      onChange={(e) => updatePassenger(i, 'lastName', e.target.value)}
                      required
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">DNI *</label>
                    <input
                      type="text"
                      value={pax.dni}
                      onChange={(e) => updatePassenger(i, 'dni', e.target.value.replace(/\D/g, ''))}
                      required
                      maxLength={8}
                      placeholder="12345678"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Fecha de nac.</label>
                    <input
                      type="date"
                      value={pax.birthDate}
                      onChange={(e) => updatePassenger(i, 'birthDate', e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>
                {departure.embarkPoints.length > 0 && (
                  <div>
                    <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Punto de embarque</label>
                    <select
                      value={pax.embarkPoint}
                      onChange={(e) => updatePassenger(i, 'embarkPoint', e.target.value)}
                      className={fieldClass + ' appearance-none'}
                    >
                      <option value="">Seleccionar</option>
                      {departure.embarkPoints.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact info ── */}
      <div className="space-y-3 pt-3 border-t border-border">
        <h3 className="font-body font-bold text-sm text-ink uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Datos de contacto
        </h3>
        <div>
          <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="tu@email.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="block font-body text-xs text-ink-muted mb-1 font-semibold">Teléfono / WhatsApp</label>
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="11 1234-5678"
            className={fieldClass}
          />
        </div>
      </div>

      {/* ── Total price ── */}
      {roomType && (
        <div className="pt-3 border-t border-border">
          <div className="bg-gradient-to-r from-pink/8 to-transparent rounded-2xl px-4 py-3">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-body text-xs text-ink-muted uppercase tracking-wider font-bold">Total</p>
                <p className="font-body text-ink-faint text-xs">{passengerCount} pasajero{passengerCount > 1 ? 's' : ''}</p>
              </div>
              <p className="font-display font-black text-3xl text-pink leading-none">{priceFormatter.format(totalPrice)}</p>
            </div>
            <p className="font-body text-ink-faint text-xs mt-2">El pago se coordina con tu asesor por WhatsApp.</p>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 font-body text-sm rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* ── Submit button with shimmer ── */}
      <button
        type="submit"
        disabled={loading || !roomType}
        className="w-full btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-black text-base py-4 rounded-2xl"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <InlineLoader size={24} />
            Enviando reserva…
          </span>
        ) : 'RESERVAR'}
      </button>

      <p className="font-body text-ink-faint text-xs text-center leading-relaxed">
        Al reservar aceptás nuestros términos. Tu asesor te contactará para coordinar el pago dentro de las 24hs.
      </p>
    </form>
  )
}
