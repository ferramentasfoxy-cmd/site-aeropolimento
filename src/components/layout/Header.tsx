'use client';
import * as React from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";

export function Header() {
  const headerRef = React.useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(headerRef.current, { y: 0, opacity: 1, filter: "blur(0px)" });
    } else {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 2.2, delay: 2.7 }
      );
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isSticky 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm" 
          : "bg-transparent border-b border-gray-300 py-8"
      }`}
    >
      <div className="flex items-center justify-between px-8 lg:px-[7%] xl:px-[10%]">
        {/* Brand Logo Oficial */}
        <div className="flex items-center">
          <a href="/">
            <img 
              src="/images/logos/logo.svg" 
              alt="Aeropolimento Oficial" 
              className={`${isSticky ? 'h-8 lg:h-10' : 'h-10 lg:h-12'} w-auto hover:opacity-80 transition-all duration-300`} 
            />
          </a>
        </div>

        {/* Links de Nav Centrais (Estilo Editorial) */}
        <nav className="hidden lg:flex items-center gap-10">
          <a href="/sobre" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Sobre</a>
          <a href="/produtos" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Produtos</a>
          <a href="/portfolio" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Portfólio</a>
          <a href="/recursos" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Recursos</a>
          <a href="/contato" className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Contato</a>
        </nav>

        {/* Botões / Call to Action Direito */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="/blog" className="relative group px-6 py-2.5 rounded-full overflow-hidden text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-widest bg-white border border-gray-300 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-aero-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
            <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-[var(--color-text-primary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-aero-red shrink-0 group-hover:scale-125 transition-transform duration-500"></div>
              <span className="uppercase tracking-[0.2em] mt-[1px]">Acessar Blog</span>
            </span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div 
          className={`lg:hidden cursor-pointer relative z-[60] w-[30px] h-[20px] flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'rotate-[-90deg]' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block h-[3px] w-full bg-gray-500 rounded-full"></span>
          <span className="block h-[3px] w-full bg-gray-500 rounded-full"></span>
          <span className="block h-[3px] w-full bg-gray-500 rounded-full"></span>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] py-8 shadow-lg' : 'max-h-0 py-0 border-transparent'}`}
      >
        <nav className="flex flex-col items-center gap-6 px-8">
          <a href="/sobre" onClick={() => setIsOpen(false)} className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Sobre</a>
          <a href="/produtos" onClick={() => setIsOpen(false)} className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Produtos</a>
          <a href="/portfolio" onClick={() => setIsOpen(false)} className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Portfólio</a>
          <a href="/recursos" onClick={() => setIsOpen(false)} className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Recursos</a>
          <a href="/contato" onClick={() => setIsOpen(false)} className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors">Contato</a>
          <a href="/blog" onClick={() => setIsOpen(false)} className="px-6 py-2.5 mt-2 rounded-full border border-gray-300 text-[10px] font-bold text-gray-500 tracking-widest uppercase text-center w-full max-w-[200px]">Acessar Blog</a>
        </nav>
      </div>
    </header>
  );
}
