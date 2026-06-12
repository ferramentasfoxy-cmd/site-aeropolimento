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
      {/* ── Studio Cove — palco de estúdio claro graduado ── */}
      {/* Base cove: sweep vertical (topo cinza-frio → base quase-branca) = profundidade real,
          o oposto do branco chapado. O frasco fica claro contra o topo mais cinza. */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[linear-gradient(180deg,rgb(228,231,236)_0%,rgb(237,239,242)_38%,rgb(246,247,249)_72%,rgb(250,251,252)_100%)]"
        aria-hidden="true"
      />
      {/* Hot-spot do sweep: glow de estúdio atrás do frasco (coluna direita) */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(46%_50%_at_68%_46%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_62%)]"
        aria-hidden="true"
      />
      {/* Light pad no piso — o frasco parece pousado numa superfície iluminada */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(26%_10%_at_68%_82%,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_72%)]"
        aria-hidden="true"
      />
      {/* Guias técnicas finas — linguagem de prancha de engenharia (Airbus/Pilatus spec).
          Tudo em --color-border-default (token) p/ ficar dentro do sistema. */}
      <div className="hero-bg-layer absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {/* centerline vertical do produto */}
        <div className="absolute top-[20%] bottom-[15%] left-[68%] w-px bg-[var(--color-border-default)] opacity-60" />
        {/* ticks de medição */}
        <div className="absolute top-[34%] left-[calc(68%-7px)] h-px w-[14px] bg-[var(--color-border-default)] opacity-70" />
        <div className="absolute top-[66%] left-[calc(68%-7px)] h-px w-[14px] bg-[var(--color-border-default)] opacity-70" />
        {/* crosshair de registro */}
        <div className="absolute top-[23%] left-[87%] h-px w-3 bg-[var(--color-border-default)]" />
        <div className="absolute top-[calc(23%-6px)] left-[calc(87%+6px)] h-3 w-px bg-[var(--color-border-default)]" />
        {/* spec label mono */}
        <span className="absolute top-[17%] left-[68%] -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] text-[var(--color-text-tertiary)] opacity-50">
          AP·001
        </span>
      </div>

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
