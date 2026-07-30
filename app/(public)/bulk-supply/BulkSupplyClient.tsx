"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { MessageCircle, Phone, Send, Upload, Award, ClipboardList, Truck, Tag, Check } from "lucide-react";
import type { SiteInfo } from "@/lib/content";
import SmartImage from "@/components/SmartImage";

const PURPOSES = [
  "Dyeing",
  "Printing",
  "Embroidery",
  "Heavy Work / Adda Work",
  "Bridal & Formal Wear",
  "Lining / Innerwear",
  "Designer Collections",
  "Multiple Purposes",
];

const DELIVERY_OPTIONS = [
  "Within 1 week (Urgent)",
  "2 – 4 weeks (Standard)",
  "1 – 2 months (Planned)",
  "Flexible / As per production",
];

const SIDEBAR_FEATURES = [
  {
    icon: Award,
    title: "Premium Quality Assured",
    body: "Finest silk fabrics with consistent quality for your business needs.",
  },
  {
    icon: ClipboardList,
    title: "Sample Support",
    body: "We provide fabric samples to help you confirm quality before placing bulk orders.",
  },
  {
    icon: Truck,
    title: "Reliable Bulk Supply",
    body: "Timely delivery and flexible solutions tailored to your production requirements.",
  },
];

const BENEFIT_CARDS = [
  {
    icon: Tag,
    title: "Bulk Pricing",
    body: "Competitive pricing for bulk orders with the best value for your business.",
  },
  {
    icon: ClipboardList,
    title: "Sample Support",
    body: "Get fabric samples to verify quality, texture, and suitability.",
  },
  {
    icon: Truck,
    title: "Delivery Guidance",
    body: "Receive clear lead times and delivery options for smooth planning.",
  },
];

/* ── ornament ── */
function Ornament() {
  return (
    <div className="flex items-center gap-2 my-3">
      <span className="w-8 h-px bg-gold" />
      <svg width="14" height="8" viewBox="0 0 60 20" fill="currentColor" className="text-gold">
        <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85" />
      </svg>
      <span className="w-8 h-px bg-gold" />
    </div>
  );
}

export default function BulkSupplyClient({
  fabricNames,
  showcaseImage,
  site,
}: {
  fabricNames: string[];
  showcaseImage: string;
  site: SiteInfo;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines: string[] = [];
    data.forEach((v, k) => { if (v && k !== "file") lines.push(`${k}: ${v}`); });
    const subject = encodeURIComponent("Bulk Inquiry — Kiswa Silk Factory");
    const body = encodeURIComponent(lines.join("\n"));
    window.open(`mailto:${site.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    window.scrollTo({ top: (document.getElementById("success")?.offsetTop ?? 0) - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[340px]">
          {/* Left */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
            <h1 className="font-display font-bold text-navy text-[clamp(2.8rem,6vw,64px)] leading-tight mb-2">
              Bulk Inquiry
            </h1>
            <Ornament />
            <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-8 max-w-[42ch]">
              Partner with Kiswa Silk Factory for premium quality silk fabrics in bulk. Perfect for brands, boutiques, designers, printing units, and embroidery houses.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.phoneIntl}?text=${encodeURIComponent("Hi, I want to place a bulk inquiry.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                WhatsApp Now
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 border-2 border-navy/30 text-navy px-6 py-3 rounded-sm hover:bg-navy/5 transition-colors text-sm font-semibold"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                Call Now
              </a>
            </div>
          </div>
          {/* Right — image */}
          <div className="relative hidden lg:block">
            <Image src="/assets/silk-swirl.jpg" alt="Premium silk fabric" fill sizes="50vw" className="object-cover" priority />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)" }} />
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────── */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">

            {/* ── FORM CARD ── */}
            <div className="border border-border rounded-sm bg-white p-7">
              <h2 className="font-display font-bold text-navy text-[1.3rem] mb-0">Tell us about your requirement</h2>
              <Ornament />

              <form onSubmit={handleSubmit} className="mt-2 space-y-5">

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" name="full_name" placeholder="Enter your full name" required />
                  <Field label="Brand / Boutique / Company Name *" name="company" placeholder="Enter your brand or company name" required />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="City *" name="city" placeholder="Enter your city" required />
                  {/* WhatsApp with flag */}
                  <div>
                    <label className="block text-[0.75rem] font-semibold text-navy mb-1.5">WhatsApp Number *</label>
                    <div className="flex border border-border rounded-sm overflow-hidden focus-within:border-gold transition-colors">
                      <span className="flex items-center gap-1 bg-gray-50 px-3 border-r border-border text-[0.82rem] font-medium text-navy shrink-0 select-none">
                        🇮🇳 <span className="text-foreground/60">+91</span>
                      </span>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="Enter your WhatsApp number"
                        required
                        className="flex-1 px-3 py-2.5 text-[0.85rem] outline-none bg-white text-navy placeholder:text-foreground/35"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email *" name="email" type="email" placeholder="Enter your email address" required />
                  <SelectField
                    label="Required Fabric *"
                    name="required_fabric"
                    required
                    options={fabricNames}
                    placeholder="Select required fabric"
                  />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Required Quantity *" name="quantity" placeholder="Enter required quantity" required />
                  <SelectField
                    label="Purpose: Dyeing / Printing / Embroidery / Heavy Work *"
                    name="purpose"
                    required
                    options={PURPOSES}
                    placeholder="Select purpose"
                  />
                </div>

                {/* Row 5 — full width */}
                <SelectField
                  label="Delivery Requirement *"
                  name="delivery"
                  required
                  options={DELIVERY_OPTIONS}
                  placeholder="Select delivery requirement"
                />

                {/* Message */}
                <div>
                  <label className="block text-[0.75rem] font-semibold text-navy mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us more about your requirement (GSM, Width, Finish, Color, etc.)"
                    className="w-full border border-border rounded-sm px-3 py-2.5 text-[0.85rem] text-navy placeholder:text-foreground/35 outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-[0.75rem] font-semibold text-navy mb-1.5">Upload Reference Image (optional)</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border border-dashed border-border rounded-sm px-6 py-5 flex flex-col items-center gap-2 cursor-pointer hover:border-gold hover:bg-gold/3 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gold" strokeWidth={1.3} />
                    <span className="text-[0.82rem] font-medium text-navy">
                      {fileName || "Click to upload or drag and drop"}
                    </span>
                    <span className="text-[0.72rem] text-foreground/45">JPG, PNG, PDF (Max. 10MB)</span>
                    <input
                      ref={fileRef}
                      type="file"
                      name="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-navy text-primary-foreground py-4 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  Request Bulk Quote
                </button>
              </form>
            </div>

            {/* ── SIDEBAR — natural height, no forced stretching ── */}
            <div className="flex flex-col gap-4">

              {/* Fabric image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream">
                <SmartImage
                  src={showcaseImage}
                  alt="Premium silk fabric"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>

              {/* Feature items card */}
              <div className="border border-border rounded-sm bg-white p-5">
                <div className="space-y-5">
                  {SIDEBAR_FEATURES.map((f) => (
                    <div key={f.title} className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full border border-gold/35 bg-cream flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-navy text-[0.95rem] mb-0.5">{f.title}</h4>
                        <p className="text-foreground/60 text-[0.8rem] leading-snug">{f.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4"><Ornament /></div>
                <a
                  href={`https://wa.me/${site.phoneIntl}?text=${encodeURIComponent("Hi, I want to place a bulk inquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-navy text-primary-foreground py-3 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold mt-1"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 border-2 border-navy/25 text-navy py-3 rounded-sm hover:bg-navy/5 transition-colors text-sm font-semibold mt-3"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  Call Now
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── BENEFIT STRIP ─────────────────────────── */}
      <section className="py-10 bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-sm bg-white overflow-hidden">
            {BENEFIT_CARDS.map((b) => (
              <div key={b.title} className="flex items-start gap-4 px-7 py-6">
                <span className="w-12 h-12 rounded-full border border-gold/35 bg-cream flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                </span>
                <div>
                  <h4 className="font-display font-bold text-navy text-[1rem] mb-1">{b.title}</h4>
                  <p className="text-foreground/60 text-[0.82rem] leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS / THANK YOU ───────────────────── */}
      <section id="success" className="py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-border rounded-sm bg-white px-8 py-10 text-center">
            {/* Checkmark circle */}
            <div className="flex items-center justify-center mb-4">
              <span className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center">
                <Check className="w-6 h-6 text-gold" strokeWidth={2} />
              </span>
            </div>
            <h3 className="font-display font-bold text-navy text-[1.4rem] mb-0">
              Thank you. Our team will contact you shortly on WhatsApp.
            </h3>
            <Ornament />
            {submitted && (
              <p className="text-foreground/60 text-[0.87rem] mt-2">
                Your inquiry has been sent. We typically respond within a few hours.
              </p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Field helpers ── */
function Field({
  label, name, type = "text", placeholder, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[0.75rem] font-semibold text-navy mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full border border-border rounded-sm px-3 py-2.5 text-[0.85rem] text-navy placeholder:text-foreground/35 outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, options, placeholder, required,
}: {
  label: string; name: string; options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[0.75rem] font-semibold text-navy mb-1.5">{label}</label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-border rounded-sm px-3 py-2.5 text-[0.85rem] text-navy outline-none focus:border-gold transition-colors bg-white appearance-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%236b7280'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
