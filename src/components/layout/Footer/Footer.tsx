import React from "react";
import Link from "next/link";


export function Footer() {
  return (
    <footer className="w-full bg-red-900 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Logo e Tagline */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black tracking-tighter">
                AERO<span className="text-red-400">POLIMENTO</span>
              </span>
            </Link>
            <p className="text-red-100/80 text-lg leading-relaxed max-w-sm">
              Química de alta performance para aviação.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://instagram.com/aeropolimento" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-red-800/50 flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-red-800/50 flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Links e Navegação */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-red-200">
              Navegação
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="#sobre" className="text-red-100/80 hover:text-white transition-colors">
                  Sobre a Empresa
                </Link>
              </li>
              <li>
                <Link href="#produtos" className="text-red-100/80 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-red-100/80 hover:text-white transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-red-100/80 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato Comercial */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-red-200">
              Contato Comercial
            </h4>
            <div className="space-y-4 text-red-100/80">
              <p>
                Assegure o melhor padrão para o cuidado de suas aeronaves. Fale diretamente com nossa equipe.
              </p>
              <div className="pt-2 flex flex-col space-y-3">
                <a 
                  href="https://wa.me/5531989477030" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-medium text-white hover:text-red-300 transition-colors flex items-center"
                >
                  <span className="w-8">+55</span>
                  <span>(31) 98947-7030</span>
                </a>
                <a 
                  href="mailto:contato@aeropolimento.com.br" 
                  className="font-medium text-white hover:text-red-300 transition-colors"
                >
                  contato@aeropolimento.com.br
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-black py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
          <p>
            Aeropolimento &copy; {new Date().getFullYear()}. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidade" className="hover:text-zinc-300 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-zinc-300 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
