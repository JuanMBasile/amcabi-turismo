/**
 * Booking Form Loading State
 *
 * Displays animated airplane Lottie while booking form loads.
 */
import { FullPageLoader } from '@/app/components/LottieLoader'

export default function BookingLoading() {
  return <FullPageLoader message="Cargando formulario de reserva..." />
}
