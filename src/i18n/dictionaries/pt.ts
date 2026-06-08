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

  brands: {
    trustLine: "Empresas que confiam na referência brasileira",
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
    statIda: "Membro Internacional",
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
        desc: "O processo técnico é elevado por colaborações de engenharia de ponta. Nosso desenvolvimento foi validado juntamente aos laboratórios de grandes potências da aviação, como a Embraer.",
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
    items: [
      {
        title: "APC — All Purpose Cleaner",
        description:
          "Limpador multiuso de alta performance. Remove contaminações de fuselagem, trem de pouso e interiores sem comprometer pinturas ou revestimentos.",
      },
      {
        title: "Cera Líquida",
        description:
          "Camada protetora contra raios UV e contaminantes ambientais. Restaura e mantém o brilho da fuselagem por semanas após a aplicação.",
      },
      {
        title: "Massa de Polir",
        description:
          "Composto de correção para superfícies com pintura poliéster e poliuretano. Elimina micro-riscos e marcas sem agressividade, restaurando o acabamento.",
      },
    ],
  },

  blog: {
    cornerCode: "SEC 09 / INTELIGÊNCIA B2B",
    label: "Inteligência Estratégica",
    title: "Conteúdo Exclusivo.",
    subtitle:
      "Manuais de protocolo, análises de mercado de insumos, regulamentações químicas e white papers técnicos. Direto dos laboratórios para seu hangar.",
    viewAll: "Ver Todos",
    readArticle: "Ler artigo completo",
    newsletterTitle: "Newsletter",
    newsletterPro: "PRO",
    newsletterDesc:
      "Informações regulatórias, novas químicas e protocolos ANAC mensais enviados aos executivos autorizados.",
    emailPlaceholder: "Insira seu e-mail corporativo",
    subscribe: "Inscrever-se",
    subscribed: "Inscrição Validada",
    emailError: "Insira um endereço de e-mail corporativo válido.",
    posts: [
      {
        tag: "Artigo Técnico",
        date: "15 de Abril, 2026",
        title: "A evolução dos selantes cerâmicos na aviação executiva",
        excerpt:
          "Descubra como as nanopartículas de SiO2 protegem bordos de ataque contra atrito extremo e degradação em velocidades transônicas.",
      },
      {
        tag: "Normalização",
        date: "22 de Março, 2026",
        title: "O que exige a certificação aeronáutica na prática?",
        excerpt:
          "Um mergulho nas entrelinhas dos testes de degradação estrutural e por que hangares de alta exigência demandam esse rigor técnico.",
      },
      {
        tag: "Estudos de Caso",
        date: "05 de Fevereiro, 2026",
        title: "Radomes: Integridade protetora dos equipamentos",
        excerpt:
          "Análise analítica de abrasão e correção: garantindo segurança absoluta no nariz da aeronave sem interferir em sinais de radar meteorológico.",
      },
    ],
  },

  contact: {
    cornerCode: "SEC 10 / B2B OPERATIONS",
    cornerCoords: "COORDENADAS DE HUB",
    kicker: "Conexão B2B",
    title: "Inicie suas operações.",
    subtitle:
      "Suporte técnico, cotações em massa ou aplicação para se tornar um distribuidor homologado da nossa linha.",
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
