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
      className="relative min-h-screen h-[100svh] md:min-h-[800px] overflow-hidden bg-[var(--color-surface-base)]"
    >
      {/* ── Fundo = mesmo sistema visual da seção "Quem Somos" (coesão) ──
          Base off-white (--color-surface-base, não branco puro) + grid blueprint
          + bloom de fábrica + corner markers. Replica AboutSection 1:1. */}

      {/* Grid blueprint técnico — 32px, 1px. Máscara radial: some atrás do
          produto (respiro) e fica mais visível nas bordas. NÃO chapado. */}
      <div
        className="hero-bg-layer border-grid-pattern absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_68%_64%_at_72%_44%,transparent_0%,transparent_32%,black_80%)] [-webkit-mask-image:radial-gradient(ellipse_68%_64%_at_72%_44%,transparent_0%,transparent_32%,black_80%)] pointer-events-none"
        aria-hidden="true"
      />
      {/* Respiro radial — CÍRCULO (proporção redonda) centrado no produto.
          Mesmo centro 72%/44% da máscara do grid (sem desalinho = sem "torto"). */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(circle_30vw_at_72%_44%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_100%)] pointer-events-none"
        aria-hidden="true"
      />
      {/* Bloom suave de fábrica — eco do decorativo do "Quem Somos" (discreto) */}
      <div
        className="hero-bg-layer absolute top-[-12%] right-[-6%] w-[42vw] h-[42vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/40 via-gray-100/5 to-transparent opacity-25 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner markers — mesma linguagem do "Quem Somos" (mono + dot vermelho).
          Variantes BOTTOM p/ não colidir com o header. Mesmos códigos (LAT/LNG,
          DOC.REV) = identidade da mesma instalação (Belo Horizonte/MG). */}
      <span className="hero-bg-layer corner corner--bl">
        <span><span className="dot"></span>AP-001</span>
        <span>LAT -19.9208 · LNG -43.9378</span>
      </span>
      <span className="hero-bg-layer corner corner--br">
        <span>DOC.REV 04.2026</span>
        <span>P&D MG · BR</span>
      </span>

      {/* Vignette sutil — escurece bordas pra focar o olhar no produto */}
      <div
        className="hero-bg-layer absolute inset-0 pointer-events-none bg-[radial-gradient(82%_88%_at_50%_44%,transparent_56%,rgba(0,0,0,0.06)_100%)]"
        aria-hidden="true"
      />

      {/* Content grid — container largo (max-1536) p/ menos margem lateral;
          texto ancorado no topo (não no centro); coluna do produto maior. */}
      <div className="mx-auto w-full max-w-[1536px] px-[clamp(1.5rem,4vw,4rem)] relative h-full grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start lg:items-stretch pt-28 md:pt-32 pb-16">
        {/* Text column — natural first = esquerda desktop / topo mobile */}
        <div className="flex flex-col justify-center lg:pt-6">
          <HeroContent />
        </div>

        {/* Product column — natural second = direita desktop / base mobile.
            Integração ao plano = sombra ambiente (ContactShadows 3D) + leve
            reflexo de piso fosco premium (sheen elíptico discreto na base).
            O grid já está mascarado aqui (respiro), então o sheen não o corta. */}
        <div className="relative min-h-[460px] md:min-h-[620px] lg:min-h-[680px]">
          {/* Reflexo/sheen de piso fosco — bem sutil, só sob a base */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(22%_6%_at_50%_80%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_76%)]"
            aria-hidden="true"
          />
          <HeroProduct />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
