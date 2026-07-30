"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Field, LinesField, Notice, SaveBar, TextArea } from "@/components/admin/ui";
import ImageListEditor from "@/components/admin/ImageListEditor";
import { saveProductAction } from "@/app/admin/actions";
// Imported from `content/types`, not the `@/lib/content` barrel: the barrel
// reaches into storage, which imports `node:fs` and cannot be bundled for the
// browser. Client components take types and constants from here.
import { APP_TAGS, type AppTag, type Product } from "@/lib/content/types";
import { slugify } from "@/lib/content/validate";

const BLANK: Product = {
  slug: "",
  name: "",
  cardDesc: "",
  shortDesc: "",
  composition: "100% Viscose",
  width: "",
  gsm: "",
  category: "",
  finish: "",
  dyeable: true,
  uses: [],
  features: [],
  tags: [],
  heroImage: "",
  images: [],
};

export default function ProductEditor({
  product,
  isNew,
}: {
  product: Product | null;
  isNew: boolean;
}) {
  const router = useRouter();
  const originalSlug = product?.slug ?? null;

  const [draft, setDraft] = useState<Product>(product ?? BLANK);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const set = <K extends keyof Product>(key: K, value: Product[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const toggleTag = (tag: AppTag) =>
    set("tags", draft.tags.includes(tag) ? draft.tags.filter((t) => t !== tag) : [...draft.tags, tag]);

  const save = async () => {
    setSaving(true);
    setNotice(null);

    // The slug is derived from the name when left blank, and the hero image is
    // always the first in the list — one less thing to keep in sync by hand.
    const payload: Product = {
      ...draft,
      slug: slugify(draft.slug || draft.name),
      heroImage: draft.images[0] ?? draft.heroImage,
    };

    try {
      const result = await saveProductAction(originalSlug, payload);

      if (!result.ok) {
        setNotice({ tone: "error", text: result.errors.join(" ") });
        return;
      }

      setDirty(false);
      setNotice({ tone: "ok", text: result.message ?? "Saved." });

      // A new fabric, or a renamed slug, lives at a different URL now.
      if (payload.slug !== originalSlug) {
        router.replace(`/admin/products/${payload.slug}`);
      }
      router.refresh();
    } catch (error) {
      setNotice({
        tone: "error",
        text: `Save failed: ${error instanceof Error ? error.message : "unexpected server error"}. Your changes are still on screen — try again.`,
      });
    } finally {
      // In `finally` so an unexpected throw can never strand the button on
      // "Saving…" with no way to retry.
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-[0.8rem] text-navy/60 hover:text-navy"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All fabrics
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-navy">
          {isNew ? "Add fabric" : draft.name || "Untitled fabric"}
        </h1>
      </div>

      {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Basics</h2>

        <Field label="Fabric name" required value={draft.name} onChange={(v) => set("name", v)} />
        <Field
          label="URL slug"
          value={draft.slug}
          onChange={(v) => set("slug", v)}
          placeholder={slugify(draft.name) || "my-fabric"}
          hint={`Page address: /fabrics/${slugify(draft.slug || draft.name) || "…"} — changing this breaks old links.`}
        />
        <Field
          label="Card description"
          value={draft.cardDesc}
          onChange={(v) => set("cardDesc", v)}
          hint="One short line, shown on the fabric cards."
        />
        <TextArea
          label="Full description"
          value={draft.shortDesc}
          onChange={(v) => set("shortDesc", v)}
          rows={3}
          hint="Shown on the fabric's own page."
        />
      </section>

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Specifications</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Composition" value={draft.composition} onChange={(v) => set("composition", v)} />
          <Field label="Width" value={draft.width} onChange={(v) => set("width", v)} placeholder='44" – 62"' />
          <Field label="GSM" value={draft.gsm} onChange={(v) => set("gsm", v)} placeholder="90 GSM" />
          <Field label="Finish" value={draft.finish} onChange={(v) => set("finish", v)} />
        </div>

        <Field label="Category" value={draft.category} onChange={(v) => set("category", v)} />

        <label className="flex items-center gap-3 rounded-md border border-black/10 px-3.5 py-3">
          <input
            type="checkbox"
            checked={draft.dyeable}
            onChange={(e) => set("dyeable", e.target.checked)}
            className="h-4 w-4 accent-[var(--color-gold)]"
          />
          <span className="text-sm text-navy">Dyeable</span>
        </label>
      </section>

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Applications</h2>
        <p className="text-[0.75rem] text-navy/50">
          These drive the filter tabs on the Fabrics page and the suitability table.
        </p>

        <div className="flex flex-wrap gap-2">
          {APP_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors ${
                draft.tags.includes(tag)
                  ? "border-navy bg-navy text-white"
                  : "border-black/20 text-navy hover:bg-black/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <LinesField label="Uses" values={draft.uses} onChange={(v) => set("uses", v)} />
        <LinesField label="Features" values={draft.features} onChange={(v) => set("features", v)} />
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <ImageListEditor images={draft.images} onChange={(v) => set("images", v)} />
      </section>

      <SaveBar dirty={dirty} saving={saving} onSave={save} />
    </div>
  );
}
