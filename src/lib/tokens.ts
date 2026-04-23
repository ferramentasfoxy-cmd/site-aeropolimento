/**
 * Aeropolimento V3 — Design Tokens (TypeScript)
 *
 * Source of truth: `src/app/globals.css` @theme block.
 * This file is a thin re-export — manutenção MANUAL (per CONTEXT D-15, D-19: no auto-generator).
 *
 * Parity verification: `npm run tokens:verify` diffs @theme keys vs var() refs aqui.
 *
 * Usage:
 *   import { COLORS, SHADOWS, DURATIONS } from '@/lib/tokens';
 *   <div style={{ background: COLORS.surfaceBase, boxShadow: SHADOWS.md }} />
 *
 * Structure follows CONTEXT D-16 (7 const groups + derived union types).
 */

// ══════════════════════════════════════════════════════════════
// Colors — UI-SPEC §4.2 (60/30/10 contract)
// ══════════════════════════════════════════════════════════════

export const COLORS = {
  // Brand (10% accent)
  brandRed:        'var(--color-aero-red)',
  brandRedDark:    'var(--color-aero-red-dark)',
  brandRedDeeper:  'var(--color-aero-red-deeper)',
  brandRedLight:   'var(--color-aero-red-light)',
  brandRedHover:   'var(--color-aero-red-hover)',
  brandRedGlow:    'var(--color-aero-red-glow)',

  // Surface (60%)
  surfaceCanvas:   'var(--color-surface-canvas)',
  surfaceBase:     'var(--color-surface-base)',
  surfaceSubtle:   'var(--color-surface-subtle)',
  surfaceMuted:    'var(--color-surface-muted)',
  surfaceElevated: 'var(--color-surface-elevated)',
  surfaceOverlay:  'var(--color-surface-overlay)',

  // Text / Neutral (30%)
  textPrimary:     'var(--color-text-primary)',
  textSecondary:   'var(--color-text-secondary)',
  textTertiary:    'var(--color-text-tertiary)',
  textMuted:       'var(--color-text-muted)',
  textDisabled:    'var(--color-text-disabled)',
  textInverse:     'var(--color-text-inverse)',
  textBrand:       'var(--color-text-brand)',

  // Borders
  borderSubtle:    'var(--color-border-subtle)',
  borderDefault:   'var(--color-border-default)',
  borderStrong:    'var(--color-border-strong)',
  borderBrand:     'var(--color-border-brand)',

  // Semantic states (raro — forms + status only)
  stateSuccess:    'var(--color-state-success)',
  stateWarning:    'var(--color-state-warning)',
  stateError:      'var(--color-state-error)',
  stateInfo:       'var(--color-state-info)',
} as const;
export type ColorToken = keyof typeof COLORS;

// ══════════════════════════════════════════════════════════════
// Typography — Fluid Scale V3 (UI-SPEC §3.3, 15 tokens)
// DS-04 Plan 02-03 populated FONT_SIZES with the fluid clamp-based scale.
// Each var() is declared in globals.css @theme with suffix syntax
// (--text-X--line-height / --letter-spacing / --font-weight), so the
// matching Tailwind utility class .text-X already applies all 4 properties.
// ══════════════════════════════════════════════════════════════

export const FONT_SIZES = {
  displayXl: 'var(--text-display-xl)',
  displayLg: 'var(--text-display-lg)',
  displayMd: 'var(--text-display-md)',
  h1:        'var(--text-h1)',
  h2:        'var(--text-h2)',
  h3:        'var(--text-h3)',
  h4:        'var(--text-h4)',
  h5:        'var(--text-h5)',
  h6:        'var(--text-h6)',
  bodyLg:    'var(--text-body-lg)',
  bodyMd:    'var(--text-body-md)',
  bodySm:    'var(--text-body-sm)',
  caption:   'var(--text-caption)',
  label:     'var(--text-label)',
  mono:      'var(--text-mono)',
} as const;
export type FontSize = keyof typeof FONT_SIZES;

export const FONT_WEIGHTS = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;
export type FontWeight = keyof typeof FONT_WEIGHTS;

// ══════════════════════════════════════════════════════════════
// Spacing — UI-SPEC §5.2 semantic layer
// (Tailwind-base 4px scale is handled by utility classes p-1..p-32; these are layout-macro vars)
// ══════════════════════════════════════════════════════════════

export const SPACING = {
  section:       'var(--space-section)',
  sectionTight:  'var(--space-section-tight)',
  block:         'var(--space-block)',
  cardGap:       'var(--space-card-gap)',
  cardPad:       'var(--space-card-pad)',
  inlineTight:   'var(--space-inline-tight)',
  inlineNormal:  'var(--space-inline-normal)',
  inlineLoose:   'var(--space-inline-loose)',
  stackXs:       'var(--space-stack-xs)',
  stackSm:       'var(--space-stack-sm)',
  stackMd:       'var(--space-stack-md)',
  stackLg:       'var(--space-stack-lg)',
  stackXl:       'var(--space-stack-xl)',
} as const;
export type SpacingToken = keyof typeof SPACING;

// ══════════════════════════════════════════════════════════════
// Shadows — UI-SPEC §6.3
// ══════════════════════════════════════════════════════════════

export const SHADOWS = {
  xs:      'var(--shadow-xs)',
  sm:      'var(--shadow-sm)',
  md:      'var(--shadow-md)',
  lg:      'var(--shadow-lg)',
  xl:      'var(--shadow-xl)',
  brand:   'var(--shadow-brand)',
  product: 'var(--shadow-product)',
  glass:   'var(--shadow-glass)',
} as const;
export type ShadowToken = keyof typeof SHADOWS;

// ══════════════════════════════════════════════════════════════
// Motion (CSS side) — UI-SPEC §7.4
// GSAP side (DURATION, EASE const assertions) lives in src/lib/animations/defaults.ts per Plan 02-05 (DS-05).
// ══════════════════════════════════════════════════════════════

export const DURATIONS = {
  instant: 'var(--duration-instant)', // 80ms
  fast:    'var(--duration-fast)',    // 150ms
  normal:  'var(--duration-normal)',  // 250ms
  slow:    'var(--duration-slow)',    // 400ms
  slower:  'var(--duration-slower)',  // 700ms
} as const;
export type DurationToken = keyof typeof DURATIONS;

export const EASINGS = {
  outExpo: 'var(--ease-out-expo)',
  inExpo:  'var(--ease-in-expo)',
  inOut:   'var(--ease-in-out)',
  spring:  'var(--ease-spring)',
  bounce:  'var(--ease-bounce)',
} as const;
export type EasingToken = keyof typeof EASINGS;
