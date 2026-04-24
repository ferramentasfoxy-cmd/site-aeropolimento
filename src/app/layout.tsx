import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── DS-05: Motion defaults — side-effect import ──
// Registers gsap.defaults() + ScrollTrigger.defaults() + gsap.registerPlugin(ScrollTrigger)
// at module load time (before any useGSAP / gsap.context fires in child components).
// See src/lib/animations/defaults.ts + UI-SPEC §7.
import "@/lib/animations/defaults";

import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

// Inter sans (body, UI) — weights 400/500/600
const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Inter display (headlines) — SAME family, different variable + weight subset.
// RESEARCH §1 / Pitfall 1: Inter_Display NÃO existe em next/font/google. Este é o padrão canônico.
const fontDisplay = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// JetBrains Mono (HUD, specs, ANAC IDs) — weights 400/500
const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // HUD usage below-fold; não competir com Inter pelo preload budget
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Aeropolimento - Produtos Químicos Aeronáuticos",
  description: "Compostos para polimento e proteção aeronáutica. Qualidade premium, aprovado ANAC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable, "font-sans")}
    >
      <body className="bg-[var(--color-surface-canvas)] text-[var(--color-text-primary)] antialiased overflow-x-hidden">
        <Preloader />
        <CustomCursor />
        {/* Header global (D-05 / Plan 03-01) — chrome consistente para / e /design-system/.
            Preloader ocupa overflow: hidden durante 3.4s; Header anima in via delay: 2.7s
            coincidindo com o fim do cinematic reveal. */}
        <Header />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
