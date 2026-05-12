"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/site";

const FABRICS = [
  ["mulberry-silk", "Pure Mulberry"],
  ["raw-silk", "Raw Silk"],
  ["chiffon", "Chiffon"],
  ["organza", "Organza"],
  ["crepe", "Crepe"],
  ["charmeuse", "Charmeuse"],
  ["dupion", "Dupion"],
  ["jacquard", "Jacquard (custom)"],
  ["bespoke", "Bespoke / Other"],
];

const FINISHES = [
  "Soft hand",
  "Calendered",
  "Stiff (organza)",
  "Sand-washed",
  "Print-prepared (PFP)",
  "Greige / undyed",
];

export default function BulkForm() {
  const params = useSearchParams();
  const preselect = params.get("fabric");
  const [submitted, setSubmitted] = useState(false);
  const [fabrics, setFabrics] = useState<string[]>(() =>
    preselect ? [preselect] : []
  );
  const [finishes, setFinishes] = useState<string[]>([]);

  const toggle = (val: string, list: string[], set: (v: string[]) => void) =>
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines: string[] = [];
    if (fabrics.length) lines.push(`Fabrics: ${fabrics.join(", ")}`);
    if (finishes.length) lines.push(`Finishes: ${finishes.join(", ")}`);
    data.forEach((v, k) => {
      if (v) lines.push(`${k}: ${v}`);
    });
    const subject = encodeURIComponent("RFQ — Kiswa Silk");
    const body = encodeURIComponent(lines.join("\n"));
    setSubmitted(true);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {submitted && (
        <div className="bg-gold/15 border-gold mb-6 border p-6">
          <h3 className="text-gold-soft mb-1">RFQ received.</h3>
          <p className="text-ivory">
            Thank you. Your inquiry will be reviewed by our trade desk within
            one working day.
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="dark-form bg-charcoal text-ivory border border-white/10 p-8 md:p-12"
      >
        <h2 className="text-ivory mb-2">Request for Quotation</h2>
        <p className="text-ivory/60 mb-10">
          All fields marked * are required. The more detail you provide, the
          more accurate the quotation.
        </p>

        <Section title="1. Your Company">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Company Name *" name="company" required />
            <Field label="Country *" name="country" required />
            <Field label="Contact Name *" name="contact" required />
            <Field
              label="Designation"
              name="designation"
              placeholder="e.g. Head of Sourcing"
            />
            <Field label="Email *" name="email" type="email" required />
            <Field label="WhatsApp / Phone" name="phone" type="tel" />
          </div>
          <div className="mt-6">
            <Field
              label="Company Website (optional)"
              name="website"
              type="url"
              placeholder="https://"
            />
          </div>
          <div className="mt-6">
            <FieldSelect
              label="Business Type *"
              name="business_type"
              required
              options={[
                "Fashion Brand / Label",
                "Couture Atelier",
                "Wholesale Distributor",
                "Garment Manufacturer",
                "Retail Group",
                "Home Textile Brand",
                "Trading Agency",
                "Other",
              ]}
            />
          </div>
        </Section>

        <Section title="2. The Order">
          <p className="field-label">Fabrics of Interest *</p>
          <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {FABRICS.map(([slug, label]) => (
              <label key={slug} className="checkbox-tile">
                <input
                  type="checkbox"
                  checked={fabrics.includes(slug)}
                  onChange={() => toggle(slug, fabrics, setFabrics)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Total Quantity (metres) *"
              name="quantity"
              type="number"
              required
              placeholder="e.g. 1500"
            />
            <FieldSelect
              label="Order Frequency"
              name="frequency"
              options={[
                "One-off order",
                "Quarterly recurring",
                "Seasonal recurring",
                "Monthly programme",
              ]}
            />
          </div>

          <div className="mt-6">
            <FieldTextarea
              label="Detailed Requirements *"
              name="details"
              required
              rows={4}
              placeholder="e.g. 800 m crepe in dusty rose (Pantone 13-1904), 500 m chiffon in ivory, 22-momme. Soft finish. Need by 30 March."
            />
          </div>

          <div className="mt-6">
            <p className="field-label">Finishing Options Required</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {FINISHES.map((f) => (
                <label key={f} className="checkbox-tile">
                  <input
                    type="checkbox"
                    checked={finishes.includes(f)}
                    onChange={() => toggle(f, finishes, setFinishes)}
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </div>
        </Section>

        <Section title="3. Logistics & Terms">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Required-by Date *"
              name="required_by"
              required
              placeholder="e.g. 30 April or ASAP"
            />
            <FieldSelect
              label="Incoterm Preference"
              name="incoterm"
              options={[
                "FOB Karachi",
                "CIF (specify port)",
                "EXW (ex-mill)",
                "Air freight (samples / urgent)",
                "To advise",
              ]}
            />
          </div>
          <div className="mt-6">
            <Field
              label="Destination Port / City *"
              name="destination"
              required
              placeholder="e.g. Jebel Ali, Dubai"
            />
          </div>
          <div className="mt-6">
            <FieldSelect
              label="Payment Terms Preferred"
              name="payment"
              options={[
                "Letter of Credit (L/C at sight)",
                "Telegraphic Transfer (T/T)",
                "30% advance, 70% against B/L",
                "Net-30 (subject to credit approval)",
                "To discuss",
              ]}
            />
          </div>
          <div className="mt-6">
            <FieldTextarea
              label="Anything else we should know?"
              name="notes"
              placeholder="Existing buyer relationships, label compliance, packaging needs, sustainability targets, etc."
            />
          </div>
        </Section>

        <label className="checkbox-tile mt-10 flex">
          <input type="checkbox" name="agree" required />
          <span className="text-ivory/85">
            I confirm I have authority to submit this RFQ and consent to be
            contacted by Kiswa Silk&rsquo;s trade desk.
          </span>
        </label>

        <div className="mt-10 flex flex-wrap gap-4">
          <button type="submit" className="btn btn-gold">
            Submit RFQ <span className="arrow">→</span>
          </button>
          <a href="/sample-request" className="btn btn-ghost">
            Order Swatches First
          </a>
        </div>

        <p className="text-ivory/55 mt-6 text-[0.82rem]">
          By submitting you agree we may store your inquiry for the purpose of
          preparing a quotation. We do not share data with third parties.
        </p>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h5 className="text-gold-soft mb-5 text-[0.78rem] font-semibold tracking-[0.18em] uppercase">
        {title}
      </h5>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="field-input"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select name={name} required={required} className="field-input" defaultValue="">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  required,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="field-input"
      />
    </label>
  );
}
