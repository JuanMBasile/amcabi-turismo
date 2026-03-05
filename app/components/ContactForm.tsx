'use client'

import { useState, useRef, FormEvent } from 'react'

const SUBJECTS = [
  'Consulta sobre paquetes',
  'Cotización de viaje',
  'Estado de reserva',
  'Consulta sobre voucher',
  'Otro',
]

interface FormState {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
}

interface Errors {
  nombre?: string
  email?: string
  mensaje?: string
}

const WA_NUMBER = '5491162203682'

export default function ContactForm() {
  const [form, setForm]       = useState<FormState>({ nombre: '', email: '', telefono: '', asunto: SUBJECTS[0], mensaje: '' })
  const [errors, setErrors]   = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const firstErrorRef         = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  function validate(): Errors {
    const e: Errors = {}
    if (!form.nombre.trim())                          e.nombre  = 'Ingresá tu nombre.'
    if (!form.email.trim())                           e.email   = 'Ingresá tu email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'El email no es válido.'
    if (form.mensaje.trim().length < 10)              e.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    return e
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      firstErrorRef.current?.focus()
      return
    }
    setErrors({})
    setLoading(true)

    await new Promise((r) => setTimeout(r, 420))

    const lines = [
      `Hola! Me comunico desde el formulario de contacto de amcabiturismo.com.ar`,
      ``,
      `*Nombre:* ${form.nombre}`,
      `*Email:* ${form.email}`,
      form.telefono ? `*Teléfono:* ${form.telefono}` : null,
      `*Asunto:* ${form.asunto}`,
      ``,
      `*Mensaje:*`,
      form.mensaje,
    ].filter((l) => l !== null).join('\n')

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setLoading(false)
  }

  function field(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key as keyof Errors]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const inputBase =
    'w-full px-4 py-3.5 bg-page border-2 rounded-xl font-body text-ink text-sm transition-all duration-200 outline-none placeholder:text-ink-faint focus:border-pink focus:shadow-[0_0_0_4px_rgba(233,30,140,0.10)]'

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto" className="space-y-5">

      {/* Nombre + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-nombre" className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
            Nombre <span className="text-pink" aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => { if (errors.nombre && !firstErrorRef.current) firstErrorRef.current = el }}
            id="contact-nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => field('nombre', e.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? 'err-nombre' : undefined}
            className={`${inputBase} ${errors.nombre ? 'border-red-400 bg-red-50/30' : 'border-border hover:border-pink/40'}`}
          />
          {errors.nombre && (
            <p id="err-nombre" role="alert" className="mt-1.5 font-body text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
            Email <span className="text-pink" aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => { if (errors.email && !errors.nombre && !firstErrorRef.current) firstErrorRef.current = el }}
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => field('email', e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className={`${inputBase} ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-border hover:border-pink/40'}`}
          />
          {errors.email && (
            <p id="err-email" role="alert" className="mt-1.5 font-body text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Teléfono + Asunto */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-telefono" className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
            Teléfono <span className="text-ink-faint font-normal normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            id="contact-telefono"
            type="tel"
            value={form.telefono}
            onChange={(e) => field('telefono', e.target.value)}
            placeholder="11 1234-5678"
            autoComplete="tel"
            className={`${inputBase} border-border hover:border-pink/40`}
          />
        </div>

        <div>
          <label htmlFor="contact-asunto" className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
            Asunto
          </label>
          <select
            id="contact-asunto"
            value={form.asunto}
            onChange={(e) => field('asunto', e.target.value)}
            className={`${inputBase} border-border hover:border-pink/40 cursor-pointer`}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="contact-mensaje" className="block font-body text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
          Mensaje <span className="text-pink" aria-hidden="true">*</span>
        </label>
        <textarea
          ref={(el) => { if (errors.mensaje && !errors.nombre && !errors.email && !firstErrorRef.current) firstErrorRef.current = el as unknown as HTMLInputElement }}
          id="contact-mensaje"
          rows={5}
          value={form.mensaje}
          onChange={(e) => field('mensaje', e.target.value)}
          placeholder="Contanos qué destino te interesa, las fechas y la cantidad de personas..."
          aria-required="true"
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? 'err-mensaje' : 'hint-mensaje'}
          className={`${inputBase} resize-none ${errors.mensaje ? 'border-red-400 bg-red-50/30' : 'border-border hover:border-pink/40'}`}
        />
        {errors.mensaje ? (
          <p id="err-mensaje" role="alert" className="mt-1.5 font-body text-xs text-red-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.mensaje}
          </p>
        ) : (
          <p id="hint-mensaje" className="mt-1.5 font-body text-xs text-ink-faint">
            Cuanto más detalle nos des, mejor podemos cotizarte.
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2.5 bg-pink hover:bg-pink-dark text-white px-7 py-4 rounded-xl font-body font-black text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink/30 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
          aria-label="Enviar mensaje por WhatsApp"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar por WhatsApp
            </>
          )}
        </button>
        <p className="font-body text-ink-faint text-xs leading-relaxed">
          Tu mensaje llega directo<br />a nuestro WhatsApp.
        </p>
      </div>
    </form>
  )
}
