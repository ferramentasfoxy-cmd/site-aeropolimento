'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n/LanguageProvider';

gsap.registerPlugin(useGSAP);

export function ScrollIndicator() {
  const { t } = useT();
  const container = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(container.current, { opacity: 1, y: 0 });
        return;
      }

      // Stage 9: fade-in (delay 2.8 + 1.7 absolute)
      gsap.from(container.current, {
        opacity: 0,
        y: -10,
        duration: DURATION.normal,
        ease: EASE.standard,
        delay: 2.8 + 1.7,
      });

      // Pulse loop no chevron (gated por reducedMotion acima)
      gsap.to('.scroll-indicator-chevron', {
        y: 6,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.8 + 2.2,
      });
    },
    { scope: container }
  );

  const handleClick = () => {
    const target = document.getElementById('credibilidade');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback se a seção BLK-02 ainda não existir no DOM
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <button
      ref={container}
      type="button"
      onClick={handleClick}
      aria-label={t.hero.scrollAria}
      className={cn(
        'hero-scroll-indicator hud-aesthetic',
        'absolute bottom-8 left-1/2 -translate-x-1/2 z-30',
        'flex flex-col items-center gap-2',
        'cursor-pointer',
        'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]',
        'transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aero-red focus-visible:ring-offset-4 rounded-sm',
        'p-2'
      )}
    >
      {/* Mouse SVG — decorativo */}
      <svg
        width="24"
        height="38"
        viewBox="0 0 24 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="22" height="36" rx="11" />
        <line className="scroll-indicator-chevron" x1="12" y1="10" x2="12" y2="16" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[10px] tracking-widest uppercase">{t.hero.scrollLabel}</span>
    </button>
  );
}
