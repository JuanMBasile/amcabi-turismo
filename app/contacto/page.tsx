import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import ScrollReveal from '../components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contacto – AMCABI Turismo',
  description:
    'Contactate con AMCABI Turismo por WhatsApp, teléfono o email. Respondemos en menos de 1 hora de lunes a viernes de 10:00 a 17:00 hs.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/contacto' },
  openGraph: {
    title: 'Contacto | AMCABI Turismo',
    description:
      'Contactate con AMCABI Turismo por WhatsApp, teléfono o email. Respondemos en menos de 1 hora.',
    url: 'https://amcabiturismo.com.ar/contacto',
  },
}

const WA_URL  = 'https://wa.me/5491162203682?text=' + encodeURIComponent('Hola! Me interesa conocer los paquetes disponibles.')
const WA_URL2 = 'https://wa.me/5491123836286?text=' + encodeURIComponent('Hola! Me interesa conocer los paquetes disponibles.')

/* ─── Google Maps embed URL (no API key required) ───────── */
const MAPS_EMBED =
  'https://maps.google.com/maps?q=Arbono+799,+Escobar,+Buenos+Aires,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed'

/* ─── CONTACT CARDS DATA ─────────────────────────────────── */

const CONTACT_CARDS = [
  {
    id: 'wa1',
    label: 'WhatsApp principal',
    value: '11 6220-3682',
    href: WA_URL,
    external: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    sub: 'Respuesta inmediata',
  },
  {
    id: 'wa2',
    label: 'WhatsApp alternativo',
    value: '11 2383-6286',
    href: WA_URL2,
    external: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    sub: 'Consultas y preventas',
  },
  {
    id: 'tel',
    label: 'Teléfono',
    value: '11 5236-2030',
    href: 'tel:+541152362030',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    sub: 'Lun–Vie 10:00–17:00',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'info@amcabiturismo.com.ar',
    href: 'mailto:info@amcabiturismo.com.ar',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    sub: 'Respuesta en el día',
  },
]

/* ─── PAGE ───────────────────────────────────────────────── */

export default function ContactoPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-page pt-16">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative bg-mesh-animated overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left copy */}
              <div>
                <div className="inline-flex items-center gap-2 bg-cyan/15 text-cyan px-4 py-1.5 rounded-full font-body font-bold text-xs uppercase tracking-widest mb-6">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contacto
                </div>

                <h1 className="font-display font-black text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  Hablemos de<br />
                  <span className="text-cyan">tu próximo viaje.</span>
                </h1>

                <p className="font-body text-white/70 text-lg leading-relaxed mb-3 max-w-xl">
                  Respondemos en menos de una hora por WhatsApp. Si preferís, también podés escribirnos por email o llamarnos directamente.
                </p>
                <p className="font-body text-white/45 text-sm mb-8">
                  Atención: lunes a viernes de 10:00 a 17:00 hs.
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
                    Escribir por WhatsApp
                  </a>
                  <a
                    href="mailto:info@amcabiturismo.com.ar"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-cyan/40 text-white/80 hover:text-white px-6 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-white/5"
                  >
                    Enviar un email
                  </a>
                </div>
              </div>

              {/* Right — floating cards */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-72 h-72">

                  {/* Card 1 */}
                  <div className="absolute -top-2 -left-4 card-float-a bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-52">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
                      <p className="font-body font-bold text-ink text-sm">En línea · WhatsApp</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">Respuesta en menos de 1 hora</p>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 card-float-b bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-44">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-display font-black text-ink text-xs leading-tight">Lun–Vie<br />10:00–17:00</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">horario de atención</p>
                  </div>

                  {/* Card 3 */}
                  <div className="absolute -bottom-4 left-4 card-float-c bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20 w-48">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-pink/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="font-display font-black text-ink text-sm leading-tight">Escobar<br />Buenos Aires</p>
                    </div>
                    <p className="font-body text-ink-muted text-xs">Argentina</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO + MAPA ───────────────────────────────────── */}
        <section className="bg-page bg-polkadot py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal>
              <h2 className="font-display font-black text-ink text-2xl sm:text-3xl mb-10 reveal-on-scroll reveal-up">
                Cómo <span className="text-cyan">contactarnos</span>
              </h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 items-start">

              {/* Contact cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {CONTACT_CARDS.map((card, i) => (
                  <ScrollReveal key={card.id}>
                    <a
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noopener noreferrer' : undefined}
                      className={`reveal-on-scroll reveal-up stagger-${i + 1} group card-3d bg-page border border-border hover:border-cyan/40 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-xl hover:shadow-cyan/5`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center shrink-0 group-hover:bg-cyan/20 transition-colors">
                        {card.icon}
                      </div>
                      <div>
                        <p className="font-body text-ink-faint text-[11px] uppercase tracking-widest mb-0.5">
                          {card.label}
                        </p>
                        <p className="font-body font-bold text-ink text-sm group-hover:text-cyan transition-colors break-all">
                          {card.value}
                        </p>
                        <p className="font-body text-ink-muted text-xs mt-0.5">{card.sub}</p>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}

                {/* Address card (full width) */}
                <ScrollReveal>
                  <div className="reveal-on-scroll reveal-up stagger-5 sm:col-span-2 card-3d bg-page border border-border hover:border-cyan/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:shadow-xl hover:shadow-cyan/5">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-ink-faint text-[11px] uppercase tracking-widest mb-0.5">Dirección</p>
                      <p className="font-body font-bold text-ink text-sm">Arbono 799, Escobar</p>
                      <p className="font-body text-ink-muted text-xs mt-0.5">Buenos Aires, Argentina · Solo atención a proveedores</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Google Maps iframe */}
              <ScrollReveal>
                <div className="reveal-on-scroll reveal-fade delay-300 rounded-2xl overflow-hidden border border-border shadow-xl shadow-ink/5 h-[420px]">
                  <iframe
                    title="Ubicación AMCABI Turismo — Arbono 799, Escobar, Buenos Aires"
                    src={MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── FORMULARIO ───────────────────────────────────── */}
        <section className="bg-surface-alt py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal>
              <div className="mb-10 reveal-on-scroll reveal-up">
                <div className="inline-flex items-center gap-2 bg-pink/10 text-pink px-3 py-1 rounded-full font-body font-bold text-xs uppercase tracking-widest mb-4">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Formulario de contacto
                </div>
                <h2 className="font-display font-black text-ink text-2xl sm:text-3xl mb-3">
                  Escribinos directamente
                </h2>
                <p className="font-body text-ink-muted text-base leading-relaxed">
                  Completá el formulario y tu mensaje llega directo a nuestro WhatsApp. Te respondemos a la brevedad.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="reveal-on-scroll reveal-up delay-150 bg-page border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-mesh-animated py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <p className="font-body text-white/50 text-xs uppercase tracking-widest mb-4">Canal directo</p>

            <h2
              className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
              style={{ textShadow: '0 0 60px rgba(34,211,238,0.30)' }}
            >
              ¿Preferís<br />
              <span className="text-cyan">llamarnos?</span>
            </h2>

            <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Atendemos de lunes a viernes de 10:00 a 17:00 hs. También podés escribirnos fuera de horario y te respondemos al día siguiente.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* WhatsApp */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-cyan/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-cyan" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-cyan transition-colors">WhatsApp</p>
                <p className="font-body text-white/50 text-xs">11 6220-3682</p>
              </a>

              {/* Teléfono */}
              <a
                href="tel:+541152362030"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-cyan/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-cyan transition-colors">Teléfono</p>
                <p className="font-body text-white/50 text-xs">11 5236-2030</p>
              </a>

              {/* Email */}
              <a
                href="mailto:info@amcabiturismo.com.ar"
                className="group bg-white/8 hover:bg-white/14 border border-white/10 hover:border-cyan/30 rounded-2xl p-5 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan/15 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-body font-bold text-white text-sm mb-0.5 group-hover:text-cyan transition-colors">Email</p>
                <p className="font-body text-white/50 text-xs break-all">info@amcabiturismo.com.ar</p>
              </a>
            </div>

            <p className="font-body text-white/25 text-xs mt-10">
              AMCABI TURISMO EVT — Legajo N° 14703 — Disposición 307/11
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
