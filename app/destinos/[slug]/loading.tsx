/**
 * Destination Detail Loading State
 *
 * Displays animated airplane Lottie while destination data loads.
 */
import { FullPageLoader } from '@/app/components/LottieLoader'

export default function DestinationLoading() {
  return <FullPageLoader message="Cargando destino..." />
}
