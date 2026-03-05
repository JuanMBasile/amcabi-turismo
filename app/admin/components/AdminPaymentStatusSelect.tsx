'use client'

import { useState } from 'react'
import type { PaymentStatus } from '@/app/types'
import { PAYMENT_STATUS_LABELS } from '@/app/types'

interface AdminPaymentStatusSelectProps {
  bookingId: string
  currentStatus: PaymentStatus
  onStatusChange: (bookingId: string, newStatus: PaymentStatus) => void
}

const STATUS_STYLES: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cancelled: 'bg-red-100 text-red-500 border-red-200',
}

export default function AdminPaymentStatusSelect({
  bookingId,
  currentStatus,
  onStatusChange,
}: AdminPaymentStatusSelectProps) {
  const [loading, setLoading] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as PaymentStatus
    if (newStatus === currentStatus) return

    setLoading(true)
    // Optimistic update
    onStatusChange(bookingId, newStatus)

    try {
      const res = await fetch('/api/admin/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      })

      if (!res.ok) {
        // Revertir
        onStatusChange(bookingId, currentStatus)
      }
    } catch {
      // Revertir
      onStatusChange(bookingId, currentStatus)
    } finally {
      setLoading(false)
    }
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className={`px-2 py-1 rounded-lg border text-[10px] font-body font-bold appearance-none cursor-pointer disabled:opacity-50 ${STATUS_STYLES[currentStatus]}`}
      aria-label="Cambiar estado de pago"
    >
      {(Object.keys(PAYMENT_STATUS_LABELS) as PaymentStatus[]).map((status) => (
        <option key={status} value={status}>
          {PAYMENT_STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  )
}
