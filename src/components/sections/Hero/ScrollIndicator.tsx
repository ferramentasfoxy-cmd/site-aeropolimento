'use client';
import * as React from 'react';
import gsap from 'gsap';

export function ScrollIndicator() {
  const dotRef = React.useRef(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        dotRef.current,
        { y: 0, opacity: 1, scaleY: 1 },
        {
          y: 14,
          opacity: 0,
          scaleY: 1.5,
          duration: 1.6,
          repeat: -1,
          ease: "power2.inOut",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 group cursor-pointer">
      <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#737373] transition-colors duration-500 group-hover:text-[#bd1622]">
        Descubra
      </span>
      
      {/* Container "Mouse" HUD (Glassmorphism alinhado com Cards Auth) */}
      <div className="w-[22px] h-[36px] rounded-[20px] border border-gray-300 flex justify-center pt-[5px] transition-all duration-300 group-hover:border-gray-400 bg-white/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
        
        {/* Scroll Dot/Wheel Animado com GSAP Engine */}
        <div 
          ref={dotRef}
          className="w-[3px] h-[6px] bg-[#bd1622] rounded-full shadow-[0_0_6px_rgba(189,22,34,0.5)]"
        />
        
      </div>
    </div>
  );
}
