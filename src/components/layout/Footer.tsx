"use client";

import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YtIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

// Logo oficial Aeropolimento (inline p/ controlar cor no fundo escuro):
// AERO + chevron herdam currentColor (branco); POLIMENTO fica vermelho.
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000.2 232.96" className={className} fill="currentColor" role="img" aria-label="Aeropolimento" xmlns="http://www.w3.org/2000/svg">
      {/* AERO */}
      <path d="M186.81,91.24h16.55l26.57,49.34h-15.03l-4.57-8.82h-31.33l-4.57,8.82h-14.21l26.57-49.34ZM204.82,121.11l-10.15-19.53-10.15,19.53h20.29Z" />
      <path d="M235.19,91.24h52.19v10.53h-39.38v8.62h37.29v10.15h-37.29v9.51h40.21v10.53h-53.02v-49.34Z" />
      <path d="M297.08,91.24h36.15c16.11,0,20.93,4.31,20.93,15.35,0,7.42-2.16,11.48-8.24,13.38v.25c6.79,1.08,8.31,3.17,8.31,11.79v8.56h-12.81v-6.66c0-6.4-1.08-8.81-10.4-8.81h-21.12v15.47h-12.81v-49.34ZM331.96,114.64c7.23,0,9.45-1.27,9.45-6.4s-2.16-6.47-9.51-6.47h-22.01v12.87h22.07Z" />
      <path d="M362.33,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM395.05,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z" />
      {/* POLIMENTO (vermelho) */}
      <path fill="#bd1622" d="M436.78,91.24h33.93c17.38,0,22.45,4.31,22.45,17.95s-5.07,17.95-22.45,17.95h-21.12v13.44h-12.81v-49.34ZM470.14,116.61c7.86,0,10.34-1.46,10.34-7.42s-2.47-7.42-10.34-7.42h-20.55v14.84h20.55Z" />
      <path fill="#bd1622" d="M499.56,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM532.28,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z" />
      <path fill="#bd1622" d="M574,91.24h12.87v38.62h35.96v10.72h-48.83v-49.34Z" />
      <path fill="#bd1622" d="M629.68,91.24h12.87v49.34h-12.87v-49.34Z" />
      <path fill="#bd1622" d="M652.82,91.24h20.1l19.53,36.78h.06l19.53-36.78h19.72v49.34h-12.68v-37.61h-.13l-19.98,37.61h-13.51l-19.85-37.61h-.13v37.61h-12.68v-49.34Z" />
      <path fill="#bd1622" d="M742.04,91.24h52.19v10.53h-39.38v8.62h37.29v10.15h-37.29v9.51h40.21v10.53h-53.02v-49.34Z" />
      <path fill="#bd1622" d="M803.93,91.24h18.71l31.2,37.35h.13v-37.35h12.62v49.34h-18.39l-31.45-37.61h-.13v37.61h-12.68v-49.34Z" />
      <path fill="#bd1622" d="M895.82,101.96h-22.39v-10.72h57.71v10.72h-22.39l-.06,38.62h-12.87v-38.62Z" />
      <path fill="#bd1622" d="M934.69,115.91c0-20.61,5.52-25.62,32.72-25.62s32.79,5.01,32.79,25.62-5.45,25.62-32.79,25.62-32.72-5.01-32.72-25.62ZM967.41,130.81c17.82,0,19.79-1.46,19.79-14.97s-1.97-14.84-19.79-14.84-19.79,1.46-19.79,14.84,1.97,14.97,19.79,14.97Z" />
      {/* Chevron */}
      <polygon points="127.91 116.48 27.03 217.36 0 232.96 7 217.36 52.28 116.48 7 15.6 0 0 27.03 15.6 127.91 116.48" />
    </svg>
  );
}

export function Footer() {
  const { t } = useT();
  const year = 2026;

  const navLinks = [
    { href: "/#sobre", label: t.nav.sobre },
    { href: "/#produtos", label: t.nav.produtos },
    { href: "/#homologacao", label: t.nav.homologacao },
    { href: "/#blog", label: t.nav.recursos },
    { href: "/#contato", label: t.nav.contato },
  ];

  const produtos = [
    { code: "AP-001", label: t.footer.prodApc },
    { code: "AP-0010", label: t.footer.prodCera },
    { code: "AP-0020", label: t.footer.prodMassa },
  ];

  return (
    <footer className="relative bg-[var(--color-text-primary)] text-white overflow-hidden">
      {/* Fio superior + brilho vermelho discreto */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aero-red/50 to-transparent" aria-hidden="true" />
      <div className="absolute -top-24 left-0 w-72 h-72 bg-aero-red/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1536px] mx-auto px-[clamp(1.5rem,4vw,4rem)] py-16 md:py-20">
        {/* ── Grade principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-12 lg:gap-10">

          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-aero-red" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-400">{t.footer.kicker}</span>
            </div>

            <Link href="/#" aria-label="Aeropolimento — página inicial" className="inline-block mb-6">
              <LogoMark className="h-9 md:h-11 w-auto text-white" />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-7">{t.footer.tagline}</p>

            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-aero-red" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-300">{t.footer.seal}</span>
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label={t.footer.navTitle}>
            <h3 className="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500 mb-5">{t.footer.navTitle}</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Linha Aerocare */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500 mb-5">{t.footer.lineTitle}</h3>
            <ul className="space-y-3">
              {produtos.map((p) => (
                <li key={p.code}>
                  <Link href="/#produtos" className="group flex items-baseline gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    <span className="font-mono text-[10px] text-aero-red tracking-wider shrink-0 w-12">{p.code}</span>
                    <span>{p.label.split("—")[0].trim()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500 mb-5">{t.footer.contactTitle}</h3>
            <ul className="space-y-4 mb-7">
              <li>
                <a
                  href="https://wa.me/5531989477030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4 text-aero-red mt-0.5 shrink-0" />
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-500 mb-0.5">{t.footer.whatsapp}</span>
                    <span className="text-sm font-medium">+55 (31) 98947-7030</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aeropolimentoprodutos@gmail.com"
                  className="group flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-aero-red mt-0.5 shrink-0" />
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-500 mb-0.5">{t.footer.email}</span>
                    <span className="text-sm font-medium break-all">aeropolimentoprodutos@gmail.com</span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/aeropolimentooficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-aero-red/50 hover:bg-white/5 transition-all duration-200"
              >
                <IgIcon />
              </a>
              <a
                href="https://youtube.com/@aeropolimento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-aero-red/50 hover:bg-white/5 transition-all duration-200"
              >
                <YtIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ── Barra inferior ── */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-gray-500 text-xs order-2 md:order-1">
            © {year} Aeropolimento. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link href="/#" className="group inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
              {t.footer.privacy}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/#" className="group inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
              {t.footer.terms}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.18em] uppercase text-gray-600">{t.footer.madeIn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
