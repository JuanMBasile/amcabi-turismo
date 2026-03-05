'use client'

import { useState } from 'react'

export default function AdminExportButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleExport() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/export')
      if (!response.ok) {
        throw new Error('Error al generar el archivo')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `reservas-amcabi-${new Date().toISOString().slice(0, 10)}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      setError('Error al generar el archivo. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-3">
      <button
        onClick={handleExport}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-body font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={loading}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading ? 'Generando Excel + análisis IA...' : 'Exportar Excel'}
      </button>
      {error && (
        <span className="font-body text-sm text-pink">{error}</span>
      )}
    </div>
  )
}
