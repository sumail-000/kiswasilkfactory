import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PROCESS_SECTIONS, ALL_STEPS } from "@/lib/factory-process";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Production Process — Kiswa Silk Factory",
  description:
    "From raw yarn to finished white-base silk fabric — 12 steps across 5 production stages, all managed under one roof.",
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-cream overflow-hidden border-b border-border/40">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
          {/* Left Side */}
          <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-14">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-gold text-[0.7rem] font-bold tracking-[0.25em] uppercase">
                  INSIDE THE FACTORY
                </span>
                <span className="w-8 h-px bg-gold shrink-0" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display font-bold text-navy text-[clamp(2.4rem,5vw,54px)] leading-tight mb-5">
                From Yarn to Finished<br />
                <span className="text-gold-deep">Silk Fabric</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-foreground/75 text-[0.92rem] leading-relaxed mb-8 max-w-xl">
                Every metre of white-base silk fabric from Kiswa Silk Factory passes through 12 carefully monitored production steps — all managed under one roof, by one team, to one standard.
              </p>
            </Reveal>
            
            {/* Stats strip */}
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border/30 pt-6">
                {[
                  { n: "12", label: "Production Steps" },
                  { n: "5",  label: "Process Stages" },
                  { n: "3",  label: "Shifts / Day" },
                  { n: "40+", label: "Power Looms" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display font-bold text-gold-deep text-[1.8rem] leading-none">{s.n}</div>
                    <div className="text-navy/70 text-[0.72rem] mt-1 tracking-wide font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side — Weaving loom visual fading out */}
          <div className="relative hidden lg:block">
            <Image
              src="/assets/gallery-weaving.jpg"
              alt="Kiswa Silk Factory Weaving Floor"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── STEP PROGRESS BAR / FLOW STRIP ───────────────── */}
      <section className="bg-cream py-8 border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-[0.68rem] font-semibold tracking-wider text-navy/40 uppercase mb-4 text-center sm:text-left">
              Overview: The 12-Step Production Pipeline
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-4">
              {ALL_STEPS.map((step, i) => (
                <div key={step.step} className="flex items-center gap-1">
                  <div className="flex flex-col items-center text-center px-3 py-1">
                    <span className="w-8 h-8 rounded-full border border-gold/45 bg-white flex items-center justify-center text-[0.7rem] font-bold text-gold-deep mb-1 shadow-xs">
                      {step.step}
                    </span>
                    <span className="text-[0.68rem] font-medium text-navy leading-tight max-w-[80px]">
                      {step.title}
                    </span>
                  </div>
                  {i < ALL_STEPS.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-gold/40 shrink-0 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 SECTION CARDS — alternating layout ─────────── */}
      <section className="py-16 bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-16">
          {PROCESS_SECTIONS.map((sec, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Reveal key={sec.id} delay={idx * 50}>
                <div 
                  className="bg-cream rounded-sm border border-border/40 p-6 sm:p-8 lg:p-12 shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-0.5"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Image side */}
                    <div className={`lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden rounded-sm group border border-border/25 shadow-xs ${!isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <Image
                        src={sec.heroImage}
                        alt={sec.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-102 transition-transform duration-700"
                      />
                      {/* Section number overlay */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-navy text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
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
                    <div className={`lg:col-span-6 w-full ${!isEven ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"}`}>
                      <p className="text-gold-deep text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-2">
                        Stage {sec.sectionNumber} of {PROCESS_SECTIONS.length}
                      </p>
                      <h2 className="font-display font-bold text-navy text-[clamp(1.8rem,3.5vw,36px)] leading-tight mb-3">
                        {sec.title}
                      </h2>
                      <p className="text-gold-deep font-display italic text-[0.95rem] mb-4">{sec.tagline}</p>
                      <p className="text-foreground/70 text-[0.88rem] leading-relaxed mb-6">
                        {sec.description}
                      </p>

                      {/* Step list */}
                      <div className="space-y-3 mb-8 bg-white/70 border border-border/20 p-5 rounded-sm shadow-xs">
                        {sec.steps.map((s) => (
                          <div key={s.step} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-[0.62rem] font-bold text-gold-deep shrink-0 mt-0.5">
                              {s.step}
                            </span>
                            <div>
                              <span className="text-navy text-[0.82rem] font-semibold">{s.title}</span>
                              <span className="text-foreground/60 text-[0.8rem]"> — {s.description.split(".")[0]}.</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/process/${sec.slug}`}
                        className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3.5 rounded-sm hover:bg-navy/90 transition-colors text-xs font-semibold uppercase tracking-wider shadow-xs"
                      >
                        Explore Stage {sec.sectionNumber} Details
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </Link>
                    </div>

                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section className="bg-navy py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <Reveal>
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
          </Reveal>
        </div>
      </section>

    </div>
  );
}
