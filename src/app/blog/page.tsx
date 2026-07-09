import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogIndex } from "@/components/sections/Blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Aeropolimento",
  description:
    "Artigos técnicos sobre química aeronáutica, homologação ANAC/AMS e preservação de superfícies aeronáuticas.",
};

export default function BlogPage() {
  return (
    <main className="relative bg-[var(--color-surface-subtle)] overflow-x-hidden">
      <Header />
      <BlogIndex />
      <Footer />
    </main>
  );
}
