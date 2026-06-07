// ── Dicionário PT-BR — fonte da verdade do SHAPE do i18n ──
// Este objeto define a estrutura canônica de todas as traduções.
// `type Dictionary = typeof pt` (em ./types) deriva o contrato; en.ts é
// obrigado pelo compilador a preencher EXATAMENTE as mesmas chaves.
// Idioma institucional primário (BR-first). Ver src/i18n/LanguageProvider.tsx.
//
// NÃO usar `as const` aqui: queremos inferir `string` (não literais),
// para que en.ts possa fornecer valores diferentes com as mesmas chaves.

export const pt = {
  nav: {
    sobre: "Sobre",
    produtos: "Produtos",
    homologacao: "Homologação",
    recursos: "Recursos",
    contato: "Contato",
    acessarBlog: "Acessar Blog",
    ariaLanguage: "Selecionar idioma",
    ariaMenu: "Abrir menu de navegação",
  },

  hero: {
    badge: "Aviação & MRO",
    titleLine1: "Estética.",
    titleLine2: "Aeronáutica.",
    subtitle:
      "Fórmulas puras desenvolvidas para o detalhamento aeronáutico rigoroso. Da remoção de oxidação severa à proteção final, com segurança e aprovação internacional.",
    cta: "Conhecer Produtos",
    cert1Label: "Certificação",
    cert1Value: "Conformidade AMS",
    cert2Label: "Qualidade MRO",
    cert2Value: "Padrão Internacional",
    rotate360: "Girar em 360º",
    rotateHint: "interaja com o frasco",
  },
};

// Contrato derivado do PT. Inferido como `string` (sem `as const`),
// então en.ts pode trazer valores diferentes — mas NUNCA chaves diferentes.
export type Dictionary = typeof pt;
