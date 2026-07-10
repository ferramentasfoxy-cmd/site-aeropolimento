"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";
import { TechBackground } from "@/components/ui/TechBackground";
import { getArticles } from "@/content/blog";

export function BlogSection() {
  const { t, locale } = useT();
  // Home destaca os 3 primeiros artigos; a página /blog lista todos.
  const posts = getArticles(locale).slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".blog-header", { y: 0, opacity: 1 });
        gsap.set(".blog-card", { y: 0, opacity: 1 });
        return;
      }
      // 1. Reveal do Header — duration (1s) + ease power3.out custom; start "top 80%" custom.
      gsap.from(".blog-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-header",
          start: "top 80%",
        }
      });

      // 2. Stagger Cards — duration (1s) + power2.out custom. start herda de defaults ("top 85%").
      gsap.fromTo(".blog-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-grid",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="blog" className="relative w-full bg-[var(--color-surface-subtle)] py-24 md:py-32 overflow-hidden z-20">
      <TechBackground />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="blog-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{t.blog.label}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[var(--color-text-primary)]">
              {t.blog.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.blog.subtitle}
            </p>
          </div>

          <Link href="/blog/" className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-300 text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white transition-all duration-300 rounded-sm">
            {t.blog.viewAll}
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Grid de Cards (Blog Posts) */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="blog-card group cursor-pointer bg-white border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 rounded-sm overflow-hidden">
              {/* Box da Imagem — aspect 16:9 fixo: as capas são desenhadas em
                  1600×900 com marca nas bordas; usar altura fixa recortava ~12%
                  de cada lado no mobile (cortava o wordmark e o número). */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">
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
              
              {/* Corpo de Texto */}
              <div className="p-8 flex flex-col flex-grow relative">
                <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3 block">{post.date}</span>
                <h3 className="font-display text-xl md:text-2xl font-medium text-[var(--color-text-primary)] leading-snug mb-4 group-hover:text-aero-red transition-colors">{post.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                {/* Micro CTA / Barra Animada */}
                <div className="mt-8 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-aero-red overflow-hidden pt-4 border-t border-gray-100">
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{t.blog.readArticle}</span>
                  <svg className="w-4 h-4 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                
                {/* Linha Fina em baixo - Branding effect */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-aero-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
