import { NextResponse } from 'next/server'
import { verifyAdminCookie } from '../_auth'
import { updateBookingPaymentStatus } from '@/sanity/lib/fetchers'
import { sendBookingConfirmationEmail } from '@/app/lib/email'
import type { PaymentStatus } from '@/app/types'

const VALID_STATUSES: PaymentStatus[] = ['pending', 'paid', 'cancelled']

export async function PATCH(request: Request) {
  const isAdmin = await verifyAdminCookie()
  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { bookingId, status } = body as { bookingId?: string; status?: string }

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'bookingId y status son requeridos' },
        { status: 400 }
      )
    }

    if (!VALID_STATUSES.includes(status as PaymentStatus)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      )
    }

    const result = await updateBookingPaymentStatus(bookingId, status as PaymentStatus)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? 'Error al actualizar' },
        { status: 500 }
      )
    }

    // Fire-and-forget: send confirmation email when marked as paid
    if (status === 'paid') {
      sendBookingConfirmationEmail(bookingId).then((result) => {
        if (!result.success) {
          console.warn(`[UpdateStatus] Email no enviado para ${bookingId}: ${result.error}`)
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
