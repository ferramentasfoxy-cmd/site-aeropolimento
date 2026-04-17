'use client';
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  badge?: string;
  reverse?: boolean;
}

export function ProductCard({ title, description, imageSrc, badge, reverse }: ProductCardProps) {
  const mainTitle = title.includes("—") ? title.split("—")[0].trim() : title;
  const subTitle = title.includes("—") ? title.split("—")[1].trim() : "";

  return (
    <div className="conteudo-grid">
      
      {/* ── LADO A: Palco Visual do Produto ── */}
      <div className={cn(
        "imagem-produto relative w-full h-full min-h-[40vh] md:min-h-full flex items-center justify-center p-8 overflow-visible will-change-transform z-10",
        reverse ? "md:order-2" : "md:order-1"
      )}>
        {/* Decoração: Flight Path SVG Opcional */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-[0.15]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={reverse ? "M 110,-10 Q 50,50 -10,90" : "M -10,-10 Q 50,50 110,90"}
            fill="none"
            stroke="#171717"
            strokeWidth="0.3"
            strokeDasharray="2 4"
          />
        </svg>

        {/* Decoração: Altímetro giratório */}
        <div
          className="absolute top-[10%] right-[10%] w-12 h-12 border-[0.5px] border-gray-300 rounded-full flex items-center justify-center opacity-30 pointer-events-none"
          style={{ animation: "slowSpin 30s linear infinite" }}
          aria-hidden="true"
        >
          <div className="absolute w-px h-full bg-gray-300" />
          <div className="absolute h-px w-full bg-gray-300" />
          <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full" />
        </div>

        {/* Garrafa — imagem principal */}
        <div
          className="relative w-full max-w-[340px] lg:max-w-[420px] aspect-[4/5] z-10 transition-transform duration-[1200ms] hover:scale-[1.04]"
          style={{ animation: "hoverBottle 5s ease-in-out infinite" }}
        >
          <Image
            src={imageSrc}
            fill
            alt={mainTitle}
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 45vw, 420px"
            className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.16)] transition-all duration-[1200ms]"
            priority={false}
          />
        </div>

        {/* Sombra de chão */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[60%] h-[24px] bg-black/10 blur-[18px] rounded-full pointer-events-none" />
      </div>

      {/* ── LADO B: Copy e CTA ── */}
      <div className={cn(
        "flex flex-col items-center md:items-start text-center md:text-left z-20 w-full h-full justify-center px-4 md:px-0",
        reverse ? "md:order-1 lg:pr-8" : "md:order-2 lg:pl-8"
      )}>
        
        {badge && (
          <div className="titulo flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full mb-8 w-fit mx-auto md:mx-0">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-[11px] uppercase font-mono font-bold text-green-700 tracking-widest">{badge}</span>
          </div>
        )}

        <h3 className="titulo font-display text-[2.5rem] md:text-5xl lg:text-[4.2rem] font-bold text-[#171717] tracking-tighter mb-8 uppercase leading-[0.92]">
          {mainTitle}
          {subTitle && (
            <>
              <br />
              <span className="text-[#bd1622] text-[0.45em] tracking-widest font-mono opacity-80 mt-3 block">
                {subTitle}
              </span>
            </>
          )}
        </h3>

        <div className="titulo w-12 h-1 bg-[#171717] mb-8 mx-auto md:mx-0" />

        <p className="descricao text-gray-500 text-base md:text-lg leading-[1.8] font-medium mb-12 max-w-[500px] text-balance mx-auto md:mx-0">
          {description}
        </p>

        <button
          className="descricao relative group overflow-hidden flex items-center justify-between w-full max-w-[280px] border border-gray-300 bg-transparent py-4 px-8 transition-all duration-300 hover:border-[#bd1622] mx-auto md:mx-0"
        >
          <span className="font-bold text-sm tracking-[0.1em] text-[#171717] group-hover:text-white uppercase z-10 transition-colors duration-300">
            Saiba Mais
          </span>
          <span className="font-mono text-[#171717] group-hover:text-white z-10 group-hover:translate-x-2 transition-all duration-300">
            →
          </span>
          <div className="absolute inset-0 bg-[#bd1622] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
        </button>
      </div>

      <style>{`
        @keyframes hoverBottle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
