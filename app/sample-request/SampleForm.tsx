"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/site";

const FABRIC_OPTIONS = [
  ["mulberry-silk", "Pure Mulberry"],
  ["raw-silk", "Raw Silk"],
  ["chiffon", "Chiffon"],
  ["organza", "Organza"],
  ["crepe", "Crepe"],
  ["charmeuse", "Charmeuse"],
  ["dupion", "Dupion"],
  ["jacquard", "Jacquard"],
  ["all", "All eight (full kit)"],
];

export default function SampleForm() {
  const params = useSearchParams();
  const preselect = params.get("fabric");
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (preselect) setSelected([preselect]);
  }, [preselect]);

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines: string[] = [];
    data.forEach((v, k) => {
      if (v) lines.push(`${k}: ${v}`);
    });
    if (selected.length) {
      lines.unshift(`Fabrics: ${selected.join(", ")}`);
    }
    const subject = encodeURIComponent("Swatch Request — Kiswa Silk");
    const body = encodeURIComponent(lines.join("\n"));
    setSubmitted(true);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {submitted && (
        <div className="bg-cream border-gold mb-6 border p-6">
          <h3 className="text-gold-deep mb-1">Request received.</h3>
          <p>
            Thank you. Our trade desk will email you within one working day to
            confirm details and shipping.
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-ivory border-line border p-8 md:p-12"
      >
        <h2 className="mb-2">Swatch request</h2>
        <p className="text-muted mb-10">
          Required fields are marked with an asterisk (*).
        </p>

        <h5 className="text-gold-deep mb-5 text-[0.78rem] font-semibold tracking-[0.18em] uppercase">
          1. Choose your silks
        </h5>
        <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {FABRIC_OPTIONS.map(([slug, label]) => (
            <label key={slug} className="checkbox-tile">
              <input
                type="checkbox"
                checked={selected.includes(slug)}
                onChange={() => toggle(slug)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <h5 className="text-gold-deep mb-5 text-[0.78rem] font-semibold tracking-[0.18em] uppercase">
          2. About you
        </h5>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Full Name *" name="name" required />
          <Field label="Company / Studio *" name="company" required />
          <Field label="Email *" name="email" type="email" required />
          <Field label="Phone / WhatsApp" name="phone" type="tel" />
          <Field label="Country *" name="country" required />
          <FieldSelect
            label="Buyer Type *"
            name="buyer_type"
            required
            options={[
              "Designer / Atelier",
              "Fashion Brand",
              "Wholesale Distributor",
              "Retail Boutique",
              "Manufacturer",
              "Individual Stylist",
              "Other",
            ]}
          />
        </div>

        <h5 className="text-gold-deep mt-10 mb-5 text-[0.78rem] font-semibold tracking-[0.18em] uppercase">
          3. Project context
        </h5>

        <FieldTextarea
          label="What are you sourcing for? (optional)"
          name="project"
          placeholder="e.g. Bridal collection FW26, scarves for Q1 retail, jacquard panels for couture client…"
        />

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            label="Required by (optional)"
            name="required_by"
            placeholder="e.g. 25 February"
          />
          <FieldSelect
            label="Approx. order quantity if proceeding"
            name="potential_qty"
            options={[
              "Under 200 m",
              "200 – 500 m",
              "500 – 2,000 m",
              "2,000 m+",
              "Recurring programme",
            ]}
          />
        </div>

        <div className="mt-6">
          <FieldTextarea
            label="Shipping Address *"
            name="address"
            required
            placeholder="Street, City, Postal Code, Country"
          />
        </div>

        <label className="checkbox-tile mt-8 inline-flex">
          <input type="checkbox" name="agree" required />
          <span>
            I confirm the information above is accurate and consent to be
            contacted by the Kiswa Silk trade desk.
          </span>
        </label>

        <div className="mt-10 flex flex-wrap gap-4">
          <button type="submit" className="btn">
            Send Swatch Request <span className="arrow">→</span>
          </button>
          <a href="/bulk-inquiry" className="btn btn-outline">
            Skip — Open RFQ Instead
          </a>
        </div>
      </form>
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
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={3}
        className="field-input"
      />
    </label>
  );
}
