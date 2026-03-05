import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina no encontrada',
  description: 'La pagina que buscas no existe. Volve al inicio de AMCABI Turismo.',
}

/**
 * 404 Not Found Page
 *
 * Displayed when a route doesn't exist.
 * All text in Spanish (es-AR).
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <p
            className="font-display font-black text-pink/10 leading-none select-none"
            style={{ fontSize: 'clamp(8rem, 20vw, 12rem)' }}
            aria-hidden="true"
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-pink/10 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display font-black text-ink text-2xl md:text-3xl mb-4">
          Pagina no encontrada
        </h1>
        <p className="font-body text-ink-muted text-base mb-8 leading-relaxed">
          La pagina que estas buscando no existe o fue movida.
          Te invitamos a explorar nuestros destinos o volver al inicio.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-pink/25"
            aria-label="Volver al inicio"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir al inicio
          </Link>
          <Link
            href="/#destinos"
            className="inline-flex items-center justify-center gap-2 border border-border hover:border-pink/40 text-ink hover:text-pink px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200"
            aria-label="Ver destinos disponibles"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Ver destinos
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="font-body text-ink-faint text-sm mb-4">
            Enlaces rapidos
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/quienes-somos"
              className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
            >
              Quienes somos
            </Link>
            <Link
              href="/servicios"
              className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contacto"
              className="font-body text-sm text-ink-muted hover:text-pink transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* WhatsApp help */}
        <div className="mt-8">
          <a
            href="https://wa.me/5491162203682?text=Hola!%20Estoy%20buscando%20informacion%20sobre%20paquetes%20turisticos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-green-600 hover:text-green-500 transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Necesitas ayuda? Escribinos
          </a>
        </div>
      </div>
    </div>
  )
}
