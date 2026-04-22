# MARR Laser & Skin Clinic — Production Site

Astro + Sanity CMS production website for MARR Laser & Skin Clinic, Paisley.

## Design Direction
- **Design C: "Warm Boutique"** — elegant, approachable, warm
- Fonts: Cormorant Garamond (headings, 300 light / 400 regular) + Noto Sans (body, 300 / 400 / 500)
- Colors: charcoal primary (#3C3C3B), taupe secondary (#C6BCB3), blush accent (#ECE5E0), offwhite bg (#F9F9F8)
- Centered logo header with taupe pill nav hover states
- Split color-block hero (blush panel + image carousel)
- Taupe accent stripes on service cards, soft shadows (--shadow-card)
- Pill-shaped CTA buttons with uppercase tracking, taupe primary
- Eyebrow utility: .eyebrow — Cormorant 400, 11px, 0.15em tracking, uppercase
- All headings: weight 300, uppercase, letter-spacing 0.1em
- No backdrop-filter, no glassmorphism, no gradients, no emoji
- See `MARR_DESIGN_SYSTEM.md` for full design system reference

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
- `StatBlock.astro` — Big number + label unit (e.g. "92% Client retention")
- `TimelineStep.astro` — Numbered step for "What to expect" flows
- `ImageCarousel.astro` — CSS-only crossfade carousel (about page hero)
- `TeamTeaser.astro` — Compact team row with "Meet the Full Team" CTA

## Commands
- `npm run dev` — Start Astro dev server (:4321)
- `npm run dev:studio` — Start Sanity Studio (:3333)
- `npm run dev:all` — Start both
- `npm run build` — Build Astro for production
- `npm run scaffold` — Generate tokens.css from project.json

## Key Files
- `project.json` — MARR brand config (colors, fonts, features)
- `MARR_DESIGN_SYSTEM.md` — Full design system reference (tokens, components, brand rules)
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
- Heading font-weight: 300 (light), uppercase, letter-spacing 0.1em
- Body font-weight: 300 (light), letter-spacing 0.02em
- Buttons: pill-shaped (border-radius: var(--radius-lg)), Cormorant 400, 11px, uppercase
- Primary CTA: taupe background (var(--color-secondary)), not charcoal
- Logos in `public/logos/` — wordmark-dark.svg (header), wordmark-light.svg (footer)
