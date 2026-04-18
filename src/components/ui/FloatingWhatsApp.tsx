"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  // Aparecer após rolar a página um pouco para evitar poluição visual no load
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/5531989477030?text=Ola,%20gostaria%20de%20informacoes%20sobre%20os%20produtos%20da%20Linha%20Aerocare."
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp Comercial"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500/90 backdrop-blur-md rounded-full shadow-lg shadow-green-500/30 text-white hover:bg-green-500 hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 animate-pulse group"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="sr-only">WhatsApp Comercial</span>
      <div className="absolute right-full mr-4 bg-white text-zinc-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale com o Comercial
      </div>
    </a>
  );
}
