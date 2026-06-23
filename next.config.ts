import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Raiz explícita do projeto — evita o Turbopack inferir um package-lock.json
// ancestral (ex.: o da home do usuário) como root do workspace.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Static Export — gera pasta /out para deploy no Cloudflare Pages
  output: "export",

  // Cloudflare Pages não suporta Image Optimization server-side
  // Usamos unoptimized para manter as imagens funcionando no export estático
  images: {
    unoptimized: true,
  },

  // Trailing slash para compatibilidade com Cloudflare Pages routing
  trailingSlash: true,

  // Fixa a raiz do workspace (some o warning de múltiplos lockfiles)
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
