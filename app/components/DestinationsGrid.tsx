import Image from 'next/image'
import Link from 'next/link'
import type { Destination } from '@/app/types'
import ScrollReveal from './ScrollReveal'

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function formatPrice(price: number): string {
  return priceFormatter.format(price)
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-pink shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  const tripSchemasGraph = {
    '@context': 'https://schema.org',
    '@graph': destinations.map((dest) => ({
      '@type': 'TouristTrip',
      '@id': `https://amcabiturismo.com.ar/destinos/${dest.slug}`,
      name: `Paquete turístico a ${dest.name}, ${dest.province}`,
      description: dest.description,
      image: dest.image,
      itinerary: {
        '@type': 'ItemList',
        name: `Itinerario ${dest.nights} noches en ${dest.name}`,
        numberOfItems: dest.nights,
      },
      offers: {
        '@type': 'Offer',
        price: dest.priceFrom,
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'TravelAgency',
          name: 'AMCABI Turismo',
          identifier: 'EVT-14703',
        },
      },
      provider: {
        '@type': 'TravelAgency',
        name: 'AMCABI Turismo',
        url: 'https://amcabiturismo.com.ar',
      },
    })),
  }

  return (
    <section
      id="destinos"
      className="py-20 lg:py-28 bg-page"
      aria-labelledby="destinos-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchemasGraph) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
        <div className="text-center mb-14">
          <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
            Nuestros destinos
          </p>
          <h2
            id="destinos-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-ink mb-4"
          >
            Paquetes turísticos en Argentina
          </h2>
          <p className="font-body text-ink-muted text-lg max-w-2xl mx-auto">
            Precios desde por persona en base doble. Consultanos para armar el paquete ideal según
            tus fechas y presupuesto.
          </p>
        </div>
        </ScrollReveal>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => {
            const waText = `Hola! Me interesa el paquete a ${dest.name} desde ${formatPrice(dest.priceFrom)}. ¿Tienen disponibilidad?`
            const waUrl = `https://wa.me/5491162203682?text=${encodeURIComponent(waText)}`
            const detailUrl = `/destinos/${dest.slug}`

            return (
              <ScrollReveal key={dest.slug} delay={i * 80} className="h-full">
              <article
                className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface border border-border hover:border-pink/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink/8 card-3d"
                aria-label={`Paquete turístico a ${dest.name}, ${dest.province}`}
              >
                {/* Image */}
                <Link href={detailUrl} className="relative h-52 overflow-hidden shrink-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-inset" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={dest.image}
                    alt={dest.imageAlt}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-white rounded-full px-2.5 py-1">
                    <span className="font-body text-ink text-xs font-semibold">
                      {dest.nights} noches
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-pink rounded-full px-2.5 py-1">
                    <span className="font-body text-white text-xs font-bold">
                      desde {formatPrice(dest.priceFrom)}
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="mb-3">
                    <Link href={detailUrl} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink rounded">
                      <h3 className="font-display text-xl font-bold text-ink hover:text-pink transition-colors duration-150 mb-0.5">
                        {dest.name}
                      </h3>
                    </Link>
                    <p className="font-body text-ink-faint text-xs flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-pink"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {dest.province}
                    </p>
                  </div>

                  <p className="font-body text-ink-muted text-sm leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  <ul
                    className="space-y-1.5 mb-4 flex-1"
                    aria-label={`Qué incluye el paquete a ${dest.name}`}
                  >
                    {dest.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-ink-muted font-body text-xs">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between py-3 border-t border-border mb-4">
                    <span className="font-body text-ink-faint text-xs">Mejor época:</span>
                    <span className="font-body text-pink text-xs font-semibold">{dest.bestMonth}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={detailUrl}
                      className="flex-1 flex items-center justify-center gap-1 bg-transparent hover:bg-pink/10 border border-pink/20 hover:border-pink/50 text-pink px-3 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200"
                      aria-label={`Ver detalle del paquete a ${dest.name}`}
                    >
                      Ver paquete
                    </Link>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark border border-pink text-white px-3 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200"
                      aria-label={`Consultar precio del paquete a ${dest.name} por WhatsApp`}
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Consultar
                    </a>
                  </div>
                </div>
              </article>
              </ScrollReveal>
            )
          })}
        </div>

        {/* More destinations CTA */}
        <div className="text-center mt-12 p-8 rounded-2xl border border-border bg-page-soft">
          <p className="font-display text-xl font-black text-ink mb-2">
            ¿No encontrás tu destino?
          </p>
          <p className="font-body text-ink-muted text-sm mb-6">
            Tenemos más de 35 destinos nacionales disponibles. Escribinos y armamos el viaje ideal
            para vos.
          </p>
          <a
            href={`https://wa.me/5491162203682?text=${encodeURIComponent('Hola! Quisiera conocer todos los destinos disponibles y sus precios.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-pink/20"
            aria-label="Consultar todos los destinos turísticos disponibles por WhatsApp"
          >
            Ver todos los destinos disponibles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
