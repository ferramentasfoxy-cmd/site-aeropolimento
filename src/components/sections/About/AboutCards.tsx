'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  {
    title: "Missão",
    desc: "Desenvolver produtos químicos de alta performance que preservam aeronaves com rigor técnico, respeitando as normas de cada fabricante e órgão regulador."
  },
  {
    title: "Visão",
    desc: "Consolidar o padrão brasileiro de química aeronáutica no cenário internacional, com formulações próprias e homologações reconhecidas."
  },
  {
    title: "Valores",
    desc: "Precisão técnica. Conformidade regulatória. Transparência com cada cliente. Zero atalhos."
  }
];

export function AboutCards() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hud-card",
        { opacity: 0, x: 40, filter: "blur(12px)", scale: 0.97 },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          scale: 1,
          duration: 1.4, 
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4 w-full">
      {CARDS.map((card, i) => (
        <div 
          key={i} 
          className="hud-card opacity-0 relative overflow-hidden bg-white/60 backdrop-blur-2xl border border-gray-200/60 shadow-sm rounded-2xl p-7 lg:p-9 group transition-all duration-500 ease-out hover:shadow-md hover:border-gray-300/80 hover:-translate-y-1"
        >
          {/* Sweep HUD Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bd1622]/[0.03] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none" />
          
          <div className="flex gap-5 relative z-10">
            {/* Linha indicadora lateral técnica */}
            <div className="w-[3px] h-6 bg-[#bd1622] rounded-full shrink-0 mt-1 transition-all duration-500 group-hover:h-8 group-hover:shadow-[0_0_12px_rgba(189,22,34,0.4)]" />
            
            <div className="flex flex-col">
              <h3 className="font-display text-[1rem] tracking-[0.1em] uppercase text-gray-900 font-bold mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-[0.9rem] max-w-[90%]">
                {card.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
