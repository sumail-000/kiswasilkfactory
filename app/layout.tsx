import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kiswa Silk Factory — Premium White-Base Silk Fabric Manufacturer",
    template: "%s | Kiswa Silk Factory",
  },
  description:
    "Kiswa Silk Factory is a trusted B2B manufacturer of premium white-base silk fabrics for dyeing, printing, embroidery and heavy work. Consistent quality. Reliable supply. Global trust.",
  metadataBase: new URL("https://kiswasilkfactory.com"),
  openGraph: {
    title: "Kiswa Silk Factory — Premium White-Base Silk Fabric Manufacturer",
    description:
      "B2B manufacturer of premium white-base silk fabrics. Dyeing, printing, embroidery & heavy work ready. Wholesale factory prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
