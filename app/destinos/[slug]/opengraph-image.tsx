import { ImageResponse } from 'next/og'
import { getDestinationBySlug } from '@/sanity/lib/fetchers'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetcher handles dual data source internally
  const dest = await getDestinationBySlug(slug).catch(() => null)

  // Fallback if no destination found
  if (!dest) {
    return new ImageResponse(
      (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#1A0A12',
        }}>
          <div style={{ color: 'white', fontSize: 64, fontFamily: 'sans-serif', fontWeight: 900, display: 'flex' }}>
            AMCABI Turismo
          </div>
        </div>
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dest.image}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,10,18,0.95) 0%, rgba(26,10,18,0.45) 55%, rgba(26,10,18,0.15) 100%)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 80px 60px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {/* Province */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: '#E91E8C' }} />
            <span style={{
              color: '#F472B6', fontSize: 20, fontFamily: 'sans-serif',
              letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
              display: 'flex',
            }}>
              {dest.province}
            </span>
          </div>

          {/* Destination name */}
          <div style={{
            color: 'white', fontFamily: 'sans-serif', fontWeight: 900,
            lineHeight: 0.9, display: 'flex',
            fontSize: dest.name.length > 14 ? 80 : 96,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            {dest.name}
          </div>

          {/* Price + nights row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex' }}>
                Desde
              </span>
              <span style={{ color: '#E91E8C', fontSize: 40, fontWeight: 800, fontFamily: 'sans-serif', display: 'flex' }}>
                {priceFormatter.format(dest.priceFrom)}
              </span>
            </div>

            <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex' }}>
                Duración
              </span>
              <span style={{ color: 'white', fontSize: 28, fontWeight: 700, fontFamily: 'sans-serif', display: 'flex' }}>
                {dest.nights} noches
              </span>
            </div>

            {/* AMCABI badge */}
            <div style={{
              marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
            }}>
              <span style={{ color: 'white', fontSize: 28, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '-0.02em', display: 'flex' }}>
                AMCABI Turismo
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'sans-serif', display: 'flex' }}>
                amcabi-turismo.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
