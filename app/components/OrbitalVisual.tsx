'use client'

import { useState, useEffect } from 'react'

// ── Constantes ─────────────────────────────────────────────────────────────

const BA_X = 55
const BA_Y = 55

interface Destination {
  label: string
  x: number; y: number
  cx: number; cy: number   // control point del arco bezier
  chipSide: 'left' | 'right'
}

const DESTINATIONS: Destination[] = [
  { label: 'Salta',         x: 32, y: 15, cx: 44, cy: 32, chipSide: 'right' },
  { label: 'Cataratas',     x: 80, y: 20, cx: 72, cy: 36, chipSide: 'left'  },
  { label: 'Mendoza',       x: 20, y: 42, cx: 36, cy: 50, chipSide: 'right' },
  { label: 'Bariloche',     x: 22, y: 68, cx: 38, cy: 64, chipSide: 'right' },
  { label: 'Mar del Plata', x: 80, y: 72, cx: 72, cy: 66, chipSide: 'left'  },
  { label: 'Ushuaia',       x: 50, y: 88, cx: 54, cy: 76, chipSide: 'right' },
]

// Path estrella: BA → ciudad → BA → siguiente ciudad → BA → ...
const flightPath = [
  `M ${BA_X},${BA_Y}`,
  ...DESTINATIONS.flatMap(d => [
    `Q ${d.cx},${d.cy} ${d.x},${d.y}`,
    `Q ${d.cx},${d.cy} ${BA_X},${BA_Y}`,
  ]),
].join(' ')

// Estrellas con posiciones fijas (deterministas, sin Math.random en render)
const STARS = [
  { cx: 8,  cy: 6,  r: 0.2,  op: 0.18, dur: 3.2 },
  { cx: 93, cy: 9,  r: 0.15, op: 0.12, dur: 4.1 },
  { cx: 15, cy: 22, r: 0.25, op: 0.2,  dur: 5.3 },
  { cx: 72, cy: 4,  r: 0.18, op: 0.15, dur: 3.8 },
  { cx: 45, cy: 8,  r: 0.2,  op: 0.1,  dur: 6.2 },
  { cx: 96, cy: 28, r: 0.22, op: 0.17, dur: 4.5 },
  { cx: 5,  cy: 42, r: 0.15, op: 0.14, dur: 3.1 },
  { cx: 88, cy: 45, r: 0.2,  op: 0.2,  dur: 5.7 },
  { cx: 30, cy: 5,  r: 0.18, op: 0.13, dur: 4.8 },
  { cx: 60, cy: 3,  r: 0.22, op: 0.16, dur: 3.4 },
  { cx: 10, cy: 62, r: 0.15, op: 0.11, dur: 6.8 },
  { cx: 95, cy: 58, r: 0.2,  op: 0.19, dur: 4.2 },
  { cx: 38, cy: 10, r: 0.18, op: 0.14, dur: 5.1 },
  { cx: 80, cy: 12, r: 0.25, op: 0.22, dur: 3.9 },
  { cx: 6,  cy: 85, r: 0.2,  op: 0.15, dur: 4.6 },
  { cx: 92, cy: 75, r: 0.15, op: 0.12, dur: 7.1 },
  { cx: 55, cy: 96, r: 0.22, op: 0.18, dur: 3.3 },
  { cx: 20, cy: 98, r: 0.18, op: 0.13, dur: 5.4 },
  { cx: 75, cy: 98, r: 0.2,  op: 0.16, dur: 4.7 },
  { cx: 48, cy: 102,r: 0.15, op: 0.1,  dur: 6.3 },
  { cx: 12, cy: 33, r: 0.2,  op: 0.17, dur: 3.6 },
  { cx: 90, cy: 36, r: 0.18, op: 0.14, dur: 5.9 },
  { cx: 25, cy: 88, r: 0.22, op: 0.2,  dur: 4.3 },
  { cx: 85, cy: 88, r: 0.15, op: 0.11, dur: 6.5 },
  { cx: 42, cy: 99, r: 0.2,  op: 0.15, dur: 3.7 },
  { cx: 68, cy: 7,  r: 0.18, op: 0.18, dur: 5.2 },
  { cx: 3,  cy: 72, r: 0.15, op: 0.12, dur: 4.9 },
  { cx: 97, cy: 65, r: 0.2,  op: 0.16, dur: 3.5 },
  { cx: 18, cy: 10, r: 0.22, op: 0.19, dur: 6.1 },
  { cx: 82, cy: 56, r: 0.15, op: 0.13, dur: 4.4 },
]

// ── Componente ──────────────────────────────────────────────────────────────

export default function OrbitalVisual() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="relative z-10 w-full max-w-[400px] overflow-visible" style={{ aspectRatio: '1 / 1' }} aria-hidden="true">

      {/* Glow ambiental */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(60,10,40,0.45) 0%, transparent 60%)',
        }}
      />

      <svg
        viewBox="-5 0 110 100"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Defs ── */}
        <defs>
          <path id="fp" d={flightPath} />

          {/* Gradiente por ruta: rosa en BA → transparente en destino */}
          {DESTINATIONS.map((d, i) => (
            <linearGradient
              key={`rg-${i}`}
              id={`rg-${i}`}
              x1={BA_X} y1={BA_Y} x2={d.x} y2={d.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="#E91E8C" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#E91E8C" stopOpacity="0.08" />
            </linearGradient>
          ))}

          <radialGradient id="hub-glow">
            <stop offset="0%"   stopColor="#E91E8C" stopOpacity="0.35" />
            <stop offset="60%"  stopColor="#E91E8C" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#E91E8C" stopOpacity="0"    />
          </radialGradient>

          <radialGradient id="trail-glow">
            <stop offset="0%"   stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0"   />
          </radialGradient>

          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Campo de estrellas (solo cliente para evitar hydration mismatch) ── */}
        {mounted && STARS.map((s, i) => (
          <circle key={`s${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op}>
            <animate
              attributeName="opacity"
              values={`${s.op};${+(s.op * 0.3).toFixed(2)};${s.op}`}
              dur={`${s.dur}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ── Anillos decorativos ── */}
        <g style={{ transformOrigin: '50% 50%' }} className="orbit-cw-32">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#E91E8C"
            strokeWidth="0.3" strokeOpacity="0.14" strokeDasharray="4 6" />
        </g>
        <g style={{ transformOrigin: '50% 50%' }} className="orbit-ccw-22">
          <circle cx="50" cy="50" r="28" fill="none" stroke="#22D3EE"
            strokeWidth="0.3" strokeOpacity="0.11" strokeDasharray="2 5" />
        </g>
        <g style={{ transformOrigin: '50% 50%' }} className="orbit-cw-14">
          <circle cx="50" cy="50" r="18" fill="none" stroke="#FBD000"
            strokeWidth="0.3" strokeOpacity="0.13" />
        </g>

        {/* ── Rutas con gradiente y animación de entrada ── */}
        {DESTINATIONS.map((d, i) => (
          <path
            key={`route-${i}`}
            d={`M ${BA_X},${BA_Y} Q ${d.cx},${d.cy} ${d.x},${d.y}`}
            fill="none"
            stroke={`url(#rg-${i})`}
            strokeWidth="0.45"
            strokeDasharray="1.5 2.5"
            className={mounted ? 'route-draw' : ''}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}

        {/* ── Puntos de destino ── */}
        {DESTINATIONS.map((d, i) => (
          <g key={`dest-${i}`}>
            <circle cx={d.x} cy={d.y} r="3" fill="#E91E8C" opacity="0.08">
              <animate attributeName="r"       values="2.5;3.5;2.5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.08;0.16;0.08" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={d.x} cy={d.y} r="1.5" fill="#E91E8C" opacity="0.85" filter="url(#glow-soft)" />
            <circle cx={d.x} cy={d.y} r="0.5" fill="white"   opacity="0.7" />
          </g>
        ))}

        {/* ── Chip labels (SVG nativos - posicionados arriba del punto) ── */}
        {DESTINATIONS.map((d, i) => {
          const gap     = 2.5
          const pillW   = d.label.length * 2.9 + 6
          const pillH   = 5
          const pillX   = d.x - pillW / 2
          const pillY   = d.y - gap - pillH
          const textX   = d.x
          return (
            <g
              key={`chip-${i}`}
              className="chip-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <rect
                x={pillX} y={pillY}
                width={pillW} height={pillH}
                rx="2.5"
                fill="rgba(255,255,255,0.07)"
                stroke="rgba(233,30,140,0.28)"
                strokeWidth="0.3"
              />
              <text
                x={textX}
                y={pillY + pillH / 2 + 1}
                fontSize="3"
                fill="white"
                fillOpacity="0.88"
                textAnchor="middle"
                fontFamily="Montserrat, system-ui, sans-serif"
                fontWeight="500"
              >
                {d.label}
              </text>
            </g>
          )
        })}

        {/* ── Hub: Buenos Aires ── */}
        <g>
          {/* Radar pulse */}
          <circle cx={BA_X} cy={BA_Y} r="5.5" fill="url(#hub-glow)">
            <animate attributeName="r"       values="4;7;4"   dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Dashed ring giratorio */}
          <circle cx={BA_X} cy={BA_Y} r="4" fill="none"
            stroke="#E91E8C" strokeWidth="0.35" strokeOpacity="0.35" strokeDasharray="1 1.5">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${BA_X} ${BA_Y}`}
              to={`360 ${BA_X} ${BA_Y}`}
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Inner glow + core */}
          <circle cx={BA_X} cy={BA_Y} r="2.2" fill="#E91E8C" opacity="0.5" filter="url(#glow-strong)" />
          <circle cx={BA_X} cy={BA_Y} r="1.8" fill="#E91E8C" opacity="0.95" />
          <circle cx={BA_X} cy={BA_Y} r="0.8" fill="white"   opacity="0.95" />
          {/* Labels */}
          <text
            x={BA_X + 4.5} y={BA_Y - 1.5}
            fontSize="3.5" fill="white" fillOpacity="0.95"
            textAnchor="start"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontWeight="700"
          >Buenos Aires</text>
          <text
            x={BA_X + 4.5} y={BA_Y + 2.2}
            fontSize="1.9" fill="#E91E8C" fillOpacity="0.75"
            textAnchor="start"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="0.08em"
          >HUB</text>
        </g>

        {/* ── Marcas cardinales ── */}
        {[0, 90, 180, 270].map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <line
              key={a}
              x1={50 + 40 * Math.cos(rad)} y1={50 + 40 * Math.sin(rad)}
              x2={50 + 42 * Math.cos(rad)} y2={50 + 42 * Math.sin(rad)}
              stroke="#E91E8C" strokeWidth="0.6" strokeOpacity="0.3"
            />
          )
        })}

        {/* ── Estela del avión ── */}
        <circle r="2.5" fill="url(#trail-glow)" opacity="0.18">
          <animateMotion dur="20s" begin="0.3s" repeatCount="indefinite">
            <mpath href="#fp" />
          </animateMotion>
        </circle>
        <circle r="1.4" fill="white" opacity="0.14">
          <animateMotion dur="20s" begin="0.5s" repeatCount="indefinite">
            <mpath href="#fp" />
          </animateMotion>
        </circle>
        <circle r="0.9" fill="white" opacity="0.08">
          <animateMotion dur="20s" begin="0.9s" repeatCount="indefinite">
            <mpath href="#fp" />
          </animateMotion>
        </circle>
        <circle r="0.5" fill="white" opacity="0.05">
          <animateMotion dur="20s" begin="1.3s" repeatCount="indefinite">
            <mpath href="#fp" />
          </animateMotion>
        </circle>

        {/* ── Avión (sleek commercial jet, nariz apunta +x) ── */}
        <g filter="url(#glow-strong)">
          <g>
            {/* Halo */}
            <circle r="4"   fill="#E91E8C" opacity="0.08" />
            <circle r="2.5" fill="white"   opacity="0.05" />
            {/* Fuselaje */}
            <path
              d="M 5.5 0 C 4.8 -0.5, 3 -0.7, 1.5 -0.7 L -3 -0.5 C -3.8 -0.45, -4.5 -0.3, -4.5 0 C -4.5 0.3, -3.8 0.45, -3 0.5 L 1.5 0.7 C 3 0.7, 4.8 0.5, 5.5 0 Z"
              fill="white" opacity="0.97"
            />
            {/* Alas swept-back */}
            <path d="M 0.5 -0.6 L -1.2 -4.8 L -2.5 -4.5 L -1.8 -0.55 Z" fill="white" opacity="0.9" />
            <path d="M 0.5  0.6 L -1.2  4.8 L -2.5  4.5 L -1.8  0.55 Z" fill="white" opacity="0.9" />
            {/* Engine pods */}
            <ellipse cx="-0.8" cy="-2.4" rx="0.9" ry="0.35" fill="white" opacity="0.75" />
            <ellipse cx="-0.8" cy=" 2.4" rx="0.9" ry="0.35" fill="white" opacity="0.75" />
            {/* Tail fin vertical */}
            <path d="M -3.2 -0.2 L -4.2 -2.2 L -4.8 -1.8 L -4 -0.15 Z" fill="white" opacity="0.82" />
            {/* Tail wings */}
            <path d="M -3.5 -0.3 L -4.5 -1.5 L -5 -1.2 L -4 -0.2 Z" fill="white" opacity="0.7" />
            <path d="M -3.5  0.3 L -4.5  1.5 L -5  1.2 L -4  0.2 Z" fill="white" opacity="0.7" />
            {/* Windshield accent */}
            <path
              d="M 4.8 -0.15 C 4.2 -0.35, 3.6 -0.38, 3.2 -0.3 L 3.4 0 L 3.2 0.3 C 3.6 0.38, 4.2 0.35, 4.8 0.15 Z"
              fill="#E91E8C" opacity="0.28"
            />
            <animateMotion dur="20s" repeatCount="indefinite" rotate="auto">
              <mpath href="#fp" />
            </animateMotion>
          </g>
        </g>

      </svg>
    </div>
  )
}
