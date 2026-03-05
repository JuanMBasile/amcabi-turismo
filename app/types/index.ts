/**
 * AMCABI Turismo — Shared TypeScript Types
 *
 * This file contains all shared types used across the application.
 * Import from '@/app/types' in components and fetchers.
 *
 * @example
 * import type { Destination, Departure, Booking } from '@/app/types'
 */

// ─── Transport & Regime Types ────────────────────────────────────────────────

export type TransportType = 'bus_semicama' | 'avion' | 'bus_cama'

export type RegimeType = 'desayuno' | 'media_pension' | 'all_inclusive' | 'sin_comidas'

export type PaymentStatus = 'pending' | 'paid' | 'cancelled'

// ─── Label Maps (Spanish) ────────────────────────────────────────────────────

export const TRANSPORT_LABELS: Record<TransportType, string> = {
  bus_semicama: 'Bus semicama',
  avion: 'Avión',
  bus_cama: 'Bus cama',
}

export const REGIME_LABELS: Record<RegimeType, string> = {
  desayuno: 'Desayuno incluido',
  media_pension: 'Media pensión',
  all_inclusive: 'Todo incluido',
  sin_comidas: 'Sin comidas',
}

export const ROOM_TYPE_LABELS: Record<string, string> = {
  doble: 'Habitación doble',
  triple: 'Habitación triple',
  cuadruple: 'Habitación cuádruple',
  individual: 'Habitación individual',
}

export const ROOM_TYPE_CAPACITY: Record<string, number> = {
  doble: 2,
  triple: 3,
  cuadruple: 4,
  individual: 1,
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  cancelled: 'Cancelado',
}

// ─── Destination ─────────────────────────────────────────────────────────────

export interface Destination {
  /** URL slug: "bariloche", "cataratas" */
  slug: string
  /** Display name: "Bariloche" */
  name: string
  /** Province: "Río Negro" */
  province: string
  /** Minimum price in ARS */
  priceFrom: number
  /** Typical stay duration in nights */
  nights: number
  /** Best months to visit: "Jul · Ago · Ene · Feb" */
  bestMonth: string
  /** What's included in the package */
  includes: string[]
  /** Image URL (resolved from Sanity or static) */
  image: string
  /** Spanish alt text for accessibility */
  imageAlt: string
  /** Short description (1-2 sentences) */
  description: string
  /** Full description for detail page */
  longDescription: string
  /** Gallery of destination photos */
  gallery?: { image: string; imageAlt: string }[]
  /** Hotel name */
  hotelName?: string
  /** Hotel description */
  hotelDescription?: string
  /** Gallery of hotel photos */
  hotelGallery?: { image: string; imageAlt: string }[]
}

// ─── Extra Fee ───────────────────────────────────────────────────────────────

export interface ExtraFee {
  /** Fee description: "tasa de embarque" */
  label: string
  /** Amount in ARS */
  amount: number
}

// ─── Room Type ───────────────────────────────────────────────────────────────

export interface RoomType {
  /** Room type identifier: "doble", "triple", etc. */
  type: string
  /** Additional cost in ARS (0 for base room) */
  surcharge: number
  /** Maximum occupants */
  capacity: number
}

// ─── Departure ───────────────────────────────────────────────────────────────

export interface Departure {
  /** Unique identifier */
  _id: string
  /** Display title: "Bariloche en avión | Marzo 2026" */
  title: string
  /** Linked destination slug */
  destinationSlug: string
  /** Denormalized destination name for display */
  destinationName: string
  /** Destination hero image URL */
  destinationImage: string
  /** Alt text for destination image */
  destinationImageAlt: string
  /** Transport mode */
  transport: TransportType
  /** Departure date in ISO format: "2026-03-19" */
  departureDate: string
  /** Return date in ISO format: "2026-03-26" */
  returnDate: string
  /** Trip duration in nights */
  nights: number
  /** Hotel name and category */
  hotel?: string
  /** Meal plan type */
  regime?: RegimeType
  /** Base price per person in ARS */
  pricePerPerson: number
  /** Additional fees (embarque, administrativos, etc.) */
  extraFees: ExtraFee[]
  /** Available room configurations */
  roomTypes: RoomType[]
  /** Pickup locations */
  embarkPoints: string[]
  /** Maximum passenger capacity */
  maxPassengers: number
  /** Important notes for customers */
  importantNotes?: string
}

// ─── Passenger ───────────────────────────────────────────────────────────────

export interface Passenger {
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Argentine ID number (DNI) */
  dni: string
  /** Date of birth in ISO format */
  birthDate: string
  /** Selected pickup location */
  embarkPoint: string
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface Booking {
  /** Sanity document ID */
  _id: string
  /** Booking number: "AMC-2026-00001" */
  bookingNumber: string
  /** Reference to departure ID */
  departureId: string
  /** Expanded departure data (when fetched) */
  departure?: Departure
  /** Selected room type */
  roomType: string
  /** Number of infants under 2 (free) */
  infantCount: number
  /** List of travelers */
  passengers: Passenger[]
  /** Primary contact email */
  contactEmail: string
  /** Primary contact phone */
  contactPhone: string
  /** Applied discount code */
  discountCode?: string
  /** Calculated total in ARS */
  totalPrice: number
  /** Payment status */
  paymentStatus: PaymentStatus
  /** Internal notes */
  notes?: string
  /** Creation timestamp in ISO format */
  createdAt: string
}

// ─── Booking Input (for API submission) ──────────────────────────────────────

export interface BookingInput {
  /** Departure ID to book */
  departureId: string
  /** Selected room type */
  roomType: string
  /** Number of infants under 2 */
  infantCount: number
  /** Passenger details */
  passengers: Passenger[]
  /** Contact email */
  contactEmail: string
  /** Contact phone */
  contactPhone: string
  /** Optional discount code */
  discountCode?: string
}

// ─── Promo ───────────────────────────────────────────────────────────────────

export interface Promo {
  /** Unique identifier */
  id: string
  /** Promo title: "Semana Santa 2026" */
  title: string
  /** Subtitle: "Escapate del 14 al 21 de abril" */
  subtitle?: string
  /** Badge text: "PREVENTA", "OUTLET", "NUEVO" */
  badge: string
  /** Banner image URL */
  image: string
  /** Spanish alt text */
  imageAlt: string
  /** Link target (internal path or external URL) */
  href: string
  /** Destination slugs for multi-destination promos */
  destinationSlugs?: string[]
  /** CTA button text: "Ver paquetes" */
  cta: string
  /** Show in large featured slot */
  featured?: boolean
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface Service {
  /** Unique identifier */
  id: string
  /** Service title: "Viajes grupales" */
  title: string
  /** Service description */
  description: string
  /** Icon identifier for rendering */
  icon: string
  /** Key features/benefits */
  features: string[]
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQ {
  /** Unique identifier */
  id: string
  /** Question in Spanish */
  question: string
  /** Answer in Spanish (may contain HTML) */
  answer: string
  /** Optional category for grouping */
  category?: string
  /** Display order (lower = first) */
  order: number
}

// ─── Voucher ─────────────────────────────────────────────────────────────────

export interface Voucher {
  /** Voucher code: "V-2026-00001" */
  code: string
  /** Full booking details */
  booking: Booking
  /** Validity start date in ISO format */
  validFrom: string
  /** Validity end date in ISO format */
  validUntil: string
  /** Data encoded in QR code */
  qrData: string
  /** Whether voucher has been used */
  isUsed: boolean
}

// ─── Contact Form ────────────────────────────────────────────────────────────

export interface ContactFormData {
  /** Sender name */
  name: string
  /** Sender email */
  email: string
  /** Optional phone number */
  phone?: string
  /** Message content */
  message: string
  /** Optional subject line */
  subject?: string
}

// ─── Site Settings ──────────────────────────────────────────────────────────

export interface SiteSettings {
  /** Show the booking bar / reservation form */
  showBookingBar: boolean
  /** Show promos / offers section */
  showPromos: boolean
  /** Show destinations grid */
  showDestinations: boolean
  /** Show "Why choose us" section */
  showWhyUs: boolean
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface BookingResponse {
  success: boolean
  bookingNumber?: string
  error?: string
}

export interface ContactResponse {
  success: boolean
  message?: string
  error?: string
}

// ─── Component Props Patterns ────────────────────────────────────────────────

/**
 * Base props for components with children
 */
export interface WithChildren {
  children: React.ReactNode
}

/**
 * Base props for components with optional className
 */
export interface WithClassName {
  className?: string
}

/**
 * Common props pattern combining children and className
 */
export interface BaseComponentProps extends WithChildren, WithClassName {}
