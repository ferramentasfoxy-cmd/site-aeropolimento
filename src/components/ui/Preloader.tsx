'use client';
import * as React from "react";
import gsap from "gsap";

export function Preloader() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [complete, setComplete] = React.useState(false);

  React.useEffect(() => {
    // Scroll lock to prevent scrolling while preloader runs
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setComplete(true);
        }
      });

      // 1. Initial State Setup
      // Logo escondida no vazio com um forte desfoque, pequena e invisível
      gsap.set(".preloader-logo", { scale: 0.8, opacity: 0, filter: "blur(20px)" });
      // Total blackness
      gsap.set(".preloader-bg", { opacity: 1 });

      // 2. Cinematic Logo Entrance (Materializando da Névoa Branca)
      tl.to(".preloader-logo", {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.inOut"
      });

      // 3. Pausa Dramática de Branding Escoltado (Efeito Silêncio)
      tl.to({}, { duration: 0.4 }); 

      // 4. O Grande Dissolve - Expansão Explosiva e Distorção de Blur
      // O logo avança como no hiperespaço contra a "câmera", borrando totalmente!
      tl.to(".preloader-logo", {
        scale: 4,
        filter: "blur(40px)",
        opacity: 0,
        duration: 1.2,
        ease: "power2.in" // Acelera enquanto se aproxima
      });
      
      // O fundo Escuro "derrete" fundindo as brumas da logo distorcida 
      // diretamente aos 'blurs' que vão surgir nos assets do site (Hero e HUD)
      tl.to(".preloader-bg", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut"
      }, "<0.2"); // A câmara escurece o fader em sincronia perfeita com a explosão da logo
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none overflow-hidden">
      {/* Background Cinematográfico - Pitch Black #000 */}
      <div className="preloader-bg absolute inset-0 bg-[#000000] flex items-center justify-center">
        
        {/* Camada do Logo Frontal Animada Singularmente */}
        <div className="preloader-logo relative w-[300px] md:w-[450px]">
          
          {/* SVG Oficial Aeropolimento puramente Monochrome White (Full Impact) */}
          <svg viewBox="0 0 1000.2 232.96" className="w-full h-auto overflow-visible drop-shadow-2xl" fill="#ffffff">
            <g>
              <path d="M186.81,91.24h16.55l26.57,49.34h-15.03l-4.57-8.82h-31.33l-4.57,8.82h-14.21l26.57-49.34ZM204.82,121.11l-10.15-19.53-10.15,19.53h20.29Z"/>
              <path d="M235.19,91.24h52.19v10.53h-39.38v8.62h37.29v10.15h-37.29v9.51h40.21v10.53h-53.02v-49.34Z"/>
              <path d="M297.08,91.24h36.15c16.11,0,20.93,4.31,20.93,15.35,0,7.42-2.16,11.48-8.24,13.38v.25c6.79,1.08,8.31,3.17,8.31,11.79v8.56h-12.81v-6.66c0-6.4-1.08-8.81-10.4-8.81h-21.12v15.47h-12.81v-49.34ZM331.96,114.64c7.23,0,9.45-1.27,9.45-6.4s-2.16-6.47-9.51-6.47h-22.01v12.87h22.07Z"/>
              <path d="M362.33,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM395.05,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z"/>
              <path d="M436.78,91.24h33.93c17.38,0,22.45,4.31,22.45,17.95s-5.07,17.95-22.45,17.95h-21.12v13.44h-12.81v-49.34ZM470.14,116.61c7.86,0,10.34-1.46,10.34-7.42s-2.47-7.42-10.34-7.42h-20.55v14.84h20.55Z"/>
              <path d="M499.56,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM532.28,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z"/>
              <path d="M574,91.24h12.87v38.62h35.96v10.72h-48.83v-49.34Z"/>
              <path d="M629.68,91.24h12.87v49.34h-12.87v-49.34Z"/>
              <path d="M652.82,91.24h20.1l19.53,36.78h.06l19.53-36.78h19.72v49.34h-12.68v-37.61h-.13l-19.98,37.61h-13.51l-19.85-37.61h-.13v37.61h-12.68v-49.34Z"/>
              <path d="M742.04,91.24h52.19v10.53h-39.38v8.62h37.29v10.15h-37.29v9.51h40.21v10.53h-53.02v-49.34Z"/>
              <path d="M803.93,91.24h18.71l31.2,37.35h.13v-37.35h12.62v49.34h-18.39l-31.45-37.61h-.13v37.61h-12.68v-49.34Z"/>
              <path d="M895.82,101.96h-22.39v-10.72h57.71v10.72h-22.39l-.06,38.62h-12.87v-38.62Z"/>
              <path d="M934.69,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM967.41,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z"/>
            </g>
            
            <polygon points="127.91 116.48 27.03 217.36 0 232.96 7 217.36 52.28 116.48 7 15.6 0 0 27.03 15.6 127.91 116.48"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
