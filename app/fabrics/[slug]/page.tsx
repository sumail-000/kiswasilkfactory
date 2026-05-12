import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import FabricCard from "@/components/FabricCard";
import FabricTabs from "./FabricTabs";
import ClientGallery from "./ClientGallery";
import { FABRICS, getFabric } from "@/lib/fabrics";

export const dynamicParams = false;

export function generateStaticParams() {
  return FABRICS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fabric = getFabric(slug);
  if (!fabric) return { title: "Fabric not found" };
  return {
    title: `${fabric.name} — Specifications`,
    description: fabric.blurb,
  };
}

export default async function FabricPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fabric = getFabric(slug);
  if (!fabric) notFound();

  const related = fabric.related
    .map((s) => getFabric(s))
    .filter(Boolean) as typeof FABRICS;

  return (
    <>
      <section className="pt-32 pb-2">
        <div className="container-x">
          <nav className="text-muted mb-6 flex flex-wrap items-center gap-2 text-[0.74rem] tracking-[0.18em] uppercase">
            <Link href="/" className="text-gold-deep">
              Home
            </Link>
            <span className="opacity-60">/</span>
            <Link href="/fabrics" className="text-gold-deep">
              Fabrics
            </Link>
            <span className="opacity-60">/</span>
            <span>{fabric.name}</span>
          </nav>
        </div>
      </section>

      <section>
        <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <Reveal>
            <FabricGallery
              hero={fabric.heroImg}
              thumbs={fabric.thumbs}
              alt={fabric.name}
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-5">
              {fabric.number} · {fabric.shortName}
            </p>
            <h1 className="mb-3">{fabric.name}</h1>
            <p className="font-display text-gold-deep mb-6 text-[1.2rem] italic">
              {fabric.subtitle}
            </p>
            <p className="text-charcoal-soft mb-8">{fabric.longBlurb}</p>

            <div className="border-line border-t pt-8">
              <dl className="grid grid-cols-[1fr_2fr] gap-x-6 gap-y-3">
                <SpecRow dt="Composition" dd={fabric.composition} />
                <SpecRow dt="Weight" dd={fabric.weight} />
                <SpecRow dt="Width" dd={fabric.width} />
                <SpecRow dt="Weaves" dd={fabric.weaves} />
                <SpecRow dt="Dye Method" dd={fabric.dye} />
                <SpecRow dt="Stock Colours" dd={fabric.stockColors} />
                <SpecRow dt="Lead Time" dd={fabric.leadTime} />
                <SpecRow dt="MOQ" dd={fabric.moq} />
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/sample-request?fabric=${fabric.slug}`}
                className="btn"
              >
                Request Swatch <span className="arrow">→</span>
              </Link>
              <Link
                href={`/bulk-inquiry?fabric=${fabric.slug}`}
                className="btn btn-outline"
              >
                Open RFQ
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-20">
          <Reveal>
            <FabricTabs fabric={fabric} />
          </Reveal>
        </div>
      </section>

      {/* Related fabrics */}
      {related.length > 0 && (
        <section className="bg-cream section-y mt-20">
          <div className="container-x">
            <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[5fr_7fr]">
              <div>
                <p className="eyebrow mb-5">You May Also Consider</p>
                <h2>Related silks.</h2>
              </div>
              <p className="lede">
                Buyers who request {fabric.shortName.toLowerCase()} typically
                also pull samples of these silks.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f) => (
                <Reveal key={f.slug}>
                  <FabricCard
                    href={`/fabrics/${f.slug}`}
                    src={f.heroImg.replace("w=1600", "w=900")}
                    alt={f.name}
                    meta={f.subtitle.split("—")[0].trim()}
                    title={f.name}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SpecRow({ dt, dd }: { dt: string; dd: string }) {
  return (
    <>
      <dt className="border-line text-muted border-b py-2 text-[0.74rem] font-semibold tracking-[0.16em] uppercase">
        {dt}
      </dt>
      <dd className="border-line m-0 border-b py-2 text-[0.96rem]">{dd}</dd>
    </>
  );
}

function FabricGallery({
  hero,
  thumbs,
  alt,
}: {
  hero: string;
  thumbs: string[];
  alt: string;
}) {
  return <ClientGallery hero={hero} thumbs={thumbs} alt={alt} />;
}
