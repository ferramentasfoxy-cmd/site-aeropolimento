'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';
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

      const tl = gsap.timeline({ delay: 2.8 }); // Preloader handoff (UI-SPEC §3.4)

      // Stage 4: eyebrow + bar (delay 0.7s relative)
      tl.from(
        '.hero-eyebrow-bar',
        {
          width: 0,
          duration: DURATION.normal,
          ease: EASE.standard,
        },
        0.7
      )
        .from(
          '.hero-eyebrow',
          {
            opacity: 0,
            y: 10,
            duration: DURATION.normal,
            ease: EASE.standard,
          },
          0.7
        )

        // Stage 5: headline line 1 (delay 0.85s)
        .from(
          '.hero-h1-line-1',
          {
            opacity: 0,
            y: 40,
            duration: DURATION.slow,
            ease: EASE.standard,
          },
          0.85
        )

        // Stage 6: headline line 2 (delay 1.0s)
        .from(
          '.hero-h1-line-2',
          {
            opacity: 0,
            y: 40,
            duration: DURATION.slow,
            ease: EASE.standard,
          },
          1.0
        )

        // Stage 7: subhead (delay 1.25s)
        .from(
          '.hero-subhead',
          {
            opacity: 0,
            y: 20,
            duration: DURATION.normal,
            ease: EASE.standard,
          },
          1.25
        )

        // Stage 8: CTAs stagger (delay 1.45s)
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 15,
            duration: DURATION.fast,
            stagger: 0.1,
            ease: EASE.snappy,
          },
          1.45
        );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="flex flex-col gap-6 md:gap-8 max-w-2xl">
      {/* Eyebrow: QUÍMICA AERONÁUTICA + barra vermelha */}
      <div className="flex items-center gap-4">
        <span className="hero-eyebrow-bar inline-block h-[2px] w-8 bg-aero-red" aria-hidden="true" />
        <span className="hero-eyebrow label-badge">{t.hero.eyebrow}</span>
      </div>

      {/* Headline: split em 2 linhas, heading único da rota */}
      <h1 className="heading-hero">
        <span className="hero-h1-line-1 block">{t.hero.titleLine1}</span>
        <span className="hero-h1-line-2 block">{t.hero.titleLine2}</span>
      </h1>

      {/* Subhead */}
      <p className="hero-subhead text-subhead max-w-xl">{t.hero.subtitle}</p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
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
