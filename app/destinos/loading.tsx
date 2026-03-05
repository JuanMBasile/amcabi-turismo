import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function DestinosLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-page pt-16">
        <div className="bg-pink px-4 py-8 md:py-10">
          <div className="max-w-6xl mx-auto">
            <div className="skeleton-title w-64" />
            <div className="skeleton-text w-80 mt-3" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton w-20 h-9 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="skeleton-image" />
                <div className="p-5 space-y-3">
                  <div className="skeleton-title w-40" />
                  <div className="skeleton-text w-24" />
                  <div className="skeleton w-full h-10 rounded-lg" />
                  <div className="skeleton w-full h-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
