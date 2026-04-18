"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const posts = [
  {
    id: 1,
    tag: "Artigo Técnico",
    date: "15 de Abril, 2026",
    title: "A evolução dos selantes cerâmicos na aviação executiva",
    excerpt: "Descubra como as nanopartículas de SiO2 protegem bordos de ataque contra atrito extremo e degradação em velocidades transônicas.",
    image: "https://images.unsplash.com/photo-1544015759-247ab1889072?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    tag: "Normalização",
    date: "22 de Março, 2026",
    title: "O que exige a certificação aeronáutica na prática?",
    excerpt: "Um mergulho nas entrelinhas dos testes de degradação estrutural e por que hangares de alta exigência demandam esse rigor técnico.",
    image: "https://images.unsplash.com/photo-1559091605-e99d8d69784e?q=80&w=2755&auto=format&fit=crop"
  },
  {
    id: 3,
    tag: "Estudos de Caso",
    date: "05 de Fevereiro, 2026",
    title: "Radomes: Integridade protetora dos equipamentos",
    excerpt: "Análise analítica de abrasão e correção: garantindo segurança absoluta no nariz da aeronave sem interferir em sinais de radar meteorológico.",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2670&auto=format&fit=crop"
  }
];

export function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal do Header (Título)
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

      // 2. Stagger Cards (Grid)
      gsap.from(".blog-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 75%",
        }
      });

      // 3. Reveal da Newsletter Strip
      gsap.from(".newsletter-strip", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".newsletter-strip",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Insira um endereço de e-mail corporativo válido.");
      return;
    }
    setEmailError("");
    setIsSubscribed(true);
    
    // Feedback visual animado no form
    gsap.fromTo('.subs-feedback', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });
  };

  return (
    <section ref={containerRef} id="blog" className="relative w-full bg-[#fafafa] py-24 md:py-32 overflow-hidden z-20">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="blog-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full" />
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">Inteligência Estratégica</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#111]">
              Conteúdo Exclusivo.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Manuais de protocolo, análises de mercado de insumos, regulamentações químicas e white papers técnicos. Direto dos laboratórios para seu hangar.
            </p>
          </div>
          
          <a href="#" className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-300 text-sm font-bold uppercase tracking-widest text-[#111] hover:bg-[#111] hover:text-white transition-all duration-300 rounded-sm">
            Ver Todos
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* Grid de Cards (Blog Posts) */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-24">
          {posts.map((post) => (
            <article key={post.id} className="blog-card group cursor-pointer bg-white border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 rounded-sm overflow-hidden">
              {/* Box da Imagem */}
              <div className="relative w-full h-[240px] overflow-hidden bg-gray-200">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#111] text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest z-10 rounded-sm">
                  {post.tag}
                </div>
              </div>
              
              {/* Corpo de Texto */}
              <div className="p-8 flex flex-col flex-grow relative">
                <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3 block">{post.date}</span>
                <h3 className="font-display text-xl md:text-2xl font-medium text-[#111] leading-snug mb-4 group-hover:text-[#bd1622] transition-colors">{post.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                {/* Micro CTA / Barra Animada */}
                <div className="mt-8 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-[#bd1622] overflow-hidden pt-4 border-t border-gray-100">
                  <span className="group-hover:translate-x-2 transition-transform duration-300">Ler artigo completo</span>
                  <svg className="w-4 h-4 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                
                {/* Linha Fina em baixo - Branding effect */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#bd1622] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Strip Modular */}
        <div className="newsletter-strip relative bg-[#080a0e] text-white py-14 px-8 md:px-16 rounded-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
           {/* Grafismo de Fundo Premium */}
           <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(189,22,34,0.15)_0%,transparent_70%)] pointer-events-none" />
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:10px_10px] opacity-10 pointer-events-none" />
           
           <div className="relative z-10 max-w-xl">
             <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">Newsletter <span className="text-[#bd1622] font-black">PRO</span></h3>
             <p className="text-gray-400 text-sm md:text-base">Informações regulatórias, novas químicas e protocolos ANAC mensais enviados aos executivos autorizados.</p>
           </div>
           
           <div className="relative z-10 w-full lg:w-auto flex-grow max-w-lg">
             {!isSubscribed ? (
               <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                 <div className="w-full relative">
                   <input 
                     type="text" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Insira seu e-mail corporativo" 
                     className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs md:text-sm focus:outline-none focus:border-[#bd1622] transition-colors rounded-sm"
                   />
                   {emailError && <span className="absolute -bottom-6 left-1 text-[10px] text-red-500 font-mono">{emailError}</span>}
                 </div>
                 <button 
                   type="submit" 
                   className="whitespace-nowrap px-8 py-4 bg-[#bd1622] text-white font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-colors duration-300 rounded-sm"
                 >
                   Inscrever-se
                 </button>
               </form>
             ) : (
               <div className="subs-feedback w-full flex items-center justify-center gap-3 px-5 py-4 bg-green-900/20 border border-green-500/30 rounded-sm">
                 <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                 <span className="font-mono text-xs uppercase tracking-widest text-green-400 font-bold">Inscrição Validada</span>
               </div>
             )}
           </div>
        </div>

      </div>
    </section>
  );
}
