"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Block10Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            {/* Col 1 */}
            <div className="lg:col-span-1">
                <span className="block text-3xl font-black tracking-tighter mb-6 text-white uppercase"><span className="text-red-600">Aero</span>polimento</span>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    Química automotiva e aeronáutica de alta performance. Homologado pelas principais autoridades do setor aéreo mundial.
                </p>
                <div className="flex gap-4">
                    <a href="https://instagram.com/aeropolimento" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
                       <span className="sr-only">Instagram</span>
                       {/* SVG Icon para Instagram para nao quebrar em builds next caso o lucide vaze */}
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Col 2 */}
            <div>
                <h4 className="text-lg font-bold mb-6">Produtos</h4>
                <ul className="space-y-4">
                    <li><a href="#produtos" className="text-zinc-400 hover:text-white transition-colors">Linha Aerocare</a></li>
                    <li><a href="#produtos" className="text-zinc-400 hover:text-white transition-colors">All Purpose Cleaner (APC)</a></li>
                    <li><a href="#produtos" className="text-zinc-400 hover:text-white transition-colors">Ceras e Selantes</a></li>
                    <li><a href="#produtos" className="text-zinc-400 hover:text-white transition-colors">Compostos Polidores</a></li>
                </ul>
            </div>

            {/* Col 3 */}
            <div>
                <h4 className="text-lg font-bold mb-6">Aeronáutica</h4>
                <ul className="space-y-4">
                    <li><a href="#anac" className="text-zinc-400 hover:text-white transition-colors">Homologação ANAC</a></li>
                    <li><a href="#anac" className="text-zinc-400 hover:text-white transition-colors">Safety Data Sheets (FISPQ)</a></li>
                    <li><a href="#blog" className="text-zinc-400 hover:text-white transition-colors">Manual de Aplicação AMS</a></li>
                    <li><a href="#blog" className="text-zinc-400 hover:text-white transition-colors">Artigos Técnicos</a></li>
                </ul>
            </div>

            {/* Col 4 */}
            <div>
                <h4 className="text-lg font-bold mb-6">Comercial</h4>
                <ul className="space-y-4">
                    <li><a href="#contato" className="text-zinc-400 hover:text-white transition-colors flex items-center group">Fale com Vendas <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                    <li><a href="#contato" className="text-zinc-400 hover:text-white transition-colors flex items-center group">Painel do Distribuidor <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                    <li><a href="#contato" className="text-zinc-400 hover:text-white transition-colors">Trabalhe Conosco</a></li>
                </ul>
            </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-medium tracking-wider">
            <p>&copy; {currentYear} Aeropolimento Química. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors uppercase">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors uppercase">Termos de Uso</a>
            </div>
        </div>

      </div>
    </footer>
  );
}
