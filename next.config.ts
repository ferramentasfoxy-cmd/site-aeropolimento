import type { NextConfig } from "next";

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
};

export default nextConfig;
