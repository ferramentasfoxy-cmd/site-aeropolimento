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
};
