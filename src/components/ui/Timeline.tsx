'use client';

import { useRef, type KeyboardEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/animations/defaults';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

export interface TimelineStep {
  id: string;
  /** "01", "02", etc. — rendered as mono uppercase accent label. */
  number: string;
  title: string;
  description: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  ariaLabel: string;
  /**
   * Color theme — 'dark' (default) uses --color-aero-red-accent (#F87171, AA 6.84:1)
   * for text accent over dark backgrounds; 'light' uses --color-aero-red (#BD1622).
   */
  theme?: 'light' | 'dark';
  className?: string;
}

export function Timeline({
  steps,
  ariaLabel,
  theme = 'dark',
  className,
}: TimelineProps) {
  const container = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.timeline-master-fill', { height: '100%' });
        gsap.set('.timeline-content', { x: 0, opacity: 1 });
        gsap.set('.timeline-dot-core', { scale: 1, opacity: 1 });
        return;
      }

      // Master line scrub — V1 preserved pattern
      gsap.to('.timeline-master-fill', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Per-item reveal + dot pulse
      itemRefs.current.forEach((item) => {
        if (!item) return;
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot-core');

        if (content) {
          gsap.fromTo(
            content,
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: { trigger: item, start: 'top 75%' },
            },
          );
        }
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            ease: 'back.out(2)', // custom — matches V1 signature for dot "plant" effect
            duration: 0.5,
            scrollTrigger: { trigger: item, start: 'top 50%' },
          });
        }
      });
    },
    { scope: container },
  );

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>, idx: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      itemRefs.current[idx + 1]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      itemRefs.current[idx - 1]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemRefs.current[itemRefs.current.length - 1]?.focus();
    }
  };

  const isDark = theme === 'dark';
  const accentText = isDark ? 'text-aero-red-accent' : 'text-aero-red';
  // Decorative dot ≥4×4px: WCAG 1.4.11 non-text contrast exempt (3:1 required; #BD1622
  // over both #0F0F0F and #FAFAFA comfortably passes). Use aero-red in both themes.
  const accentBg = 'bg-aero-red';
  const borderBase = isDark ? 'border-white/20' : 'border-neutral-300';
  const textMuted = isDark ? 'text-white/70' : 'text-neutral-600';

  return (
    <ol
      ref={container}
      role="list"
      aria-label={ariaLabel}
      className={cn('relative flex flex-col gap-12 md:gap-20', className)}
    >
      {/* Master line background */}
      <div
        className={cn(
          'absolute left-[23px] top-6 bottom-6 w-[2px]',
          isDark ? 'bg-white/10' : 'bg-neutral-300',
        )}
        aria-hidden="true"
      />
      {/* Master line fill (animated via scrub) */}
      <div
        className={cn(
          'timeline-master-fill absolute left-[23px] top-6 w-[2px] z-10',
          accentBg,
        )}
        style={{ height: '0%' }}
        aria-hidden="true"
      />

      {steps.map((step, idx) => (
        <li
          key={step.id}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          className="timeline-item relative flex gap-8 md:gap-12 items-start outline-none focus-visible:ring-2 focus-visible:ring-aero-red focus-visible:ring-offset-4 rounded-sm"
          tabIndex={0}
          onKeyDown={(e) => onKeyDown(e, idx)}
        >
          {/* Dot */}
          <div
            className={cn(
              'relative w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center z-20',
              borderBase,
            )}
          >
            <div
              className={cn(
                'timeline-dot-core w-4 h-4 rounded-full opacity-0 scale-0',
                accentBg,
              )}
              aria-hidden="true"
            />
          </div>
          {/* Content */}
          <div className="timeline-content flex-1">
            <span
              className={cn(
                'font-mono text-[10px] tracking-widest uppercase block mb-3 font-semibold',
                accentText,
              )}
            >
              Fase {step.number}
            </span>
            <h3 className="heading-section mb-4">{step.title}</h3>
            <p
              className={cn(
                'text-[var(--text-body-md)] leading-relaxed',
                textMuted,
              )}
            >
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
