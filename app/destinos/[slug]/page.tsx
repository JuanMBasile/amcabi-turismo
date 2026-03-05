import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDestinationBySlug, getDestinationSlugs } from '@/sanity/lib/fetchers'
import ImageGallery from './ImageGallery'

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const dest = await getDestinationBySlug(slug)
  if (!dest) return {}

  return {
    title: `Paquete a ${dest.name} | AMCABI Turismo`,
    description: `Paquete turístico a ${dest.name}, ${dest.province}. Desde ${priceFormatter.format(dest.priceFrom)} por persona. ${dest.nights} noches. Incluye ${dest.includes.slice(0, 2).join(' y ')}. Consultá disponibilidad.`,
    alternates: {
      canonical: `https://amcabiturismo.com.ar/destinos/${dest.slug}`,
    },
    openGraph: {
      title: `Paquete a ${dest.name} | AMCABI Turismo`,
      description: dest.description,
      url: `https://amcabiturismo.com.ar/destinos/${dest.slug}`,
      images: [{ url: dest.image, alt: dest.imageAlt }],
    },
  }
}

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default async function DestinoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dest = await getDestinationBySlug(slug)
  if (!dest) notFound()

  const waText = `Hola! Me interesa el paquete a ${dest.name} desde ${priceFormatter.format(dest.priceFrom)}. ¿Tienen disponibilidad?`
  const waUrl = `https://wa.me/5491162203682?text=${encodeURIComponent(waText)}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://amcabiturismo.com.ar',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Destinos',
        item: 'https://amcabiturismo.com.ar/#destinos',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: dest.name,
        item: `https://amcabiturismo.com.ar/destinos/${dest.slug}`,
      },
    ],
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `https://amcabiturismo.com.ar/destinos/${dest.slug}`,
    name: `Paquete turístico a ${dest.name}, ${dest.province}`,
    description: dest.longDescription,
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
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        @keyframes _fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes _fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .du-fade-up   { animation: _fadeUp 0.55s ease-out forwards; opacity: 0; }
        .du-fade-in   { animation: _fadeIn 0.7s ease-out forwards;  opacity: 0; }
        .du-d1  { animation-delay: 0.05s; }
        .du-d2  { animation-delay: 0.15s; }
        .du-d3  { animation-delay: 0.25s; }
        .du-d4  { animation-delay: 0.4s;  }
        .du-d5  { animation-delay: 0.5s;  }
        .inc-item { opacity: 0; animation: _fadeUp 0.4s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-page">

        {/* ── HERO ─────────────────────────────────────── */}
        <div className="relative h-[72vh] min-h-[480px] max-h-[700px]">
          <Image
            src={dest.image}
            alt={dest.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          {/* layered gradient: subtle top, heavy bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10" />

          {/* Back */}
          <div className="absolute top-6 left-4 sm:left-8 lg:left-14 du-fade-in">
            <Link
              href="/#destinos"
              className="inline-flex items-center gap-2 font-body text-sm text-white/80 hover:text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/20"
              aria-label="Volver al listado de destinos"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </Link>
          </div>

          {/* Hero text */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-14 pb-20">
            <div className="max-w-5xl">
              {/* Province tag with flanking lines */}
              <div className="du-fade-up du-d1 flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-pink" />
                <p className="font-body text-pink-light text-xs font-semibold tracking-[0.22em] uppercase">
                  {dest.province}
                </p>
              </div>
              {/* Destination name */}
              <h1
                className="du-fade-up du-d2 font-display font-bold text-white leading-[0.9]"
                style={{ fontSize: 'clamp(2.8rem, 9vw, 6rem)', textShadow: '0 2px 32px rgba(0,0,0,0.4)' }}
              >
                {dest.name}
              </h1>
            </div>
          </div>
        </div>

        {/* ── FLOATING PRICE STRIP ────────────────────── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-14 -mt-7">
          <div className="du-fade-up du-d3 bg-white rounded-2xl shadow-xl shadow-ink/10 border border-border px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Price */}
            <div>
              <p className="font-body text-ink-faint text-[10px] uppercase tracking-widest mb-0.5">Precio desde</p>
              <p className="font-display font-bold text-pink" style={{ fontSize: '2rem', lineHeight: 1 }}>
                {priceFormatter.format(dest.priceFrom)}
              </p>
              <p className="font-body text-ink-faint text-[11px] mt-0.5">por persona · base doble</p>
            </div>

            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="font-body text-ink-faint text-[10px] uppercase tracking-widest mb-1">Duración</p>
              <p className="font-body text-ink font-semibold">{dest.nights} noches</p>
            </div>

            {dest.bestMonth && (
              <>
                <div className="hidden sm:block w-px h-10 bg-border" />
                <div>
                  <p className="font-body text-ink-faint text-[10px] uppercase tracking-widest mb-1">Mejor época</p>
                  <p className="font-body text-ink font-semibold">{dest.bestMonth}</p>
                </div>
              </>
            )}

            {/* Quick WA button */}
            <div className="sm:ml-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-md shadow-green-900/20"
                aria-label={`Consultar precio del paquete a ${dest.name} por WhatsApp`}
              >
                {WA_ICON}
                Consultar precio
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14 pt-12 pb-16">
          <div className="lg:grid lg:grid-cols-[1fr_300px] gap-14 items-start">

            {/* ── LEFT ── */}
            <div>
              {/* Description */}
              <section className="du-fade-up du-d4 mb-12">
                <h2 className="font-display font-bold text-ink text-2xl mb-5 flex items-center gap-3">
                  <span className="w-5 h-0.5 bg-pink inline-block shrink-0" />
                  Sobre este destino
                </h2>
                <p className="font-body text-ink-muted text-base leading-[1.9]">
                  {dest.longDescription}
                </p>
              </section>

              {/* Gallery */}
              {dest.gallery && dest.gallery.length > 0 && (
                <section className="du-fade-up du-d5 mb-12">
                  <h2 className="font-display font-bold text-ink text-2xl mb-6 flex items-center gap-3">
                    <span className="w-5 h-0.5 bg-pink inline-block shrink-0" />
                    Fotos del destino
                  </h2>
                  <ImageGallery images={dest.gallery} />
                </section>
              )}

              {/* Includes */}
              <section className="du-fade-up du-d5">
                <h2 className="font-display font-bold text-ink text-2xl mb-6 flex items-center gap-3">
                  <span className="w-5 h-0.5 bg-pink inline-block shrink-0" />
                  ¿Qué incluye el paquete?
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dest.includes.map((item, i) => (
                    <li
                      key={item}
                      className="inc-item flex items-start gap-3 rounded-xl px-4 py-3.5 bg-page-soft border border-border"
                      style={{ animationDelay: `${0.5 + i * 0.055}s` }}
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-pink flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="font-body text-ink-muted text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Hotel */}
              {dest.hotelName && (
                <section className="mt-12">
                  <h2 className="font-display font-bold text-ink text-2xl mb-5 flex items-center gap-3">
                    <span className="w-5 h-0.5 bg-pink inline-block shrink-0" />
                    El hotel
                  </h2>
                  <div className="bg-page-soft border border-border rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-pink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h3 className="font-display font-bold text-ink text-lg">{dest.hotelName}</h3>
                    </div>
                    {dest.hotelDescription && (
                      <p className="font-body text-ink-muted text-sm leading-relaxed">
                        {dest.hotelDescription}
                      </p>
                    )}
                  </div>
                  {dest.hotelGallery && dest.hotelGallery.length > 0 && (
                    <ImageGallery images={dest.hotelGallery} />
                  )}
                </section>
              )}
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <aside className="mt-10 lg:mt-0">
              <div className="lg:sticky lg:top-8 space-y-3">

                {/* Price summary card */}
                <div className="bg-page-soft border border-border rounded-2xl p-6">
                  <p className="font-body text-ink-faint text-[10px] uppercase tracking-widest mb-1">Precio por persona</p>
                  <p className="font-display font-bold text-pink mb-0.5" style={{ fontSize: '2.25rem', lineHeight: 1 }}>
                    {priceFormatter.format(dest.priceFrom)}
                  </p>
                  <p className="font-body text-ink-faint text-xs mb-6">en base doble · sujeto a disponibilidad</p>

                  <div className="space-y-3 border-t border-border pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-ink-faint text-sm">Duración</span>
                      <span className="font-body text-ink font-semibold text-sm">{dest.nights} noches</span>
                    </div>
                    {dest.bestMonth && (
                      <div className="flex items-center justify-between">
                        <span className="font-body text-ink-faint text-sm">Mejor época</span>
                        <span className="font-body text-ink font-semibold text-sm">{dest.bestMonth}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-body text-ink-faint text-sm">Región</span>
                      <span className="font-body text-ink font-semibold text-sm">{dest.province}</span>
                    </div>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white font-body font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-pink/25 hover:-translate-y-0.5"
                    aria-label={`Consultar disponibilidad del paquete a ${dest.name} por WhatsApp`}
                  >
                    {WA_ICON}
                    Consultar disponibilidad
                  </a>
                </div>

                {/* Trust badge */}
                <div className="bg-page-soft border border-border rounded-xl px-4 py-3.5 flex items-start gap-3">
                  <svg className="w-5 h-5 text-pink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-body text-ink text-xs font-semibold">Agencia habilitada</p>
                    <p className="font-body text-ink-faint text-[11px] leading-snug">EVT Nº 14703 · Ministerio de Turismo de la Nación</p>
                  </div>
                </div>

                {/* Contact alt */}
                <div className="bg-page-soft border border-border rounded-xl px-4 py-3.5 flex items-start gap-3">
                  <svg className="w-5 h-5 text-pink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-body text-ink text-xs font-semibold">También por teléfono</p>
                    <p className="font-body text-ink-faint text-[11px] leading-snug">Lunes a viernes · 9 a 18 hs</p>
                  </div>
                </div>

              </div>
            </aside>
          </div>

          {/* ── BOTTOM CTA ──────────────────────────── */}
          <div className="mt-14 relative overflow-hidden rounded-2xl bg-ink px-8 py-14 text-center">
            {/* Glow blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-pink/20 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-pink/10 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-10 h-px bg-pink/60" />
                <p className="font-body text-pink-light text-xs font-semibold tracking-[0.22em] uppercase">Listo para viajar</p>
                <span className="w-10 h-px bg-pink/60" />
              </div>
              <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
                ¿Reservamos tu lugar en {dest.name}?
              </h2>
              <p className="font-body text-white/55 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Escribinos por WhatsApp y te enviamos disponibilidad, fechas salida y formas de pago sin compromiso.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-pink hover:bg-pink-dark text-white font-body font-bold text-sm px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-pink/30"
                aria-label={`Reservar paquete a ${dest.name} por WhatsApp`}
              >
                {WA_ICON}
                Consultar disponibilidad
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
