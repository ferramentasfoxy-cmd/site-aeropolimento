"use client";

import * as React from "react";
import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";
import { Product3D } from "./Product3D";
import { getProduct, getProducts } from "@/content/products";

export function ProductView({ slug }: { slug: string }) {
  const { t, locale } = useT();
  const product = getProduct(locale, slug);

  if (!product) {
    return (
      <section className="pt-40 pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-6">404</p>
        <Link href="/#produtos" className="text-aero-red font-bold uppercase tracking-widest text-sm hover:underline">
          {t.products.backToProducts}
        </Link>
      </section>
    );
  }

  const related = getProducts(locale).filter((p) => p.slug !== slug);

  return (
    <div className="relative w-full bg-[var(--color-surface-base)] pt-28 md:pt-32 pb-24 md:pb-28 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Voltar */}
        <Link
          href="/#produtos"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500 hover:text-aero-red transition-colors mb-10"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {t.products.backToProducts}
        </Link>

        {/* Hero split: 3D + ficha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 md:mb-24">
          {/* Palco 3D */}
          <div className="relative w-full min-h-[52vh] md:min-h-[70vh] flex items-center justify-center order-1">
            <div className="absolute top-2 left-2 z-10 flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full px-3 py-1">
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-gray-700">{t.products.model3dBadge}</span>
            </div>
            {/* Enquadramento "hero" de produto: câmera mais próxima (objeto maior),
                canvas mais alto e alvo mais centralizado que a home. */}
            <Product3D
              modelSrc={product.model}
              fallbackSrc={product.image}
              alt={product.name}
              cameraZ={5.6}
              targetY={-0.05}
              heightClass="min-h-[52vh] md:min-h-[70vh]"
            />
          </div>

          {/* Ficha */}
          <div className="order-2">
            <div className="flex items-center gap-3 mb-6 font-mono text-[11px] tracking-[0.22em] uppercase">
              <span className="text-aero-red font-bold">{product.code}</span>
              <span className="w-px h-3 bg-gray-300" aria-hidden="true" />
              <span className="text-gray-400">Aerocare</span>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold tracking-tighter leading-[0.95] uppercase text-[var(--color-text-primary)] text-balance">
              {product.name}
            </h1>
            <p className="text-aero-red font-mono text-sm tracking-[0.15em] uppercase mt-4">{product.tagline}</p>

            <div className="inline-flex items-center gap-2 mt-6 border border-gray-200 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-gray-700">{t.products.badgeApproved}</span>
            </div>

            <p className="text-[var(--color-text-primary)] font-display font-semibold text-xl lg:text-2xl tracking-tight leading-snug mt-8 max-w-[460px] text-pretty">
              {product.intro}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/#contato"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-text-primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-aero-red transition-colors rounded-sm"
              >
                {t.products.ctaQuote}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a
                href="https://wa.me/5531989477030"
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-widest hover:border-aero-red hover:text-aero-red transition-colors rounded-sm"
              >
                {t.contact.whatsappLabel}
              </a>
            </div>
          </div>
        </div>

        {/* Destaques + Especificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
          <section>
            <SectionLabel>{t.products.highlightsTitle}</SectionLabel>
            <ul className="space-y-4">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-aero-red shrink-0" aria-hidden="true" />
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel>{t.products.specsTitle}</SectionLabel>
            <dl className="border-t border-gray-200/90">
              {product.specs.map((s, i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 py-3.5 border-b border-gray-200/90">
                  <dt className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-gray-400 shrink-0 pt-0.5">{s.label}</dt>
                  <dd className="text-[0.9rem] md:text-[0.95rem] font-medium text-[var(--color-text-primary)] text-right leading-snug">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Sequência de aplicação (APC) */}
        {product.sequences && product.sequences.length > 0 && (
          <section className="mb-16 md:mb-20">
            <SectionLabel>{t.products.sequenceTitle}</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.sequences.map((seq, i) => (
                <div key={i}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-3">{seq.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {seq.items.map((it, j) => (
                      <span key={j} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-sm text-xs md:text-sm text-gray-700">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recomendações (Cera) */}
        {product.recommendations && product.recommendations.length > 0 && (
          <section className="mb-16 md:mb-20">
            <SectionLabel>{t.products.recommendationsTitle}</SectionLabel>
            <ul className="space-y-3 max-w-3xl">
              {product.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-base leading-relaxed">
                  <svg className="w-5 h-5 text-aero-red shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /></svg>
                  <span className="text-pretty">{r}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Aviso técnico obrigatório */}
        <div className="mb-20 md:mb-24 border-l-2 border-aero-red bg-red-50/50 pl-6 pr-6 py-5 rounded-r-sm max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-aero-red font-bold block mb-2">{t.products.noticeTitle}</span>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-pretty">{product.caveat}</p>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{t.products.relatedTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/produtos/${p.slug}/`} className="group flex items-center gap-5 bg-white border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-sm">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold text-aero-red tracking-widest">{p.code}</span>
                    <span className="font-display text-lg md:text-xl font-semibold text-[var(--color-text-primary)] tracking-tight group-hover:text-aero-red transition-colors">{p.name}</span>
                    <span className="text-gray-500 text-sm mt-1">{p.tagline}</span>
                  </div>
                  <span className="ml-auto font-mono text-gray-300 group-hover:text-aero-red group-hover:translate-x-1 transition-all duration-300">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-aero-red" aria-hidden="true" />
      <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{children}</span>
    </div>
  );
}
