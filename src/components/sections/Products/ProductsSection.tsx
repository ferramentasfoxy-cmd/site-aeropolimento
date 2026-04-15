'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "./ProductCard";

export function ProductsSection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);

  // Payload Baseado no copy-homepage.md
  const products = [
    {
      badge: "Aprovado ANAC",
      title: "APC — All Purpose Cleaner",
      description: "Limpador multiuso de alta performance. Remove contaminações de fuselagem, trem de pouso e interiores sem comprometer pinturas ou revestimentos.",
      imageSrc: "/images/products/ap001.png"
    },
    {
      badge: "Aprovado ANAC",
      title: "Cera Líquida",
      description: "Camada protetora contra raios UV e contaminantes ambientais. Restaura e mantém o brilho da fuselagem por semanas após a aplicação.",
      imageSrc: "/images/products/ap001.png"
    },
    {
      badge: "Aprovado ANAC",
      title: "Massa de Polir",
      description: "Composto de correção para superfícies com pintura poliéster e poliuretano. Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento.",
      imageSrc: "/images/products/ap001.png"
    }
  ];

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Entrada da Secao Completa
      gsap.fromTo(headlineRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        }
      );

      // Refatoração GSAP para os Super Palcos (Stages)
      gsap.fromTo(
        ".copy-text-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Animação dos palcos revelando verticalmente
      gsap.utils.toArray('.product-stage').forEach((stage: any, index) => {
        gsap.fromTo(stage,
          { opacity: 0, y: 80, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 80%"
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="produtos"
      ref={containerRef} 
      className="relative w-full bg-[#fdfdfd] pt-32 pb-40 overflow-hidden"
    >
      {/* Camada Visual de Fundo: Studio Lighting Radial & Decorativos Aeronáuticos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Iluminacao Radial de Estúdio */}
        <div className="absolute top-0 right-0 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(240,240,240,1)_0%,_rgba(253,253,253,0)_70%)]" />
        <div className="absolute top-[40%] left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center_left,_rgba(255,235,235,0.4)_0%,_rgba(253,253,253,0)_60%)]" />
        
        {/* Technical Grid Invisível */}
        <div className="absolute inset-0 opacity-[0.2] bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,#000_20%,transparent_100%)]" />

        {/* Large Scale Aeronautical Backdrop Decorators */}
        
        {/* Huge Continental Flight Path */}
        <svg className="absolute top-[10%] left-0 w-[120vw] h-[80vh] opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M -10,90 Q 50,40 110,10" fill="none" stroke="#bd1622" strokeWidth="0.2" strokeDasharray="1 3" />
           <path d="M -10,30 Q 50,80 110,50" fill="none" stroke="#171717" strokeWidth="0.1" />
        </svg>

        {/* Subtle Radar/Compass Sweep in the background */}
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-gray-200/50 rounded-full opacity-20 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border border-gray-200/30 rounded-full" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200/40 to-transparent" />
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-gray-200/40 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* Cabeçalho & Copy Editorial (Centralizado e Majestoso) */}
        <div ref={headlineRef} className="flex flex-col items-center text-center w-full max-w-[900px] mb-28">
          
          <div className="copy-text-reveal flex items-center gap-3 mb-8 bg-white/80 backdrop-blur-md border border-gray-200/60 px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="w-2.5 h-2.5 bg-[#bd1622] rounded-full shadow-[0_0_8px_rgba(189,22,34,0.4)]" />
            <span className="font-mono text-sm tracking-[0.15em] text-gray-800 font-bold uppercase">Linha Aerocare</span>
          </div>

          <h2 className="copy-text-reveal font-display text-[2.75rem] md:text-6xl xl:text-[4.5rem] uppercase font-bold text-[#171717] tracking-tighter leading-[0.95] mb-12">
            Produtos concebidos <br/><span className="text-[#bd1622]">para aviação</span>
          </h2>
          
          <div className="flex flex-col gap-6 text-gray-500 leading-[1.8] font-medium text-lg xl:text-[1.1rem]">
            <p className="copy-text-reveal text-[#171717] font-display font-semibold text-2xl md:text-3xl tracking-tight leading-[1.3]">
              Ciência que eleva padrões.
            </p>
            <p className="copy-text-reveal text-balance max-w-[800px] mx-auto grayscale-50">
              Cada formulação que desenvolvemos nasce de um compromisso inegociável com a excelência. São anos de pesquisa aplicada em química de polimento, traduzidos em produtos que atendem — e superam — as exigências mais rigorosas da indústria aeronáutica.
            </p>
            <p className="copy-text-reveal text-balance max-w-[800px] mx-auto transition-opacity">
              Nossas fórmulas são proprietárias, desenvolvidas internamente e aprovadas pelos principais órgãos reguladores do setor. Não adaptamos soluções genéricas: criamos tecnologia específica para cada desafio que superfícies aeronáuticas apresentam.
            </p>
            <p className="copy-text-reveal text-balance max-w-[800px] mx-auto pb-4">
              O resultado é uma linha de produtos que grandes operadores, fabricantes e centros de manutenção reconhecem como referência — onde precisão técnica encontra performance comprovada.
            </p>

            <div className="copy-text-reveal pt-8 border-t border-gray-200/80 mx-auto inline-block">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] font-bold text-[#bd1622] leading-relaxed block text-balance px-4 bg-[#bd1622]/5">
                Formulação própria. <span className="opacity-40 px-3">•</span> Aprovação regulatória. <span className="opacity-40 px-3">•</span> Confiança de quem exige.
              </span>
            </div>
          </div>
        </div>

        {/* Product SHOWCASE Render (A Pilha Vertical - O Zig Zag) */}
        <div className="w-full flex flex-col gap-32 lg:gap-40">
          {products.map((product, idx) => (
            <ProductCard 
              key={idx}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              badge={product.badge}
              reverse={idx % 2 !== 0}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
