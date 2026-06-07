'use client';
import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function HeroContent() {
  const { t } = useT();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".editorial-slide-up", { y: 0, opacity: 1, filter: "blur(0px)" });
        return;
      }
      // duration/ease herdam de gsap.defaults (DS-05). Mantemos duration customizada (2.4s) — timing cinematográfico específico do hero editorial.
      gsap.fromTo(
        ".editorial-slide-up",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.4,
          stagger: 0.15,
          delay: 2.8
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative pt-32 lg:pt-[18vh] pb-10 flex flex-col items-start text-left z-20 w-full max-w-[650px]">
      
        {/* Tag Editorial Solta no Topo */}
        <div className="editorial-slide-up mb-6">
          <Badge className="px-5 py-2.5 text-[10px] tracking-widest uppercase text-gray-500 font-medium font-mono flex items-center gap-3 w-fit border border-gray-200/50 bg-[var(--color-surface-base)]/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md cursor-default group">
            {/* Ponto Vermelho Sincronizado */}
            <div className="w-1.5 h-1.5 rounded-full bg-aero-red shrink-0 group-hover:scale-125 transition-transform duration-300" />
            <span className="inline-block translate-y-[2px] transition-colors duration-500 group-hover:text-gray-800">
              {t.hero.badge}
            </span>
          </Badge>
        </div>

        {/* Título Monumental Editorial Escuro */}
        <h1 className="editorial-slide-up text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] tracking-tight text-[var(--color-text-primary)] font-medium leading-[0.92] mb-5 relative">
          <span className="relative z-10">{t.hero.titleLine1}</span>
          <br />
          <span className="relative z-10 text-[var(--color-text-primary)]">{t.hero.titleLine2}</span>
        </h1>

        {/* Subtítulo Clean Crú de Alta Autoridade */}
        <p className="editorial-slide-up text-[1rem] md:text-[1.15rem] xl:text-[1.2rem] text-[var(--color-text-secondary)] font-normal leading-[1.65] lg:leading-[1.7] mb-7 w-full max-w-[650px] lg:max-w-[700px] tracking-[0.01em]">
          {t.hero.subtitle}
        </p>

        {/* C.T.A Minimalista e Magnético */}
        <div className="editorial-slide-up mb-6">
          <button className="bg-aero-red hover:bg-[var(--color-aero-red-hover)] text-white px-8 py-5 lg:py-6 rounded-full text-[13px] tracking-widest font-bold uppercase transition-all duration-500 shadow-[0_15px_30px_rgba(189,22,34,0.25)] hover:shadow-[0_20px_40px_rgba(189,22,34,0.35)] flex items-center gap-3 group">
            {t.hero.cta}
            <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </button>
        </div>

        {/* Números/Stats de Autoridade - Refatorado para Sincronia de Layout "HUD" */}
        <div className="editorial-slide-up relative flex flex-wrap sm:flex-nowrap items-center gap-4 pt-2 w-full max-w-[500px]">
          
          {/* Card HUD 1 - Certificação */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-[20px] p-2.5 pr-6 hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] group cursor-default">
            {/* Ícone Container */}
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-300 text-aero-red">
               {/* Check-Shield Icon */}
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
               </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="block text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] font-bold mb-0.5">{t.hero.cert1Label}</span>
              <span className="block text-[11px] lg:text-[12px] font-bold tracking-wide text-[var(--color-text-primary)] leading-none uppercase">{t.hero.cert1Value}</span>
            </div>
          </div>

          {/* Card HUD 2 - Qualidade */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-[20px] p-2.5 pr-6 hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] group cursor-default">
            {/* Ícone Container */}
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-300 text-aero-red">
               {/* Globe/Standard Icon */}
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="2" y1="12" x2="22" y2="12"></line>
                 <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
               </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="block text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] font-bold mb-0.5">{t.hero.cert2Label}</span>
              <span className="block text-[11px] lg:text-[12px] font-bold tracking-wide text-[var(--color-text-primary)] leading-none uppercase">{t.hero.cert2Value}</span>
            </div>
          </div>

        </div>

    </div>
  );
}

