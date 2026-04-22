# MARR Marketing Website — UI Kit

Pixel-close recreation of the MARR marketing site in JSX.

**Source**: `foxhue/marr-laser/website/` (styles.css, index.html).

## Components
- `Nav.jsx` — sticky centered-logo nav with taupe pill hover
- `Hero.jsx` — split blush-panel + image hero
- `Eyebrow.jsx` — small serif caps label
- `Button.jsx` — primary / outline / ghost
- `ServiceCard.jsx` — taupe-stripe white card
- `SectionHeader.jsx` — eyebrow + h2 + lead
- `Testimonial.jsx` — white card on taupe band
- `StatBlock.jsx` — taupe tile with serif numeral
- `Footer.jsx` — charcoal footer with stacked wordmark

Open `index.html` to see the homepage rendered end to end.

## Design Tokens

### Typography
- **Heading font**: Cormorant Garamond (300 light, 400 regular)
- **Body font**: Noto Sans (300 light, 400 regular, 500 medium)
- **Heading treatment**: uppercase, letter-spacing 0.1em
- **Eyebrow**: Cormorant Garamond 400, 0.6875rem (11px), letter-spacing 0.15em, uppercase
- **Button labels**: Cormorant Garamond 400, 0.6875rem, letter-spacing 0.1em, uppercase

### Colors
- **Primary (charcoal)**: #3C3C3B
- **Secondary (taupe)**: #C6BCB3
- **Accent (blush)**: #ECE5E0
- **Background (offwhite)**: #F9F9F8
- **White**: #FFFFFF

### Shadows
- **Card**: 0 1px 3px rgba(60,60,59,0.08)
- **Card hover**: 0 4px 12px rgba(60,60,59,0.12)
- **Testimonial**: 0 2px 8px rgba(60,60,59,0.06)

### Radii
- **Small**: 0.25rem
- **Medium**: 0.5rem
- **Large**: 999px (pill)

## Brand Rules
- No backdrop-filter / glassmorphism
- No gradients
- No emoji in UI
- Cangste (brand-book display face) has no webfont — Cormorant Garamond 300 is the deliberate fallback
- Primary CTA color is taupe (secondary), not charcoal (primary)
- All headings are light weight (300), never bold
