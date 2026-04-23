'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Garante segurança em Server Side Rendering (Next.js) e bloqueia lógicas mobile touch
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // Reduced-motion: custom cursor não anima. O elemento fica estacionário fora da viewport
    // (via CSS inicial), evitando tracking latency em quem pediu menos movimento.
    if (prefersReducedMotion()) {
      return;
    }

    const dot = cursorDot.current;
    const outline = cursorOutline.current;
    if (!dot || !outline) return;

    // Física Twin-Layer via QuickTo de GSAP B2B (Alta Performance vs SetState)
    // duration 0.1/0.6s custom — timing específico para cursor physics; não herda gsap.defaults (quickTo).
    // Core acompanha o movimento agudo sem drag / Aura possui mass dampening
    const xToDot = gsap.quickTo(dot, "left", { duration: 0.1, ease: EASE.snappy });
    const yToDot = gsap.quickTo(dot, "top", { duration: 0.1, ease: EASE.snappy });

    const xToOutline = gsap.quickTo(outline, "left", { duration: 0.6, ease: EASE.standard });
    const yToOutline = gsap.quickTo(outline, "top", { duration: 0.6, ease: EASE.standard });

    const moveCursor = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToOutline(e.clientX);
      yToOutline(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Sistema Analítico Magnético de Clique
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Checa interações por hierarquia (Ancestrais links e botões) ou via pointer nativo no DOM Computado
      const isInteractable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractable) {
        // Tracker Aura vira uma poça gravitacional Red e o Core "mergulha" invisível para focar clique
        // DURATION.normal (0.4s) para hover scale; EASE.snappy (power3.out).
        gsap.to(outline, { scale: 1.8, backgroundColor: "rgba(189, 22, 34, 0.08)", borderColor: "rgba(189, 22, 34, 0.5)", duration: DURATION.normal, ease: EASE.snappy });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      } else {
        // Base estado Idle Cruising
        gsap.to(outline, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(82, 82, 82, 0.4)", duration: DURATION.normal, ease: EASE.snappy });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorOutline} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] hidden lg:block -translate-x-1/2 -translate-y-1/2" 
        style={{ willChange: 'transform, left, top', borderColor: "rgba(82, 82, 82, 0.4)" }}
      ></div>
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-aero-red rounded-full pointer-events-none z-[10000] hidden lg:block -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(189,22,34,0.6)]"
        style={{ willChange: 'transform, left, top' }}
      ></div>
    </>
  );
}
