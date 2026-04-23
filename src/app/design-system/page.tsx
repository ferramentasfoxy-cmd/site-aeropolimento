"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ─── Helpers locais ───────────────────────────────────────────────── */
function Section({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      <div className="mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">{title}</h2>
        {description && <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function TokenRow({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-[var(--color-border-subtle)] last:border-0">
      {preview && <div className="shrink-0">{preview}</div>}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">{name}</p>
      </div>
      <code className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-subtle)] px-2 py-0.5 rounded shrink-0">{value}</code>
    </div>
  );
}

/* ─── Color Tokens (DS-01 — UI-SPEC §4.2 60/30/10) ──────────────────── */
type SwatchEntry = { name: string; css: string; hex: string; role: string };

const brandSwatches: SwatchEntry[] = [
  { name: "brandRed",        css: "--color-aero-red",        hex: "#BD1622",             role: "Accent canônico — CTAs, focus ring, section bar" },
  { name: "brandRedDark",    css: "--color-aero-red-dark",   hex: "#991B1B",             role: "Hover .btn-brand" },
  { name: "brandRedDeeper",  css: "--color-aero-red-deeper", hex: "#7A1212",             role: "Tag-premium text, gradient stop 2" },
  { name: "brandRedLight",   css: "--color-aero-red-light",  hex: "#FEE2E2",             role: "Tag-premium bg, hover .btn-outline" },
  { name: "brandRedHover",   css: "--color-aero-red-hover",  hex: "#E40014",             role: "Alt hover (pontos específicos)" },
  { name: "brandRedGlow",    css: "--color-aero-red-glow",   hex: "rgba(189,22,34,.18)", role: "Shadow-brand base" },
];

const surfaceSwatches: SwatchEntry[] = [
  { name: "surfaceCanvas",   css: "--color-surface-canvas",   hex: "#FFFFFF",              role: "Body background" },
  { name: "surfaceBase",     css: "--color-surface-base",     hex: "#FAFAFA",              role: "Cards, feature surfaces" },
  { name: "surfaceSubtle",   css: "--color-surface-subtle",   hex: "#F5F5F5",              role: "Sheet backdrop, HUD seal" },
  { name: "surfaceMuted",    css: "--color-surface-muted",    hex: "#EFEFEF",              role: "Separators, dividers" },
  { name: "surfaceElevated", css: "--color-surface-elevated", hex: "#FFFFFF",              role: "Elevated cards (diff via shadow)" },
  { name: "surfaceOverlay",  css: "--color-surface-overlay",  hex: "rgba(255,255,255,.90)", role: "Overlays sobre mídia" },
];

const textSwatches: SwatchEntry[] = [
  { name: "textPrimary",   css: "--color-text-primary",   hex: "#0F0F0F", role: "Body text (19.5:1 AAA on canvas)" },
  { name: "textSecondary", css: "--color-text-secondary", hex: "#404040", role: "Secondary text (10.5:1 AAA)" },
  { name: "textTertiary",  css: "--color-text-tertiary",  hex: "#6B6B6B", role: "Captions (5.3:1 AA 18px+)" },
  { name: "textMuted",     css: "--color-text-muted",     hex: "#A3A3A3", role: "Icons 24px+ only (FAIL AA text)" },
  { name: "textDisabled",  css: "--color-text-disabled",  hex: "#D4D4D4", role: "Disabled / skeleton" },
  { name: "textInverse",   css: "--color-text-inverse",   hex: "#FFFFFF", role: "Text over brand red" },
  { name: "textBrand",     css: "--color-text-brand",     hex: "#BD1622", role: "Brand text on canvas (5.9:1 AA)" },
];

const borderStateSwatches: SwatchEntry[] = [
  { name: "borderSubtle",  css: "--color-border-subtle",  hex: "rgba(0,0,0,.06)",      role: "Cards default" },
  { name: "borderDefault", css: "--color-border-default", hex: "rgba(0,0,0,.10)",      role: "Inputs, buttons outline" },
  { name: "borderStrong",  css: "--color-border-strong",  hex: "rgba(0,0,0,.18)",      role: "Separators" },
  { name: "borderBrand",   css: "--color-border-brand",   hex: "rgba(189,22,34,.30)", role: "spec-card hover" },
  { name: "stateSuccess",  css: "--color-state-success",  hex: "#16A34A",              role: "Form success (AA)" },
  { name: "stateWarning",  css: "--color-state-warning",  hex: "#D97706",              role: "Form warning (borderline)" },
  { name: "stateError",    css: "--color-state-error",    hex: "#DC2626",              role: "Form error (AA)" },
  { name: "stateInfo",     css: "--color-state-info",     hex: "#2563EB",              role: "Info messages (AAA)" },
];

function ColorSwatch({ name, css, hex, role }: SwatchEntry) {
  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] overflow-hidden">
      <div
        className="h-20 w-full border-b border-[var(--color-border-subtle)]"
        style={{ background: `var(${css})` }}
        aria-hidden="true"
      />
      <div className="p-3 space-y-1 bg-[var(--color-surface-canvas)]">
        <div className="font-mono text-[0.7rem] font-semibold text-[var(--color-text-primary)]">{name}</div>
        <div className="font-mono text-[0.65rem] text-[var(--color-text-tertiary)]">{hex}</div>
        <div className="font-mono text-[0.6rem] text-[var(--color-text-muted)] break-all">{css}</div>
        <div className="text-[0.72rem] leading-snug text-[var(--color-text-tertiary)]">{role}</div>
      </div>
    </div>
  );
}

/* ─── Tipografia ─────────────────────────────────────────────────────── */
const typeTokens = [
  { name: "--text-hero",    value: "clamp(3rem, 5.5vw + 1rem, 5rem)",         sample: "Hero Heading" },
  { name: "--text-title",   value: "clamp(2rem, 3vw + 0.75rem, 3rem)",         sample: "Title" },
  { name: "--text-heading", value: "clamp(1.5rem, 2vw + 0.5rem, 2rem)",        sample: "Heading" },
  { name: "--text-subhead", value: "clamp(1.125rem, 1.5vw + 0.25rem, 1.375rem)", sample: "Subheading" },
  { name: "--text-body",    value: "1rem",                                      sample: "Body text" },
  { name: "--text-small",   value: "0.875rem",                                  sample: "Small text" },
  { name: "--text-xs",      value: "0.75rem",                                   sample: "Extra small" },
  { name: "--text-badge",   value: "0.8125rem",                                 sample: "Badge / Label" },
];

/* ─── Sombras ────────────────────────────────────────────────────────── */
const shadowTokens = [
  { name: "--shadow-xs",      value: "0 1px 2px rgba(0,0,0,0.04)" },
  { name: "--shadow-sm",      value: "0 1px 4px rgba(0,0,0,0.06)" },
  { name: "--shadow-md",      value: "0 4px 12px rgba(0,0,0,0.08)" },
  { name: "--shadow-lg",      value: "0 12px 32px rgba(0,0,0,0.10)" },
  { name: "--shadow-xl",      value: "0 24px 64px rgba(0,0,0,0.12)" },
  { name: "--shadow-brand",   value: "0 8px 32px rgba(189,22,34,0.20)" },
  { name: "--shadow-product", value: "0 40px 80px -20px rgba(189,22,34,0.14)" },
];

/* ─── Easing ─────────────────────────────────────────────────────────── */
const easingTokens = [
  { name: "--ease-out-expo",  value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { name: "--ease-in-expo",   value: "cubic-bezier(0.7, 0, 0.84, 0)" },
  { name: "--ease-in-out",    value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { name: "--ease-spring",    value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { name: "--ease-bounce",    value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
];

/* ─── Animações de entrada ───────────────────────────────────────────── */
const animClasses = [
  "animate-fade-up",
  "animate-fade-up-delay-1",
  "animate-fade-up-delay-2",
  "animate-fade-up-delay-3",
  "animate-fade-in",
  "animate-scale-in",
  "animate-slide-left",
  "animate-slide-right",
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-canvas)]">
      {/* Header fixo da página */}
      <header className="sticky top-0 z-50 glass-strong border-b border-[var(--color-border-subtle)] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--color-aero-red)] animate-pulse" />
          <span className="font-bold text-sm tracking-widest uppercase text-[var(--color-text-primary)]">
            Aeropolimento — Design System
          </span>
          <span className="tag-neutral">v2.0</span>
        </div>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">globals.css + tokens.ts</span>
      </header>

      <main className="section-container section-padding">

        {/* ── Hero da página ── */}
        <div className="mb-20 text-center">
          <p className="label-badge mb-4">Design System</p>
          <h1 className="heading-hero mb-4">Aeropolimento <span className="text-gradient-brand">Visual Language</span></h1>
          <p className="text-subhead max-w-2xl mx-auto">
            Tokens, componentes e padrões que definem a identidade visual premium do ecossistema Aeropolimento.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="section-divider" />
            <span className="text-xs font-mono text-[var(--color-text-muted)]">scroll para explorar</span>
            <div className="section-divider" />
          </div>
        </div>

        {/* ════════ 1. COLOR TOKENS — 60/30/10 (DS-01) ════════ */}
        <section aria-labelledby="ds-color-tokens" className="mb-20 space-y-8">
          <div className="mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            <h2
              id="ds-color-tokens"
              className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
            >
              Color Tokens — 60/30/10
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-tertiary)] max-w-3xl">
              Paleta institucional Aeropolimento. Surface <strong>60%</strong> / Neutral{" "}
              <strong>30%</strong> / Accent vermelho <strong>10%</strong>. Tokens declarados em{" "}
              <code className="font-mono text-xs bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded">
                globals.css @theme
              </code>{" "}
              (canonical) e consumidos via{" "}
              <code className="font-mono text-xs bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded">
                COLORS.*
              </code>{" "}
              em TS ou{" "}
              <code className="font-mono text-xs bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded">
                var(--color-*)
              </code>{" "}
              em CSS.
            </p>
          </div>

          {/* Brand — 10% accent */}
          <div className="space-y-3">
            <h3 className="label-badge" style={{ color: "var(--color-text-brand)" }}>
              Brand — 10% accent
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {brandSwatches.map((t) => (
                <ColorSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Surface — 60% */}
          <div className="space-y-3">
            <h3 className="label-badge">Surface — 60% backgrounds</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {surfaceSwatches.map((t) => (
                <ColorSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Text / Neutral — 30% */}
          <div className="space-y-3">
            <h3 className="label-badge">Text / Neutral — 30%</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
              {textSwatches.map((t) => (
                <ColorSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Borders & Semantic States (uso raro) */}
          <div className="space-y-3">
            <h3 className="label-badge">Borders & Semantic States</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
              {borderStateSwatches.map((t) => (
                <ColorSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════ 1.5 TYPOGRAPHY FAMILIES (DS-03) ════════ */}
        <section aria-labelledby="ds-typography-families" className="mb-20 space-y-6">
          <div className="mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            <h2
              id="ds-typography-families"
              className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
            >
              Typography Families
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
              Três famílias carregadas via{" "}
              <code className="font-mono text-xs bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded">
                next/font/google
              </code>{" "}
              — auto-hosted em{" "}
              <code className="font-mono text-xs bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded">
                /_next/static/media/
              </code>{" "}
              no build estático. Nenhuma requisição externa em runtime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Inter (sans) */}
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] p-6 space-y-3">
              <div className="label-badge">font-sans — Inter 400/500/600</div>
              <div style={{ fontFamily: "var(--font-sans)" }} className="space-y-1">
                <p className="text-2xl" style={{ fontWeight: 400 }}>
                  Aeropolimento AaBbCc 0123
                </p>
                <p className="text-2xl" style={{ fontWeight: 500 }}>
                  Aeropolimento AaBbCc 0123
                </p>
                <p className="text-2xl" style={{ fontWeight: 600 }}>
                  Aeropolimento AaBbCc 0123
                </p>
              </div>
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                Body, UI, navegação, inputs, labels.
              </p>
            </div>

            {/* Inter Display (mesma família, weights 600/700) */}
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] p-6 space-y-3">
              <div className="label-badge">font-display — Inter 600/700</div>
              <div
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                className="space-y-1"
              >
                <p className="text-2xl" style={{ fontWeight: 600 }}>
                  Aeropolimento AaBbCc 0123
                </p>
                <p className="text-2xl" style={{ fontWeight: 700 }}>
                  Aeropolimento AaBbCc 0123
                </p>
              </div>
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                Hero headline, section titles, trophy counters, H1-H4. Efeito display via
                letter-spacing negativo forte.
              </p>
            </div>

            {/* JetBrains Mono */}
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] p-6 space-y-3">
              <div className="label-badge">font-mono — JetBrains Mono 400/500</div>
              <div
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
                className="space-y-1"
              >
                <p className="text-2xl" style={{ fontWeight: 400 }}>
                  ANAC-2024-AP001
                </p>
                <p className="text-2xl" style={{ fontWeight: 500 }}>
                  HUD-READOUT 60fps
                </p>
              </div>
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                ANAC IDs, HUD readouts, ficha técnica, specs numéricas.
              </p>
            </div>
          </div>
        </section>

        {/* ════════ 2. TIPOGRAFIA ════════ */}
        <Section title="✍️ Tipografia" description="Escala fluida — adapta-se ao viewport automaticamente">
          <div className="space-y-4">
            {typeTokens.map((t) => (
              <div key={t.name} className="flex flex-col gap-1 pb-4 border-b border-[var(--color-border-subtle)] last:border-0">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-subtle)] px-2 py-0.5 rounded">{t.name}</code>
                  <code className="font-mono text-xs text-[var(--color-text-muted)] hidden sm:block">{t.value}</code>
                </div>
                <p
                  className="font-bold text-[var(--color-text-primary)] leading-tight"
                  style={{ fontSize: `var(${t.name})` }}
                >
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ 3. BOTÕES ════════ */}
        <Section title="🔘 Botões" description="Variantes Shadcn + classes utilitárias da marca">
          <div className="space-y-8">
            {/* Shadcn variants */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Shadcn Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            {/* Shadcn sizes */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Shadcn Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            {/* Marca */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Marca Aeropolimento</p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-brand btn-shine">Ver Produto →</button>
                <button className="btn-outline">Saiba Mais</button>
              </div>
            </div>
          </div>
        </Section>

        {/* ════════ 4. BADGES & TAGS ════════ */}
        <Section title="🏷️ Badges & Tags" description="Elementos de categorização e destaque">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <span className="tag-premium">Premium</span>
            <span className="tag-neutral">Neutro</span>
            <span className="label-badge">Label Badge</span>
          </div>
        </Section>

        {/* ════════ 5. GLASSMORPHISM ════════ */}
        <Section title="🪟 Glassmorphism" description="Superfícies com blur e transparência (V3 light-only)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: ".glass", cls: "glass", desc: "Base — 70% opacidade" },
              { label: ".glass-strong", cls: "glass-strong", desc: "Forte — 88% + saturação" },
            ].map((g) => (
              <div
                key={g.cls}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #f0f0f0, #e8d5d5)",
                  padding: "2px",
                }}
              >
                <div className={cn(g.cls, "rounded-2xl p-6 h-full")}>
                  <code className="font-mono text-xs font-bold block mb-1">{g.label}</code>
                  <p className="text-xs opacity-70">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ 6. SUPERFÍCIES ════════ */}
        <Section title="🃏 Superfícies de Cards" description="Containers e cartões de conteúdo (UI-SPEC §6.2)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: ".card-base",    cls: "card-base",    desc: "Gradient card com borda sutil" },
              { label: ".card-feature", cls: "card-feature", desc: "Feature card base" },
              { label: ".spec-card",    cls: "spec-card",    desc: "Especificações técnicas — hover com borda brand" },
            ].map((s) => (
              <div key={s.cls} className={cn(s.cls, "p-6")}>
                <code className="font-mono text-xs font-bold block mb-2 text-[var(--color-text-primary)]">{s.label}</code>
                <p className="text-xs text-[var(--color-text-tertiary)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ 7. GRADIENTES ════════ */}
        <Section title="🌈 Gradientes" description="Gradientes de background, texto e decorativos">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "--gradient-hero",    val: "linear-gradient(180deg, #FFF 0%, #F8F8F8 100%)" },
              { name: "--gradient-brand",   val: "linear-gradient(135deg, #BD1622 0%, #7A1212 100%)" },
              { name: "--gradient-text",    val: "linear-gradient(135deg, #0F0F0F 0%, #404040 100%)" },
              { name: "--gradient-surface", val: "linear-gradient(180deg, #FAFAFA 0%, #F2F2F2 100%)" },
              { name: "--gradient-card",    val: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(250,250,250,0.8) 100%)" },
              { name: "--gradient-glow",    val: "radial-gradient(ellipse, rgba(189,22,34,0.12) 0%, transparent 70%)" },
            ].map((g) => (
              <div key={g.name} className="rounded-xl overflow-hidden border border-[var(--color-border-subtle)]">
                <div className="h-20 w-full" style={{ background: g.val }} />
                <div className="p-2 bg-white">
                  <code className="font-mono text-[10px] text-[var(--color-text-muted)] break-all">{g.name}</code>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ 8. SOMBRAS ════════ */}
        <Section title="🌑 Sombras" description="Escala de elevation + sombra de marca">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {shadowTokens.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-xl p-5 flex flex-col items-center gap-3"
                style={{ boxShadow: s.value }}
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-subtle)]" />
                <code className="font-mono text-[10px] text-[var(--color-text-muted)] text-center break-all">{s.name}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ 9. EASING ════════ */}
        <Section title="⚡ Curvas de Animação" description="Easings definidos como CSS custom properties">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {easingTokens.map((e) => (
              <TokenRow key={e.name} name={e.name} value={e.value} />
            ))}
          </div>
        </Section>

        {/* ════════ 10. ANIMAÇÕES DE ENTRADA ════════ */}
        <Section title="🎬 Classes de Animação" description="Clique para reanimar cada elemento">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {animClasses.map((cls) => (
              <div
                key={cls}
                className={cn(
                  "card-base p-4 text-center cursor-pointer hover-lift",
                )}
                onClick={(e) => {
                  const el = e.currentTarget;
                  el.classList.remove(cls);
                  void el.offsetWidth; // reflow
                  el.classList.add(cls);
                }}
              >
                <div className="w-6 h-6 rounded-md bg-[var(--color-aero-red-light)] mx-auto mb-2" />
                <code className="font-mono text-[10px] text-[var(--color-text-muted)] break-all">.{cls}</code>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3 text-center">Clique em cada card para pré-visualizar a animação</p>
        </Section>

        {/* ════════ 11. UTILITÁRIOS ════════ */}
        <Section title="🛠️ Utilitários" description="Classes prontas para uso em qualquer componente">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { cls: ".text-gradient",       demo: <span className="text-gradient font-bold text-xl">Texto Gradiente</span> },
              { cls: ".text-gradient-brand", demo: <span className="text-gradient-brand font-bold text-xl">Texto Marca</span> },
              { cls: ".section-divider",     demo: <div className="section-divider" /> },
              { cls: ".divider-subtle",      demo: <div className="divider-subtle w-full" /> },
              { cls: ".hover-lift",          demo: <div className="bg-[var(--color-surface-subtle)] rounded-lg p-3 hover-lift text-xs text-center cursor-pointer">Hover me ↑</div> },
              { cls: ".hover-scale",         demo: <div className="bg-[var(--color-surface-subtle)] rounded-lg p-3 hover-scale text-xs text-center cursor-pointer">Hover me ⊕</div> },
              { cls: ".brand-glow",          demo: <div className="w-8 h-8 rounded-lg bg-[var(--color-aero-red)] brand-glow" /> },
              { cls: ".status-dot",          demo: <div className="status-dot" /> },
            ].map((u) => (
              <div key={u.cls} className="flex items-center gap-4 py-2.5 px-4 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-border-brand)] transition-colors">
                <div className="flex-1 flex items-center justify-center min-h-[40px]">{u.demo}</div>
                <code className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{u.cls}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════ FOOTER ════════ */}
        <Separator className="mb-8" />
        <div className="text-center pb-8">
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            Aeropolimento Design System v2.0 · <span className="text-[var(--color-aero-red)]">globals.css</span> + <span className="text-[var(--color-aero-red)]">tokens.ts</span>
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mt-1">"Leve como ar. Preciso como engenharia."</p>
        </div>
      </main>
    </div>
  );
}
