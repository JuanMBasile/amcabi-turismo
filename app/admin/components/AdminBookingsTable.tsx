'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Booking, PaymentStatus } from '@/app/types'
import { PAYMENT_STATUS_LABELS, ROOM_TYPE_LABELS } from '@/app/types'
import AdminPaymentStatusSelect from './AdminPaymentStatusSelect'

interface AdminBookingsTableProps {
  initialBookings: Booking[]
}

type SortField = 'bookingNumber' | 'createdAt' | 'totalPrice' | 'paymentStatus' | 'destination'
type SortDir = 'asc' | 'desc'

const STATUS_STYLES: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-500',
}

const PAGE_SIZE = 25

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

const formatDate = (iso: string) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const formatDateTime = (iso: string) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminBookingsTable({ initialBookings }: AdminBookingsTableProps) {
  const [bookings, setBookings] = useState(initialBookings)
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [destinationFilter, setDestinationFilter] = useState('')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(0)

  // Extraer destinos únicos para el filtro
  const destinations = useMemo(() => {
    const names = new Set<string>()
    bookings.forEach((b) => {
      if (b.departure?.destinationName) names.add(b.departure.destinationName)
    })
    return Array.from(names).sort()
  }, [bookings])

  // Filtrar
  const filtered = useMemo(() => {
    let result = bookings

    if (statusFilter !== 'all') {
      result = result.filter((b) => b.paymentStatus === statusFilter)
    }

    if (destinationFilter) {
      result = result.filter((b) => b.departure?.destinationName === destinationFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter((b) =>
        b.bookingNumber.toLowerCase().includes(q) ||
        b.contactEmail.toLowerCase().includes(q) ||
        b.contactPhone.includes(q) ||
        b.passengers.some(
          (p) => p.firstName.toLowerCase().includes(q) ||
                 p.lastName.toLowerCase().includes(q) ||
                 p.dni.includes(q)
        )
      )
    }

    return result
  }, [bookings, statusFilter, destinationFilter, search])

  // Ordenar
  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'bookingNumber':
          cmp = a.bookingNumber.localeCompare(b.bookingNumber)
          break
        case 'createdAt':
          cmp = a.createdAt.localeCompare(b.createdAt)
          break
        case 'totalPrice':
          cmp = a.totalPrice - b.totalPrice
          break
        case 'paymentStatus':
          cmp = a.paymentStatus.localeCompare(b.paymentStatus)
          break
        case 'destination':
          cmp = (a.departure?.destinationName ?? '').localeCompare(b.departure?.destinationName ?? '')
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [filtered, sortField, sortDir])

  // Paginar
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
    setPage(0)
  }

  function handleStatusChange(bookingId: string, newStatus: PaymentStatus) {
    setBookings((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, paymentStatus: newStatus } : b))
    )
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <span className="text-ink-faint ml-1">↕</span>
    return <span className="text-pink ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as PaymentStatus | 'all'); setPage(0) }}
          className="input text-sm"
          aria-label="Filtrar por estado"
        >
          <option value="all">Todos los estados</option>
          <option value="paid">Pagado</option>
          <option value="pending">Pendiente</option>
          <option value="cancelled">Cancelado</option>
        </select>

        <select
          value={destinationFilter}
          onChange={(e) => { setDestinationFilter(e.target.value); setPage(0) }}
          className="input text-sm"
          aria-label="Filtrar por destino"
        >
          <option value="">Todos los destinos</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          placeholder="Buscar por nro, email, DNI, nombre..."
          className="input text-sm flex-1 min-w-[200px]"
          aria-label="Buscar reservas"
        />

        <span className="font-body text-sm text-ink-muted self-center">
          {filtered.length} reserva{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left" role="table">
          <thead>
            <tr className="bg-ink text-white">
              <Th field="bookingNumber" label="Nro Reserva" onSort={handleSort} sortIcon={<SortIcon field="bookingNumber" />} />
              <Th field="paymentStatus" label="Estado" onSort={handleSort} sortIcon={<SortIcon field="paymentStatus" />} />
              <Th field="destination" label="Destino" onSort={handleSort} sortIcon={<SortIcon field="destination" />} />
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Paquete</th>
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Salida</th>
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Habitación</th>
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Pax</th>
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Email</th>
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Teléfono</th>
              <Th field="totalPrice" label="Total" onSort={handleSort} sortIcon={<SortIcon field="totalPrice" />} />
              <Th field="createdAt" label="Fecha Reserva" onSort={handleSort} sortIcon={<SortIcon field="createdAt" />} />
              <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center font-body text-ink-muted text-sm">
                  No se encontraron reservas
                </td>
              </tr>
            ) : (
              paginated.map((booking) => (
                <tr key={booking._id} className="hover:bg-surface-alt/50 transition-colors">
                  <td className="px-3 py-3 font-body text-xs font-bold text-ink whitespace-nowrap">
                    {booking.bookingNumber}
                  </td>
                  <td className="px-3 py-3">
                    <AdminPaymentStatusSelect
                      bookingId={booking._id}
                      currentStatus={booking.paymentStatus}
                      onStatusChange={handleStatusChange}
                    />
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink whitespace-nowrap">
                    {booking.departure?.destinationName ?? '—'}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink-muted max-w-[200px] truncate">
                    {booking.departure?.title ?? '—'}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink whitespace-nowrap">
                    {booking.departure?.departureDate ? formatDate(booking.departure.departureDate) : '—'}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink whitespace-nowrap">
                    {ROOM_TYPE_LABELS[booking.roomType] ?? booking.roomType}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink text-center">
                    {booking.passengers.length}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink-muted max-w-[180px] truncate">
                    {booking.contactEmail}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink-muted whitespace-nowrap">
                    {booking.contactPhone}
                  </td>
                  <td className="px-3 py-3 font-body text-xs font-bold text-ink whitespace-nowrap">
                    {formatCurrency(booking.totalPrice)}
                  </td>
                  <td className="px-3 py-3 font-body text-xs text-ink-muted whitespace-nowrap">
                    {formatDateTime(booking.createdAt)}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/reserva/${booking.bookingNumber}`}
                      className="font-body text-xs text-pink hover:text-pink-dark transition-colors"
                      target="_blank"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Resumen de estados visible */}
      <div className="flex flex-wrap gap-3 mt-3">
        {(['paid', 'pending', 'cancelled'] as const).map((status) => {
          const count = filtered.filter((b) => b.paymentStatus === status).length
          return (
            <span key={status} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-bold ${STATUS_STYLES[status]}`}>
              {PAYMENT_STATUS_LABELS[status]}: {count}
            </span>
          )
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="font-body text-sm text-ink-muted">
            Página {page + 1} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 rounded-lg border border-border font-body text-sm text-ink hover:bg-surface-alt disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 rounded-lg border border-border font-body text-sm text-ink hover:bg-surface-alt disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Th({
  field,
  label,
  onSort,
  sortIcon,
}: {
  field: SortField
  label: string
  onSort: (field: SortField) => void
  sortIcon: React.ReactNode
}) {
  return (
    <th scope="col" className="px-3 py-3 font-body font-bold text-xs whitespace-nowrap">
      <button
        onClick={() => onSort(field)}
        className="inline-flex items-center hover:text-pink-light transition-colors"
        type="button"
      >
        {label}
        {sortIcon}
      </button>
    </th>
  )
}
