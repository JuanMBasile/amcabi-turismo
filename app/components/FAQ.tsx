// Server Component — no 'use client' needed here.
// Only FAQItem (the interactive accordion) is a Client Component.
import FAQItem from './FAQItem'
import ScrollReveal from './ScrollReveal'

interface FAQEntry {
  question: string
  answer: string
}

const faqs: FAQEntry[] = [
  {
    question: '¿Cuánto sale un paquete a Bariloche?',
    answer:
      'Los paquetes a Bariloche tienen un precio desde $180.000 por persona en base doble (compartiendo habitación). El precio incluye vuelo ida y vuelta desde Buenos Aires, hotel 3 estrellas con desayuno, traslados desde/hacia el aeropuerto y seguro de viaje. Los precios varían según la temporada y la aerolínea. Consultanos por WhatsApp al 11 6220 3682 para cotizaciones actualizadas.',
  },
  {
    question: '¿Qué incluye el paquete turístico?',
    answer:
      'Nuestros paquetes incluyen: vuelo o transporte ida y vuelta, alojamiento en hotel o apart, traslados aeropuerto/terminal, y seguro de asistencia al viajero. Según el destino también pueden incluir entradas a parques nacionales, city tours y desayuno. Cada destino tiene sus particularidades; te detallamos todo antes de confirmar la reserva.',
  },
  {
    question: '¿Cómo hago para reservar mi viaje?',
    answer:
      'Podés reservar de tres formas: 1) Por WhatsApp al 11 6220 3682 (la opción más rápida, respondemos en horario de atención). 2) Por email a info@amcabiturismo.com.ar. 3) Escribínos y coordinamos una videollamada para asesorarte. Para confirmar la reserva se requiere un adelanto del 30% del valor total, y el saldo se abona antes de la fecha de viaje.',
  },
  {
    question: '¿Tienen financiación en cuotas?',
    answer:
      'Sí, ofrecemos financiación en cuotas con las principales tarjetas de crédito. Podés pagar hasta 18 cuotas con o sin interés según el banco emisor y las promociones vigentes. Aceptamos Visa, Mastercard, American Express, Naranja X y tarjetas de débito. Consultanos las promociones disponibles al momento de tu reserva, ya que se actualizan frecuentemente.',
  },
  {
    question: '¿Puedo viajar solo o sólo hacen paquetes para parejas?',
    answer:
      'Atendemos viajeros solos, parejas, familias y grupos. Los precios base están calculados en habitación doble (dos personas compartiendo). Para viajeros individuales existe un suplemento de habitación single. Para grupos de más de 8 personas ofrecemos tarifas grupales especiales. Consultanos y adaptamos el paquete a tu necesidad.',
  },
  {
    question: '¿Cuándo es la mejor época para viajar a cada destino?',
    answer:
      'Bariloche: julio y agosto para nieve y esquí; enero y febrero para trekking y lago. Cataratas del Iguazú: todo el año es espectacular; marzo, abril y septiembre tienen mayor caudal de agua. Salta: mayo a octubre (temporada seca, clima ideal). Mar del Plata: diciembre a febrero (temporada de playa). Villa Carlos Paz: diciembre–febrero para playa de río y julio para los shows de temporada.',
  },
  {
    question: '¿Necesito pasaporte para los destinos que ofrecen?',
    answer:
      'Para todos los destinos nacionales que ofrecemos (Bariloche, Cataratas, Salta, Mar del Plata, Villa Carlos Paz) solo necesitás tu DNI argentino vigente. No se requiere pasaporte ni documentación adicional. Si en algún momento estás pensando en viajes internacionales, el pasaporte debe tener al menos 6 meses de vigencia desde la fecha de regreso.',
  },
  {
    question: '¿Con cuánta anticipación debo reservar?',
    answer:
      'Para temporada alta (enero, febrero y julio) recomendamos reservar con al menos 45 a 60 días de anticipación para asegurar disponibilidad aérea y hotelera a buenos precios. En temporada baja podés reservar con menos tiempo. En general, cuanto antes reservés, más opciones de vuelos, horarios y categorías de hotel tendrás disponibles.',
  },
  {
    question: '¿AMCABI Turismo es una agencia habilitada?',
    answer:
      'Sí, AMCABI Turismo está habilitada y registrada ante el Ministerio de Turismo y Deportes de la Nación Argentina con Legajo EVT N° 14703. Esto garantiza que cumplimos con todos los requisitos legales establecidos por la Ley de Turismo N° 25.599 y sus reglamentaciones vigentes. Podés verificar nuestro legajo en el registro oficial del ministerio.',
  },
  {
    question: '¿Qué pasa si necesito cancelar o reprogramar mi viaje?',
    answer:
      'Contamos con políticas de cancelación flexibles. Si cancelás con más de 30 días de anticipación, te devolvemos el importe abonado menos gastos administrativos del 10%. Entre 15 y 30 días se retiene el 50% del adelanto. Con menos de 15 días aplican las penalidades de aerolíneas y hoteles según sus condiciones. Todos nuestros paquetes incluyen seguro de viaje que cubre cancelaciones por causas debidamente justificadas (enfermedad, fallecimiento familiar, etc.).',
  },
]

// rule 6.3: hoist static schema to module level — serialized once, never on render.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const faqSchemaString = JSON.stringify(faqSchema)

export default function FAQ() {
  return (
    <section
      id="preguntas-frecuentes"
      className="py-20 lg:py-28 bg-page-soft bg-polkadot"
      aria-labelledby="faq-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaString }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
        <div className="text-center mb-12">
          <p className="font-body text-pink text-sm font-bold tracking-widest uppercase mb-3">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl md:text-4xl font-black text-ink mb-4"
          >
            Todo lo que necesitás saber
          </h2>
          <p className="font-body text-ink-muted text-base">
            Respondemos las consultas más frecuentes sobre nuestros paquetes, reservas y formas de pago.
          </p>
        </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} delay={i * 45}>
            <FAQItem question={faq.question} answer={faq.answer} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={100}>
        <div className="mt-12 text-center p-8 rounded-2xl border border-border bg-page shadow-sm">
          <p className="font-body font-black text-ink text-base mb-1">
            ¿Tenés otra consulta?
          </p>
          <p className="font-body text-ink-muted text-sm mb-6">
            Nuestros asesores te responden de lunes a viernes de 9:00 a 17:00 hs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/5491162203682?text=${encodeURIComponent('Hola! Tengo una consulta sobre los paquetes turísticos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-pink/25"
              aria-label="Consultar por WhatsApp al equipo de AMCABI Turismo"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
            <a
              href="mailto:info@amcabiturismo.com.ar"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-pink/40 text-ink-muted hover:text-pink px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200"
              aria-label="Enviar un email a AMCABI Turismo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar un email
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
