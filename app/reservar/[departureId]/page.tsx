import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getDepartureById } from '@/sanity/lib/fetchers'
import { TRANSPORT_LABELS, REGIME_LABELS } from '@/app/types'
import BookingForm from './BookingForm'
import ScrollReveal from '../../components/ScrollReveal'

interface Props {
  params: Promise<{ departureId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { departureId } = await params
  const departure = await getDepartureById(departureId)

  if (!departure) {
    return {
      title: 'Reservar Paquete',
      description: 'Reservá tu paquete turístico con AMCABI Turismo.',
    }
  }

  const title = `Reservar ${departure.title} | AMCABI Turismo`
  const description = `Reservá tu paquete a ${departure.destinationName}. ${departure.nights} noches con ${TRANSPORT_LABELS[departure.transport] ?? departure.transport}. Salida: ${new Date(departure.departureDate + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}.`

  return {
    title,
    description,
    robots: { index: false },
    openGraph: {
      title,
      description,
      images: departure.destinationImage
        ? [{ url: departure.destinationImage, alt: departure.destinationImageAlt }]
        : undefined,
    },
  }
}

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const TRANSPORT_ICONS: Record<string, string> = {
  avion: '✈',
  bus_cama: '🚌',
  bus_semicama: '🚌',
}

const REGIME_ICONS: Record<string, string> = {
  desayuno: '☕',
  media_pension: '🍽',
  all_inclusive: '🍷',
  sin_comidas: '🏨',
}

export default async function ReservarPage({ params }: Props) {
  const { departureId } = await params
  const departure = await getDepartureById(departureId)

  if (!departure) notFound()

  return (
    <main className="min-h-screen bg-page pt-16">

      {/* Breadcrumb */}
      <div className="bg-page-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-body text-xs text-ink-faint" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-pink transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/destinos/${departure.destinationSlug}`} className="hover:text-pink transition-colors">{departure.destinationName}</Link>
            <span>/</span>
            <span className="text-ink truncate max-w-[180px]">{departure.title}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO BAND: fullbleed image with overlay ── */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">

        {/* Image with zoom-in animation */}
        <div className="absolute inset-0 booking-hero-img">
          <Image
            src={departure.destinationImage}
            alt={departure.destinationImageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />

        {/* Pink tint on left */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-pink/25 to-transparent pointer-events-none" />

        {/* Polkadot texture overlay */}
        <div className="absolute inset-0 bg-polkadot opacity-10 pointer-events-none" />

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-12 pb-8 md:pb-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight reveal-on-scroll in-view">
              {departure.title}
            </h1>

            {/* Glass chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {departure.transport && (
                <span className="travel-chip">
                  {TRANSPORT_ICONS[departure.transport] ?? '🚐'}{' '}
                  {TRANSPORT_LABELS[departure.transport] ?? departure.transport}
                </span>
              )}
              {departure.nights > 0 && (
                <span className="travel-chip">
                  🌙 {departure.nights + 1} días / {departure.nights} noches
                </span>
              )}
              {departure.regime && (
                <span className="travel-chip">
                  {REGIME_ICONS[departure.regime] ?? '🍴'}{' '}
                  {REGIME_LABELS[departure.regime] ?? departure.regime}
                </span>
              )}
              {departure.hotel && (
                <span className="travel-chip hidden md:inline-flex">
                  🏨 {departure.hotel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-COL CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10">

          {/* ── LEFT: Package info ── */}
          <div className="space-y-8">

            {/* What's included */}
            <ScrollReveal>
              <div>
                <p className="font-body text-pink font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Conocé qué incluye el servicio de AMCABI
                </p>
                <h2 className="font-display font-black text-2xl md:text-3xl text-ink mb-5">
                  {departure.title.toUpperCase()}
                </h2>

                <div className="space-y-3">
                  {departure.nights > 0 && (
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <p className="font-body text-ink-muted text-sm pt-1">Programa de {departure.nights + 1} días y {departure.nights} noches</p>
                    </div>
                  )}
                  {departure.hotel && (
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </span>
                      <p className="font-body text-ink-muted text-sm pt-1">{departure.hotel}</p>
                    </div>
                  )}
                  {departure.regime && (
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </span>
                      <p className="font-body text-ink-muted text-sm pt-1">{REGIME_LABELS[departure.regime] ?? departure.regime}</p>
                    </div>
                  )}
                  {departure.transport && (
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                      <p className="font-body text-ink-muted text-sm pt-1">{TRANSPORT_LABELS[departure.transport] ?? departure.transport}, ida y vuelta</p>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <p className="font-body text-ink-muted text-sm pt-1">Coordinación permanente</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Dates grid */}
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-page-soft to-pink/5 rounded-2xl p-5 border-l-4 border-pink">
                  <p className="font-body text-xs text-pink font-bold uppercase tracking-wider mb-1.5">✈ Salida</p>
                  <p className="font-body font-semibold text-ink text-sm">{formatDate(departure.departureDate)}</p>
                </div>
                <div className="bg-gradient-to-br from-page-soft to-pink/5 rounded-2xl p-5 border-l-4 border-pink/40">
                  <p className="font-body text-xs text-pink/70 font-bold uppercase tracking-wider mb-1.5">🏠 Regreso</p>
                  <p className="font-body font-semibold text-ink text-sm">{formatDate(departure.returnDate)}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Important notes */}
            {departure.importantNotes && (
              <ScrollReveal delay={200}>
                <div className="bg-yellow/5 rounded-2xl p-6 border-l-4 border-yellow">
                  <h3 className="font-display font-black text-base text-ink mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    NOTAS IMPORTANTES
                  </h3>
                  <div className="space-y-1.5">
                    {departure.importantNotes.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="font-body text-ink-muted text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

          {/* ── RIGHT: Booking form with glass card + 3D tilt ── */}
          <div>
            <div className="lg:sticky lg:top-24">
              <ScrollReveal delay={120}>
                <div className="glass-card rounded-3xl p-6 card-3d">
                  <BookingForm departure={departure} />
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </div>

    </main>
  )
}
