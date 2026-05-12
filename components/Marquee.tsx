export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="bg-charcoal text-ivory-soft overflow-hidden border-y border-white/5 py-5">
      <div className="marquee-track inline-flex gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display inline-flex items-center gap-16 text-[1.6rem] font-light italic"
          >
            {item}
            <span className="text-gold text-base not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
