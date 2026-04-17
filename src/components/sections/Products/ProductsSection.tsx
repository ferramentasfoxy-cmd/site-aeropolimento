'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "./ProductCard";

export function ProductsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

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
      imageSrc: "/images/products/ap0010.png"
    },
    {
      badge: "Aprovado ANAC",
      title: "Massa de Polir",
      description: "Composto de correção para superfícies com pintura poliéster e poliuretano. Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento.",
      imageSrc: "/images/products/ap0020.png"
    }
  ];

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    let ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray('.produto-fullscreen') as HTMLElement[];

      // 1. Marca d'água Global (Move levemente durante toda a rolagem dos produtos)
      gsap.to('.marca-dagua', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      const updateDots = (index: number) => {
        document.querySelectorAll('.indicador-dot').forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      };

      const sections = gsap.utils.toArray('.produto-fullscreen') as HTMLElement[];

      // Orquestração Premium - Minimalist Flow Design (Natural Scroll)
      sections.forEach((section, index) => {
        
        // --- 1. Entrada de Conteúdo Orgânica ---
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%", // Entra em cena de forma orgânica
            end: "top 25%",
            toggleActions: "play none none reverse",
          }
        });

        // Títulos e Badges - Clean and Fast
        const titulos = section.querySelectorAll('.titulo');
        if (titulos.length) tl.from(titulos, { y: 25, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0);

        // Descrições
        const descricoes = section.querySelectorAll('.descricao');
        if (descricoes.length) tl.from(descricoes, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0.1);

        // Imagem surge com elegância mas sem lerdeza
        const img = section.querySelector('.imagem-produto');
        if (img) tl.from(img, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.1);

        // --- 2. Micro-Parallax na Imagem (Luxo Adicional) ---
        // A imagem flutua suavemente para cima enquanto o usuário desce a página
        if (img) {
          gsap.to(img, {
            yPercent: -15, // Desce ligeiramente no ritmo oposto
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          });
        }

        // --- 3. Controle da Side-Bar ---
        ScrollTrigger.create({
          trigger: section,
          start: "top 40%", // Atualiza o dot quando a seção chega mais ao meio
          end: "bottom 40%",
          onEnter: () => updateDots(index),
          onEnterBack: () => updateDots(index)
        });
      });

    }, container);

    // Refresh for GSAP to map heights perfectly
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} id="produtos" className="container-produtos relative w-full bg-[#0a0a0a]">
      <style>{`
        .container-produtos {
          position: relative;
          width: 100%;
          /* Margin top para respiro se vier do Hero */
          z-index: 10;
        }

        .produto-fullscreen {
          min-height: 100vh;
          width: 100%;
          position: relative; /* Fluxo Orgânico Nativo - Sem Stacking Bugs */
          overflow: hidden;
          background-color: #fdfdfd; 
          will-change: transform, opacity;
          display: flex;
          align-items: center;
          /* Linha divisória minimalista para separar com classe */
          border-bottom: 1px solid rgba(0,0,0,0.03); 
        }

        /* O primeiro não precisa de sombra superior */
        .produto-fullscreen:first-child {
          border-top: none;
        }

        .marca-dagua {
          position: absolute;
          left: 55%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          font-size: clamp(250px, 35vw, 600px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.8;
          color: rgba(0, 0, 0, 0.02);
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
          will-change: transform;
        }

        .conteudo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4vw;
          align-items: center;
          padding: 0 8vw;
          height: 100%;
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 900px) {
          .conteudo-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
            padding-top: 5rem;
            padding-bottom: 2rem;
          }
        }

        /* Indicador Dot fixo elegante */
        .indicador-container {
          position: fixed;
          left: 2vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 50;
        }
        .indicador-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .indicador-dot.active {
          background-color: #bd1622;
          height: 20px;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
           .indicador-container {
             display: none;
           }
        }
      `}</style>

      {/* Indicador Lateral */}
      <div className="indicador-container">
        {Array.from({ length: products.length + 1 }).map((_, i) => (
          <div key={i} className={`indicador-dot ${i === 0 ? 'active' : ''}`} />
        ))}
      </div>

      {/* Bloco 1: Linha Aerocare (Intro Fullscreen) */}
      <section id="linha-aerocare" className="produto-fullscreen">
        <div className="background absolute inset-0 z-0 bg-[#fafafa]">
           {/* Technical Grid Sutíl */}
           <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,#eaeaea_1px,transparent_1px),linear-gradient(to_bottom,#eaeaea_1px,transparent_1px)] bg-[size:4vw_4vw]" />
        </div>
        <div className="marca-dagua">AEROCARE</div>
        <div className="conteudo-grid">
          <div className="flex flex-col items-start justify-center h-full w-full mx-auto text-left z-10 md:pl-[6vw]">
            <div className="titulo relative flex items-center gap-3 mb-8 bg-white border border-gray-100 px-5 py-2 rounded-full w-fit">
              <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full" />
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-gray-700 font-bold uppercase pt-0.5">Apresentando a Linha Aerocare</span>
              {/* Floating dot from print */}
              <div className="absolute -top-3 -right-3 w-1 h-1 bg-[#bd1622] rounded-full"></div>
              {/* Floating hollow circle from print */}
              <div className="absolute -top-12 -right-16 w-6 h-6 border border-gray-300 rounded-full"></div>
            </div>
            
            <h2 className="titulo font-display text-[4rem] md:text-[5.5rem] lg:text-[7rem] uppercase font-black text-[#111] tracking-tighter leading-[0.85] mb-8">
              Padrão <br/><span className="text-[#bd1622]">Aeronáutico</span>
            </h2>
            
            <div className="descricao flex flex-col gap-4 text-gray-500 font-medium text-base md:text-lg max-w-[460px] leading-[1.8]">
              <p className="text-[#111] font-display font-semibold text-2xl lg:text-3xl tracking-tight leading-[1.2]">A química da perfeição e excelência.</p>
              <p>Foram anos de P&D em laboratórios dedicados à engenharia aeroespacial para criarmos formulações que não apenas limpam, mas preservam e extendem a vida útil da estrutura da aeronave contra intempéries e atmosferas extremas.</p>
            </div>
          </div>
          
          <div className="imagem-produto w-full h-full flex items-center justify-center relative z-10">
              {/* Radar Element / Arte Geométrica EXATA DO PRINT */}
              <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center -ml-[10%]">
                  {/* Outer Circle */}
                  <div className="absolute w-[85%] h-[85%] rounded-full border border-gray-200/60"></div>
                  {/* Inner Circle */}
                  <div className="absolute w-[50%] h-[50%] rounded-full border border-gray-200/60"></div>
                  
                  {/* Crosshair (X) */}
                  <div className="absolute w-[80%] h-[1px] bg-gray-200/60 rotate-45"></div>
                  <div className="absolute w-[80%] h-[1px] bg-gray-200/60 -rotate-45"></div>
                  
                  {/* Custom Dots to match print */}
                  <div className="absolute w-1.5 h-1.5 bg-[#bd1622] rounded-full top-[50%] right-[7.5%] -translate-y-[50%] shadow-[0_0_10px_rgba(189,22,34,0.4)]"></div>
                  <div className="absolute w-1 h-1 bg-[#9ca3af] rounded-full top-[31%] right-[23%]"></div>
              </div>
          </div>
        </div>
      </section>

      {/* Blocos dos Produtos */}
      {products.map((product, idx) => (
        <section key={idx} id={`produto-${idx + 1}`} className="produto-fullscreen">
          <div className="background absolute inset-0 bg-[#fdfdfd] z-0">
             <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(240,240,240,1)_0%,_rgba(253,253,253,0)_70%)]" />
             <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,240,240,0.5)_0%,_rgba(253,253,253,0)_70%)]" />
          </div>
          
          <div className="marca-dagua">AEROCARE</div>
          <ProductCard 
            title={product.title}
            description={product.description}
            imageSrc={product.imageSrc}
            badge={product.badge}
            reverse={idx % 2 !== 0} // Zig-zag
          />
        </section>
      ))}
    </div>
  );
}
