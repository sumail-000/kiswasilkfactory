import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import FabricCard from "@/components/FabricCard";
import TrustBand from "@/components/TrustBand";
import { FABRICS } from "@/lib/fabrics";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-charcoal text-ivory relative grid min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920&q=85"
            alt="Folds of pure silk fabric in soft light"
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover"
          />
          <div className="from-charcoal/65 via-charcoal/30 to-charcoal/10 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="container-x relative z-10 py-32">
          <p className="eyebrow text-gold-soft mb-6">
            Kiswa Silk · Textile Mills
          </p>
          <h1 className="text-ivory mb-6 max-w-[14ch]">
            The quiet language of <em className="italic-accent text-gold-soft font-light">pure silk,</em>
            <br />
            woven in Pakistan.
          </h1>
          <p className="lede text-ivory/78 mb-10 max-w-[48ch]">
            A vertically integrated silk mill — spinning thread, weaving cloth,
            dyeing and finishing every yard under one roof. We supply finished
            silk fabric to fashion houses, ateliers and wholesale buyers worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/fabrics" className="btn">
              Explore Fabrics <span className="arrow">→</span>
            </Link>
            <Link href="/bulk-inquiry" className="btn btn-ghost">
              Request a Bulk Quote
            </Link>
          </div>
        </div>

        <div className="container-x text-ivory/72 absolute right-0 bottom-8 left-0 z-10 flex justify-between text-[0.74rem] tracking-[0.18em] uppercase">
          <HeroMeta label="Established" value="1998" />
          <HeroMeta label="Production" value="3,400 m / day" />
          <HeroMeta label="Export to" value="Europe · GCC · USA" />
        </div>
      </section>

      <Marquee
        items={[
          "Pure Mulberry Silk",
          "Hand-Loomed Tradition",
          "Reactive Dyed",
          "OEKO-TEX Compliant",
          "Finished In-House",
          "Wholesale & Bespoke",
        ]}
      />

      {/* STORY */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <p className="eyebrow mb-6">A Family Mill Since 1998</p>
            <h2 className="mb-6">
              Three generations of{" "}
              <span className="italic-accent">silk-making</span>, one quiet
              promise: hand-judged quality, every metre.
            </h2>
            <p className="lede mb-6">
              From the first reeling of cocoon thread to the final pressing of
              finished cloth, Kiswa Silk runs every step of production
              in-house. That control is why design houses across Europe, the
              Gulf and the United States have trusted us for over twenty-five
              years.
            </p>
            <Link href="/about" className="btn-text mt-2">
              Read Our Story <span>→</span>
            </Link>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {["Vertically Integrated", "In-House Dyeing", "Custom Weaves", "Low-MOQ Sampling"].map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative">
            <div className="bg-cream relative aspect-[3/4] w-[78%] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80"
                alt="Industrial loom weaving silk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="border-ivory absolute -bottom-12 right-0 aspect-[3/4] w-1/2 overflow-hidden border-8 bg-cream">
              <Image
                src="https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80"
                alt="Spool of natural silk thread"
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FABRIC GRID */}
      <section className="bg-cream section-y">
        <div className="container-x">
          <Reveal className="grid grid-cols-1 items-end gap-6 mb-14 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="eyebrow mb-5">Our Fabrics</p>
              <h2>
                A library of silk, woven for every{" "}
                <span className="italic-accent">drape and weight.</span>
              </h2>
            </div>
            <p className="lede">
              Browse the eight signature silks we produce in-house. Each fabric
              is available in stock colours, custom dye-to-match and bespoke
              weaves on request.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FABRICS.map((f) => (
              <Reveal key={f.slug}>
                <FabricCard
                  href={`/fabrics/${f.slug}`}
                  src={f.heroImg.replace("w=1600", "w=900")}
                  alt={f.name}
                  number={f.number}
                  meta={f.subtitle.split("—")[0].trim()}
                  title={f.name}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/fabrics" className="btn btn-outline">
              View Full Catalogue <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-charcoal text-ivory">
        <div className="container-x section-y grid grid-cols-1 items-end gap-8 lg:grid-cols-[5fr_7fr] lg:pb-12">
          <Reveal>
            <p className="eyebrow text-gold-soft mb-6">From Cocoon to Cloth</p>
            <h2 className="text-ivory">
              Every metre we ship has
              <br />
              <span className="italic-accent">passed our hands four times.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede text-ivory/78">
              A vertically integrated mill means we own each step. No
              third-party finishing. No quality loss between handoffs. Just one
              team, accountable to one standard.
            </p>
          </Reveal>
        </div>
        <div className="container-x grid grid-cols-1 border-t border-white/12 sm:grid-cols-2 xl:grid-cols-4">
          <ProcessStep
            num="step 01"
            title="Reeling & Throwing"
            body="Raw silk filament is reeled from cocoon, twisted and prepared into yarn at our spinning floor."
          />
          <ProcessStep
            num="step 02"
            title="Weaving"
            body="Power and jacquard looms produce plain, satin, twill and patterned weaves to spec."
          />
          <ProcessStep
            num="step 03"
            title="Dyeing"
            body="Reactive and acid dyeing baths, OEKO-TEX certified processes, custom shade matching."
          />
          <ProcessStep
            num="step 04"
            title="Finishing & QC"
            body="Calendering, decatising, four-point inspection — every roll graded before it leaves the mill."
            last
          />
        </div>
        <div className="container-x section-y pt-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[5fr_7fr]">
          <div />
          <div>
            <Link href="/quality" className="btn btn-ghost">
              See Our Quality Standards <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-12">
        <Reveal className="border-line bg-line grid grid-cols-2 gap-px border md:grid-cols-4">
          <Stat num="25+" label="Years of mill operation" />
          <Stat num="3,400m" label="Daily output capacity" />
          <Stat num="42" label="Active export buyers" />
          <Stat num="14" label="Countries served" />
        </Reveal>
      </section>

      {/* SAMPLES & RFQ */}
      <section className="bg-cream section-y">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Sample Service</p>
            <h2 className="mb-6">
              Order a swatch <span className="italic-accent">box</span>.
            </h2>
            <p className="lede mb-8">
              A curated set of our eight signature silks — actual mill-cut
              swatches, labelled with weight, weave and dye reference. Free for
              verified design studios; modest courier fee for individual buyers.
            </p>
            <Link href="/sample-request" className="btn">
              Request Swatches <span className="arrow">→</span>
            </Link>
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-5">Wholesale & Bulk</p>
            <h2 className="mb-6">
              Open an <span className="italic-accent">RFQ</span>.
            </h2>
            <p className="lede mb-8">
              For orders over 200 m we open a dedicated quotation file: shade
              matching, custom widths, finishing options, lead times and
              freight to your nearest port — all in one document.
            </p>
            <Link href="/bulk-inquiry" className="btn btn-outline">
              Start a Quote <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-cream py-24">
        <Reveal className="container-narrow text-center">
          <p className="eyebrow mb-8 justify-center">A Word From Our Buyers</p>
          <blockquote className="font-display text-charcoal mx-auto mb-8 max-w-[30ch] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.32]">
            <span className="text-gold mr-2 text-5xl leading-none">“</span>
            The silks we receive from Kiswa are remarkably consistent. Twenty-six
            rolls in, the chiffon still hits the same hand, the same drape. That
            is rare.
          </blockquote>
          <cite className="text-muted text-[0.78rem] tracking-[0.18em] uppercase not-italic">
            <span className="text-charcoal mb-1 block text-[0.92rem] font-semibold tracking-[0.08em] normal-case">
              Aisha Tahir
            </span>
            Head of Sourcing — Maison Levant, Dubai
          </cite>
        </Reveal>
      </section>

      <TrustBand />

      {/* JOURNAL */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="eyebrow mb-5">Fabric Guide · Journal</p>
              <h2>Notes from the loom floor.</h2>
            </div>
            <p className="lede">
              Working notes on silk selection, weight charts, dye care and the
              practical knowledge our buyers ask for most often.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              img="https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=900&q=80"
              meta="Guide · 6 min"
              title="Reading Momme Weight: a buyer's quick reference"
              body="Why 16 mm charmeuse drapes differently from 22 mm — and which weights suit which garments."
            />
            <BlogCard
              img="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80"
              meta="Process · 8 min"
              title="Inside our jacquard floor: how custom motifs come to life"
              body="From CAD card-cutting to woven sample, the four-week journey of a custom jacquard."
            />
            <BlogCard
              img="https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=900&q=80"
              meta="Care · 4 min"
              title="Caring for pure silk: a wholesaler's checklist"
              body="Storage humidity, fold direction, and the small habits that keep finished bolts shop-ready."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory py-16">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-soft mb-5">Speak With the Mill</p>
            <h2 className="text-ivory">
              Have a programme
              <br />
              in mind?
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede text-ivory/78 mb-6">
              Our trade desk replies within one working day. Share your spec —
              weave, weight, finish, MOQ and ship-by date — and we will return
              a costed proposal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bulk-inquiry" className="btn btn-gold">
                Open RFQ <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function HeroMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden sm:block">
      {label}
      <span className="text-gold-soft font-display mt-1 block text-base normal-case tracking-normal">
        {value}
      </span>
    </div>
  );
}

function ProcessStep({
  num,
  title,
  body,
  last,
}: {
  num: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-6 py-10 sm:border-r sm:border-white/12 ${last ? "" : "border-b border-white/12 sm:border-b-0"} ${last ? "sm:border-r-0 xl:border-r-0" : ""}`}
    >
      <div className="font-display text-gold text-[0.9rem] italic tracking-[0.15em]">
        {num}
      </div>
      <h3 className="text-ivory mt-5 mb-3 text-[1.6rem]">{title}</h3>
      <p className="text-ivory/70 m-0 text-[0.95rem]">{body}</p>
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="bg-ivory px-6 py-8 text-center">
      <span className="font-display text-charcoal block text-[clamp(2.4rem,4vw,3.6rem)] leading-none">
        {num}
      </span>
      <span className="text-muted mt-3 block text-[0.74rem] tracking-[0.18em] uppercase">
        {label}
      </span>
    </div>
  );
}

function BlogCard({
  img,
  meta,
  title,
  body,
}: {
  img: string;
  meta: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <Link href="/blog" className="group block">
        <div className="bg-cream relative mb-5 aspect-[4/3] overflow-hidden">
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        <div className="text-gold-deep mb-2 text-[0.72rem] tracking-[0.18em] uppercase">
          {meta}
        </div>
        <h3 className="group-hover:text-gold-deep mb-2 text-[1.6rem] transition">
          {title}
        </h3>
        <p className="text-muted text-[0.95rem]">{body}</p>
      </Link>
    </Reveal>
  );
}
