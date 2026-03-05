import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AMCABI Turismo – Paquetes turísticos por Argentina'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A0A12',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.35) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -100,
          width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Main content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 0, position: 'relative', zIndex: 1,
          padding: '0 80px', width: '100%',
        }}>
          {/* EVT badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 48, height: 2, background: '#E91E8C' }} />
            <span style={{
              color: '#F472B6', fontSize: 17, fontFamily: 'sans-serif',
              letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
            }}>
              Agencia de Viajes · EVT 14703
            </span>
            <div style={{ width: 48, height: 2, background: '#E91E8C' }} />
          </div>

          {/* Brand */}
          <div style={{
            color: 'white', fontSize: 108, fontWeight: 900,
            fontFamily: 'sans-serif', letterSpacing: '-0.03em',
            lineHeight: 1, textAlign: 'center', display: 'flex',
          }}>
            AMCABI
          </div>
          <div style={{
            color: '#E91E8C', fontSize: 38, fontWeight: 800,
            fontFamily: 'sans-serif', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginTop: 6, display: 'flex',
          }}>
            TURISMO
          </div>

          {/* Divider */}
          <div style={{
            width: 100, height: 3, margin: '28px 0',
            background: 'linear-gradient(90deg, transparent, #E91E8C, transparent)',
            display: 'flex',
          }} />

          {/* Tagline */}
          <div style={{
            color: 'rgba(255,255,255,0.55)', fontSize: 28,
            fontFamily: 'sans-serif', textAlign: 'center',
            fontWeight: 400, display: 'flex',
          }}>
            Paquetes turísticos por Argentina
          </div>

          {/* Destination pills */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Bariloche', 'Cataratas', 'Salta', 'Mar del Plata', 'Carlos Paz'].map((dest) => (
              <div key={dest} style={{
                background: 'rgba(233,30,140,0.12)',
                border: '1px solid rgba(233,30,140,0.35)',
                borderRadius: 100, padding: '8px 22px',
                color: '#F472B6', fontSize: 17, fontFamily: 'sans-serif',
                display: 'flex',
              }}>
                {dest}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
