import { getSite } from "@/lib/content";
import SiteForm from "./SiteForm";

export default async function AdminSitePage() {
  const site = await getSite();
  return <SiteForm initial={site} />;
}
