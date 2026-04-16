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
    <div className={cn(
      "product-stage relative w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20",
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    )}>

      {/* ── LADO A: Palco Visual do Produto ── */}
      <div className="relative w-full md:w-[50%] lg:w-[45%] flex items-center justify-center p-8 group overflow-visible shrink-0">

        {/* Decoração: Flight Path SVG */}
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
          <div className="w-1.5 h-1.5 bg-[var(--color-aero-red)] rounded-full" />
        </div>

        {/* Decoração: Shape aerodinâmico */}
        <svg
          className="absolute bottom-[15%] left-[8%] w-7 h-7 opacity-30 pointer-events-none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ animation: "floatReverse 8s ease-in-out infinite" }}
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="none" stroke="var(--color-aero-red)" strokeWidth="0.5" />
        </svg>

        {/* Garrafa — imagem principal */}
        <div
          className="relative w-full max-w-[340px] lg:max-w-[420px] aspect-[4/5] z-10 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          style={{ animation: "hoverBottle 5s ease-in-out infinite" }}
        >
          <Image
            src={imageSrc}
            fill
            alt={mainTitle}
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 45vw, 420px"
            className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.16)] group-hover:drop-shadow-[0_55px_55px_rgba(0,0,0,0.24)] transition-all duration-[1200ms]"
            priority={false}
          />
        </div>

        {/* Sombra de chão */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[60%] h-[24px] bg-black/10 blur-[18px] rounded-full pointer-events-none" />
      </div>

      {/* ── LADO B: Copy e CTA ── */}
      <div className={cn(
        "w-full md:w-[50%] lg:w-[45%] flex flex-col items-center md:items-start text-center md:text-left",
        reverse ? "lg:pl-8" : "lg:pr-8"
      )}>

        {/* Badge Aprovado ANAC */}
        {badge && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-[11px] uppercase font-mono font-bold text-green-700 tracking-widest">{badge}</span>
          </div>
        )}

        {/* Título */}
        <h3 className="font-display text-[2.2rem] md:text-5xl lg:text-[4rem] font-bold text-[var(--color-text-primary)] tracking-tighter mb-8 uppercase leading-[0.92]">
          {mainTitle}
          {subTitle && (
            <>
              <br />
              <span className="text-[var(--color-aero-red)] text-[0.45em] tracking-widest font-mono opacity-80 mt-3 block">
                {subTitle}
              </span>
            </>
          )}
        </h3>

        {/* Divider decorativo */}
        <div className="section-divider mb-8" />

        {/* Descrição */}
        <p className="text-[var(--color-text-tertiary)] text-base md:text-lg leading-[1.8] font-medium mb-12 max-w-[500px] text-balance">
          {description}
        </p>

        {/* CTA */}
        <button
          className="relative group/btn overflow-hidden flex items-center justify-between w-full max-w-[300px] border border-[var(--color-border-default)] bg-transparent py-4 px-8 transition-all duration-300 hover:border-[var(--color-aero-red)] hover:shadow-[0_0_24px_rgba(189,22,34,0.10)]"
          aria-label={`Saiba mais sobre ${mainTitle}`}
        >
          <span className="font-bold text-sm tracking-[0.1em] text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-aero-red)] uppercase z-10 transition-colors duration-300">
            Saiba Mais
          </span>
          <span className="font-mono text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-aero-red)] z-10 group-hover/btn:translate-x-2 transition-all duration-300">
            →
          </span>
          <div className="absolute inset-0 bg-[var(--color-aero-red-light)] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-out z-0" />
        </button>
      </div>

      {/* Keyframes inline — necessário pois ProductCard é renderizado fora do globals.css scope */}
      <style>{`
        @keyframes hoverBottle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(12px) rotate(-4deg) scale(1.04); }
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
