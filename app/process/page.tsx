import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PROCESS_SECTIONS, ALL_STEPS } from "@/lib/factory-process";

export const metadata: Metadata = {
  title: "Production Process — Kiswa Silk Factory",
  description:
    "From raw yarn to finished white-base silk fabric — 12 steps across 5 production stages, all managed under one roof.",
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-navy text-white overflow-hidden min-h-[440px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/factory/step6/img3.jpeg"
            alt="Kiswa Silk Factory power loom floor"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
          <p className="text-gold text-[0.72rem] font-bold tracking-[0.28em] uppercase mb-4">
            INSIDE THE FACTORY
          </p>
          <h1 className="font-display font-bold text-[clamp(2.8rem,6vw,68px)] leading-tight mb-5 max-w-[18ch]">
            From Yarn to Finished<br />
            <span className="text-gold">Silk Fabric</span>
          </h1>
          <p className="text-white/70 text-[0.95rem] leading-relaxed max-w-[52ch] mb-8">
            Every metre of white-base silk fabric from Kiswa Silk Factory passes through 12 carefully monitored production steps — all managed under one roof, by one team, to one standard.
          </p>
          {/* Stats strip */}
          <div className="flex flex-wrap gap-8">
            {[
              { n: "12", label: "Production Steps" },
              { n: "5",  label: "Process Stages" },
              { n: "3",  label: "Shifts / Day" },
              { n: "40+", label: "Power Looms" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-gold text-[2.2rem] leading-none">{s.n}</div>
                <div className="text-white/60 text-[0.78rem] mt-1 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP OVERVIEW STRIP ─────────────────────────── */}
      <section className="bg-cream py-8 border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-start gap-0">
            {ALL_STEPS.map((step, i) => (
              <div key={step.step} className="flex items-center gap-1">
                <div className="flex flex-col items-center text-center px-3 py-2">
                  <span className="w-8 h-8 rounded-full border-2 border-gold bg-white flex items-center justify-center text-[0.7rem] font-bold text-gold mb-1">
                    {step.step}
                  </span>
                  <span className="text-[0.65rem] font-medium text-navy leading-tight max-w-[70px]">
                    {step.title}
                  </span>
                </div>
                {i < ALL_STEPS.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-gold/40 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 SECTION CARDS — alternating layout ─────────── */}
      <section className="py-0">
        {PROCESS_SECTIONS.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={sec.id} className={`${isEven ? "bg-background" : "bg-cream"}`}>
              <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${!isEven ? "lg:flex lg:flex-row-reverse" : ""}`}>

                  {/* Image side */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm group">
                    <Image
                      src={sec.heroImage}
                      alt={sec.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    {/* Section number overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-navy/85 text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
                        Stage {sec.sectionNumber}
                      </span>
                    </div>
                    {/* Step pills */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {sec.steps.map((s) => (
                        <span key={s.step} className="bg-gold text-navy text-[0.62rem] font-bold px-2 py-0.5 rounded-sm">
                          Step {s.step}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={isEven ? "" : "lg:pr-8"}>
                    <p className="text-gold text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-3">
                      Stage {sec.sectionNumber} of {PROCESS_SECTIONS.length}
                    </p>
                    <h2 className="font-display font-bold text-navy text-[clamp(1.8rem,3.5vw,38px)] leading-tight mb-3">
                      {sec.title}
                    </h2>
                    <p className="text-gold font-display italic text-[1rem] mb-5">{sec.tagline}</p>
                    <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-6">
                      {sec.description}
                    </p>

                    {/* Step list */}
                    <div className="space-y-2 mb-8">
                      {sec.steps.map((s) => (
                        <div key={s.step} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-[0.62rem] font-bold text-gold shrink-0 mt-0.5">
                            {s.step}
                          </span>
                          <div>
                            <span className="text-navy text-[0.85rem] font-semibold">{s.title}</span>
                            <span className="text-foreground/55 text-[0.82rem]"> — {s.description.split(".")[0]}.</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/process/${sec.slug}`}
                      className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-7 py-3 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold"
                    >
                      Explore Stage {sec.sectionNumber}
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section className="bg-navy py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-gold text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-4">FACTORY TRANSPARENCY</p>
          <h2 className="font-display font-bold text-white text-[clamp(1.8rem,3vw,36px)] mb-4">
            See the Quality for Yourself
          </h2>
          <p className="text-white/65 text-[0.9rem] mb-8 max-w-[48ch] mx-auto">
            Verified buyers can schedule a mill visit or request fabric samples to check quality at every stage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sample-request" className="flex items-center gap-2 bg-gold text-navy px-7 py-3 rounded-sm hover:bg-gold/90 transition-colors text-sm font-semibold">
              Request Fabric Sample
            </Link>
            <Link href="/contact" className="flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3 rounded-sm hover:bg-white/10 transition-colors text-sm font-semibold">
              Book a Mill Visit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
