import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          borderRadius: 0,
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 72,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          A
        </span>
        <span
          style={{
            color: '#E91E8C',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 2,
            display: 'flex',
          }}
        >
          TURISMO
        </span>
      </div>
    ),
    { ...size },
  )
}
