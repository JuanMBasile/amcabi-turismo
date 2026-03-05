# AMCABI Turismo — Component Architecture

## Overview

All components live in `app/components/`. No barrel exports — import directly from component files. Server Components by default; only use `'use client'` when necessary.

## Component Tree

```
app/components/
│
├── layout/
│   ├── Header.tsx              # SC — Main navigation
│   ├── Footer.tsx              # SC — Footer with links, contact, legal
│   ├── MobileNav.tsx           # CC — Mobile hamburger menu
│   └── AmcabiLogo.tsx          # SC — SVG logo component
│
├── home/
│   ├── HeroSection.tsx         # SC — Hero with animated visuals
│   ├── OrbitalVisual.tsx       # CC — Animated orbital/route visualization
│   ├── BookingBar.tsx          # CC — Departure search/select bar
│   ├── DestinationsGrid.tsx    # SC — Grid of destination cards
│   ├── DestinationCard.tsx     # SC — Individual destination card
│   ├── PromosSection.tsx       # SC — Promotional banners
│   ├── PromoCard.tsx           # SC — Individual promo card
│   ├── WhyUs.tsx               # SC — Value proposition section
│   └── ScrollReveal.tsx        # CC — Intersection observer wrapper
│
├── destinations/
│   ├── DestinationHero.tsx     # SC — Destination page hero
│   ├── DestinationInfo.tsx     # SC — Description, includes, best months
│   ├── DeparturesList.tsx      # SC — List of available departures
│   └── DepartureCard.tsx       # SC — Individual departure card with CTA
│
├── booking/
│   ├── BookingWizard.tsx       # CC — Multi-step booking form
│   ├── StepIndicator.tsx       # CC — Progress indicator
│   ├── RoomSelector.tsx        # CC — Room type selection
│   ├── PassengerForm.tsx       # CC — Passenger data inputs
│   ├── ContactForm.tsx         # CC — Contact info inputs
│   ├── BookingSummary.tsx      # CC — Final summary before submit
│   ├── PriceSummary.tsx        # CC — Live price calculation
│   └── BookingConfirmation.tsx # SC — Confirmed booking display
│
├── voucher/
│   ├── VoucherCard.tsx         # SC — Printable voucher
│   └── VoucherQR.tsx           # SC — QR code for voucher
│
├── lookup/
│   ├── ReservaLookupForm.tsx   # CC — Booking lookup form
│   └── VoucherLookupForm.tsx   # CC — Voucher lookup form
│
├── content/
│   ├── AboutHero.tsx           # SC — About page hero
│   ├── Timeline.tsx            # SC — Agency history timeline
│   ├── TeamSection.tsx         # SC — Team presentation
│   ├── ServiceCard.tsx         # SC — Service description card
│   ├── FAQAccordion.tsx        # CC — Expandable FAQ items
│   └── FAQItem.tsx             # CC — Single FAQ item
│
├── contact/
│   ├── ContactForm.tsx         # CC — Contact form with validation
│   ├── ContactInfo.tsx         # SC — Agency contact details
│   └── LocationMap.tsx         # CC — Embedded map (optional)
│
├── shared/
│   ├── Button.tsx              # SC — Reusable button with variants
│   ├── Card.tsx                # SC — Base card component
│   ├── Badge.tsx               # SC — Status/label badges
│   ├── Input.tsx               # SC — Form input with label
│   ├── Select.tsx              # CC — Custom select dropdown
│   ├── Modal.tsx               # CC — Modal dialog
│   ├── Skeleton.tsx            # SC — Loading skeleton primitives
│   ├── ErrorMessage.tsx        # SC — Error display component
│   └── PrintButton.tsx         # CC — Print-friendly button
│
└── icons/
    ├── PlaneIcon.tsx           # SC
    ├── BusIcon.tsx             # SC
    ├── HotelIcon.tsx           # SC
    ├── CalendarIcon.tsx        # SC
    ├── UsersIcon.tsx           # SC
    ├── PhoneIcon.tsx           # SC
    ├── MailIcon.tsx            # SC
    ├── MapPinIcon.tsx          # SC
    ├── CheckIcon.tsx           # SC
    ├── ChevronIcon.tsx         # SC
    └── index.ts                # Re-exports for icons only
```

**Legend:** SC = Server Component, CC = Client Component (`'use client'`)

## Component Specifications

### Layout Components

#### `Header.tsx` (Server Component)

```typescript
interface HeaderProps {
  // No props needed — reads route from Next.js
}
```

**Responsibilities:**
- Logo (links to `/`)
- Navigation links: Destinos, Servicios, Quiénes Somos, Contacto
- Mobile menu trigger (rendered by `MobileNav`)
- Active link highlighting

**Design:**
- Sticky header with blur backdrop
- Pink accent on active link
- Logo animates on hover

---

#### `Footer.tsx` (Server Component)

```typescript
interface FooterProps {
  // No props — static content
}
```

**Responsibilities:**
- Agency contact info (phone, email, address)
- Quick links to main pages
- Social links (Instagram)
- Legal: "Legajo EVT 14703" badge
- Copyright

---

#### `MobileNav.tsx` (Client Component)

```typescript
interface MobileNavProps {
  links: { href: string; label: string }[]
}
```

**Responsibilities:**
- Hamburger button
- Slide-out menu
- Close on link click or overlay click
- Trap focus when open

---

### Home Components

#### `HeroSection.tsx` (Server Component)

**Responsibilities:**
- Large headline + subheadline
- Animated `OrbitalVisual` background
- `BookingBar` for quick departure selection
- Responsive layout (stack on mobile)

---

#### `OrbitalVisual.tsx` (Client Component)

**Responsibilities:**
- SVG-based animated route visualization
- Floating destination chips
- Reduced motion support (`prefers-reduced-motion`)

---

#### `BookingBar.tsx` (Client Component)

```typescript
interface BookingBarProps {
  departures: Departure[]
}
```

**Responsibilities:**
- Departure dropdown selector
- "Ver paquete" / "Reservar" button
- Navigates to `/reservar/[departureId]`

---

#### `DestinationsGrid.tsx` (Server Component)

```typescript
interface DestinationsGridProps {
  destinations: Destination[]
}
```

**Responsibilities:**
- Responsive grid (1 col mobile, 2 tablet, 3 desktop)
- Renders `DestinationCard` for each destination
- Scroll reveal animation

---

#### `DestinationCard.tsx` (Server Component)

```typescript
interface DestinationCardProps {
  destination: Destination
}
```

**Responsibilities:**
- Image with hover zoom
- Name, province, price from
- "Ver destino" link to `/destinos/[slug]`

---

### Booking Components

#### `BookingWizard.tsx` (Client Component)

```typescript
interface BookingWizardProps {
  departure: Departure
}
```

**State:**
- `step: 1 | 2 | 3 | 4` (Room, Passengers, Contact, Summary)
- `roomType: string`
- `passengers: Passenger[]`
- `contactInfo: ContactInfo`
- `infantCount: number`

**Responsibilities:**
- Step navigation
- Form validation per step
- Price calculation
- Submit to API
- Error handling

---

#### `PriceSummary.tsx` (Client Component)

```typescript
interface PriceSummaryProps {
  departure: Departure
  roomType: string
  passengerCount: number
  infantCount: number
}
```

**Responsibilities:**
- Calculate total:
  - `pricePerPerson * passengerCount`
  - `+ roomSurcharge (if applicable)`
  - `+ extraFees * passengerCount`
- Display itemized breakdown
- Highlight total in pink

---

#### `PassengerForm.tsx` (Client Component)

```typescript
interface PassengerFormProps {
  index: number
  passenger: Passenger
  embarkPoints: string[]
  onChange: (passenger: Passenger) => void
  errors: Record<string, string>
}
```

**Fields:**
- Nombre (required)
- Apellido (required)
- DNI (required, 7-8 digits)
- Fecha de nacimiento (required)
- Punto de embarque (select from `embarkPoints`)

---

### Shared Components

#### `Button.tsx` (Server Component)

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  asChild?: boolean  // For Radix-style composition
}
```

**Variants:**
- `primary` — Pink background, white text
- `secondary` — Cyan background, dark text
- `ghost` — Transparent, pink text
- `outline` — Pink border, transparent background

---

#### `Card.tsx` (Server Component)

```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'glass'
  padding: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
```

**Variants:**
- `default` — White background, subtle border
- `elevated` — White with shadow
- `glass` — Glass morphism effect

---

#### `Input.tsx` (Server Component)

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}
```

**Responsibilities:**
- Label above input
- Error message below (pink text)
- Hint text (muted)
- Focus ring styling

---

#### `Badge.tsx` (Server Component)

```typescript
interface BadgeProps {
  variant: 'pink' | 'cyan' | 'yellow' | 'purple' | 'muted'
  children: React.ReactNode
}
```

Used for: promo badges, transport type, status indicators

---

### Icon Components

All icons are Server Components returning SVG elements:

```typescript
interface IconProps {
  size?: number | string  // default 24
  className?: string
}
```

Icons use `currentColor` for fill/stroke, allowing color via Tailwind text utilities.

## Component Guidelines

### Server vs Client Components

Use **Server Components** (default) when:
- Displaying static content
- Fetching data
- No interactivity needed
- No browser APIs needed

Use **Client Components** (`'use client'`) when:
- Managing state (`useState`, `useReducer`)
- Using effects (`useEffect`)
- Event handlers (onClick, onChange)
- Browser APIs (IntersectionObserver, localStorage)
- Third-party client-only libraries

### Props Interface Naming

```typescript
// Always suffix with Props
interface DestinationCardProps { ... }
interface BookingWizardProps { ... }
```

### Composition Pattern

Prefer composition over configuration:

```typescript
// Good - composition
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
</Card>

// Avoid - excessive props
<Card
  header="..."
  body="..."
  footer="..."
  showBorder
  elevated
/>
```

### Accessibility Requirements

All components must:
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Have proper ARIA labels (in Spanish)
- Support keyboard navigation
- Meet WCAG AA color contrast (4.5:1)
- Support `prefers-reduced-motion`

### Styling Guidelines

- Use only brand tokens from `@theme` in `globals.css`
- No arbitrary color values in components
- Responsive design: mobile-first
- Container queries where appropriate (`@container`)
- No inline styles except for dynamic values

### Image Guidelines

All images use `next/image`:

```typescript
import Image from 'next/image'

<Image
  src={destination.image}
  alt={destination.imageAlt}  // Spanish alt text
  width={640}
  height={400}
  className="object-cover"
/>
```

Required remotes: `images.unsplash.com`, `cdn.sanity.io`
