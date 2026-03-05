import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import OrbitalVisual from '../components/OrbitalVisual'
import ConfettiDecor from '../components/ConfettiDecor'

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'Conocé el equipo detrás de AMCABI Turismo. Somos una agencia habilitada (Legajo EVT 14703) con más de una década conectando familias y viajeros con los mejores destinos de Argentina.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/quienes-somos' },
  openGraph: {
    title: 'Quiénes Somos | AMCABI Turismo',
    description:
      'Jóvenes profesionales apasionados por el turismo argentino. Agencia habilitada EVT 14703.',
  },
}

const WA_URL =
  'https://wa.me/5491162203682?text=Hola!%20Quisiera%20conocer%20los%20paquetes%20tur%C3%ADsticos%20disponibles.'

// ── Icons ────────────────────────────────────────────────────────────────────

function IconHotel() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 21h18M3 7l9-4 9 4M4 11h16v10H4zM9 21v-4h6v4" />
    </svg>
  )
}
function IconPin() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  )
}
function IconTeam() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
function IconArrow() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg className="w-4 h-4 shrink-0 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '+13', label: 'Años en el mercado' },
  { value: '+35', label: 'Destinos activos' },
  { value: '+5k', label: 'Viajeros satisfechos' },
  { value: '18',  label: 'Cuotas sin interés' },
]

const PILLARS = [
  {
    num: '01',
    icon: <IconHotel />,
    title: 'Hoteles Seleccionados',
    body: 'Cada alojamiento de nuestro portafolio supera estándares rigurosos de calidad y confort. Trabajamos con establecimientos que comparten nuestra filosofía: que cada huésped se sienta en casa, recibiendo la atención que merece.',
    cta: 'Ver paquetes',
    href: '/#destinos',
    stagger: 'stagger-1',
  },
  {
    num: '02',
    icon: <IconPin />,
    title: 'Destinos Imperdibles',
    body: 'Desde la inmensidad patagónica hasta los valles del noroeste y las playas bonaerenses. Cubrimos los principales destinos turísticos de Argentina con paquetes flexibles y promociones vigentes todo el año.',
    cta: 'Explorar destinos',
    href: '/#destinos',
    stagger: 'stagger-2',
  },
  {
    num: '03',
    icon: <IconTeam />,
    title: 'Nuestro Equipo',
    body: 'Somos profesionales apasionados por el turismo, comprometidos con la excelencia en cada detalle. Creemos en el trato personalizado como nuestro verdadero diferencial: cada consulta es atendida con dedicación y conocimiento genuino del destino.',
    cta: 'Hablar con un asesor',
    href: WA_URL,
    stagger: 'stagger-3',
  },
  {
    num: '04',
    icon: <IconShield />,
    title: 'Garantía AMCABI',
    body: 'Nuestra trayectoria habla por nosotros. Respaldados por la habilitación EVT N° 14703 del Ministerio de Turismo y Deportes de la Nación, garantizamos que cada servicio cumpla los más altos estándares. Su tranquilidad es nuestra responsabilidad.',
    cta: 'Conocer más',
    href: '#contacto',
    stagger: 'stagger-4',
  },
]

const VALUES = [
  'Atención personalizada desde la primera consulta hasta el regreso',
  'Transparencia total en precios, condiciones y disponibilidad',
  'Compromiso con la excelencia y la mejora continua',
  'Financiación accesible para que nadie deje de viajar',
  'Pasión genuina por el turismo argentino',
  'Respaldo legal y habilitación del Ministerio de Turismo',
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function QuienesSomosPage() {
  return (
    <>
      <Header />

      <main id="main-content">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-x-clip bg-mesh-animated"
          aria-labelledby="qs-hero-heading"
        >
          {/* Confetti decorativo */}
          <ConfettiDecor className="z-0" />

          {/* Ambient glows - z-0 para que queden debajo del contenido */}
          <div
            className="absolute z-0 top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.16) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute z-0 bottom-0 left-[10%] w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Yellow glow accent */}
          <div
            className="absolute z-0 top-[20%] left-[60%] w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.08) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-24">
            <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-center">

              {/* ── Left: Text ── */}
              <div className="relative z-20">
                {/* Badge */}
                <div className="reveal-fade inline-flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse shrink-0" aria-hidden="true" />
                  <span className="font-body text-white/65 text-xs font-semibold tracking-[0.18em] uppercase">
                    Agencia EVT N° 14703 · Desde 2011
                  </span>
                </div>

                {/* Heading */}
                <h1
                  id="qs-hero-heading"
                  className="reveal-up delay-150 font-display font-black text-white leading-[0.92] mb-6"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
                >
                  El equipo detrás<br />
                  de cada<br />
                  <span className="text-pink">viaje memorable.</span>
                </h1>

                <p className="reveal-up delay-300 font-body text-white/55 text-lg max-w-lg mb-10 leading-relaxed">
                  Somos AMCABI Turismo: una agencia habilitada que lleva más de una
                  década conectando familias y viajeros con los destinos más increíbles
                  de Argentina, con financiación y sin sorpresas.
                </p>

                {/* Stats inline */}
                <div className="reveal-up delay-450 flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 border-t border-white/10 pt-8">
                  {STATS.map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-display font-black text-white text-2xl leading-none">{value}</p>
                      <p className="font-body text-white/35 text-[11px] uppercase tracking-widest mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="reveal-up delay-600 flex flex-col sm:flex-row gap-3">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-7 py-4 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                    aria-label="Hablar con un asesor por WhatsApp"
                  >
                    <IconWA />
                    Hablar con un asesor
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

              {/* ── Right: Orbital visual ── */}
              <div className="relative z-20 hidden lg:flex items-center justify-center reveal-fade delay-300 overflow-visible p-4">
                <OrbitalVisual />
              </div>
            </div>
          </div>

          {/* Fade into page */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-page to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </section>

        {/* ══════════════════════════════════════════
            PILLARS
        ══════════════════════════════════════════ */}
        <section
          id="pilares"
          className="py-16 lg:py-24 bg-page bg-polkadot"
          aria-labelledby="pillars-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  Nuestros pilares
                </p>
                <h2
                  id="pillars-heading"
                  className="font-display text-3xl md:text-4xl font-black text-ink"
                >
                  Lo que nos <span className="text-pink">define</span>
                </h2>
                <p className="font-body text-ink-muted text-base max-w-xl mx-auto mt-4 leading-relaxed">
                  Cuatro compromisos que guían cada paquete que diseñamos y cada cliente que acompañamos.
                </p>
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((p) => (
                <ScrollReveal key={p.num} className={p.stagger}>
                  <div className="group bg-page border border-border hover:border-pink/40 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-pink/8 hover:-translate-y-1 card-3d h-full flex flex-col">

                    {/* Top row: icon + number */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-pink/10 group-hover:bg-pink/15 flex items-center justify-center text-pink transition-colors duration-200 shrink-0">
                        {p.icon}
                      </div>
                      <span
                        className="font-display font-black text-5xl text-ink/5 group-hover:text-pink/10 leading-none transition-colors duration-300 select-none"
                        aria-hidden="true"
                      >
                        {p.num}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-ink text-xl mb-3">{p.title}</h3>
                    <p className="font-body text-ink-muted text-sm leading-relaxed flex-1">{p.body}</p>

                    <a
                      href={p.href}
                      className="inline-flex items-center gap-1.5 mt-6 font-body text-xs font-bold text-pink uppercase tracking-widest hover:gap-2.5 transition-all duration-200"
                      {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {p.cta}
                      <IconArrow />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FILOSOFÍA / VALORES
        ══════════════════════════════════════════ */}
        <section
          id="filosofia"
          className="py-16 lg:py-24 bg-surface-alt"
          aria-labelledby="philosophy-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

              {/* ── Left: quote + body + values ── */}
              <div>
                <ScrollReveal>
                  <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-6">
                    Nuestra filosofía
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={80}>
                  <blockquote
                    id="philosophy-heading"
                    className="font-display font-black text-ink text-3xl md:text-4xl leading-tight mb-6"
                  >
                    "El viaje comienza<br />
                    <span className="text-pink">mucho antes</span> de abordar el avión."
                  </blockquote>
                </ScrollReveal>

                <ScrollReveal delay={160}>
                  <p className="font-body text-ink-muted text-base leading-relaxed mb-4">
                    En AMCABI entendemos que planificar un viaje es el primer acto de aventura.
                    Por eso acompañamos a nuestros clientes desde la primera consulta hasta el
                    regreso a casa, asegurándonos de que cada etapa sea tan memorable como el
                    destino mismo.
                  </p>
                  <p className="font-body text-ink-muted text-base leading-relaxed mb-8">
                    Fomentamos una cultura de trabajo colaborativa donde el intercambio de ideas y
                    el compromiso con la mejora continua nos permiten superar constantemente las
                    expectativas de quienes confían en nosotros.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={240}>
                  <ul className="space-y-3" aria-label="Nuestros valores">
                    {VALUES.map((v) => (
                      <li key={v} className="flex items-start gap-3 font-body text-sm text-ink-muted leading-relaxed">
                        <IconCheck />
                        {v}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

              {/* ── Right: visual card stack ── */}
              <ScrollReveal delay={120} className="hidden lg:block">
                <div className="relative h-[480px]">

                  {/* Decorative ring */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-pink/8 pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] rounded-full border border-pink/6 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Pink ambient */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.1) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />

                  {/* Value cards floating */}
                  {[
                    {
                      icon: '✈️', title: 'Trato personalizado',
                      desc: 'Un asesor exclusivo para cada viajero',
                      pos: 'top-[8%] left-[5%]', rotate: '-rotate-3', delay: '0s',
                    },
                    {
                      icon: '🛡️', title: 'Agencia habilitada',
                      desc: 'Legajo EVT N° 14703 — Ministerio de Turismo',
                      pos: 'top-[36%] right-[0%]', rotate: 'rotate-2', delay: '1s',
                    },
                    {
                      icon: '💳', title: 'Financiación',
                      desc: 'Hasta 18 cuotas sin interés',
                      pos: 'bottom-[8%] left-[8%]', rotate: 'rotate-1', delay: '0.5s',
                    },
                  ].map(({ icon, title, desc, pos, rotate, delay }) => (
                    <div
                      key={title}
                      className={`absolute ${pos} ${rotate} bg-page border border-border rounded-2xl shadow-lg shadow-black/8 p-4 w-[210px] card-float-a`}
                      style={{ animationDelay: delay }}
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-lg">{icon}</span>
                        <p className="font-body font-bold text-ink text-sm">{title}</p>
                      </div>
                      <p className="font-body text-ink-faint text-xs leading-snug">{desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA — CONTACTO
        ══════════════════════════════════════════ */}
        <section
          id="contacto"
          className="relative overflow-hidden bg-mesh-animated py-20 lg:py-28"
          aria-labelledby="cta-heading"
        >
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.15) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <ScrollReveal>
              <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-4">
                Estamos listos para ayudarte
              </p>
              <h2
                id="cta-heading"
                className="font-display font-black text-white leading-[0.95] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                ¿Cuándo arranca<br />tu próximo aventura?
              </h2>
              <p className="font-body text-white/55 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Escribinos por WhatsApp o mandanos un mail. Atendemos de lunes a viernes
                de 10:00 a 17:00 hs. También respondemos consultas fuera de horario.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                  aria-label="Consultar por WhatsApp"
                >
                  <IconWA />
                  Escribir por WhatsApp
                </a>
                <a
                  href="mailto:info@amcabiturismo.com.ar"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-8 py-4 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                  aria-label="Enviar email a AMCABI Turismo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />
                  </svg>
                  info@amcabiturismo.com.ar
                </a>
              </div>

              {/* Legal note */}
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
