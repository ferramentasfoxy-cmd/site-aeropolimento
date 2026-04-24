'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

export interface CounterProps {
  /** Numeric target; counter animates from 0 to this value on scroll-into-view. */
  target: number;
  /** Optional text suffix rendered after the number (e.g., "+", "%"). */
  suffix?: string;
  /** Semantic label rendered below the number. */
  label: string;
  /** Animation duration in seconds. Defaults to DURATION.cinematic (1.4s). */
  duration?: number;
  /** Number formatter. Defaults to Intl.NumberFormat('pt-BR'). */
  formatter?: (n: number) => string;
  /** Marks the value as a placeholder pending client confirmation (adds data-placeholder + aria-label). */
  placeholder?: boolean;
  /** Optional class override for the root <div>. */
  className?: string;
  /** Optional class override for the number <span>. */
  valueClassName?: string;
  /** Optional class override for the label <span>. */
  labelClassName?: string;
}

const defaultFormatter = new Intl.NumberFormat('pt-BR').format;

export function Counter({
  target,
  suffix = '',
  label,
  duration,
  formatter = defaultFormatter,
  placeholder = false,
  className,
  valueClassName,
  labelClassName,
}: CounterProps) {
  const container = useRef<HTMLDivElement>(null);
  const valRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = valRef.current;
      if (!el) return;

      // Reduced-motion gate (UI-SPEC §7.3 Phase 2 contract — mandatory)
      if (prefersReducedMotion()) {
        el.textContent = formatter(target);
        return;
      }

      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: target,
        duration: duration ?? DURATION.cinematic,
        ease: EASE.standard,
        scrollTrigger: {
          trigger: container.current,
          // start/end/toggleActions inherited from ScrollTrigger.defaults (DS-05)
        },
        onUpdate: () => {
          el.textContent = formatter(Math.floor(proxy.val));
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cn('flex flex-col items-start', className)}>
      <span className="flex items-baseline gap-1">
        <span
          ref={valRef}
          className={cn(
            'font-display font-bold leading-none tracking-tight',
            'text-[clamp(2.25rem,3vw+1rem,3.5rem)]',
            valueClassName,
          )}
          data-placeholder={placeholder || undefined}
          aria-label={
            placeholder
              ? `${label} — valor pendente de confirmação oficial do cliente`
              : undefined
          }
        >
          0
        </span>
        {suffix && (
          <span
            className={cn(
              'font-display font-bold leading-none text-aero-red',
              'text-[clamp(1.5rem,2vw+0.5rem,2.25rem)]',
            )}
            aria-hidden="true"
          >
            {suffix}
          </span>
        )}
      </span>
      <span className={cn('label-badge mt-3', labelClassName)}>{label}</span>
    </div>
  );
}
