"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    id: "01",
    title: "A Jornada da Homologação",
    desc: "A certificação ANAC não é um mero selo comercial. É a chancela máxima da autoridade de aviação civil brasileira, comprovando que o produto preserva rigorosamente a integridade estrutural da aeronave.",
  },
  {
    id: "02",
    title: "Critérios Técnicos Implacáveis",
    desc: "Nossos produtos passam por testes extremos de cisalhamento, variação de temperatura, corrosão química e análise molecular em laboratórios credenciados para garantir segurança absoluta em voo.",
  },
  {
    id: "03",
    title: "Rigor e Exclusividade",
    desc: "Pelo altíssimo custo de P&D, a imensa maioria dos produtos de mercado não se qualificam. A Aeropolimento investiu anos em formulações puras, consolidando-se no seleto grupo homologado.",
  },
  {
    id: "04",
    title: "Parceria Estratégica",
    desc: "O processo técnico é elevado por colaborações de engenharia de ponta. Nosso desenvolvimento foi validado juntamente aos laboratórios de grandes potências da aviação, como a Embraer.",
  }
];

export function AnacSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrada do Selo com impacto
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

      // Brilho rotativo suave no selo
      gsap.to('.selo-brilho', {
        rotate: 360,
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      // Preenchimento contínuo da linha mestre da timeline
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

        // Divs entram suavemente
        gsap.fromTo(content, 
          { x: 40, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 1.2, ease: "power2.out", 
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Dot acende de forma sofisticada
        gsap.to(dot, {
          borderColor: "rgba(189,22,34,0.4)",
          backgroundColor: "#111",
          scrollTrigger: { trigger: item, start: "top 50%", toggleActions: "play none none reverse" }
        });
        
        gsap.to(dotCore, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#bd1622",
          boxShadow: "0 0 15px rgba(189,22,34,0.8)",
          ease: "back.out(2)",
          duration: 0.5,
          scrollTrigger: { trigger: item, start: "top 50%", toggleActions: "play none none reverse" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="homologacao" className="relative w-full min-h-screen bg-[#07090e] text-white flex items-center justify-center py-24 md:py-32 overflow-hidden z-20">
      
      {/* Background Geométrico e Limpo */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4vw_4vw]" />
        <div className="absolute top-0 right-0 w-[50vw] h-[70vh] bg-[radial-gradient(ellipse_at_top_right,rgba(189,22,34,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start relative z-10">
        
        {/* LADO ESQUERDO - Selo e Textos Sticky */}
        <div className="lg:sticky top-32 flex flex-col items-start justify-start">
          <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
           <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full animate-pulse shadow-[0_0_8px_#bd1622]" />
           <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-300">Padrão Ouro da Aviação</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.05] text-white">
            A chancela <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 font-bold">Oficial ANAC.</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md leading-relaxed font-medium">
            Não basta limpar. Em aviação, o produto químico deve ter segurança estrutural inviolável e certificação das autoridades máximas.
          </p>

          {/* Selo ANAC Gráfico CSS/SVG */}
          <div ref={sealRef} className="relative w-48 h-48 md:w-56 md:h-56 mb-12 group">
            <div className="selo-brilho absolute inset-0 rounded-full bg-gradient-to-tr from-[#bd1622] via-transparent to-white opacity-20 blur-xl" />
            
            <div className="absolute inset-0 rounded-full border border-gray-600 flex items-center justify-center bg-[#0d1117]/80 backdrop-blur-md">
               <div className="w-[85%] h-[85%] rounded-full border-[1.5px] border-dashed border-gray-400/50 flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-700 ease-out">
                  {/* Ícone Escudo */}
                  <svg className="w-10 h-10 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-display text-base font-black uppercase tracking-widest text-[#bd1622]">Aprovado</span>
                  <span className="font-mono text-[9px] text-gray-300 tracking-widest mt-1 uppercase">AMS Certified</span>
               </div>
            </div>
            
            <div className="absolute -bottom-2 -right-4 bg-white px-3 py-1.5 rounded-sm shadow-xl border border-gray-200">
               <span className="font-mono text-[10px] font-black text-[#111] tracking-widest uppercase">ANAC-1002</span>
            </div>
          </div>

          <a href="#produtos" className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[#111] font-bold uppercase tracking-widest text-xs hover:bg-[#bd1622] hover:text-white transition-colors duration-500 rounded-sm">
            Linha Homologada
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
                <div className="timeline-dot relative w-12 h-12 rounded-full border-2 border-gray-800 bg-[#07090e] flex-shrink-0 flex items-center justify-center z-20 mt-1 transition-colors duration-500 shadow-md">
                  {/* Ponto Central Brilhante (Escala CSS Inativa por padrão) */}
                  <div className="dot-core w-4 h-4 rounded-full bg-transparent opacity-0 scale-0 transition-all duration-300" />
                </div>

                {/* Conteúdo Textual */}
                <div className="timeline-content pt-2 pb-6">
                  <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase block mb-3 font-semibold">Fase {step.id}</span>
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
