"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, TrendingUp, Box } from "lucide-react";

type TabState = "contato" | "revendedor";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabState>("contato");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrada da Seção
      gsap.from(".contact-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      gsap.from(".contact-panel", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-panel", start: "top 85%" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    // Simulação de delay de rede
    setTimeout(() => {
      setFormStatus("success");
      
      // Animação de Sucesso
      gsap.fromTo('.success-msg', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
      );

      if (formRef.current) formRef.current.reset();
      
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section ref={containerRef} id="contato" className="relative w-full py-24 md:py-32 bg-white flex justify-center overflow-hidden z-20">
      {/* --- CORTES TÁTICOS HUD --- */}
      <span className="corner corner--tl">
        <span><span className="dot"></span>SEC 10 / B2B OPERATIONS</span>
      </span>
      <span className="corner corner--tr">
        <span>COORDENADAS DE HUB</span>
      </span>

      <div className="w-full max-w-[1400px] px-6 md:px-12 mx-auto relative z-10">
        
        {/* Cabecalho */}
        <div className="contact-header flex flex-col items-center text-center mb-16">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 bg-[#bd1622] rounded-full" />
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">Conexão B2B</span>
           </div>
           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#111] mb-6">
             Inicie suas operações.
           </h2>
           <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
             Suporte técnico, cotações em massa ou aplicação para se tornar um distribuidor homologado da nossa linha.
           </p>
        </div>

        {/* Mega Painel Split Screen */}
        <div className="contact-panel grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] bg-[#fafafa] border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-lg overflow-hidden min-h-[600px]">
          
          {/* Aba Lateral Escura - Info */}
          <div className="bg-[#080a0e] relative text-white p-10 md:p-14 flex flex-col justify-between overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#bd1622]/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

             <div className="relative z-10 mb-16">
               <h3 className="font-display text-3xl font-medium mb-8">Base de Operações</h3>
               <ul className="space-y-8">
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <Phone className="w-4 h-4 text-[#bd1622]" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">WhatsApp Comercial</span>
                     <a href="https://wa.me/5531989477030" className="text-lg font-medium hover:text-[#bd1622] transition-colors">+55 (31) 98947-7030</a>
                   </div>
                 </li>
                 
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <Mail className="w-4 h-4 text-[#bd1622]" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Cotações e Ofícios</span>
                     <a href="mailto:contato@aeropolimento.com.br" className="text-lg font-medium hover:text-[#bd1622] transition-colors">contato@aeropolimento.com.br</a>
                   </div>
                 </li>
                 
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <MapPin className="w-4 h-4 text-[#bd1622]" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Sede Brasil</span>
                     <p className="text-lg font-medium text-gray-300">Hub Tecnológico<br/>Minas Gerais - Brasil</p>
                   </div>
                 </li>
               </ul>
             </div>

             {/* Partner Banner Lateral */}
             <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-md">
                <span className="text-sm font-bold block mb-2">Rede de Distribuidores</span>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Acesso a preços de atacado, materiais de marketing e suporte B2B prioritário.</p>
                <button 
                  onClick={() => setActiveTab("revendedor")}
                 className={`text-[10px] font-mono tracking-widest uppercase pb-1 border-b ${activeTab === 'revendedor' ? 'border-[#bd1622] text-[#bd1622]' : 'border-gray-500 text-gray-400 hover:text-white'} transition-colors inline-block`}
                >
                  Aplicar Agora
                </button>
             </div>
          </div>

          {/* Área Interativa Direita - Tabs e Forms */}
          <div className="p-10 md:p-14 bg-white flex flex-col items-start relative overflow-hidden">
             
             {/* Tab Switcher */}
             <div className="flex items-center gap-6 mb-12 border-b border-gray-200 w-full relative">
               <button 
                 onClick={() => setActiveTab("contato")}
                 className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'contato' ? 'text-[#111]' : 'text-gray-400 hover:text-[#111]'}`}
               >
                 Contato Direto
                 {activeTab === 'contato' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#bd1622]" />}
               </button>
               <button 
                 onClick={() => setActiveTab("revendedor")}
                 className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'revendedor' ? 'text-[#111]' : 'text-gray-400 hover:text-[#111]'}`}
               >
                 Seja um Revendedor
                 {activeTab === 'revendedor' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#bd1622]" />}
               </button>
             </div>

             {/* TAB: CONTATO DIRETO */}
             {activeTab === "contato" && (
               <div className="w-full h-full animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-display text-2xl font-medium mb-6">Como podemos ajudar?</h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between h-[80%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Nome ou Empresa</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] rounded-sm text-sm" placeholder="Ex: Hangar Alpha" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">E-mail Corporativo</label>
                        <input required type="email" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] rounded-sm text-sm" placeholder="seu@email.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Telefone / WhatsApp</label>
                       <input required type="tel" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] rounded-sm text-sm" placeholder="+55 (00) 00000-0000" />
                    </div>

                    <div className="space-y-2 flex-grow">
                       <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Sua Mensagem</label>
                       <textarea required rows={4} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] rounded-sm text-sm resize-none" placeholder="Detalhes do seu projeto ou dúvidas técnicas..." />
                    </div>

                    {formStatus === "idle" && (
                      <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-[#111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#bd1622] transition-colors rounded-sm flex items-center justify-center gap-3 mt-4">
                        Enviar Mensagem <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {formStatus === "loading" && (
                      <div className="w-full sm:w-auto px-10 py-4 bg-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 mt-4 cursor-not-allowed">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                        Processando...
                      </div>
                    )}
                    {formStatus === "success" && (
                      <div className="success-msg w-full px-6 py-4 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest border border-green-200 rounded-sm flex items-center gap-3 mt-4">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        Recebemos sua mensagem com sucesso! Retornaremos em breve.
                      </div>
                    )}
                  </form>
               </div>
             )}

             {/* TAB: SEJA UM REVENDEDOR */}
             {activeTab === "revendedor" && (
               <div className="w-full h-full animate-in fade-in slide-in-from-left-4 duration-500">
                  <h3 className="font-display text-2xl font-medium mb-4">Programa Oficial de Distribuição</h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
                    Torne-se um agente autorizado da Aeropolimento na sua região administrativa.
                  </p>
                  
                  {/* Benefícios rápidos */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                        <Box className="w-5 h-5 text-[#bd1622] mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">Preços B2B</span>
                        <p className="text-xs text-gray-500">Margem altamente competitiva para distribuidores ativos.</p>
                     </div>
                     <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                        <TrendingUp className="w-5 h-5 text-[#bd1622] mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">Capacitação</span>
                        <p className="text-xs text-gray-500">Treinamento técnico direto nos protocolos do laboratório.</p>
                     </div>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Razão Social</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">CNPJ</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] text-sm" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Região de Atuação (UF)</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">E-mail Responsável</label>
                        <input required type="email" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-[#bd1622] text-sm" />
                      </div>
                    </div>

                    {formStatus === "idle" && (
                      <button type="submit" className="w-full px-10 py-4 bg-[#bd1622] text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-colors rounded-sm flex items-center justify-center gap-3 mt-4">
                        Aplicar para Distribuição Especializada
                      </button>
                    )}
                    {formStatus === "loading" && (
                      <div className="w-full px-10 py-4 bg-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 mt-4 cursor-not-allowed">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                        Enviando Aplicação...
                      </div>
                    )}
                    {formStatus === "success" && (
                      <div className="success-msg w-full px-6 py-4 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-widest border border-green-200 rounded-sm flex items-center justify-center gap-3 mt-4">
                        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                        Aplicação submetida! Nossa diretoria avaliará seu perfil.
                      </div>
                    )}
                  </form>
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  );
}
