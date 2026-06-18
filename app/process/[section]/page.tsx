import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { PROCESS_SECTIONS, getSection } from "@/lib/factory-process";
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";
import StepImageViewer from "@/components/StepImageViewer";

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
      <section className="bg-cream overflow-hidden border-b border-border/40">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
          {/* Left Side Content */}
          <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-12">
            <Reveal>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-[0.75rem] text-foreground/50 mb-6">
                <Link href="/" className="hover:text-navy transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/process" className="hover:text-navy transition-colors">Process</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground/85 font-medium">{sec.title}</span>
              </nav>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-gold-deep text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-3">
                Stage {sec.sectionNumber} of {PROCESS_SECTIONS.length} — {sec.steps.length} Step{sec.steps.length > 1 ? "s" : ""}
              </p>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="font-display font-bold text-navy text-[clamp(2.2rem,5vw,50px)] leading-tight mb-3">
                {sec.title}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-gold-deep font-display italic text-[1.1rem] mb-4">{sec.tagline}</p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-foreground/70 text-[0.9rem] leading-relaxed max-w-xl">
                {sec.description}
              </p>
            </Reveal>
          </div>

          {/* Right Side — Dynamic section hero image fading out */}
          <div className="relative hidden lg:block">
            <Image
              src={sec.heroImage}
              alt={sec.title}
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

      {/* ── STEP PROGRESS BAR ───────────────────────────── */}
      <section className="bg-cream border-b border-border/40 py-5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[0.72rem] text-navy/40 font-bold tracking-wider mr-2 uppercase">Steps in this Stage:</span>
              {sec.steps.map((s, i) => (
                <div key={s.step} className="flex items-center gap-1.5">
                  <a href={`#step-${s.step}`} className="flex items-center gap-2 group">
                    <span className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold-deep text-[0.68rem] font-bold group-hover:bg-gold group-hover:text-navy transition-all">
                      {s.step}
                    </span>
                    <span className="text-[0.78rem] font-medium text-navy group-hover:text-gold-deep transition-colors">{s.title}</span>
                  </a>
                  {i < sec.steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gold/30" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────── */}
      {sec.steps.map((step, stepIdx) => {
        const isEven = stepIdx % 2 === 0;

        return (
          <section
            key={step.step}
            id={`step-${step.step}`}
            className={`py-20 scroll-mt-20 border-b border-border/10 ${isEven ? "bg-background" : "bg-cream"}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Visuals Side (StepImageViewer) */}
                <div className={`lg:col-span-6 w-full ${!isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Reveal>
                    <StepImageViewer
                      images={step.images}
                      title={step.title}
                      stepNumber={step.step}
                    />
                  </Reveal>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-6 w-full flex flex-col justify-center ${!isEven ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"}`}>
                  <Reveal delay={100}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-display font-bold text-xs text-gold-deep">
                        {step.step}
                      </span>
                      <span className="text-gold-deep text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                        STEP {step.step} OF 12
                      </span>
                    </div>
                  </Reveal>
                  
                  <Reveal delay={150}>
                    <h2 className="font-display font-bold text-navy text-[clamp(1.6rem,2.8vw,30px)] leading-tight mb-4">
                      {step.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={200}>
                    <p className="text-foreground/75 text-[0.92rem] leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </Reveal>
                  
                  {/* Detailed technical callout */}
                  <Reveal delay={250}>
                    <div className="bg-white/60 border-l-4 border-gold p-5 rounded-r-sm shadow-xs mb-6">
                      <p className="text-[0.65rem] font-bold tracking-wider text-navy/40 uppercase mb-2">
                        Technical Execution
                      </p>
                      <p className="text-navy/90 text-[0.88rem] leading-relaxed italic font-serif">
                        {step.detail}
                      </p>
                    </div>
                  </Reveal>

                  {/* Quality & Info Badges */}
                  <Reveal delay={300}>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="bg-navy/5 border border-navy/15 text-navy text-[0.68rem] font-semibold px-3 py-1 rounded-sm">
                        Stage: {sec.title}
                      </span>
                      <span className="bg-gold/10 border border-gold/25 text-gold-deep text-[0.68rem] font-semibold px-3 py-1 rounded-sm">
                        Images: {step.images.length} available
                      </span>
                    </div>
                  </Reveal>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA + NAVIGATION ─────────────────────────────── */}
      <section className="bg-cream border-t border-border/40 py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section nav */}
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 pb-12 border-b border-border/40">
              <div>
                {prev ? (
                  <Link href={`/process/${prev.slug}`} className="group flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold-deep transition-colors bg-white shadow-xs">
                      <ArrowLeft className="w-4 h-4 text-navy group-hover:text-gold-deep" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Previous Stage</div>
                      <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold-deep transition-colors">{prev.title}</div>
                    </div>
                  </Link>
                ) : (
                  <Link href="/process" className="group flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold-deep transition-colors bg-white shadow-xs">
                      <ArrowLeft className="w-4 h-4 text-navy group-hover:text-gold-deep" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Back to</div>
                      <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold-deep transition-colors">All Process Stages</div>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {next ? (
                  <Link href={`/process/${next.slug}`} className="group flex items-center gap-3 sm:text-right">
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">Next Stage</div>
                      <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold-deep transition-colors">{next.title}</div>
                    </div>
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold-deep transition-colors bg-white shadow-xs">
                      <ArrowRight className="w-4 h-4 text-navy group-hover:text-gold-deep" strokeWidth={1.5} />
                    </span>
                  </Link>
                ) : (
                  <Link href="/process" className="group flex items-center gap-3">
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-widest text-foreground/45 font-medium">View all</div>
                      <div className="font-semibold text-navy text-[0.9rem] group-hover:text-gold-deep transition-colors">Process Stages</div>
                    </div>
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold-deep transition-colors bg-white shadow-xs">
                      <ArrowRight className="w-4 h-4 text-navy group-hover:text-gold-deep" strokeWidth={1.5} />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          {/* WhatsApp inquiry */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 border border-gold/25 rounded-sm bg-white px-8 py-7 shadow-xs">
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
                  className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold whitespace-nowrap shadow-xs"
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
          </Reveal>

        </div>
      </section>

    </div>
  );
}
