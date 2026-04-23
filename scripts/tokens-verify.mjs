#!/usr/bin/env node
/**
 * tokens-verify.mjs — Parity gate between CSS @theme and TS token re-export.
 *
 * Enforces CONTEXT D-17: every `var(--X)` referenced in `src/lib/tokens.ts`
 * must exist as `--X:` declaration in `src/app/globals.css` (@theme or :root block),
 * except for whitelisted keys (shadcn bridge vars, radii/fonts served outside tokens.ts,
 * internal aliases like --brand-red).
 *
 * Run via: `npm run tokens:verify`.
 * Exit 0 = parity OK; exit 1 = drift detected (with explanation).
 */

import { readFileSync } from 'node:fs';

// Keys declared in globals.css @theme or :root, but intentionally without
// a TS counterpart in tokens.ts. Extend this list when adding a @theme var
// that is NOT part of the public token API (e.g. shadcn bridge vars).
const WHITELIST_CSS_ONLY = new Set([
  // shadcn bridge vars (só-CSS; mapeadas via @theme inline para tokens Aeropolimento)
  // Declared in :root as semantic shadcn names...
  '--background', '--foreground',
  '--card', '--card-foreground',
  '--popover', '--popover-foreground',
  '--primary', '--primary-foreground',
  '--secondary', '--secondary-foreground',
  '--muted', '--muted-foreground',
  '--accent', '--accent-foreground',
  '--destructive', '--destructive-foreground',
  '--border', '--input', '--ring',
  '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5',
  '--sidebar', '--sidebar-foreground',
  '--sidebar-primary', '--sidebar-primary-foreground',
  '--sidebar-accent', '--sidebar-accent-foreground',
  '--sidebar-border', '--sidebar-ring',
  // ...and re-exported through @theme inline as --color-* for Tailwind utilities
  '--color-background', '--color-foreground',
  '--color-card', '--color-card-foreground',
  '--color-popover', '--color-popover-foreground',
  '--color-primary', '--color-primary-foreground',
  '--color-secondary', '--color-secondary-foreground',
  '--color-muted', '--color-muted-foreground',
  '--color-accent', '--color-accent-foreground',
  '--color-destructive',
  '--color-border', '--color-input', '--color-ring',
  '--color-chart-1', '--color-chart-2', '--color-chart-3', '--color-chart-4', '--color-chart-5',
  '--color-sidebar', '--color-sidebar-foreground',
  '--color-sidebar-primary', '--color-sidebar-primary-foreground',
  '--color-sidebar-accent', '--color-sidebar-accent-foreground',
  '--color-sidebar-border', '--color-sidebar-ring',

  // Radii base (Tailwind v4 consumes via utility classes p-*/rounded-*)
  '--radius', '--radius-xs', '--radius-sm', '--radius-md',
  '--radius-lg', '--radius-xl', '--radius-2xl', '--radius-3xl', '--radius-4xl',
  '--radius-full',

  // Font-family variables (injected by next/font — no TS mirror needed)
  '--font-sans', '--font-display', '--font-mono', '--font-heading',

  // Legacy/placeholder typographic tokens (deferred to DS-04 Plan 02-03 replacement)
  '--text-hero', '--text-title', '--text-heading', '--text-subhead',
  '--text-body', '--text-small', '--text-xs', '--text-badge',

  // Letter-spacing + line-height (Tailwind utilities consume directly)
  '--tracking-tightest', '--tracking-tight', '--tracking-normal',
  '--tracking-wide', '--tracking-wider', '--tracking-widest',
  '--leading-tight', '--leading-snug', '--leading-normal', '--leading-relaxed',

  // Base spacing scale (consumed via Tailwind p-*/m-*/gap-* utilities, not TS)
  '--space-1', '--space-2', '--space-3', '--space-4', '--space-5',
  '--space-6', '--space-8', '--space-10', '--space-12', '--space-16',
  '--space-20', '--space-24', '--space-32',

  // Glass + gradient custom properties (consumed via utility classes in globals.css, not TS)
  '--glass-bg', '--glass-border', '--glass-blur',
  '--gradient-hero', '--gradient-brand', '--gradient-text',
  '--gradient-shine', '--gradient-glow', '--gradient-surface', '--gradient-card',
]);

const CSS_PATH = 'src/app/globals.css';
const TS_PATH  = 'src/lib/tokens.ts';

const css = readFileSync(CSS_PATH, 'utf8');
const ts  = readFileSync(TS_PATH, 'utf8');

// Extract every `--foo:` declaration in the CSS file (globals.css uses them in @theme, :root, .dark)
const cssKeys = [...new Set(
  (css.match(/^\s*(--[a-z0-9-]+):/gmi) || [])
    .map(l => l.trim().replace(':', ''))
)].sort();

// Extract every `var(--foo)` reference inside tokens.ts
const tsKeys = [...new Set(
  (ts.match(/var\((--[a-z0-9-]+)\)/gi) || [])
    .map(m => m.replace(/^var\(/, '').replace(/\)$/, ''))
)].sort();

// Keys declared in @theme (or :root) but NOT referenced from tokens.ts
const missingInTs = cssKeys.filter(k => !tsKeys.includes(k) && !WHITELIST_CSS_ONLY.has(k));
// Keys referenced from tokens.ts but NOT declared in @theme
const extraInTs = tsKeys.filter(k => !cssKeys.includes(k));

if (missingInTs.length) {
  console.error('[tokens:verify] FAIL — keys in globals.css NOT referenced by tokens.ts:');
  missingInTs.forEach(k => console.error('  ' + k));
  console.error('\nFix: add a var() ref in tokens.ts OR add the key to WHITELIST_CSS_ONLY in scripts/tokens-verify.mjs');
  process.exit(1);
}

if (extraInTs.length) {
  console.error('[tokens:verify] FAIL — tokens.ts references var() not declared in globals.css:');
  extraInTs.forEach(k => console.error('  ' + k));
  console.error('\nFix: declare the var in globals.css @theme OR remove the tokens.ts ref');
  process.exit(1);
}

console.log(`[tokens:verify] OK — globals.css (${cssKeys.length} keys) and tokens.ts (${tsKeys.length} refs) are in parity.`);
