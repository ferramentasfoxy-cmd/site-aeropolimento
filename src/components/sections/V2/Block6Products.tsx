"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "AP001",
    name: "APC — All Purpose Cleaner",
    desc: "Limpador multiuso de alta performance. Remove contaminações de fuselagem, trem de pouso e interiores sem comprometer pinturas ou revestimentos.",
    color: "bg-zinc-100",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "AP002",
    name: "Cera Líquida",
    desc: "Camada protetora contra raios UV e contaminantes ambientais. Restaura e mantém o brilho da fuselagem por semanas após a aplicação.",
    color: "bg-red-50",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "AP003",
    name: "Massa de Polir",
    desc: "Composto de correção para superfícies com pintura poliéster e poliuretano. Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento.",
    color: "bg-zinc-900 text-white",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop"
  }
];

export function Block6Products() {
  const container = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll pinning and horizontal scrub approach or vertical sequential pinning
    const sections = wrapperRef.current?.querySelectorAll('.product-panel');
    
    if (sections && window.innerWidth >= 1024) {
      // Horizontal scroll pinning for desktop
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (wrapperRef.current?.offsetWidth || 1) * sections.length,
        }
      });
    } else if (sections) {
        // Vertical staggering for mobile
        sections.forEach((sec) => {
            gsap.from(sec, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                }
            });
        });
    }
  }, { scope: container });

  return (
    <section ref={container} id="produtos" className="w-full relative overflow-hidden bg-white">
      <div 
        ref={wrapperRef} 
        className="w-[100vw] lg:w-[300vw] flex flex-col lg:flex-row lg:h-screen"
      >
        {products.map((prod, i) => (
          <div 
            key={prod.id} 
            className={`product-panel w-[100vw] h-auto lg:h-screen flex items-center justify-center shrink-0 p-8 py-24 ${prod.color}`}
          >
             <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Product Image */}
                <div className="relative h-[400px] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/20">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
                    Aprovado ANAC
                  </div>
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-700" />
                </div>

                {/* Right: Content */}
                <div className={`p-8 lg:p-16 flex flex-col justify-center ${prod.color.includes('text-white') ? 'text-white' : 'text-zinc-900'}`}>
                  <span className={`font-black text-2xl tracking-widest mb-4 opacity-50`}>{prod.id}</span>
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
                    {prod.name}
                  </h2>
                  <p className={`text-xl leading-relaxed mb-12 ${prod.color.includes('text-white') ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {prod.desc}
                  </p>

                  <div className="flex gap-4">
                    <a href={`#${prod.id}`} className={`px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:scale-105 ${prod.color.includes('text-white') ? 'bg-white text-zinc-900 shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-zinc-900 text-white shadow-[0_0_40px_rgba(0,0,0,0.1)]'}`}>
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>

             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
