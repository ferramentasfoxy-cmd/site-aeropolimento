// src/lib/animations/defaults.ts
// Fonte-única das defaults de motion V3 Aeropolimento.
// Importado em src/app/layout.tsx (top-level) para que registre antes de qualquer useGSAP.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Defaults aplicados a todo gsap.to / gsap.from / gsap.timeline que não sobrescrever:
gsap.defaults({
  duration: 0.7,
  ease: "expo.out",
});

// Defaults aplicados a todo ScrollTrigger que não sobrescrever:
ScrollTrigger.defaults({
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none reverse",
  invalidateOnRefresh: true,
});

export const DURATION = {
  instant:   0.08,
  fast:      0.25,
  normal:    0.4,
  slow:      0.7,
  cinematic: 1.4,
} as const;

export const EASE = {
  standard: "expo.out",
  snappy:   "power3.out",
  spring:   "back.out(1.7)",
  elastic:  "elastic.out(1, 0.5)",
  linear:   "none",
} as const;

/**
 * Detecta se o usuário prefere motion reduzido.
 * SSR-safe: retorna false no server.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Helper para escolher entre valor animado e valor final instantâneo.
 * Use em props de animação: `duration: respectMotion(0.8, 0)`.
 */
export const respectMotion = <T>(animated: T, instant: T): T =>
  prefersReducedMotion() ? instant : animated;
