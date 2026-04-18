"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

export function Block1Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Background parallax & scale setup
    gsap.set(bgRef.current, { scale: 1.1 });
    tl.to(bgRef.current, {
      scale: 1,
      duration: 2,
      ease: "power3.out",
    });

    // Stagger headline text
    if (headlineRef.current) {
      const words = headlineRef.current.children;
      gsap.from(words, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: -1.5,
      });
    }

    // Subheadline
    gsap.from(subheadRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: -1,
    });

    // CTA
    gsap.from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: -0.8,
    });

    // Parallax scroll
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden flex flex-col justify-center bg-black">
      {/* Background Image / Video mock */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120vh] -top-[10vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop" 
          alt="Aeropolimento" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <h1 ref={headlineRef} className="overflow-hidden text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 uppercase flex flex-wrap justify-center gap-x-4">
          <span className="block">A</span ><span className="block">Referência</span > <span className="block">em</span > <span className="block text-red-600">Química</span > <span className="block">Aeronáutica</span >
        </h1>

        <p ref={subheadRef} className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-12 font-medium">
          Produtos homologados pela ANAC e conformidade AMS. O padrão ouro na preservação de asas fixas e rotativas.
        </p>

        <div ref={ctaRef} className="flex justify-center gap-6">
          <a href="#produtos" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold tracking-wide transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center">
            Conheça nossos produtos
          </a>
          <a href="#contato" className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white text-white rounded-xl font-bold tracking-wide transition-all hover:bg-white/10">
            Fale com o Comercial
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce text-zinc-400">
        <span className="text-sm font-semibold tracking-widest uppercase mb-2">Scroll</span>
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}
