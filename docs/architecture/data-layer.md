# AMCABI Turismo — Data Layer Architecture

## Overview

The data layer implements a **dual data source** pattern:
1. **Sanity CMS** — Primary source when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. **Static Fallback** — TypeScript data files in `app/data/` when Sanity is unavailable

This ensures the site always works, even without CMS configuration.

## Dual Data Source Pattern

Every fetcher MUST implement both paths:

```typescript
export async function getDestinations(): Promise<Destination[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackDestinations
  }
  return client.fetch(destinationsQuery)
}
```

## Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Sanity CMS     │────▶│  Fetcher Layer   │────▶│  Components     │
│  (Production)   │     │  (sanity/lib/)   │     │  (app/)         │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               │ Fallback
                               ▼
                        ┌──────────────────┐
                        │  Static Data     │
                        │  (app/data/)     │
                        └──────────────────┘
```

## Core Types

### Destination

```typescript
interface Destination {
  slug: string           // URL slug: "bariloche", "cataratas"
  name: string           // Display name: "Bariloche"
  province: string       // Province: "Río Negro"
  priceFrom: number      // Minimum price in ARS
  nights: number         // Typical stay duration
  bestMonth: string      // Best months: "Jul · Ago · Ene · Feb"
  includes: string[]     // What's included
  image: string          // Image URL (resolved from Sanity or static)
  imageAlt: string       // Spanish alt text
  description: string    // Short description (1-2 sentences)
  longDescription: string // Full description for detail page
}
```

### Departure

```typescript
interface Departure {
  _id: string                    // Unique ID
  title: string                  // "Bariloche en avión | Marzo 2026"
  destinationSlug: string        // Links to Destination
  destinationName: string        // Denormalized for display
  destinationImage: string       // Image URL
  destinationImageAlt: string    // Alt text
  transport: TransportType       // "bus_semicama" | "avion" | "bus_cama"
  departureDate: string          // ISO date: "2026-03-19"
  returnDate: string             // ISO date: "2026-03-26"
  nights: number                 // Trip duration
  hotel?: string                 // Hotel name/category
  regime?: RegimeType            // Meal plan
  pricePerPerson: number         // Base price in ARS
  extraFees: ExtraFee[]          // Additional fees
  roomTypes: RoomType[]          // Available room configurations
  embarkPoints: string[]         // Pickup points
  maxPassengers: number          // Capacity limit
  importantNotes?: string        // Additional info for customers
}

type TransportType = 'bus_semicama' | 'avion' | 'bus_cama'
type RegimeType = 'desayuno' | 'media_pension' | 'all_inclusive' | 'sin_comidas'

interface ExtraFee {
  label: string   // "tasa de embarque"
  amount: number  // Amount in ARS
}

interface RoomType {
  type: string      // "doble", "triple", "cuadruple", "individual"
  surcharge: number // Additional cost (0 for base room)
  capacity: number  // Max occupants
}
```

### Booking

```typescript
interface Booking {
  _id: string              // Sanity document ID
  bookingNumber: string    // "AMC-2026-00001"
  departureId: string      // Reference to Departure
  departure?: Departure    // Expanded departure data
  roomType: string         // Selected room type
  infantCount: number      // Children under 2 (free)
  passengers: Passenger[]  // List of travelers
  contactEmail: string     // Primary contact email
  contactPhone: string     // Primary contact phone
  discountCode?: string    // Applied discount code
  totalPrice: number       // Calculated total in ARS
  paymentStatus: PaymentStatus
  notes?: string           // Internal notes
  createdAt: string        // ISO datetime
}

interface Passenger {
  firstName: string
  lastName: string
  dni: string              // Argentine ID number
  birthDate: string        // ISO date
  embarkPoint: string      // Selected pickup location
}

type PaymentStatus = 'pending' | 'paid' | 'cancelled'
```

### Promo

```typescript
interface Promo {
  id: string
  title: string            // "Semana Santa 2026"
  subtitle?: string        // "Escapate del 14 al 21 de abril"
  badge: string            // "PREVENTA", "OUTLET", "NUEVO"
  image: string            // Promo banner image URL
  imageAlt: string         // Spanish alt text
  href: string             // Link target (internal or external)
  cta: string              // CTA text: "Ver paquetes"
  featured?: boolean       // Large card treatment
}
```

### Service

```typescript
interface Service {
  id: string
  title: string            // "Viajes grupales"
  description: string      // Service description
  icon: string             // Icon identifier
  features: string[]       // Key features/benefits
}
```

### FAQ

```typescript
interface FAQ {
  id: string
  question: string         // In Spanish
  answer: string           // In Spanish, may contain HTML
  category?: string        // Optional grouping
  order: number            // Display order
}
```

### Voucher

```typescript
interface Voucher {
  code: string             // "V-2026-00001"
  booking: Booking         // Full booking details
  validFrom: string        // ISO date
  validUntil: string       // ISO date
  qrData: string           // Data for QR code
  isUsed: boolean          // Already redeemed
}
```

### Contact Form

```typescript
interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
}
```

## Sanity Schema Structure

### destination

```javascript
{
  name: 'destination',
  title: 'Destino',
  type: 'document',
  fields: [
    { name: 'slug', type: 'slug', source: 'name' },
    { name: 'name', type: 'string' },
    { name: 'province', type: 'string' },
    { name: 'priceFrom', type: 'number' },
    { name: 'nights', type: 'number' },
    { name: 'bestMonth', type: 'string' },
    { name: 'includes', type: 'array', of: [{ type: 'string' }] },
    { name: 'image', type: 'image' },
    { name: 'imageAlt', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'longDescription', type: 'text' },
    { name: 'active', type: 'boolean', initialValue: true },
  ]
}
```

### departure

```javascript
{
  name: 'departure',
  title: 'Salida',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'destination', type: 'reference', to: [{ type: 'destination' }] },
    { name: 'transport', type: 'string', options: { list: [...] } },
    { name: 'departureDate', type: 'date' },
    { name: 'returnDate', type: 'date' },
    { name: 'nights', type: 'number' },
    { name: 'hotel', type: 'string' },
    { name: 'regime', type: 'string', options: { list: [...] } },
    { name: 'pricePerPerson', type: 'number' },
    { name: 'extraFees', type: 'array', of: [{ type: 'object', fields: [...] }] },
    { name: 'roomTypes', type: 'array', of: [{ type: 'object', fields: [...] }] },
    { name: 'embarkPoints', type: 'array', of: [{ type: 'string' }] },
    { name: 'maxPassengers', type: 'number' },
    { name: 'importantNotes', type: 'text' },
    { name: 'active', type: 'boolean', initialValue: true },
  ]
}
```

### booking

```javascript
{
  name: 'booking',
  title: 'Reserva',
  type: 'document',
  fields: [
    { name: 'bookingNumber', type: 'string', readOnly: true },
    { name: 'departure', type: 'reference', to: [{ type: 'departure' }] },
    { name: 'roomType', type: 'string' },
    { name: 'infantCount', type: 'number' },
    { name: 'passengers', type: 'array', of: [{ type: 'object', fields: [...] }] },
    { name: 'contactEmail', type: 'string' },
    { name: 'contactPhone', type: 'string' },
    { name: 'discountCode', type: 'string' },
    { name: 'totalPrice', type: 'number' },
    { name: 'paymentStatus', type: 'string', options: { list: [...] } },
    { name: 'notes', type: 'text' },
    { name: 'createdAt', type: 'datetime', readOnly: true },
  ]
}
```

### promo

```javascript
{
  name: 'promo',
  title: 'Promoción',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'badge', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'imageAlt', type: 'string' },
    { name: 'href', type: 'string' },
    { name: 'cta', type: 'string' },
    { name: 'featured', type: 'boolean' },
    { name: 'order', type: 'number' },
    { name: 'active', type: 'boolean', initialValue: true },
  ]
}
```

## Fetcher Contracts

### Destinations

```typescript
// Get all active destinations
async function getDestinations(): Promise<Destination[]>

// Get single destination by slug
async function getDestinationBySlug(slug: string): Promise<Destination | null>

// Get all destination slugs (for generateStaticParams)
async function getDestinationSlugs(): Promise<string[]>
```

### Departures

```typescript
// Get all active departures
async function getDepartures(): Promise<Departure[]>

// Get departures for a specific destination
async function getDeparturesByDestination(destinationSlug: string): Promise<Departure[]>

// Get single departure by ID
async function getDepartureById(id: string): Promise<Departure | null>
```

### Bookings

```typescript
// Create new booking (returns booking number)
async function createBooking(data: BookingInput): Promise<{ bookingNumber: string }>

// Get booking by number
async function getBookingByNumber(bookingNumber: string): Promise<Booking | null>

// Get booking by number and email (for lookup verification)
async function getBookingByNumberAndEmail(
  bookingNumber: string,
  email: string
): Promise<Booking | null>
```

### Promos

```typescript
// Get all active promos
async function getPromos(): Promise<Promo[]>
```

### Services

```typescript
// Get all services
async function getServices(): Promise<Service[]>
```

### FAQs

```typescript
// Get all FAQs
async function getFAQs(): Promise<FAQ[]>

// Get FAQs by category
async function getFAQsByCategory(category: string): Promise<FAQ[]>
```

### Vouchers

```typescript
// Get voucher by code
async function getVoucherByCode(code: string): Promise<Voucher | null>
```

## Caching with `"use cache"`

Next.js 16 uses opt-in caching. Apply `"use cache"` at the page or component level:

```typescript
// app/destinos/[slug]/page.tsx
"use cache"

export default async function DestinationPage({ params }: Props) {
  const destination = await getDestinationBySlug(params.slug)
  // ...
}
```

### Cache Tags

Use Sanity tags for granular revalidation:

```typescript
// In fetcher
client.fetch(query, params, { next: { tags: ['destinations'] } })

// Revalidate via webhook
revalidateTag('destinations')
```

### Tag Conventions

| Document Type | Tags |
|---------------|------|
| destination | `destinations`, `destination:{slug}` |
| departure | `departures` |
| promo | `promos` |
| booking | `bookings` (no cache typically) |

## Error Handling

All fetchers should handle errors gracefully:

```typescript
export async function getDestinations(): Promise<Destination[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackDestinations
  }

  try {
    const raw = await client.fetch(QUERY, {}, { next: { tags: ['destinations'] } })
    return transformDestinations(raw)
  } catch (error) {
    console.error('Failed to fetch destinations from Sanity:', error)
    return fallbackDestinations  // Graceful fallback
  }
}
```

## Static Fallback Data Files

Location: `app/data/`

| File | Content |
|------|---------|
| `destinations.ts` | Destination[] with 5 sample destinations |
| `departures.ts` | Departure[] with 4 sample departures |
| `promos.ts` | Promo[] with 3 sample promos |
| `services.ts` | Service[] (to be created) |
| `faqs.ts` | FAQ[] (to be created) |

Each file exports both the interface and the data array.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Dataset (default: "production") |
| `SANITY_REVALIDATE_SECRET` | No | Webhook auth secret |

When `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set, all fetchers return fallback data.
