export default function TrustBand({
  label = "Compliance & Trade Memberships",
  marks = [
    { name: "OEKO-TEX", note: "Standard 100" },
    { name: "ISO 9001", note: "Quality" },
    { name: "PCSIR", note: "Tested" },
    { name: "TDAP", note: "Pakistan Trade" },
    { name: "SEDEX", note: "Audited" },
  ],
}: {
  label?: string;
  marks?: { name: string; note: string }[];
}) {
  return (
    <div className="border-line bg-ivory border-y">
      <div className="container-x grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-[auto_1fr]">
        <p className="border-line text-muted text-[0.72rem] font-medium tracking-[0.22em] uppercase md:border-r md:pr-8">
          {label}
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {marks.map((m) => (
            <span
              key={m.name}
              className="font-display text-charcoal-soft inline-flex items-center gap-2 text-[1.3rem] tracking-[0.04em] opacity-80"
            >
              {m.name}
              <small className="font-sans text-muted text-[0.65rem] tracking-[0.18em] uppercase opacity-85">
                {m.note}
              </small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
