"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export function PortfolioSection() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      // Cálculo da largura total a ser "rolada" horizontalmente
      const getScrollAmount = () => -(gallery.scrollWidth - window.innerWidth);

      // A mágica do Scroll Horizontal Pin
      gsap.to(gallery, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`, // A duração do scroll é igual à largura dos cards
          pin: true,
          scrub: 1, // Smoothness
          invalidateOnRefresh: true, // Recalcula se redimensionar a tela
        }
      });
      
      // Animação de entrada do Título
      gsap.from('.portfolio-texto', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const items = [
    { 
      id: 1, 
      type: "Detailing Extremo", 
      label: "Gulfstream G650", 
      desc: "Polimento em três etapas com selante cerâmico focado em redução de atrito.",
      img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2662&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      type: "MRO Application", 
      label: "Bombardier Global 7500", 
      desc: "Remoção absoluta de oxidação e restauração de bordos de ataque para padrões de fábrica.",
      img: "https://images.unsplash.com/photo-1559091605-e99d8d69784e?q=80&w=2755&auto=format&fit=crop" 
    },
    { 
      id: 3, 
      type: "Heavy Jet Protection", 
      label: "Cessna Citation Longitude", 
      desc: "Tratamento vitrificador completo para exposição sob atmosferas salinas severas.",
      img: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2670&auto=format&fit=crop" 
    },
  ];

  return (
    <section ref={containerRef} id="portfolio" className="relative w-full h-screen bg-[#050505] overflow-hidden text-white z-20">
      
      {/* Título Fixo durante o scroll horizontal */}
      <div className="absolute top-12 md:top-24 left-6 md:left-[6vw] z-10 pointer-events-none portfolio-texto mix-blend-difference">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full" />
           <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] font-bold uppercase text-gray-300">Aprovação Internacional</span>
        </div>
        <h2 className="font-display text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold uppercase leading-[0.85] tracking-tighter">
          Nossa <br/><span className="text-[#bd1622] font-black">Excelência</span>
        </h2>
      </div>

      <div className="absolute bottom-12 left-6 md:left-[6vw] z-10 pointer-events-none portfolio-texto mix-blend-difference">
         <p className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">Role para explorar horizontes ⭢</p>
      </div>

      {/* Galeria Horizontal */}
      <div ref={galleryRef} className="flex h-screen w-max items-center pl-[20vw] md:pl-[40vw] pr-[20vw] space-x-12 md:space-x-24">
        {items.map((item, index) => (
          <div key={item.id} className="relative group w-[80vw] md:w-[45vw] lg:w-[40vw] h-[65vh] md:h-[70vh] flex-shrink-0 overflow-hidden cursor-pointer bg-[#111]">
            <Image 
              src={item.img} 
              alt={item.label}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale-[30%]"
            />
            {/* Overlay Gradient Cinematográfico */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />
            
            {/* Box de Informações */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
               <p className="font-mono text-[10px] md:text-xs text-[#bd1622] tracking-widest uppercase mb-3">0{index + 1} // {item.type}</p>
               <h3 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">{item.label}</h3>
               
               <p className="text-gray-400 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-[85%]">
                 {item.desc}
               </p>

               {/* Barra Animada de Seleção */}
               <div className="w-0 h-[2px] bg-[#bd1622] mt-6 transition-all duration-700 ease-out group-hover:w-full" />
            </div>
          </div>
        ))}

        {/* Card Final - Chamada para Ação */}
        <div className="relative group flex flex-col justify-center w-[80vw] md:w-[35vw] h-[65vh] md:h-[70vh] flex-shrink-0 border border-gray-800 bg-[#0a0a0a] p-12 hover:bg-[#111] transition-colors duration-500">
             <div className="w-3 h-3 bg-[#bd1622] mb-8 animate-pulse rounded-full" />
             <h3 className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Eleve o padrão da sua frota.</h3>
             <p className="text-gray-500 text-lg mb-12 max-w-sm">Junte-se à elite da aviação que não aceita nada menos que a perfeição estética e proteção estrutural.</p>
             <button className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-white hover:text-[#bd1622] transition-colors w-fit group-hover:translate-x-2 duration-300">
               Agende uma Avaliação 
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
             </button>
        </div>

      </div>
    </section>
  );
}
