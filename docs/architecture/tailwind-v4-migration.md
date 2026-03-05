# Tailwind CSS v4 Migration Guide

## Current State

The project currently uses **Tailwind CSS v3.4.17** with:
- `tailwind.config.ts` — JavaScript/TypeScript configuration
- `@tailwind base/components/utilities` — Directive imports

## Target State

The CLAUDE.md specifies **Tailwind CSS v4.1** with:
- CSS-first configuration via `@theme` block
- `@import "tailwindcss"` — Single import
- No `tailwind.config.ts` file needed

## Migration Steps

### Step 1: Update Dependencies

Request lead to update `package.json`:

```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.0",
    "postcss": "^8.5.1",
    "autoprefixer": "^10.4.20"
  }
}
```

Run:
```bash
npm install
```

### Step 2: Update globals.css

Replace:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

With:
```css
@import "tailwindcss";

@theme {
  /* All theme tokens go here */
}
```

### Step 3: Migrate Theme Configuration

Move all values from `tailwind.config.ts` to the `@theme` block.

**Before (tailwind.config.ts):**
```typescript
theme: {
  extend: {
    colors: {
      pink: '#E91E8C',
      'pink-light': '#F472B6',
      // ...
    },
    fontFamily: {
      display: ['var(--font-montserrat)', 'sans-serif'],
    },
  },
}
```

**After (globals.css @theme):**
```css
@theme {
  --font-montserrat: "Montserrat", ui-sans-serif, system-ui, sans-serif;

  --color-pink: #E91E8C;
  --color-pink-light: #F472B6;
  --color-pink-dark: #BE185D;

  --color-cyan: #22D3EE;
  --color-cyan-dark: #0891B2;

  --color-yellow: #FBD000;

  --color-purple: #9333EA;
  --color-purple-light: #C084FC;

  --color-ink: #1A0A12;
  --color-ink-muted: #6B4C5C;
  --color-ink-faint: #C4A8B4;

  --color-page: #FFFFFF;
  --color-page-soft: #FDF2F8;
  --color-surface: #FFFFFF;
  --color-surface-alt: #FDF2F8;

  --color-border: #FBCFE8;
  --color-border-strong: #F9A8D4;

  --color-dark: #1A0A12;
  --color-dark-soft: #2D0A1E;
  --color-dark-surface: #0D0508;
}
```

### Step 4: Delete tailwind.config.ts

Once all configuration is in `@theme`, delete:
- `tailwind.config.ts`

### Step 5: Update postcss.config.mjs (if needed)

Tailwind v4 may have different PostCSS requirements. Check official migration docs.

## Key Differences

| Feature | v3 | v4 |
|---------|----|----|
| Config location | `tailwind.config.ts` | `@theme` in CSS |
| Import | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Content detection | Manual `content` array | Automatic |
| Container queries | Plugin needed | Built-in |
| Arbitrary values | `bg-[#E91E8C]` | Same (backward compatible) |

## Backward Compatibility Notes

- All Tailwind utilities work the same way
- Component classes using `@apply` work the same
- Custom utilities in `@layer utilities` work the same
- `@layer base/components/utilities` continue to work

## Testing the Migration

After migration:

1. Run `npm run build` — Should complete without errors
2. Run `npm run dev` — Check all pages render correctly
3. Verify all brand colors display correctly
4. Test hover/focus states
5. Check responsive breakpoints
6. Verify animations work with `prefers-reduced-motion`

## Rollback Plan

If issues arise:
1. Restore `tailwind.config.ts` from git
2. Revert `globals.css` to use `@tailwind` directives
3. Downgrade tailwindcss in package.json to `^3.4.17`
4. Run `npm install`

## Reference

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [v3 to v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
