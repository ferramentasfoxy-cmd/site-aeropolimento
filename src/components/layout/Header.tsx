'use client';
import * as React from "react";
import gsap from "gsap";
import { Button } from "../ui/button";

export function Header() {
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 2.2, ease: "expo.out", delay: 2.7 }
    );
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 lg:px-[7%] xl:px-[10%] py-8 border-b border-gray-300"
    >
      {/* Brand Logo Oficial - Prominente e impactante */}
      <div className="flex items-center">
        <img src="/images/logos/logo.svg" alt="Aeropolimento Oficial" className="h-10 lg:h-12 w-auto hover:opacity-80 transition-opacity" />
      </div>

      {/* Links de Nav Centrais (Estilo Editorial) */}
      <nav className="hidden lg:flex items-center gap-10">
        <a href="/sobre" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[#171717] transition-colors">Sobre</a>
        <a href="/produtos" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[#171717] transition-colors">Produtos</a>
        <a href="/portfolio" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[#171717] transition-colors">Portfólio</a>
        <a href="/recursos" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[#171717] transition-colors">Recursos</a>
        <a href="/contato" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[#171717] transition-colors">Contato</a>
      </nav>

      {/* Botões / Call to Action Direito */}
      <div className="flex items-center gap-4">
        <a href="/blog" className="relative group px-6 py-2.5 rounded-full overflow-hidden text-[10px] font-bold text-[#737373] tracking-widest bg-white border border-gray-300 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5">
          {/* Fundo Deslizante Red Glass */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#bd1622]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
          
          <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-[#171717]">
            {/* Ponto Vermelho Sincronizado */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#bd1622] shrink-0 group-hover:scale-125 transition-transform duration-500"></div>
            <span className="uppercase tracking-[0.2em] mt-[1px]">Acessar Blog</span>
          </span>
        </a>
      </div>
    </header>
  );
}
