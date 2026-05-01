import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TerraLov | Lovačka i outdoor oprema",
  description: "Specijalizirana trgovina za lovačku, sportsku i outdoor opremu s naglaskom na odgovornu kupnju i stručnu podršku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      style={{
        // Mapping font variables to Tailwind tokens defined in globals.css
        "--font-sans": "var(--font-inter)",
        "--font-heading": "var(--font-outfit)",
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
