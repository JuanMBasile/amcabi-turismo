/**
 * Sanity Library Index
 *
 * Central export point for Sanity client, utilities, and fetchers.
 *
 * @example
 * import { client, urlFor, getDestinations } from '@/sanity/lib'
 */

// Client & Image utilities
export { client, urlFor } from './client'

// All fetchers
export {
  // Destinations
  getDestinations,
  getDestinationBySlug,
  getDestinationSlugs,
  // Departures
  getDepartures,
  getDeparturesByDestination,
  getDepartureById,
  // Promos
  getPromos,
  // Services
  getServices,
  // FAQs
  getFAQs,
  getFAQsByCategory,
  // Bookings
  createBooking,
  getBookingByNumber,
  getBookingByNumberAndEmail,
  // Vouchers
  getVoucherByCode,
  // Site Settings
  getSiteSettings,
} from './fetchers'

// Queries (for advanced use cases)
export * from './queries'
