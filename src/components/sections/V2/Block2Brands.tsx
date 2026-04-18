"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const brands = [
  "Embraer", "Airbus", "Boeing", "Cessna", "Gulfstream", "Bombardier", "Bell", "Dassault", "Robinson", "Beechcraft"
];

export function Block2Brands() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite marquee scroll
    const marqueeWidth = marqueeRef.current?.scrollWidth || 0;
    
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    // Fade in on scroll
    gsap.from(container.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-16 bg-white overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase">
          Formulados para os principais fabricantes
        </p>
      </div>

      <div className="relative flex overflow-hidden w-[200vw] lg:w-[150vw]">
        {/* Mascaras de desvanecimento nas bordas */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform gap-16 md:gap-24 px-8 items-center">
          {/* Duplicate for seamless infinite loop */}
          {[...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-500 hover:scale-110 cursor-default ${brand === "Embraer" ? "text-blue-900" : "text-zinc-300 hover:text-red-700"}`}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
