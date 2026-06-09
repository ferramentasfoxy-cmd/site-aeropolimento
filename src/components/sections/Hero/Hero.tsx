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
      {/* Background layers */}
      <div
        className="hero-bg-layer absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,1)_0%,_rgba(247,247,247,0)_60%)]"
        aria-hidden="true"
      />
      <div
        className="hero-bg-layer border-grid-pattern absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      {/* Content grid */}
      <div className="section-container relative h-full grid lg:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-center py-24 md:py-32">
        {/* Text column — natural first = esquerda desktop / topo mobile */}
        <div>
          <HeroContent />
        </div>

        {/* Product column — natural second = direita desktop / base mobile */}
        <div className="relative min-h-[400px] md:min-h-[600px]">
          <HeroProduct />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
