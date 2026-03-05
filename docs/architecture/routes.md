# AMCABI Turismo — Route Architecture

## Overview

All routes use Spanish URLs to match the target audience (es-AR). The site follows Next.js 16 App Router conventions with Server Components by default.

## Route Map

```
app/
├── page.tsx                     # / (Home)
├── layout.tsx                   # Root layout (Montserrat font, schema.org, Header/Footer)
├── loading.tsx                  # Global loading skeleton
├── error.tsx                    # Global error boundary (Spanish)
├── not-found.tsx                # 404 page (Spanish)
├── globals.css                  # Tailwind v4 @theme + custom utilities
├── robots.ts                    # robots.txt config
├── sitemap.ts                   # Dynamic sitemap
├── opengraph-image.tsx          # Default OG image generator
│
├── destinos/
│   └── [slug]/
│       ├── page.tsx             # /destinos/bariloche, /destinos/cataratas, etc.
│       ├── loading.tsx          # Skeleton for destination detail
│       ├── error.tsx            # Spanish error for destination
│       └── opengraph-image.tsx  # Dynamic OG image per destination
│
├── reservar/
│   └── [departureId]/
│       ├── page.tsx             # /reservar/demo-bariloche-mar-2026
│       ├── loading.tsx          # Booking form skeleton
│       └── error.tsx            # Spanish booking error
│
├── reserva/
│   └── [bookingNumber]/
│       ├── page.tsx             # /reserva/AMC-2026-00001 (confirmation)
│       ├── loading.tsx          # Confirmation loading
│       └── error.tsx            # Reservation not found (Spanish)
│
├── consulta-reserva/
│   └── page.tsx                 # Reservation lookup form
│
├── voucher/
│   └── [code]/
│       ├── page.tsx             # /voucher/V-2026-00001 (voucher display)
│       ├── loading.tsx
│       └── error.tsx
│
├── consulta-voucher/
│   └── page.tsx                 # Voucher lookup form
│
├── quienes-somos/
│   └── page.tsx                 # /quienes-somos (About us)
│
├── servicios/
│   └── page.tsx                 # /servicios (Services offered)
│
├── preguntas-frecuentes/
│   └── page.tsx                 # /preguntas-frecuentes (FAQ)
│
├── contacto/
│   └── page.tsx                 # /contacto (Contact form)
│
└── api/
    ├── reservar/
    │   └── route.ts             # POST: Submit booking
    └── revalidate/
        └── route.ts             # POST: Sanity webhook for ISR
```

## Page Responsibilities

### Home (`/`)

**Purpose:** Landing page showcasing destinations, promos, and agency value proposition.

**Data:**
- `getDestinations()` — Featured destinations grid
- `getPromos()` — Current promotional banners
- `getDepartures()` — Upcoming departures for booking bar

**Components:**
- `HeroSection` — Animated hero with booking bar
- `DestinationsGrid` — Destination cards
- `PromosSection` — Promo banners
- `WhyUs` — Value proposition bullets
- `FAQ` — Frequently asked questions

**SEO:** Primary landing page, includes TravelAgency schema.org markup.

---

### Destination Detail (`/destinos/[slug]`)

**Purpose:** Detailed view of a single destination with available departures.

**Data:**
- `getDestinationBySlug(slug)` — Destination details
- `getDepartures()` — Filtered by `destinationSlug`

**Components:**
- `DestinationHero` — Hero image with destination name
- `DestinationInfo` — Description, includes, best months
- `DeparturesList` — Available departures with "Reservar" CTAs

**SEO:** `generateMetadata` returns destination-specific title/description. OG image generated dynamically.

---

### Booking Form (`/reservar/[departureId]`)

**Purpose:** Multi-step booking form for a specific departure.

**Data:**
- `getDepartureById(departureId)` — Departure details for form context

**Components:**
- `BookingWizard` — Multi-step form (room selection, passengers, contact, summary)
- `PriceSummary` — Live price calculation
- `PassengerForm` — Passenger data collection

**Behavior:**
- Client Component (requires form state, validation)
- Submits to `/api/reservar`
- On success, redirects to `/reserva/[bookingNumber]`

---

### Booking Confirmation (`/reserva/[bookingNumber]`)

**Purpose:** Display confirmed booking details.

**Data:**
- `getBookingByNumber(bookingNumber)` — Booking details from Sanity

**Components:**
- `BookingConfirmation` — Summary card with all booking details
- `PrintButton` — Print-friendly version
- `ContactInfo` — Agency contact for questions

---

### Reservation Lookup (`/consulta-reserva`)

**Purpose:** Allow users to look up existing reservations by booking number and email.

**Components:**
- `ReservaLookupForm` — Form with booking number + email fields
- Redirects to `/reserva/[bookingNumber]` on success

---

### Voucher Display (`/voucher/[code]`)

**Purpose:** Display travel voucher for printing/showing at hotel.

**Data:**
- `getVoucherByCode(code)` — Voucher details

**Components:**
- `VoucherCard` — Printable voucher with all trip details
- QR code for verification

---

### Voucher Lookup (`/consulta-voucher`)

**Purpose:** Look up voucher by code.

**Components:**
- `VoucherLookupForm` — Code input field
- Redirects to `/voucher/[code]` on success

---

### About Us (`/quienes-somos`)

**Purpose:** Agency history, mission, team, legal compliance (Legajo EVT 14703).

**Data:** Static content (no CMS fetch needed initially)

**Components:**
- `AboutHero` — Hero section with agency overview
- `Timeline` — Agency milestones
- `TeamSection` — Team presentation
- `LegalBadge` — EVT license display

---

### Services (`/servicios`)

**Purpose:** List of services offered (group travel, corporate, schools, etc.)

**Data:**
- `getServices()` — Service categories from Sanity or fallback

**Components:**
- `ServiceCard` — Individual service with icon and description
- `CTASection` — Contact/quote request

---

### FAQ (`/preguntas-frecuentes`)

**Purpose:** Frequently asked questions with expandable answers.

**Data:**
- `getFAQs()` — FAQ items from Sanity or fallback

**Components:**
- `FAQAccordion` — Expandable Q&A items

---

### Contact (`/contacto`)

**Purpose:** Contact form and agency location info.

**Components:**
- `ContactForm` — Name, email, phone, message
- `ContactInfo` — Address, phone, email, hours
- `Map` — Optional embedded map

## API Routes

### `POST /api/reservar`

**Purpose:** Submit new booking reservation.

**Request Body:**
```typescript
{
  departureId: string
  roomType: string
  infantCount: number
  passengers: Passenger[]
  contactEmail: string
  contactPhone: string
  discountCode?: string
}
```

**Response:**
```typescript
{
  success: boolean
  bookingNumber?: string  // e.g., "AMC-2026-00001"
  error?: string
}
```

**Behavior:**
1. Validate departure exists and has capacity
2. Calculate total price
3. Create booking in Sanity
4. Return booking number

---

### `POST /api/revalidate`

**Purpose:** Sanity webhook endpoint for on-demand ISR.

**Headers:** `x-sanity-secret` must match `SANITY_REVALIDATE_SECRET`

**Body:** Sanity webhook payload with `_type`

**Behavior:**
- Revalidates tags based on document type
- `destination` → revalidates `destinations`, `destination:{slug}`
- `departure` → revalidates `departures`
- `promo` → revalidates `promos`

## Caching Strategy (Next.js 16)

Next.js 16 caching is **opt-in** via `"use cache"` directive.

### Pages with `"use cache"`

- `/` — Home page (cached, revalidated via webhook)
- `/destinos/[slug]` — Destination detail (cached per slug)
- `/quienes-somos` — Static content
- `/servicios` — Mostly static
- `/preguntas-frecuentes` — FAQ content

### Dynamic Pages (no cache)

- `/reservar/[departureId]` — Booking form needs real-time departure data
- `/reserva/[bookingNumber]` — User-specific booking data
- `/voucher/[code]` — User-specific voucher data
- `/consulta-reserva`, `/consulta-voucher` — Lookup forms (lightweight)
- `/contacto` — Contact form

## Metadata Convention

Every page exports `generateMetadata`:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch any needed data
  return {
    title: 'Título en español',
    description: 'Descripción en español...',
    openGraph: {
      title: 'Título OG en español',
      description: 'Descripción OG...',
    },
  }
}
```

## Error Handling

All `error.tsx` files display Spanish error messages:

```typescript
// Error messages (Spanish)
const ERROR_MESSAGES = {
  DESTINATION_NOT_FOUND: 'No encontramos este destino',
  BOOKING_NOT_FOUND: 'No encontramos esta reserva',
  VOUCHER_NOT_FOUND: 'Voucher no encontrado',
  GENERIC_ERROR: 'Algo salió mal. Por favor, intentá de nuevo.',
}
```

## Loading States

All `loading.tsx` files provide skeleton UI matching the page layout:
- Pulse animation placeholders for text
- Gray rectangles for images
- Maintains layout shift prevention (CLS)
