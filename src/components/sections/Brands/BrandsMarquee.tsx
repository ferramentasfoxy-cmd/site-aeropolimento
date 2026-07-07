'use client';
import * as React from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { useT } from "@/i18n/LanguageProvider";

function PurePremiumLogo({ brand }: { brand: { name: string, src: string } }) {
  return (
    <div className="relative px-8 md:px-20 py-10 flex items-center justify-center group select-none flex-shrink-0">
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src={brand.src} 
          alt={brand.name}
          className="relative h-10 md:h-[3.25rem] w-auto min-w-[140px] md:min-w-[180px] object-contain 
                     brightness-0 opacity-[0.5]
                     transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:opacity-100 group-hover:scale-[1.08]
                     will-change-transform pointer-events-none"
        />
      </div>
    </div>
  );
}

export function BrandsMarquee() {
  const { t } = useT();
  const containerRef = React.useRef<HTMLElement>(null);
  
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(containerRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      // Entrada mais perceptível (pedido do usuário)
      // duration custom (2.2s) + power3.out custom mantidos; start herda de defaults ("top 85%").
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const brands = [
    { name: "AIRBUS", src: "/images/logos/brands/airbus.svg" },
    { name: "EMBRAER", src: "/images/logos/brands/embraer.svg" },
    { name: "CESSNA", src: "/images/logos/brands/cessna.svg" },
    { name: "GULFSTREAM", src: "/images/logos/brands/gulfstream.svg" },
    { name: "BOMBARDIER", src: "/images/logos/brands/bombardier.svg" },
    { name: "BELL", src: "/images/logos/brands/bell.svg" },
    { name: "DASSAULT", src: "/images/logos/brands/dassault.svg" },
    { name: "ROBINSON", src: "/images/logos/brands/robinson.svg" },
    { name: "BEECHCRAFT", src: "/images/logos/brands/beechcraft.svg" },
    { name: "CIRRUS", src: "/images/logos/brands/cirrus.svg" },
    { name: "LEONARDO", src: "/images/logos/brands/leonardo.svg" }
  ];

  return (
    <section
      ref={containerRef}
      className="w-full pt-24 pb-24 bg-white border-b border-gray-100 overflow-hidden relative opacity-0 transform-gpu shadow-[0_8px_30px_-18px_rgba(0,0,0,0.10)]"
    >
      <div className="w-full mb-16 flex flex-col items-center justify-center gap-1.5 pointer-events-none px-4 text-center">
        <p className="text-[11px] md:text-[13px] uppercase tracking-[0.42em] font-medium text-[var(--color-text-secondary)]">
          {t.brands.trustLineTop}
        </p>
        <p className="text-[17px] md:text-[22px] uppercase tracking-[0.24em] font-semibold text-[#171717]">
          {t.brands.trustLineBottom}
        </p>
      </div>

      <div className="relative flex w-full">

        {/* Dissipação Simples (Leve no HTML) para os lados */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-56 z-20 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-56 z-20 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        {/* Trilho CSS Puro (Para com Hover) */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max cursor-default">
          <div className="flex items-center whitespace-nowrap">
            {brands.map((brand, i) => <PurePremiumLogo key={`s1-${i}`} brand={brand} />)}
            {brands.map((brand, i) => <PurePremiumLogo key={`s2-${i}`} brand={brand} />)}
            {brands.map((brand, i) => <PurePremiumLogo key={`s3-${i}`} brand={brand} />)}
          </div>
        </div>
      </div>
      
      {/* Keyframes do Auto-Scroll */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}} />
    </section>
  );
}
