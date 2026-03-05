# Plan: Mejorar consulta de reservas

## Problema actual
La página `/reserva/[bookingNumber]` NO busca en Sanity. Solo muestra datos de query params que se pasan al crear la reserva. Cuando alguien busca su reserva existente, la página queda vacía.

## Solución
Modificar la página para:
1. Intentar buscar la reserva en Sanity por número
2. Si existe, mostrar todos los detalles (como en la imagen de referencia)
3. Si no existe, mostrar mensaje de error

## Archivos a modificar

### 1. `app/reserva/[bookingNumber]/page.tsx`
- Llamar a `getBookingByNumber()` del fetcher
- Si encuentra la reserva → mostrar detalles completos
- Si no la encuentra → usar query params como fallback (para reservas recién creadas)
- Si ninguno → mostrar error "No encontramos esta reserva"

### 2. Crear componente `BookingDetails.tsx`
Mostrar como en la imagen de referencia:
- ✓ Banner "Esta reserva está confirmada" (verde)
- 📋 Detalles de reserva:
  - Número de reserva
  - Destino + paquete
  - Hotel
  - Habitación
  - Fecha de salida
- 👥 Pasajeros que integran la reserva (grid de cards):
  - Pasajero 1, 2, 3...
  - Nombre completo
  - DNI
  - Punto de embarque

## Estructura de datos disponible en Sanity

```typescript
booking: {
  bookingNumber: "AMC-2026-12345",
  departure: {
    title: "Cataratas del Iguazú | Marzo 2026",
    departureDate: "2026-03-08",
    hotel: "Hotel Cataratas Inn",
    destination: { name: "Cataratas del Iguazú" }
  },
  roomType: "triple",
  passengers: [
    { firstName, lastName, dni, embarkPoint },
    ...
  ],
  paymentStatus: "pending" | "paid" | "cancelled",
  totalPrice: 450000
}
```

## Diseño UI (basado en imagen de referencia)

```
┌─────────────────────────────────────────┐
│ ✓ Esta reserva está confirmada.         │ ← Verde si paymentStatus === "paid"
│   (o "Pendiente de pago" si pending)    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ℹ Detalles de reserva                   │
│                                          │
│ • Número de reserva: Nº AMC-2026-12345  │
│ • Destino: Cataratas del Iguazú         │
│ • Hotel: Hotel Cataratas Inn            │
│ • Habitación: triple                    │
│ • Fecha de Salida: 08-03-2026           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 👥 Pasajeros que integran la reserva    │
│                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │Pasajero 1│ │Pasajero 2│ │Pasajero 3│  │
│ │María...  │ │Juan...   │ │Pedro...  │  │
│ │DNI: 123  │ │DNI: 456  │ │DNI: 789  │  │
│ │Embarque: │ │Embarque: │ │Embarque: │  │
│ │Terminal..│ │Terminal..│ │Terminal..│  │
│ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 💰 Total: $450.000                      │
│ [WhatsApp: ¿Cómo pago?]                 │
└─────────────────────────────────────────┘
```

## Verificación
1. `npm run dev`
2. Crear una reserva nueva → debe mostrar detalles
3. Buscar reserva existente en `/consulta-reserva` → debe encontrarla y mostrar detalles
4. Buscar reserva inexistente → debe mostrar error
5. `npm run build` + `npm run lint`
