import type { Metadata } from 'next'
import Link from 'next/link'
import QRCode from 'qrcode'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import AmcabiLogo from '@/app/components/AmcabiLogo'
import { getVoucherByCode } from '@/sanity/lib/fetchers'
import { ROOM_TYPE_LABELS, TRANSPORT_LABELS, REGIME_LABELS } from '@/app/types'
import PrintButton from './PrintButton'

interface Props {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  return {
    title: `Voucher ${code} – AMCABI Turismo`,
    robots: { index: false },
  }
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatLongDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

const WA_BASE = 'https://wa.me/5491162203682'

export default async function VoucherPage({ params }: Props) {
  const { code } = await params
  const voucher = await getVoucherByCode(code)

  if (voucher) {
    const booking = voucher.booking
    const dep = booking?.departure
    const isUsed = voucher.isUsed
    const isExpired = new Date(voucher.validUntil) < new Date()

    // Generate QR code that links to this voucher page
    const voucherUrl = `https://amcabiturismo.com.ar/voucher/${voucher.code}`
    let qrSvg: string | null = null
    try {
      qrSvg = await QRCode.toString(voucherUrl, {
        type: 'svg',
        margin: 1,
        width: 160,
        color: { dark: '#1a1a2e', light: '#ffffff' },
      })
    } catch {
      // Fallback handled below
    }

    const transportLabel = dep?.transport ? (TRANSPORT_LABELS[dep.transport] ?? dep.transport) : null
    const regimeLabel = dep?.regime ? (REGIME_LABELS[dep.regime] ?? dep.regime) : null
    const roomLabel = booking ? (ROOM_TYPE_LABELS[booking.roomType] ?? booking.roomType) : null

    return (
      <>
        <div className="print:hidden"><Header /></div>
        <main className="min-h-screen bg-page pt-16 print:pt-0 print:min-h-0 print:bg-white">

          {/* ── Branded banner (matches AMCABI visual identity) ── */}
          <div className="relative overflow-hidden bg-purple print:break-inside-avoid" style={{ minHeight: 120 }}>
            {/* Geometric shapes — triangles/polygons in brand colors */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
              <rect width="1200" height="140" fill="#7C3AED" />
              <polygon points="0,0 400,0 200,140 0,140" fill="#E91E8C" opacity="0.85" />
              <polygon points="300,0 700,0 500,140" fill="#FBD000" opacity="0.7" />
              <polygon points="800,0 1200,0 1200,140 1000,60" fill="#22D3EE" opacity="0.75" />
              <polygon points="600,0 900,0 1000,140 700,140" fill="#E91E8C" opacity="0.5" />
              <polygon points="0,0 150,0 0,80" fill="#22D3EE" opacity="0.6" />
              <polygon points="1050,0 1200,0 1200,50" fill="#FBD000" opacity="0.5" />
            </svg>
            {/* Logo + title overlay */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 md:py-8 flex flex-col items-start gap-1">
              <AmcabiLogo scale={1.8} white />
            </div>
          </div>

          {/* ── Trip title bar ── */}
          <div className="bg-surface border-b border-border px-4 py-4 print:border-b-2 print:border-purple">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-display font-black text-purple text-xl md:text-2xl">
                Voucher de servicios Turísticos
                {dep && (
                  <span className="text-ink-muted font-bold">
                    {' | '}{dep.destinationName ?? dep.title}
                    {dep.departureDate && <> | {formatDate(dep.departureDate)}</>}
                    {' | '}
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* ── Code + QR + Status card ── */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-body text-ink-faint text-xs uppercase tracking-widest mb-1">
                    Código de voucher
                  </p>
                  <p className="font-display font-black text-ink text-2xl md:text-3xl tracking-wider">
                    {voucher.code}
                  </p>

                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                    isUsed
                      ? 'bg-gray-100 text-gray-600'
                      : isExpired
                        ? 'bg-red-50 text-red-700'
                        : 'bg-green-50 text-green-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      isUsed ? 'bg-gray-400' : isExpired ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    {isUsed ? 'Utilizado' : isExpired ? 'Vencido' : 'Válido'}
                  </span>

                  {/* Validity dates */}
                  <div className="flex gap-6 mt-4 text-sm font-body">
                    <div>
                      <span className="text-ink-muted">Válido desde </span>
                      <span className="font-semibold text-ink">{formatDate(voucher.validFrom)}</span>
                    </div>
                    <div>
                      <span className="text-ink-muted">hasta </span>
                      <span className="font-semibold text-ink">{formatDate(voucher.validUntil)}</span>
                    </div>
                  </div>
                </div>

                {/* QR */}
                {qrSvg && (
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 shrink-0 bg-white border border-border rounded-xl flex items-center justify-center overflow-hidden print:w-32 print:h-32"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                )}
              </div>

              {/* Booking number */}
              {booking && (
                <p className="font-body text-ink-muted text-xs mt-4 pt-4 border-t border-border">
                  Reserva Nº <strong className="text-ink">{booking.bookingNumber}</strong>
                </p>
              )}
            </div>

            {/* ── Trip details grid ── */}
            {dep && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="font-display font-bold text-ink text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Datos del viaje
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Destination */}
                  <InfoCell
                    icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
                    label="Destino"
                    value={dep.destinationName ?? dep.title}
                  />
                  {/* Hotel */}
                  {dep.hotel && (
                    <InfoCell
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v12h12V4H4z" /><path d="M6 8h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" /></svg>}
                      label="Hotel"
                      value={dep.hotel}
                    />
                  )}
                  {/* Regime */}
                  {regimeLabel && (
                    <InfoCell
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 13.846 4.632 16 6.414 16H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 5H6.28l-.31-1.243A1 1 0 005 3H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>}
                      label="Régimen"
                      value={regimeLabel}
                    />
                  )}
                  {/* Transport */}
                  {transportLabel && (
                    <InfoCell
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6H7v6h6V6z" /><path fillRule="evenodd" d="M5 1a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H5zm0 2h10v10H5V3zm2 12a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>}
                      label="Transporte"
                      value={transportLabel}
                    />
                  )}
                  {/* Nights */}
                  {dep.nights && (
                    <InfoCell
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>}
                      label="Duración"
                      value={`${dep.nights} noches`}
                    />
                  )}
                  {/* Room */}
                  {roomLabel && (
                    <InfoCell
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
                      label="Habitación"
                      value={roomLabel}
                    />
                  )}
                </div>

                {/* Dates row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-border">
                  <div>
                    <p className="font-body text-ink-muted text-xs uppercase tracking-wider mb-1">Salida</p>
                    <p className="font-body font-semibold text-ink text-sm capitalize">{formatLongDate(dep.departureDate)}</p>
                  </div>
                  <div>
                    <p className="font-body text-ink-muted text-xs uppercase tracking-wider mb-1">Regreso</p>
                    <p className="font-body font-semibold text-ink text-sm capitalize">{formatLongDate(dep.returnDate)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Passengers ── */}
            {booking?.passengers && booking.passengers.length > 0 && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="font-display font-bold text-ink text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Pasajeros ({booking.passengers.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {booking.passengers.map((pax, i) => (
                    <div key={i} className="bg-page rounded-xl border border-border/50 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-7 h-7 rounded-full bg-pink/10 text-pink flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="font-body font-bold text-ink text-sm">
                          {pax.lastName}, {pax.firstName}
                        </p>
                      </div>
                      <div className="space-y-1.5 font-body text-xs">
                        <div className="flex justify-between">
                          <span className="text-ink-muted">DNI</span>
                          <span className="text-ink font-medium">{pax.dni}</span>
                        </div>
                        {pax.embarkPoint && (
                          <div className="flex justify-between">
                            <span className="text-ink-muted">Embarque</span>
                            <span className="text-ink font-medium">{pax.embarkPoint}</span>
                          </div>
                        )}
                        {regimeLabel && (
                          <div className="flex justify-between">
                            <span className="text-ink-muted">Régimen</span>
                            <span className="text-ink font-medium">{regimeLabel}</span>
                          </div>
                        )}
                        {transportLabel && (
                          <div className="flex justify-between">
                            <span className="text-ink-muted">Transporte</span>
                            <span className="text-ink font-medium">{transportLabel}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Extra fees ── */}
            {dep?.extraFees && dep.extraFees.length > 0 && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="font-display font-bold text-ink text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  Costos adicionales
                </h2>
                <div className="divide-y divide-border">
                  {dep.extraFees.map((fee, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 font-body text-sm">
                      <span className="text-ink-muted">{fee.label}</span>
                      <span className="font-semibold text-ink">${fee.amount.toLocaleString('es-AR')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Important notes ── */}
            {dep?.importantNotes && (
              <div className="bg-yellow/10 border border-yellow/30 rounded-2xl p-6">
                <h2 className="font-display font-bold text-ink text-base mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Notas importantes
                </h2>
                <p className="font-body text-ink-muted text-sm whitespace-pre-line leading-relaxed">
                  {dep.importantNotes}
                </p>
              </div>
            )}

            {/* ── Legal / documentation notice ── */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-ink text-base mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                Documentación requerida
              </h2>
              <ul className="space-y-2 font-body text-sm text-ink-muted">
                <li className="flex gap-2">
                  <span className="text-cyan shrink-0">•</span>
                  Todos los pasajeros deben presentar <strong className="text-ink">DNI físico vigente</strong> al momento de abordar.
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan shrink-0">•</span>
                  Menores de edad deben viajar con DNI y autorización notarial si no viajan con ambos padres.
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan shrink-0">•</span>
                  Este voucher debe ser presentado impreso o en formato digital al momento del embarque.
                </li>
              </ul>
            </div>

            {/* ── Contact info ── */}
            {booking && (booking.contactEmail || booking.contactPhone) && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="font-display font-bold text-ink text-base mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contacto de la reserva
                </h2>
                <div className="flex flex-wrap gap-6 font-body text-sm">
                  {booking.contactEmail && (
                    <div>
                      <span className="text-ink-muted">Email: </span>
                      <a href={`mailto:${booking.contactEmail}`} className="text-pink hover:underline font-medium">{booking.contactEmail}</a>
                    </div>
                  )}
                  {booking.contactPhone && (
                    <div>
                      <span className="text-ink-muted">Teléfono: </span>
                      <span className="text-ink font-medium">{booking.contactPhone}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Consulta sobre voucher ${voucher.code}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-semibold text-green-700 hover:text-green-800 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* ── Actions (print + back links) ── */}
            <div className="flex flex-col items-center gap-4 print:hidden">
              <PrintButton />
              <div className="flex items-center gap-4 text-center">
                <Link
                  href="/consulta-voucher"
                  className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
                >
                  &larr; Buscar otro voucher
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

          </div>
        </main>
        <div className="print:hidden"><Footer /></div>
      </>
    )
  }

  // ── Voucher not found ──
  const waText = `Hola! Estoy buscando el voucher con código ${code}. ¿Me podés ayudar?`
  const waUrl = `${WA_BASE}?text=${encodeURIComponent(waText)}`

  return (
    <>
      <Header />
      <main className="min-h-screen bg-page pt-16">
        <div className="relative overflow-hidden bg-purple" style={{ minHeight: 100 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
            <rect width="1200" height="120" fill="#7C3AED" />
            <polygon points="0,0 400,0 200,120 0,120" fill="#E91E8C" opacity="0.85" />
            <polygon points="300,0 700,0 500,120" fill="#FBD000" opacity="0.7" />
            <polygon points="800,0 1200,0 1200,120 1000,50" fill="#22D3EE" opacity="0.75" />
            <polygon points="600,0 900,0 1000,120 700,120" fill="#E91E8C" opacity="0.5" />
          </svg>
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-5 flex flex-col items-start gap-1">
            <AmcabiLogo scale={1.5} white />
            <p className="font-display font-bold text-white/80 text-sm mt-1">Voucher &middot; {code}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display font-black text-ink text-2xl mb-3">
            No encontramos este voucher
          </h2>
          <p className="font-body text-ink-muted text-sm mb-8 max-w-md mx-auto">
            El código <strong className="text-ink">{code}</strong> no existe en nuestro sistema o aún está siendo procesado.
            Si acabás de realizar el pago, el voucher puede demorar unos minutos en generarse.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
            <Link
              href="/consulta-voucher"
              className="inline-flex items-center gap-2 border border-border hover:border-pink/40 text-ink hover:text-pink px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200"
            >
              Buscar otro código
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* ── Info cell helper ── */
function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-page rounded-xl">
      <span className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center shrink-0">
        {icon}
      </span>
      <div>
        <p className="font-body text-ink-muted text-xs uppercase tracking-wider">{label}</p>
        <p className="font-body font-semibold text-ink text-sm mt-0.5">{value}</p>
      </div>
    </div>
  )
}
