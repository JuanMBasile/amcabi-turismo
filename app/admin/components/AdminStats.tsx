interface AdminStatsProps {
  stats: {
    total: number
    paid: number
    pending: number
    cancelled: number
    totalRevenue: number
    pendingRevenue: number
  }
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <StatCard label="Total reservas" value={stats.total} />
      <StatCard label="Pagadas" value={stats.paid} color="text-green-600" bg="bg-green-50" />
      <StatCard label="Pendientes" value={stats.pending} color="text-yellow-600" bg="bg-yellow-50" />
      <StatCard label="Canceladas" value={stats.cancelled} color="text-red-500" bg="bg-red-50" />
      <StatCard label="Ingresos confirmados" value={formatCurrency(stats.totalRevenue)} color="text-green-600" bg="bg-green-50" />
      <StatCard label="Ingresos pendientes" value={formatCurrency(stats.pendingRevenue)} color="text-yellow-600" bg="bg-yellow-50" />
    </div>
  )
}

function StatCard({
  label,
  value,
  color = 'text-ink',
  bg = 'bg-surface',
}: {
  label: string
  value: string | number
  color?: string
  bg?: string
}) {
  return (
    <div className={`${bg} rounded-xl p-4 border border-border`}>
      <p className="font-body text-xs text-ink-muted mb-1">{label}</p>
      <p className={`font-body font-black text-2xl ${color}`}>{value}</p>
    </div>
  )
}
