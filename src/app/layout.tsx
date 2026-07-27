import type { Metadata } from "next";
import { Tilt_Warp, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { PRODUCT_CONFIG } from "@/lib/content";

const headlineFont = Tilt_Warp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PRODUCT_CONFIG.name} — ${PRODUCT_CONFIG.tagline}`,
  description: `${PRODUCT_CONFIG.hero.subheadlinePrefix}${PRODUCT_CONFIG.hero.subheadlineHighlight}`,
  keywords: ["AI code review", "GitHub Action", "PR reviewer", "CLI code review", "MCP tools", "Indie devs"],
  openGraph: {
    title: PRODUCT_CONFIG.name,
    description: PRODUCT_CONFIG.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${headlineFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col paper-texture antialiased selection:bg-[#e8542c] selection:text-white"
      >
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
