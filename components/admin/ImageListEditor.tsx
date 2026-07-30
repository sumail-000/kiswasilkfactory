"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { isValidImageRef } from "@/lib/content/validate";

/**
 * Ordered list of image references, each shown with a live thumbnail.
 *
 * Reordering uses explicit up/down buttons rather than drag-and-drop: dragging
 * is unreliable on touch, and this list is edited from a phone as often as a
 * desktop. The first entry is the hero image, which is stated in the UI.
 */
export default function ImageListEditor({
  images,
  onChange,
  disabled,
}: {
  images: string[];
  onChange: (images: string[]) => void;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...images, value]);
    setDraft("");
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const update = (index: number, value: string) =>
    onChange(images.map((img, i) => (i === index ? value : img)));

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
          Images
        </span>
        <span className="text-[0.68rem] text-navy/45">
          {images.length} · first one is the main photo
        </span>
      </div>

      <ul className="space-y-2">
        {images.map((img, i) => {
          const valid = isValidImageRef(img);
          return (
            <li
              key={`${i}-${img}`}
              className="flex items-start gap-3 rounded-md border border-black/10 bg-white p-2.5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-cream">
                <SmartImage src={img} alt="" fill sizes="64px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <input
                  value={img}
                  disabled={disabled}
                  onChange={(e) => update(i, e.target.value)}
                  className="w-full rounded border border-black/15 px-2.5 py-1.5 text-[0.78rem] text-navy outline-none focus:border-gold"
                />
                <div className="flex items-center gap-2">
                  {i === 0 && (
                    <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-gold-deep">
                      Main
                    </span>
                  )}
                  {!valid && (
                    <span className="text-[0.68rem] text-red-600">Not a valid link or /path</span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <div className="flex gap-1">
                  <IconButton label="Move up" onClick={() => move(i, i - 1)} disabled={disabled || i === 0}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    label="Move down"
                    onClick={() => move(i, i + 1)}
                    disabled={disabled || i === images.length - 1}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
                <IconButton
                  label="Remove"
                  danger
                  disabled={disabled}
                  onClick={() => onChange(images.filter((_, index) => index !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>

      {images.length === 0 && (
        <p className="rounded-md border border-dashed border-black/15 p-4 text-center text-[0.78rem] text-navy/50">
          No images yet. Paste a link below.
        </p>
      )}

      <div className="flex gap-2">
        <input
          value={draft}
          disabled={disabled}
          placeholder="https://… or /products/my-fabric/img1.jpeg"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="min-w-0 flex-1 rounded-md border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={add}
          disabled={disabled || !draft.trim()}
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}

function IconButton({
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
      className={`grid h-7 w-7 place-items-center rounded border transition-colors disabled:opacity-30 ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-black/15 text-navy/70 hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}
