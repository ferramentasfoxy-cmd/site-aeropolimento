"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { useT } from "@/i18n/LanguageProvider";
import { TechBackground } from "@/components/ui/TechBackground";

export function AnacSection() {
  const { t } = useT();
  const steps = t.anac.steps;
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(sealRef.current, { scale: 1, opacity: 1, rotationY: 0 });
        gsap.set('.selo-brilho', { rotate: 0 });
        gsap.set('.master-line-fill', { height: "100%" });
        const timelineItemsImmediate = gsap.utils.toArray('.timeline-item') as HTMLElement[];
        timelineItemsImmediate.forEach((item) => {
          const dot = item.querySelector('.timeline-dot');
          const dotCore = item.querySelector('.dot-core');
          const content = item.querySelector('.timeline-content');
          gsap.set(content, { x: 0, opacity: 1 });
          gsap.set(dot, { borderColor: "rgba(189,22,34,0.4)", backgroundColor: "#111" });
          gsap.set(dotCore, { scale: 1, opacity: 1, backgroundColor: "#bd1622", boxShadow: "0 0 15px rgba(189,22,34,0.8)" });
        });
        return;
      }

      // Entrada do Selo com impacto — duration (1.5s) + ease power3.out custom para clímax.
      // start custom "top 60%" — selo revela antes do conteúdo.
      gsap.from(sealRef.current, {
        scale: 0.8,
        opacity: 0,
        rotationY: 45,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      // Brilho rotativo suave no selo — infinite rotation: ease linear + duration longa (12s).
      gsap.to('.selo-brilho', {
        rotate: 360,
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      // Preenchimento contínuo da linha mestre da timeline (scrub — não herda duration default)
      gsap.to('.master-line-fill', {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      // Stagger + Revelação do conteúdo
      const timelineItems = gsap.utils.toArray('.timeline-item') as HTMLElement[];

      timelineItems.forEach((item) => {
        const dot = item.querySelector('.timeline-dot');
        const dotCore = item.querySelector('.dot-core');
        const content = item.querySelector('.timeline-content');

        // Divs entram suavemente — duration custom (1.2s) + power2.out (curva orgânica).
        // start custom "top 75%" — cedo para não esperar final do scroll.
        gsap.fromTo(content,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            }
          }
        );

        // Dot acende de forma sofisticada — start custom "top 50%" (meio do viewport).
        gsap.to(dot, {
          borderColor: "rgba(189,22,34,0.4)",
          backgroundColor: "#111",
          scrollTrigger: { trigger: item, start: "top 50%" }
        });

        // Dot core: ease custom back.out(2) para dramatic bounce; duration 0.5s custom (snap).
        gsap.to(dotCore, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#bd1622",
          boxShadow: "0 0 15px rgba(189,22,34,0.8)",
          ease: "back.out(2)",
          duration: 0.5,
          scrollTrigger: { trigger: item, start: "top 50%" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="homologacao" className="relative w-full min-h-svh bg-[var(--color-text-primary)] text-white flex items-center justify-center py-24 md:py-32 overflow-hidden z-20">
      
      {/* Atmosfera técnica unificada — variante dark (mesmo grid 32px da Hero e
          das seções claras, só invertido). Costura a Anac ao sistema em vez do
          grid legado de 4vw. O respiro vermelho da homologação fica por cima. */}
      <TechBackground variant="dark" glow={false} />
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[50vw] h-[70vh] bg-[radial-gradient(ellipse_at_top_right,rgba(189,22,34,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start relative z-10">
        
        {/* LADO ESQUERDO - Selo e Textos Sticky */}
        <div className="lg:sticky top-32 flex flex-col items-center text-center lg:items-start lg:text-left justify-start">
          <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
           <div className="w-1.5 h-1.5 bg-aero-red rounded-full animate-pulse shadow-[0_0_8px_#bd1622]" />
           <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-300">{t.anac.badge}</span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.05] text-white">
            {t.anac.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 font-bold">{t.anac.titleLine2}</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md leading-relaxed font-medium">
            {t.anac.subtitle}
          </p>

          {/* Selo ANAC Gráfico CSS/SVG */}
          <div ref={sealRef} className="relative w-52 h-52 md:w-60 md:h-60 mb-14 group">
            {/* Halo externo — profundidade + foco, intensifica no hover */}
            <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(189,22,34,0.30),transparent_68%)] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 ease-out" aria-hidden="true" />

            {/* Brilho rotativo (animado via GSAP) */}
            <div className="selo-brilho absolute inset-0 rounded-full bg-gradient-to-tr from-[#bd1622] via-transparent to-white opacity-25 blur-xl" />

            {/* Disco medalha — sombra externa + realce interno de vidro */}
            <div className="absolute inset-0 rounded-full border border-white/15 flex items-center justify-center bg-[var(--color-text-primary)]/80 backdrop-blur-md shadow-[0_10px_45px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.10)]">
               <div className="w-[85%] h-[85%] rounded-full border-[1.5px] border-dashed border-gray-400/40 flex flex-col items-center justify-center p-4 text-center transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  {/* Ícone Escudo */}
                  <svg className="w-11 h-11 text-white mb-2.5 drop-shadow-[0_0_10px_rgba(189,22,34,0.55)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-display text-lg font-black uppercase tracking-[0.18em] text-aero-red-accent">{t.anac.sealApproved}</span>
                  <span className="font-mono text-[9px] text-gray-400 tracking-[0.22em] mt-1.5 uppercase">{t.anac.sealAms}</span>
               </div>
            </div>

            {/* Tag de registro — flutua levemente no hover */}
            <div className="absolute -bottom-2 -right-3 bg-white px-3 py-1.5 rounded shadow-[0_6px_22px_-4px_rgba(0,0,0,0.5)] border border-gray-200 group-hover:-translate-y-0.5 transition-transform duration-500">
               <span className="font-mono text-[10px] font-black text-[var(--color-text-primary)] tracking-widest uppercase">ANAC-1002</span>
            </div>
          </div>

          <a href="#produtos" className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[var(--color-text-primary)] font-bold uppercase tracking-widest text-xs hover:bg-aero-red hover:text-white transition-colors duration-500 rounded-sm">
            {t.anac.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>

        {/* LADO DIREITO - Timeline/Infográfico */}
        <div ref={stepsRef} className="relative pt-12 lg:pt-0">
          {/* Linha Mestre de Fundo (Estática Cinza Escuro) */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gray-800" />
          
          {/* Linha Mestre Ativa (Vermelha - Cresce com o Scroll) */}
          <div className="master-line-fill absolute left-[23px] top-6 w-[2px] bg-gradient-to-b from-[#bd1622] to-red-600 z-10" style={{ height: "0%" }} />
          
          <div className="flex flex-col gap-12 md:gap-20">
            {steps.map((step, idx) => (
              <div key={idx} className="timeline-item relative flex gap-8 md:gap-12 items-start group">
                
                {/* Dot Container */}
                <div className="timeline-dot relative w-12 h-12 rounded-full border-2 border-gray-800 bg-[var(--color-text-primary)] flex-shrink-0 flex items-center justify-center z-20 mt-1 transition-colors duration-500 shadow-md">
                  {/* Ponto Central Brilhante (Escala CSS Inativa por padrão) */}
                  <div className="dot-core w-4 h-4 rounded-full bg-transparent opacity-0 scale-0 transition-all duration-300" />
                </div>

                {/* Conteúdo Textual */}
                <div className="timeline-content pt-2 pb-6">
                  <span className="font-mono text-[10px] text-aero-red-accent tracking-widest uppercase block mb-3 font-semibold">{t.anac.phaseLabel} {String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-4 group-hover:text-gray-200 transition-colors tracking-tight">{step.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-[1.7] font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
