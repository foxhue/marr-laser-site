# MARR Laser & Skin Clinic — Production Site

Astro + Sanity CMS production website for MARR Laser & Skin Clinic, Paisley.

## Design Direction
- **Design C: "Warm Boutique"** — elegant, approachable, warm
- Fonts: Cormorant Garamond (headings, weight 400) + Noto Sans (body)
- Colors: charcoal primary (#3C3C3B), taupe secondary (#C6BCB3), blush accent (#ECE5E0)
- Centered logo header with pill-shaped nav hover states
- Split color-block hero (blush panel + image)
- Taupe accent stripes on service cards, soft shadows
- Pill-shaped CTA buttons with uppercase tracking

## Structure
- `apps/web` — Astro frontend (SSG, deploys to Vercel)
- `apps/studio` — Sanity Studio (deploys to marr-laser.sanity.studio)
- `packages/shared` — Shared TypeScript types

## Pages
- `/` — Homepage (hero, pathway cards, clinic feature, featured treatments, testimonials, CTA)
- `/services` — All treatments grid
- `/services/[slug]` — Treatment detail
- `/pricing` — Pricing grid pulling service prices
- `/about` — Clinic story + team
- `/team` — Dedicated team page
- `/contact` — Contact form + location + hours
- `/faq` — FAQ accordion

## MARR-Specific Components
- `PathwayCards.astro` — 3-card treatment pathway on homepage
- `ClinicFeature.astro` — "Why choose MARR" feature list

## Commands
- `npm run dev` — Start Astro dev server (:4321)
- `npm run dev:studio` — Start Sanity Studio (:3333)
- `npm run dev:all` — Start both
- `npm run build` — Build Astro for production
- `npm run scaffold` — Generate tokens.css from project.json

## Key Files
- `project.json` — MARR brand config (colors, fonts, features)
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
- Heading font-weight: 400 (not bold — Cormorant Garamond looks best light)
- Buttons: pill-shaped (border-radius: full), uppercase, letter-spacing
