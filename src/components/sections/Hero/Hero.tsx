'use client';
import * as React from "react";
import gsap from "gsap";
import { HeroContent } from "./HeroContent";
import { HeroProduct } from "./HeroProduct";
import { ScrollIndicator } from "./ScrollIndicator";
import { Header } from "../../layout/Header";
import { AnacBadge } from "../../ui/AnacBadge";

export function Hero() {
  const heroRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada dos aesthetics do ambiente Light
      gsap.fromTo(
        ".hud-aesthetic",
        { opacity: 0, y: 15, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.8, stagger: 0.2, delay: 3.4, ease: "expo.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-[var(--color-bg-primary)]">
      
      {/* Header Premium Solto sobre a tela */}
      <Header />

      {/* Camada 0: Fundo Ambiental Galpão Branco com Iluminação Studio (Radial Glow) */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg-primary)]">
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,1)_0%,_rgba(247,247,247,0)_60%)] opacity-80" />
         <div className="border-grid-pattern absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      {/* Camada 1: O Palco 3D WebGL na Direita (Deslocamento contido) */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 translate-x-[4%] lg:translate-x-[6%]">
        
        {/* Selo Animado ANAC - Top Left of Product */}
        <AnacBadge />

        <HeroProduct />

        {/* Selo Flutuante 360º Altamente Interativo */}
        <div className="absolute bottom-[20%] left-[20%] xl:left-[28%] z-20 hud-aesthetic opacity-0 hidden lg:block group cursor-default">
          <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] group-hover:shadow-[0_25px_60px_rgba(189,22,34,0.12)] p-3 pr-8 flex items-center gap-4 border border-gray-300 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5">
            
            {/* Feixe de Luz Angular (Glass Wipe Effect) que cruza ao passar o mouse */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-gray-100/80 to-transparent skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-10" />

            <div className="w-12 h-12 bg-[#171717] rounded-full flex items-center justify-center text-white shrink-0 shadow-md group-hover:bg-[#bd1622] group-hover:scale-105 transition-all duration-500 relative z-20">
              {/* O ícone do mouse com interatividade na roda de scroll */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-[-5deg] transition-transform duration-300">
                <rect x="5" y="2" width="14" height="20" rx="7"/>
                <path d="M12 6v4" className="animate-[bounce_2s_infinite] group-hover:animate-pulse" />
              </svg>
            </div>
            
            <div className="relative z-20">
              <p className="text-[15px] font-semibold text-[#171717] leading-tight group-hover:text-[#bd1622] transition-colors duration-400">Girar em 360º</p>
              <p className="text-sm text-gray-500 leading-tight">interaja com o frasco</p>
            </div>
          </div>
        </div>
      </div>

      {/* Camada 2: Conteúdo Tipográfico Editorial Left Side - Foco na largura cheia */}
      <div className="relative z-10 w-full h-full px-8 lg:px-[7%] xl:px-[10%] flex flex-col justify-center pointer-events-none">
        
        {/* A coluna esquerda textual */}
        <div className="w-full lg:w-[55%] pointer-events-auto">
           <HeroContent />
        </div>

      </div>

      {/* Indicador Elegante de Rolagem - Animado p/ entrar junto c/ elementos de HUD */}
      <div className="hud-aesthetic opacity-0">
        <ScrollIndicator />
      </div>

    </section>
  );
}
