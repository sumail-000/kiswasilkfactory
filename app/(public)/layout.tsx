import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { getSite } from "@/lib/content";

/**
 * Public site chrome. Applies to every marketing route; `/admin` sits outside
 * this group and therefore does not inherit it.
 */
export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <WhatsAppFab site={site} />
    </>
  );
}
