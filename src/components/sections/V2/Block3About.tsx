"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Block3About() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Text Line by Line
    const paragraphs = textRef.current?.querySelectorAll('p, h2, span');
    if (paragraphs) {
      gsap.from(paragraphs, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Image Parallax Effect
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      // Image reveal
      gsap.from(imageRef.current.parentElement, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageRef.current.parentElement,
          start: "top 80%",
        }
      });
    }

    // Animated Counters
    const counters = countersRef.current?.querySelectorAll('.counter-val');
    counters?.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power3.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: countersRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section ref={container} id="sobre" className="relative w-full py-24 lg:py-32 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Esquerda: Texto */}
          <div ref={textRef} className="max-w-xl">
            <span className="text-red-700 font-bold tracking-[0.15em] uppercase text-sm mb-4 block">
              Quem Somos
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-6">
              A referência em <br />química aeronáutica.
            </h2>
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              Desde 2013, a Aeropolimento desenvolve produtos químicos de alta performance para o cuidado profissional de aeronaves. Somos a empresa do Brasil com homologação para fabricação de compostos de polimento e preservação, formulados para asa fixa e rotativa.
            </p>
            <p className="text-lg text-zinc-600 mb-12 leading-relaxed">
              Consolidamos o padrão brasileiro de química aeronáutica no cenário internacional, com formulações próprias e rigor técnico absoluto. Zero atalhos.
            </p>

            <div ref={countersRef} className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-5xl font-black text-red-700 mb-2">
                  <span className="counter-val" data-target="13">0</span>+
                </h4>
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Anos de Mercado</p>
              </div>
              <div>
                <h4 className="text-5xl font-black text-red-700 mb-2">
                  <span className="counter-val" data-target="500">0</span>+
                </h4>
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Aeronaves Tratadas</p>
              </div>
            </div>
          </div>

          {/* Direita: Imagem */}
          <div className="relative lg:h-[800px] h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <div ref={imageRef} className="absolute inset-0 h-[120%] -top-[10%]">
              <img 
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop" 
                alt="Laboratório Aeropolimento" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
