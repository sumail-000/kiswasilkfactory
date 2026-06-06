import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle, Mail, FileText, Settings, Package, Factory, Globe,
  Check, ArrowRight, Palette, Printer, Scissors, Dumbbell, Crown,
  Store, PenTool, Users, Phone, MapPin,
} from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

/* ─── data ───────────────────────────────────────── */
const ABOUT_BULLETS = [
  "Carefully selected yarns & advanced weaving",
  "Uniform finish, high whiteness & smooth texture",
  "Custom specifications & private label options",
  "Bulk production capacity with timely delivery",
];

const FABRICS = [
  { img: "/assets/fabric-dull-raw.jpg",     name: "Dull Raw Silk",       desc: "Natural matt finish smooth & soft feel",     slug: "special-dull-raw-silk" },
  { img: "/assets/fabric-bright-raw.jpg",   name: "Bright Raw Silk",     desc: "Bright luster with silky smooth finish",     slug: "raw-silk-shine" },
  { img: "/assets/fabric-dull-resham.jpg",  name: "Dull Resham Cotton",  desc: "Silk-cotton blend for soft & breathable feel",slug: "dull-resham-cotton" },
  { img: "/assets/fabric-bright-resham.jpg",name: "Bright Resham Cotton",desc: "Silky sheen with comfortable texture",        slug: "bright-resham-cotton" },
  { img: "/assets/fabric-bemberg.jpg",      name: "30D Bemberg",         desc: "Lightweight, smooth & premium drape",        slug: "30d-bemberg-crinkle" },
  { img: "/assets/fabric-crinkle.jpg",      name: "40D Crinkle",         desc: "Soft crinkle texture with rich look",         slug: "40d-red-stone-crinkle" },
  { img: "/assets/fabric-korean.jpg",       name: "Korean Raw Silk",     desc: "Premium quality sturdy & durable",            slug: "korean-raw-silk" },
  { img: "/assets/fabric-sheesha.jpg",      name: "Sheesha Silk",        desc: "Shiny texture for luxury heavy work",         slug: "sheesha-silk" },
];

const APPLICATIONS = [
  { icon: Palette, label: "Dyeing" },
  { icon: Printer,      label: "Printing" },
  { icon: Scissors,     label: "Embroidery" },
  { icon: Dumbbell,      label: "Heavy Work" },
];

const WHO_WE_SERVE = [
  { icon: Crown,   label: "Fashion Brands" },
  { icon: Store,   label: "Boutiques" },
  { icon: PenTool, label: "Designers" },
  { icon: Users,   label: "Wholesalers & Traders" },
];

const WHY_CHOOSE = [
  "Premium quality white-base silk fabrics",
  "Advanced weaving & finishing technology",
  "Consistent quality & competitive pricing",
  "Bulk supply & on-time global delivery",
];

const OUR_PROCESS = [
  "Yarn Selection",
  "Weaving & Finishing",
  "Quality Checking",
  "Packing & Labeling",
  "Dispatch & Delivery",
];

const GALLERY = [
  { img: "/assets/gallery-rolls.jpg",   label: "Fabric Rolls" },
  { img: "/assets/gallery-yarn.jpg",    label: "Yarn Preparation" },
  { img: "/assets/gallery-weaving.jpg", label: "Weaving Section" },
  { img: "/assets/gallery-quality.jpg", label: "Quality Checking" },
  { img: "/assets/gallery-packing.jpg", label: "Packing" },
  { img: "/assets/gallery-dispatch.jpg",label: "Bulk Dispatch" },
];

const HERO_IMAGES = [
  { src: "/assets/silk-rolls.jpg",     alt: "Silk fabric rolls" },
  { src: "/assets/silk-swirl.jpg",     alt: "Cream silk swirl" },
  { src: "/assets/silk-drape.jpg",     alt: "Draped silk fabric" },
  { src: "/assets/silk-warehouse.jpg", alt: "Silk warehouse rolls" },
];

const CONTACT_ITEMS = [
  { icon: Phone,  t1: SITE.phone,         t2: "(WhatsApp Available)" },
  { icon: Mail,   t1: SITE.email,         t2: "Email Us" },
  { icon: MapPin, t1: SITE.instagram,     t2: "Follow Us" },
  { icon: MapPin, t1: SITE.address.line1, t2: SITE.address.line2 },
];

/* ─── page ───────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

          {/* Left */}
          <div className="flex flex-col justify-center px-6 lg:px-10 py-16 lg:pr-20 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest">PREMIUM WHITE-BASE SILK FABRICS</span>
            </div>
            <h2 className="font-display font-bold text-navy text-[clamp(2.2rem,4vw,56px)] leading-[1.1] mb-8">
              Crafting Excellence in White-Base Silk Fabrics for Every Application
            </h2>
            <p className="text-foreground/80 text-base leading-relaxed mb-10 max-w-md">
              Kiswa Silk Factory is a trusted B2B manufacturer of premium white-base silk fabrics for dyeing, printing, embroidery and heavy work. Consistent quality. Reliable supply. Global trust.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link href="/bulk-supply" className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-4 rounded-md hover:bg-navy/90 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-semibold">Get Bulk Quote</span>
              </Link>
              <Link href="/sample-request" className="flex items-center gap-2 border-2 border-gold text-navy px-6 py-[14px] rounded-md hover:bg-gold/10 transition-colors">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">Request Sample</span>
              </Link>
              <a
                href={`https://wa.me/${SITE.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-whatsapp text-navy px-6 py-[14px] rounded-md hover:bg-whatsapp/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                <span className="text-sm font-semibold">WhatsApp Inquiry</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: Settings, t1: "Premium Quality", t2: "Assured" },
                { icon: Package,  t1: "Bulk Supply",     t2: "Ready" },
                { icon: Factory, t1: "Custom Weaves",   t2: "Available" },
                { icon: Globe,    t1: "Global Shipping", t2: "Reliable & On-Time" },
              ].map(({ icon: Icon, t1, t2 }) => (
                <div key={t1} className="flex items-center gap-3">
                  <Icon className="w-7 h-7 text-gold shrink-0" strokeWidth={1.2} />
                  <div>
                    <div className="text-sm font-semibold text-navy leading-tight">{t1}</div>
                    <div className="text-sm text-foreground/70 leading-tight">{t2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2×2 image grid with S-curve cream overlay */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
              {HERO_IMAGES.map((img) => (
                <div key={img.src} className="relative overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover" priority />
                </div>
              ))}
            </div>
            {/* S-curve cream divider — exact match from Pixel Perfect UI */}
            <svg
              className="absolute left-0 top-0 h-full w-[220px] -translate-x-[1px] z-10 pointer-events-none"
              viewBox="0 0 220 700"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 0 0 L 150 0 C 20 90 -10 240 60 350 C 130 460 170 600 120 700 L 0 700 Z"
                fill="oklch(0.97 0.015 85)"
              />
              <path
                d="M 150 0 C 20 90 -10 240 60 350 C 130 460 170 600 120 700"
                stroke="oklch(0.72 0.15 55)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT US ══════════════ */}
      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative w-full h-[460px] overflow-hidden rounded-sm bg-cream">
              <Image src="/assets/about-silk.jpg" alt="Kiswa silk fabric in warehouse" fill sizes="50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest">ABOUT US</span>
            </div>
            <h2 className="font-display font-bold text-navy text-[clamp(2rem,3.5vw,44px)] leading-tight mb-6">Kiswa Silk Factory</h2>
            <p className="text-foreground/80 text-base leading-relaxed mb-8 max-w-lg">
              With years of expertise in white-base silk fabrics, we cater to fashion brands, boutiques, designers, printers, embroiderers and industrial buyers worldwide.
            </p>
            <ul className="space-y-4 mb-10">
              {ABOUT_BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-navy text-base">{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/about" className="inline-flex items-center gap-3 bg-navy text-primary-foreground px-7 py-4 rounded-md hover:bg-navy/90 transition-colors">
              <span className="text-sm font-semibold">Know More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ FABRIC COLLECTION ══════════════ */}
      <section className="bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
          <Reveal className="text-center mb-12">
            <div className="text-gold text-sm font-semibold tracking-widest mb-3">OUR FABRIC COLLECTION</div>
            <h2 className="font-display font-bold text-navy text-[clamp(2rem,3.5vw,44px)] leading-tight">Premium White-Base Silk Fabrics</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-16 h-px bg-gold" />
              <span className="text-gold text-xs">❖</span>
              <span className="w-16 h-px bg-gold" />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
            {FABRICS.map((f) => (
              <Reveal key={f.name} className="bg-background rounded-sm overflow-hidden flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-cream">
                  <Image src={f.img} alt={f.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 12.5vw" className="object-cover" />
                </div>
                <div className="p-4 flex flex-col items-center text-center flex-1">
                  <h3 className="font-display font-bold text-navy text-base mb-2">{f.name}</h3>
                  <p className="text-foreground/70 text-xs leading-snug mb-4">{f.desc}</p>
                  <p className="text-navy text-xs font-semibold mb-4 mt-auto">Width: 44&quot; – 54&quot;</p>
                  <Link
                    href={`/fabrics/${f.slug}`}
                    className="w-full bg-navy text-primary-foreground text-xs font-semibold py-2.5 rounded-sm hover:bg-navy/90 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ INFO STRIP ══════════════ */}
      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Applications */}
          <Reveal className="border border-gold/30 rounded-sm p-6 flex flex-col">
            <div className="text-center text-gold text-xs font-semibold tracking-widest mb-6">APPLICATIONS</div>
            <div className="grid grid-cols-4 gap-2 mb-6 flex-1">
              {APPLICATIONS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-8 h-8 text-navy" strokeWidth={1.2} />
                  <div className="text-[11px] text-navy font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>
            <Link href="/applications" className="mx-auto border border-gold text-navy text-xs font-semibold px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors">
              Explore All Applications
            </Link>
          </Reveal>

          {/* Who We Serve */}
          <Reveal className="border border-gold/30 rounded-sm p-6 flex flex-col">
            <div className="text-center text-gold text-xs font-semibold tracking-widest mb-6">WHO WE SERVE</div>
            <div className="grid grid-cols-4 gap-2 mb-6 flex-1">
              {WHO_WE_SERVE.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-8 h-8 text-navy" strokeWidth={1.2} />
                  <div className="text-[11px] text-navy font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="mx-auto border border-gold text-navy text-xs font-semibold px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors">
              View All Industries
            </Link>
          </Reveal>

          {/* Why Choose */}
          <Reveal className="border border-gold/30 rounded-sm p-6 flex flex-col">
            <div className="text-center text-gold text-xs font-semibold tracking-widest mb-6">WHY CHOOSE KISWA SILK FACTORY</div>
            <ul className="space-y-3 mb-6 flex-1">
              {WHY_CHOOSE.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-navy text-xs leading-snug">{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/bulk-supply" className="mx-auto border border-gold text-navy text-xs font-semibold px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors">
              More Reasons to Choose Us
            </Link>
          </Reveal>

          {/* Our Process */}
          <Reveal className="border border-gold/30 rounded-sm p-6 flex flex-col">
            <div className="text-center text-gold text-xs font-semibold tracking-widest mb-6">OUR PROCESS</div>
            <div className="flex items-start justify-between mb-6 flex-1 relative">
              {OUR_PROCESS.map((step, i) => (
                <div key={step} className="flex flex-col items-center text-center flex-1 relative z-10">
                  <div className="w-7 h-7 rounded-full border border-gold bg-background flex items-center justify-center text-gold text-xs font-bold mb-2">{i + 1}</div>
                  <div className="text-[10px] text-navy font-medium leading-tight px-1">{step}</div>
                </div>
              ))}
              <div className="absolute top-3.5 left-[10%] right-[10%] h-px bg-gold/40 -z-0" />
            </div>
            <Link href="/quality" className="mx-auto border border-gold text-navy text-xs font-semibold px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors">
              Explore Our Process
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ GALLERY PREVIEW ══════════════ */}
      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16">
          <Reveal className="flex items-center justify-center gap-3 mb-10">
            <span className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest">GALLERY PREVIEW</span>
            <span className="w-12 h-px bg-gold" />
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {GALLERY.map((g) => (
              <Reveal key={g.label} className="flex flex-col">
                <Link href="/gallery" className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-cream">
                    <Image src={g.img} alt={g.label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="text-center text-navy text-xs font-semibold mt-3">{g.label}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BULK CTA BAR ══════════════ */}
      <section className="bg-navy text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </span>
            <div>
              <h3 className="font-display font-bold text-2xl mb-1">Looking for White-Base Silk Fabric in Bulk?</h3>
              <p className="text-primary-foreground/70 text-sm">Get competitive pricing, consistent quality and on-time delivery for your business.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/bulk-supply" className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-sm hover:bg-gold/90 transition-colors">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-semibold">Get Bulk Quote</span>
            </Link>
            <Link href="/sample-request" className="flex items-center gap-2 border border-primary-foreground/50 text-primary-foreground px-6 py-3 rounded-sm hover:bg-primary-foreground/10 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-semibold">Request Sample</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ GET IN TOUCH ══════════════ */}
      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
          <Reveal className="flex items-center justify-center gap-3 mb-10">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest">GET IN TOUCH</span>
            <span className="w-10 h-px bg-gold" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {CONTACT_ITEMS.map(({ icon: Icon, t1, t2 }, i) => (
              <Reveal key={i} className="flex items-center gap-4 justify-center lg:border-r last:border-r-0 border-gold/30 py-4">
                <span className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </span>
                <div>
                  <div className="text-navy font-semibold text-sm">{t1}</div>
                  <div className="text-foreground/60 text-xs">{t2}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
