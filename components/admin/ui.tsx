"use client";

import { useEffect } from "react";

/* ─── form fields ──────────────────────────────────────────── */

const inputClass =
  "w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold disabled:bg-black/5";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
  required,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
      {hint && <span className="mt-1 block text-[0.7rem] text-navy/45">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y leading-relaxed`}
      />
      {hint && <span className="mt-1 block text-[0.7rem] text-navy/45">{hint}</span>}
    </label>
  );
}

/**
 * Edits a string list as one-item-per-line text.
 *
 * Deliberately simpler than a row-per-item widget: typing a list is faster than
 * tapping "add" repeatedly, and it behaves well with a phone keyboard.
 */
export function LinesField({
  label,
  values,
  onChange,
  hint,
  rows = 4,
  disabled,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  hint?: string;
  rows?: number;
  disabled?: boolean;
}) {
  return (
    <TextArea
      label={label}
      value={values.join("\n")}
      rows={rows}
      disabled={disabled}
      hint={hint ?? "One per line."}
      onChange={(text) =>
        onChange(
          text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        )
      }
    />
  );
}

/* ─── feedback ─────────────────────────────────────────────── */

export function Notice({ tone, children }: { tone: "ok" | "error"; children: React.ReactNode }) {
  const styles =
    tone === "ok"
      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
      : "border-red-300 bg-red-50 text-red-800";
  return (
    <div role="status" className={`rounded-md border p-3 text-[0.8rem] leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

/**
 * Save controls. Fixed to the bottom of the viewport on mobile so the button is
 * always reachable in a long form; inline on desktop.
 */
export function SaveBar({
  dirty,
  saving,
  onSave,
  children,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  children?: React.ReactNode;
}) {
  useUnsavedChangesWarning(dirty);

  return (
    <div className="fixed inset-x-0 bottom-[3.6rem] z-20 flex items-center gap-3 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur lg:static lg:inset-auto lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !dirty}
        className="flex-1 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-40 lg:flex-none"
      >
        {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
      </button>
      {dirty && !saving && (
        <span className="text-[0.72rem] text-amber-700">Unsaved changes</span>
      )}
      {children}
    </div>
  );
}

/** Warns before a tab close or reload would discard edits. */
export function useUnsavedChangesWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}
