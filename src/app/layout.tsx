import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Aeropolimento - Produtos Químicos Aeronáuticos",
  description: "Compostos para polimento e proteção aeronáutica. Qualidade premium, provado e aprovado ANAC.",
};

import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(geist.className, "font-sans", geist.variable)}>
      <body className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] antialiased selection:bg-[var(--color-aero-blue)] selection:text-white overflow-x-hidden">
        <Preloader />
        <CustomCursor />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
