/**
 * AMCABI Turismo - GROQ Queries
 *
 * All Sanity GROQ queries in one place for maintainability.
 * Import these in fetchers.ts or directly in Server Components.
 *
 * @example
 * import { DESTINATIONS_QUERY } from '@/sanity/lib/queries'
 * const destinations = await client.fetch(DESTINATIONS_QUERY)
 */

// ─── Destinations ──────────────────────────────────────────────────────────────

/**
 * Get all active destinations, ordered by creation date
 */
export const DESTINATIONS_QUERY = `
  *[_type == "destination" && active == true] | order(_createdAt asc) {
    "slug": slug.current,
    name,
    province,
    priceFrom,
    nights,
    bestMonth,
    includes,
    image,
    imageAlt,
    description,
    longDescription,
    gallery,
    hotelName,
    hotelDescription,
    hotelGallery
  }
`

/**
 * Get a single destination by slug
 */
export const DESTINATION_BY_SLUG_QUERY = `
  *[_type == "destination" && slug.current == $slug && active == true][0] {
    "slug": slug.current,
    name,
    province,
    priceFrom,
    nights,
    bestMonth,
    includes,
    image,
    imageAlt,
    description,
    longDescription,
    gallery,
    hotelName,
    hotelDescription,
    hotelGallery
  }
`

/**
 * Get all destination slugs (for static params generation)
 */
export const DESTINATION_SLUGS_QUERY = `
  *[_type == "destination" && active == true] { "slug": slug.current }
`

// ─── Departures ────────────────────────────────────────────────────────────────

/**
 * Get all active departures with destination data, ordered by date
 */
export const DEPARTURES_QUERY = `
  *[_type == "departure" && active == true] | order(departureDate asc) {
    _id,
    title,
    transport,
    departureDate,
    returnDate,
    nights,
    hotel,
    regime,
    pricePerPerson,
    extraFees,
    roomTypes,
    embarkPoints,
    maxPassengers,
    importantNotes,
    "destination": destination->{
      "slug": slug.current,
      name,
      image,
      imageAlt
    }
  }
`

/**
 * Get departures for a specific destination
 */
export const DEPARTURES_BY_DESTINATION_QUERY = `
  *[_type == "departure" && active == true && destination->slug.current == $destinationSlug] | order(departureDate asc) {
    _id,
    title,
    transport,
    departureDate,
    returnDate,
    nights,
    hotel,
    regime,
    pricePerPerson,
    extraFees,
    roomTypes,
    embarkPoints,
    maxPassengers,
    importantNotes,
    "destination": destination->{
      "slug": slug.current,
      name,
      image,
      imageAlt
    }
  }
`

/**
 * Get a single departure by ID
 */
export const DEPARTURE_BY_ID_QUERY = `
  *[_type == "departure" && _id == $id && active == true][0] {
    _id,
    title,
    transport,
    departureDate,
    returnDate,
    nights,
    hotel,
    regime,
    pricePerPerson,
    extraFees,
    roomTypes,
    embarkPoints,
    maxPassengers,
    importantNotes,
    "destination": destination->{
      "slug": slug.current,
      name,
      image,
      imageAlt
    }
  }
`

/**
 * Get all departure IDs (for static params generation)
 */
export const DEPARTURE_IDS_QUERY = `
  *[_type == "departure" && active == true] { _id }
`

// ─── Promos ────────────────────────────────────────────────────────────────────

/**
 * Get all active promos, ordered by order field then featured status
 */
export const PROMOS_QUERY = `
  *[_type == "promo" && active == true] | order(order asc, featured desc) {
    "id": _id,
    title,
    subtitle,
    badge,
    image,
    imageAlt,
    href,
    "destinationSlugs": destinations[]->slug.current,
    cta,
    featured
  }
`

// ─── Services ──────────────────────────────────────────────────────────────────

/**
 * Get all active services, ordered by order field
 */
export const SERVICES_QUERY = `
  *[_type == "service" && active == true] | order(order asc) {
    "id": _id,
    title,
    description,
    icon,
    features
  }
`

// ─── FAQs ──────────────────────────────────────────────────────────────────────

/**
 * Get all active FAQs, ordered by order field
 */
export const FAQS_QUERY = `
  *[_type == "faq" && active == true] | order(order asc) {
    "id": _id,
    question,
    answer,
    category,
    order
  }
`

/**
 * Get FAQs by category
 */
export const FAQS_BY_CATEGORY_QUERY = `
  *[_type == "faq" && active == true && category == $category] | order(order asc) {
    "id": _id,
    question,
    answer,
    category,
    order
  }
`

// ─── Bookings ──────────────────────────────────────────────────────────────────

/**
 * Get booking by booking number
 */
export const BOOKING_BY_NUMBER_QUERY = `
  *[_type == "booking" && bookingNumber == $bookingNumber][0] {
    _id,
    bookingNumber,
    "departureId": departure->_id,
    "departure": departure->{
      _id,
      title,
      transport,
      departureDate,
      returnDate,
      nights,
      hotel,
      regime,
      pricePerPerson,
      extraFees,
      roomTypes,
      embarkPoints,
      maxPassengers,
      importantNotes,
      "destination": destination->{
        "slug": slug.current,
        name,
        image,
        imageAlt
      }
    },
    roomType,
    infantCount,
    passengers,
    contactEmail,
    contactPhone,
    discountCode,
    totalPrice,
    paymentStatus,
    notes,
    createdAt
  }
`

/**
 * Get booking by number and email (for customer verification)
 */
export const BOOKING_BY_NUMBER_AND_EMAIL_QUERY = `
  *[_type == "booking" && bookingNumber == $bookingNumber && contactEmail == $email][0] {
    _id,
    bookingNumber,
    "departureId": departure->_id,
    "departure": departure->{
      _id,
      title,
      transport,
      departureDate,
      returnDate,
      nights,
      hotel,
      regime,
      pricePerPerson,
      extraFees,
      roomTypes,
      embarkPoints,
      maxPassengers,
      importantNotes,
      "destination": destination->{
        "slug": slug.current,
        name,
        image,
        imageAlt
      }
    },
    roomType,
    infantCount,
    passengers,
    contactEmail,
    contactPhone,
    discountCode,
    totalPrice,
    paymentStatus,
    notes,
    createdAt
  }
`

/**
 * Get all bookings for admin panel, ordered by creation date descending.
 * Expands departure with destination. No active filter on departures.
 */
export const ALL_BOOKINGS_QUERY = `
  *[_type == "booking"] | order(createdAt desc) {
    _id,
    bookingNumber,
    "departureId": departure->_id,
    "departure": departure->{
      _id,
      title,
      transport,
      departureDate,
      returnDate,
      nights,
      hotel,
      regime,
      pricePerPerson,
      extraFees,
      roomTypes,
      embarkPoints,
      maxPassengers,
      importantNotes,
      "destination": destination->{
        "slug": slug.current,
        name,
        image,
        imageAlt
      }
    },
    roomType,
    infantCount,
    passengers,
    contactEmail,
    contactPhone,
    discountCode,
    totalPrice,
    paymentStatus,
    notes,
    createdAt
  }
`

/**
 * Get a single booking by Sanity document _id (for email sending)
 */
export const BOOKING_BY_ID_QUERY = `
  *[_type == "booking" && _id == $id][0] {
    _id,
    bookingNumber,
    "departureId": departure->_id,
    "departure": departure->{
      _id,
      title,
      transport,
      departureDate,
      returnDate,
      nights,
      hotel,
      regime,
      pricePerPerson,
      extraFees,
      roomTypes,
      embarkPoints,
      maxPassengers,
      importantNotes,
      "destination": destination->{
        "slug": slug.current,
        name,
        image,
        imageAlt
      }
    },
    roomType,
    infantCount,
    passengers,
    contactEmail,
    contactPhone,
    discountCode,
    totalPrice,
    paymentStatus,
    notes,
    createdAt
  }
`

// ─── Vouchers ──────────────────────────────────────────────────────────────────

/**
 * Get voucher by code with full booking expansion
 */
export const VOUCHER_BY_CODE_QUERY = `
  *[_type == "voucher" && code == $code][0] {
    code,
    "booking": booking->{
      _id,
      bookingNumber,
      "departureId": departure->_id,
      "departure": departure->{
        _id,
        title,
        transport,
        departureDate,
        returnDate,
        nights,
        hotel,
        regime,
        pricePerPerson,
        extraFees,
        roomTypes,
        embarkPoints,
        maxPassengers,
        importantNotes,
        "destination": destination->{
          "slug": slug.current,
          name,
          image,
          imageAlt
        }
      },
      roomType,
      infantCount,
      passengers,
      contactEmail,
      contactPhone,
      discountCode,
      totalPrice,
      paymentStatus,
      notes,
      createdAt
    },
    validFrom,
    validUntil,
    qrData,
    isUsed
  }
`

// ─── Site Settings ────────────────────────────────────────────────────────────

/**
 * Get site settings (singleton document)
 */
export const SITE_SETTINGS_QUERY = `
  *[_id == "siteSettings"][0] {
    showBookingBar,
    showPromos,
    showDestinations,
    showWhyUs
  }
`
