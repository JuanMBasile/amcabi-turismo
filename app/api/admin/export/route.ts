// Excel export requires Node.js runtime (exceljs uses Buffer)
import { NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { verifyAdminCookie } from '../_auth'
import { getAllBookings } from '@/sanity/lib/fetchers'
import type { Booking, PaymentStatus } from '@/app/types'
import { PAYMENT_STATUS_LABELS, ROOM_TYPE_LABELS, TRANSPORT_LABELS } from '@/app/types'
import type { TransportType } from '@/app/types'

// ─── Color Constants ────────────────────────────────────────────────────────────

const COLORS = {
  paid: 'FF86EFAC',
  pending: 'FFFDE68A',
  cancelled: 'FFFCA5A5',
  header: 'FF1A0A12',
  headerFont: 'FFFFFFFF',
  totals: 'FFE91E8C',
  totalsFont: 'FFFFFFFF',
  sectionHeader: 'FFF3F4F6',
} as const

const STATUS_FILL: Record<PaymentStatus, ExcelJS.Fill> = {
  paid: { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.paid } },
  pending: { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.pending } },
  cancelled: { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.cancelled } },
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function formatDateExcel(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateTimeExcel(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function applyHeaderStyle(row: ExcelJS.Row, colCount: number) {
  row.font = { bold: true, color: { argb: COLORS.headerFont }, size: 10 }
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.header } }
  row.alignment = { vertical: 'middle' }
  for (let i = 1; i <= colCount; i++) {
    row.getCell(i).border = {
      bottom: { style: 'thin', color: { argb: 'FF333333' } },
    }
  }
}

function applyRowFill(row: ExcelJS.Row, status: PaymentStatus, colCount: number) {
  for (let i = 1; i <= colCount; i++) {
    row.getCell(i).fill = STATUS_FILL[status]
  }
}

// ─── Sheet Builders ─────────────────────────────────────────────────────────────

function buildAllBookingsSheet(wb: ExcelJS.Workbook, bookings: Booking[]) {
  const ws = wb.addWorksheet('Todas las Reservas')

  const columns = [
    { header: 'Nro Reserva', key: 'bookingNumber', width: 22 },
    { header: 'Estado', key: 'status', width: 14 },
    { header: 'Destino', key: 'destination', width: 22 },
    { header: 'Paquete', key: 'package', width: 35 },
    { header: 'Transporte', key: 'transport', width: 14 },
    { header: 'Fecha Salida', key: 'departure', width: 14 },
    { header: 'Fecha Regreso', key: 'return', width: 14 },
    { header: 'Habitación', key: 'room', width: 18 },
    { header: 'Pax', key: 'pax', width: 6 },
    { header: 'Menores', key: 'infants', width: 8 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Teléfono', key: 'phone', width: 16 },
    { header: 'Descuento', key: 'discount', width: 14 },
    { header: 'Precio Total', key: 'price', width: 18 },
    { header: 'Observaciones', key: 'notes', width: 40 },
    { header: 'Fecha Reserva', key: 'created', width: 20 },
  ]

  ws.columns = columns

  // Header
  applyHeaderStyle(ws.getRow(1), columns.length)

  // Data rows
  bookings.forEach((b) => {
    const row = ws.addRow({
      bookingNumber: b.bookingNumber,
      status: PAYMENT_STATUS_LABELS[b.paymentStatus],
      destination: b.departure?.destinationName ?? '',
      package: b.departure?.title ?? '',
      transport: b.departure?.transport ? (TRANSPORT_LABELS[b.departure.transport as TransportType] ?? b.departure.transport) : '',
      departure: formatDateExcel(b.departure?.departureDate ?? ''),
      return: formatDateExcel(b.departure?.returnDate ?? ''),
      room: ROOM_TYPE_LABELS[b.roomType] ?? b.roomType,
      pax: b.passengers.length,
      infants: b.infantCount,
      email: b.contactEmail,
      phone: b.contactPhone,
      discount: b.discountCode ?? '',
      price: b.totalPrice,
      notes: b.notes ?? '',
      created: formatDateTimeExcel(b.createdAt),
    })

    row.font = { size: 9 }
    applyRowFill(row, b.paymentStatus, columns.length)
  })

  // Format price column as currency
  ws.getColumn('price').numFmt = '$#,##0'

  // Totals row
  if (bookings.length > 0) {
    const lastDataRow = bookings.length + 1
    const totalsRow = ws.addRow({
      bookingNumber: 'TOTALES',
      pax: { formula: `SUM(I2:I${lastDataRow})` },
      price: { formula: `SUM(N2:N${lastDataRow})` },
    })
    totalsRow.font = { bold: true, color: { argb: COLORS.totalsFont }, size: 10 }
    for (let i = 1; i <= columns.length; i++) {
      totalsRow.getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.totals } }
    }
    totalsRow.getCell('price').numFmt = '$#,##0'
  }

  // Auto filter & freeze
  ws.autoFilter = { from: 'A1', to: `P${bookings.length + 1}` }
  ws.views = [{ state: 'frozen', ySplit: 1 }]
}

function buildByStatusSheet(wb: ExcelJS.Workbook, bookings: Booking[]) {
  const ws = wb.addWorksheet('Por Estado')

  const colHeaders = ['Nro Reserva', 'Destino', 'Paquete', 'Salida', 'Habitación', 'Pax', 'Email', 'Precio Total']
  const colWidths = [22, 22, 35, 14, 18, 6, 30, 18]
  ws.columns = colWidths.map((width, i) => ({ header: '', key: `col${i}`, width }))

  const sections: { label: string; status: PaymentStatus }[] = [
    { label: 'RESERVAS PAGADAS', status: 'paid' },
    { label: 'RESERVAS PENDIENTES', status: 'pending' },
    { label: 'RESERVAS CANCELADAS', status: 'cancelled' },
  ]

  sections.forEach(({ label, status }) => {
    const items = bookings.filter((b) => b.paymentStatus === status)

    // Section header
    const sectionRow = ws.addRow([label])
    sectionRow.font = { bold: true, size: 12 }
    sectionRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.sectionHeader } }

    // Column headers
    const headerRow = ws.addRow(colHeaders)
    applyHeaderStyle(headerRow, colHeaders.length)

    // Data
    items.forEach((b) => {
      const row = ws.addRow([
        b.bookingNumber,
        b.departure?.destinationName ?? '',
        b.departure?.title ?? '',
        formatDateExcel(b.departure?.departureDate ?? ''),
        ROOM_TYPE_LABELS[b.roomType] ?? b.roomType,
        b.passengers.length,
        b.contactEmail,
        b.totalPrice,
      ])
      row.font = { size: 9 }
      applyRowFill(row, status, colHeaders.length)
    })

    // Subtotal
    if (items.length > 0) {
      const subtotal = items.reduce((sum, b) => sum + b.totalPrice, 0)
      const subtotalRow = ws.addRow(['', '', '', '', '', items.length, '', subtotal])
      subtotalRow.font = { bold: true, size: 10 }
      subtotalRow.getCell(8).numFmt = '$#,##0'
    }

    // Blank separator
    ws.addRow([])
  })

  // Format price column
  ws.getColumn(8).numFmt = '$#,##0'
}

function buildPassengersSheet(wb: ExcelJS.Workbook, bookings: Booking[]) {
  const ws = wb.addWorksheet('Pasajeros')

  ws.columns = [
    { header: 'Nro Reserva', key: 'booking', width: 22 },
    { header: 'Nombre', key: 'firstName', width: 18 },
    { header: 'Apellido', key: 'lastName', width: 18 },
    { header: 'DNI', key: 'dni', width: 14 },
    { header: 'Fecha Nac', key: 'birthDate', width: 14 },
    { header: 'Punto Embarque', key: 'embarkPoint', width: 22 },
    { header: 'Destino', key: 'destination', width: 22 },
    { header: 'Fecha Salida', key: 'departureDate', width: 14 },
    { header: 'Estado Reserva', key: 'status', width: 14 },
  ]

  applyHeaderStyle(ws.getRow(1), 9)

  bookings.forEach((b) => {
    b.passengers.forEach((p) => {
      const row = ws.addRow({
        booking: b.bookingNumber,
        firstName: p.firstName,
        lastName: p.lastName,
        dni: p.dni,
        birthDate: formatDateExcel(p.birthDate),
        embarkPoint: p.embarkPoint,
        destination: b.departure?.destinationName ?? '',
        departureDate: formatDateExcel(b.departure?.departureDate ?? ''),
        status: PAYMENT_STATUS_LABELS[b.paymentStatus],
      })
      row.font = { size: 9 }
      applyRowFill(row, b.paymentStatus, 9)
    })
  })

  ws.autoFilter = { from: 'A1', to: `I${ws.rowCount}` }
  ws.views = [{ state: 'frozen', ySplit: 1 }]
}

// ─── Claude AI Analysis ─────────────────────────────────────────────────────────

interface BookingSummary {
  totalBookings: number
  totalRevenue: number
  byStatus: Record<PaymentStatus, { count: number; revenue: number }>
  byDestination: { name: string; count: number; revenue: number; avgPrice: number }[]
  avgBookingValue: number
  conversionRate: number
}

function buildSummaryForAI(bookings: Booking[]): BookingSummary {
  const byStatus: Record<PaymentStatus, { count: number; revenue: number }> = {
    paid: { count: 0, revenue: 0 },
    pending: { count: 0, revenue: 0 },
    cancelled: { count: 0, revenue: 0 },
  }

  const destMap = new Map<string, { count: number; revenue: number }>()

  bookings.forEach((b) => {
    byStatus[b.paymentStatus].count++
    byStatus[b.paymentStatus].revenue += b.totalPrice

    const dest = b.departure?.destinationName ?? 'Sin destino'
    const existing = destMap.get(dest) ?? { count: 0, revenue: 0 }
    existing.count++
    existing.revenue += b.totalPrice
    destMap.set(dest, existing)
  })

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const totalNonCancelled = byStatus.paid.count + byStatus.pending.count

  return {
    totalBookings: bookings.length,
    totalRevenue,
    byStatus,
    byDestination: Array.from(destMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        revenue: data.revenue,
        avgPrice: data.count > 0 ? Math.round(data.revenue / data.count) : 0,
      }))
      .sort((a, b) => b.count - a.count),
    avgBookingValue: bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0,
    conversionRate: totalNonCancelled > 0
      ? Math.round((byStatus.paid.count / totalNonCancelled) * 100)
      : 0,
  }
}

async function getAIAnalysis(bookings: Booking[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return 'Análisis IA no disponible. Configure ANTHROPIC_API_KEY en las variables de entorno para habilitar esta funcionalidad.'
  }

  if (bookings.length === 0) {
    return 'No hay reservas para analizar.'
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    const summary = buildSummaryForAI(bookings)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Sos el analista de datos de AMCABI Turismo, una agencia de viajes argentina.
Analizá los siguientes datos de reservas y generá un informe ejecutivo en español (es-AR) estructurado con estas secciones:

1. RESUMEN EJECUTIVO (3-4 oraciones sobre el estado general del negocio)
2. INGRESOS Y CONVERSIÓN (análisis de revenue, tasa de conversión, comparación entre estados)
3. DESTINOS MÁS POPULARES (ranking con observaciones sobre tendencias)
4. ALERTAS Y ANOMALÍAS (reservas canceladas inusuales, precios atípicos, concentraciones de riesgo)
5. RECOMENDACIONES ACCIONABLES (3-5 recomendaciones concretas para el equipo)

Datos:
${JSON.stringify(summary, null, 2)}

Respondé SOLO con el informe. Sin markdown, sin asteriscos, sin explicaciones adicionales.
Usá saltos de línea para separar secciones. Máximo 500 palabras.`,
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === 'text')
    return textBlock ? textBlock.text : 'No se pudo generar el análisis.'
  } catch (error) {
    console.error('Error al generar análisis IA:', error)
    return 'Error al generar el análisis IA. Verifique la configuración de ANTHROPIC_API_KEY.'
  }
}

function buildAnalysisSheet(wb: ExcelJS.Workbook, analysis: string) {
  const ws = wb.addWorksheet('Análisis IA')

  ws.columns = [{ key: 'content', width: 100 }]

  // Title
  const titleRow = ws.addRow(['ANÁLISIS INTELIGENTE DE RESERVAS'])
  titleRow.font = { bold: true, size: 16, color: { argb: COLORS.totalsFont } }
  titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.totals } }
  titleRow.height = 30
  titleRow.alignment = { vertical: 'middle' }

  // Subtitle
  const dateStr = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
  const subRow = ws.addRow([`Generado por Claude AI — ${dateStr}`])
  subRow.font = { italic: true, size: 10, color: { argb: 'FF888888' } }

  // Blank
  ws.addRow([''])

  // Analysis content
  const lines = analysis.split('\n')
  lines.forEach((line) => {
    const row = ws.addRow([line])
    row.font = { size: 10 }
    row.alignment = { wrapText: true }

    // Bold section headers (lines that are all caps)
    if (line.match(/^[A-ZÁÉÍÓÚÑ\s\d.]+$/) && line.trim().length > 3) {
      row.font = { bold: true, size: 11, color: { argb: 'FF1A0A12' } }
    }
  })
}

// ─── Route Handler ──────────────────────────────────────────────────────────────

export async function GET() {
  const isAdmin = await verifyAdminCookie()
  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const bookings = await getAllBookings()

    const wb = new ExcelJS.Workbook()
    wb.creator = 'AMCABI Turismo'
    wb.created = new Date()

    // Build sheets
    buildAllBookingsSheet(wb, bookings)
    buildByStatusSheet(wb, bookings)
    buildPassengersSheet(wb, bookings)

    // AI analysis
    const analysis = await getAIAnalysis(bookings)
    buildAnalysisSheet(wb, analysis)

    // Generate buffer
    const buffer = await wb.xlsx.writeBuffer()
    const dateStr = new Date().toISOString().slice(0, 10)

    return new Response(buffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="reservas-amcabi-${dateStr}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Error al generar Excel:', error)
    return NextResponse.json(
      { error: 'Error al generar el archivo Excel' },
      { status: 500 }
    )
  }
}
