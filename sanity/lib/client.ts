import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Sanitize the projectId: Sanity only allows a-z, 0-9 and dashes
const rawId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '').trim()
const projectId = /^[a-z0-9-]+$/.test(rawId) ? rawId : 'placeholder'

export const client = createClient({
  projectId,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production').trim(),
  apiVersion: '2025-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: object) {
  return builder.image(source)
}
