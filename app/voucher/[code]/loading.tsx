/**
 * Voucher Loading State
 *
 * Displays animated airplane Lottie while voucher data loads.
 */
import { FullPageLoader } from '@/app/components/LottieLoader'

export default function VoucherLoading() {
  return <FullPageLoader message="Cargando voucher..." />
}
