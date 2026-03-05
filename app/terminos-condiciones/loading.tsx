/**
 * Términos y Condiciones Loading State
 *
 * Displays animated airplane Lottie while terms page loads.
 */
import { FullPageLoader } from '@/app/components/LottieLoader'

export default function TerminosCondicionesLoading() {
  return <FullPageLoader message="Cargando..." />
}
