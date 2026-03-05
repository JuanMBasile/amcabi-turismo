/**
 * POST /api/reservar
 *
 * Booking submission endpoint.
 * Creates a new reservation in Sanity CMS (or returns demo booking number if no write token).
 */

import { createClient } from '@sanity/client'
import { type NextRequest, NextResponse } from 'next/server'
import type { BookingInput, BookingResponse } from '@/app/types'

interface BookingRequestBody extends BookingInput {
  /** Title used for booking number generation */
  departureTitle: string
  /** Calculated total price */
  totalPrice: number
}

/**
 * Generate a unique booking number
 * Format: {DEST_CODE}{YEAR}{RANDOM}
 * Example: BRC2026138064
 */
function generateBookingNumber(departureTitle: string): string {
  // Extract destination code from title (e.g., "Bariloche en avion" -> "BRC")
  const destCode = departureTitle
    .replace(/\|.*/, '')
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3)
    .padEnd(3, 'X')

  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `${destCode}${year}${random}`
}

export async function POST(request: NextRequest): Promise<NextResponse<BookingResponse>> {
  try {
    const body: BookingRequestBody = await request.json()

    // Validate required fields
    if (!body.departureId || !body.roomType || !body.passengers?.length) {
      return NextResponse.json(
        { success: false, error: 'Datos incompletos. Revise los campos obligatorios.' },
        { status: 400 }
      )
    }

    if (!body.contactEmail && !body.contactPhone) {
      return NextResponse.json(
        { success: false, error: 'Se requiere email o telefono de contacto.' },
        { status: 400 }
      )
    }

    // Validate passengers have required fields
    for (const passenger of body.passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.dni) {
        return NextResponse.json(
          { success: false, error: 'Todos los pasajeros deben tener nombre, apellido y DNI.' },
          { status: 400 }
        )
      }
    }

    // Check for Sanity write token
    const writeToken = process.env.SANITY_WRITE_TOKEN
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

    const bookingNumber = generateBookingNumber(body.departureTitle)

    // Demo mode: return mock booking number without persisting
    if (!writeToken || !projectId) {
      console.info('[Booking] Demo mode - returning mock booking number:', bookingNumber)
      return NextResponse.json({ success: true, bookingNumber })
    }

    // Create Sanity write client
    const writeClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      token: writeToken,
      useCdn: false,
    })

    // Create booking document in Sanity
    await writeClient.create({
      _type: 'booking',
      bookingNumber,
      departure: { _type: 'reference', _ref: body.departureId },
      roomType: body.roomType,
      infantCount: body.infantCount ?? 0,
      passengers: body.passengers.map((p) => ({
        _type: 'object',
        _key: Math.random().toString(36).slice(2, 9),
        firstName: p.firstName,
        lastName: p.lastName,
        dni: p.dni,
        birthDate: p.birthDate,
        embarkPoint: p.embarkPoint,
      })),
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      discountCode: body.discountCode,
      totalPrice: body.totalPrice,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, bookingNumber })
  } catch (err) {
    console.error('[Booking] Error creating booking:', err)
    return NextResponse.json(
      { success: false, error: 'Error al crear la reserva. Por favor intente nuevamente.' },
      { status: 500 }
    )
  }
}
