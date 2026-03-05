'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: ErrorProps) {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pink/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="font-body font-black text-xl text-ink mb-4">
          Error al cargar el panel
        </h1>
        <p className="font-body text-ink-muted text-sm mb-6">
          {error.message || 'Ocurrió un error inesperado al cargar las reservas.'}
        </p>
        <button
          onClick={reset}
          className="bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-xl font-body font-bold text-sm transition-all duration-200"
        >
          Intentar de nuevo
        </button>
        {error.digest && (
          <p className="mt-4 font-body text-ink-faint text-xs">
            Código: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
