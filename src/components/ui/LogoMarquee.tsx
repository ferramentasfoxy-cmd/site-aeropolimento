'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/animations/defaults';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

export interface LogoMarqueeLogo {
  name: string;
  src: string;
}

export interface LogoMarqueeProps {
  logos: LogoMarqueeLogo[];
  /** Animation duration in seconds (default 45 — matches V1 pace). */
  speed?: number;
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean;
  /** Accessible section label. */
  ariaLabel: string;
  /** Class override for the root <div>. */
  className?: string;
  /** Background color of fade-edge gradients (defaults to --color-surface-base). */
  fadeColor?: string;
}

export function LogoMarquee({
  logos,
  speed = 45,
  pauseOnHover = true,
  ariaLabel,
  className,
  fadeColor = 'var(--color-surface-base)',
}: LogoMarqueeProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(container.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.from(container.current, {
        opacity: 0,
        y: 60,
        scale: 0.98,
        duration: 2.2, // custom — UI-SPEC §4.4 "premium" entrance pace
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-label={ariaLabel}
      role="region"
      className={cn('w-full overflow-hidden relative', className)}
    >
      {/* Fade gradients at edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 md:w-56 z-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 md:w-56 z-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      <ul
        role="list"
        className={cn(
          'flex animate-marquee w-max cursor-default',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Triplicate for seamless loop (V1 pattern — travels -33.3% then snaps) */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <li
            key={`${logo.name}-${i}`}
            className="px-8 md:px-20 py-10 flex items-center shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG logos, unoptimized static export; next/image wrapper overhead not justified (RESEARCH §4) */}
            <img
              src={logo.src}
              alt={`Logo ${logo.name}`}
              className={cn(
                'h-10 md:h-[3.25rem] w-auto min-w-[140px] md:min-w-[180px] object-contain',
                'brightness-0 opacity-[0.25]',
                'transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                'hover:opacity-100 hover:scale-[1.08] hover:brightness-100',
                'focus-visible:opacity-100 focus-visible:scale-[1.08] focus-visible:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aero-red focus-visible:ring-offset-4',
              )}
              tabIndex={0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
