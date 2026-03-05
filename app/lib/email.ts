/**
 * AMCABI Turismo — Email Sending Utility
 *
 * Uses Nodemailer with Gmail SMTP to send transactional emails.
 * Gracefully degrades when SMTP credentials are not configured.
 */

import nodemailer from 'nodemailer'
import { getBookingById } from '@/sanity/lib/fetchers'
import { buildBookingConfirmationHTML } from './email-templates/booking-confirmation'

/**
 * Send booking confirmation email when payment is marked as "paid".
 * Fire-and-forget: logs errors but never throws.
 */
export async function sendBookingConfirmationEmail(
  bookingId: string
): Promise<{ success: boolean; error?: string }> {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  if (!smtpUser || !smtpPass) {
    console.warn('[Email] SMTP_USER o SMTP_PASS no configuradas, saltando envío de email')
    return { success: false, error: 'Credenciales SMTP no configuradas' }
  }

  try {
    const booking = await getBookingById(bookingId)
    if (!booking) {
      console.error(`[Email] No se encontró la reserva ${bookingId}`)
      return { success: false, error: 'Reserva no encontrada' }
    }

    if (!booking.contactEmail) {
      console.warn(`[Email] Reserva ${booking.bookingNumber} sin email de contacto`)
      return { success: false, error: 'Sin email de contacto' }
    }

    const html = buildBookingConfirmationHTML(booking)
    const fromName = process.env.EMAIL_FROM_NAME ?? 'AMCABI Turismo'
    const destinationName = booking.departure?.destinationName ?? 'tu viaje'

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `${fromName} <${smtpUser}>`,
      to: booking.contactEmail,
      subject: `Reserva confirmada ${booking.bookingNumber} — ${destinationName} | AMCABI Turismo`,
      html,
    })

    console.log(`[Email] Email de confirmación enviado a ${booking.contactEmail} para reserva ${booking.bookingNumber}`)
    return { success: true }
  } catch (error) {
    console.error('[Email] Error al enviar email:', error)
    const message = error instanceof Error ? error.message : 'Error inesperado'
    return { success: false, error: message }
  }
}
