/**
 * AEROPOLIMENTO — Design Tokens v2.0
 * "Leve como ar. Preciso como engenharia."
 *
 * Fonte única da verdade para tokens de design.
 * Espelha os CSS custom properties definidos em globals.css.
 */

// ── Cores de Marca ────────────────────────────────────────────────
export const colors = {
  brand: {
    red:        '#BD1622',
    redDark:    '#991B1B',
    redDeeper:  '#7A1212',
    redLight:   '#FEE2E2',
    redHover:   '#E40014',
    redGlow:    'rgba(189, 22, 34, 0.18)',
  },
  surface: {
    canvas:   '#FFFFFF',
    base:     '#FAFAFA',
    subtle:   '#F5F5F5',
    muted:    '#EFEFEF',
    elevated: '#FFFFFF',
    overlay:  'rgba(255, 255, 255, 0.90)',
  },
  text: {
    primary:   '#0F0F0F',
    secondary:  '#404040',
    tertiary:  '#6B6B6B',
    muted:     '#A3A3A3',
    disabled:  '#D4D4D4',
    inverse:   '#FFFFFF',
    brand:     '#BD1622',
  },
  border: {
    subtle:  'rgba(0, 0, 0, 0.06)',
    default: 'rgba(0, 0, 0, 0.10)',
    strong:  'rgba(0, 0, 0, 0.18)',
    brand:   'rgba(189, 22, 34, 0.30)',
  },
  state: {
    success: '#16A34A',
    warning: '#D97706',
    error:   '#DC2626',
    info:    '#2563EB',
  },
} as const;

// ── Tipografia ─────────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans:    "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono:    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    display: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
  },
  fontSize: {
    hero:    'clamp(3rem, 5.5vw + 1rem, 5rem)',
    title:   'clamp(2rem, 3vw + 0.75rem, 3rem)',
    heading: 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
    subhead: 'clamp(1.125rem, 1.5vw + 0.25rem, 1.375rem)',
    body:    '1rem',
    small:   '0.875rem',
    xs:      '0.75rem',
    badge:   '0.8125rem',
  },
  letterSpacing: {
    tightest: '-0.04em',
    tight:    '-0.02em',
    normal:   '0em',
    wide:     '0.04em',
    wider:    '0.08em',
    widest:   '0.16em',
  },
  lineHeight: {
    tight:   1.1,
    snug:    1.3,
    normal:  1.5,
    relaxed: 1.7,
  },
} as const;

// ── Espaçamento (8pt grid) ─────────────────────────────────────────
export const spacing = {
  1:  '0.25rem',   //  4px
  2:  '0.5rem',    //  8px
  3:  '0.75rem',   // 12px
  4:  '1rem',      // 16px
  5:  '1.25rem',   // 20px
  6:  '1.5rem',    // 24px
  8:  '2rem',      // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
} as const;

// ── Border Radius ──────────────────────────────────────────────────
export const radii = {
  xs:   '0.25rem',
  sm:   '0.5rem',
  md:   '0.75rem',
  lg:   '1rem',
  xl:   '1.5rem',
  '2xl':'2rem',
  full: '9999px',
} as const;

// ── Sombras ────────────────────────────────────────────────────────
export const shadows = {
  xs:      '0 1px 2px rgba(0,0,0,0.04)',
  sm:      '0 1px 4px rgba(0,0,0,0.06)',
  md:      '0 4px 12px rgba(0,0,0,0.08)',
  lg:      '0 12px 32px rgba(0,0,0,0.10)',
  xl:      '0 24px 64px rgba(0,0,0,0.12)',
  brand:   '0 8px 32px rgba(189, 22, 34, 0.20)',
  product: '0 40px 80px -20px rgba(189, 22, 34, 0.14)',
  glass:   '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
} as const;

// ── Gradientes ─────────────────────────────────────────────────────
export const gradients = {
  hero:    'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)',
  brand:   'linear-gradient(135deg, #BD1622 0%, #7A1212 100%)',
  text:    'linear-gradient(135deg, #0F0F0F 0%, #404040 100%)',
  shine:   'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  glow:    'radial-gradient(ellipse at center, rgba(189,22,34,0.12) 0%, transparent 70%)',
  surface: 'linear-gradient(180deg, #FAFAFA 0%, #F2F2F2 100%)',
  card:    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(250,250,250,0.8) 100%)',
} as const;

// ── Animações / Transições ─────────────────────────────────────────
export const animation = {
  easing: {
    outExpo:  'cubic-bezier(0.16, 1, 0.3, 1)',
    inExpo:   'cubic-bezier(0.7, 0, 0.84, 0)',
    inOut:    'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce:   'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  duration: {
    instant: '80ms',
    fast:    '150ms',
    normal:  '250ms',
    slow:    '400ms',
    slower:  '700ms',
  },
} as const;

// ── Breakpoints ────────────────────────────────────────────────────
export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
} as const;

// ── Classe utilitárias prontas (para usar com cn()) ─────────────────
export const cls = {
  sectionContainer: 'w-full max-w-[1280px] mx-auto px-[clamp(1.5rem,5vw,4rem)]',
  sectionPadding:   'py-[clamp(4rem,8vw,8rem)]',
  headingHero:      'heading-hero',
  headingTitle:     'heading-title',
  headingSection:   'heading-section',
  textSubhead:      'text-subhead',
  labelBadge:       'label-badge',
  glass:            'glass',
  glassStrong:      'glass-strong',
  surfaceCard:      'surface-card',
  hoverLift:        'hover-lift',
  btnBrand:         'btn-brand btn-shine',
  btnOutline:       'btn-outline',
  tagPremium:       'tag-premium',
  tagNeutral:       'tag-neutral',
  sectionDivider:   'section-divider',
  animFadeUp:       'animate-fade-up',
  animFadeIn:       'animate-fade-in',
  animScaleIn:      'animate-scale-in',
} as const;
