#!/usr/bin/env node

/**
 * Generates tokens.css from project.json brand configuration.
 * Run: npm run scaffold
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const project = JSON.parse(readFileSync(resolve(root, 'project.json'), 'utf-8'));
const { colors, fonts, borderRadius } = project.brand;

const colorVars = Object.entries(colors)
  .map(([key, value]) => {
    // Convert camelCase to kebab-case (handles letters and numbers)
    const cssKey = key
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([a-zA-Z])(\d)/g, '$1-$2')
      .toLowerCase();
    return `  --color-${cssKey}: ${value};`;
  })
  .join('\n');

const css = `/* Auto-generated from project.json — do not edit manually */
/* Run "npm run scaffold" to regenerate */

:root {
  /* Colors */
${colorVars}

  /* Typography */
  --font-heading: ${fonts.heading};
  --font-body: ${fonts.body};
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Layout */
  --max-width: 1200px;
  --max-width-narrow: 768px;

  /* Border Radius */
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-full: ${borderRadius.full};

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
`;

const outputPath = resolve(root, 'apps/web/src/styles/tokens.css');
writeFileSync(outputPath, css);
console.log(`✓ Generated ${outputPath}`);

// Also update Studio title from project.json
const studioConfigPath = resolve(root, 'apps/studio/sanity.config.ts');
try {
  let studioConfig = readFileSync(studioConfigPath, 'utf-8');
  studioConfig = studioConfig.replace(
    /title: '.*?'/,
    `title: '${project.client.name} Studio'`
  );
  writeFileSync(studioConfigPath, studioConfig);
  console.log(`✓ Updated Studio title to "${project.client.name} Studio"`);
} catch {
  console.log('⚠ Could not update Studio config title');
}
