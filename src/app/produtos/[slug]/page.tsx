import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductView } from "@/components/sections/Products/ProductView";
import { ALL_PRODUCT_SLUGS, getProduct } from "@/content/products";

// Static export: uma página por produto.
export function generateStaticParams() {
  return ALL_PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct("pt", slug);
  return {
    title: product ? `${product.name} (${product.code}) — Aeropolimento` : "Produto — Aeropolimento",
    description: product?.intro,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="relative bg-[var(--color-surface-base)] overflow-x-hidden">
      <Header />
      <ProductView slug={slug} />
      <Footer />
    </main>
  );
}
