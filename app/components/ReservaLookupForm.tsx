'use client'

import { useState, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ReservaLookupForm() {
  const [value, setValue]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef              = useRef<HTMLInputElement>(null)
  const router                = useRouter()

  function validate(v: string) {
    const trimmed = v.trim()
    if (!trimmed) return 'Ingresá tu número de reserva.'
    if (trimmed.length < 3) return 'El número de reserva debe tener al menos 3 caracteres.'
    return ''
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const err = validate(value)
    if (err) { setError(err); inputRef.current?.focus(); return }
    setError('')
    setLoading(true)
    // Small UX delay so the loader is visible, then navigate
    await new Promise((r) => setTimeout(r, 420))
    router.push(`/reserva/${encodeURIComponent(value.trim().toUpperCase())}`)
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Consultar número de reserva">
      <div className="mb-4">
        <label
          htmlFor="reserva-numero"
          className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2"
        >
          Número de Reserva Terrestre
        </label>

        <div className="relative">
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" aria-hidden="true">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>

          <input
            ref={inputRef}
            id="reserva-numero"
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value.toUpperCase()); if (error) setError('') }}
            placeholder="Ej: RES-00123"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-describedby={error ? 'reserva-error' : 'reserva-hint'}
            aria-invalid={!!error}
            className={`w-full pl-12 pr-4 py-4 bg-page border-2 rounded-xl font-body font-semibold text-ink text-base tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-ink-faint transition-all duration-200 outline-none
              focus:border-pink focus:shadow-[0_0_0_4px_rgba(233,30,140,0.12)]
              ${error ? 'border-red-400 bg-red-50/30' : 'border-border hover:border-pink/40'}`}
          />
        </div>

        {error ? (
          <p id="reserva-error" role="alert" className="mt-2 font-body text-xs text-red-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        ) : (
          <p id="reserva-hint" className="mt-2 font-body text-xs text-ink-faint">
            Encontrás tu número en el comprobante de reserva enviado por email o WhatsApp.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-shimmer w-full flex items-center justify-center gap-2.5 text-white px-6 py-4 rounded-xl font-body font-black text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink/30 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
        aria-label="Consultar reserva"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Buscando tu reserva…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Consultar reserva
          </>
        )}
      </button>
    </form>
  )
}
