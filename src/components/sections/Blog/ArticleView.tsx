"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";
import { getArticle, getArticles, type ArticleBlock } from "@/content/blog";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mt-12 mb-5 text-balance">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-lg leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-aero-red shrink-0" aria-hidden="true" />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-aero-red pl-6 md:pl-8">
          <p className="font-display text-xl md:text-2xl font-medium italic text-[var(--color-text-primary)] leading-snug text-balance">
            {block.text}
          </p>
        </blockquote>
      );
    default:
      return <p className="my-6 text-gray-700 text-lg leading-[1.8] text-pretty">{block.text}</p>;
  }
}

export function ArticleView({ slug }: { slug: string }) {
  const { t, locale } = useT();
  const article = getArticle(locale, slug);

  if (!article) {
    return (
      <section className="pt-40 pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-6">404</p>
        <Link href="/blog/" className="text-aero-red font-bold uppercase tracking-widest text-sm hover:underline">
          {t.blog.backLabel}
        </Link>
      </section>
    );
  }

  const related = getArticles(locale).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article className="relative w-full bg-[var(--color-surface-subtle)] pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="w-full max-w-[760px] mx-auto px-6 md:px-8">
        {/* Voltar */}
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500 hover:text-aero-red transition-colors mb-10"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {t.blog.backLabel}
        </Link>

        {/* Cabeçalho */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
            <span className="text-aero-red font-bold">{article.tag}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
            <span>{article.readingTime}</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight leading-[1.05] text-[var(--color-text-primary)] text-balance">
            {article.title}
          </h1>
        </header>
      </div>

      {/* Imagem hero */}
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-8 mb-12">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-gray-200">
          <Image src={article.image} alt={article.title} fill sizes="(max-width: 1000px) 100vw, 1000px" className="object-cover" priority />
        </div>
      </div>

      {/* Corpo */}
      <div className="w-full max-w-[760px] mx-auto px-6 md:px-8">
        <div className="text-lg">
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA institucional (nunca serviço) */}
        <div className="mt-16 p-8 md:p-10 bg-[var(--color-text-primary)] text-white rounded-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(189,22,34,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-aero-red font-bold mb-3">Linha AEROCARE</p>
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6 max-w-lg text-balance">
              Produtos químicos homologados para estética aeronáutica.
            </h3>
            <Link
              href="/#produtos"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-aero-red text-white font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-colors duration-300 rounded-sm"
            >
              Conheça Nossos Produtos
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
            <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{t.blog.relatedLabel}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="group flex flex-col bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-sm overflow-hidden">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 font-mono text-[9px] uppercase tracking-widest mb-2">{post.tag}</span>
                  <h4 className="font-display text-lg font-medium text-[var(--color-text-primary)] leading-snug group-hover:text-aero-red transition-colors text-balance">{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
