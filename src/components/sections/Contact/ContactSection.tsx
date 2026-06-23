"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/defaults";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, TrendingUp, Box } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import { TechBackground } from "@/components/ui/TechBackground";

type TabState = "contato" | "revendedor";

// Endpoint do Worker de contato (static export não tem backend próprio).
// Configurável por env no build; fallback aponta para o Worker padrão.
const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
  "https://aeropolimento-contact.workers.dev/api/contact";

export function ContactSection() {
  const { t } = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabState>("contato");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".contact-header", { y: 0, opacity: 1 });
        gsap.set(".contact-panel", { y: 0, opacity: 1 });
        return;
      }
      // Entrada da Seção — duration (1s/1.2s) + ease custom mantidos; start "top 80%" custom.
      gsap.from(".contact-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // duration (1.2s) custom; ease "power2.out" mantido (orgânico, distinto de expo default).
      // start herda de ScrollTrigger.defaults ("top 85%").
      gsap.from(".contact-panel", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-panel" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: TabState) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = String(fd.get("_gotcha") ?? "");

    const payload =
      formType === "contato"
        ? {
            formType,
            nome: String(fd.get("nome") ?? "").trim(),
            email: String(fd.get("email") ?? "").trim(),
            telefone: String(fd.get("telefone") ?? "").trim(),
            mensagem: String(fd.get("mensagem") ?? "").trim(),
            _gotcha: honeypot,
          }
        : {
            formType,
            empresa: String(fd.get("empresa") ?? "").trim(),
            cnpj: String(fd.get("cnpj") ?? "").trim(),
            regiao: String(fd.get("regiao") ?? "").trim(),
            emailResponsavel: String(fd.get("emailResponsavel") ?? "").trim(),
            _gotcha: honeypot,
          };

    setFormStatus("loading");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setFormStatus("success");
      form.reset();
      // Anima após o próximo frame para garantir que .success-msg já montou.
      requestAnimationFrame(() => {
        gsap.fromTo(
          ".success-msg",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
        );
      });
      setTimeout(() => setFormStatus("idle"), 6000);
    } catch (err) {
      console.error("[contact] envio falhou:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 6000);
    }
  };

  return (
    <section ref={containerRef} id="contato" className="relative w-full py-24 md:py-32 bg-[var(--color-surface-base)] flex justify-center overflow-hidden z-20">
      <TechBackground />
      {/* --- CORTES TÁTICOS HUD --- */}
      <span className="corner corner--tl">
        <span><span className="dot"></span>{t.contact.cornerCode}</span>
      </span>
      <span className="corner corner--tr">
        <span>{t.contact.cornerCoords}</span>
      </span>

      <div className="w-full max-w-[1400px] px-6 md:px-12 mx-auto relative z-10">
        
        {/* Cabecalho */}
        <div className="contact-header flex flex-col items-center text-center mb-16">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 bg-aero-red rounded-full" />
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">{t.contact.kicker}</span>
           </div>
           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text-primary)] mb-6">
             {t.contact.title}
           </h2>
           <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
             {t.contact.subtitle}
           </p>
        </div>

        {/* Mega Painel Split Screen */}
        <div className="contact-panel grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] bg-[var(--color-surface-base)] border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-lg overflow-hidden min-h-[600px]">
          
          {/* Aba Lateral Escura - Info */}
          <div className="bg-[var(--color-text-primary)] relative text-white p-10 md:p-14 flex flex-col justify-between overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-aero-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

             <div className="relative z-10 mb-16">
               <h3 className="font-display text-3xl font-medium mb-8">{t.contact.infoTitle}</h3>
               <ul className="space-y-8">
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <Phone className="w-4 h-4 text-aero-red" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">{t.contact.whatsappLabel}</span>
                     <a href="https://wa.me/5531989477030" className="text-lg font-medium hover:text-aero-red transition-colors">+55 (31) 98947-7030</a>
                   </div>
                 </li>
                 
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <Mail className="w-4 h-4 text-aero-red" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">{t.contact.emailLabel}</span>
                     <a href="mailto:contato@aeropolimento.com.br" className="text-lg font-medium hover:text-aero-red transition-colors">contato@aeropolimento.com.br</a>
                   </div>
                 </li>
                 
                 <li className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                     <MapPin className="w-4 h-4 text-aero-red" />
                   </div>
                   <div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-1">{t.contact.hqLabel}</span>
                     <p className="text-lg font-medium text-gray-300">{t.contact.hqValue}</p>
                   </div>
                 </li>
               </ul>
             </div>

             {/* Partner Banner Lateral */}
             <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-md">
                <span className="text-sm font-bold block mb-2">{t.contact.partnerTitle}</span>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{t.contact.partnerDesc}</p>
                <button
                  onClick={() => setActiveTab("revendedor")}
                 className={`text-[10px] font-mono tracking-widest uppercase pb-1 border-b ${activeTab === 'revendedor' ? 'border-aero-red text-aero-red' : 'border-gray-500 text-gray-400 hover:text-white'} transition-colors inline-block`}
                >
                  {t.contact.partnerCta}
                </button>
             </div>
          </div>

          {/* Área Interativa Direita - Tabs e Forms */}
          <div className="p-10 md:p-14 bg-white flex flex-col items-start relative overflow-hidden">
             
             {/* Tab Switcher */}
             <div className="flex items-center gap-6 mb-12 border-b border-gray-200 w-full relative">
               <button 
                 onClick={() => setActiveTab("contato")}
                 className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'contato' ? 'text-[var(--color-text-primary)]' : 'text-gray-400 hover:text-[var(--color-text-primary)]'}`}
               >
                 {t.contact.tabContact}
                 {activeTab === 'contato' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-aero-red" />}
               </button>
               <button 
                 onClick={() => setActiveTab("revendedor")}
                 className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'revendedor' ? 'text-[var(--color-text-primary)]' : 'text-gray-400 hover:text-[var(--color-text-primary)]'}`}
               >
                 {t.contact.tabReseller}
                 {activeTab === 'revendedor' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-aero-red" />}
               </button>
             </div>

             {/* TAB: CONTATO DIRETO */}
             {activeTab === "contato" && (
               <div className="w-full h-full animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-display text-2xl font-medium mb-6">{t.contact.formTitle}</h3>
                  <form onSubmit={(e) => handleSubmit(e, "contato")} className="space-y-6 flex flex-col justify-between h-[80%]">
                    {/* Honeypot anti-bot — oculto para humanos */}
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="ct-nome" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelName}</label>
                        <input id="ct-nome" name="nome" required type="text" autoComplete="name" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red rounded-sm text-sm" placeholder={t.contact.placeholderName} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="ct-email" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelEmail}</label>
                        <input id="ct-email" name="email" required type="email" autoComplete="email" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red rounded-sm text-sm" placeholder={t.contact.placeholderEmail} />
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label htmlFor="ct-telefone" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelPhone}</label>
                       <input id="ct-telefone" name="telefone" required type="tel" autoComplete="tel" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red rounded-sm text-sm" placeholder={t.contact.placeholderPhone} />
                    </div>

                    <div className="space-y-2 flex-grow">
                       <label htmlFor="ct-mensagem" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelMessage}</label>
                       <textarea id="ct-mensagem" name="mensagem" required rows={4} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red rounded-sm text-sm resize-none" placeholder={t.contact.placeholderMessage} />
                    </div>

                    {formStatus === "idle" && (
                      <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-[var(--color-text-primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-aero-red transition-colors rounded-sm flex items-center justify-center gap-3 mt-4">
                        {t.contact.submit} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {formStatus === "loading" && (
                      <div className="w-full sm:w-auto px-10 py-4 bg-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 mt-4 cursor-not-allowed">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                        {t.contact.processing}
                      </div>
                    )}
                    {formStatus === "success" && (
                      <div className="success-msg w-full px-6 py-4 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest border border-green-200 rounded-sm flex items-center gap-3 mt-4">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        {t.contact.successContact}
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="w-full px-6 py-4 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest border border-red-200 rounded-sm flex items-center gap-3 mt-4">
                        {t.contact.errorContact}
                      </div>
                    )}
                  </form>
               </div>
             )}

             {/* TAB: SEJA UM REVENDEDOR */}
             {activeTab === "revendedor" && (
               <div className="w-full h-full animate-in fade-in slide-in-from-left-4 duration-500">
                  <h3 className="font-display text-2xl font-medium mb-4">{t.contact.resellerTitle}</h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
                    {t.contact.resellerDesc}
                  </p>

                  {/* Benefícios rápidos */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                        <Box className="w-5 h-5 text-aero-red mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">{t.contact.benefit1Title}</span>
                        <p className="text-xs text-gray-500">{t.contact.benefit1Desc}</p>
                     </div>
                     <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                        <TrendingUp className="w-5 h-5 text-aero-red mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">{t.contact.benefit2Title}</span>
                        <p className="text-xs text-gray-500">{t.contact.benefit2Desc}</p>
                     </div>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, "revendedor")} className="space-y-4">
                    {/* Honeypot anti-bot — oculto para humanos */}
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="rv-empresa" className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelCompany}</label>
                        <input id="rv-empresa" name="empresa" required type="text" autoComplete="organization" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="rv-cnpj" className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelCnpj}</label>
                        <input id="rv-cnpj" name="cnpj" required type="text" inputMode="numeric" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="rv-regiao" className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelRegion}</label>
                        <input id="rv-regiao" name="regiao" required type="text" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="rv-email" className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{t.contact.labelRespEmail}</label>
                        <input id="rv-email" name="emailResponsavel" required type="email" autoComplete="email" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 focus:outline-none focus:border-aero-red text-sm" />
                      </div>
                    </div>

                    {formStatus === "idle" && (
                      <button type="submit" className="w-full px-10 py-4 bg-aero-red text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-colors rounded-sm flex items-center justify-center gap-3 mt-4">
                        {t.contact.resellerSubmit}
                      </button>
                    )}
                    {formStatus === "loading" && (
                      <div className="w-full px-10 py-4 bg-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 mt-4 cursor-not-allowed">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                        {t.contact.sendingApplication}
                      </div>
                    )}
                    {formStatus === "success" && (
                      <div className="success-msg w-full px-6 py-4 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-widest border border-green-200 rounded-sm flex items-center justify-center gap-3 mt-4">
                        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                        {t.contact.successReseller}
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="w-full px-6 py-4 bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-widest border border-red-200 rounded-sm flex items-center justify-center gap-3 mt-4">
                        {t.contact.errorContact}
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
