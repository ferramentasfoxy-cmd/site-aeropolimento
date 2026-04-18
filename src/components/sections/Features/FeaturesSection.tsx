import React from "react";
import { BadgeCheck, Beaker, ShieldCheck, Microscope, Layers, BookOpen } from "lucide-react";

const features = [
  {
    icon: <BadgeCheck className="w-6 h-6 text-red-600" />,
    title: "Homologação ANAC",
    description:
      "Primeira empresa do segmento com homologação oficial para fabricação de produtos de limpeza e conservação aeronáutica no Brasil.",
  },
  {
    icon: <Beaker className="w-6 h-6 text-red-600" />,
    title: "Formulação Própria",
    description:
      "Linha Aerocare: produtos químicos desenvolvidos internamente, testados e aprovados para uso em superfícies aeronáuticas.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    title: "Conformidade AMS",
    description:
      "Todos os produtos seguem especificações AMS (Aerospace Material Specification), padrão internacional da indústria.",
  },
  {
    icon: <Microscope className="w-6 h-6 text-red-600" />,
    title: "Pesquisa Aplicada",
    description:
      "Formulações desenvolvidas com base em anos de pesquisa em química de polimento e preservação de superfícies aeronáuticas.",
  },
  {
    icon: <Layers className="w-6 h-6 text-red-600" />,
    title: "Compatibilidade Ampla",
    description:
      "Produtos formulados para asa fixa e rotativa, compatíveis com pinturas poliéster, poliuretano e clearcoat.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-red-600" />,
    title: "Suporte Técnico",
    description:
      "Documentação completa (TDS, FISPQ) e orientação técnica sobre aplicação e dosagem de cada produto.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white text-zinc-900 border-t border-zinc-100 overflow-hidden">
      
      {/* --- CORTES TÁTICOS HUD --- */}
      <span className="corner corner--tl">
        <span><span className="dot"></span>SEC 02 / HOMOLOGAÇÕES TÉCNICAS</span>
        <span>LAB TESTING · ABNT NBR</span>
      </span>
      <span className="corner corner--tr">
        <span>CLASSIFIED / B2B</span>
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-500">
              Por que Aeropolimento
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 uppercase">
            A chancela oficial <br />
            <span className="italic text-[#bd1622]">ANAC + AMS</span>
          </h2>
          <p className="text-lg text-zinc-600 font-body">
            A união perfeita entre ciência química e engenharia aeronáutica.
            Nosso compromisso é entregar a máxima performance com total conformidade. Em aviação, produto químico não é commodity, é segurança estrutural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-start p-8 rounded-3xl bg-zinc-50 hover:bg-white border border-transparent hover:border-zinc-200 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-900/5 cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900 group-hover:text-red-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
