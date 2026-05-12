import Link from "next/link";
import Image from "next/image";

export default function FabricCard({
  href,
  src,
  alt,
  number,
  meta,
  title,
}: {
  href: string;
  src: string;
  alt: string;
  number?: string;
  meta?: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="bg-cream group relative block aspect-[4/5] overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="bg-ivory text-charcoal absolute top-5 right-5 grid h-11 w-11 -translate-y-2 place-items-center rounded-full opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        →
      </div>
      <div className="from-charcoal/0 to-charcoal/80 text-ivory absolute right-0 bottom-0 left-0 bg-gradient-to-t px-6 py-5">
        <span className="text-gold-soft block text-[0.72rem] tracking-[0.2em] uppercase">
          {number ? `${number} · ` : ""}
          {meta}
        </span>
        <h4 className="text-ivory font-display mt-1 text-[1.4rem]">
          {title}
        </h4>
      </div>
    </Link>
  );
}
