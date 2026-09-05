import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arte & Delícia — Pizzaria Artesanal | Itaiçaba - CE",
  description:
    "Cardápio digital da Pizzaria Arte & Delícia em Itaiçaba (CE). Faça seu pedido online e receba no conforto do seu lar. Mais de 13 anos de tradição.",
  keywords: ["pizzaria", "Itaiçaba", "Arte & Delícia", "pizza artesanal", "delivery", "Ceará", "Beira Rio"],
  openGraph: {
    title: "Arte & Delícia — Pizzaria Artesanal",
    description: "Mais de 13 anos de tradição e sabor servindo Itaiçaba com carinho.",
    url: "https://artedelicia.vercel.app",
    siteName: "Arte & Delícia",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
