import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleView } from "@/components/sections/Blog/ArticleView";
import { ALL_ARTICLE_SLUGS, getArticle } from "@/content/blog";

// Static export: pré-renderiza uma página por artigo.
export function generateStaticParams() {
  return ALL_ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("pt", slug); // metadata pré-renderizado em PT (política PT-first)
  return {
    title: article ? `${article.title} — Aeropolimento` : "Artigo — Aeropolimento",
    description: article?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="relative bg-[var(--color-surface-subtle)] overflow-x-hidden">
      <Header />
      <ArticleView slug={slug} />
      <Footer />
    </main>
  );
}
