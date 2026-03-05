# Agent Teams — AMCABI Turismo Rebuild

## Team Roles

### Lead (Orchestrator)
- Delegates only. Does NOT implement code.
- Creates task list with phase dependencies.
- Resolves conflicts on overlapping areas.
- Synthesizes reports and decides when phases are complete.

### Teammate "estructura" (Architect)
- Designs App Router structure, data layer, component hierarchy.
- Writes specs as markdown in `docs/architecture/` BEFORE implementation.
- Defines TypeScript types/interfaces consumed by other teammates.
- Configures `@theme` tokens in `app/globals.css` (Tailwind v4 CSS-first).
- Reviews data flow: Sanity queries → fetchers → components.
- **Tools:** Read, Grep, Glob, Write (only `docs/`, `app/types/`, `app/globals.css`).

### Teammate "frontend"
- Implements React 19.2 components and page routes from estructura's specs.
- **Owns:** `app/components/`, `app/(routes)/`.
- Server Components by default. Message QA before adding `'use client'`.
- Uses brand design tokens from `@theme` in `app/globals.css`.
- Uses `next/image` for all images. Uses Tailwind v4 utilities (including container queries where appropriate).

### Teammate "backend"
- Implements Sanity client, GROQ queries, API routes, dual data source pattern.
- **Owns:** `sanity/`, `app/api/`, `app/data/`, `app/types/` (shared with estructura).
- Every fetcher MUST have a fallback path.
- Uses `"use cache"` directive where appropriate (Next.js 16 opt-in caching).
- Publishes data contracts (types + fetcher signatures) BEFORE frontend consumes them.

### Teammate "qa"
- Reviews ALL code. Does NOT write feature code.
- **Checklist per review:**
  - React 19.2 best practices (Server vs Client Components, no unnecessary memoization if React Compiler is enabled)
  - TypeScript 5.9 strictness (no `any`, no unjustified `as`)
  - Tailwind v4 compliance (tokens from `@theme` only, no `tailwind.config.ts`, no v3 syntax like `@tailwind` directives)
  - Accessibility (semantic HTML, aria, keyboard nav)
  - Spanish consistency (routes, text, alt, errors)
  - Dual data source (Sanity + fallback both work)
  - Next.js 16 patterns (`"use cache"` used correctly, Turbopack compatible)
  - `npm run build` passes
  - `npm run lint` zero warnings
- Sends feedback directly to the responsible teammate.
- **Nothing is marked done until QA approves.**

## File Ownership

| Directory / File | Owner | Others |
|---|---|---|
| `docs/architecture/` | estructura | Read only |
| `app/types/` | estructura + backend | frontend reads |
| `app/globals.css` | estructura (theme) + frontend (styles) | qa reads |
| `sanity/` | backend | Read only |
| `app/api/` | backend | Read only |
| `app/data/` | backend | Read only |
| `app/components/` | frontend | qa reads |
| `app/(routes)/` | frontend | qa reads |
| `next.config.ts` | estructura | Read only |
| `package.json` | lead only | Request via lead |

**Rule:** If you need to edit a file you don't own, message the owner first.

## Phase Workflow

### Phase 1: Architecture (estructura only)
- Data types, route structure, component tree, Sanity schemas.
- Configure `@theme` tokens in `app/globals.css` (Tailwind v4 CSS-first setup).
- Configure `next.config.ts` for Next.js 16 (remote images, React Compiler if enabled).
- Output: `docs/architecture/*.md` + `app/types/*.ts` + `app/globals.css` with `@theme`
- **Gate:** Lead reviews and approves before Phase 2.

### Phase 2: Implementation (backend + frontend in parallel)
- backend: Sanity client, queries, fetchers with `"use cache"`, API routes, fallback data.
- frontend: Components, pages, layouts, loading/error states.
- qa: Reviews continuously, sends feedback in real-time.
- **Gate:** `npm run build` + `npm run lint` pass, qa approves all code.

### Phase 3: Integration & Polish (all teammates)
- Connect frontend to real data layer.
- End-to-end testing of all Spanish routes.
- Responsive verification (mobile 375px, tablet 768px, desktop 1280px).
- Metadata/SEO for all pages (`generateMetadata` in Spanish).
- **Gate:** Full build passes, all routes work with AND without Sanity env vars.

## Communication Protocol

1. Backend publishes types + fetcher signatures → then frontend starts consuming.
2. Frontend never assumes data shape — always imports from `app/types/`.
3. QA sends feedback as direct messages to the specific teammate, not the lead.
4. Disagreements or ambiguities → escalate to lead.
5. Teammates report phase completion to lead. Lead confirms before next phase.