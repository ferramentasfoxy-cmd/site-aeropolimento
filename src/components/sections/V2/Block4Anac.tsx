"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Block4Anac() {
  const container = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on seal
    gsap.to(sealRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Stagger steps
    if (stepsRef.current) {
      const steps = stepsRef.current.children;
      gsap.from(steps, {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

  }, { scope: container });

  const criteria = [
    "Testes de corrosão e inflamabilidade em laboratórios certificados.",
    "Avaliação rigorosa de impacto em ligas de alumínio e compósitos.",
    "Auditorias presenciais na planta de fabricação química.",
    "Aprovação técnica conjunta entre ANAC e especificações AMS.",
  ];

  return (
    <section ref={container} className="relative w-full py-24 lg:py-32 bg-zinc-900 overflow-hidden text-white border-t border-zinc-800">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-red-900/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              O Padrão de Ouro
            </span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
              O rigor da homologação ANAC.
            </h2>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed font-light">
              Por que poucos produtos conseguem aprovação? A aviação não aceita margem de erro. Nossa certificação atesta qualidade, segurança e preservação absoluta de estruturas e ligas metálicas.
            </p>

            <div ref={stepsRef} className="space-y-6 mb-12">
              {criteria.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                  <p className="text-zinc-300 text-lg">{item}</p>
                </div>
              ))}
            </div>

            <a href="#produtos" className="inline-flex items-center px-8 py-4 bg-white text-zinc-900 hover:bg-zinc-200 hover:scale-105 rounded-xl font-bold tracking-wide transition-all uppercase text-sm">
              Conheça nossos produtos homologados
            </a>
          </div>

          {/* Right: Anac Seal Highlight */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div ref={sealRef} className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] max-w-full">
              {/* Mockup for ANAC Seal with glow and floating effect */}
              <div className="absolute inset-0 bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border border-red-500/30 flex items-center justify-center bg-black/50 backdrop-blur-xl shadow-2xl">
                 <div className="text-center">
                    <span className="block text-4xl lg:text-7xl font-black text-white tracking-tighter">ANAC</span>
                    <span className="block text-sm lg:text-lg font-bold text-red-500 tracking-[0.3em] uppercase mt-2">Aprovado</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
