"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Notice } from "@/components/admin/ui";
import { deleteProductAction, reorderProductsAction } from "@/app/admin/actions";
import type { Product } from "@/lib/content";

/**
 * Fabric catalogue list.
 *
 * Reordering and deleting save immediately — they are single, unambiguous
 * actions, so a separate "save" step would only add a way to lose the change.
 * Field editing lives on the detail screen, where a save button does belong.
 */
export default function ProductsManager({ initial }: { initial: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const visible = products.filter((p) =>
    `${p.name} ${p.category} ${p.composition}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const move = async (slug: string, direction: -1 | 1) => {
    const from = products.findIndex((p) => p.slug === slug);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= products.length) return;

    const next = [...products];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);

    const previous = products;
    setProducts(next); // optimistic
    setBusy(true);
    try {
      const result = await reorderProductsAction(next.map((p) => p.slug));
      if (!result.ok) {
        setProducts(previous);
        setNotice({ tone: "error", text: result.errors.join(" ") });
      } else {
        setNotice(null);
      }
    } catch (error) {
      setProducts(previous); // the server rejected it; don't show a false order
      setNotice({
        tone: "error",
        text: `Could not save the new order: ${error instanceof Error ? error.message : "unexpected server error"}.`,
      });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (product: Product) => {
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone from here — you would need to restore a version from History.`)) {
      return;
    }

    setBusy(true);
    try {
      const result = await deleteProductAction(product.slug);
      if (result.ok) {
        setProducts((current) => current.filter((p) => p.slug !== product.slug));
        setNotice({ tone: "ok", text: result.message ?? "Deleted." });
      } else {
        setNotice({ tone: "error", text: result.errors.join(" ") });
      }
    } catch (error) {
      setNotice({
        tone: "error",
        text: `Could not delete: ${error instanceof Error ? error.message : "unexpected server error"}.`,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Fabrics</h1>
          <p className="mt-1 text-sm text-navy/60">
            {products.length} fabrics · the first 8 appear on the home page
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
        >
          <Plus className="h-4 w-4" />
          Add fabric
        </Link>
      </header>

      {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fabrics…"
        className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
      />

      <ul className="space-y-2">
        {visible.map((p) => {
          const position = products.findIndex((x) => x.slug === p.slug);
          return (
            <li
              key={p.slug}
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-cream">
                <SmartImage src={p.heroImage} alt="" fill sizes="56px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-navy">{p.name}</span>
                  {position < 8 && (
                    <span className="hidden shrink-0 rounded bg-gold/20 px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wide text-gold-deep sm:inline">
                      Home
                    </span>
                  )}
                </div>
                <div className="truncate text-[0.72rem] text-navy/50">
                  {p.width} · {p.gsm} · {p.images.length} image{p.images.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {/* Reordering only makes sense against the full, unfiltered list. */}
                {!query && (
                  <>
                    <SmallButton label="Move up" onClick={() => move(p.slug, -1)} disabled={busy || position === 0}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </SmallButton>
                    <SmallButton
                      label="Move down"
                      onClick={() => move(p.slug, 1)}
                      disabled={busy || position === products.length - 1}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </SmallButton>
                  </>
                )}
                <Link
                  href={`/admin/products/${p.slug}`}
                  aria-label={`Edit ${p.name}`}
                  className="grid h-8 w-8 place-items-center rounded border border-black/15 text-navy/70 hover:bg-black/5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <SmallButton label={`Delete ${p.name}`} danger onClick={() => remove(p)} disabled={busy}>
                  <Trash2 className="h-3.5 w-3.5" />
                </SmallButton>
              </div>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-navy/50">
          No fabrics match “{query}”.
        </p>
      )}
    </div>
  );
}

function SmallButton({
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
