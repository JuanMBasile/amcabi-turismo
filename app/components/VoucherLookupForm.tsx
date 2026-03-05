'use client'

import { useState, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function VoucherLookupForm() {
  const [value, setValue]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef              = useRef<HTMLInputElement>(null)
  const router                = useRouter()

  function validate(v: string) {
    const trimmed = v.trim()
    if (!trimmed) return 'Ingresá tu código de reserva.'
    if (trimmed.length < 3) return 'El código debe tener al menos 3 caracteres.'
    return ''
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const err = validate(value)
    if (err) { setError(err); inputRef.current?.focus(); return }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 420))
    router.push(`/voucher/${encodeURIComponent(value.trim().toUpperCase())}`)
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Consultar código de voucher">
      <div className="mb-4">
        <label
          htmlFor="voucher-codigo"
          className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2"
        >
          Código de Reserva
        </label>

        <div className="relative">
          {/* Ticket icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" aria-hidden="true">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>

          <input
            ref={inputRef}
            id="voucher-codigo"
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value.toUpperCase()); if (error) setError('') }}
            placeholder="Ej: AMC-2024-001"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-describedby={error ? 'voucher-error' : 'voucher-hint'}
            aria-invalid={!!error}
            className={`w-full pl-12 pr-4 py-4 bg-page border-2 rounded-xl font-body font-semibold text-ink text-base tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-ink-faint transition-all duration-200 outline-none
              focus:border-yellow focus:shadow-[0_0_0_4px_rgba(251,208,0,0.15)]
              ${error ? 'border-red-400 bg-red-50/30' : 'border-border hover:border-yellow/50'}`}
          />
        </div>

        {error ? (
          <p id="voucher-error" role="alert" className="mt-2 font-body text-xs text-red-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        ) : (
          <p id="voucher-hint" className="mt-2 font-body text-xs text-ink-faint">
            Encontrás el código en el comprobante enviado por email o WhatsApp al confirmar el pago.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 bg-yellow hover:bg-yellow/90 text-ink px-6 py-4 rounded-xl font-body font-black text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow/30 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
        aria-label="Consultar voucher"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Buscando tu voucher…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Consultar voucher
          </>
        )}
      </button>
    </form>
  )
}
