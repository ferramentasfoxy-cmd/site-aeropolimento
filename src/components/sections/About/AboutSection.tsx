'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutStats } from "./AboutStats";
import { AboutCards } from "./AboutCards";

export function AboutSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Main text stagger fade in - Suavizado para modernidade pura
      gsap.fromTo(
        ".about-text-reveal",
        { opacity: 0, y: 35, filter: "blur(4px)" }, // Blur e saltos reduzidos
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.8,  // Tempo levemente aumentado para fluidez
          stagger: 0.15,
          ease: "power2.out", // Curva orgânica ao invés do estalo do expo
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%"
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={containerRef} className="relative w-full py-24 lg:py-36 bg-[#FAFAFA] overflow-hidden">
      
      {/* --- CORTES TÁTICOS HUD --- */}
      <span className="corner corner--tl">
        <span><span className="dot"></span>SEC 01 / QUEM SOMOS</span>
        <span>LAT -19.9208 · LNG -43.9378</span>
      </span>
      <span className="corner corner--tr">
        <span>DOC.REV 04.2026</span>
        <span>P&D MG · BR</span>
      </span>

      {/* Background Decoratives - Minimalist Factory Aesthetic */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/50 via-gray-100/10 to-transparent opacity-60 blur-3xl rounded-full pointer-events-none" />
      <div className="border-grid-pattern absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 xl:px-16 relative z-10 w-full flex flex-col lg:flex-row lg:justify-between items-center gap-20 lg:gap-12">
        
        {/* Left Column: Headlines & Stats */}
        <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-center">
          
          {/* Label de Seção */}
          <div className="about-text-reveal flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#bd1622] shadow-[0_0_8px_rgba(189,22,34,0.6)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-500">
              Quem Somos
            </span>
          </div>

          {/* Headline Principal */}
          <h2 className="about-text-reveal font-display text-[1.75rem] md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] leading-[1.15] uppercase font-semibold text-[#171717] tracking-tight mb-8">
            <span className="block">A referência brasileira</span>
            <span className="block">em química aeronáutica</span>
          </h2>

          {/* Descrição Autoridade */}
          <p className="about-text-reveal text-gray-600 text-lg md:text-[1.15rem] leading-[1.7] max-w-[95%] font-body">
            Desde 2013, a Aeropolimento desenvolve produtos químicos de alta performance para o 
            cuidado profissional de aeronaves. Somos a <span className="font-bold text-gray-900 border-b-2 border-red-200">primeira empresa do Brasil 
            com homologação para fabricação de compostos de polimento e preservação</span> — formulados para 
            asa fixa e rotativa —, com conformidade AMS e aprovação oficial ANAC.
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
