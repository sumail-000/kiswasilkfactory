import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/components/SiteProvider";
import { getSite } from "@/lib/content";

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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = `${site.brand} — ${site.brandSubtitle}`;

  return {
    title: { default: title, template: `%s | ${site.brand}` },
    description: `${site.brand} is a trusted B2B manufacturer of premium white-base silk fabrics for dyeing, printing, embroidery and heavy work. Consistent quality. Reliable supply. Global trust.`,
    metadataBase: new URL("https://kiswasilkfactory.com"),
    icons: {
      icon: "/logos/web_logo.png",
      shortcut: "/logos/web_logo.png",
      apple: "/logos/web_logo.png",
    },
    openGraph: {
      title,
      description:
        "B2B manufacturer of premium white-base silk fabrics. Dyeing, printing, embroidery & heavy work ready. Wholesale factory prices.",
      type: "website",
    },
  };
}

/**
 * Root layout — document shell only.
 *
 * The public site's header and footer live in `app/(public)/layout.tsx` so that
 * `/admin` can render its own chrome instead of inheriting the marketing one.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <SiteProvider value={site}>{children}</SiteProvider>
      </body>
    </html>
  );
}
