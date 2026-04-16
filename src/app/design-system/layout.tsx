import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Aeropolimento",
  description: "Tokens, componentes e padrões visuais do Design System Aeropolimento v2.0",
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
