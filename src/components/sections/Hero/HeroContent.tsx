'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE, HERO_HANDOFF } from '@/lib/animations/defaults';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n/LanguageProvider';

gsap.registerPlugin(useGSAP);

export function HeroContent() {
  const { t } = useT();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          ['.hero-eyebrow', '.hero-eyebrow-bar', '.hero-h1-line-1', '.hero-h1-line-2', '.hero-subhead', '.hero-cta'],
          { opacity: 1, y: 0, width: 'auto' }
        );
        return;
      }

      // Entrada única: todos os elementos da hero revelam JUNTOS logo após o
      // preloader (sem cascata). Handoff centralizado em HERO_HANDOFF.
      const tl = gsap.timeline({ delay: HERO_HANDOFF });

      // Grupo de texto (eyebrow, headline, subhead, CTAs) sobe como um bloco só.
      tl.from(
        ['.hero-eyebrow', '.hero-h1-line-1', '.hero-h1-line-2', '.hero-subhead', '.hero-cta'],
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
    <div ref={container} className="flex flex-col max-w-2xl">
      {/* Eyebrow: QUÍMICA AERONÁUTICA + barra vermelha */}
      <div className="flex items-center gap-4 mb-5">
        <span className="hero-eyebrow-bar inline-block h-[2px] w-8 bg-aero-red" aria-hidden="true" />
        <span className="hero-eyebrow label-badge">{t.hero.eyebrow}</span>
      </div>

      {/* Headline: split em 2 linhas, heading único da rota */}
      <h1 className="heading-hero mb-6">
        <span className="hero-h1-line-1 block">{t.hero.titleLine1}</span>
        <span className="hero-h1-line-2 block">{t.hero.titleLine2}</span>
      </h1>

      {/* Subhead */}
      <p className="hero-subhead text-subhead max-w-xl mb-9">{t.hero.subtitle}</p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="#contato"
          aria-label={t.hero.ctaPrimaryAria}
          className={cn(
            'hero-cta inline-flex items-center justify-center gap-2',
            'h-[52px] px-8',
            'bg-aero-red text-white',
            'font-display font-semibold text-[var(--text-body-md)]',
            'rounded-md',
            'shadow-[0_4px_16px_rgba(189,22,34,0.25)]',
            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(189,22,34,0.35)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aero-red focus-visible:ring-offset-2'
          )}
        >
          {t.hero.ctaPrimary}
        </Link>
        <Link
          href="#homologacao"
          aria-label={t.hero.ctaSecondaryAria}
          className={cn(
            'hero-cta inline-flex items-center justify-center gap-2',
            'h-[52px] px-8',
            'bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-primary)]',
            'font-display font-semibold text-[var(--text-body-md)]',
            'rounded-md',
            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'hover:bg-[var(--color-text-primary)] hover:text-white hover:-translate-y-[2px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aero-red focus-visible:ring-offset-2'
          )}
        >
          {t.hero.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
