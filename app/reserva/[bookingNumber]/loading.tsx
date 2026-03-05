/**
 * Booking Confirmation Loading State
 *
 * Displays animated airplane Lottie while confirmation data loads.
 */
import { FullPageLoader } from '@/app/components/LottieLoader'

export default function BookingConfirmationLoading() {
  return <FullPageLoader message="Cargando confirmación..." />
}
