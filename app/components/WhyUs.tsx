import ScrollReveal from './ScrollReveal'

const BENEFITS = [
  {
    title: 'Todo incluido',
    description: 'Vuelo, hotel, traslados y seguro de viaje en un único precio sin sorpresas.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    title: 'Hasta 18 cuotas',
    description: 'Financiación con las principales tarjetas. Visa, Mastercard, Naranja y más.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Asesor dedicado',
    description: 'Un asesor te acompaña desde la cotización hasta que volvés a casa.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Mejor precio',
    description: 'Negociamos directo con aerolíneas y hoteles para que pagues menos.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

export default function WhyUs() {
  return (
    <section
      id="por-que-nosotros"
      className="py-16 lg:py-24 bg-page"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal>
        <div className="text-center mb-12">
          <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
            ¿Por qué elegirnos?
          </p>
          <h2
            id="why-us-heading"
            className="font-display text-3xl md:text-4xl font-black text-ink"
          >
            Tu viaje, nuestra <span className="text-pink">pasión</span>
          </h2>
        </div>
        </ScrollReveal>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {BENEFITS.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 90}>
            <div
              className="group bg-page border border-border hover:border-pink/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:shadow-pink/5 hover:-translate-y-1 card-3d"
            >
              <div className="w-9 h-9 rounded-xl bg-pink/10 group-hover:bg-pink/15 flex items-center justify-center mb-4 text-pink transition-all duration-200 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="font-body font-bold text-ink text-sm mb-1.5">{benefit.title}</h3>
              <p className="font-body text-ink-faint text-xs leading-relaxed">{benefit.description}</p>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats strip */}
        <ScrollReveal delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { value: '+500', label: 'Viajeros satisfechos' },
            { value: '+35',  label: 'Destinos disponibles' },
            { value: '10+',  label: 'Años de experiencia' },
            { value: '18',   label: 'Cuotas sin interés' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-page text-center py-8 px-4">
              <p className="font-display text-3xl md:text-4xl font-black text-pink mb-1">{value}</p>
              <p className="font-body text-ink-faint text-sm">{label}</p>
            </div>
          ))}
        </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
