/**
 * AMCABI Turismo - Data Fetchers
 *
 * Implements the dual data source pattern:
 * - When NEXT_PUBLIC_SANITY_PROJECT_ID is set -> fetch from Sanity CMS
 * - Otherwise -> return static fallback data
 *
 * Every fetcher has both paths. Never assume Sanity is available.
 *
 * @example
 * import { getDestinations, getDepartureById } from '@/sanity/lib/fetchers'
 * const destinations = await getDestinations()
 */

import { client, urlFor } from './client'
import {
  DESTINATIONS_QUERY,
  DESTINATION_BY_SLUG_QUERY,
  DESTINATION_SLUGS_QUERY,
  DEPARTURES_QUERY,
  DEPARTURES_BY_DESTINATION_QUERY,
  DEPARTURE_BY_ID_QUERY,
  PROMOS_QUERY,
  SERVICES_QUERY,
  FAQS_QUERY,
  FAQS_BY_CATEGORY_QUERY,
  BOOKING_BY_NUMBER_QUERY,
  BOOKING_BY_NUMBER_AND_EMAIL_QUERY,
  BOOKING_BY_ID_QUERY,
  ALL_BOOKINGS_QUERY,
  VOUCHER_BY_CODE_QUERY,
  SITE_SETTINGS_QUERY,
} from './queries'
import type {
  Destination,
  Departure,
  Promo,
  Service,
  FAQ,
  Booking,
  Voucher,
  BookingInput,
  PaymentStatus,
  TransportType,
  RegimeType,
  SiteSettings,
} from '@/app/types'

// Static fallback data
import { destinations as fallbackDestinations } from '@/app/data/destinations'
import { departures as fallbackDepartures } from '@/app/data/departures'
import { promos as fallbackPromos } from '@/app/data/promos'
import { services as fallbackServices } from '@/app/data/services'
import { faqs as fallbackFaqs } from '@/app/data/faqs'

// ─── Environment Check ─────────────────────────────────────────────────────────

function hasSanity(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
}

// ─── Raw Sanity Types (before transformation) ──────────────────────────────────

interface SanityImageSource {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface SanityGalleryImage extends SanityImageSource {
  alt?: string
}

interface SanityDestinationRaw {
  slug: string
  name: string
  province: string
  priceFrom: number
  nights: number
  bestMonth: string
  includes: string[]
  image: SanityImageSource
  imageAlt: string
  description: string
  longDescription: string
  gallery?: SanityGalleryImage[]
  hotelName?: string
  hotelDescription?: string
  hotelGallery?: SanityGalleryImage[]
}

interface SanityDepartureRaw {
  _id: string
  title: string
  transport: string
  departureDate: string
  returnDate: string
  nights: number
  hotel?: string
  regime?: string
  pricePerPerson: number
  extraFees?: { label: string; amount: number }[]
  roomTypes: { type: string; surcharge: number; capacity: number }[]
  embarkPoints?: string[]
  maxPassengers?: number
  importantNotes?: string
  destination: {
    slug: string
    name: string
    image: SanityImageSource
    imageAlt: string
  }
}

interface SanityPromoRaw {
  id: string
  title: string
  subtitle?: string
  badge: string
  image: SanityImageSource
  imageAlt: string
  href: string
  destinationSlugs?: string[]
  cta: string
  featured?: boolean
}

interface SanityServiceRaw {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

interface SanityFAQRaw {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

interface SanityBookingRaw {
  _id: string
  bookingNumber: string
  departureId: string
  departure?: SanityDepartureRaw
  roomType: string
  infantCount: number
  passengers: {
    firstName: string
    lastName: string
    dni: string
    birthDate: string
    embarkPoint: string
  }[]
  contactEmail: string
  contactPhone: string
  discountCode?: string
  totalPrice: number
  paymentStatus: string
  notes?: string
  createdAt: string
}

interface SanityVoucherRaw {
  code: string
  booking: SanityBookingRaw
  validFrom: string
  validUntil: string
  qrData: string
  isUsed: boolean
}

// ─── Transformers ──────────────────────────────────────────────────────────────

function transformGallery(images: SanityGalleryImage[] | undefined, width: number) {
  if (!images?.length) return undefined
  return images.map((img) => ({
    image: urlFor(img).width(width).auto('format').quality(80).url(),
    imageAlt: img.alt ?? '',
  }))
}

function transformDestination(raw: SanityDestinationRaw, imageWidth = 640): Destination {
  return {
    slug: raw.slug,
    name: raw.name,
    province: raw.province,
    priceFrom: raw.priceFrom,
    nights: raw.nights,
    bestMonth: raw.bestMonth,
    includes: raw.includes,
    image: urlFor(raw.image).width(imageWidth).auto('format').quality(75).url(),
    imageAlt: raw.imageAlt,
    description: raw.description,
    longDescription: raw.longDescription,
    gallery: transformGallery(raw.gallery, imageWidth),
    hotelName: raw.hotelName,
    hotelDescription: raw.hotelDescription,
    hotelGallery: transformGallery(raw.hotelGallery, imageWidth),
  }
}

function transformDeparture(raw: SanityDepartureRaw, imageWidth = 640): Departure {
  return {
    _id: raw._id,
    title: raw.title,
    transport: raw.transport as TransportType,
    departureDate: raw.departureDate,
    returnDate: raw.returnDate,
    nights: raw.nights,
    hotel: raw.hotel,
    regime: raw.regime as RegimeType | undefined,
    pricePerPerson: raw.pricePerPerson,
    extraFees: raw.extraFees ?? [],
    roomTypes: raw.roomTypes ?? [],
    embarkPoints: raw.embarkPoints ?? [],
    maxPassengers: raw.maxPassengers ?? 40,
    importantNotes: raw.importantNotes,
    destinationSlug: raw.destination.slug,
    destinationName: raw.destination.name,
    destinationImage: urlFor(raw.destination.image).width(imageWidth).auto('format').quality(80).url(),
    destinationImageAlt: raw.destination.imageAlt,
  }
}

function transformPromo(raw: SanityPromoRaw): Promo {
  return {
    id: raw.id,
    title: raw.title,
    subtitle: raw.subtitle,
    badge: raw.badge,
    image: urlFor(raw.image).width(raw.featured ? 960 : 640).auto('format').quality(75).url(),
    imageAlt: raw.imageAlt,
    href: raw.href,
    destinationSlugs: raw.destinationSlugs?.length ? raw.destinationSlugs : undefined,
    cta: raw.cta,
    featured: raw.featured,
  }
}

function transformService(raw: SanityServiceRaw): Service {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    icon: raw.icon,
    features: raw.features,
  }
}

function transformFAQ(raw: SanityFAQRaw): FAQ {
  return {
    id: raw.id,
    question: raw.question,
    answer: raw.answer,
    category: raw.category,
    order: raw.order,
  }
}

function transformBooking(raw: SanityBookingRaw): Booking {
  return {
    _id: raw._id,
    bookingNumber: raw.bookingNumber,
    departureId: raw.departureId,
    departure: raw.departure ? transformDeparture(raw.departure) : undefined,
    roomType: raw.roomType,
    infantCount: raw.infantCount,
    passengers: raw.passengers,
    contactEmail: raw.contactEmail,
    contactPhone: raw.contactPhone,
    discountCode: raw.discountCode,
    totalPrice: raw.totalPrice,
    paymentStatus: raw.paymentStatus as Booking['paymentStatus'],
    notes: raw.notes,
    createdAt: raw.createdAt,
  }
}

function transformVoucher(raw: SanityVoucherRaw): Voucher {
  return {
    code: raw.code,
    booking: transformBooking(raw.booking),
    validFrom: raw.validFrom,
    validUntil: raw.validUntil,
    qrData: raw.qrData,
    isUsed: raw.isUsed,
  }
}

// ─── Destinations ──────────────────────────────────────────────────────────────

/**
 * Get all active destinations
 */
export async function getDestinations(): Promise<Destination[]> {
  if (!hasSanity()) {
    return fallbackDestinations
  }

  try {
    const raw: SanityDestinationRaw[] = await client.fetch(
      DESTINATIONS_QUERY,
      {},
      { next: { tags: ['destinations'] } }
    )
    return raw.map((d) => transformDestination(d, 640))
  } catch (error) {
    console.error('Failed to fetch destinations from Sanity:', error)
    return fallbackDestinations
  }
}

/**
 * Get a single destination by slug
 */
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (!hasSanity()) {
    return fallbackDestinations.find((d) => d.slug === slug) ?? null
  }

  try {
    const raw: SanityDestinationRaw | null = await client.fetch(
      DESTINATION_BY_SLUG_QUERY,
      { slug },
      { next: { tags: [`destination:${slug}`] } }
    )
    if (!raw) {
      return fallbackDestinations.find((d) => d.slug === slug) ?? null
    }
    return transformDestination(raw, 1200)
  } catch (error) {
    console.error(`Failed to fetch destination ${slug} from Sanity:`, error)
    return fallbackDestinations.find((d) => d.slug === slug) ?? null
  }
}

/**
 * Get all destination slugs (for generateStaticParams)
 */
export async function getDestinationSlugs(): Promise<string[]> {
  if (!hasSanity()) {
    return fallbackDestinations.map((d) => d.slug)
  }

  try {
    const results: { slug: string }[] = await client.fetch(DESTINATION_SLUGS_QUERY)
    return results.map((r) => r.slug)
  } catch (error) {
    console.error('Failed to fetch destination slugs from Sanity:', error)
    return fallbackDestinations.map((d) => d.slug)
  }
}

// ─── Departures ────────────────────────────────────────────────────────────────

/**
 * Get all active departures
 */
export async function getDepartures(): Promise<Departure[]> {
  if (!hasSanity()) {
    return fallbackDepartures
  }

  try {
    const raw: SanityDepartureRaw[] = await client.fetch(
      DEPARTURES_QUERY,
      {},
      { next: { tags: ['departures'] } }
    )
    return raw.map((d) => transformDeparture(d))
  } catch (error) {
    console.error('Failed to fetch departures from Sanity:', error)
    return fallbackDepartures
  }
}

/**
 * Get departures for a specific destination
 */
export async function getDeparturesByDestination(destinationSlug: string): Promise<Departure[]> {
  if (!hasSanity()) {
    return fallbackDepartures.filter((d) => d.destinationSlug === destinationSlug)
  }

  try {
    const raw: SanityDepartureRaw[] = await client.fetch(
      DEPARTURES_BY_DESTINATION_QUERY,
      { destinationSlug },
      { next: { tags: ['departures'] } }
    )
    return raw.map((d) => transformDeparture(d))
  } catch (error) {
    console.error(`Failed to fetch departures for ${destinationSlug} from Sanity:`, error)
    return fallbackDepartures.filter((d) => d.destinationSlug === destinationSlug)
  }
}

/**
 * Get a single departure by ID
 */
export async function getDepartureById(id: string): Promise<Departure | null> {
  if (!hasSanity()) {
    return fallbackDepartures.find((d) => d._id === id) ?? null
  }

  try {
    const raw: SanityDepartureRaw | null = await client.fetch(
      DEPARTURE_BY_ID_QUERY,
      { id },
      { next: { tags: ['departures'] } }
    )
    if (!raw) {
      return fallbackDepartures.find((d) => d._id === id) ?? null
    }
    return transformDeparture(raw, 1200)
  } catch (error) {
    console.error(`Failed to fetch departure ${id} from Sanity:`, error)
    return fallbackDepartures.find((d) => d._id === id) ?? null
  }
}

// ─── Promos ────────────────────────────────────────────────────────────────────

/**
 * Get all active promos
 */
export async function getPromos(): Promise<Promo[]> {
  if (!hasSanity()) {
    return fallbackPromos
  }

  try {
    const raw: SanityPromoRaw[] = await client.fetch(
      PROMOS_QUERY,
      {},
      { next: { tags: ['promos'] } }
    )
    return raw.map(transformPromo)
  } catch (error) {
    console.error('Failed to fetch promos from Sanity:', error)
    return fallbackPromos
  }
}

// ─── Services ──────────────────────────────────────────────────────────────────

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
  if (!hasSanity()) {
    return fallbackServices
  }

  try {
    const raw: SanityServiceRaw[] = await client.fetch(
      SERVICES_QUERY,
      {},
      { next: { tags: ['services'] } }
    )
    return raw.map(transformService)
  } catch (error) {
    console.error('Failed to fetch services from Sanity:', error)
    return fallbackServices
  }
}

// ─── FAQs ──────────────────────────────────────────────────────────────────────

/**
 * Get all FAQs
 */
export async function getFAQs(): Promise<FAQ[]> {
  if (!hasSanity()) {
    return fallbackFaqs
  }

  try {
    const raw: SanityFAQRaw[] = await client.fetch(
      FAQS_QUERY,
      {},
      { next: { tags: ['faqs'] } }
    )
    return raw.map(transformFAQ)
  } catch (error) {
    console.error('Failed to fetch FAQs from Sanity:', error)
    return fallbackFaqs
  }
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  if (!hasSanity()) {
    return fallbackFaqs.filter((f) => f.category === category)
  }

  try {
    const raw: SanityFAQRaw[] = await client.fetch(
      FAQS_BY_CATEGORY_QUERY,
      { category },
      { next: { tags: ['faqs'] } }
    )
    return raw.map(transformFAQ)
  } catch (error) {
    console.error(`Failed to fetch FAQs for category ${category} from Sanity:`, error)
    return fallbackFaqs.filter((f) => f.category === category)
  }
}

// ─── Bookings ──────────────────────────────────────────────────────────────────

/**
 * Create a new booking
 * Note: This requires SANITY_WRITE_TOKEN to be set
 * Returns booking number on success
 */
export async function createBooking(data: BookingInput): Promise<{ bookingNumber: string }> {
  // Generate booking number
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  const bookingNumber = `AMC-${year}-${random}`

  if (!hasSanity()) {
    // Demo mode: return mock booking number without persisting
    return { bookingNumber }
  }

  const writeToken = process.env.SANITY_WRITE_TOKEN
  if (!writeToken) {
    // No write token: return mock booking number
    return { bookingNumber }
  }

  try {
    const { createClient } = await import('@sanity/client')
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      token: writeToken,
      useCdn: false,
    })

    await writeClient.create({
      _type: 'booking',
      bookingNumber,
      departure: { _type: 'reference', _ref: data.departureId },
      roomType: data.roomType,
      infantCount: data.infantCount,
      passengers: data.passengers.map((p) => ({
        _type: 'object',
        _key: Math.random().toString(36).slice(2, 9),
        firstName: p.firstName,
        lastName: p.lastName,
        dni: p.dni,
        birthDate: p.birthDate,
        embarkPoint: p.embarkPoint,
      })),
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      discountCode: data.discountCode,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    })

    return { bookingNumber }
  } catch (error) {
    console.error('Failed to create booking in Sanity:', error)
    throw new Error('Error al crear la reserva')
  }
}

/**
 * Get booking by booking number
 */
export async function getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
  if (!hasSanity()) {
    // No fallback data for bookings
    return null
  }

  try {
    const raw: SanityBookingRaw | null = await client.fetch(
      BOOKING_BY_NUMBER_QUERY,
      { bookingNumber }
    )
    if (!raw) return null
    return transformBooking(raw)
  } catch (error) {
    console.error(`Failed to fetch booking ${bookingNumber} from Sanity:`, error)
    return null
  }
}

/**
 * Get booking by number and email (for lookup verification)
 */
export async function getBookingByNumberAndEmail(
  bookingNumber: string,
  email: string
): Promise<Booking | null> {
  if (!hasSanity()) {
    return null
  }

  try {
    const raw: SanityBookingRaw | null = await client.fetch(
      BOOKING_BY_NUMBER_AND_EMAIL_QUERY,
      { bookingNumber, email }
    )
    if (!raw) return null
    return transformBooking(raw)
  } catch (error) {
    console.error(`Failed to fetch booking ${bookingNumber} from Sanity:`, error)
    return null
  }
}

/**
 * Get a single booking by Sanity document _id.
 * Uses useCdn: false to get fresh data (used after status update for email).
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  if (!hasSanity()) {
    return null
  }

  try {
    const { createClient } = await import('@sanity/client')
    const freshClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      useCdn: false,
    })
    const raw: SanityBookingRaw | null = await freshClient.fetch(BOOKING_BY_ID_QUERY, { id })
    if (!raw) return null
    return transformBooking(raw)
  } catch (error) {
    console.error(`Failed to fetch booking ${id} from Sanity:`, error)
    return null
  }
}

/**
 * Get all bookings for admin panel.
 * NOTE: No static fallback — admin requires Sanity.
 * Uses useCdn: false to always get fresh data.
 */
export async function getAllBookings(): Promise<Booking[]> {
  if (!hasSanity()) {
    console.error('[Admin] getAllBookings called without Sanity configured')
    return []
  }

  try {
    const { createClient } = await import('@sanity/client')
    const freshClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      useCdn: false,
    })
    const raw: SanityBookingRaw[] = await freshClient.fetch(ALL_BOOKINGS_QUERY)
    return raw.map(transformBooking)
  } catch (error) {
    console.error('Failed to fetch all bookings from Sanity:', error)
    return []
  }
}

/**
 * Update payment status for a booking.
 * Requires SANITY_WRITE_TOKEN.
 */
export async function updateBookingPaymentStatus(
  bookingId: string,
  status: PaymentStatus
): Promise<{ success: boolean; error?: string }> {
  const writeToken = process.env.SANITY_WRITE_TOKEN
  if (!writeToken || !hasSanity()) {
    return { success: false, error: 'Sin permiso de escritura' }
  }

  try {
    const { createClient } = await import('@sanity/client')
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      token: writeToken,
      useCdn: false,
    })

    await writeClient.patch(bookingId).set({ paymentStatus: status }).commit()
    return { success: true }
  } catch (error) {
    console.error(`Failed to update payment status for ${bookingId}:`, error)
    return { success: false, error: 'Error al actualizar el estado' }
  }
}

// ─── Vouchers ──────────────────────────────────────────────────────────────────

/**
 * Get voucher by code
 */
export async function getVoucherByCode(code: string): Promise<Voucher | null> {
  if (!hasSanity()) {
    return null
  }

  try {
    const raw: SanityVoucherRaw | null = await client.fetch(
      VOUCHER_BY_CODE_QUERY,
      { code }
    )
    if (!raw) return null
    return transformVoucher(raw)
  } catch (error) {
    console.error(`Failed to fetch voucher ${code} from Sanity:`, error)
    return null
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────

/** Default site settings (all sections enabled) */
const defaultSiteSettings: SiteSettings = {
  showBookingBar: true,
  showPromos: true,
  showDestinations: true,
  showWhyUs: true,
}

/**
 * Get site settings (singleton document)
 * Returns defaults if Sanity is not configured or document doesn't exist
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanity()) {
    return defaultSiteSettings
  }

  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { tags: ['siteSettings'] } }
    )
    return { ...defaultSiteSettings, ...settings }
  } catch (error) {
    console.error('Failed to fetch site settings from Sanity:', error)
    return defaultSiteSettings
  }
}
