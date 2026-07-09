// ── English (en) dictionary ──
// Typed against `Dictionary` (derived from pt.ts). The compiler ENFORCES that
// every key present in PT exists here — a missing translation fails the build.
// Tone: Fortune-500 aerospace, institutional. No casual register.

import type { Dictionary } from "./pt";

export const en: Dictionary = {
  nav: {
    sobre: "About",
    produtos: "Products",
    homologacao: "Certification",
    recursos: "Resources",
    contato: "Contact",
    acessarBlog: "Open Blog",
    ariaLanguage: "Select language",
    ariaMenu: "Open navigation menu",
  },

  footer: {
    kicker: "Aviation Chemistry",
    tagline: "High-performance chemistry for aviation. ANAC-approved products, formulated for fixed and rotary wing.",
    seal: "ANAC Approved",
    navTitle: "Navigation",
    lineTitle: "Aerocare Line",
    contactTitle: "Contact",
    whatsapp: "Commercial WhatsApp",
    email: "Email",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    madeIn: "Aviation chemistry · Brazil",
    prodApc: "APC — All Purpose Cleaner",
    prodCera: "Liquid Wax",
    prodMassa: "Polishing Compound",
  },

  hero: {
    eyebrow: "AVIATION CHEMISTRY",
    titleLine1: "Aesthetics.",
    titleLine2: "Aeronautics.",
    subtitle: "The security of ANAC certification combined with the care your aircraft deserves: visual preservation and technical protection in every formula.",
    ctaPrimary: "Request a quote",
    ctaPrimaryAria: "Request a commercial quote",
    ctaSecondary: "View ANAC certification",
    ctaSecondaryAria: "View official ANAC certification",
    scrollAria: "Scroll to credibility",
    scrollLabel: "Scroll",
    hudCertKey: "CERT",
    hudCompatValue: "FIXED/ROTARY WING",
    hudSeal: "ANAC APPROVED",
  },

  brands: {
    trustLineTop: "Companies that trust the",
    trustLineBottom: "Brazilian benchmark",
  },

  about: {
    cornerCode: "SEC 01 / WHO WE ARE",
    label: "Who We Are",
    headlineLine1: "The Brazilian benchmark",
    headlineLine2: "in aeronautical chemistry",
    descBefore:
      "Since 2013, Aeropolimento has developed high-performance chemical products for the professional care of aircraft. We are the ",
    descHighlight:
      "first company in Brazil certified to manufacture polishing and preservation compounds",
    descAfter:
      " — formulated for fixed and rotary wing — with AMS compliance and official ANAC approval.",
    statYears: "Years in Market",
    statAircraft: "Aircraft Treated",
    statAnac: "Official Certification",
    statAms: "In Compliance",
    cards: [
      {
        title: "Mission",
        desc: "To develop high-performance chemical products that preserve aircraft with technical rigor, honoring the standards of every manufacturer and regulator.",
      },
      {
        title: "Vision",
        desc: "To establish the Brazilian standard in aeronautical chemistry on the international stage, with proprietary formulations and recognized certifications.",
      },
      {
        title: "Values",
        desc: "Technical precision. Regulatory compliance. Transparency with every client. Zero shortcuts.",
      },
    ],
  },

  anac: {
    badge: "Aviation Gold Standard",
    titleLine1: "The official",
    titleLine2: "ANAC seal.",
    subtitle:
      "Cleaning is not enough. In aviation, a chemical product must hold inviolable structural safety and certification from the highest authorities.",
    sealApproved: "Approved",
    sealAms: "AMS Certified",
    cta: "Certified Line",
    phaseLabel: "Phase",
    steps: [
      {
        title: "The Certification Journey",
        desc: "ANAC certification is no mere commercial badge. It is the highest endorsement of the Brazilian civil aviation authority, proving that the product rigorously preserves the structural integrity of the aircraft.",
      },
      {
        title: "Uncompromising Technical Criteria",
        desc: "Our products undergo extreme tests of shear, temperature variation, chemical corrosion and molecular analysis in accredited laboratories to ensure absolute in-flight safety.",
      },
      {
        title: "Rigor and Exclusivity",
        desc: "Due to the very high cost of R&D, the vast majority of market products do not qualify. Aeropolimento invested years in pure formulations, securing its place in the select certified group.",
      },
      {
        title: "Strategic Partnership",
        desc: "The technical process is elevated by cutting-edge engineering collaborations. Our development was validated alongside the laboratories of major aviation powers.",
      },
    ],
  },

  products: {
    introBadge: "Introducing the Aerocare Line",
    introTitleLine1: "Aeronautical",
    introTitleLine2: "Standard",
    introLead: "The chemistry of perfection and excellence.",
    introParagraph:
      "Years of R&D in laboratories dedicated to aerospace engineering went into formulations that not only clean, but preserve and extend the service life of the aircraft structure against weathering and extreme atmospheres.",
    badgeApproved: "ANAC Approved",
    knowMore: "Learn More",
    datasheet: "View datasheet",
    catalogLabel: "Line · 3 approved products",
    items: [
      {
        code: "AP-001",
        title: "APC — All Purpose Cleaner",
        lead: "High-performance multipurpose cleaner.",
        description:
          "High-performance multipurpose cleaner. Removes contamination from fuselage, landing gear and interiors without compromising paint or coatings.",
        specs: [
          { label: "Type", value: "Multipurpose cleaner" },
          { label: "Application", value: "Fuselage · Landing gear · Interiors" },
          { label: "Compliance", value: "ANAC" },
        ],
      },
      {
        code: "AP-0010",
        title: "Liquid Wax",
        lead: "Lasting protection and gloss for the fuselage.",
        description:
          "Protective layer against UV rays and environmental contaminants. Restores and maintains fuselage gloss for weeks after application.",
        specs: [
          { label: "Type", value: "Protective wax" },
          { label: "Protection", value: "UV rays · Contaminants" },
          { label: "Compliance", value: "ANAC" },
        ],
      },
      {
        code: "AP-0020",
        title: "Polishing Compound",
        lead: "Precise correction, gentle on the surface.",
        description:
          "Correction compound for polyester and polyurethane painted surfaces. Removes micro-scratches and marks without aggression, restoring the finish.",
        specs: [
          { label: "Type", value: "Correction compound" },
          { label: "Surfaces", value: "Polyester · Polyurethane" },
          { label: "Compliance", value: "ANAC" },
        ],
      },
    ],
  },

  blog: {
    cornerCode: "SEC 09 / B2B INTELLIGENCE",
    label: "Strategic Intelligence",
    title: "Exclusive Content.",
    subtitle:
      "Technical articles on aeronautical chemistry, ANAC/AMS homologation and aircraft surface preservation.",
    viewAll: "View All",
    readArticle: "Read full article",
    backLabel: "Back to Blog",
    relatedLabel: "Keep reading",
    newsletterTitle: "Newsletter",
    newsletterPro: "PRO",
    newsletterDesc:
      "Regulatory updates, AEROCARE line news and technical content from the segment, straight to your inbox.",
    emailPlaceholder: "Enter your corporate email",
    subscribe: "Subscribe",
    subscribed: "Subscription Confirmed",
    emailError: "Please enter a valid corporate email address.",
  },

  contact: {
    cornerCode: "SEC 10 / B2B OPERATIONS",
    cornerCoords: "HUB COORDINATES",
    kicker: "B2B Connection",
    title: "Start your operations.",
    subtitle:
      "Technical support and bulk quotes for the AEROCARE line. Talk directly to our commercial team.",
    infoTitle: "Operations Base",
    whatsappLabel: "Commercial WhatsApp",
    emailLabel: "Quotes & Official Requests",
    hqLabel: "Brazil Headquarters",
    hqValue: "Technology Hub — Minas Gerais, Brazil",
    partnerTitle: "Distributor Network",
    partnerDesc:
      "Access to wholesale pricing, marketing materials and priority B2B support.",
    partnerCta: "Apply Now",
    tabContact: "Direct Contact",
    tabReseller: "Become a Reseller",
    formTitle: "How can we help?",
    labelName: "Name or Company",
    placeholderName: "e.g. Hangar Alpha",
    labelEmail: "Corporate Email",
    placeholderEmail: "you@email.com",
    labelPhone: "Phone / WhatsApp",
    placeholderPhone: "+1 (000) 000-0000",
    labelMessage: "Your Message",
    placeholderMessage: "Details of your project or technical questions...",
    submit: "Send Message",
    processing: "Processing...",
    successContact: "We received your message successfully! We'll get back to you shortly.",
    errorContact: "We couldn't send it right now. Please try again or reach us on WhatsApp.",
    resellerTitle: "Official Distribution Program",
    resellerDesc:
      "Become an authorized Aeropolimento agent in your administrative region.",
    benefit1Title: "B2B Pricing",
    benefit1Desc: "Highly competitive margins for active distributors.",
    benefit2Title: "Training",
    benefit2Desc: "Technical training direct from the laboratory protocols.",
    labelCompany: "Legal Name",
    labelCnpj: "Tax ID (CNPJ)",
    labelRegion: "Region of Operation (State)",
    labelRespEmail: "Responsible Email",
    resellerSubmit: "Apply for Specialized Distribution",
    sendingApplication: "Submitting Application...",
    successReseller: "Application submitted! Our board will review your profile.",
  },
};
