import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { getServices } from '@/sanity/lib/fetchers'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Conocé todos los servicios de AMCABI Turismo: paquetes con vuelo o bus, hoteles seleccionados, traslados, financiación en cuotas y asesor dedicado para tu viaje por Argentina.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/servicios' },
  openGraph: {
    title: 'Servicios | AMCABI Turismo',
    description:
      'Paquetes completos con vuelo o bus, hotel, traslados y seguro de viaje. Financiación en hasta 18 cuotas sin interés.',
    url: 'https://amcabiturismo.com.ar/servicios',
  },
}

const WA_URL =
  'https://wa.me/5491162203682?text=Hola!%20Quisiera%20cotizar%20un%20paquete%20tur%C3%ADstico.'

// ── Icons ────────────────────────────────────────────────────────────────────

function IconPlane() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}
function IconHotel() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 21h18M3 7l9-4 9 4M4 11h16v10H4zM9 21v-4h6v4" />
    </svg>
  )
}
function IconCar() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM1 10l2-6h18l2 6M1 10h22M5 10V7" />
    </svg>
  )
}
function IconCard() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}
function IconPerson() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}
function IconGroup() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg className="w-4 h-4 shrink-0 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconWA() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/** Map icon ID string from Sanity → React SVG component */
function resolveIcon(iconId: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    plane: <IconPlane />,
    hotel: <IconHotel />,
    car: <IconCar />,
    card: <IconCard />,
    person: <IconPerson />,
    shield: <IconShield />,
    group: <IconGroup />,
    bus: <IconCar />,
    finance: <IconCard />,
    advisor: <IconPerson />,
    insurance: <IconShield />,
    transport: <IconPlane />,
    accommodation: <IconHotel />,
  }
  return icons[iconId] ?? <IconShield />
}

// ── Static data (not in CMS) ─────────────────────────────────────────────────

const TRANSPORT_OPTS = [
  {
    icon: '✈',
    label: 'Vuelo',
    desc: 'Aerolíneas de cabotaje. Ideal para destinos lejanos como Bariloche, Salta o Cataratas.',
  },
  {
    icon: '🛏',
    label: 'Bus cama',
    desc: 'Asientos totalmente reclinables. Perfecto para destinos a 8-16 horas como Mar del Plata o Villa Carlos Paz.',
  },
  {
    icon: '🚌',
    label: 'Bus semicama',
    desc: 'Asientos reclinables con servicio a bordo. Opción económica para distancias medias.',
  },
]

const REGIME_OPTS = [
  { icon: '☕', label: 'Desayuno', desc: 'Desayuno buffet o continental incluido cada mañana en el hotel.' },
  { icon: '🍽', label: 'Media pensión', desc: 'Desayuno y cena incluidos. La opción más equilibrada para disfrutar el destino.' },
  { icon: '🍷', label: 'All inclusive', desc: 'Todas las comidas y bebidas incluidas. Máximo confort sin gastos extras.' },
  { icon: '🏨', label: 'Sin comidas', desc: 'Solo alojamiento. Libertad total para elegir dónde y qué comer cada día.' },
]

const STEPS = [
  {
    num: '01',
    icon: '📍',
    title: 'Elegís destino y fechas',
    body: 'Explorá los paquetes disponibles o contanos tus preferencias. Te asesoramos sobre la mejor época para cada destino.',
  },
  {
    num: '02',
    icon: '💬',
    title: 'Consultás disponibilidad',
    body: 'Escribinos por WhatsApp o email con el destino, fechas y cantidad de pasajeros. Te enviamos la cotización en el día.',
  },
  {
    num: '03',
    icon: '✅',
    title: 'Confirmás con señal',
    body: 'Reservás tu lugar con una señal y pagás el saldo antes de la salida. Múltiples formas de pago disponibles.',
  },
  {
    num: '04',
    icon: '🎫',
    title: 'Recibís tu voucher y viajás',
    body: 'Te enviamos el voucher digital con todos los detalles del paquete. ¡Solo queda hacer las valijas!',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiciosPage() {
  const services = await getServices()

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-mesh-animated pt-24 pb-16 lg:pt-32 lg:pb-24"
          aria-labelledby="srv-hero-heading"
        >
          {/* Purple glow — distinctive from other pages */}
          <div
            className="absolute top-0 right-0 w-[580px] h-[580px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.16) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.09) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-polkadot-dense opacity-25 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center">

              {/* ── Left ── */}
              <div>
                <div className="reveal-fade inline-flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-light animate-pulse shrink-0" aria-hidden="true" />
                  <span className="font-body text-white/65 text-xs font-semibold tracking-[0.18em] uppercase">
                    Todo lo que incluye tu viaje
                  </span>
                </div>

                <h1
                  id="srv-hero-heading"
                  className="reveal-up delay-150 font-display font-black text-white leading-[0.92] mb-6"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
                >
                  Todo lo que<br />
                  necesitás para<br />
                  <span className="text-purple-light">tu viaje.</span>
                </h1>

                <p className="reveal-up delay-300 font-body text-white/55 text-lg max-w-lg mb-8 leading-relaxed">
                  Paquetes completos con vuelo o bus, hotel, traslados y seguro de viaje.
                  Todo coordinado y financiado en cuotas para que vos solo disfrutes.
                </p>

                {/* Incluye chips */}
                <div className="reveal-up delay-450 flex flex-wrap gap-2 mb-10" aria-label="Servicios incluidos">
                  {['✈ Transporte', '🏨 Hotel', '🚐 Traslados', '🛡 Seguro', '💳 Cuotas'].map((chip) => (
                    <span key={chip} className="travel-chip text-[11px]">{chip}</span>
                  ))}
                </div>

                <div className="reveal-up delay-600 flex flex-col sm:flex-row gap-3">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-7 py-4 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                    aria-label="Cotizar paquete por WhatsApp"
                  >
                    <IconWA />
                    Cotizar por WhatsApp
                  </a>
                  <Link
                    href="/#destinos"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-7 py-4 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                  >
                    Ver destinos
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* ── Right: floating service cards ── */}
              <div className="hidden lg:block relative h-[480px] xl:h-[520px]" aria-hidden="true">
                <div className="absolute inset-0">
                  {/* Decorative rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-purple/15 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-purple/10 pointer-events-none" />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)' }}
                  />

                  {/* Service card 1 — Transporte */}
                  <div
                    className="card-float-a absolute w-[230px] bg-page rounded-2xl shadow-2xl shadow-black/50 p-4"
                    style={{ top: '50%', left: '50%', marginTop: '-110px', marginLeft: '-115px', zIndex: 1 }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center text-purple shrink-0">
                        <IconPlane />
                      </div>
                      <p className="font-body font-bold text-ink text-sm">Transporte</p>
                    </div>
                    <div className="flex gap-1.5">
                      {['Vuelo', 'Bus cama', 'Semicama'].map((t) => (
                        <span key={t} className="bg-purple/8 text-purple font-body text-[9px] font-bold px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Service card 2 — Hotel */}
                  <div
                    className="card-float-b absolute w-[230px] bg-page rounded-2xl shadow-2xl shadow-black/50 p-4"
                    style={{ top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-30px', zIndex: 2 }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-pink/10 flex items-center justify-center text-pink shrink-0">
                        <IconHotel />
                      </div>
                      <p className="font-body font-bold text-ink text-sm">Alojamiento</p>
                    </div>
                    <p className="font-body text-ink-faint text-xs">Hoteles seleccionados · Desayuno incluido</p>
                  </div>

                  {/* Service card 3 — Financiación */}
                  <div
                    className="card-float-c absolute w-[230px] bg-page rounded-2xl shadow-2xl shadow-black/50 p-4"
                    style={{ top: '50%', left: '50%', marginTop: '70px', marginLeft: '-160px', zIndex: 3 }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-yellow/15 flex items-center justify-center text-yellow shrink-0">
                        <IconCard />
                      </div>
                      <p className="font-body font-bold text-ink text-sm">Financiación</p>
                    </div>
                    <p className="font-body text-ink-faint text-xs">Hasta 18 cuotas sin interés</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple shrink-0" />
                      <p className="font-body text-purple text-[10px] font-bold">Visa · Mastercard · Naranja</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-page to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </section>

        {/* ══════════════════════════════════════════
            SERVICIOS PRINCIPALES (from CMS)
        ══════════════════════════════════════════ */}
        <section
          id="servicios"
          className="py-16 lg:py-24 bg-page bg-polkadot"
          aria-labelledby="srv-grid-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  Incluido en tu paquete
                </p>
                <h2
                  id="srv-grid-heading"
                  className="font-display text-3xl md:text-4xl font-black text-ink"
                >
                  ¿Qué incluye tu <span className="text-purple-light">paquete</span>?
                </h2>
                <p className="font-body text-ink-muted text-base max-w-xl mx-auto mt-4 leading-relaxed">
                  Cada paquete AMCABI está diseñado para que no tengas que preocuparte por nada.
                  Todo está coordinado de antemano.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((srv, i) => (
                <ScrollReveal key={srv.id} className={`stagger-${(i % 6) + 1}`}>
                  <div className="group bg-page border border-border hover:border-purple/35 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple/6 hover:-translate-y-1 card-3d h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 group-hover:bg-purple/15 flex items-center justify-center text-purple mb-5 transition-colors duration-200">
                      {resolveIcon(srv.icon)}
                    </div>
                    <h3 className="font-display font-black text-ink text-lg mb-2">{srv.title}</h3>
                    <p className="font-body text-ink-muted text-sm leading-relaxed mb-4 flex-1">{srv.description}</p>
                    <ul className="space-y-1.5" aria-label={`Detalles de ${srv.title}`}>
                      {srv.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 font-body text-xs text-ink-muted">
                          <IconCheck />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MODALIDADES
        ══════════════════════════════════════════ */}
        <section
          className="py-16 lg:py-20 bg-surface-alt"
          aria-labelledby="modalidades-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  A tu medida
                </p>
                <h2
                  id="modalidades-heading"
                  className="font-display text-3xl md:text-4xl font-black text-ink"
                >
                  Modalidades <span className="text-purple-light">disponibles</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

              {/* Transporte */}
              <ScrollReveal delay={80}>
                <div className="bg-page border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-purple/10 flex items-center justify-center text-purple shrink-0">
                      <IconPlane />
                    </div>
                    <h3 className="font-display font-black text-ink text-xl">Transporte</h3>
                  </div>
                  <div className="space-y-4">
                    {TRANSPORT_OPTS.map((t) => (
                      <div key={t.label} className="flex items-start gap-3.5 py-3 border-b border-border last:border-0">
                        <span className="text-2xl leading-none mt-0.5" aria-hidden="true">{t.icon}</span>
                        <div>
                          <p className="font-body font-bold text-ink text-sm mb-0.5">{t.label}</p>
                          <p className="font-body text-ink-faint text-xs leading-relaxed">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Alojamiento */}
              <ScrollReveal delay={160}>
                <div className="bg-page border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-purple/10 flex items-center justify-center text-purple shrink-0">
                      <IconHotel />
                    </div>
                    <h3 className="font-display font-black text-ink text-xl">Alojamiento</h3>
                  </div>
                  <div className="space-y-4">
                    {REGIME_OPTS.map((r) => (
                      <div key={r.label} className="flex items-start gap-3.5 py-3 border-b border-border last:border-0">
                        <span className="text-2xl leading-none mt-0.5" aria-hidden="true">{r.icon}</span>
                        <div>
                          <p className="font-body font-bold text-ink text-sm mb-0.5">{r.label}</p>
                          <p className="font-body text-ink-faint text-xs leading-relaxed">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROCESO DE RESERVA
        ══════════════════════════════════════════ */}
        <section
          className="py-16 lg:py-24 bg-page"
          aria-labelledby="proceso-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  Simple y rápido
                </p>
                <h2
                  id="proceso-heading"
                  className="font-display text-3xl md:text-4xl font-black text-ink"
                >
                  Cómo reservar en <span className="text-purple-light">4 pasos</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 90} className={`stagger-${i + 1}`}>
                  <div className="group relative bg-page border border-border hover:border-purple/35 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple/6 hover:-translate-y-1 card-3d text-center h-full flex flex-col">
                    <span
                      className="text-3xl mb-4 block leading-none"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                    <span
                      className="font-display font-black text-5xl text-ink/5 group-hover:text-purple/8 absolute top-4 right-5 leading-none select-none transition-colors duration-300"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                    <h3 className="font-display font-black text-ink text-base mb-2">{step.title}</h3>
                    <p className="font-body text-ink-muted text-xs leading-relaxed flex-1">{step.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA inline */}
            <ScrollReveal delay={200}>
              <div className="mt-10 text-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                  aria-label="Empezar consulta por WhatsApp"
                >
                  <IconWA />
                  Empezar ahora
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-mesh-animated py-20 lg:py-28"
          aria-labelledby="srv-cta-heading"
        >
          <div className="absolute inset-0 bg-polkadot-dense opacity-25 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.14) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <ScrollReveal>
              <p className="font-body text-purple-light text-sm font-bold tracking-widest uppercase mb-4">
                Armamos tu paquete a medida
              </p>
              <h2
                id="srv-cta-heading"
                className="font-display font-black text-white leading-[0.95] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                ¿Listo para cotizar<br />tu próximo viaje?
              </h2>
              <p className="font-body text-white/55 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Contanos a dónde querés ir, cuándo y con cuántas personas.
                Te enviamos una cotización en el día, sin compromiso.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                  aria-label="Cotizar paquete por WhatsApp"
                >
                  <IconWA />
                  Cotizar por WhatsApp
                </a>
                <a
                  href="mailto:info@amcabiturismo.com.ar"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-8 py-4 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                  aria-label="Enviar consulta por email"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@amcabiturismo.com.ar
                </a>
              </div>

              <p className="font-body text-white/25 text-xs mt-10">
                AMCABI TURISMO EVT — Legajo N° 14703 — Disposición 307/11
              </p>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
