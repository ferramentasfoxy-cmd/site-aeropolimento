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

  hero: {
    badge: "Aviation & MRO",
    titleLine1: "Aesthetics.",
    titleLine2: "Aeronautics.",
    subtitle:
      "Pure formulations engineered for rigorous aircraft detailing. From severe oxidation removal to final protection — with safety and international approval.",
    cta: "Explore Products",
    cert1Label: "Certification",
    cert1Value: "AMS Compliance",
    cert2Label: "MRO Quality",
    cert2Value: "International Standard",
    rotate360: "Rotate 360°",
    rotateHint: "interact with the bottle",
  },

  brands: {
    trustLine: "Companies that trust the Brazilian benchmark",
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
    statIda: "International Member",
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
        desc: "The technical process is elevated by cutting-edge engineering collaborations. Our development was validated alongside the laboratories of major aviation powers, such as Embraer.",
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
    items: [
      {
        title: "APC — All Purpose Cleaner",
        description:
          "High-performance multipurpose cleaner. Removes contamination from fuselage, landing gear and interiors without compromising paint or coatings.",
      },
      {
        title: "Liquid Wax",
        description:
          "Protective layer against UV rays and environmental contaminants. Restores and maintains fuselage gloss for weeks after application.",
      },
      {
        title: "Polishing Compound",
        description:
          "Correction compound for polyester and polyurethane painted surfaces. Removes micro-scratches and marks without aggression, restoring the finish.",
      },
    ],
  },

  blog: {
    cornerCode: "SEC 09 / B2B INTELLIGENCE",
    label: "Strategic Intelligence",
    title: "Exclusive Content.",
    subtitle:
      "Protocol manuals, supply-market analyses, chemical regulations and technical white papers. Straight from the laboratories to your hangar.",
    viewAll: "View All",
    readArticle: "Read full article",
    newsletterTitle: "Newsletter",
    newsletterPro: "PRO",
    newsletterDesc:
      "Regulatory updates, new chemistries and monthly ANAC protocols delivered to authorized executives.",
    emailPlaceholder: "Enter your corporate email",
    subscribe: "Subscribe",
    subscribed: "Subscription Confirmed",
    emailError: "Please enter a valid corporate email address.",
    posts: [
      {
        tag: "Technical Article",
        date: "April 15, 2026",
        title: "The evolution of ceramic sealants in executive aviation",
        excerpt:
          "Discover how SiO2 nanoparticles protect leading edges against extreme friction and degradation at transonic speeds.",
      },
      {
        tag: "Standards",
        date: "March 22, 2026",
        title: "What does aeronautical certification really demand?",
        excerpt:
          "A deep dive into the fine print of structural degradation testing and why high-demand hangars require this technical rigor.",
      },
      {
        tag: "Case Studies",
        date: "February 5, 2026",
        title: "Radomes: protective integrity of the equipment",
        excerpt:
          "An analytical study of abrasion and correction: ensuring absolute safety at the aircraft nose without interfering with weather-radar signals.",
      },
    ],
  },

  contact: {
    cornerCode: "SEC 10 / B2B OPERATIONS",
    cornerCoords: "HUB COORDINATES",
    kicker: "B2B Connection",
    title: "Start your operations.",
    subtitle:
      "Technical support, bulk quotes, or applying to become a certified distributor of our line.",
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
