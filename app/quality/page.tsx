import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Quality & Production",
  description:
    "Inside the Kiswa Silk mill: spinning, weaving, dyeing, finishing and quality control — all under one roof, with OEKO-TEX, ISO 9001 and SEDEX compliance.",
};

const STEPS = [
  {
    n: "i.",
    eyebrow: "Reeling & Throwing",
    title: (
      <>
        From cocoon to <span className="italic-accent">prepared yarn</span>.
      </>
    ),
    body: "Bivoltine A-grade mulberry cocoons are sourced from selected farms and arrive at our reeling floor in 50 kg lots. Filaments are unwound, combined into multi-cocoon strands, and twisted (\"thrown\") to the denier and TPI required by each fabric programme.",
    extra:
      "Yarn for chiffon and crepe receives the highest twist (1,800–2,400 TPI). Charmeuse takes a softer 600–800 TPI. Each yarn batch is tagged, denier-tested and stored by recipe.",
    bullets: [
      "20 reeling stations, 9 throwing machines",
      "Daily yarn output: ~480 kg",
      "Tested at the loop: denier, breaking strength, elongation",
    ],
    img: "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=900&q=80",
    alt: "Spool of pure silk thread",
  },
  {
    n: "ii.",
    eyebrow: "Weaving",
    title: (
      <>
        Forty-six looms, <span className="italic-accent">three weaving floors</span>.
      </>
    ),
    body: "Plain, satin, twill and crepe weaves are produced on Vamatex and Picanol rapier looms. Custom motifs are woven on our 12-jack jacquard floor. Each loom is paired with a senior weaver responsible for tension, pick-density and on-loom inspection.",
    extra:
      "Greige cloth is checked at the loom before it leaves the floor — defects flagged in the weave are corrected before the batch enters the dye-house.",
    bullets: [
      "32 rapier · 8 dobby · 6 jacquard looms",
      "Production capacity: 3,400 m/day at peak",
      "On-loom inspection by trained weavers",
    ],
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    alt: "Power loom weaving silk fabric",
    reverse: true,
  },
  {
    n: "iii.",
    eyebrow: "Degumming & Dyeing",
    title: (
      <>
        Reactive &amp; acid bath, <span className="italic-accent">colour-matched</span> in-house.
      </>
    ),
    body: "Greige cloth is degummed to remove sericin (the natural gum that coats silk fibres), then dyed in 50–200 kg lots in our reactive and acid dye-house. Dye recipes are kept on file by Pantone reference; repeat orders are matched against retained yardage to keep shade consistent across seasons.",
    extra:
      "Our dye-house is OEKO-TEX Standard 100 certified — no AZO dyes, no banned amines, no heavy metals above the regulated limit. Effluent passes through a three-stage treatment plant before discharge.",
    bullets: [
      "12 winch dyeing machines, 4 jet dyers",
      "Pantone shade-matching laboratory on site",
      "OEKO-TEX Standard 100 certified",
      "Effluent treatment plant (3-stage, on site)",
    ],
    img: "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=900&q=80",
    alt: "Dyed silk fabric drying",
  },
  {
    n: "iv.",
    eyebrow: "Finishing & QC",
    title: (
      <>
        Calendering, decatising, <span className="italic-accent">four-point inspection</span>.
      </>
    ),
    body: "Dyed cloth is finished according to the buyer brief — soft hand, calendered shine, sand-wash, stiffened (organza), or print-prepared. Width, weight and skew are corrected on a stenter frame before final inspection.",
    extra:
      "Every roll is graded on the four-point system. Rolls scoring above 28 points per 100 m² are pulled, re-graded as second quality, and never shipped against an order. The pass-rate for first-quality cloth runs at 96%.",
    bullets: [
      "Stenter frame, calender, decatising drum",
      "Four-point inspection, every roll",
      "Width, weight and shrinkage verified before pack",
      "First-quality pass rate: 96% rolling 12-month",
    ],
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
    alt: "Finished silk fabric ready for packing",
    reverse: true,
  },
];

const QC_CARDS = [
  {
    title: "Width & Weight",
    body: "Each roll is measured against the spec sheet. Tolerance is ±2% width, ±5% weight.",
  },
  {
    title: "Pick & End Density",
    body: "Verified against the loom record. Out-of-tolerance ends trigger a re-weave at our cost.",
  },
  {
    title: "Shade Match",
    body: "Spectrophotometer-verified against retained reference; ΔE ≤ 1.0 for repeat shades.",
  },
  {
    title: "Defect Grading",
    body: "Slubs, holes, oil marks, weft bars — graded 1–4 points by length, summed per 100 m².",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHead
        eyebrow="Inside the Mill"
        title={
          <>
            Four steps. <em className="italic-accent text-gold-soft font-light">One floor.</em>
            <br />
            One quiet standard.
          </>
        }
        lede="Every metre we ship has passed our hands four times. Each station — spinning, weaving, dyeing, finishing — sits within walking distance of the next. No third-party finishing. No vendor handoff. No quality drift."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Quality & Production" },
        ]}
      />

      <section className="pt-16">
        <div className="container-x">
          {STEPS.map((s) => (
            <Reveal
              key={s.n}
              className={`border-line grid grid-cols-1 items-center gap-12 border-b py-16 last:border-b-0 lg:gap-16 ${s.reverse ? "lg:grid-cols-[5fr_6fr]" : "lg:grid-cols-[6fr_5fr]"}`}
            >
              <div className={s.reverse ? "lg:order-2" : ""}>
                <span className="font-display text-gold mb-4 block text-6xl leading-none italic">
                  {s.n}
                </span>
                <p className="eyebrow mb-5">{s.eyebrow}</p>
                <h2 className="mb-6">{s.title}</h2>
                <p className="text-charcoal-soft mb-4">{s.body}</p>
                <p className="text-charcoal-soft mb-6">{s.extra}</p>
                <ul className="list-disc space-y-1 pl-5">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div
                className={`bg-cream relative aspect-[4/5] overflow-hidden ${s.reverse ? "lg:order-1" : ""}`}
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QC */}
      <section className="bg-cream section-y">
        <div className="container-x">
          <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="eyebrow mb-5">Quality Control</p>
              <h2>
                What we test for, <span className="italic-accent">every roll</span>.
              </h2>
            </div>
            <p className="lede">
              Quality is what we will not let pass. The four-point system is
              the international wholesale standard; we apply it to every roll,
              regardless of order size.
            </p>
          </Reveal>

          <Reveal className="border-line bg-line grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {QC_CARDS.map((q) => (
              <div key={q.title} className="bg-ivory p-8">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="#8E6C3E"
                  strokeWidth="1.2"
                >
                  <circle cx="16" cy="16" r="12" />
                  <path d="M11 16l4 4 7-8" />
                </svg>
                <h4 className="mt-4 mb-2">{q.title}</h4>
                <p className="text-muted m-0 text-[0.9rem]">{q.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Compliance & Certification</p>
            <h2 className="mb-6">
              Independent <span className="italic-accent">verification.</span>
            </h2>
            <p className="text-charcoal-soft mb-4">
              We hold ourselves to international standards because our buyers
              require evidence — not assurances. All certificates are available
              on request for buyer due-diligence files.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>OEKO-TEX Standard 100</strong> — finished cloth tested
                for harmful substances.
              </li>
              <li>
                <strong>ISO 9001</strong> — quality management system.
              </li>
              <li>
                <strong>SEDEX SMETA-4</strong> — labour and ethical audit.
              </li>
              <li>
                <strong>PCSIR</strong> — independent textile testing certification.
              </li>
              <li>
                <strong>TDAP membership</strong> — Trade Development Authority
                of Pakistan, registered exporter.
              </li>
            </ul>
          </Reveal>
          <Reveal className="bg-cream p-10">
            <h3 className="mt-0 mb-4">Request a Mill Audit Pack</h3>
            <p className="text-charcoal-soft mb-6">
              For ESG, due-diligence or compliance teams: we can prepare a
              single-PDF mill pack including current certifications, the latest
              SEDEX audit summary, factory layout, and supplier-of-record
              letters.
            </p>
            <Link href="/contact" className="btn btn-outline">
              Request Audit Pack <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory py-20">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-soft mb-5">Visit the Mill</p>
            <h2 className="text-ivory">See it for yourself.</h2>
          </Reveal>
          <Reveal>
            <p className="lede text-ivory/78 mb-6">
              Verified buyers can schedule a mill walkthrough. Lahore and
              Sialkot international airports are both within a 90-minute drive
              of the mill in Aroop Morr.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Schedule a Visit <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
