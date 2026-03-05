'use client'

import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TerminosCondicionesError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-page pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-pink/10 text-pink flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="font-display font-black text-ink text-2xl mb-3">
            Error al cargar la página
          </h1>
          <p className="font-body text-ink-muted text-base mb-8">
            No pudimos cargar los términos y condiciones. Por favor, intentá de nuevo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-colors"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-pink/30 text-ink px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
