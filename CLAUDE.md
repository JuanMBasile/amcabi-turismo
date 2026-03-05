# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AMCABI Turismo — Argentine travel agency website (Legajo EVT 14703).
Next.js 16.1 (App Router, Turbopack default), React 19.2, Tailwind CSS 4.1, TypeScript 5.9, Sanity CMS. Deployed on Vercel.

**The site is in Spanish (es-AR).** All user-facing text, routes, alt text, aria labels, and errors are in Spanish.

**Siempre respondé en español (es-AR).** Todas las respuestas, explicaciones, mensajes de estado y preguntas al usuario deben ser en español. Los commits siguen en inglés (conventional commits).

## Commands

- `npm run dev` — Dev server (uses `--webpack` flag; Turbopack has Windows bugs with Tailwind v4)
- `npm run dev:turbo` — Dev server with Turbopack (test periodically if bug is fixed)
- `npm run build` — Production build (must pass with zero errors)
- `npm run start` — Start production server
- `npm run lint` — ESLint (zero warnings policy)

## Architecture

### Dual Data Source (Critical Invariant)

If `NEXT_PUBLIC_SANITY_PROJECT_ID` is set → fetch from Sanity CMS.
Otherwise → use static fallback data from `app/data/`.
**Every fetcher MUST have both paths.** Never assume Sanity is available.

```typescript
export async function getDestinations(): Promise<Destination[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackDestinations;
  }
  return client.fetch(destinationsQuery);
}
```

### Key Directories

| Directory | Purpose |
|---|---|
| `sanity/lib/` | Sanity client, image URL builder, GROQ queries, fetchers |
| `sanity/schemas/` | Sanity schema definitions |
| `app/data/` | Static fallback data (barrel-exports via `index.ts`) |
| `app/types/` | Shared TypeScript types — single source of truth |
| `app/components/` | All components (no root-level `components/`) |
| `app/components/shared/` | Reusable primitives: Button, Card, Badge, Input, Skeleton (barrel-exports via `index.ts`) |
| `app/assets/lottie/` | Lottie animation JSON files |
| `app/api/revalidate/` | Sanity webhook for on-demand ISR |
| `app/api/reservar/` | Booking submission endpoint |

### Caching & Revalidation

Next.js 16 caching is **entirely opt-in** via the `"use cache"` directive. On-demand revalidation via Sanity webhook at `app/api/revalidate/route.ts` using `SANITY_REVALIDATE_SECRET`. Do NOT use time-based revalidation.

**Cache tag convention** (used in `sanity/lib/fetchers.ts` and the webhook handler):
`destinations` · `destination:{slug}` · `departures` · `departure:{id}` · `promos` · `services` · `faqs` · `siteSettings`

### Routes (Spanish URLs)

`/destinos/[slug]` · `/reservar/[departureId]` · `/reserva/[bookingNumber]` · `/consulta-reserva` · `/voucher/[code]` · `/consulta-voucher` · `/quienes-somos` · `/servicios` · `/preguntas-frecuentes` · `/contacto` · `/terminos-condiciones` · `/studio/[[...tool]]` (embedded Sanity Studio)

English aliases (`/about`, `/contact`, `/faq`, `/services`) redirect to their Spanish equivalents via `next.config.ts`.

### Path Aliases

`@/*` maps to project root. Always use `@/` imports, never `../../`.

### Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (optional — if unset, fallback data is used) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (default: `production`) |
| `SANITY_REVALIDATE_SECRET` | Webhook auth secret |
| `SANITY_WRITE_TOKEN` | Sanity write token for creating bookings (optional — demo mode if unset) |

### Schema.org Structured Data

- Root layout (`app/layout.tsx`): `TravelAgency` JSON-LD
- Destination pages: `TouristTrip` + `BreadcrumbList`
- Pattern: embed `<script type="application/ld+json">` in page components

### Security Headers

`next.config.ts` configures `X-Content-Type-Options`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and `Referrer-Policy` on all responses.

## Code Conventions

### React 19.2 & Next.js 16

- **Server Components by default.** Only `'use client'` for hooks, event handlers, browser APIs.
- **Data fetching in Server Components.** Never `useEffect` for data fetching. Use async Server Components.
- **`"use cache"` for caching.** Next.js 16 caching is opt-in. Add the directive where static generation is needed.
- **React Compiler** — stable in Next.js 16, currently commented out in `next.config.ts` (`reactCompiler: true`).
- Every page: `loading.tsx` (skeleton UI) + `error.tsx` (Spanish error) + `generateMetadata` (Spanish SEO).
- Component composition over prop drilling. Extract custom hooks when logic repeats in 2+ components.
- No barrel exports **except** `app/components/shared/index.ts` and `app/data/index.ts`.

### TypeScript 5.9

- Strict mode. No `any`. No `as` casting unless justified with a comment.
- Shared types in `app/types/index.ts`. Do not duplicate type definitions.
- Props always typed as `interface {ComponentName}Props`.

### Tailwind CSS 4.1 (CSS-First Configuration)

**Tailwind v4 does NOT use `tailwind.config.ts`.** All configuration is CSS-native.

Setup in `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --font-montserrat: "Montserrat", ui-sans-serif, system-ui, sans-serif;

  --color-page: #FFFFFF;
  --color-page-soft: #FDF2F8;
  --color-surface: #FFFFFF;

  --color-border: #FBCFE8;
  --color-border-strong: #F9A8D4;

  --color-ink: #1A0A12;
  --color-ink-muted: #5A3A4A;
  --color-ink-faint: #C4A8B4;

  --color-pink: #E91E8C;
  --color-pink-light: #F472B6;
  --color-pink-dark: #BE185D;

  --color-cyan: #22D3EE;
  --color-cyan-dark: #0891B2;
  --color-cyan-light: #67E8F9;

  --color-yellow: #FBD000;
  --color-yellow-light: #FDE047;
  --color-yellow-dark: #CA8A04;

  --color-purple: #9333EA;
  --color-purple-light: #C084FC;

  --color-dark: #1A0A12;
  --color-dark-soft: #2D0A1E;
  --color-dark-surface: #0D0508;
}
```

Key differences from Tailwind v3:
- **No `tailwind.config.ts`.** All tokens defined via `@theme` in CSS.
- **`@import "tailwindcss"`** replaces `@tailwind base/components/utilities`.
- **Automatic content detection.** No `content` array needed.
- **Use brand tokens only.** Never use arbitrary colors — all colors come from `@theme`.
- **Container queries built-in.** Use `@container` and `@sm:`, `@md:`, `@lg:` variants natively.
- **`postcss.config.mjs` still required** at root (kept for v4 compatibility despite docs suggesting otherwise).

### Images

- `next/image` always with explicit `width`/`height` or `fill`.
- Remotes: `images.unsplash.com` and `cdn.sanity.io` (configured in `next.config.ts`).
- Sanity images via `@sanity/image-url`. Always include Spanish `alt` text.

### Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- All interactive elements keyboard-accessible. Form inputs with `<label>`.
- WCAG AA color contrast (4.5:1). Aria labels in Spanish.

### Git

- Conventional commits in English: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
- `npm run build` + `npm run lint` must pass before every commit.

## Agent Teams

This project uses Agent Teams for parallel development. See `docs/AGENT_TEAMS.md` for full team configuration, roles, phases, and file ownership rules.

**Quick rules for all teammates:**
1. Read this entire file. It is your source of truth.
2. Site is in Spanish (es-AR). Everything user-facing is in Spanish.
3. Dual data source: always handle the no-Sanity case.
4. Server Components first. `'use client'` only when necessary.
5. Brand tokens only. Check `@theme` in `app/globals.css`.
6. Nothing ships without QA approval. Build + lint must pass.
7. Stay in your lane. Only edit files you own. Message before touching shared areas.
8. Use Context7 MCP to look up Next.js 16 / React 19.2 / Tailwind 4 docs when unsure.
