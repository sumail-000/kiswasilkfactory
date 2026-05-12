import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "About Kiswa Silk — A Family Mill in Pakistan",
  description:
    "Kiswa Silk is a family-run silk textile mill near Gujranwala, Pakistan. Three generations of weaving, dyeing and finishing silk fabric for global buyers.",
};

const TIMELINE = [
  {
    year: "1998",
    title: "First loom in Aroop Morr",
    body: "Kiswa Silk opens with two power looms and a small team of weavers from the surrounding villages of Gujranwala.",
  },
  {
    year: "2004",
    title: "In-house dye-house commissioned",
    body: "A reactive and acid dye line installed on-site, ending reliance on commercial dye-houses for colour matching and shade consistency.",
  },
  {
    year: "2011",
    title: "First export — Dubai & Riyadh",
    body: "Kiswa begins shipping finished bolts to ateliers in the Gulf, the start of a now-fourteen-country export programme.",
  },
  {
    year: "2017",
    title: "Jacquard floor opens",
    body: "Twelve-jack jacquard looms are added, opening custom-motif weaving for designer programmes and wedding-house buyers.",
  },
  {
    year: "2021",
    title: "OEKO-TEX Standard 100 certification",
    body: "Independent testing confirms the dye-house and finishing line meet OEKO-TEX limits for harmful substances.",
  },
  {
    year: "2026",
    title: "Today",
    body: "Three-shift production, eight active silk lines, 3,400 metres a day at peak — and a younger generation now running the floor alongside their father.",
  },
];

const VALUES = [
  {
    n: "i.",
    title: "Hand-judged quality.",
    body: "Every roll is inspected by an experienced weaver before the four-point machine sees it. Numbers confirm what hands already know.",
  },
  {
    n: "ii.",
    title: "One team, one floor.",
    body: "Spinning, weaving, dyeing, finishing — all under one roof. No handoffs means no quality loss between vendors.",
  },
  {
    n: "iii.",
    title: "Honest with weight.",
    body: "When we say 22-momme charmeuse, you receive 22-momme charmeuse. Stated weight, stated weave, stated width — every time.",
  },
];

const TEAM = [
  {
    name: "Khalid Mahmood",
    role: "Founder & Master Weaver",
    img: "https://images.unsplash.com/photo-1612833609248-1ea2c0b3b1b9?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Hassan Mahmood",
    role: "Director, Operations",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Ayesha Khan",
    role: "Lead, Quality & Dye-House",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="Our Story"
        title={
          <>
            A quiet mill on the <em className="italic-accent text-gold-soft font-light">old textile road,</em> still
            weaving by hand-judged eye.
          </>
        }
        lede="Founded in 1998 by Mr Khalid Mahmood and now run with his two sons, Kiswa Silk is one of the few remaining vertically integrated silk mills in Pakistan — taking raw filament through to finished, packed cloth without ever leaving our gate."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Founder narrative */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <Reveal>
            <p className="eyebrow mb-5">The Founding Idea</p>
            <h2 className="mb-6">
              Trade silks were leaving the country{" "}
              <span className="italic-accent">cheap</span>. We wanted them to
              leave finished.
            </h2>
            <p className="lede mb-5">
              In the late 1990s most Pakistani silk thread was being sold raw —
              exported to mills abroad that did the weaving, dyeing and
              finishing. The value was leaving with the yarn. Kiswa Silk was
              started to keep all four steps inside one building.
            </p>
            <p className="text-charcoal-soft">
              Twenty-five years later, that single decision is the reason every
              Kiswa fabric carries the same hand from the first metre of an
              order to the last. There are no third-party finishers. No
              outsourced dye-houses. Just one team and one standard.
            </p>
          </Reveal>
          <Reveal className="bg-cream relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=80"
              alt="Loom on the Kiswa Silk weaving floor"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream section-y">
        <div className="container-x">
          <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="eyebrow mb-5">Twenty-Five Years</p>
              <h2>A short timeline of the mill.</h2>
            </div>
            <p className="lede">
              From a single power loom to a fully integrated production floor
              exporting to fourteen countries.
            </p>
          </Reveal>

          <div className="border-line bg-line grid grid-cols-1 gap-px border">
            {TIMELINE.map((t) => (
              <Reveal
                key={t.year}
                className="bg-ivory grid grid-cols-1 gap-6 px-8 py-10 sm:grid-cols-[120px_1fr] sm:items-baseline"
              >
                <span className="italic-accent text-[1.6rem]">{t.year}</span>
                <div>
                  <h3 className="mb-2">{t.title}</h3>
                  <p className="text-muted m-0">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow mb-5 justify-center">What We Hold To</p>
            <h2>Three quiet rules.</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {VALUES.map((v) => (
              <Reveal key={v.n} className="border-gold border-t pt-6">
                <div className="text-gold-deep mb-3 text-[0.85rem] font-semibold tracking-[0.18em] uppercase">
                  {v.n}
                </div>
                <h3 className="mb-3">{v.title}</h3>
                <p className="text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream section-y">
        <div className="container-x">
          <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="eyebrow mb-5">The Team</p>
              <h2>
                The people behind <span className="italic-accent">every metre</span>.
              </h2>
            </div>
            <p className="lede">
              A senior team of forty-two, including weavers who have been with
              the mill since its first year. Continuity is part of the product.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TEAM.map((p) => (
              <Reveal key={p.name}>
                <div className="bg-ivory relative mb-5 aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale-[0.15]"
                  />
                </div>
                <h4>{p.name}</h4>
                <p className="text-gold-deep m-0 italic">{p.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustBand />

      {/* CTA */}
      <section className="bg-charcoal text-ivory py-20">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-soft mb-5">Visit the Mill</p>
            <h2 className="text-ivory">Buyers are welcome on the floor.</h2>
          </Reveal>
          <Reveal>
            <p className="lede text-ivory/78 mb-6">
              Verified buyers can schedule a mill visit — see the spinning,
              weaving and dye-house first hand. We can arrange a driver from
              Lahore or Sialkot international airport.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-gold">
                Book a Mill Visit <span className="arrow">→</span>
              </Link>
              <Link href="/quality" className="btn btn-ghost">
                Quality Process
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
