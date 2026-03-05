'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AdminLoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error al iniciar sesión')
        return
      }

      const redirect = searchParams.get('redirect') ?? '/admin'
      router.push(redirect)
      router.refresh()
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="font-body font-black text-2xl text-ink mb-2">
          Panel de Administración
        </h1>
        <p className="font-body text-ink-muted text-sm">
          AMCABI Turismo
        </p>
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="block font-body font-semibold text-sm text-ink mb-2"
        >
          Contraseña de administrador
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="input w-full"
          placeholder="Ingresá la contraseña"
          aria-describedby={error ? 'login-error' : undefined}
        />
      </div>

      {error && (
        <p id="login-error" className="font-body text-sm text-pink" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-xl font-body font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={loading}
      >
        {loading ? 'Verificando...' : 'Ingresar'}
      </button>
    </form>
  )
}
