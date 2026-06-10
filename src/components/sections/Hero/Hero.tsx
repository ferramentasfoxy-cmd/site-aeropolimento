'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';
import { HeroContent } from './HeroContent';
import { HeroProduct } from './HeroProduct';
import { ScrollIndicator } from './ScrollIndicator';

gsap.registerPlugin(useGSAP);

export function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.hero-bg-layer', { opacity: 1 });
        return;
      }

      // Stage 1: background fade-in (Preloader handoff)
      gsap.from('.hero-bg-layer', {
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.standard,
        delay: 2.8,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      aria-labelledby="hero-h1-line-1"
      className="relative min-h-screen h-[100svh] md:min-h-[800px] overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* ── Atmosfera cinematográfica ── */}
      {/* Base wash (fade-in stage 1) */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,1)_0%,_rgba(244,244,247,1)_72%)]"
        aria-hidden="true"
      />
      {/* Spotlight de estúdio atrás do produto (direita) — o frasco parece iluminado por um feixe */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(58%_55%_at_72%_42%,_rgba(255,250,240,0.95)_0%,_rgba(255,250,240,0)_60%)]"
        aria-hidden="true"
      />
      {/* Grid técnico sutil */}
      <div
        className="hero-bg-layer border-grid-pattern absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:34px_34px]"
        aria-hidden="true"
      />
      {/* Vignette cinematográfica — cantos escurecem sutil (enquadramento filmado) */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(15,15,15,0.07)_100%)]"
        aria-hidden="true"
      />
      {/* Film grain — textura de filme (o sinal cinematográfico mais eficaz) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Content grid — container largo (max-1536) p/ menos margem lateral;
          texto ancorado no topo (não no centro); coluna do produto maior. */}
      <div className="mx-auto w-full max-w-[1536px] px-[clamp(1.5rem,4vw,4rem)] relative h-full grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start lg:items-stretch pt-28 md:pt-32 pb-16">
        {/* Text column — natural first = esquerda desktop / topo mobile */}
        <div className="flex flex-col justify-center lg:pt-6">
          <HeroContent />
        </div>

        {/* Product column — natural second = direita desktop / base mobile */}
        <div className="relative min-h-[460px] md:min-h-[620px] lg:min-h-[680px]">
          <HeroProduct />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
