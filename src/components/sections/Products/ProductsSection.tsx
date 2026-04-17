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
          right: -5vw;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: clamp(150px, 18vw, 300px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(23, 23, 23, 0.02);
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
          padding: 0 6vw;
          height: 100%;
          width: 100%;
          max-width: 1600px;
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
          .marca-dagua {
            font-size: 15vh;
            right: -10vw;
          }
        }

        /* Indicador Dot fixo elegante */
        .indicador-container {
          position: fixed;
          left: 3vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 50;
        }
        .indicador-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .indicador-dot.active {
          background-color: #bd1622;
          height: 24px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(189,22,34,0.4);
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
        <div className="background absolute inset-0 z-0">
           {/* Iluminacao Radial de Estúdio Premium */}
           <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(240,240,240,1)_0%,_rgba(253,253,253,0)_70%)]" />
           <div className="absolute top-1/3 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center_left,_rgba(255,235,235,0.4)_0%,_rgba(253,253,253,0)_60%)]" />
           {/* Technical Grid Sutíl */}
           <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3vw_3vw] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>
        <div className="marca-dagua">AEROCARE</div>
        <div className="conteudo-grid">
          <div className="flex flex-col items-start justify-center h-full w-full mx-auto text-left z-10">
            <div className="titulo flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-md border border-gray-200/60 px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-fit">
              <div className="w-2.5 h-2.5 bg-[#bd1622] rounded-full shadow-[0_0_10px_rgba(189,22,34,0.5)] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] text-gray-800 font-bold uppercase">Apresentando a Linha Aerocare</span>
            </div>
            
            <h2 className="titulo font-display text-[3.5rem] md:text-6xl lg:text-[5.5rem] uppercase font-extrabold text-[#111] tracking-tighter leading-[0.95] mb-8">
              Padrão <br/><span className="text-[#bd1622]">Aeronáutico</span>
            </h2>
            
            <div className="descricao text-gray-600 leading-[1.8] font-medium text-lg lg:text-xl text-balance max-w-xl">
              <p className="text-[#111] font-display font-semibold text-2xl lg:text-3xl tracking-tight leading-[1.3] mb-4">A química da perfeição e excelência.</p>
              <p>Foram anos de P&D em laboratórios dedicados à engenharia aeroespacial para criarmos formulações que não apenas limpam, mas preservam e extendem a vida útil da estrutura da aeronave contra intempéries e atmosferas extremas.</p>
            </div>
          </div>
          
          <div className="imagem-produto w-full h-full flex items-center justify-center relative z-10">
              {/* Radar Element / Arte Geométrica */}
              <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center opacity-80">
                  <div className="absolute inset-0 border border-gray-200 rounded-full animate-[spin_60s_linear_infinite]">
                     <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-[#bd1622] rounded-full shadow-[0_0_15px_#bd1622]"></div>
                  </div>
                  <div className="absolute inset-[10%] border border-gray-100 rounded-full"></div>
                  <div className="absolute inset-[20%] border border-gray-100/50 rounded-full animate-[spin_40s_linear_infinite_reverse]">
                     <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-45"></div>
                  <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent -rotate-45"></div>
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
