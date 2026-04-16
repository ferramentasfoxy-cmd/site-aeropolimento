import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Aeropolimento - Produtos Químicos Aeronáuticos",
  description: "Compostos para polimento e proteção aeronáutica. Qualidade premium, aprovado ANAC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(geist.variable, "font-sans")}>
      <body className="bg-[var(--color-surface-canvas)] text-[var(--color-text-primary)] antialiased overflow-x-hidden">
        <Preloader />
        <CustomCursor />
        {/* Header NÃO fica aqui — cada seção gerencia seu próprio header overlay */}
        {children}
      </body>
    </html>
  );
}
