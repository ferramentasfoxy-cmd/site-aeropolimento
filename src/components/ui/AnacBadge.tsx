'use client';
import * as React from "react";

export function AnacBadge() {
  return (
    <div className="absolute top-[18%] right-[25%] lg:right-[30%] xl:right-[35%] z-30 hud-aesthetic hidden lg:flex items-center justify-center group cursor-default">
      
      {/* Container Elegante, Branco Puro e Clean - Sem tons vermelhos, apenas uma sombra B2B macia */}
      <div className="bg-white rounded-[20px] p-3 shadow-[0_15px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out group-hover:-translate-y-2 flex items-center justify-center border border-gray-300">
        
        {/* Tamanho Controlado / Escalabilidade */}
        <div className="w-[70px] h-[70px] xl:w-[85px] xl:h-[85px] relative transition-transform duration-700 group-hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            
            {/* Borda Azul Externa Oficial da ANAC */}
            <circle cx="50" cy="50" r="48" fill="#0088CE" />
            
            {/* Fundo Branco Interno */}
            <circle cx="50" cy="50" r="33" fill="#ffffff" />
            
            {/* Path para letreiros */}
            <defs>
              <path id="topCurve" d="M 16 50 A 34 34 0 0 1 84 50" fill="none" />
              <path id="bottomCurve" d="M 83 50 A 33 33 0 0 1 17 50" fill="none" />
            </defs>
            
            {/* Textos Circulares Oficiais */}
            <text fill="#ffffff" fontSize="10.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.05em">
              <textPath href="#topCurve" startOffset="50%" textAnchor="middle">HOMOLOGADO</textPath>
            </text>
            
            <text fill="#ffffff" fontSize="8" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.02em">
              <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">Resolução 458</textPath>
            </text>
            
            {/* Miolo Central: Globo, Avião e Logo ANAC */}
            <g transform="translate(50, 42)">
              {/* Globo Oficial Cerulean */}
              <circle cx="0" cy="0" r="14" fill="#006399" />
              <path d="M -14 0 A 14 14 0 0 0 14 0" fill="#0088CE" />
              
              {/* Rota */}
              <path d="M -15 5 C -5 -5, 10 -10, 16 -12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Aviãozinho Oficial */}
              <path d="M 14 -14 l 3 -1 l 1 3 l -1 1 l -1 -2 l -2 1 z" fill="#003b5c" />
            </g>

            {/* Letreiro Oficial ANAC */}
            <g transform="translate(50, 64)">
              <text x="0" y="0" fill="#0088CE" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">ANAC</text>
              <text x="0" y="6" fill="#0088CE" fontSize="3.5" fontWeight="400" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">AGÊNCIA NACIONAL</text>
              <text x="0" y="10" fill="#0088CE" fontSize="3.5" fontWeight="400" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">DE AVIAÇÃO CIVIL</text>
            </g>

          </svg>
        </div>
      </div>

    </div>
  );
}
