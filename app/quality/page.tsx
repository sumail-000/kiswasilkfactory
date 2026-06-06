import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PROCESS_SECTIONS, ALL_STEPS } from "@/lib/factory-process";

export const metadata: Metadata = {
  title: "Quality & Production Process",
  description: "Inside the Kiswa Silk Factory: 12 steps across 5 production stages — yarn preparation, weaving, checking, finishing, packing and dispatch.",
};

const NAVY = "#1a2340";
const GOLD = "#c9a84c";

export default function QualityPage() {
  return (
    <>
      <section style={{ background: NAVY }} className="py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <span className="mb-3 block text-[0.72rem] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
            Quality & Production
          </span>
          <h1 className="mb-4 text-[2.5rem] font-bold">
            Our Production Process
          </h1>
          <p className="max-w-[55ch] text-white/75">
            12 carefully monitored steps across 5 production stages — every metre of fabric
            is produced and checked under one roof.
          </p>
        </div>
      </section>

      {/* Step overview strip */}
      <section className="bg-[#f8f6f1] py-10">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-3">
            {ALL_STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold text-white"
                  style={{ background: NAVY }}
                >
                  {s.step}
                </div>
                <span className="text-[0.8rem] font-medium text-gray-700">{s.title}</span>
                {i < ALL_STEPS.length - 1 && (
                  <span className="text-gray-300 hidden md:inline">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      {PROCESS_SECTIONS.map((section, si) => (
        <section key={section.id} className={`py-16 ${si % 2 === 1 ? "bg-[#f8f6f1]" : "bg-white"}`}>
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <Reveal className="mb-10">
              <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                Stage {si + 1}
              </span>
              <h2 className="text-[1.8rem] font-bold" style={{ color: NAVY }}>{section.title}</h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                <Image
                  src={section.heroImage}
                  alt={section.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Reveal>

              <div className="space-y-6">
                {section.steps.map((step) => (
                  <Reveal key={step.step} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: GOLD }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3 className="mb-1 text-[1rem] font-bold" style={{ color: NAVY }}>{step.title}</h3>
                      <p className="text-[0.9rem] leading-relaxed text-gray-600">{step.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Quality checkpoints */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <Reveal className="mb-10 text-center">
            <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              Our Standards
            </span>
            <h2 className="text-[1.8rem] font-bold text-white">Quality at Every Step</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Uniform Whiteness", body: "Every roll maintained at consistent high whiteness for reliable dyeing results." },
              { title: "Smooth Surface Finish", body: "Calendering ensures smooth, even surface for printing, embroidery and dyeing." },
              { title: "Accurate Dimensions", body: "Width and length measured before packing to match exact customer specifications." },
              { title: "Zero Contamination", body: "Washing and cleaning process removes all dust, oil marks and processing particles." },
            ].map((q) => (
              <Reveal key={q.title} className="rounded-sm border border-white/15 p-6">
                <div className="mb-3 text-2xl">✓</div>
                <h4 className="mb-2 font-bold text-white">{q.title}</h4>
                <p className="text-[0.85rem] text-white/65">{q.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f6f1] py-14">
        <Reveal className="mx-auto max-w-[640px] px-4 text-center">
          <h2 className="mb-4 text-[1.8rem] font-bold" style={{ color: NAVY }}>
            See Quality for Yourself
          </h2>
          <p className="mb-8 text-gray-600">
            Request free fabric samples to check whiteness, finish and feel before placing a bulk order.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sample-request" className="rounded-sm px-6 py-3 text-sm font-semibold text-white" style={{ background: NAVY }}>
              Request Samples
            </Link>
            <Link href="/contact" className="rounded-sm border px-6 py-3 text-sm font-semibold" style={{ borderColor: NAVY, color: NAVY }}>
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
