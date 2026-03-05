import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Términos y Condiciones – AMCABI Turismo',
  description:
    'Términos y condiciones de contratación de servicios turísticos de AMCABI Turismo. Información sobre cancelaciones, documentación y protección de datos.',
  alternates: { canonical: 'https://amcabiturismo.com.ar/terminos-condiciones' },
  openGraph: {
    title: 'Términos y Condiciones | AMCABI Turismo',
    description:
      'Términos y condiciones de contratación de servicios turísticos de AMCABI Turismo.',
    url: 'https://amcabiturismo.com.ar/terminos-condiciones',
  },
}

export default function TerminosCondicionesPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-page pt-16">

        {/* Hero */}
        <section className="bg-ink py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-cyan/15 text-cyan px-4 py-1.5 rounded-full font-body font-bold text-xs uppercase tracking-widest mb-6">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Legal
            </div>
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              Términos y Condiciones
            </h1>
            <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Condiciones generales de contratación de servicios turísticos ofrecidos por AMCABI Turismo (Fenix Operadores Turísticos SRL).
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-ink max-w-none">

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  Condiciones generales de contratación
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>
                    La contratación de cualquier servicio turístico ofrecido por AMCABI Turismo implica la aceptación plena de estas condiciones generales. El pasajero declara conocer y aceptar todas las cláusulas aquí establecidas.
                  </p>
                  <p>
                    AMCABI Turismo actúa como intermediario entre el pasajero y los prestadores de servicios turísticos (hoteles, transportes, excursiones, etc.). La responsabilidad de AMCABI Turismo se limita a la correcta intermediación de los servicios contratados.
                  </p>
                  <p>
                    Los precios publicados son en pesos argentinos (ARS) e incluyen IVA. Los precios pueden variar sin previo aviso hasta el momento de la confirmación de la reserva.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan/10 text-cyan flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  Reservas y pagos
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>
                    Para confirmar una reserva se requiere el pago de una seña del 30% del valor total del paquete. El saldo restante debe abonarse con un mínimo de 15 días de anticipación a la fecha de salida.
                  </p>
                  <p>
                    <strong className="text-ink">Formas de pago aceptadas:</strong> transferencia bancaria, efectivo, tarjeta de débito y tarjeta de crédito (con recargo según plan de cuotas).
                  </p>
                  <p>
                    La reserva se considera confirmada únicamente cuando el pasajero recibe el voucher correspondiente con el número de reserva asignado.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-yellow/10 text-yellow-dark flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  Política de cancelaciones y reembolsos
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>Las cancelaciones están sujetas a los siguientes cargos según la anticipación:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-ink">Más de 30 días antes:</strong> retención del 10% del total.</li>
                    <li><strong className="text-ink">Entre 15 y 30 días:</strong> retención del 30% del total (seña).</li>
                    <li><strong className="text-ink">Entre 7 y 14 días:</strong> retención del 50% del total.</li>
                    <li><strong className="text-ink">Menos de 7 días o no-show:</strong> no hay reembolso.</li>
                  </ul>
                  <p>
                    En caso de cancelación por parte de AMCABI Turismo debido a fuerza mayor, se ofrecerá reprogramación o reembolso total según disponibilidad.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple/10 text-purple flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  Responsabilidad del pasajero
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>El pasajero es responsable de:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Verificar la exactitud de los datos personales proporcionados al momento de la reserva.</li>
                    <li>Presentarse puntualmente en el punto de embarque con la documentación requerida.</li>
                    <li>Cumplir con las normas de convivencia durante el viaje y en los establecimientos hoteleros.</li>
                    <li>Informar sobre condiciones médicas o necesidades especiales que puedan afectar el viaje.</li>
                  </ul>
                  <p>
                    AMCABI Turismo no se responsabiliza por pérdidas, daños o robos de equipaje o pertenencias personales durante el viaje.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  Documentación requerida
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>
                    <strong className="text-ink">Mayores de 18 años:</strong> DNI vigente (no vencido) o pasaporte.
                  </p>
                  <p>
                    <strong className="text-ink">Menores de 18 años:</strong> DNI + autorización de viaje firmada por ambos padres ante escribano público o juzgado de paz. En caso de viajar con uno solo de los padres, se requiere autorización del padre/madre ausente.
                  </p>
                  <p>
                    Es responsabilidad exclusiva del pasajero verificar la vigencia y validez de su documentación antes del viaje.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan/10 text-cyan flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  Protección de datos personales
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>
                    En cumplimiento de la <strong className="text-ink">Ley 25.326 de Protección de Datos Personales</strong>, informamos que los datos proporcionados por el pasajero serán utilizados exclusivamente para la gestión de reservas y servicios turísticos.
                  </p>
                  <p>
                    El pasajero puede ejercer sus derechos de acceso, rectificación y supresión de sus datos personales contactándose a{' '}
                    <a href="mailto:info@amcabiturismo.com.ar" className="text-cyan hover:underline">
                      info@amcabiturismo.com.ar
                    </a>.
                  </p>
                  <p>
                    La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="font-display font-black text-ink text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-yellow/10 text-yellow-dark flex items-center justify-center text-sm font-bold shrink-0">7</span>
                  Información de la empresa
                </h2>
                <div className="font-body text-ink-muted text-sm sm:text-base leading-relaxed space-y-4 pl-11">
                  <p>
                    <strong className="text-ink">Razón social:</strong> Fenix Operadores Turísticos SRL
                  </p>
                  <p>
                    <strong className="text-ink">Nombre comercial:</strong> AMCABI Turismo
                  </p>
                  <p>
                    <strong className="text-ink">Legajo EVT:</strong> N° 14703 (Disposición 307/11)
                  </p>
                  <p>
                    <strong className="text-ink">Dirección:</strong> Arbono 799, Escobar, Provincia de Buenos Aires
                  </p>
                  <p>
                    <strong className="text-ink">Contacto:</strong>{' '}
                    <a href="mailto:info@amcabiturismo.com.ar" className="text-cyan hover:underline">
                      info@amcabiturismo.com.ar
                    </a>{' '}
                    · WhatsApp{' '}
                    <a href="https://wa.me/5491162203682" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                      11 6220-3682
                    </a>
                  </p>
                </div>
              </section>

              {/* Defensa del consumidor */}
              <section className="mt-12 p-6 bg-surface rounded-2xl border border-border">
                <h3 className="font-display font-bold text-ink text-base mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Defensa del Consumidor
                </h3>
                <p className="font-body text-ink-muted text-sm leading-relaxed mb-3">
                  Para consultas o reclamos relacionados con la defensa del consumidor, podés dirigirte a:
                </p>
                <a
                  href="https://www.argentina.gob.ar/defensadelconsumidor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan hover:text-cyan-dark font-body text-sm font-semibold transition-colors"
                >
                  Dirección Nacional de Defensa del Consumidor
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </section>

            </article>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-ink-muted hover:text-pink font-body text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
