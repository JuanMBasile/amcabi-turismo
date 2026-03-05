import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import VoucherLookupForm from '../components/VoucherLookupForm'

export const metadata: Metadata = {
  title: 'Consultá tu Voucher',
  description:
    'Ingresá tu código de reserva para acceder al voucher digital de tu paquete turístico con AMCABI Turismo.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/consulta-voucher' },
  robots: { index: false },
}

const WA_URL =
  'https://wa.me/5491162203682?text=Hola!%20Quisiera%20consultar%20el%20voucher%20de%20mi%20reserva.'

const STEPS = [
  {
    num: '01',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Recibí tu código',
    body: 'Al confirmar el pago completo de tu paquete, nuestro equipo te envía el código de reserva por email y WhatsApp dentro de las 48 hs hábiles.',
  },
  {
    num: '02',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    title: 'Ingresá el código',
    body: 'Copiá o escribí el código en el campo de búsqueda y hacé click en "Consultar voucher". Es rápido y no requiere contraseña.',
  },
  {
    num: '03',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Accedé a tu voucher',
    body: 'Visualizás el detalle completo de tu paquete: datos del pasajero, destino, fechas, hotel, servicios incluidos y toda la información para tu viaje.',
  },
]

const FAQ_ITEMS = [
  {
    q: '¿Qué es un voucher de viaje?',
    a: 'Es el comprobante oficial que acredita el pago y los servicios turísticos contratados. Lo presentás al hotel y a los proveedores del paquete durante tu viaje.',
  },
  {
    q: '¿Cuándo recibo mi voucher?',
    a: 'Lo emitimos dentro de las 48 hs hábiles de confirmar el pago completo del paquete. Te avisamos por WhatsApp y email cuando esté listo.',
  },
  {
    q: '¿Qué datos incluye el voucher?',
    a: 'Nombre del pasajero, destino, fechas de entrada y salida, nombre del hotel, habitación, régimen de comidas, servicios incluidos y contactos de emergencia.',
  },
]

export default function ConsultaVoucherPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-mesh-animated pt-24 pb-16 lg:pt-32 lg:pb-20"
          aria-labelledby="cv-heading"
        >
          {/* Glow top-right — yellow tint, diferente a consulta-reserva */}
          <div
            className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.12) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.1) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-polkadot-dense opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

              {/* ── Left ── */}
              <div>
                <div className="reveal-fade inline-flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse shrink-0" aria-hidden="true" />
                  <span className="font-body text-white/65 text-xs font-semibold tracking-[0.18em] uppercase">
                    Vouchers de viaje
                  </span>
                </div>

                <h1
                  id="cv-heading"
                  className="reveal-up delay-150 font-display font-black text-white leading-[0.92] mb-6"
                  style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)' }}
                >
                  Tu voucher,<br />
                  cuando lo<br />
                  <span className="text-yellow">necesitás.</span>
                </h1>

                <p className="reveal-up delay-300 font-body text-white/55 text-lg max-w-md leading-relaxed mb-8">
                  Ingresá tu código de reserva para acceder al voucher digital
                  de tu paquete con todos los detalles del viaje.
                </p>

                <div className="reveal-up delay-450 flex flex-wrap gap-2" aria-hidden="true">
                  {['🎫 Voucher digital', '✈ Detalles de vuelo', '🏨 Confirmación de hotel'].map((chip) => (
                    <span key={chip} className="travel-chip text-[11px]">{chip}</span>
                  ))}
                </div>
              </div>

              {/* ── Right: form card ── */}
              <div className="reveal-up delay-300">
                <div className="relative">
                  {/* Yellow glow behind card */}
                  <div
                    className="absolute -inset-4 rounded-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,208,0,0.1) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />

                  <div className="glass-card rounded-2xl p-7 md:p-9">
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
                      <div className="w-10 h-10 rounded-xl bg-yellow flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-display font-black text-ink text-base">Consultá tu Voucher</p>
                        <p className="font-body text-ink-faint text-xs">AMCABI Turismo · Legajo EVT 14703</p>
                      </div>
                    </div>

                    <VoucherLookupForm />

                    <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                      <p className="font-body text-ink-faint text-xs flex-1 leading-relaxed">
                        ¿No tenés el código?
                      </p>
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-body text-pink hover:text-pink-dark transition-colors shrink-0"
                        aria-label="Consultar por WhatsApp"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Escribinos
                      </a>
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
            CÓMO FUNCIONA
        ══════════════════════════════════════════ */}
        <section
          className="py-16 lg:py-24 bg-page"
          aria-labelledby="como-funciona-v-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  Guía rápida
                </p>
                <h2
                  id="como-funciona-v-heading"
                  className="font-display text-3xl md:text-4xl font-black text-ink"
                >
                  ¿Cómo accedo a mi <span className="text-yellow">voucher</span>?
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 100} className={`stagger-${i + 1}`}>
                  <div className="group relative bg-page border border-border hover:border-yellow/40 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-yellow/8 hover:-translate-y-1 card-3d text-center">
                    <div className="w-14 h-14 rounded-2xl bg-yellow/10 group-hover:bg-yellow/18 flex items-center justify-center text-yellow mx-auto mb-5 transition-colors duration-200">
                      {step.icon}
                    </div>
                    <span
                      className="font-display font-black text-5xl text-ink/5 group-hover:text-yellow/10 absolute top-5 right-6 leading-none select-none transition-colors duration-300"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                    <h3 className="font-display font-black text-ink text-lg mb-2">{step.title}</h3>
                    <p className="font-body text-ink-muted text-sm leading-relaxed">{step.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ — vouchers
        ══════════════════════════════════════════ */}
        <section
          className="py-16 bg-surface-alt bg-polkadot"
          aria-labelledby="faq-vouchers-heading"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
                  Preguntas frecuentes
                </p>
                <h2
                  id="faq-vouchers-heading"
                  className="font-display text-2xl md:text-3xl font-black text-ink"
                >
                  Sobre los <span className="text-yellow">vouchers</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <ScrollReveal key={item.q} delay={i * 80}>
                  <div className="bg-page border border-border rounded-2xl p-5 md:p-6 card-3d hover:border-yellow/30 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-ink" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-body font-bold text-ink text-sm mb-1.5">{item.q}</h3>
                        <p className="font-body text-ink-muted text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA — contacto
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-mesh-animated py-16 lg:py-20"
          aria-labelledby="cv-cta-heading"
        >
          <div className="absolute inset-0 bg-polkadot-dense opacity-25 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.1) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="font-body text-yellow text-sm font-bold tracking-widest uppercase mb-3">
                    ¿Necesitás ayuda?
                  </p>
                  <h2
                    id="cv-cta-heading"
                    className="font-display font-black text-white text-3xl md:text-4xl leading-tight mb-4"
                  >
                    ¿No encontrás<br />
                    tu <span className="text-yellow">voucher</span>?
                  </h2>
                  <p className="font-body text-white/50 text-sm leading-relaxed">
                    Lunes a Viernes · 10:00 a 17:00 hs<br />
                    Respondemos por WhatsApp fuera de horario.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-white/8 hover:bg-white/12 border border-white/12 hover:border-yellow/40 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="Consultar voucher por WhatsApp"
                  >
                    <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-bold text-white text-sm">WhatsApp</p>
                      <p className="font-body text-white/45 text-xs">11 6220-3682 · 11 2383-6286</p>
                    </div>
                    <svg className="w-4 h-4 text-white/25 group-hover:text-yellow ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="mailto:info@amcabiturismo.com.ar"
                    className="group flex items-center gap-4 bg-white/8 hover:bg-white/12 border border-white/12 hover:border-yellow/40 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="Enviar email para consultar voucher"
                  >
                    <div className="w-11 h-11 rounded-xl bg-pink/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-bold text-white text-sm">Email</p>
                      <p className="font-body text-white/45 text-xs">info@amcabiturismo.com.ar</p>
                    </div>
                    <svg className="w-4 h-4 text-white/25 group-hover:text-yellow ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="tel:+541152362030"
                    className="group flex items-center gap-4 bg-white/8 hover:bg-white/12 border border-white/12 hover:border-yellow/40 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="Llamar al 11 5236-2030"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-bold text-white text-sm">Teléfono</p>
                      <p className="font-body text-white/45 text-xs">11 5236-2030</p>
                    </div>
                    <svg className="w-4 h-4 text-white/25 group-hover:text-yellow ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
