'use client';
import * as React from "react";
import gsap from "gsap";
import { prefersReducedMotion, EASE } from "@/lib/animations/defaults";
import { useT } from "@/i18n/LanguageProvider";

export function AboutStats() {
  const { t } = useT();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Anos de Mercado", value: 10, suffix: "" },
    { label: "Aeronaves Tratadas", value: 200, suffix: "+" }
  ];

  /* Utilizamos Ref Array em vez de State para não saturar o ciclo de vida do React a 60 FPS */
  const valRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        // Estado final imediato: counters nos valores finais + cards visíveis.
        stats.forEach((stat, i) => {
          const el = valRefs.current[i];
          if (el) el.innerText = stat.value.toString();
        });
        gsap.set(".stat-item", { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      // Counter tokenizado: DURATION.slow (0.7s) é curto demais para efeito; usamos duration custom (2.5s) + EASE.snappy para curva mais suave que expo default.
      stats.forEach((stat, i) => {
        const el = valRefs.current[i];
        if (!el) return;

        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: stat.value,
          duration: 2.5,
          ease: EASE.snappy,
          scrollTrigger: {
            trigger: containerRef.current,
            // start herda de ScrollTrigger.defaults ("top 85%").
          },
          onUpdate: () => {
            el.innerText = Math.floor(proxy.val).toString();
          }
        });
      });

      // Animação das sub-caixas das métricas caindo em dominó (stagger)
      // duration: 1.2s → DURATION.slow (0.7s) ficaria curto; mantemos 1.2s custom.
      // ease: "expo.out" removido — default já aplica.
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 w-full pt-10 border-t border-gray-200/60 mt-10">
      
      {/* 1. Anos de Mercado */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[var(--color-text-primary)] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-aero-red">
          <span ref={(el) => { valRefs.current[0] = el; }} className="text-4xl md:text-[3.25rem] leading-none tracking-tighter font-semibold">0</span>
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          {t.about.statYears}
        </span>
      </div>

      {/* 2. Aeronaves Tratadas */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[var(--color-text-primary)] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-aero-red">
          <span ref={(el) => { valRefs.current[1] = el; }} className="text-4xl md:text-[3.25rem] leading-none tracking-tighter font-semibold">0</span>
          <span className="text-2xl md:text-3xl leading-none text-aero-red font-semibold">+</span>
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          {t.about.statAircraft}
        </span>
      </div>

      {/* 3. Certificação ANAC (Visual Graphic Element) */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[var(--color-text-primary)] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-aero-red">
          <span className="text-3xl md:text-[2.5rem] leading-none tracking-tighter font-bold uppercase">ANAC</span>
          <div className="w-1.5 h-1.5 bg-aero-red rounded-full ml-1 mb-1" />
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          {t.about.statAnac}
        </span>
      </div>

      {/* 4. Certificação IDA (Visual Typography Element) */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[var(--color-text-primary)] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-aero-red">
          <span className="text-3xl md:text-[2.5rem] leading-none tracking-tighter font-bold uppercase">AMS</span>
          <div className="w-1.5 h-1.5 bg-aero-red rounded-full ml-1 mb-1" />
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          {t.about.statAms}
        </span>
      </div>

    </div>
  );
}
