'use client';
import * as React from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { AboutStats } from "./AboutStats";
import { AboutCards } from "./AboutCards";
import { useT } from "@/i18n/LanguageProvider";
import { TechBackground } from "@/components/ui/TechBackground";

export function AboutSection() {
  const { t } = useT();
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".about-text-reveal", { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      // Main text stagger fade in - Suavizado para modernidade pura
      // duration custom (1.8s) mantida — curva orgânica ao invés do estalo do expo default.
      // ScrollTrigger start herda de ScrollTrigger.defaults ("top 85%").
      gsap.fromTo(
        ".about-text-reveal",
        { opacity: 0, y: 35, filter: "blur(4px)" }, // Blur e saltos reduzidos
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={containerRef} className="relative w-full py-24 lg:py-36 bg-[var(--color-surface-base)] overflow-hidden">
      
      {/* --- CORTES TÁTICOS HUD --- */}
      <span className="corner corner--tl">
        <span><span className="dot"></span>{t.about.cornerCode}</span>
        <span>LAT -19.9208 · LNG -43.9378</span>
      </span>
      <span className="corner corner--tr">
        <span>DOC.REV 04.2026</span>
        <span>P&D MG · BR</span>
      </span>

      {/* Atmosfera técnica unificada (fonte única: TechBackground) */}
      <TechBackground glow={false} />

      
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 xl:px-16 relative z-10 w-full flex flex-col lg:flex-row lg:justify-between items-center gap-20 lg:gap-12">
        
        {/* Left Column: Headlines & Stats */}
        <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-center">
          
          {/* Label de Seção */}
          <div className="about-text-reveal flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-aero-red shadow-[0_0_8px_rgba(189,22,34,0.6)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-500">
              {t.about.label}
            </span>
          </div>

          {/* Headline Principal */}
          <h2 className="about-text-reveal font-display text-[1.75rem] md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] leading-[1.15] uppercase font-semibold text-[var(--color-text-primary)] tracking-tight mb-8">
            <span className="block">{t.about.headlineLine1}</span>
            <span className="block">{t.about.headlineLine2}</span>
          </h2>

          {/* Descrição Autoridade */}
          <p className="about-text-reveal text-gray-600 text-lg md:text-[1.15rem] leading-[1.7] max-w-[95%] font-body">
            {t.about.descBefore}
            <span className="font-bold text-gray-900 border-b-2 border-red-200">{t.about.descHighlight}</span>
            {t.about.descAfter}
          </p>

          {/* GSAP Counters Matrix */}
          <div className="about-text-reveal">
            <AboutStats />
          </div>

        </div>

        {/* Right Column: HUD Cards (Missão/Visão/Valores) */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center">
          <AboutCards />
        </div>

      </div>
    </section>
  );
}
