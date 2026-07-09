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
  {
    slug: "corrosao-aeronautica-superficie-primeira-defesa",
    tag: "Química Aeronáutica",
    date: "28 OUT 2025",
    readingTime: "5 min",
    image: IMG.pu,
    title: "Corrosão aeronáutica: por que a superfície é a primeira defesa",
    excerpt:
      "A corrosão não começa por dentro. Ela começa onde a superfície deixa de ser cuidada — e é ali que a defesa também começa.",
    body: [
      { type: "p", text: "A corrosão é um dos inimigos mais silenciosos de uma aeronave. Age lentamente, muitas vezes invisível, comprometendo estruturas metálicas antes de dar sinais evidentes." },
      { type: "h2", text: "Por que a aviação é especialmente vulnerável" },
      { type: "p", text: "Aeronaves operam em condições que aceleram a corrosão: umidade, variação térmica, altitude, poluentes atmosféricos e, em muitos casos, ambientes salinos. Cada ciclo de voo expõe a superfície a agentes agressivos." },
      { type: "p", text: "A estrutura metálica é protegida por camadas — o revestimento e a pintura são a primeira barreira entre o metal e o ambiente. Quando essa barreira é comprometida, o processo corrosivo encontra caminho." },
      { type: "h2", text: "A superfície como linha de defesa" },
      { type: "p", text: "Preservar a integridade da superfície não é uma questão estética apenas. Uma pintura íntegra e bem cuidada mantém a barreira de proteção funcionando; contaminações e produtos inadequados podem abrir brechas nessa defesa." },
      { type: "ul", items: [
        "Manter o revestimento íntegro e limpo",
        "Usar apenas produtos que não agridem a pintura",
        "Remover contaminantes com química compatível com aviação",
      ] },
      { type: "p", text: "Por isso o cuidado com a superfície — com insumos formulados e homologados para o contexto aeronáutico — é, na prática, uma medida de prevenção de corrosão, e não só de aparência." },
      { type: "quote", text: "Cuidar da superfície de uma aeronave é cuidar da sua primeira linha de defesa contra a corrosão." },
    ],
  },
  {
    slug: "homologacao-certificacao-conformidade-diferenca",
    tag: "Regulação",
    date: "14 OUT 2025",
    readingTime: "6 min",
    image: IMG.docs,
    title: "Homologação, certificação e conformidade: qual a diferença",
    excerpt:
      "Três palavras que parecem sinônimos, mas dizem coisas diferentes. Entender cada uma é entender o que realmente respalda um produto aeronáutico.",
    body: [
      { type: "p", text: "No universo da química aeronáutica, três termos aparecem o tempo todo — homologação, certificação e conformidade. Usados como sinônimos no dia a dia, eles têm significados distintos e complementares." },
      { type: "h2", text: "Homologação" },
      { type: "p", text: "Homologar é o ato de uma autoridade reconhecer formalmente que um produto atende aos requisitos para uso em determinado contexto. No Brasil, a homologação de produtos aeronáuticos passa pela ANAC — é o reconhecimento oficial de aptidão." },
      { type: "h2", text: "Certificação" },
      { type: "p", text: "Certificar é atestar, por meio de ensaios e avaliação, que algo cumpre um padrão. Um produto pode ser certificado por ter passado em testes específicos, comprovando propriedades e comportamento." },
      { type: "h2", text: "Conformidade" },
      { type: "p", text: "Conformidade é a adequação a uma norma ou especificação. Estar em conformidade AMS, por exemplo, significa que o produto foi desenvolvido segundo as especificações aeroespaciais de referência." },
      { type: "p", text: "Na prática, os três se somam: um produto sério é desenvolvido em conformidade com padrões técnicos, tem propriedades comprovadas por ensaios e é homologado pela autoridade competente. Faltando qualquer um, resta uma lacuna." },
      { type: "quote", text: "Homologação, certificação e conformidade não competem entre si — juntas, formam a garantia de que um produto aeronáutico é o que diz ser." },
    ],
  },
  {
    slug: "aluminio-compositos-superficies-aeronauticas",
    tag: "Química Aeronáutica",
    date: "30 SET 2025",
    readingTime: "5 min",
    image: IMG.ams,
    title: "Alumínio e compósitos: os materiais das superfícies aeronáuticas",
    excerpt:
      "Cada superfície de uma aeronave tem uma composição — e cada composição pede um cuidado próprio. Conheça os materiais que você está tratando.",
    body: [
      { type: "p", text: "Antes de tratar qualquer superfície aeronáutica, é preciso entender do que ela é feita. A aviação combina materiais distintos, cada um com propriedades e sensibilidades próprias." },
      { type: "h2", text: "Ligas de alumínio" },
      { type: "p", text: "O alumínio, em suas ligas aeronáuticas, é o material clássico das fuselagens. Leve e resistente, é também suscetível à corrosão quando exposto — por isso recebe revestimentos protetores e pintura." },
      { type: "h2", text: "Materiais compósitos" },
      { type: "p", text: "Aeronaves modernas incorporam cada vez mais compósitos — como fibra de carbono — em áreas estruturais e de acabamento. São materiais leves e rígidos, mas que respondem de forma diferente do metal a produtos químicos e abrasão." },
      { type: "h2", text: "Vidros, acrílicos e coatings do fabricante" },
      { type: "p", text: "Para-brisas, vigias e certas superfícies recebem coatings específicos do fabricante. Aplicar produtos inadequados sobre eles pode comprometer proteções que não devem ser tocadas — daí a importância de sempre consultar o manual da aeronave." },
      { type: "p", text: "Conhecer o material é o que separa o cuidado técnico do improviso. Cada superfície tem uma química, e a linha AEROCARE é desenvolvida considerando esse contexto — sempre com a recomendação de consultar o manual do fabricante antes de qualquer aplicação." },
      { type: "quote", text: "Não existe “produto para tudo” em aviação: existe o produto certo para cada material — e o manual do fabricante como palavra final." },
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
  "corrosao-aeronautica-superficie-primeira-defesa": {
    tag: "Aeronautical Chemistry",
    title: "Aeronautical corrosion: why the surface is the first line of defense",
    excerpt: "Corrosion doesn't start on the inside. It starts where the surface stops being cared for — and that's where the defense starts too.",
  },
  "homologacao-certificacao-conformidade-diferenca": {
    tag: "Regulation",
    title: "Homologation, certification and conformity: what's the difference",
    excerpt: "Three words that sound like synonyms but mean different things. Understanding each is understanding what really backs an aeronautical product.",
  },
  "aluminio-compositos-superficies-aeronauticas": {
    tag: "Aeronautical Chemistry",
    title: "Aluminum and composites: the materials of aircraft surfaces",
    excerpt: "Every aircraft surface has a composition — and each one calls for its own care. Know the materials you're treating.",
  },
};

// Corpos traduzidos (mesma estrutura de blocos do PT). Slug sem entrada aqui
// cai no corpo PT via fallback no gerador de EN abaixo.
const EN_BODIES: Record<string, ArticleBlock[]> = {
  "produto-homologado-anac": [
    { type: "p", text: "The homologation of an aeronautical chemical product is the formal recognition that it has been assessed and deemed fit for use on aircraft, within the criteria of the civil aviation authority. In Brazil, that authority is ANAC — the National Civil Aviation Agency." },
    { type: "h2", text: "Why a product needs to be homologated" },
    { type: "p", text: "An aircraft operates under extreme variations in temperature, pressure and stress. Any material applied to its surface — from a paint to a polishing compound — can interact with the coating, the structure or sensitive systems. Products without technical assessment introduce an unknown variable into that environment." },
    { type: "p", text: "Homologation exists to remove that uncertainty: it verifies that the product has a controlled composition and predictable behavior, and that it does not compromise the integrity of aeronautical surfaces." },
    { type: "h2", text: "What homologation protects" },
    { type: "ul", items: [
      "The integrity of the aircraft's coating and structure",
      "The documentary compliance required in audits and maintenance",
      "The traceability of what is applied to each surface",
    ] },
    { type: "p", text: "For the operator, using a homologated product is a decision of compliance and risk management — not just of finish. It is the difference between a product fit to touch an aircraft and an uncontrolled variable." },
    { type: "quote", text: "Homologation is documented predictability: the assurance that what is applied to the aircraft was assessed before it ever reached the hangar." },
  ],
  "conformidade-ams-quimicos-aeronauticos": [
    { type: "p", text: "AMS stands for Aerospace Material Specifications — a set of technical specifications maintained by SAE International for materials and processes used in the aerospace industry." },
    { type: "h2", text: "What an AMS specification defines" },
    { type: "p", text: "Each AMS specification describes, in a standardized way, what a material must meet: composition, properties, test methods and acceptance criteria. This lets manufacturers, operators and authorities speak the same technical language, regardless of country." },
    { type: "h2", text: "Why it matters for aeronautical aesthetics" },
    { type: "p", text: "A chemical product that intends to touch aircraft surfaces must sit within that universe of conformity. Being AMS-compliant means the product was formulated and assessed with that standard as a reference — not an automotive or general-purpose norm." },
    { type: "p", text: "For the technical buyer, AMS conformity works as a shortcut to trust: it signals that the product was designed for aerospace rigor from formulation onward." },
    { type: "quote", text: "AMS is the technical grammar of the aerospace industry — and serious aeronautical products are written in that grammar." },
  ],
  "tintas-poliuretano-pu-aviacao": [
    { type: "p", text: "Most modern aircraft receive a polyurethane (PU) paint finish — a high-resistance coating that combines gloss, durability and protection against the elements." },
    { type: "h2", text: "Why PU dominates aviation" },
    { type: "p", text: "Polyurethane forms a hard, chemically stable film capable of withstanding UV radiation, thermal variation and the friction of moving air. It is the balance between aesthetics and resistance that aviation demands." },
    { type: "h2", text: "The care PU requires" },
    { type: "p", text: "Precisely because it is a technical coating, PU responds in specific ways to the products applied over it. Materials formulated for other contexts can attack the film, mark it or compromise the gloss. The AEROCARE line — including the AP 00-20 Polishing Compound — is developed considering the nature of the PU coating." },
    { type: "p", text: "Knowing the material before treating it is the basic principle of aeronautical aesthetics: every surface has a chemistry, and respecting it is what preserves the aircraft's value." },
    { type: "quote", text: "You don't treat an aircraft's paint the way you treat a car's — aeronautical polyurethane is a different material, with different rules." },
  ],
  "quimicos-automotivos-vs-aeronauticos": [
    { type: "p", text: "At first glance, an automotive polish and an aeronautical one may seem equivalent. The difference isn't in the product's appearance, but in everything behind it." },
    { type: "h2", text: "Certification requirement" },
    { type: "p", text: "Automotive products don't go through — and don't need to go through — aviation's conformity criteria. There is no assessment of how they interact with aeronautical coatings, nor traceability compatible with maintenance audits." },
    { type: "h2", text: "A difference in risk" },
    { type: "p", text: "On a car, a finishing error is cosmetic. On an aircraft, the surface is part of a system where integrity and documentation matter. Applying a non-homologated product introduces an uncontrolled variable into an environment that exists precisely to eliminate variables." },
    { type: "ul", items: [
      "Composition assessed for aeronautical surfaces",
      "Documentary conformity (ANAC / AMS)",
      "Predictable behavior over the coating",
    ] },
    { type: "p", text: "It isn't a question of better or worse quality, but of context: the right product is the one made and homologated for the environment in which it will be used." },
  ],
  "como-ler-tds-fispq": [
    { type: "p", text: "Every serious chemical product comes with two documents: the Technical Data Sheet (TDS) and the Safety Data Sheet (SDS — known in Brazil as the FISPQ). They aren't bureaucracy: they are the product's technical identity." },
    { type: "h2", text: "What the TDS tells you" },
    { type: "p", text: "The TDS describes what the product is and how to use it: characteristics, recommended application, yield and precautions. It's the document that answers the question 'does this product do what I need?'." },
    { type: "h2", text: "What the SDS tells you" },
    { type: "p", text: "The SDS deals with safety: composition, hazards, handling, storage and first aid. It's the document that answers 'how do I use and store this safely?'." },
    { type: "h2", text: "How to use both in a purchase decision" },
    { type: "ul", items: [
      "Confirm the recommended application in the TDS before buying",
      "Check the conformities and certifications cited",
      "Read the SDS for correct storage and handling",
    ] },
    { type: "p", text: "A manufacturer that provides clear TDS and SDS is, in practice, saying it has nothing to hide about what it sells." },
  ],
  "preservacao-estetica-aeronautica-principios": [
    { type: "p", text: "An aircraft's aesthetics is usually read as appearance. In practice, it's the visible layer of something deeper: the integrity of the surface that protects the structure." },
    { type: "h2", text: "Aesthetics as value" },
    { type: "p", text: "A well-preserved aircraft signals operational care and sustains its own asset value. The surface is the first indicator of how the asset is treated over time." },
    { type: "h2", text: "Aesthetics as conformity" },
    { type: "p", text: "Preserving the coating correctly — with adequate, documented products — is also a matter of conformity. What is applied to the aircraft becomes part of its technical history." },
    { type: "h2", text: "Principles that underpin the care" },
    { type: "ul", items: [
      "Know the surface material before treating it",
      "Use only products formulated and homologated for aviation",
      "Document what is applied",
      "Prioritize predictability over improvisation",
    ] },
    { type: "p", text: "Serious aesthetic preservation isn't about immediate gloss, but about keeping, over time, a surface that is intact, compliant and valued." },
  ],
  "corrosao-aeronautica-superficie-primeira-defesa": [
    { type: "p", text: "Corrosion is one of an aircraft's most silent enemies. It acts slowly, often invisibly, compromising metal structures before showing clear signs." },
    { type: "h2", text: "Why aviation is especially vulnerable" },
    { type: "p", text: "Aircraft operate in conditions that accelerate corrosion: humidity, thermal variation, altitude, atmospheric pollutants and, in many cases, saline environments. Every flight cycle exposes the surface to aggressive agents." },
    { type: "p", text: "The metal structure is protected by layers — the coating and paint are the first barrier between the metal and the environment. When that barrier is compromised, the corrosive process finds its way in." },
    { type: "h2", text: "The surface as a line of defense" },
    { type: "p", text: "Preserving the integrity of the surface isn't just an aesthetic matter. An intact, well-cared-for paint keeps the protective barrier working; contaminants and inadequate products can open gaps in that defense." },
    { type: "ul", items: [
      "Keep the coating intact and clean",
      "Use only products that don't attack the paint",
      "Remove contaminants with aviation-compatible chemistry",
    ] },
    { type: "p", text: "That's why caring for the surface — with materials formulated and homologated for the aeronautical context — is, in practice, a corrosion-prevention measure, not just a matter of appearance." },
    { type: "quote", text: "Caring for an aircraft's surface means caring for its first line of defense against corrosion." },
  ],
  "homologacao-certificacao-conformidade-diferenca": [
    { type: "p", text: "In the world of aeronautical chemistry, three terms come up constantly — homologation, certification and conformity. Used as synonyms in everyday talk, they have distinct and complementary meanings." },
    { type: "h2", text: "Homologation" },
    { type: "p", text: "To homologate is the act of an authority formally recognizing that a product meets the requirements for use in a given context. In Brazil, the homologation of aeronautical products goes through ANAC — it's the official recognition of fitness." },
    { type: "h2", text: "Certification" },
    { type: "p", text: "To certify is to attest, through testing and assessment, that something meets a standard. A product can be certified for having passed specific tests, proving its properties and behavior." },
    { type: "h2", text: "Conformity" },
    { type: "p", text: "Conformity is adherence to a norm or specification. Being 'AMS-compliant', for example, means the product was developed according to the reference aerospace specifications." },
    { type: "p", text: "In practice, the three add up: a serious product is developed in conformity with technical standards, has properties proven by testing, and is homologated by the competent authority. Missing any one of them leaves a gap." },
    { type: "quote", text: "Homologation, certification and conformity don't compete with each other — together, they form the assurance that an aeronautical product is what it claims to be." },
  ],
  "aluminio-compositos-superficies-aeronauticas": [
    { type: "p", text: "Before treating any aeronautical surface, you need to understand what it's made of. Aviation combines distinct materials, each with its own properties and sensitivities." },
    { type: "h2", text: "Aluminum alloys" },
    { type: "p", text: "Aluminum, in its aeronautical alloys, is the classic material of fuselages. Light and strong, it is also susceptible to corrosion when exposed — which is why it receives protective coatings and paint." },
    { type: "h2", text: "Composite materials" },
    { type: "p", text: "Modern aircraft increasingly incorporate composites — such as carbon fiber — in structural and finishing areas. They are light and rigid materials, but they respond differently from metal to chemicals and abrasion." },
    { type: "h2", text: "Glass, acrylics and manufacturer coatings" },
    { type: "p", text: "Windshields, windows and certain surfaces receive specific manufacturer coatings. Applying inadequate products over them can compromise protections that must not be touched — hence the importance of always consulting the aircraft manual." },
    { type: "p", text: "Knowing the material is what separates technical care from improvisation. Every surface has a chemistry, and the AEROCARE line is developed considering this context — always with the recommendation to consult the manufacturer's manual before any application." },
    { type: "quote", text: "There's no 'product for everything' in aviation: there's the right product for each material — and the manufacturer's manual as the final word." },
  ],
};

const EN: Article[] = PT.map((a) => {
  const c = EN_CARDS[a.slug];
  return { ...a, tag: c.tag, title: c.title, excerpt: c.excerpt, body: EN_BODIES[a.slug] ?? a.body };
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
