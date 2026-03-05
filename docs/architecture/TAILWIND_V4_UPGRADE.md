# Tailwind CSS v4 Upgrade Required

## Current State
- Installed: `tailwindcss@3.4.19`
- `app/globals.css` is written for Tailwind v4 (CSS-first with `@theme`)
- Build fails because v3 doesn't support `@import "tailwindcss"` syntax

## Required Changes to package.json

The lead needs to run the following to upgrade:

```bash
# Remove v3 dependencies (no longer needed in v4)
npm uninstall autoprefixer postcss

# Install Tailwind v4
npm install tailwindcss@^4.1.0
```

## Updated devDependencies

```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4.1.0"
  }
}
```

## Files Deleted (No Longer Needed in v4)
- `tailwind.config.ts` — Configuration is now CSS-native in `@theme`
- `postcss.config.mjs` — Tailwind v4 doesn't require PostCSS config

## Files Updated
- `app/globals.css` — Now uses `@import "tailwindcss"` and `@theme { }`

## Migration Summary

Tailwind v4 key differences:
1. **CSS-first configuration** — All tokens in `@theme { }` block
2. **No config file** — `tailwind.config.ts` is not used
3. **No PostCSS** — Built-in bundler, no `postcss.config.mjs` needed
4. **`@import "tailwindcss"`** — Replaces `@tailwind base/components/utilities`
5. **Automatic content detection** — No `content` array needed

## After Upgrade

Once the lead updates dependencies, run:
```bash
npm run build
```

The build should pass with the current `app/globals.css`.
