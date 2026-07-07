'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE, HERO_HANDOFF } from '@/lib/animations/defaults';
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

      // Stage 1: background fade-in (Preloader handoff — colado à subida do véu)
      gsap.from('.hero-bg-layer', {
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.standard,
        delay: HERO_HANDOFF,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      aria-labelledby="hero-h1-line-1"
      className="relative h-svh md:h-auto md:min-h-[800px] overflow-hidden bg-[var(--color-surface-base)]"
    >
      {/* ── Fundo = respiro de luz (sem grade blueprint) ──
          Base off-white (--color-surface-base) + respiro radial no produto +
          bloom de fábrica + vignette. Profundidade só pela luz. */}

      {/* Respiro radial — CÍRCULO (proporção redonda) centrado no produto (72%/44%). */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(circle_30vw_at_72%_44%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_100%)] pointer-events-none"
        aria-hidden="true"
      />
      {/* Bloom suave de fábrica — discreto */}
      <div
        className="hero-bg-layer absolute top-[-12%] right-[-6%] w-[42vw] h-[42vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/40 via-gray-100/5 to-transparent opacity-25 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Vignette sutil — escurece bordas pra focar o olhar no produto */}
      <div
        className="hero-bg-layer absolute inset-0 pointer-events-none bg-[radial-gradient(82%_88%_at_50%_44%,transparent_56%,rgba(0,0,0,0.06)_100%)]"
        aria-hidden="true"
      />

      {/* Content grid — container largo (max-1536) p/ menos margem lateral;
          texto ancorado no topo (não no centro); coluna do produto maior. */}
      <div className="mx-auto w-full max-w-[1536px] px-[clamp(1.5rem,4vw,4rem)] relative h-full flex flex-col lg:grid lg:grid-cols-[1fr_1.05fr] gap-4 md:gap-10 lg:gap-16 lg:items-stretch pt-28 md:pt-32 pb-24 md:pb-16">
        {/* Text column — natural first = esquerda desktop / topo mobile */}
        <div className="flex flex-col justify-center lg:pt-6">
          <HeroContent />
        </div>

        {/* Product column — natural second = direita desktop / base mobile.
            Integração ao plano = sombra ambiente (ContactShadows 3D) + leve
            reflexo de piso fosco premium (sheen elíptico discreto na base).
            O grid já está mascarado aqui (respiro), então o sheen não o corta. */}
        <div className="relative flex-1 flex items-center justify-center [container-type:size] lg:flex-none lg:block lg:self-stretch lg:min-h-[680px]">
          {/* Reflexo/sheen de piso fosco — bem sutil, só sob a base */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(22%_6%_at_50%_80%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_76%)]"
            aria-hidden="true"
          />
          {/* Palco simétrico do frasco: maior quadrado que cabe na célula (mobile),
              centralizado no eixo X e Y; no desktop preenche a coluna. O R3F herda
              este tamanho (aspect 1:1 no mobile → camera.aspect=1 → sem distorção). */}
          <div className="relative aspect-square w-[min(100cqw,100cqh)] max-w-[340px] mx-auto pointer-events-none md:pointer-events-auto lg:aspect-auto lg:w-full lg:h-full lg:max-w-none">
            <HeroProduct />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
