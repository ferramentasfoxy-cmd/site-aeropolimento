'use client';
import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { prefersReducedMotion, DURATION, EASE, HERO_HANDOFF } from "@/lib/animations/defaults";
import { useT } from "@/i18n/LanguageProvider";

export function Header() {
  const { t, locale, setLocale } = useT();
  const headerRef = React.useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(headerRef.current, { y: 0, opacity: 1, filter: "blur(0px)" });
    } else {
      // Entra JUNTO com o conteúdo da hero (mesmo HERO_HANDOFF) e rápido —
      // não arrasta atrás do resto.
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: DURATION.slow, delay: HERO_HANDOFF, ease: EASE.standard }
      );
    }

    const handleScroll = () => setIsSticky(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonte única dos links — evita drift entre nav desktop e menu mobile.
  // Hash anchors (mesma página) usam <a> nativo: scroll nativo respeita
  // melhor o scroll-padding-top: 6rem do que o roteador.
  const navLinks = [
    { href: "/#sobre", label: t.nav.sobre },
    { href: "/#produtos", label: t.nav.produtos },
    { href: "/#homologacao", label: t.nav.homologacao },
    { href: "/#blog", label: t.nav.recursos },
    { href: "/#contato", label: t.nav.contato },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      {/* Mesmo container largo (1536) + padding do hero — mantém logo alinhado
          com a borda esquerda do texto do hero e o cluster com a borda do produto. */}
      <div className="mx-auto w-full max-w-[1536px] px-[clamp(1.5rem,4vw,4rem)] flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Zone 1 — Brand */}
        <div className="flex items-center">
          <Link href="/" aria-label="Aeropolimento — página inicial">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/logo.svg"
              alt="Aeropolimento Oficial"
              className={`${isSticky ? "h-7 lg:h-8" : "h-9 lg:h-10"} w-auto transition-all duration-300 hover:opacity-80`}
            />
          </Link>
        </div>

        {/* Zone 2 — Nav (centralizada de verdade via grid track central) */}
        <nav className="hidden lg:flex items-center justify-self-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Zone 3 — Cluster: seletor PT|EN + CTA Blog */}
        <div className="hidden lg:flex items-center justify-self-end gap-6">
          <div
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest"
            role="group"
            aria-label={t.nav.ariaLanguage}
          >
            <button
              type="button"
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
              className={`uppercase transition-colors ${locale === "pt" ? "text-[var(--color-text-primary)] font-bold" : "text-gray-400 hover:text-gray-600"}`}
            >
              PT
            </button>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`uppercase transition-colors ${locale === "en" ? "text-[var(--color-text-primary)] font-bold" : "text-gray-400 hover:text-gray-600"}`}
            >
              EN
            </button>
          </div>

          {/* CTA Blog — decoração contida, legibilidade no ritmo da nav */}
          <Link
            href="/#blog"
            className="group flex items-center gap-2.5 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-[var(--color-text-primary)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aero-red shrink-0 transition-transform duration-300 group-hover:scale-125" />
            {t.nav.acessarBlog}
          </Link>
        </div>

        {/* Mobile toggle — <button> semântico (a11y) */}
        <button
          type="button"
          aria-label={t.nav.ariaMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden relative z-[60] w-[30px] h-[20px] flex flex-col justify-between transition-transform duration-300 ${isOpen ? "rotate-[-90deg]" : ""}`}
        >
          <span className="block h-[3px] w-full bg-gray-500 rounded-full" />
          <span className="block h-[3px] w-full bg-gray-500 rounded-full" />
          <span className="block h-[3px] w-full bg-gray-500 rounded-full" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[420px] py-8 shadow-lg" : "max-h-0 py-0 border-transparent"}`}
      >
        <nav className="flex flex-col items-center gap-6 px-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="text-[13px] uppercase tracking-widest font-semibold text-gray-500 hover:text-[var(--color-text-primary)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/#blog"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2.5 mt-2 rounded-full border border-gray-300 text-[11px] font-bold text-gray-500 tracking-[0.18em] uppercase text-center w-full max-w-[200px]"
          >
            {t.nav.acessarBlog}
          </Link>

          <div
            className="flex items-center gap-2 font-mono text-[12px] tracking-widest mt-4"
            role="group"
            aria-label={t.nav.ariaLanguage}
          >
            <button
              type="button"
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
              className={`uppercase transition-colors ${locale === "pt" ? "text-[var(--color-text-primary)] font-bold" : "text-gray-400"}`}
            >
              PT
            </button>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`uppercase transition-colors ${locale === "en" ? "text-[var(--color-text-primary)] font-bold" : "text-gray-400"}`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
