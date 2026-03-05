import { getAllBookings } from '@/sanity/lib/fetchers'
import AdminStats from './components/AdminStats'
import AdminExportButton from './components/AdminExportButton'
import AdminBookingsTable from './components/AdminBookingsTable'
import AdminLogoutButton from './components/AdminLogoutButton'

export default async function AdminPage() {
  const bookings = await getAllBookings()

  const stats = {
    total: bookings.length,
    paid: bookings.filter((b) => b.paymentStatus === 'paid').length,
    pending: bookings.filter((b) => b.paymentStatus === 'pending').length,
    cancelled: bookings.filter((b) => b.paymentStatus === 'cancelled').length,
    totalRevenue: bookings
      .filter((b) => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPrice, 0),
    pendingRevenue: bookings
      .filter((b) => b.paymentStatus === 'pending')
      .reduce((sum, b) => sum + b.totalPrice, 0),
  }

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-body font-black text-2xl text-ink">
            Panel de Administración
          </h1>
          <p className="font-body text-sm text-ink-muted">
            AMCABI Turismo — Gestión de reservas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AdminExportButton />
          <AdminLogoutButton />
        </div>
      </div>

      {/* Stats */}
      <AdminStats stats={stats} />

      {/* Tabla de reservas */}
      <AdminBookingsTable initialBookings={bookings} />
    </main>
  )
}
