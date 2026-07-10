import type { Locale } from "@/i18n/LanguageProvider";

// ─────────────────────────────────────────────────────────────
// Conteúdo dos produtos (Linha AEROCARE) — fonte única para as páginas
// /produtos/[slug]. Dados REAIS extraídos do PDF oficial do cliente
// (Apresentacao-Aeropolimento.pdf, p.6–8). Zero claim fabricado.
//
// Regra: 100% institucional/catálogo. Nunca serviços. O aviso obrigatório
// de consultar o manual do fabricante acompanha TODOS os produtos (consta no PDF).
// ─────────────────────────────────────────────────────────────

export interface ProductSpec {
  label: string;
  value: string;
}
export interface ProductSequence {
  label: string;
  items: string[];
}
export interface Product {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  model: string; // glb (Product3D)
  image: string; // fallback PNG
  intro: string;
  highlights: string[];
  specs: ProductSpec[];
  sequences?: ProductSequence[];
  recommendations?: string[];
  caveat: string;
}

const CAVEAT_PT =
  "É obrigatório o profissional consultar o capítulo correspondente do manual do fabricante da aeronave antes de executar qualquer procedimento.";
const CAVEAT_EN =
  "It is mandatory for the professional to consult the corresponding chapter of the aircraft manufacturer's manual before performing any procedure.";

const PT: Product[] = [
  {
    slug: "apc",
    code: "AP-001",
    name: "APC — All Purpose Cleaner",
    tagline: "Limpador alcalino multiuso",
    model: "/models/apc.glb",
    image: "/images/products/ap001.png",
    intro:
      "Limpador multiuso de alta performance para uso interno e externo em aeronaves, eficiente contra sujidades orgânicas e inorgânicas.",
    highlights: [
      "Remove contaminações de fuselagem, trem de pouso e interiores sem comprometer pinturas ou revestimentos",
      "Eficiente contra sujidades orgânicas e inorgânicas",
      "Uso manual e com máquina extratora · aroma cítrico agradável",
    ],
    specs: [
      { label: "Tipo", value: "Limpador alcalino multiuso" },
      { label: "Aplicação", value: "Fuselagem · Trem de pouso · Interiores" },
      { label: "Modo de uso", value: "Manual e máquina extratora" },
      { label: "Conformidade", value: "Aprovado ANAC" },
    ],
    sequences: [
      { label: "Sequência interna", items: ["Cockpit", "Couro", "Cinto de segurança", "Tapeçaria", "Galley", "Fones", "ABS", "QTU"] },
      { label: "Sequência externa", items: ["Descontaminação de pintura", "Remoção de mosquitos", "Limpeza em trens de pouso"] },
    ],
    caveat: CAVEAT_PT,
  },
  {
    slug: "cera-liquida",
    code: "AP-0010",
    name: "Cera Líquida",
    tagline: "Proteção e brilho — polimento numa só aplicação",
    model: "/models/cera.glb",
    image: "/images/products/ap0010.png",
    intro:
      "Camada protetora que restaura e mantém o brilho da fuselagem, unindo polimento e proteção em uma única aplicação.",
    highlights: [
      "Camada protetora contra raios UV e contaminantes ambientais",
      "Restaura e mantém o brilho da fuselagem por semanas após a aplicação",
      "Acabamento brilhante e resistente, polimento + proteção integrados",
    ],
    specs: [
      { label: "Tipo", value: "Cera protetora + polimento" },
      { label: "Proteção", value: "Raios UV · Contaminantes ambientais" },
      { label: "Durabilidade", value: "Brilho por semanas após aplicação" },
      { label: "Conformidade", value: "Aprovado ANAC" },
    ],
    recommendations: [
      "Não aplicar em determinados para-brisas que contenham coating do fabricante (consultar manual)",
      "Não aplicar em determinadas vigias que contenham proteção do fabricante (consultar manual)",
    ],
    caveat: CAVEAT_PT,
  },
  {
    slug: "massa-de-polir",
    code: "AP-0020",
    name: "Massa de Polir",
    tagline: "Correção profunda com preservação da pintura",
    model: "/models/massa-v5.glb",
    image: "/images/products/ap0020.png",
    intro:
      "Composto de correção que elimina micro-riscos e oxidações, restaurando o acabamento sem comprometer a integridade da pintura.",
    highlights: [
      "Composto de correção para pintura poliéster e poliuretano",
      "Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento",
      "Polimento profundo que remove oxidações preservando a integridade da pintura",
    ],
    specs: [
      { label: "Tipo", value: "Composto de correção" },
      { label: "Desenvolvida para", value: "Pintura poliuretano (PU)" },
      { label: "Superfícies", value: "Metálicas · Repintura" },
      { label: "Remoção de lixamento", value: "A partir de grão 1200" },
      { label: "Conformidade", value: "Aprovado ANAC" },
    ],
    caveat: CAVEAT_PT,
  },
];

const EN: Product[] = [
  {
    slug: "apc",
    code: "AP-001",
    name: "APC — All Purpose Cleaner",
    tagline: "Multi-purpose alkaline cleaner",
    model: "/models/apc.glb",
    image: "/images/products/ap001.png",
    intro:
      "High-performance multi-purpose cleaner for aircraft interiors and exteriors, effective against organic and inorganic soiling.",
    highlights: [
      "Removes contamination from fuselage, landing gear and interiors without compromising paint or coatings",
      "Effective against organic and inorganic soiling",
      "Manual use and with extraction machine · pleasant citrus scent",
    ],
    specs: [
      { label: "Type", value: "Multi-purpose alkaline cleaner" },
      { label: "Application", value: "Fuselage · Landing gear · Interiors" },
      { label: "Usage", value: "Manual and extraction machine" },
      { label: "Conformity", value: "ANAC approved" },
    ],
    sequences: [
      { label: "Interior sequence", items: ["Cockpit", "Leather", "Seat belts", "Upholstery", "Galley", "Headsets", "ABS", "QTU"] },
      { label: "Exterior sequence", items: ["Paint decontamination", "Insect removal", "Landing gear cleaning"] },
    ],
    caveat: CAVEAT_EN,
  },
  {
    slug: "cera-liquida",
    code: "AP-0010",
    name: "Liquid Wax",
    tagline: "Protection and shine — polishing in a single application",
    model: "/models/cera.glb",
    image: "/images/products/ap0010.png",
    intro:
      "A protective layer that restores and maintains the fuselage shine, combining polishing and protection in a single application.",
    highlights: [
      "Protective layer against UV rays and environmental contaminants",
      "Restores and maintains the fuselage shine for weeks after application",
      "Bright, resistant finish — polishing + protection integrated",
    ],
    specs: [
      { label: "Type", value: "Protective wax + polish" },
      { label: "Protection", value: "UV rays · Environmental contaminants" },
      { label: "Durability", value: "Shine for weeks after application" },
      { label: "Conformity", value: "ANAC approved" },
    ],
    recommendations: [
      "Do not apply on certain windshields that contain a manufacturer coating (consult the manual)",
      "Do not apply on certain windows that contain a manufacturer protection (consult the manual)",
    ],
    caveat: CAVEAT_EN,
  },
  {
    slug: "massa-de-polir",
    code: "AP-0020",
    name: "Polishing Compound",
    tagline: "Deep correction while preserving the paint",
    model: "/models/massa-v5.glb",
    image: "/images/products/ap0020.png",
    intro:
      "A correction compound that removes micro-scratches and oxidation, restoring the finish without compromising paint integrity.",
    highlights: [
      "Correction compound for polyester and polyurethane paint",
      "Removes micro-scratches and marks without aggressiveness, restoring the finish",
      "Deep polishing that removes oxidation while preserving paint integrity",
    ],
    specs: [
      { label: "Type", value: "Correction compound" },
      { label: "Developed for", value: "Polyurethane (PU) paint" },
      { label: "Surfaces", value: "Metallic · Repaint" },
      { label: "Sanding removal", value: "From grit 1200" },
      { label: "Conformity", value: "ANAC approved" },
    ],
    caveat: CAVEAT_EN,
  },
];

const BY_LOCALE: Record<Locale, Product[]> = { pt: PT, en: EN };

export function getProducts(locale: Locale): Product[] {
  return BY_LOCALE[locale] ?? PT;
}
export function getProduct(locale: Locale, slug: string): Product | undefined {
  return getProducts(locale).find((p) => p.slug === slug);
}
export const ALL_PRODUCT_SLUGS: string[] = PT.map((p) => p.slug);
