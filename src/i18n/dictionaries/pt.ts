// ── Dicionário PT-BR — fonte da verdade do SHAPE do i18n ──
// Este objeto define a estrutura canônica de todas as traduções.
// `type Dictionary = typeof pt` deriva o contrato; en.ts é obrigado pelo
// compilador a preencher EXATAMENTE as mesmas chaves (e o mesmo shape de arrays).
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

  footer: {
    kicker: "Química Aeronáutica",
    tagline: "Química de alta performance para aviação. Produtos homologados pela ANAC, formulados para asa fixa e rotativa.",
    seal: "Homologado ANAC",
    navTitle: "Navegação",
    lineTitle: "Linha Aerocare",
    contactTitle: "Contato",
    whatsapp: "WhatsApp Comercial",
    email: "E-mail",
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
    madeIn: "Química aeronáutica · Brasil",
    prodApc: "APC — All Purpose Cleaner",
    prodCera: "Cera Líquida",
    prodMassa: "Massa de Polir",
  },

  hero: {
    eyebrow: "QUÍMICA AERONÁUTICA",
    titleLine1: "Estética.",
    titleLine2: "Aeronáutica.",
    subtitle: "A segurança da certificação ANAC aliada ao cuidado que sua aeronave merece: preservação visual e proteção técnica em cada fórmula.",
    ctaPrimary: "Solicitar orçamento",
    ctaPrimaryAria: "Solicitar orçamento comercial",
    ctaSecondary: "Ver certificação ANAC",
    ctaSecondaryAria: "Ver homologação ANAC oficial",
    scrollAria: "Descer para credibilidade",
    scrollLabel: "Scroll",
    hudCertKey: "CERT",
    hudCompatValue: "ASA FIXA/ROTATIVA",
    hudSeal: "HOMOLOGADO ANAC",
  },

  brands: {
    trustLineTop: "Empresas que confiam na",
    trustLineBottom: "referência brasileira",
  },

  about: {
    cornerCode: "SEC 01 / QUEM SOMOS",
    label: "Quem Somos",
    headlineLine1: "A referência brasileira",
    headlineLine2: "em química aeronáutica",
    descBefore:
      "Desde 2013, a Aeropolimento desenvolve produtos químicos de alta performance para o cuidado profissional de aeronaves. Somos a ",
    descHighlight:
      "primeira empresa do Brasil com homologação para fabricação de compostos de polimento e preservação",
    descAfter:
      " — formulados para asa fixa e rotativa —, com conformidade AMS e aprovação oficial ANAC.",
    statYears: "Anos de Mercado",
    statAircraft: "Aeronaves Tratadas",
    statAnac: "Homologação Oficial",
    statAms: "Em Conformidade",
    cards: [
      {
        title: "Missão",
        desc: "Desenvolver produtos químicos de alta performance que preservam aeronaves com rigor técnico, respeitando as normas de cada fabricante e órgão regulador.",
      },
      {
        title: "Visão",
        desc: "Consolidar o padrão brasileiro de química aeronáutica no cenário internacional, com formulações próprias e homologações reconhecidas.",
      },
      {
        title: "Valores",
        desc: "Precisão técnica. Conformidade regulatória. Transparência com cada cliente. Zero atalhos.",
      },
    ],
  },

  anac: {
    badge: "Padrão Ouro da Aviação",
    titleLine1: "A chancela",
    titleLine2: "Oficial ANAC.",
    subtitle:
      "Não basta limpar. Em aviação, o produto químico deve ter segurança estrutural inviolável e certificação das autoridades máximas.",
    sealApproved: "Aprovado",
    sealAms: "AMS Certified",
    cta: "Linha Homologada",
    phaseLabel: "Fase",
    steps: [
      {
        title: "A Jornada da Homologação",
        desc: "A certificação ANAC não é um mero selo comercial. É a chancela máxima da autoridade de aviação civil brasileira, comprovando que o produto preserva rigorosamente a integridade estrutural da aeronave.",
      },
      {
        title: "Critérios Técnicos Implacáveis",
        desc: "Nossos produtos passam por testes extremos de cisalhamento, variação de temperatura, corrosão química e análise molecular em laboratórios credenciados para garantir segurança absoluta em voo.",
      },
      {
        title: "Rigor e Exclusividade",
        desc: "Pelo altíssimo custo de P&D, a imensa maioria dos produtos de mercado não se qualificam. A Aeropolimento investiu anos em formulações puras, consolidando-se no seleto grupo homologado.",
      },
      {
        title: "Parceria Estratégica",
        desc: "O processo técnico é elevado por colaborações de engenharia de ponta. Nosso desenvolvimento foi validado juntamente aos laboratórios de grandes potências da aviação.",
      },
    ],
  },

  products: {
    introBadge: "Apresentando a Linha Aerocare",
    introTitleLine1: "Padrão",
    introTitleLine2: "Aeronáutico",
    introLead: "A química da perfeição e excelência.",
    introParagraph:
      "Foram anos de P&D em laboratórios dedicados à engenharia aeroespacial para criarmos formulações que não apenas limpam, mas preservam e extendem a vida útil da estrutura da aeronave contra intempéries e atmosferas extremas.",
    badgeApproved: "Aprovado ANAC",
    knowMore: "Saiba Mais",
    datasheet: "Ver ficha técnica",
    catalogLabel: "Linha · 3 produtos homologados",
    items: [
      {
        code: "AP-001",
        title: "APC — All Purpose Cleaner",
        lead: "Limpador multiuso de alta performance.",
        description:
          "Limpador multiuso de alta performance. Remove contaminações de fuselagem, trem de pouso e interiores sem comprometer pinturas ou revestimentos.",
        specs: [
          { label: "Tipo", value: "Limpador multiuso" },
          { label: "Aplicação", value: "Fuselagem · Trem de pouso · Interiores" },
          { label: "Conformidade", value: "ANAC" },
        ],
      },
      {
        code: "AP-0010",
        title: "Cera Líquida",
        lead: "Proteção e brilho duradouros para a fuselagem.",
        description:
          "Camada protetora contra raios UV e contaminantes ambientais. Restaura e mantém o brilho da fuselagem por semanas após a aplicação.",
        specs: [
          { label: "Tipo", value: "Cera protetora" },
          { label: "Proteção", value: "Raios UV · Contaminantes" },
          { label: "Conformidade", value: "ANAC" },
        ],
      },
      {
        code: "AP-0020",
        title: "Massa de Polir",
        lead: "Correção precisa, sem agredir a superfície.",
        description:
          "Composto de correção para superfícies com pintura poliéster e poliuretano. Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento.",
        specs: [
          { label: "Tipo", value: "Composto de correção" },
          { label: "Superfícies", value: "Poliéster · Poliuretano" },
          { label: "Conformidade", value: "ANAC" },
        ],
      },
    ],
  },

  blog: {
    cornerCode: "SEC 09 / INTELIGÊNCIA B2B",
    label: "Inteligência Estratégica",
    title: "Conteúdo Exclusivo.",
    subtitle:
      "Artigos técnicos sobre química aeronáutica, homologação ANAC/AMS e preservação de superfícies aeronáuticas.",
    viewAll: "Ver Todos",
    readArticle: "Ler artigo completo",
    backLabel: "Voltar ao Blog",
    relatedLabel: "Continue lendo",
    newsletterTitle: "Newsletter",
    newsletterPro: "PRO",
    newsletterDesc:
      "Atualizações regulatórias, novidades da linha AEROCARE e conteúdo técnico do segmento, direto no seu e-mail.",
    emailPlaceholder: "Insira seu e-mail corporativo",
    subscribe: "Inscrever-se",
    subscribed: "Inscrição Validada",
    emailError: "Insira um endereço de e-mail corporativo válido.",
  },

  contact: {
    cornerCode: "SEC 10 / B2B OPERATIONS",
    cornerCoords: "COORDENADAS DE HUB",
    kicker: "Conexão B2B",
    title: "Inicie suas operações.",
    subtitle:
      "Suporte técnico e cotações em massa da linha AEROCARE. Fale direto com o nosso comercial.",
    infoTitle: "Base de Operações",
    whatsappLabel: "WhatsApp Comercial",
    emailLabel: "Cotações e Ofícios",
    hqLabel: "Sede Brasil",
    hqValue: "Hub Tecnológico — Minas Gerais, Brasil",
    partnerTitle: "Rede de Distribuidores",
    partnerDesc:
      "Acesso a preços de atacado, materiais de marketing e suporte B2B prioritário.",
    partnerCta: "Aplicar Agora",
    tabContact: "Contato Direto",
    tabReseller: "Seja um Revendedor",
    formTitle: "Como podemos ajudar?",
    labelName: "Nome ou Empresa",
    placeholderName: "Ex: Hangar Alpha",
    labelEmail: "E-mail Corporativo",
    placeholderEmail: "seu@email.com",
    labelPhone: "Telefone / WhatsApp",
    placeholderPhone: "+55 (00) 00000-0000",
    labelMessage: "Sua Mensagem",
    placeholderMessage: "Detalhes do seu projeto ou dúvidas técnicas...",
    submit: "Enviar Mensagem",
    processing: "Processando...",
    successContact: "Recebemos sua mensagem com sucesso! Retornaremos em breve.",
    errorContact: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
    resellerTitle: "Programa Oficial de Distribuição",
    resellerDesc:
      "Torne-se um agente autorizado da Aeropolimento na sua região administrativa.",
    benefit1Title: "Preços B2B",
    benefit1Desc: "Margem altamente competitiva para distribuidores ativos.",
    benefit2Title: "Capacitação",
    benefit2Desc: "Treinamento técnico direto nos protocolos do laboratório.",
    labelCompany: "Razão Social",
    labelCnpj: "CNPJ",
    labelRegion: "Região de Atuação (UF)",
    labelRespEmail: "E-mail Responsável",
    resellerSubmit: "Aplicar para Distribuição Especializada",
    sendingApplication: "Enviando Aplicação...",
    successReseller: "Aplicação submetida! Nossa diretoria avaliará seu perfil.",
  },
};

// Contrato derivado do PT. Inferido como `string` (sem `as const`),
// então en.ts pode trazer valores diferentes — mas NUNCA chaves diferentes.
export type Dictionary = typeof pt;
