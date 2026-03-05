import type { MetadataRoute } from 'next'
import { getDestinationSlugs } from '@/sanity/lib/fetchers'

const BASE_URL = 'https://amcabiturismo.com.ar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetcher handles dual data source internally
  const slugs = await getDestinationSlugs()

  const destinationEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/destinos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...destinationEntries,
  ]
}
