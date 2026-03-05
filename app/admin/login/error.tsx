'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminLoginError({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <h1 className="font-body font-black text-xl text-ink mb-4">
          Error al cargar el login
        </h1>
        <p className="font-body text-ink-muted text-sm mb-6">
          {error.message || 'Ocurrió un error inesperado.'}
        </p>
        <button
          onClick={reset}
          className="bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-xl font-body font-bold text-sm transition-all duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
