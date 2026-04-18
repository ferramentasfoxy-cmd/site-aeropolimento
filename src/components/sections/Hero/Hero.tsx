'use client';
import * as React from "react";
import gsap from "gsap";
import { HeroContent } from "./HeroContent";
import { HeroProduct, HudReadouts } from "./HeroProduct";
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
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-[100vh] z-0 translate-x-[4%] lg:translate-x-[6%] hero-3d-layer pointer-events-auto">
        <HeroProduct />
      </div>

      {/* --- HUD TÁTICO GLOBAL SOBRE A TELA INTEIRA --- */}
      <HudReadouts accent="#BD1622" />

      {/* Camada 2: Conteúdo Tipográfico Editorial Left Side - Foco na largura cheia */}
      <div className="relative z-10 w-full h-[100vh] px-8 lg:px-[7%] xl:px-[10%] flex flex-col justify-center pointer-events-none hero-content-layer">
        
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
