"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
    alt: "Pure mulberry silk drape",
    cat: "fabric",
    label: "Pure Mulberry · 22 momme",
  },
  {
    src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a",
    alt: "Loom on the weaving floor",
    cat: "process",
    label: "Weaving Floor · Loom 14",
  },
  {
    src: "https://images.unsplash.com/photo-1605518215584-32d6f5662d77",
    alt: "Spool of silk thread",
    cat: "bts",
    label: "Throwing Floor · Yarn Prep",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    alt: "Charmeuse silk in deep red",
    cat: "fabric",
    label: "Charmeuse · Crimson Reactive Dye",
  },
  {
    src: "https://images.unsplash.com/photo-1582142306909-195724d33ffc",
    alt: "Chiffon silk drape",
    cat: "fabric",
    label: "Chiffon · 38 gsm",
  },
  {
    src: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad",
    alt: "Organza silk close-up",
    cat: "fabric",
    label: "Organza · Bridal Ivory",
  },
  {
    src: "https://images.unsplash.com/photo-1542838687-3c7df97a3b1d",
    alt: "Crepe silk in pebble texture",
    cat: "fabric",
    label: "Crepe · Sand",
  },
  {
    src: "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1",
    alt: "Dyed silk drying",
    cat: "bts",
    label: "Dye-House · Drying Bay",
  },
  {
    src: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed",
    alt: "Raw silk texture",
    cat: "fabric",
    label: "Raw Silk · 100 gsm",
  },
  {
    src: "https://images.unsplash.com/photo-1620975014050-3f3a08293a86",
    alt: "Jacquard silk pattern",
    cat: "fabric",
    label: "Jacquard · Custom Paisley",
  },
  {
    src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
    alt: "Yarn cones",
    cat: "process",
    label: "Yarn Library · Throwing Floor",
  },
  {
    src: "https://images.unsplash.com/photo-1591375275624-c2cea7f1cb74",
    alt: "Fabric inspection",
    cat: "bts",
    label: "Four-Point Inspection",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "fabric", label: "Finished Fabric" },
  { id: "process", label: "Production Floor" },
  { id: "bts", label: "Behind the Scenes" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);

  return (
    <>
      <PageHead
        eyebrow="Visual Journal"
        title={
          <>
            The mill, in <em className="italic-accent text-gold-soft font-light">quiet detail.</em>
          </>
        }
        lede="Photographs from the loom floor, the dye-house, the finishing room — and the cloth that leaves the gate. A working visual diary, updated as we shoot."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-5 py-2 text-[0.78rem] font-medium tracking-[0.06em] transition ${
                  filter === f.id
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-line bg-ivory hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Reveal
                key={p.src}
                className="group bg-cream relative block aspect-[4/5] overflow-hidden"
              >
                <a
                  href={`${p.src}?auto=format&fit=crop&w=1600&q=85`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                >
                  <Image
                    src={`${p.src}?auto=format&fit=crop&w=900&q=80`}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <span className="from-charcoal/0 to-charcoal/70 text-ivory absolute inset-x-0 bottom-0 bg-gradient-to-t px-5 py-4 text-[0.78rem] tracking-[0.16em] uppercase opacity-0 transition group-hover:opacity-100">
                    {p.label}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <Reveal className="container-narrow text-center">
          <p className="eyebrow mb-5 justify-center">Want to See More?</p>
          <h2 className="mb-6">
            Buyers can request <span className="italic-accent">our full lookbook</span>.
          </h2>
          <p className="lede mb-8">
            A 32-page seasonal lookbook of finished fabric, hand-shot at the
            mill — sent on email to verified buyers.
          </p>
          <Link href="/contact" className="btn">
            Request Lookbook <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
