import type { Locale } from "@/i18n/LanguageProvider";

// ─────────────────────────────────────────────────────────────
// Conteúdo do blog — fonte única (fora do dicionário i18n, que é
// compilado com shape fixo). Static-export safe: dados puros, sem MDX.
//
// Regra inegociável: 100% institucional/educacional. Nunca serviços.
// Zero claim de performance fabricado — conteúdo regulatório/geral.
//
// Bilíngue: `pt` é a fonte primária (redigida). `en` traz as strings de
// card (title/excerpt/tag) traduzidas; o corpo cai no PT via getArticle
// enquanto a tradução dos artigos não é feita (política PT-first do site).
// ─────────────────────────────────────────────────────────────

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Article {
  slug: string;
  tag: string;
  /** Data de exibição, ex.: "15 ABR 2026". */
  date: string;
  /** Estimativa de leitura, ex.: "6 min". */
  readingTime: string;
  image: string;
  title: string;
  excerpt: string;
  body: ArticleBlock[];
}

// Imagens on-topic (mantidas em Unsplash por ora — decisão do cliente;
// migrar p/ hospedagem local/marca depois p/ não depender de CDN externo).
const IMG = {
  anac: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
  ams: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  pu: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2670&auto=format&fit=crop",
  auto: "https://images.unsplash.com/photo-1559091605-e99d8d69784e?q=80&w=2755&auto=format&fit=crop",
  docs: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
  preserv: "https://images.unsplash.com/photo-1544015759-247ab1889072?q=80&w=2670&auto=format&fit=crop",
};

const PT: Article[] = [
  {
    slug: "produto-homologado-anac",
    tag: "Regulação",
    date: "15 ABR 2026",
    readingTime: "6 min",
    image: IMG.anac,
    title: "O que significa um produto homologado pela ANAC",
    excerpt:
      "Homologação não é selo decorativo: é o que separa um insumo apto a tocar uma aeronave de uma variável fora de controle.",
    body: [
      { type: "p", text: "A homologação de um produto químico aeronáutico é o reconhecimento formal de que ele foi avaliado e considerado apto para uso em aeronaves, dentro dos critérios da autoridade de aviação civil. No Brasil, essa autoridade é a ANAC — Agência Nacional de Aviação Civil." },
      { type: "h2", text: "Por que um insumo precisa ser homologado" },
      { type: "p", text: "Uma aeronave opera sob variações extremas de temperatura, pressão e esforço. Qualquer material aplicado sobre sua superfície — de uma tinta a uma massa de polir — pode interagir com o revestimento, com a estrutura ou com sistemas sensíveis. Produtos sem avaliação técnica introduzem uma variável desconhecida nesse ambiente." },
      { type: "p", text: "A homologação existe para eliminar essa incerteza: ela verifica que o produto tem composição controlada e comportamento previsível, e que não compromete a integridade das superfícies aeronáuticas." },
      { type: "h2", text: "O que a homologação protege" },
      { type: "ul", items: [
        "A integridade do revestimento e da estrutura da aeronave",
        "A conformidade documental exigida em auditorias e manutenção",
        "A rastreabilidade do que é aplicado em cada superfície",
      ] },
      { type: "p", text: "Para o operador, usar um produto homologado é uma decisão de conformidade e de gestão de risco — não apenas de acabamento. É a diferença entre um insumo apto a tocar uma aeronave e uma variável não controlada." },
      { type: "quote", text: "Homologação é previsibilidade documentada: a garantia de que o que se aplica sobre a aeronave já foi avaliado antes de chegar ao hangar." },
    ],
  },
  {
    slug: "conformidade-ams-quimicos-aeronauticos",
    tag: "Normalização",
    date: "22 MAR 2026",
    readingTime: "5 min",
    image: IMG.ams,
    title: "Conformidade AMS: o padrão que rege os químicos aeronáuticos",
    excerpt:
      "Antes de existir um selo nacional, existe um padrão internacional. Entenda o que são as especificações AMS e por que são a referência do setor.",
    body: [
      { type: "p", text: "AMS é a sigla de Aerospace Material Specifications — um conjunto de especificações técnicas mantido pela SAE International para materiais e processos usados na indústria aeroespacial." },
      { type: "h2", text: "O que uma especificação AMS define" },
      { type: "p", text: "Cada especificação AMS descreve, de forma padronizada, o que um material precisa cumprir: composição, propriedades, métodos de ensaio e critérios de aceitação. Isso permite que fabricantes, operadores e autoridades falem a mesma língua técnica, independentemente do país." },
      { type: "h2", text: "Por que isso importa para a estética aeronáutica" },
      { type: "p", text: "Um produto químico que se propõe a tocar superfícies de aeronave precisa se situar dentro desse universo de conformidade. Estar em conformidade AMS significa que o produto foi formulado e avaliado tendo esse padrão como referência — não uma norma automotiva ou de uso geral." },
      { type: "p", text: "Para o comprador técnico, a conformidade AMS funciona como um atalho de confiança: indica que o produto foi pensado para o rigor aeroespacial desde a formulação." },
      { type: "quote", text: "AMS é a gramática técnica da indústria aeroespacial — e produtos aeronáuticos sérios são escritos nessa gramática." },
    ],
  },
  {
    slug: "tintas-poliuretano-pu-aviacao",
    tag: "Química Aeronáutica",
    date: "05 FEV 2026",
    readingTime: "5 min",
    image: IMG.pu,
    title: "Tintas poliuretano (PU) na aviação: o que são e como se comportam",
    excerpt:
      "O revestimento PU é o padrão da pintura aeronáutica moderna. Entender sua natureza é o primeiro passo para preservá-lo corretamente.",
    body: [
      { type: "p", text: "A maior parte das aeronaves modernas recebe acabamento em tinta poliuretano (PU) — um revestimento de alta resistência que combina brilho, durabilidade e proteção contra intempéries." },
      { type: "h2", text: "Por que o PU domina a aviação" },
      { type: "p", text: "O poliuretano forma uma película dura e quimicamente estável, capaz de suportar radiação UV, variação térmica e o atrito do ar em deslocamento. É o equilíbrio entre estética e resistência que a aviação exige." },
      { type: "h2", text: "O cuidado que o PU pede" },
      { type: "p", text: "Justamente por ser um revestimento técnico, o PU responde de forma específica aos produtos aplicados sobre ele. Insumos formulados para outros contextos podem agredir a película, marcar ou comprometer o brilho. A linha AEROCARE — incluindo a Massa de Polir AP 00-20 — é desenvolvida considerando a natureza do revestimento PU." },
      { type: "p", text: "Conhecer o material antes de tratá-lo é o princípio básico da estética aeronáutica: cada superfície tem uma química, e respeitá-la é o que preserva o valor da aeronave." },
      { type: "quote", text: "Não se trata a pintura de uma aeronave como se trata a de um carro — o poliuretano aeronáutico é outro material, com outras regras." },
    ],
  },
  {
    slug: "quimicos-automotivos-vs-aeronauticos",
    tag: "Boas Práticas",
    date: "18 JAN 2026",
    readingTime: "4 min",
    image: IMG.auto,
    title: "Por que produtos automotivos não servem para aeronaves",
    excerpt:
      "Parecem a mesma coisa na prateleira. Na superfície de uma aeronave, a diferença é de conformidade, risco e responsabilidade.",
    body: [
      { type: "p", text: "À primeira vista, um polidor automotivo e um aeronáutico podem parecer equivalentes. A diferença não está na aparência do produto, mas em tudo o que existe por trás dele." },
      { type: "h2", text: "Exigência de certificação" },
      { type: "p", text: "Produtos automotivos não passam — e não precisam passar — pelos critérios de conformidade da aviação. Não há avaliação sobre como interagem com revestimentos aeronáuticos, nem rastreabilidade compatível com auditorias de manutenção." },
      { type: "h2", text: "Diferença de risco" },
      { type: "p", text: "No carro, um erro de acabamento é estético. Na aeronave, a superfície faz parte de um sistema onde integridade e documentação importam. Aplicar um insumo não homologado introduz uma variável fora de controle em um ambiente que existe justamente para eliminar variáveis." },
      { type: "ul", items: [
        "Composição avaliada para superfícies aeronáuticas",
        "Conformidade documental (ANAC / AMS)",
        "Previsibilidade de comportamento sobre o revestimento",
      ] },
      { type: "p", text: "Não é uma questão de qualidade melhor ou pior, e sim de contexto: o produto certo é o que foi feito e homologado para o ambiente em que será usado." },
    ],
  },
  {
    slug: "como-ler-tds-fispq",
    tag: "Documentação",
    date: "09 DEZ 2025",
    readingTime: "5 min",
    image: IMG.docs,
    title: "Como ler uma Ficha Técnica (TDS) e uma FISPQ",
    excerpt:
      "Dois documentos dizem quase tudo sobre um produto químico. Saber lê-los é o que separa uma compra técnica de um palpite.",
    body: [
      { type: "p", text: "Todo produto químico sério vem acompanhado de dois documentos: a Ficha Técnica (TDS — Technical Data Sheet) e a Ficha de Informações de Segurança (FISPQ / SDS). Eles não são burocracia: são a identidade técnica do produto." },
      { type: "h2", text: "O que a TDS informa" },
      { type: "p", text: "A TDS descreve o que o produto é e como usá-lo: características, aplicação recomendada, rendimento e cuidados. É o documento que responde à pergunta “este produto serve para o que eu preciso?”." },
      { type: "h2", text: "O que a FISPQ informa" },
      { type: "p", text: "A FISPQ trata de segurança: composição, riscos, manuseio, armazenamento e primeiros socorros. É o documento que responde a “como uso e guardo isto com segurança?”." },
      { type: "h2", text: "Como usar os dois na decisão de compra" },
      { type: "ul", items: [
        "Confirme a aplicação recomendada na TDS antes de comprar",
        "Verifique as conformidades e certificações citadas",
        "Leia a FISPQ para armazenamento e manuseio corretos",
      ] },
      { type: "p", text: "Um fabricante que disponibiliza TDS e FISPQ claras está dizendo, na prática, que não tem nada a esconder sobre o que vende." },
    ],
  },
  {
    slug: "preservacao-estetica-aeronautica-principios",
    tag: "Institucional",
    date: "20 NOV 2025",
    readingTime: "4 min",
    image: IMG.preserv,
    title: "Preservação estética aeronáutica: princípios fundamentais",
    excerpt:
      "Estética aeronáutica não é vaidade — é valor, conformidade e integridade de superfície. Os princípios que sustentam esse cuidado.",
    body: [
      { type: "p", text: "A estética de uma aeronave costuma ser lida como aparência. Na prática, ela é a camada visível de algo mais profundo: a integridade da superfície que protege a estrutura." },
      { type: "h2", text: "Estética como valor" },
      { type: "p", text: "Uma aeronave bem preservada comunica cuidado operacional e sustenta o próprio valor patrimonial. A superfície é o primeiro indicador de como o ativo é tratado ao longo do tempo." },
      { type: "h2", text: "Estética como conformidade" },
      { type: "p", text: "Preservar corretamente o revestimento — com produtos adequados e documentados — é também uma questão de conformidade. O que se aplica sobre a aeronave faz parte do seu histórico técnico." },
      { type: "h2", text: "Princípios que sustentam o cuidado" },
      { type: "ul", items: [
        "Conhecer o material da superfície antes de tratá-lo",
        "Usar apenas insumos formulados e homologados para aviação",
        "Documentar o que é aplicado",
        "Priorizar previsibilidade sobre improviso",
      ] },
      { type: "p", text: "Preservação estética séria não é sobre brilho imediato, e sim sobre manter, ao longo do tempo, uma superfície íntegra, conforme e valorizada." },
    ],
  },
];

// EN: strings de card traduzidas; corpo cai no PT via getArticle (PT-first).
const EN_CARDS: Record<string, { tag: string; title: string; excerpt: string }> = {
  "produto-homologado-anac": {
    tag: "Regulation",
    title: "What ANAC homologation actually means",
    excerpt: "Homologation isn't a decorative seal: it's what separates a product fit to touch an aircraft from an uncontrolled variable.",
  },
  "conformidade-ams-quimicos-aeronauticos": {
    tag: "Standards",
    title: "AMS conformity: the standard behind aeronautical chemicals",
    excerpt: "Before a national seal, there's an international standard. Understand what AMS specifications are and why they're the industry's reference.",
  },
  "tintas-poliuretano-pu-aviacao": {
    tag: "Aeronautical Chemistry",
    title: "Polyurethane (PU) paints in aviation: what they are and how they behave",
    excerpt: "PU coating is the standard of modern aircraft paint. Understanding its nature is the first step to preserving it correctly.",
  },
  "quimicos-automotivos-vs-aeronauticos": {
    tag: "Best Practices",
    title: "Why automotive products don't belong on aircraft",
    excerpt: "They look identical on the shelf. On an aircraft surface, the difference is conformity, risk and responsibility.",
  },
  "como-ler-tds-fispq": {
    tag: "Documentation",
    title: "How to read a Technical Data Sheet (TDS) and an SDS",
    excerpt: "Two documents tell you almost everything about a chemical product. Reading them is what separates a technical purchase from a guess.",
  },
  "preservacao-estetica-aeronautica-principios": {
    tag: "Institutional",
    title: "Aeronautical aesthetic preservation: core principles",
    excerpt: "Aeronautical aesthetics isn't vanity — it's value, conformity and surface integrity. The principles behind that care.",
  },
};

const EN: Article[] = PT.map((a) => {
  const c = EN_CARDS[a.slug];
  return { ...a, tag: c.tag, title: c.title, excerpt: c.excerpt };
});

const BY_LOCALE: Record<Locale, Article[]> = { pt: PT, en: EN };

export function getArticles(locale: Locale): Article[] {
  return BY_LOCALE[locale] ?? PT;
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

/** Todos os slugs (idênticos entre idiomas) — para generateStaticParams. */
export const ALL_ARTICLE_SLUGS: string[] = PT.map((a) => a.slug);
