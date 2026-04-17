import { Hero } from "@/components/sections/Hero/Hero";
import { BrandsMarquee } from "@/components/sections/Brands/BrandsMarquee";
import { AboutSection } from "@/components/sections/About/AboutSection";
import { ProductsSection } from "@/components/sections/Products/ProductsSection";
import { PortfolioSection } from "@/components/sections/Portfolio/PortfolioSection";

export default function Home() {
  return (
    <main className="relative bg-[var(--color-bg-primary)] overflow-x-hidden">
      {/* Bloco 01 - Hero & Header */}
      <Hero />

      {/* Faixa Inferior Rotativa de Clientes Oficiais */}
      <div className="w-full relative z-20 bg-white">
        <BrandsMarquee />
      </div>

      {/* Bloco 02 - Sobre a Empresa */}
      <AboutSection />

      {/* Bloco 03 - Linha de Produtos */}
      <ProductsSection />

      {/* Bloco 04 - Portfólio (Casos de Sucesso) */}
      <PortfolioSection />
    </main>
  );
}
