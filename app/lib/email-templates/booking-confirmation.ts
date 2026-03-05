/**
 * AMCABI Turismo — Booking Confirmation Email Template
 *
 * HTML email template with inline CSS for maximum email client compatibility.
 * Uses the AMCABI geometric banner (guarda) matching the voucher page design.
 */

import type { Booking } from '@/app/types'
import { TRANSPORT_LABELS, REGIME_LABELS, ROOM_TYPE_LABELS } from '@/app/types'

// ─── Brand Colors ────────────────────────────────────────────────────────────

const PURPLE = '#7C3AED'
const PINK = '#E91E8C'
const CYAN = '#22D3EE'
const YELLOW = '#FBD000'
const INK = '#1A0A12'
const INK_MUTED = '#5A3A4A'
const INK_FAINT = '#C4A8B4'
const SURFACE = '#FFFFFF'
const PAGE_BG = '#F8F5F6'

const FONT = "'Montserrat', Arial, Helvetica, sans-serif"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatLongDate(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('es-AR')}`
}

// ─── SVG Banner (Guarda geométrica AMCABI) ──────────────────────────────────

const BANNER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 140" preserveAspectRatio="none" style="display:block;width:100%;height:120px;">
  <rect width="1200" height="140" fill="${PURPLE}" />
  <polygon points="0,0 400,0 200,140 0,140" fill="${PINK}" opacity="0.85" />
  <polygon points="300,0 700,0 500,140" fill="${YELLOW}" opacity="0.7" />
  <polygon points="800,0 1200,0 1200,140 1000,60" fill="${CYAN}" opacity="0.75" />
  <polygon points="600,0 900,0 1000,140 700,140" fill="${PINK}" opacity="0.5" />
  <polygon points="0,0 150,0 0,80" fill="${CYAN}" opacity="0.6" />
  <polygon points="1050,0 1200,0 1200,50" fill="${YELLOW}" opacity="0.5" />
</svg>
`

const FOOTER_BANNER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" preserveAspectRatio="none" style="display:block;width:100%;height:50px;">
  <rect width="1200" height="60" fill="${PURPLE}" />
  <polygon points="0,0 200,0 100,60 0,60" fill="${PINK}" opacity="0.85" />
  <polygon points="150,0 350,0 250,60" fill="${YELLOW}" opacity="0.7" />
  <polygon points="400,0 600,0 600,60 500,30" fill="${CYAN}" opacity="0.75" />
  <polygon points="700,0 900,0 850,60 650,60" fill="${PINK}" opacity="0.5" />
  <polygon points="900,0 1200,0 1200,60 1000,60" fill="${CYAN}" opacity="0.6" />
  <polygon points="1100,0 1200,0 1200,30" fill="${YELLOW}" opacity="0.5" />
</svg>
`

// ─── Section Helper ─────────────────────────────────────────────────────────

function section(title: string, iconColor: string, content: string): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td style="background:${SURFACE};border:1px solid #E5DDE0;border-radius:12px;padding:24px;">
        <h2 style="font-family:${FONT};font-weight:800;font-size:16px;color:${INK};margin:0 0 16px 0;padding-bottom:12px;border-bottom:2px solid ${iconColor};">
          ${title}
        </h2>
        ${content}
      </td>
    </tr>
  </table>`
}

function infoRow(label: string, value: string): string {
  return `
  <tr>
    <td style="font-family:${FONT};font-size:13px;color:${INK_MUTED};padding:6px 12px 6px 0;border-bottom:1px solid #F0ECF0;">${label}</td>
    <td style="font-family:${FONT};font-size:13px;color:${INK};font-weight:600;padding:6px 0;border-bottom:1px solid #F0ECF0;text-align:right;">${value}</td>
  </tr>`
}

// ─── Main Template Builder ──────────────────────────────────────────────────

export function buildBookingConfirmationHTML(booking: Booking): string {
  const dep = booking.departure
  const transportLabel = dep?.transport ? (TRANSPORT_LABELS[dep.transport] ?? dep.transport) : null
  const regimeLabel = dep?.regime ? (REGIME_LABELS[dep.regime] ?? dep.regime) : null
  const roomLabel = ROOM_TYPE_LABELS[booking.roomType] ?? booking.roomType

  // ── Build sections ──

  // 1. Confirmation header
  const confirmationSection = `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td style="background:linear-gradient(135deg, #F0FFF4, #ECFDF5);border:2px solid #86EFAC;border-radius:12px;padding:28px;text-align:center;">
        <div style="font-size:40px;margin-bottom:8px;">&#10003;</div>
        <h1 style="font-family:${FONT};font-weight:900;font-size:22px;color:#166534;margin:0 0 8px 0;">
          RESERVA CONFIRMADA
        </h1>
        <p style="font-family:${FONT};font-size:14px;color:#15803D;margin:0 0 16px 0;">
          Tu pago fue registrado exitosamente
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr>
            <td style="background:${SURFACE};border:1px solid #BBF7D0;border-radius:8px;padding:10px 24px;">
              <span style="font-family:${FONT};font-size:11px;color:${INK_MUTED};text-transform:uppercase;letter-spacing:2px;">Nº de reserva</span><br/>
              <span style="font-family:${FONT};font-weight:900;font-size:20px;color:${INK};letter-spacing:1px;">${booking.bookingNumber}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`

  // 2. Trip details
  let tripRows = ''
  if (dep) {
    tripRows += infoRow('Destino', dep.destinationName ?? dep.title)
    if (dep.hotel) tripRows += infoRow('Hotel', dep.hotel)
    if (transportLabel) tripRows += infoRow('Transporte', transportLabel)
    if (regimeLabel) tripRows += infoRow('Régimen', regimeLabel)
    tripRows += infoRow('Habitación', roomLabel)
    if (dep.nights) tripRows += infoRow('Duración', `${dep.nights} noches`)
    tripRows += infoRow('Salida', formatLongDate(dep.departureDate))
    tripRows += infoRow('Regreso', formatLongDate(dep.returnDate))
  }
  const tripSection = section('Datos del viaje', PINK, `<table width="100%" cellpadding="0" cellspacing="0">${tripRows}</table>`)

  // 3. Payment details
  let paymentRows = ''
  if (dep) {
    paymentRows += infoRow('Precio por persona', formatPrice(dep.pricePerPerson))
    if (dep.extraFees?.length) {
      for (const fee of dep.extraFees) {
        paymentRows += infoRow(fee.label, formatPrice(fee.amount))
      }
    }
  }
  paymentRows += `
  <tr>
    <td style="font-family:${FONT};font-size:15px;color:${INK};font-weight:800;padding:12px 12px 6px 0;">TOTAL</td>
    <td style="font-family:${FONT};font-size:18px;color:${PURPLE};font-weight:900;padding:12px 0 6px;text-align:right;">${formatPrice(booking.totalPrice)}</td>
  </tr>`
  const paymentSection = section('Detalle de pago', YELLOW, `<table width="100%" cellpadding="0" cellspacing="0">${paymentRows}</table>`)

  // 4. Passengers
  let passengerCards = ''
  for (let i = 0; i < booking.passengers.length; i++) {
    const pax = booking.passengers[i]
    passengerCards += `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:${i < booking.passengers.length - 1 ? '12' : '0'}px;">
      <tr>
        <td style="background:${PAGE_BG};border:1px solid #E5DDE0;border-radius:10px;padding:16px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:${FONT};font-weight:700;font-size:14px;color:${INK};padding-bottom:8px;">
                <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${PINK}15;color:${PINK};text-align:center;line-height:24px;font-size:11px;font-weight:800;margin-right:8px;">${i + 1}</span>
                ${pax.lastName}, ${pax.firstName}
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:${FONT};font-size:12px;color:${INK_MUTED};padding:3px 0;">DNI</td>
                    <td style="font-family:${FONT};font-size:12px;color:${INK};font-weight:600;text-align:right;padding:3px 0;">${pax.dni}</td>
                  </tr>
                  ${pax.birthDate ? `<tr>
                    <td style="font-family:${FONT};font-size:12px;color:${INK_MUTED};padding:3px 0;">Nacimiento</td>
                    <td style="font-family:${FONT};font-size:12px;color:${INK};font-weight:600;text-align:right;padding:3px 0;">${formatDate(pax.birthDate)}</td>
                  </tr>` : ''}
                  ${pax.embarkPoint ? `<tr>
                    <td style="font-family:${FONT};font-size:12px;color:${INK_MUTED};padding:3px 0;">Embarque</td>
                    <td style="font-family:${FONT};font-size:12px;color:${INK};font-weight:600;text-align:right;padding:3px 0;">${pax.embarkPoint}</td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
  }
  const passengersSection = section(`Pasajeros (${booking.passengers.length})`, CYAN, passengerCards)

  // 5. Banking info
  const bankingContent = `
  <table width="100%" cellpadding="0" cellspacing="0">
    ${infoRow('Banco', 'GALICIA')}
    ${infoRow('Titular', 'FENIX OPERADORES TURÍSTICOS')}
    ${infoRow('Cuenta corriente', '5450-2 332-9')}
    ${infoRow('Alias', 'FRASCO.DOCENA.TRUCO')}
    ${infoRow('CBU', '0070332920000005450293')}
    ${infoRow('CUIT', '30-71614420-4')}
  </table>
  <p style="font-family:${FONT};font-size:11px;color:${INK_MUTED};margin:12px 0 0;padding-top:12px;border-top:1px solid #E5DDE0;">
    Enviá el comprobante de transferencia por WhatsApp al
    <a href="https://wa.me/5491162203682" style="color:${PINK};text-decoration:none;font-weight:600;">+54 9 11 6220-3682</a>
  </p>`
  const bankingSection = section('Datos bancarios para pagos', PURPLE, bankingContent)

  // 6. Important info
  const importantContent = `
  <ul style="font-family:${FONT};font-size:13px;color:${INK_MUTED};margin:0;padding-left:20px;line-height:1.8;">
    <li style="margin-bottom:8px;">El <strong style="color:${INK};">saldo restante</strong> debe ser abonado <strong style="color:${INK};">10 días antes de la salida</strong>.</li>
    <li style="margin-bottom:8px;">Menores de edad que no viajen con ambos padres deben presentar <strong style="color:${INK};">autorización notarial</strong> y <strong style="color:${INK};">DNI físico vigente</strong>.</li>
    <li style="margin-bottom:8px;">Para viajes a <strong style="color:${INK};">Brasil, Uruguay o Paraguay</strong> se requiere documentación adicional (pasaporte o DNI tarjeta vigente según destino).</li>
    <li style="margin-bottom:8px;">Presentarse en el punto de embarque con <strong style="color:${INK};">30 minutos de anticipación</strong>.</li>
    <li>Ante cualquier duda, contactanos por <a href="https://wa.me/5491162203682" style="color:${PINK};text-decoration:none;font-weight:600;">WhatsApp</a> o a <a href="mailto:ventas@amcabiturismo.com.ar" style="color:${PINK};text-decoration:none;font-weight:600;">ventas@amcabiturismo.com.ar</a>.</li>
  </ul>`
  const importantSection = `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;padding:24px;">
        <h2 style="font-family:${FONT};font-weight:800;font-size:16px;color:${INK};margin:0 0 16px 0;padding-bottom:12px;border-bottom:2px solid ${YELLOW};">
          Información importante
        </h2>
        ${importantContent}
      </td>
    </tr>
  </table>`

  // 7. Terms & conditions
  const termsSection = `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td style="background:${PAGE_BG};border:1px solid #E5DDE0;border-radius:12px;padding:20px;">
        <h2 style="font-family:${FONT};font-weight:700;font-size:13px;color:${INK_MUTED};margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">
          Términos y condiciones
        </h2>
        <div style="font-family:${FONT};font-size:11px;color:${INK_FAINT};line-height:1.7;">
          <p style="margin:0 0 8px;">Los servicios contratados están sujetos a las condiciones generales de AMCABI Turismo (Legajo EVT 14703, Disp. N° 307/11). La reserva se considera confirmada una vez registrado el pago total.</p>
          <p style="margin:0 0 8px;">Las tarifas publicadas son en pesos argentinos e incluyen IVA. No incluyen gastos personales, excursiones opcionales ni servicios no especificados en el detalle del paquete.</p>
          <p style="margin:0 0 8px;">Cancelaciones: hasta 30 días antes de la salida se reembolsa el 80% del total. Entre 29 y 15 días, el 50%. Menos de 15 días, no hay reembolso.</p>
          <p style="margin:0;">AMCABI Turismo se reserva el derecho de modificar itinerarios por razones de fuerza mayor, climáticas o de seguridad, ofreciendo alternativas equivalentes.</p>
        </div>
      </td>
    </tr>
  </table>`

  // ── Assemble full email ──

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Reserva Confirmada - ${booking.bookingNumber}</title>
  <!--[if mso]>
  <style type="text/css">
    table { border-collapse: collapse; }
    .fallback-font { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${PAGE_BG};font-family:${FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE_BG};">
    <tr>
      <td align="center" style="padding:0;">
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${SURFACE};border-radius:0;">

          <!-- Header Banner -->
          <tr>
            <td style="padding:0;line-height:0;">
              ${BANNER_SVG}
            </td>
          </tr>

          <!-- Logo overlay -->
          <tr>
            <td style="background:${PURPLE};padding:0 24px 20px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:${FONT};font-weight:800;font-style:italic;font-size:28px;color:#FFFFFF;letter-spacing:0.5px;">
                    amcabi<span style="font-weight:500;font-size:16px;color:rgba(255,255,255,0.7);">.com</span>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${FONT};font-size:9px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;">
                    LEGAJO N° 14703 &middot; DISP. N° 307/11
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px;">
              ${confirmationSection}
              ${dep ? tripSection : ''}
              ${paymentSection}
              ${passengersSection}
              ${bankingSection}
              ${importantSection}
              ${termsSection}
            </td>
          </tr>

          <!-- Footer Banner -->
          <tr>
            <td style="padding:0;line-height:0;">
              ${FOOTER_BANNER_SVG}
            </td>
          </tr>

          <!-- Footer text -->
          <tr>
            <td style="background:${PURPLE};padding:16px 24px 20px;text-align:center;">
              <p style="font-family:${FONT};font-size:12px;color:rgba(255,255,255,0.7);margin:0 0 4px;">
                AMCABI Turismo &middot; Legajo EVT 14703
              </p>
              <p style="font-family:${FONT};font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 8px;">
                <a href="mailto:ventas@amcabiturismo.com.ar" style="color:rgba(255,255,255,0.7);text-decoration:none;">ventas@amcabiturismo.com.ar</a>
                &middot;
                <a href="https://wa.me/5491162203682" style="color:rgba(255,255,255,0.7);text-decoration:none;">+54 9 11 6220-3682</a>
              </p>
              <p style="font-family:${FONT};font-size:10px;color:rgba(255,255,255,0.35);margin:0;">
                &copy; ${new Date().getFullYear()} AMCABI Turismo. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
