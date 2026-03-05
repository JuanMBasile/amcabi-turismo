import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET() {
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
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 200,
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
            fontSize: 44,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 4,
            display: 'flex',
          }}
        >
          TURISMO
        </span>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
