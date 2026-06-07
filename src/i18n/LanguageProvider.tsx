"use client";

// ── i18n runtime: client-side language toggle (no server, static-export safe) ──
// Decisão de arquitetura (sessão 2026-06-07): static export (`output: "export"`)
// não suporta o i18n routing nativo do Next, que exige servidor. Optamos por um
// toggle client-side: mesma URL, troca de dicionário via React Context.
// Trade-off aceito: SEO indexa só o idioma pré-renderizado (PT). URLs por idioma
// ficam para uma futura migração a rotas /[lang]/ se o SEO multilíngue virar meta.

import * as React from "react";
import { pt } from "./dictionaries/pt";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/pt";

// Extensível para "es" sem refatorar: basta criar dictionaries/es.ts,
// somar ao mapa `dictionaries` e ao union `Locale`.
export type Locale = "pt" | "en";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

// <html lang="..."> correto por idioma (acessibilidade + SEO básico).
const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };

const STORAGE_KEY = "aero-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dictionary;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "pt" || value === "en";
}

// Resolve o idioma persistido. Roda só no cliente, após o mount.
// Política BR-first: sem preferência salva, fica em PT (não auto-detecta
// navigator.language — público primário é brasileiro; visitante internacional
// usa o seletor PT|EN no header).
function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : "pt";
  } catch {
    return "pt";
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Primeiro render SEMPRE "pt" para casar com o HTML estático do servidor
  // (evita hydration mismatch). O idioma salvo é aplicado no useEffect abaixo.
  const [locale, setLocaleState] = React.useState<Locale>("pt");

  React.useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = HTML_LANG[stored];
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = HTML_LANG[next];
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage indisponível (modo privado): troca volátil, sem persistir.
    }
  };

  const value: LanguageContextValue = { locale, setLocale, t: dictionaries[locale] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Hook de consumo. `t` é o dicionário do idioma ativo (tipado).
// Uso: const { t, locale, setLocale } = useT();  →  t.hero.titleLine1
export function useT(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useT() precisa estar dentro de <LanguageProvider>.");
  }
  return ctx;
}
