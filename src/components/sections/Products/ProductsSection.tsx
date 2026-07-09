'use client';
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { ProductCard } from "./ProductCard";
import { useT } from "@/i18n/LanguageProvider";

export function ProductsSection() {
  const { t } = useT();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Texto vem do dicionário (t.products.items); imagens permanecem locais
  // e parelhas por índice — separação conteúdo (i18n) × asset (estático).
  const productImages = [
    "/images/products/ap001.png",
    "/images/products/ap0010.png",
    "/images/products/ap0020.png",
  ];
  // Modelos 3D pareados por índice (fallback PNG = productImages acima).
  // APC=apc.glb, Cera=cera.glb, Massa=massa.glb (comprimidos meshopt+webp).
  const productModels = [
    "/models/apc.glb",
    "/models/cera.glb",
    "/models/massa-v5.glb",
  ];
  const products = t.products.items.map((item, i) => ({
    code: item.code,
    title: item.title,
    lead: item.lead,
    specs: item.specs,
    imageSrc: productImages[i],
    modelSrc: productModels[i],
  }));

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.produto-fullscreen') as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set('.marca-dagua', { yPercent: 0 });
        gsap.set('.indicador-container', { autoAlpha: 1 });
        sections.forEach((section) => {
          const titulos = section.querySelectorAll('.titulo');
          const descricoes = section.querySelectorAll('.descricao');
          const img = section.querySelector('.imagem-produto');
          if (titulos.length) gsap.set(titulos, { y: 0, opacity: 1 });
          if (descricoes.length) gsap.set(descricoes, { y: 0, opacity: 1 });
          if (img) gsap.set(img, { y: 0, opacity: 1, yPercent: 0 });
        });
        return;
      }

      // 1. Marca d'água Global (parallax scrub — ease:"none" obrigatório em scrub; duration ignorada em scrub)
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

      // 2. Controlar a exbição da Side-Bar (só aparece dentro desta sessão!)
      // duration/ease herdam de gsap.defaults.
      gsap.to('.indicador-container', {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
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

      // Orquestração Premium - Minimalist Flow Design (Natural Scroll)
      sections.forEach((section, index) => {

        // --- 1. Entrada de Conteúdo Orgânica ---
        // start "top 75%" custom (entrada cedo); timeline internals usam duration/ease custom abaixo.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
          }
        });

        // Títulos e Badges - Clean and Fast (duration 0.8s curto = visceral).
        const titulos = section.querySelectorAll('.titulo');
        if (titulos.length) tl.from(titulos, { y: 25, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0);

        // Descrições
        const descricoes = section.querySelectorAll('.descricao');
        if (descricoes.length) tl.from(descricoes, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0.1);

        // Imagem surge com elegância mas sem lerdeza
        const img = section.querySelector('.imagem-produto');
        if (img) tl.from(img, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.1);

        // --- 2. Micro-Parallax na Imagem (scrub — ease:"none" obrigatório)
        if (img) {
          gsap.to(img, {
            yPercent: -15,
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
          start: "top 40%",
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
    <div ref={containerRef} id="produtos" className="container-produtos relative w-full bg-[var(--color-text-primary)] overflow-hidden">
      <style>{`
        .container-produtos {
          position: relative;
          width: 100%;
          /* Margin top para respiro se vier do Hero */
          z-index: 10;
        }

        .produto-fullscreen {
          min-height: 100svh; /* svh: evita corte/pulo pela barra do navegador no mobile */
          width: 100%;
          position: relative; /* Fluxo Orgânico Nativo - Sem Stacking Bugs */
          overflow: hidden;
          background-color: var(--color-surface-base); /* branco único do sistema */
          will-change: transform, opacity;
          display: flex;
          align-items: center;
          /* Sem divisória entre seções — visual contínuo e limpo (branco único) */
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

        /* Indicador Dot fixo elegante - Inicialmente invisível e revelado via GSAP */
        .indicador-container {
          position: fixed;
          left: 2vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 50;
          opacity: 0;
          visibility: hidden;
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
        <div className="background absolute inset-0 z-0 bg-[var(--color-surface-base)]" />
        <div className="marca-dagua">AEROCARE</div>
        <div className="conteudo-grid">
          <div className="flex flex-col items-center text-center md:items-start md:text-left justify-center h-full w-full min-w-0 mx-auto z-10 md:pl-[6vw]">
            <div className="titulo flex items-center gap-3 mb-8 bg-white border border-gray-100 px-5 py-2 rounded-full w-fit">
              <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-gray-700 font-bold uppercase pt-0.5">{t.products.introBadge}</span>
            </div>

            <h2 className="titulo font-display text-[clamp(2.5rem,11vw,7rem)] uppercase font-black text-[var(--color-text-primary)] tracking-tighter leading-[0.9] md:leading-[0.85] text-balance mb-8">
              {t.products.introTitleLine1} <br/><span className="text-aero-red">{t.products.introTitleLine2}</span>
            </h2>

            <div className="descricao flex flex-col gap-4 items-center text-center md:items-start md:text-left text-gray-500 font-medium text-base md:text-lg max-w-[460px] mx-auto md:mx-0 leading-[1.8]">
              <p className="text-[var(--color-text-primary)] font-display font-semibold text-2xl lg:text-3xl tracking-tight leading-[1.2] text-balance">{t.products.introLead}</p>
              <p className="text-pretty">{t.products.introParagraph}</p>
            </div>
          </div>
          
          <div className="imagem-produto w-full h-full flex items-center justify-center relative z-10">
            <div className="w-full max-w-[440px] md:pl-[4vw]">
              {/* Índice do catálogo — conecta o intro às fichas técnicas */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-gray-400">
                <span className="w-6 h-px bg-gray-300" aria-hidden="true" />
                <span>{t.products.catalogLabel}</span>
              </div>
              <ul className="border-t border-gray-200/90">
                {t.products.items.map((item, i) => {
                  const name = item.title.includes("—") ? item.title.split("—")[0].trim() : item.title;
                  return (
                    <li key={i} className="group flex items-baseline gap-5 py-5 border-b border-gray-200/90">
                      <span className="font-mono text-xs font-bold text-aero-red tracking-widest shrink-0 w-[64px]">{item.code}</span>
                      <span className="font-display text-lg md:text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">{name}</span>
                      <span className="ml-auto font-mono text-gray-300 transition-all duration-300 group-hover:text-aero-red group-hover:translate-x-1">→</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blocos dos Produtos */}
      {products.map((product, idx) => (
        <section key={idx} id={`produto-${idx + 1}`} className="produto-fullscreen">
          <div className="background absolute inset-0 bg-[var(--color-surface-base)] z-0">
             <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(240,240,240,1)_0%,_rgba(253,253,253,0)_70%)]" />
             <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,240,240,0.5)_0%,_rgba(253,253,253,0)_70%)]" />
          </div>
          
          <div className="marca-dagua">AEROCARE</div>
          <ProductCard
            code={product.code}
            title={product.title}
            lead={product.lead}
            specs={product.specs}
            imageSrc={product.imageSrc}
            modelSrc={product.modelSrc}
            reverse={idx % 2 !== 0} // Zig-zag
          />
        </section>
      ))}
    </div>
  );
}
