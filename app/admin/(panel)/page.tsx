import Link from "next/link";
import { Building2, Images, Layers } from "lucide-react";
import { getGallery, getProducts, getSite } from "@/lib/content";
import { listBackups, storageBackend } from "@/lib/content/storage";
import ExportButton from "./ExportButton";

export default async function AdminDashboard() {
  const [products, gallery, site, backups] = await Promise.all([
    getProducts(),
    getGallery(),
    getSite(),
    listBackups(),
  ]);

  const backend = storageBackend();
  const lastSaved = backups[0]?.savedAt;

  const cards = [
    {
      href: "/admin/products",
      icon: Layers,
      label: "Fabrics",
      value: String(products.length),
      caption: "in the catalogue",
    },
    {
      href: "/admin/gallery",
      icon: Images,
      label: "Gallery images",
      value: String(gallery.length),
      caption: "on the gallery page",
    },
    {
      href: "/admin/site",
      icon: Building2,
      label: "Contact",
      value: site.phone || "—",
      caption: site.email || "no email set",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-navy/60">
          Manage the fabrics, gallery and contact details shown on your website.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ href, icon: Icon, label, value, caption }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg border border-black/10 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <Icon className="mb-3 h-5 w-5 text-gold" strokeWidth={1.5} />
            <div className="truncate font-display text-xl font-bold text-navy">{value}</div>
            <div className="mt-0.5 text-[0.8rem] font-medium text-navy/80">{label}</div>
            <div className="truncate text-[0.72rem] text-navy/45">{caption}</div>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Storage</h2>
        <dl className="mt-3 space-y-2 text-[0.82rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-navy/55">Backend</dt>
            <dd className="text-right font-medium text-navy">{backend.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy/55">Last saved</dt>
            <dd className="text-right font-medium text-navy">
              {lastSaved ? new Date(lastSaved).toLocaleString() : "No saves yet"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy/55">Saved versions</dt>
            <dd className="text-right font-medium text-navy">
              {backups.length ? <Link href="/admin/history" className="text-gold-deep underline">{backups.length} available</Link> : "—"}
            </dd>
          </div>
        </dl>
        <p className="mt-3 border-t border-black/10 pt-3 text-[0.75rem] leading-relaxed text-navy/50">
          {backend.detail}
        </p>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Backup</h2>
        <p className="mt-1 text-[0.8rem] leading-relaxed text-navy/60">
          Download everything as a single JSON file to keep a copy off the server.
        </p>
        <div className="mt-4">
          <ExportButton />
        </div>
      </section>
    </div>
  );
}
