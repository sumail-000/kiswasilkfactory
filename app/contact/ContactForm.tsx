"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines: string[] = [];
    data.forEach((v, k) => {
      if (v) lines.push(`${k}: ${v}`);
    });
    const subject = encodeURIComponent("Contact — Kiswa Silk");
    const body = encodeURIComponent(lines.join("\n"));
    setSubmitted(true);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {submitted && (
        <div className="bg-cream border-gold mb-6 border p-6">
          <h3 className="text-gold-deep mb-1">Message received.</h3>
          <p>
            Thank you for reaching out. We will respond within one working day.
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-ivory border-line border p-8 md:p-12"
      >
        <h2 className="mb-2">Send us a message</h2>
        <p className="text-muted mb-10">
          For quick fabric questions, sourcing or visit requests.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Full Name *" name="name" required />
          <Field label="Company / Studio" name="company" />
          <Field label="Email *" name="email" type="email" required />
          <Field label="Phone / WhatsApp" name="phone" type="tel" />
        </div>

        <div className="mt-6">
          <label className="block">
            <span className="field-label">What can we help with? *</span>
            <select name="topic" required defaultValue="" className="field-input">
              <option value="">Select a topic…</option>
              <option>General fabric inquiry</option>
              <option>Sample / swatch request</option>
              <option>Bulk order / RFQ</option>
              <option>Schedule a mill visit</option>
              <option>Press / media</option>
              <option>Audit / compliance pack</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <div className="mt-6">
          <label className="block">
            <span className="field-label">Your Message *</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us a little about what you need…"
              className="field-input"
            />
          </label>
        </div>

        <div className="mt-10">
          <button type="submit" className="btn">
            Send Message <span className="arrow">→</span>
          </button>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="field-input"
      />
    </label>
  );
}
