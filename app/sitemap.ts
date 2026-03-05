import type { MetadataRoute } from 'next'
import { getDestinationSlugs } from '@/sanity/lib/fetchers'

const BASE_URL = 'https://amcabiturismo.com.ar'

/**
 * XML Sitemap for AMCABI Turismo
 *
 * Includes:
 * - Homepage (priority 1.0)
 * - All static pages (priority 0.3-0.8)
 * - All destination pages dynamically (priority 0.85)
 * - Destinations listing page (priority 0.9)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetcher handles dual data source internally
  const slugs = await getDestinationSlugs()

  // Dynamic destination pages
  const destinationEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/destinos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/destinos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/consulta-reserva`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/consulta-voucher`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terminos-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticPages, ...destinationEntries]
}
