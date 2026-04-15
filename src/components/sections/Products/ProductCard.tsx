import * as React from "react";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  badge?: string;
  reverse?: boolean;
}

export function ProductCard({ title, description, imageSrc, badge, reverse }: ProductCardProps) {
  // Extração do Nome principal para o H3 (Quebrando o texto na "—" para subtitulo)
  const mainTitle = title.includes("—") ? title.split("—")[0].trim() : title;
  const subTitle = title.includes("—") ? title.split("—")[1].trim() : "";

  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(15px) rotate(-5deg) scale(1.05); }
        }
        @keyframes hoverBottle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -100; }
        }
        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className={`product-stage relative w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* LADO A: O Palco da Garrafa e Efeitos Aeronáuticos Minimalistas */}
        <div className="relative w-full md:w-[50%] lg:w-[45%] flex items-center justify-center p-8 group overflow-visible">
            
            {/* Decorações Aeronáuticas B2B (Minimalistas, Vermelho/Cinza/Preto) */}
            
            {/* 1. Flight Path (Traço de Rota Aérea / Aerodinâmica) */}
            <svg className="absolute top-[5%] left-0 w-full h-full overflow-visible pointer-events-none opacity-20" viewBox="0 0 100 100" style={{ animation: 'floatSlow 12s ease-in-out infinite' }}>
              <path 
                d={reverse ? "M 110,-10 Q 50,50 -10,90" : "M -10,-10 Q 50,50 110,90"} 
                fill="none" 
                stroke="#171717" 
                strokeWidth="0.3" 
                strokeDasharray="2 4" 
                style={{ animation: 'dashMove 25s linear infinite' }} 
              />
            </svg>

            {/* 2. Altímetro Minimalista / Turbina Crosshair */}
            <div className="absolute top-[15%] right-[15%] w-14 h-14 border-[0.5px] border-gray-300 rounded-full flex items-center justify-center opacity-40 mix-blend-multiply" style={{ animation: 'slowSpin 30s linear infinite' }}>
              <div className="w-[0.5px] h-full bg-gray-300 absolute" />
              <div className="w-full h-[0.5px] bg-gray-300 absolute" />
              {/* Central Red Dot */}
              <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full absolute" />
              {/* Outer Alignment Marks */}
              <div className="w-full h-[0.5px] bg-[#bd1622] absolute top-0 transform -translate-y-1/2 w-2 left-1/2 -translate-x-1/2" />
            </div>

            {/* 3. Shape Aerodinâmico / Compasso */}
            <svg className="absolute bottom-[20%] left-[10%] w-8 h-8 opacity-40 mix-blend-multiply" viewBox="0 0 24 24" style={{ animation: 'floatReverse 8s ease-in-out infinite' }}>
               <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="none" stroke="#bd1622" strokeWidth="0.5" />
            </svg>

            {/* 4. Dots de Calibração (Grid Elements) */}
            <div className="absolute top-[60%] left-[85%] flex gap-1.5 opacity-30" style={{ animation: 'floatSlow 9s ease-in-out infinite' }}>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="w-[12px] h-1 bg-[#bd1622] rounded-full" />
            </div>

            {/* A Garrafa Gigante */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] z-10 transition-transform duration-[1200ms] group-hover:scale-105" style={{ animation: 'hoverBottle 4s ease-in-out infinite' }}>
                 <Image 
                    src={imageSrc} 
                    fill 
                    alt={title} 
                    className="object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.18)] group-hover:drop-shadow-[0_55px_55px_rgba(0,0,0,0.25)] transition-all duration-[1200ms]" 
                 />
            </div>
            
            {/* Sombra de Aterramento Sob o Frasco */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[30px] bg-black/15 blur-[20px] rounded-[100%] transition-opacity duration-700 group-hover:w-[60%] group-hover:opacity-50" />
        </div>
        
        {/* LADO B: Copy e Call to Action Editorial */}
        <div className={`w-full md:w-[50%] lg:w-[45%] flex flex-col items-center md:items-start text-center md:text-left ${reverse ? 'lg:pl-10' : 'lg:pr-10'}`}>
           
           {/* Badge ANAC Técnico */}
           {badge && (
             <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full backdrop-blur-md mb-8">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[11px] uppercase font-mono font-bold text-green-700 tracking-widest">{badge}</span>
             </div>
           )}

           {/* Title Gigante estilo Vonixx */}
           <h3 className="font-display text-[2.5rem] md:text-5xl lg:text-7xl font-bold text-[#171717] tracking-tighter mb-8 uppercase leading-[0.9]">
              {mainTitle}
              {subTitle && (
                <>
                  <br />
                  <span className="text-[#bd1622] text-[0.45em] tracking-widest font-mono opacity-80 mt-4 block">{subTitle}</span>
                </>
              )}
           </h3>

           <p className="text-gray-500 text-base md:text-lg lg:text-xl leading-[1.8] font-medium mb-12 max-w-[500px] text-balance">
              {description}
           </p>
           
           {/* Botão Outlined Futurista Expansível */}
           <button className="relative group/btn overflow-hidden flex items-center justify-between w-full max-w-[320px] border border-gray-300 bg-transparent py-4 px-8 rounded-none transition-all duration-300 hover:border-[#bd1622] hover:shadow-[0_0_20px_rgba(189,22,34,0.1)]">
               <span className="font-system font-bold text-sm tracking-[0.1em] text-[#171717] group-hover/btn:text-[#bd1622] uppercase z-10 transition-colors duration-300">Saiba Mais</span>
               <span className="font-mono text-[#171717] group-hover/btn:text-[#bd1622] z-10 group-hover/btn:translate-x-3 transition-all duration-300">→</span>
               {/* Fundo Expandido */}
               <div className="absolute inset-0 bg-red-50/50 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-out z-0" />
           </button>

        </div>
      </div>
    </>
  );
}
