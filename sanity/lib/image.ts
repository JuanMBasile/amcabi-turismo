/**
 * Sanity Image URL Builder
 *
 * Utility for generating optimized image URLs from Sanity assets.
 * Re-exported from client.ts for convenience, but also available
 * directly for explicit imports.
 *
 * @example
 * import { urlFor } from '@/sanity/lib/image'
 * const url = urlFor(image).width(640).auto('format').quality(75).url()
 */

export { urlFor } from './client'
