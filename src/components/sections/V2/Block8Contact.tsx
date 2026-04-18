"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Block8Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'contato' | 'revendedor'>('contato');

  useGSAP(() => {
    gsap.from(".contact-card", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  const tabAnim = (tab: 'contato' | 'revendedor') => {
      setActiveTab(tab);
      gsap.fromTo('.form-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <section ref={container} id="contato" className="relative w-full py-24 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tabs Desktop & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-8">Como podemos ajudar?</h2>
            <div className="inline-flex bg-white p-2 rounded-xl shadow-sm border border-zinc-200">
                <button 
                    onClick={() => tabAnim('contato')} 
                    className={`px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'contato' ? 'bg-red-700 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    Fale com Vendas
                </button>
                <button 
                    onClick={() => tabAnim('revendedor')} 
                    className={`px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'revendedor' ? 'bg-red-700 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    Seja Revendedor
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start form-content">
            
            {/* Esquerda: Forms */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100 contact-card">
                <h3 className="text-3xl font-bold mb-8">
                    {activeTab === 'contato' ? 'Envie sua mensagem' : 'Aplicação para Distribuidores'}
                </h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Nome completo/Empresa" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors" required />
                        <input type="email" placeholder="E-mail" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors" required />
                    </div>
                    {activeTab === 'revendedor' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="CNPJ" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors" required />
                            <input type="text" placeholder="Região de Atuação" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors" required />
                        </div>
                    )}
                    <input type="tel" placeholder="WhatsApp / Telefone" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors" required />
                    <textarea placeholder={activeTab === 'contato' ? "Em que podemos ajudar sua operação?" : "Por que deseja revender Aerocare?"} className="w-full h-40 bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 outline-none focus:border-red-500 transition-colors resize-none" required></textarea>
                    <button type="submit" className="w-full bg-zinc-900 hover:bg-red-700 text-white font-bold py-5 rounded-xl uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                        {activeTab === 'contato' ? 'Enviar Mensagem' : 'Submeter Cadastro de Revenda'}
                    </button>
                </form>
            </div>

            {/* Direita: Infos Rápidas */}
            <div className="lg:col-span-2 space-y-8 contact-card">
                <div className="p-8 bg-zinc-100/50 border border-zinc-200/50 rounded-3xl">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-red-700 mb-6">Atendimento Rápido</h4>
                    <div className="space-y-6">
                        <a href="https://wa.me/5531989477030" className="flex items-center group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-sm group-hover:text-red-600 transition-colors">
                                <Phone className="w-5 h-5" />
                            </div>
                            <span className="ml-4 font-medium text-lg text-zinc-700 group-hover:text-zinc-900 transition-colors">+55 31 9894-77030</span>
                        </a>
                        <a href="mailto:contato@aeropolimento.com.br" className="flex items-center group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-sm group-hover:text-red-600 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="ml-4 font-medium text-lg text-zinc-700 group-hover:text-zinc-900 transition-colors">vendas@aeropolimento.com</span>
                        </a>
                        <div className="flex items-center group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-sm">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="ml-4 font-medium text-lg text-zinc-700">Brasil • Homologado ANAC</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
