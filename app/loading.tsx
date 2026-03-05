/**
 * Global Loading State
 *
 * Displays animated airplane Lottie while route segments load.
 */
import { FullPageLoader } from './components/LottieLoader'

export default function GlobalLoading() {
  return <FullPageLoader message="Cargando..." />
}
