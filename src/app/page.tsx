import { Hero } from "@/components/sections/Hero/Hero";
import { BrandsMarquee } from "@/components/sections/Brands/BrandsMarquee";
import { AboutSection } from "@/components/sections/About/AboutSection";
import { AnacSection } from "@/components/sections/Anac/AnacSection";
import { ProductsSection } from "@/components/sections/Products/ProductsSection";
import { BlogSection } from "@/components/sections/Blog/BlogSection";
import { ContactSection } from "@/components/sections/Contact/ContactSection";

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

      {/* Bloco 04 - Homologação ANAC */}
      <AnacSection />

      {/* Bloco 05 e 06 - Linha de Produtos */}
      <ProductsSection />

      {/* Bloco 07 - Blog & Newsletter */}
      <BlogSection />

      {/* Bloco 08 - Contato Comercial e B2B */}
      <ContactSection />
    </main>
  );
}
