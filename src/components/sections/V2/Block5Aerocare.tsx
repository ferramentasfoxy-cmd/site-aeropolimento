"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Droplets, GaugeCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Block5Aerocare() {
  const container = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Watermark slow parallax based on scroll
    gsap.to(watermarkRef.current, {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Fade and slide content up
    const elements = contentRef.current?.children;
    if (elements) {
      gsap.from(elements, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });
    }

  }, { scope: container });

  const benefits = [
    { icon: <Shield className="w-8 h-8"/>, title: "Proteção UV Contínua", desc: "Barreira contra intempéries e raios solares." },
    { icon: <Droplets className="w-8 h-8"/>, title: "PH Balanceado", desc: "Seguro para pintura poliuretano e clearcoat." },
    { icon: <GaugeCircle className="w-8 h-8"/>, title: "Alta Performance", desc: "Resultados superiores com menor esforço mecânico." },
  ];

  return (
    <section ref={container} id="linha-aerocare" className="relative w-full min-h-[90vh] bg-white overflow-hidden py-24 flex items-center border-t border-zinc-100">
      {/* Watermark "AEROCARE" */}
      <div 
        ref={watermarkRef} 
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-[15vw] font-black text-zinc-50 pointer-events-none select-none tracking-tighter"
      >
        AEROCARE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-50 rounded-2xl mb-8">
            <span className="text-red-700 font-bold tracking-[0.2em] uppercase text-sm">
              Conheça a Linha Aerocare
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tight mb-8 leading-[1.1]">
            Tecnologia de ponta em estética.
          </h2>
          
          <p className="text-xl text-zinc-600 mb-16 leading-relaxed">
            Formulados cientificamente para as exigências da atmosfera, garantindo <br className="hidden md:block" /> a preservação máxima das características originais de cada aeronave.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {benefits.map((item, idx) => (
              <div key={idx} className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
