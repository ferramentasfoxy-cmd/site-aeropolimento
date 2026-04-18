"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Block7Blog() {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    // Stagger cards
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Form element
    if (formRef.current) {
        gsap.from(formRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 90%",
            }
        })
    }

  }, { scope: container });

  const posts = [
    { title: "A importância da homologação ANAC em químicos de aviação", date: "12 Mar 2026", cat: "Técnico" },
    { title: "Como o clearcoat sofre com agentes externos na pista", date: "05 Fev 2026", cat: "Preservação" },
    { title: "Polimento versus Espelhamento: Diferenças estruturais", date: "28 Jan 2026", cat: "Manutenção" },
  ];

  return (
    <section ref={container} className="relative w-full py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
               <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">Conteúdo Exclusivo</h2>
               <p className="text-lg text-zinc-500 mt-4 max-w-xl">Artigos técnicos, manuais de aplicação e insights sobre conservação de aeronaves direto de nossos químicos.</p>
            </div>
            <a href="#blog" className="hidden md:flex items-center text-red-600 font-bold hover:text-red-800 transition-colors uppercase tracking-widest text-sm mt-8">
                Ver todos os artigos <ArrowRight className="w-4 h-4 ml-2" />
            </a>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {posts.map((post, idx) => (
            <a key={idx} href={`#post-${idx}`} className="group block bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100 hover:border-red-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/5">
              <div className="aspect-[4/3] bg-zinc-200 rounded-xl mb-6 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop" className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-105" alt={post.title} />
                 <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">{post.cat}</span>
              </div>
              <span className="text-zinc-400 text-sm font-medium">{post.date}</span>
              <h3 className="text-xl font-bold text-zinc-900 mt-3 leading-snug group-hover:text-red-700 transition-colors">{post.title}</h3>
            </a>
          ))}
        </div>
        <a href="#blog" className="md:hidden flex items-center justify-center text-red-600 font-bold hover:text-red-800 transition-colors uppercase tracking-widest text-sm mb-16">
            Ver todos os artigos <ArrowRight className="w-4 h-4 ml-2" />
        </a>

        {/* Newsletter Section */}
        <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-xl z-10 relative">
                <span className="flex items-center text-red-400 font-bold uppercase tracking-widest text-sm mb-4"><Mail className="w-5 h-5 mr-3" /> Technical Newsletter</span>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">Mantenha sua oficina técnica atualizada.</h3>
            </div>

            <form ref={formRef} className="w-full max-w-md z-10 relative flex flex-col gap-4">
                <input 
                    type="email" 
                    placeholder="Seu melhor e-mail comercial" 
                    className="w-full bg-white/10 hover:bg-white/20 focus:bg-white/20 border border-white/5 focus:border-red-500/50 rounded-xl px-6 py-5 outline-none text-white transition-all backdrop-blur-md placeholder:text-zinc-500"
                    required
                />
                <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-5 rounded-xl transition-transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(220,38,38,0.3)]">
                    Inscrever-se
                </button>
            </form>
        </div>

      </div>
    </section>
  );
}
