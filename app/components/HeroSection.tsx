import ConfettiDecor from './ConfettiDecor'
import type { Destination } from '@/app/types'

const WA_URL =
  'https://wa.me/5491162203682?text=Hola!%20Quisiera%20conocer%20los%20paquetes%20tur%C3%ADsticos%20disponibles.'

const FLOAT_CLASSES = ['card-float-a', 'card-float-b', 'card-float-c']

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

interface HeroSectionProps {
  destinations: Destination[]
}

const STATS = [
  { value: '+500', label: 'viajeros' },
  { value: '+35',  label: 'destinos' },
  { value: '10+',  label: 'años' },
  { value: '18',   label: 'cuotas' },
]

export default function HeroSection({ destinations }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-mesh-animated"
      aria-label="Bienvenida a AMCABI Turismo"
    >
      {/* Confetti decorativo */}
      <ConfettiDecor />

      {/* Ambient glows - pink, cyan, yellow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] left-[50%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.07) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-28">
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            <div className="reveal-fade inline-flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse shrink-0" aria-hidden="true" />
              <span className="font-body text-white/65 text-xs font-semibold tracking-[0.18em] uppercase">
                Agencia de viajes · Argentina
              </span>
            </div>

            <h1
              className="reveal-up delay-150 font-display font-black text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              Tu próximo<br />
              destino está<br />
              <span className="text-pink">esperándote.</span>
            </h1>

            <p className="reveal-up delay-300 font-body text-white/55 text-lg max-w-lg mb-8 leading-relaxed">
              Paquetes completos con vuelo, hotel y traslados incluidos.
              Financiación en cuotas para que viajes hoy.
            </p>

            {/* Stats */}
            <div className="reveal-up delay-450 flex items-center gap-8 mb-10 border-t border-white/10 pt-8">
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
                aria-label="Reservar paquete turístico por WhatsApp"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reservar por WhatsApp
              </a>
              <a
                href="#destinos"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-7 py-4 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                aria-label="Ver todos los destinos disponibles"
              >
                Ver destinos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: 3D floating destination cards ── */}
          <div className="hidden lg:block relative h-[480px] xl:h-[520px]" aria-hidden="true">
            <div className="absolute inset-0">
              {/* Decorative rings - multi-color like logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-pink/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-yellow/15 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-cyan/10 pointer-events-none" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.12) 0%, transparent 70%)' }}
              />

              {/* Floating cards - using real destinations data */}
              {destinations.map((dest, i) => (
                <div
                  key={dest.slug}
                  className={`${FLOAT_CLASSES[i] ?? 'card-float-a'} absolute w-[220px] xl:w-[235px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60`}
                  style={{ zIndex: i + 1, top: '50%', left: '50%', marginTop: '-90px', marginLeft: '-110px' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.image}
                    alt={dest.imageAlt}
                    className="w-full h-[145px] object-cover"
                    loading="lazy"
                  />
                  <div className="bg-white px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink shrink-0" />
                      <p className="font-body text-ink-faint text-[10px] uppercase tracking-widest">{dest.province}</p>
                    </div>
                    <p className="font-display font-bold text-ink text-base leading-tight">{dest.name}</p>
                    <p className="font-body text-pink text-xs font-semibold mt-0.5">desde {priceFormatter.format(dest.priceFrom)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-page to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  )
}
