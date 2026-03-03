# Foxhue Starter Template

Astro + Sanity CMS monorepo for foxhue client websites. Clients get self-service content management; sites stay fast, static, and free to host.

## Quick Start

### 1. Create a new project from this template

```bash
gh repo create foxhue/{client} --template foxhue/starter-template
git clone https://github.com/foxhue/{client}.git
cd {client}
```

### 2. Set up Sanity

```bash
cd apps/studio
npx sanity init --project-plan free
```

This gives you a Sanity project ID. Copy it.

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Sanity project ID:
```
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
```

Also create `apps/studio/.env`:
```
SANITY_STUDIO_PROJECT_ID=abc123xyz
SANITY_STUDIO_DATASET=production
```

### 4. Customize branding

Edit `project.json` with client brand colors, fonts, and features. Then generate design tokens:

```bash
npm run scaffold
```

This generates `apps/web/src/styles/tokens.css` from your `project.json` brand config.

### 5. Install and run

```bash
npm install
npm run dev:all
```

- Astro frontend: http://localhost:4321
- Sanity Studio: http://localhost:3333

### 6. Add content

Open Sanity Studio and create:
1. **Site Settings** — site name, logo, contact info, social links
2. **Services** — at least a few, mark some as "featured"
3. **Team Members** — staff bios and photos
4. **Pages** — About page content
5. **Blog Posts** — articles with cover images
6. **FAQs** — common questions grouped by category
7. **Testimonials** — client reviews

## Deployment

### Sanity Studio

```bash
cd apps/studio
npx sanity deploy
```

Studio deploys to `{client-name}.sanity.studio` (free).

### Astro Site (Vercel)

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set root directory to `apps/web`
3. Add environment variables: `SANITY_PROJECT_ID`, `SANITY_DATASET`
4. Deploy

### Auto-rebuilds

1. In Vercel project settings, create a Deploy Hook
2. In Sanity: Manage → API → Webhooks → add the Vercel deploy hook URL
3. Now publishing content in Sanity automatically triggers a site rebuild (~30-60s)

### Invite client

In Sanity: Manage → Members → invite client with **Editor** role.

## Project Structure

```
├── project.json                 # Client brand config (colors, fonts, features)
├── apps/
│   ├── web/                     # Astro frontend
│   │   ├── astro.config.mjs
│   │   └── src/
│   │       ├── styles/          # global.css, tokens.css
│   │       ├── lib/             # sanity.ts, image.ts, queries.ts
│   │       ├── components/      # Astro components
│   │       ├── layouts/         # BaseLayout.astro
│   │       └── pages/           # Route pages
│   └── studio/                  # Sanity Studio
│       ├── sanity.config.ts
│       └── src/schemaTypes/     # CMS schemas
└── packages/
    └── shared/                  # Shared TypeScript types
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro dev server (port 4321) |
| `npm run dev:studio` | Start Sanity Studio (port 3333) |
| `npm run dev:all` | Start both |
| `npm run build` | Build Astro for production |
| `npm run scaffold` | Generate tokens.css from project.json |
| `npm run preview` | Preview production build locally |

## Tech Stack

- **[Astro](https://astro.build)** — Static site generator, zero JS by default
- **[Sanity](https://sanity.io)** — Headless CMS with real-time editing
- **Vanilla CSS** — Custom properties from tokens.css, no framework
- **[Formsubmit.co](https://formsubmit.co)** — Contact form handling, no backend
- **npm workspaces** — Monorepo management
