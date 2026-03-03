import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const { SANITY_PROJECT_ID } = loadEnv('production', process.cwd(), 'SANITY');

export default defineConfig({
  site: 'https://marr-laser-site.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    envDir: '../../',
  },
});
