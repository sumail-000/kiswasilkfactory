"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Notice, SaveBar } from "@/components/admin/ui";
import { saveGalleryAction } from "@/app/admin/actions";
import type { GalleryItem, Product } from "@/lib/content";

/**
 * Category tabs on the public gallery page. `all` is implicit — validation adds
 * it to every item — so it is not offered as a choice here.
 */
const CATEGORIES = [
  { id: "raw-silk", label: "Raw Silks" },
  { id: "chiffon-crinkle", label: "Chiffon & Crinkle" },
  { id: "fine-silk", label: "Fine & Shiny" },
  { id: "organza-net", label: "Organza & Net" },
  { id: "prints-sublimation", label: "Prints & Sublimation" },
  { id: "lining", label: "Lining & Inners" },
];

const BLANK: GalleryItem = { src: "", label: "", cat: ["all"], ask: true, slug: "" };

export default function GalleryManager({
  initial,
  products,
}: {
  initial: GalleryItem[];
  products: Product[];
}) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const mutate = (next: GalleryItem[]) => {
    setItems(next);
    setDirty(true);
  };

  const update = (index: number, patch: Partial<GalleryItem>) =>
    mutate(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    mutate(next);
    setOpenIndex(openIndex === from ? to : null);
  };

  const toggleCategory = (index: number, id: string) => {
    const current = items[index].cat;
    update(index, {
      cat: current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    });
  };

  const save = async () => {
    setSaving(true);
    setNotice(null);
    const result = await saveGalleryAction(items);
    setSaving(false);

    if (result.ok) {
      setDirty(false);
      setNotice({ tone: "ok", text: result.message ?? "Saved." });
    } else {
      setNotice({ tone: "error", text: result.errors.join(" ") });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Gallery</h1>
          <p className="mt-1 text-sm text-navy/60">
            {items.length} images · the first 6 also appear on the home page
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            mutate([BLANK, ...items]);
            setOpenIndex(0);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
        >
          <Plus className="h-4 w-4" />
          Add image
        </button>
      </header>

      {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={`${i}-${item.src}`} className="rounded-lg border border-black/10 bg-white">
            <div className="flex items-center gap-3 p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-cream">
                <SmartImage src={item.src} alt="" fill sizes="56px" className="object-cover" />
              </div>

              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="truncate font-medium text-navy">
                  {item.label || <span className="text-navy/40">Untitled image</span>}
                </div>
                <div className="truncate text-[0.72rem] text-navy/45">
                  {item.cat.filter((c) => c !== "all").join(", ") || "No category"}
                </div>
              </button>

              <div className="flex shrink-0 items-center gap-1">
                <MiniButton label="Move up" onClick={() => move(i, i - 1)} disabled={i === 0}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </MiniButton>
                <MiniButton label="Move down" onClick={() => move(i, i + 1)} disabled={i === items.length - 1}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </MiniButton>
                <MiniButton
                  label="Remove"
                  danger
                  onClick={() => {
                    mutate(items.filter((_, index) => index !== i));
                    setOpenIndex(null);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </MiniButton>
              </div>
            </div>

            {openIndex === i && (
              <div className="space-y-3 border-t border-black/10 p-4">
                <label className="block">
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
                    Image link
                  </span>
                  <input
                    value={item.src}
                    onChange={(e) => update(i, { src: e.target.value })}
                    placeholder="https://…"
                    className="w-full rounded-md border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-gold"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
                    Caption
                  </span>
                  <input
                    value={item.label}
                    onChange={(e) => update(i, { label: e.target.value })}
                    className="w-full rounded-md border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-gold"
                  />
                </label>

                <div>
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
                    Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCategory(i, c.id)}
                        className={`rounded-full border px-3 py-1.5 text-[0.74rem] font-medium transition-colors ${
                          item.cat.includes(c.id)
                            ? "border-navy bg-navy text-white"
                            : "border-black/20 text-navy hover:bg-black/5"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
                    Linked fabric
                  </span>
                  <select
                    value={item.slug}
                    onChange={(e) => update(i, { slug: e.target.value })}
                    className="w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
                  >
                    <option value="">None</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1 block text-[0.7rem] text-navy/45">
                    Shows this fabric&rsquo;s details when a visitor opens the image.
                  </span>
                </label>

                <label className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={item.ask}
                    onChange={(e) => update(i, { ask: e.target.checked })}
                    className="h-4 w-4 accent-[var(--color-gold)]"
                  />
                  <span className="text-sm text-navy">Show &ldquo;Ask about this fabric&rdquo; button</span>
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>

      <SaveBar dirty={dirty} saving={saving} onSave={save} />
    </div>
  );
}

function MiniButton({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-8 w-8 place-items-center rounded border transition-colors disabled:opacity-30 ${
        danger ? "border-red-200 text-red-600 hover:bg-red-50" : "border-black/15 text-navy/70 hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}
