# Foxhue Starter Template

Astro + Sanity CMS monorepo for foxhue client websites.

## Structure
- `apps/web` — Astro frontend (SSG, deploys to Vercel)
- `apps/studio` — Sanity Studio (deploys to {client}.sanity.studio)
- `packages/shared` — Shared TypeScript types

## Commands
- `npm run dev` — Start Astro dev server (:4321)
- `npm run dev:studio` — Start Sanity Studio (:3333)
- `npm run dev:all` — Start both
- `npm run build` — Build Astro for production
- `npm run scaffold` — Generate tokens.css from project.json

## Key Files
- `project.json` — Client brand config (colors, fonts, features)
- `.env` — Sanity project ID and dataset (copy from `.env.example`)
- `apps/web/src/lib/sanity.ts` — Sanity client
- `apps/web/src/lib/queries.ts` — GROQ queries
- `apps/web/src/styles/tokens.css` — Design tokens (generated from project.json)

## Conventions
- All pages fetch data from Sanity at build time (SSG)
- Components use CSS custom properties from tokens.css
- Images use @sanity/image-url for WebP + CDN
- Rich text uses astro-portabletext
- Forms use formsubmit.co (no backend)
