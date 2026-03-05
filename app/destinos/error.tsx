'use client'

export default function DestinosError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="font-display font-black text-ink text-2xl mb-3">
          No pudimos cargar los destinos
        </h2>
        <p className="font-body text-ink-muted text-sm mb-6">
          Ocurrió un error al obtener la información. Por favor intentá de nuevo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-pink hover:bg-pink/90 text-white px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-200"
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
