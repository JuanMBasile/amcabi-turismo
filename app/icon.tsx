import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A0A12',
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: '#E91E8C',
            fontSize: 20,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size },
  )
}
