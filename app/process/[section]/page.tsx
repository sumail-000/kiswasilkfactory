import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { PROCESS_SECTIONS, getSection } from "@/lib/factory-process";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROCESS_SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = getSection(section);
  if (!s) return { title: "Not found" };
  return {
    title: `${s.title} — Production Process`,
    description: s.description,
  };
}

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const sec = getSection(section);
  if (!sec) notFound();

  const currentIdx = PROCESS_SECTIONS.findIndex((s) => s.slug === section);
  const prev = currentIdx > 0 ? PROCESS_SECTIONS[currentIdx - 1] : null;
  const next = currentIdx < PROCESS_SECTIONS.length - 1 ? PROCESS_SECTIONS[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-navy text-white overflow-hidden min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={sec.heroImage}
            alt={sec.title}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/process" className="hover:text-white transition-colors">Process</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{sec.title}</span>
          </nav>
          <p className="text-gold text-[0.7rem] font-bold tracking-[0.28em] uppercase mb-3">
            Stage {sec.sectionNumber} of {PROCESS_SECTIONS.length} — {sec.steps.length} Step{sec.steps.length > 1 ? "s" : ""}
          </p>
          <h1 className="font-display font-bold text-[clamp(2.4rem,5vw,56px)] leading-tight mb-3 max-w-[20ch]">
            {sec.title}
          </h1>
          <p className="text-gold/80 font-display italic text-[1.1rem] mb-5">{sec.tagline}</p>
          <p className="text-white/70 text-[0.9rem] leading-relaxed max-w-[55ch]">
            {sec.description}
          </p>
        </div>
      </section>

      {/* ── STEP PROGRESS BAR ───────────────────────────── */}
      <section className="bg-cream border-b border-border/40 py-5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[0.72rem] text-muted font-medium tracking-wide mr-2">STEPS IN THIS STAGE:</span>
            {sec.steps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-1.5">
                <a href={`#step-${s.step}`} className="flex items-center gap-2 group">
                  <span className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-navy text-[0.68rem] font-bold">
                    {s.step}
                  </span>
                  <span className="text-[0.78rem] font-medium text-navy group-hover:text-gold transition-colors">{s.title}</span>
                </a>
                {i < sec.steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gold/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────── */}
      {sec.steps.map((step, stepIdx) => {
        const isEven = stepIdx % 2 === 0;
        const hasMultipleImages = step.images.length > 1;
        const extraImages = step.images.slice(1);

        return (
          <section
            key={step.step}
            id={`step-${step.step}`}
            className={`py-16 scroll-mt-20 ${isEven ? "bg-background" : "bg-cream"}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

              {/* Step header */}
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-display font-bold text-[4rem] leading-none text-gold/20 select-none">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-gold text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-1">
                    Step {step.step}
                  </p>
                  <h2 className="font-display font-bold text-navy text-[clamp(1.6rem,3vw,34px)] leading-tight">
                    {step.title}
                  </h2>
                </div>
              </div>

              {/* Main step layout: image + content */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10 ${!isEven ? "lg:grid-flow-dense" : ""}`}>

                {/* Primary image */}
                <div className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-cream ${!isEven ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <p className="text-foreground/75 text-[0.95rem] leading-relaxed mb-5">
                    {step.description}
                  </p>
                  <div className="border-l-2 border-gold pl-5 mb-6">
                    <p className="text-foreground/65 text-[0.88rem] leading-relaxed italic">
                      {step.detail}
                    </p>
                  </div>
                  {/* Key info chips */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-navy/6 border border-navy/15 text-navy text-[0.72rem] font-semibold px-3 py-1.5 rounded-sm">
                      Stage {sec.sectionNumber} / Step {step.step}
                    </span>
                    <span className="bg-gold/10 border border-gold/30 text-gold text-[0.72rem] font-semibold px-3 py-1.5 rounded-sm">
                      {step.images.length} image{step.images.length > 1 ? "s" : ""} from this step
                    </span>
                  </div>
                </div>
              </div>

              {/* Extra images grid */}
              {hasMultipleImages && (
                <div>
                  <p className="text-[0.72rem] font-bold tracking-[0.18em] uppercase text-foreground/40 mb-4">
                    More from this step
                  </p>
                  <div className={`grid gap-2 ${
                    extraImages.length === 1 ? "grid-cols-1 max-w-[480px]" :
                    extraImages.length === 2 ? "grid-cols-2 max-w-[680px]" :
                    extraImages.length <= 4 ? "grid-cols-2 sm:grid-cols-4" :
                    "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}>
                    {extraImages.map((img, i) => (
                      <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream group">
                        <Image
                          src={img}
                          alt={`${step.title} — view ${i + 2}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>
        );
      })}

      {/* ── CTA + NAVIGATION ─────────────────────────────── */}
      <section className="bg-cream border-t border-border/40 py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section nav */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 pb-12 border-b border-border/40">
            <div>
              {prev ? (
                <Link href={`/process/${prev.slug}`} className="group flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Previous Stage</div>
                    <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold transition-colors">{prev.title}</div>
                  </div>
                </Link>
              ) : (
                <Link href="/process" className="group flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Back to</div>
                    <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold transition-colors">All Process Stages</div>
                  </div>
                </Link>
              )}
            </div>
            <div>
              {next ? (
                <Link href={`/process/${next.slug}`} className="group flex items-center gap-3 sm:text-right">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Next Stage</div>
                    <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold transition-colors">{next.title}</div>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </Link>
              ) : (
                <Link href="/process" className="group flex items-center gap-3">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">View all</div>
                    <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold transition-colors">Process Stages</div>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* WhatsApp inquiry */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 border border-gold/25 rounded-sm bg-white px-8 py-7 shadow-sm">
            <div>
              <h3 className="font-display font-bold text-navy text-[1.2rem] mb-1">
                Have questions about our production process?
              </h3>
              <p className="text-foreground/65 text-[0.85rem]">
                Our team can walk you through any stage and share samples from that step.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/sample-request"
                className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Request Sample
              </Link>
              <a
                href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(`Hi, I have a question about your ${sec.title} process.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-navy/25 text-navy bg-white px-6 py-3 rounded-sm hover:bg-navy/5 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
