import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const display = Cormorant_Garamond({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kiswa Silk — Premium Silk Fabric Mill in Pakistan",
    template: "%s · Kiswa Silk",
  },
  description:
    "Kiswa Silk is a fully integrated silk textile mill in Pakistan — producing pure mulberry, raw, chiffon, organza, crepe and jacquard silks for global fashion brands and wholesale buyers.",
  metadataBase: new URL("https://kiswasilk.com"),
  openGraph: {
    title: "Kiswa Silk — Premium Silk Fabric Mill in Pakistan",
    description:
      "Integrated silk textile mill: spinning, weaving, dyeing & finishing — finished silk fabric for designers and wholesale buyers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <body className="bg-ivory text-charcoal flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
