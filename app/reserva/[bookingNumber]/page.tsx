import Link from 'next/link'
import type { Metadata } from 'next'
import { getBookingByNumber } from '@/sanity/lib/fetchers'
import { ROOM_TYPE_LABELS } from '@/app/types'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

interface Props {
  params: Promise<{ bookingNumber: string }>
  searchParams: Promise<{ title?: string; dest?: string; date?: string; pax?: string; price?: string; room?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookingNumber } = await params
  return {
    title: `Reserva Nº${bookingNumber} – AMCABI Turismo`,
    robots: { index: false },
  }
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

function formatShortDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const WA_BASE = 'https://wa.me/5491162203682'

export default async function BookingPage({ params, searchParams }: Props) {
  const { bookingNumber } = await params
  const sp = await searchParams

  // Try to fetch booking from Sanity
  const booking = await getBookingByNumber(bookingNumber)

  // If we have a booking from Sanity, use it
  if (booking) {
    const isPaid = booking.paymentStatus === 'paid'
    const isPending = booking.paymentStatus === 'pending'
    const dest = booking.departure?.destinationName ?? ''
    const title = booking.departure?.title ?? ''

    const waText = `Hola! Consulto por mi reserva Nº ${bookingNumber} para ${dest}${title ? ` (${title})` : ''}. ¿Cómo procedo con el pago?`
    const waUrl = `${WA_BASE}?text=${encodeURIComponent(waText)}`

    return (
      <>
        <Header />
        <main className="min-h-screen bg-page pt-16">
          {/* Pink title header */}
          <div className="bg-pink px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-display font-black text-white text-xl md:text-2xl">
                Consultá tu reserva
              </h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* Status banner */}
            <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border ${
              isPaid
                ? 'bg-green-50 border-green-200'
                : isPending
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-red-50 border-red-200'
            }`}>
              {isPaid ? (
                <svg className="w-6 h-6 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-yellow-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <p className={`font-body font-bold text-base ${
                isPaid ? 'text-green-700' : isPending ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {isPaid
                  ? 'Esta reserva está confirmada.'
                  : isPending
                    ? 'Esta reserva está pendiente de pago.'
                    : 'Esta reserva fue cancelada.'}
              </p>
            </div>

            {/* Booking details */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-body font-bold text-ink text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Detalles de reserva
              </h2>
              <ul className="space-y-2 font-body text-sm">
                <li className="flex gap-2">
                  <span className="text-ink-muted">•</span>
                  <span><strong className="text-ink">Número de reserva:</strong> Nº{booking.bookingNumber}</span>
                </li>
                {booking.departure && (
                  <li className="flex gap-2">
                    <span className="text-ink-muted">•</span>
                    <span><strong className="text-ink">Destino:</strong> {booking.departure.title}</span>
                  </li>
                )}
                {booking.departure?.hotel && (
                  <li className="flex gap-2">
                    <span className="text-ink-muted">•</span>
                    <span><strong className="text-ink">Hotel:</strong> {booking.departure.hotel}</span>
                  </li>
                )}
                <li className="flex gap-2">
                  <span className="text-ink-muted">•</span>
                  <span><strong className="text-ink">Habitación:</strong> {ROOM_TYPE_LABELS[booking.roomType] ?? booking.roomType}</span>
                </li>
                {booking.departure?.departureDate && (
                  <li className="flex gap-2">
                    <span className="text-ink-muted">•</span>
                    <span><strong className="text-ink">Fecha de Salida:</strong> {formatShortDate(booking.departure.departureDate)}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Passengers */}
            {booking.passengers && booking.passengers.length > 0 && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="font-body font-bold text-pink text-base mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Pasajeros que integran la reserva
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {booking.passengers.map((pax, i) => (
                    <div key={i} className="bg-page-soft rounded-xl p-4">
                      <p className="font-body text-ink-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Pasajero {i + 1}
                      </p>
                      <p className="font-body font-bold text-ink text-sm mb-1">
                        {pax.firstName} {pax.lastName}
                      </p>
                      <p className="font-body text-ink-muted text-xs">
                        DNI: {pax.dni}
                      </p>
                      {pax.embarkPoint && (
                        <p className="font-body text-ink-muted text-xs mt-1">
                          Embarque: {pax.embarkPoint}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total price */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-body font-bold text-ink text-lg">Total</span>
                <span className="font-display font-black text-pink text-2xl">
                  {priceFormatter.format(booking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Pay via WhatsApp CTA */}
            {isPending && (
              <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                <h2 className="font-display font-black text-ink text-xl mb-2">¿Cómo pago?</h2>
                <p className="font-body text-ink-muted text-sm mb-6 max-w-md mx-auto">
                  Contactate con tu asesor por WhatsApp para coordinar el método de pago.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-display font-black text-base transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Escribir por WhatsApp
                </a>
              </div>
            )}

            {/* Back links */}
            <div className="flex items-center justify-center gap-4 text-center">
              <Link
                href="/consulta-reserva"
                className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
              >
                ← Buscar otra reserva
              </Link>
              <span className="text-ink-faint">|</span>
              <Link
                href="/"
                className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
              >
                Volver al inicio
              </Link>
            </div>

          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Fallback: use query params (for newly created bookings that redirect here)
  const { title = '', dest = '', date = '', pax = '1', price = '0', room = '' } = sp
  const hasQueryData = dest || title || date || Number(price) > 0

  if (hasQueryData) {
    const priceNum = Number(price)
    const paxNum = Number(pax)

    const waText = `Hola! Realicé la reserva Nº ${bookingNumber} para ${dest}${title ? ` (${title})` : ''}. ¿Cómo procedo con el pago?`
    const waUrl = `${WA_BASE}?text=${encodeURIComponent(waText)}`

    return (
      <>
        <Header />
        <main className="min-h-screen bg-page pt-16">
          {/* Pink title header */}
          <div className="bg-pink px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-display font-black text-white text-xl md:text-2xl flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reserva Confirmada
              </h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            {/* Booking info */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <svg className="w-5 h-5 text-pink shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="font-body text-ink-muted text-sm leading-relaxed">
                  Su reserva <strong className="text-ink">Nº{bookingNumber}</strong>
                  {room && ` (${room})`}
                  {dest && ` con destino a ${dest}`}
                  {title && ` — ${title}`}
                  {date && ` el día ${formatDate(date)}`}
                  {' '}ha sido confirmada correctamente.
                </p>
              </div>
              <div className="bg-page-soft rounded-xl p-4 space-y-2">
                <p className="font-body text-ink-muted text-sm">
                  Los datos han sido enviados a su email (revisar correo SPAM).
                </p>
                <p className="font-body text-ink-muted text-sm">
                  Esta reserva estará vigente por <strong>24hs</strong>. Si pasado ese período no se efectuó ningún pago la misma será dada de baja.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-body text-pink font-bold text-sm tracking-widest uppercase mb-4">
                Resumen de la reserva
              </h2>
              <div className="space-y-2">
                {dest && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-muted">Destino</span>
                    <span className="text-ink font-semibold">{dest}</span>
                  </div>
                )}
                {title && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-muted">Paquete</span>
                    <span className="text-ink font-semibold">{title}</span>
                  </div>
                )}
                {date && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-muted">Salida</span>
                    <span className="text-ink font-semibold">{formatDate(date)}</span>
                  </div>
                )}
                {room && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-muted">Habitación</span>
                    <span className="text-ink font-semibold">{room}</span>
                  </div>
                )}
                {paxNum > 0 && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-muted">Pasajeros</span>
                    <span className="text-ink font-semibold">{paxNum}</span>
                  </div>
                )}
                {priceNum > 0 && (
                  <div className="flex justify-between font-body text-sm border-t border-border pt-2 mt-2">
                    <span className="text-ink font-bold">Total</span>
                    <span className="text-pink font-display font-black text-lg">{priceFormatter.format(priceNum)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <h2 className="font-display font-black text-ink text-xl mb-2">¿Cómo pago?</h2>
              <p className="font-body text-ink-muted text-sm mb-6 max-w-md mx-auto">
                Contactate con tu asesor por WhatsApp para coordinar el método de pago.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-display font-black text-base transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>

            {/* Back home */}
            <div className="text-center">
              <Link href="/" className="font-body text-sm text-ink-muted hover:text-pink transition-colors">
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // No booking found and no query params - show not found
  return (
    <>
      <Header />
      <main className="min-h-screen bg-page pt-16">
        <div className="bg-pink px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-black text-white text-xl md:text-2xl">
              Consultá tu reserva
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="font-display font-black text-ink text-2xl mb-3">
            No encontramos esta reserva
          </h2>
          <p className="font-body text-ink-muted text-sm mb-8 max-w-md mx-auto">
            El número de reserva <strong className="text-ink">Nº{bookingNumber}</strong> no existe en nuestro sistema.
            Verificá que el número sea correcto.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/consulta-reserva"
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200"
            >
              Buscar otra reserva
            </Link>
            <a
              href={WA_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border hover:border-pink/40 text-ink hover:text-pink px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200"
            >
              Contactar soporte
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
