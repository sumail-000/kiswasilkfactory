"use client";

import { useState } from "react";
import { Field, Notice, SaveBar } from "@/components/admin/ui";
import { saveSiteAction } from "@/app/admin/actions";
import type { SiteInfo } from "@/lib/content";

export default function SiteForm({ initial }: { initial: SiteInfo }) {
  const [draft, setDraft] = useState<SiteInfo>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const set = <K extends keyof SiteInfo>(key: K, value: SiteInfo[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const setAddress = (key: keyof SiteInfo["address"], value: string) => {
    setDraft((current) => ({ ...current, address: { ...current.address, [key]: value } }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    setNotice(null);
    try {
      const result = await saveSiteAction(draft);
      if (result.ok) {
        setDirty(false);
        setNotice({ tone: "ok", text: result.message ?? "Saved." });
      } else {
        setNotice({ tone: "error", text: result.errors.join(" ") });
      }
    } catch (error) {
      setNotice({
        tone: "error",
        text: `Save failed: ${error instanceof Error ? error.message : "unexpected server error"}. Your changes are still on screen — try again.`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-navy">Site details</h1>
        <p className="mt-1 text-sm text-navy/60">
          Used across the header, footer, contact page and every WhatsApp button.
        </p>
      </header>

      {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Brand</h2>
        <Field label="Business name" required value={draft.brand} onChange={(v) => set("brand", v)} />
        <Field label="Short name" value={draft.brandShort} onChange={(v) => set("brandShort", v)} />
        <Field
          label="Tagline under the logo"
          value={draft.brandSubtitle}
          onChange={(v) => set("brandSubtitle", v)}
        />
        <Field label="Tagline" value={draft.tagline} onChange={(v) => set("tagline", v)} />
      </section>

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Contact</h2>
        <Field
          label="Phone (as displayed)"
          value={draft.phone}
          onChange={(v) => set("phone", v)}
          placeholder="+91 70300 74215"
        />
        <Field
          label="WhatsApp number"
          required
          value={draft.phoneIntl}
          onChange={(v) => set("phoneIntl", v)}
          placeholder="917030074215"
          hint="Digits only, including the country code. This is what every WhatsApp button opens."
        />
        <Field label="Email" type="email" value={draft.email} onChange={(v) => set("email", v)} />
        <Field
          label="Instagram handle"
          value={draft.instagram}
          onChange={(v) => set("instagram", v)}
          placeholder="@Kiswa_Silk_Factory"
        />
      </section>

      <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5">
        <h2 className="font-display text-base font-bold text-navy">Address</h2>
        <Field label="Address line 1" value={draft.address.line1} onChange={(v) => setAddress("line1", v)} />
        <Field label="Address line 2" value={draft.address.line2} onChange={(v) => setAddress("line2", v)} />
        <Field label="Location (short)" value={draft.location} onChange={(v) => set("location", v)} />
        <Field
          label="Copyright year"
          type="number"
          value={String(draft.year)}
          onChange={(v) => set("year", Number(v) || draft.year)}
        />
      </section>

      <SaveBar dirty={dirty} saving={saving} onSave={save} />
    </div>
  );
}
