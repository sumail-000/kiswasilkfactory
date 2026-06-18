import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Fabric Guide & Journal",
  description:
    "Working notes on silk: weight charts, dye care, weaving process and the practical knowledge our buyers ask for most often.",
};

const POSTS = [
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    meta: "Process · 8 min read",
    title: "Inside our jacquard floor: how custom motifs come to life",
    body: "From CAD card-cutting to woven sample, the four-week journey of a custom jacquard.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=900&q=80",
    meta: "Care · 4 min read",
    title: "Caring for pure silk: a wholesaler's checklist",
    body: "Storage humidity, fold direction, and the small habits that keep finished bolts shop-ready.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    meta: "Dye Notes · 6 min read",
    title: "Reactive vs acid dye on silk: what changes for the buyer?",
    body: "Wash-fastness, hand, and which to specify when colour matters more than feel.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=900&q=80",
    meta: "Buyer Guide · 5 min read",
    title: "Selecting silk for bridal couture: a sourcing checklist",
    body: "Five questions to ask before you commit to a base cloth — drape, stand, embroidery weight, photo response, climate.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=900&q=80",
    meta: "Standards · 7 min read",
    title: "The four-point inspection system, explained.",
    body: "How rolls are graded, what counts as a defect, and what we mean when we say \"first quality\".",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80",
    meta: "Sustainability · 6 min read",
    title: "Effluent treatment in our dye-house: what we discharge.",
    body: "A walk-through of our three-stage water treatment plant and the BOD/COD limits we hit.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1542838687-3c7df97a3b1d?auto=format&fit=crop&w=900&q=80",
    meta: "Fabric Comparison · 5 min",
    title: "Crepe, charmeuse, satin: telling the four shines apart.",
    body: "A quick visual and tactile reference for the four most-confused silk surfaces.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=900&q=80",
    meta: "Production · 9 min read",
    title: "From cocoon to thread: visiting the reeling floor.",
    body: "How raw silk filament is unwound, combined, and prepared for our throwing line.",
  },
  {
    href: "/blog",
    img: "https://images.unsplash.com/photo-1620975014050-3f3a08293a86?auto=format&fit=crop&w=900&q=80",
    meta: "Heritage · 6 min read",
    title: "Why Pakistani silk has a quiet reputation in Europe.",
    body: "A short history of the Sialkot–Gujranwala silk corridor and the buyers who know it.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHead
        eyebrow="Journal & Fabric Guide"
        title={
          <>
            Notes from the <em className="italic-accent text-gold-soft font-light">loom floor.</em>
          </>
        }
        lede="Working notes on silk selection, weight charts, dye care and the practical knowledge our buyers ask for most often. Written by the people who run the mill."
        imageSrc="/assets/silk-rolls.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Fabric Guide" }]}
      />

      <section className="section-y">
        <div className="container-x">
          {/* Featured */}
          <Reveal className="border-line mb-16 grid grid-cols-1 items-center gap-10 border-b pb-16 lg:grid-cols-[7fr_5fr]">
            <Link href="/blog" className="group bg-cream relative aspect-[16/11] block overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=1400&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-104"
              />
            </Link>
            <div>
              <div className="text-gold-deep mb-2 text-[0.72rem] tracking-[0.18em] uppercase">
                Featured · Buyer Guide
              </div>
              <h2 className="mb-4 text-[clamp(1.8rem,3.5vw,2.8rem)]">
                Reading momme weight: a wholesale buyer&rsquo;s quick reference.
              </h2>
              <p className="text-muted mb-6">
                Why 16 mm charmeuse drapes differently from 22 mm — and which
                weights suit which garments. Plus a printable cross-reference
                between momme, gsm, oz/yd² and pick-density.
              </p>
              <Link href="/blog" className="btn-text">
                Read the Guide <span>→</span>
              </Link>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <Reveal key={p.title}>
                <Link href={p.href} className="group block">
                  <div className="bg-cream relative mb-5 aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-gold-deep mb-2 text-[0.72rem] tracking-[0.18em] uppercase">
                    {p.meta}
                  </div>
                  <h3 className="group-hover:text-gold-deep mb-2 text-[1.6rem] transition">
                    {p.title}
                  </h3>
                  <p className="text-muted text-[0.95rem]">{p.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-charcoal text-ivory py-20">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-soft mb-5">Subscribe</p>
            <h2 className="text-ivory">
              Two notes, <span className="italic-accent">every quarter</span>.
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede text-ivory/78 mb-6">
              Quarterly newsletter from the trade desk: new shades on the
              loom, what&rsquo;s running, and any regulatory changes that affect
              imports of pure silk.
            </p>
            <form className="flex flex-wrap gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="bg-charcoal text-ivory placeholder:text-ivory/50 min-w-[220px] flex-1 border border-white/30 px-5 py-4"
              />
              <button type="submit" className="btn btn-gold">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
