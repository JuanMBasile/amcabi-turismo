export default function AdminLoading() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="skeleton skeleton-title w-64 mb-2" />
          <div className="skeleton skeleton-text w-48" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface rounded-xl p-4 border border-border">
            <div className="skeleton skeleton-text w-20 mb-2" />
            <div className="skeleton skeleton-title w-16" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-ink h-12" />
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-3 border-b border-border">
            <div className="skeleton skeleton-text w-24" />
            <div className="skeleton skeleton-text w-16" />
            <div className="skeleton skeleton-text w-20" />
            <div className="skeleton skeleton-text flex-1" />
          </div>
        ))}
      </div>
    </main>
  )
}
