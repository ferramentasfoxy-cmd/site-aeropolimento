'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE, HERO_HANDOFF } from '@/lib/animations/defaults';
import { useT } from '@/i18n/LanguageProvider';

gsap.registerPlugin(useGSAP);

export function HeroContent() {
  const { t } = useT();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          ['.hero-eyebrow', '.hero-eyebrow-bar', '.hero-h1-line-1', '.hero-h1-line-2', '.hero-subhead'],
          { opacity: 1, y: 0, width: 'auto' }
        );
        return;
      }

      // Entrada única: todos os elementos da hero revelam JUNTOS logo após o
      // preloader (sem cascata). Handoff centralizado em HERO_HANDOFF.
      const tl = gsap.timeline({ delay: HERO_HANDOFF });

      // Grupo de texto (eyebrow, headline, subhead) sobe como um bloco só.
      tl.from(
        ['.hero-eyebrow', '.hero-h1-line-1', '.hero-h1-line-2', '.hero-subhead'],
        {
          opacity: 0,
          y: 24,
          duration: DURATION.slow,
          ease: EASE.standard,
        },
        0
      )
        // Barra vermelha do eyebrow cresce em sincronia (mesmo instante).
        .from(
          '.hero-eyebrow-bar',
          {
            width: 0,
            duration: DURATION.slow,
            ease: EASE.standard,
          },
          0
        );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="flex flex-col max-w-2xl relative">
      {/* Eyebrow: QUÍMICA AERONÁUTICA + barra vermelha */}
      <div className="flex items-center gap-4 mb-3 md:mb-5">
        <span className="hero-eyebrow-bar inline-block h-[2px] w-8 bg-aero-red" aria-hidden="true" />
        <span className="hero-eyebrow label-badge">{t.hero.eyebrow}</span>
      </div>

      {/* Headline: split em 2 linhas, heading único da rota */}
      <h1 className="heading-hero mb-4 md:mb-6">
        <span className="hero-h1-line-1 block">{t.hero.titleLine1}</span>
        <span className="hero-h1-line-2 block">{t.hero.titleLine2}</span>
      </h1>

      {/* Subhead — último elemento de texto. Os CTAs foram removidos do hero
          (renderizavam invisíveis por um resquício de animação): o hero agora é
          product-first; o frasco 3D ocupa o espaço abaixo da subheadline. O
          "Solicitar orçamento" segue no header (CONTATO) e na seção de contato. */}
      <p className="hero-subhead text-subhead max-w-xl">{t.hero.subtitle}</p>
    </div>
  );
}
