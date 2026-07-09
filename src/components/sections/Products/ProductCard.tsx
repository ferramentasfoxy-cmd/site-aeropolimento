'use client';
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/LanguageProvider";
import { Product3D } from "./Product3D";

interface Spec {
  label: string;
  value: string;
}

interface ProductCardProps {
  /** Código de peça (ex.: AP-001) — eyebrow estrutural da ficha. */
  code: string;
  title: string;
  /** Frase de abertura, forte e curta. */
  lead: string;
  /** Linhas da placa de dados técnica. */
  specs: Spec[];
  imageSrc: string;
  /** GLB do produto. Quando presente, o frasco é renderizado em 3D (fallback PNG via imageSrc). */
  modelSrc?: string;
  reverse?: boolean;
}

export function ProductCard({ code, title, lead, specs, imageSrc, modelSrc, reverse }: ProductCardProps) {
  const { t } = useT();
  const mainTitle = title.includes("—") ? title.split("—")[0].trim() : title;
  const subTitle = title.includes("—") ? title.split("—")[1].trim() : "";

  return (
    <div className="conteudo-grid">

      {/* ── LADO A: Palco visual do produto ── */}
      <div className={cn(
        "imagem-produto relative w-full h-full min-h-[38vh] md:min-h-full flex items-center justify-center p-4 md:p-8 overflow-visible will-change-transform z-10",
        reverse ? "md:order-2" : "md:order-1"
      )}>
        {/* Único acento técnico: marca de registro (crosshair) no canto */}
        <div className="absolute top-[9%] left-[7%] text-gray-300 pointer-events-none" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
            <circle cx="12" cy="12" r="5.5" />
            <line x1="12" y1="0" x2="12" y2="24" />
            <line x1="0" y1="12" x2="24" y2="12" />
          </svg>
        </div>

        {/* Frasco — 3D (traz a própria sombra de contato) ou imagem PNG */}
        {modelSrc ? (
          <div className="relative w-full h-full min-h-[48vh] md:min-h-[70vh] z-10">
            <Product3D modelSrc={modelSrc} fallbackSrc={imageSrc} alt={mainTitle} />
          </div>
        ) : (
          <>
            <div
              className="relative w-full max-w-[340px] lg:max-w-[420px] aspect-[4/5] z-10"
              style={{ animation: "hoverBottle 5s ease-in-out infinite" }}
            >
              <Image
                src={imageSrc}
                fill
                alt={mainTitle}
                sizes="(max-width: 768px) 80vw, (max-width: 1280px) 45vw, 420px"
                className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.16)]"
                priority={false}
              />
            </div>
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[60%] h-[24px] bg-black/10 blur-[18px] rounded-full pointer-events-none" />
          </>
        )}
      </div>

      {/* ── LADO B: Ficha técnica ── */}
      <div className={cn(
        "flex flex-col items-center md:items-start text-center md:text-left z-20 w-full h-full justify-center px-4 md:px-0",
        reverse ? "md:order-1 lg:pr-10" : "md:order-2 lg:pl-10"
      )}>
        <div className="w-full max-w-[460px] mx-auto md:mx-0">

          {/* Eyebrow: código de peça */}
          <div className="titulo flex items-center justify-center md:justify-start gap-3 mb-6 font-mono text-[11px] tracking-[0.22em] uppercase">
            <span className="text-[var(--color-text-primary)] font-bold">{code}</span>
            <span className="w-px h-3 bg-gray-300" aria-hidden="true" />
            <span className="text-gray-400">Aerocare</span>
          </div>

          {/* Nome do produto */}
          <h3 className="titulo font-display text-[2.5rem] md:text-5xl lg:text-[4rem] font-bold text-[var(--color-text-primary)] tracking-tighter leading-[0.9] uppercase">
            {mainTitle}
          </h3>
          {subTitle && (
            <span className="titulo block text-aero-red font-mono text-[0.8rem] md:text-sm tracking-[0.25em] uppercase mt-3">
              {subTitle}
            </span>
          )}

          {/* Lead */}
          <p className="descricao text-[var(--color-text-primary)] font-display font-semibold text-lg lg:text-xl tracking-tight leading-snug mt-7 mb-9 mx-auto md:mx-0 max-w-[420px]">
            {lead}
          </p>

          {/* Grid de especificações — a placa de dados */}
          <dl className="descricao w-full border-t border-gray-200/90 text-left">
            {specs.map((spec, i) => {
              const isConformity = /conform|complian/i.test(spec.label);
              return (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-6 py-3.5 border-b border-gray-200/90"
                >
                  <dt className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-gray-400 shrink-0 pt-0.5">
                    {spec.label}
                  </dt>
                  <dd className="text-[0.9rem] md:text-[0.95rem] font-medium text-[var(--color-text-primary)] text-right leading-snug">
                    {isConformity ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="font-mono font-semibold tracking-wide">{spec.value}</span>
                        <svg className="w-4 h-4 text-green-600 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      spec.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* CTA */}
          <button
            type="button"
            className="descricao relative group overflow-hidden inline-flex items-center gap-3 mt-10 border border-gray-300 bg-transparent py-3.5 px-7 transition-colors duration-300 hover:border-aero-red mx-auto md:mx-0"
          >
            <span className="font-bold text-[13px] tracking-[0.12em] text-[var(--color-text-primary)] group-hover:text-white uppercase z-10 transition-colors duration-300">
              {t.products.datasheet}
            </span>
            <span className="font-mono text-[var(--color-text-primary)] group-hover:text-white z-10 group-hover:translate-x-1.5 transition-all duration-300">
              →
            </span>
            <div className="absolute inset-0 bg-aero-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          </button>

        </div>
      </div>

      <style>{`
        @keyframes hoverBottle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}
