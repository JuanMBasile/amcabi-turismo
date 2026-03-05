/**
 * POST /api/revalidate
 *
 * Sanity webhook endpoint for on-demand ISR (Incremental Static Regeneration).
 * Called automatically when content changes in Sanity CMS.
 *
 * Setup in Sanity:
 * 1. Go to sanity.io/manage -> API -> Webhooks
 * 2. Create webhook pointing to: https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 * 3. Set SANITY_REVALIDATE_SECRET in Vercel environment variables
 */

import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

interface SanityWebhookBody {
  _type?: string
  _id?: string
  slug?: { current: string }
}

// Cache profile for on-demand revalidation (immediate expiry)
const REVALIDATE_PROFILE = { expire: 0 }

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    console.warn('[Revalidate] Invalid or missing secret')
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body: SanityWebhookBody = await request.json()
    const documentType = body?._type

    console.info(`[Revalidate] Received webhook for type: ${documentType}`)

    switch (documentType) {
      case 'destination':
        revalidateTag('destinations', REVALIDATE_PROFILE)
        // Also revalidate specific destination if slug is available
        if (body.slug?.current) {
          revalidateTag(`destination:${body.slug.current}`, REVALIDATE_PROFILE)
        }
        revalidatePath('/', 'page')
        revalidatePath('/destinos/[slug]', 'page')
        break

      case 'departure':
        revalidateTag('departures', REVALIDATE_PROFILE)
        revalidatePath('/', 'page')
        revalidatePath('/destinos/[slug]', 'page')
        revalidatePath('/reservar/[departureId]', 'page')
        break

      case 'promo':
        revalidateTag('promos', REVALIDATE_PROFILE)
        revalidatePath('/', 'page')
        break

      case 'service':
        revalidateTag('services', REVALIDATE_PROFILE)
        revalidatePath('/servicios', 'page')
        break

      case 'faq':
        revalidateTag('faqs', REVALIDATE_PROFILE)
        revalidatePath('/preguntas-frecuentes', 'page')
        break

      case 'booking':
        // Bookings are not cached, but we can revalidate related paths
        revalidatePath('/reserva/[bookingNumber]', 'page')
        break

      case 'voucher':
        revalidatePath('/voucher/[code]', 'page')
        break

      default:
        // Unknown document type - revalidate everything
        console.info('[Revalidate] Unknown type, revalidating all tags')
        revalidateTag('destinations', REVALIDATE_PROFILE)
        revalidateTag('departures', REVALIDATE_PROFILE)
        revalidateTag('promos', REVALIDATE_PROFILE)
        revalidateTag('services', REVALIDATE_PROFILE)
        revalidateTag('faqs', REVALIDATE_PROFILE)
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      type: documentType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Revalidate] Error processing webhook:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}

// Also support GET for testing (returns 405 in production)
export async function GET() {
  return NextResponse.json(
    { message: 'Use POST with webhook payload' },
    { status: 405 }
  )
}
