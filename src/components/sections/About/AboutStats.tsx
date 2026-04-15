'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutStats() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Anos de Mercado", value: 13, suffix: "" },
    { label: "Aeronaves Tratadas", value: 500, suffix: "+" }
  ];

  /* Utilizamos Ref Array em vez de State para não saturar o ciclo de vida do React a 60 FPS */
  const valRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = valRefs.current[i];
        if (!el) return;

        const proxy = { val: 0 };
        
        gsap.to(proxy, {
          val: stat.value,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Inicia a contagem um pouco mais cedo para sincronia
          },
          onUpdate: () => {
            el.innerText = Math.floor(proxy.val).toString();
          }
        });
      });
      
      // Animação das sub-caixas das métricas caindo em dominó (stagger)
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.2, 
          stagger: 0.1,
          ease: "expo.out",
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
        <div className="flex items-baseline gap-1 text-[#171717] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#bd1622]">
          <span ref={(el) => { valRefs.current[0] = el; }} className="text-4xl md:text-[3.25rem] leading-none tracking-tighter font-semibold">0</span>
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          Anos de <br/>Mercado
        </span>
      </div>

      {/* 2. Aeronaves Tratadas */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[#171717] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#bd1622]">
          <span ref={(el) => { valRefs.current[1] = el; }} className="text-4xl md:text-[3.25rem] leading-none tracking-tighter font-semibold">0</span>
          <span className="text-2xl md:text-3xl leading-none text-[#bd1622] font-semibold">+</span>
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          Aeronaves <br/>Tratadas
        </span>
      </div>

      {/* 3. Certificação ANAC (Visual Graphic Element) */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[#171717] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#bd1622]">
          <span className="text-3xl md:text-[2.5rem] leading-none tracking-tighter font-bold uppercase">ANAC</span>
          <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full ml-1 mb-1" />
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          Homologação <br/>Oficial
        </span>
      </div>

      {/* 4. Certificação IDA (Visual Typography Element) */}
      <div className="stat-item flex flex-col opacity-0 group relative transition-colors duration-500">
        <div className="flex items-baseline gap-1 text-[#171717] font-mono transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#bd1622]">
          <span className="text-3xl md:text-[2.5rem] leading-none tracking-tighter font-bold uppercase">IDA</span>
          <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full ml-1 mb-1" />
        </div>
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mt-4 max-w-[120px] leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
          Membro <br/>Internacional
        </span>
      </div>

    </div>
  );
}
