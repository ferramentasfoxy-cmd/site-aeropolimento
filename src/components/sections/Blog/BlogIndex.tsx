"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";
import { TechBackground } from "@/components/ui/TechBackground";
import { getArticles } from "@/content/blog";

// Página /blog — listagem completa de artigos. Mesmo padrão visual da
// seção de blog da home (cards), com um cabeçalho editorial próprio.
export function BlogIndex() {
  const { t, locale } = useT();
  const articles = getArticles(locale);

  return (
    <section className="relative w-full bg-[var(--color-surface-subtle)] pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <TechBackground />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Cabeçalho editorial */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
            <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{t.blog.label}</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium tracking-tight leading-[1.05] mb-6 text-[var(--color-text-primary)] text-balance">
            {t.blog.title}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-pretty">{t.blog.subtitle}</p>
        </header>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group cursor-pointer bg-white border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-sm overflow-hidden"
            >
              <div className="relative w-full h-[220px] overflow-hidden bg-gray-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-text-primary)] text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest z-10 rounded-sm">
                  {post.tag}
                </div>
              </div>

              <div className="p-7 md:p-8 flex flex-col flex-grow relative">
                <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                  {post.date}
                  <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
                  {post.readingTime}
                </span>
                <h2 className="font-display text-xl md:text-2xl font-medium text-[var(--color-text-primary)] leading-snug mb-4 group-hover:text-aero-red transition-colors text-balance">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow text-pretty">{post.excerpt}</p>

                <div className="mt-8 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-aero-red overflow-hidden pt-4 border-t border-gray-100">
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{t.blog.readArticle}</span>
                  <svg className="w-4 h-4 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-aero-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
