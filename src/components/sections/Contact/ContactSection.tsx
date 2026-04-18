import React from "react";
import { Mail, MessageSquare, Phone, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ContactSection() {
  return (
    <section id="contato" className="relative w-full py-24 md:py-32 bg-white text-zinc-900 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Esquerda: Infos */}
          <div className="flex flex-col max-w-xl">
            <span className="text-red-700 font-semibold tracking-[0.1em] uppercase text-sm mb-4 block">
              Contato Comercial
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
              Solicite sua <br className="hidden md:block" /> cotação
            </h2>
            <p className="text-lg text-zinc-600 mb-12 leading-relaxed">
              Entre em contato com nossa equipe comercial para cotações, informações técnicas sobre a Linha Aerocare ou para conhecer nosso programa de distribuidores.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4 shrink-0">
                  <Phone className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">WhatsApp Comercial</h4>
                  <a href="https://wa.me/5531989477030" target="_blank" rel="noreferrer" className="text-xl font-medium text-zinc-900 hover:text-red-700 transition-colors">
                    +55 (31) 98947-7030
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4 shrink-0">
                  <Mail className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">E-mail</h4>
                  <a href="mailto:contato@aeropolimento.com.br" className="text-xl font-medium text-zinc-900 hover:text-red-700 transition-colors">
                    contato@aeropolimento.com.br
                  </a>
                </div>
              </div>
            </div>
            
            {/* Redes Sociais */}
            <div className="mt-12 flex items-center space-x-6">
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Siga-nos</span>
              <div className="flex space-x-4">
                <a href="https://instagram.com/aeropolimento" target="_blank" rel="noreferrer" className="font-medium text-zinc-600 hover:text-red-700 transition-colors flex items-center">
                  Instagram <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
                <a href="https://youtube.com/@aeropolimento" target="_blank" rel="noreferrer" className="font-medium text-zinc-600 hover:text-red-700 transition-colors flex items-center">
                  YouTube <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Direita: CTA Card */}
          <div className="bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-200/50 shadow-xl shadow-zinc-200/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                Fale com o Comercial
              </h3>
              <p className="text-zinc-600 mb-10 leading-relaxed text-lg">
                Cotações, dúvidas técnicas sobre produtos e parcerias comerciais. Resposta em até 24 horas úteis.
              </p>
              
              <div className="flex flex-col space-y-4">
                <MagneticButton className="w-full">
                  <a href="https://wa.me/5531989477030" target="_blank" rel="noreferrer" className="w-full px-8 py-4 bg-red-700 hover:bg-red-800 text-white rounded-xl font-semibold flex justify-between items-center transition-colors">
                    <span>Acessar WhatsApp Comercial</span>
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </MagneticButton>
                
                <MagneticButton className="w-full">
                  <a href="mailto:contato@aeropolimento.com.br?subject=Seja%20um%20Distribuidor" className="w-full px-8 py-4 bg-transparent border-2 border-zinc-200 hover:border-red-200 hover:bg-red-50 text-zinc-900 hover:text-red-800 rounded-xl font-semibold flex justify-center items-center transition-all">
                    Seja um Distribuidor
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
