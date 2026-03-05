import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQItem from '../components/FAQItem'
import ScrollReveal from '../components/ScrollReveal'
import { getFAQs } from '@/sanity/lib/fetchers'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes – AMCABI Turismo',
  description:
    'Respondemos tus dudas sobre habitaciones, precios, financiación, servicios incluidos y cómo reservar con AMCABI Turismo.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/preguntas-frecuentes' },
  openGraph: {
    title: 'Preguntas Frecuentes | AMCABI Turismo',
    description:
      'Respondemos tus dudas sobre habitaciones, precios, financiación, servicios incluidos y cómo reservar.',
    url: 'https://amcabiturismo.com.ar/preguntas-frecuentes',
  },
}

const WA_BASE = 'https://wa.me/5491162203682'
const WA_URL  = `${WA_BASE}?text=${encodeURIComponent('Hola! Tengo una consulta sobre sus paquetes turísticos.')}`

/* ─── Category metadata ──────────────────────────────── */

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode }> = {
  reservas: {
    label: 'Reservas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  pagos: {
    label: 'Pagos y financiación',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  transporte: {
    label: 'Transporte',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  documentacion: {
    label: 'Documentación',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  cancelaciones: {
    label: 'Cancelaciones y cambios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  general: {
    label: 'General',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
}

const DEFAULT_CATEGORY_META = CATEGORY_META.general

/* ─── PAGE ───────────────────────────────────────────────── */

export default async function PreguntasFrecuentesPage() {
  const faqs = await getFAQs()

  // Group FAQs by category, preserving order
  const grouped = new Map<string, { question: string; answer: string }[]>()
  for (const faq of faqs) {
    const cat = faq.category ?? 'general'
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push({ question: faq.question, answer: faq.answer })
  }

  const categories = Array.from(grouped.entries()).map(([id, items]) => ({
    id,
    ...(CATEGORY_META[id] ?? DEFAULT_CATEGORY_META),
    items,
  }))

  // JSON-LD schema.org
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main-content" className="min-h-screen bg-page pt-16">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative bg-mesh-animated overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left copy */}
              <div>
                <div className="inline-flex items-center gap-2 bg-pink/15 text-pink px-4 py-1.5 rounded-full font-body font-bold text-xs uppercase tracking-widest mb-6">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Preguntas frecuentes
                </div>

                <h1 className="font-display font-black text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  Tus preguntas,<br />
                  <span className="text-pink">nuestras respuestas.</span>
                </h1>

                <p className="font-body text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                  Reunimos las consultas más frecuentes de nuestros viajeros para que tengas toda la información antes de reservar. Si no encontrás lo que buscás, escribinos.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-6 py-3.5 rounded-full font-body font-black text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-pink/30"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                  <Link
                    href="/#destinos"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-6 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                  >
                    Ver destinos
                  </Link>
                </div>
              </div>

              {/* Right — floating stat cards */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-72 h-72">

                  {/* Card 1 — top left */}
                  <div className="absolute -top-2 -left-4 card-float-a bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-48">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-pink/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-display font-black text-ink text-lg leading-none">14 años</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">de experiencia en turismo</p>
                  </div>

                  {/* Card 2 — center right */}
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 card-float-b bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-44">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-yellow/15 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <p className="font-display font-black text-ink text-sm leading-tight">EVT · 14703</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">agencia habilitada</p>
                  </div>

                  {/* Card 3 — bottom left */}
                  <div className="absolute -bottom-4 left-4 card-float-c bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-48">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-light/20 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="font-display font-black text-ink text-sm leading-tight">{'< 1 hora'}</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">tiempo de respuesta</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ CATEGORIES ────────────────────────────────── */}
        <section className="bg-page bg-polkadot py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal>
              <div className="text-center mb-14 reveal-on-scroll reveal-up">
                <h2 className="font-display font-black text-ink text-3xl sm:text-4xl mb-4">
                  Todo lo que necesitás<br />
                  <span className="text-pink">saber antes de viajar.</span>
                </h2>
                <p className="font-body text-ink-muted text-base leading-relaxed max-w-xl mx-auto">
                  Organizamos las preguntas por categoría para que encuentres lo que buscás en segundos.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-10">
              {categories.map((category, catIdx) => (
                <ScrollReveal key={category.id}>
                  <div className={`reveal-on-scroll reveal-up delay-${(catIdx % 3) * 100}`}>
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-pink/10 text-pink flex items-center justify-center shrink-0">
                        {category.icon}
                      </div>
                      <h3 className="font-display font-black text-ink text-lg">
                        {category.label}
                      </h3>
                    </div>

                    {/* Accordion items */}
                    <div className="space-y-2.5 pl-12">
                      {category.items.map((item) => (
                        <FAQItem
                          key={item.question}
                          question={item.question}
                          answer={item.answer}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-mesh-animated py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <p className="font-body text-white/50 text-xs uppercase tracking-widest mb-4">¿Seguís con dudas?</p>

            <h2
              className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
              style={{ textShadow: '0 0 60px rgba(233,30,140,0.35)' }}
            >
              ¿No encontrás lo que<br />
              <span className="text-pink">estás buscando?</span>
            </h2>

            <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Nuestro equipo responde en menos de una hora de lunes a viernes de 10:00 a 17:00 hs.
              Escribinos y te ayudamos a planificar tu viaje ideal.
            </p>

            {/* Contact cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {/* WhatsApp */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-pink/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-pink/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-pink" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-pink transition-colors">WhatsApp</p>
                <p className="font-body text-white/50 text-xs">11 6220-3682</p>
              </a>

              {/* Email */}
              <a
                href="mailto:info@amcabiturismo.com.ar"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-pink/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-pink/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-pink transition-colors">Email</p>
                <p className="font-body text-white/50 text-xs">info@amcabiturismo.com.ar</p>
              </a>

              {/* Teléfono */}
              <a
                href="tel:+5491162203682"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-pink/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-pink/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-pink transition-colors">Teléfono</p>
                <p className="font-body text-white/50 text-xs">11 6220-3682</p>
              </a>
            </div>

            <p className="font-body text-white/30 text-xs">
              AMCABI TURISMO EVT — Legajo N° 14703 — Disposición 307/11
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
