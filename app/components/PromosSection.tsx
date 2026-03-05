import Link from 'next/link'
import type { Promo } from '@/app/types'
import ScrollReveal from './ScrollReveal'
import PromoCarousel from './PromoCarousel'

export default function PromosSection({ promos }: { promos: Promo[] }) {
  return (
    <section
      id="promos"
      className="py-14 lg:py-20 bg-gradient-to-b from-page-soft to-page"
      aria-labelledby="promos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-2">
                Actualizadas cada temporada
              </p>
              <h2
                id="promos-heading"
                className="font-display text-3xl md:text-4xl font-black text-ink"
              >
                Preventas & Ofertas
              </h2>
            </div>
            <Link
              href="#destinos"
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-pink transition-colors duration-150 shrink-0 font-semibold"
              aria-label="Ver todos los destinos disponibles"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Promo carousel */}
        <ScrollReveal delay={80}>
          <PromoCarousel promos={promos} />
        </ScrollReveal>
      </div>
    </section>
  )
}
