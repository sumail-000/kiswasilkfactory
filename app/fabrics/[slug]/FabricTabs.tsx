"use client";

import { useState } from "react";
import type { Fabric } from "@/lib/fabrics";

const TABS = ["Suggested Use", "Care & Handling", "Production Notes", "Buyer FAQ"] as const;

export default function FabricTabs({ fabric }: { fabric: Fabric }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="border-line scrollbar-hide flex gap-8 overflow-x-auto border-b">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 border-b-2 py-4 text-[0.78rem] font-semibold tracking-[0.18em] uppercase transition ${
              active === i
                ? "border-gold text-charcoal"
                : "text-muted border-transparent hover:text-charcoal-soft"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="py-10">
        {active === 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4">Where this silk shines</h3>
              <ul className="list-disc space-y-2 pl-5">
                {fabric.uses.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-charcoal-soft">{fabric.subtitle}</p>
              <p className="text-muted mt-4">
                Order swatches to feel weight and drape in real light before
                committing to a bulk shade.
              </p>
            </div>
          </div>
        )}
        {active === 1 && (
          <div>
            <h3 className="mb-4">Care for finished bolts</h3>
            <p className="text-charcoal-soft">{fabric.care}</p>
            <ul className="text-charcoal-soft mt-4 list-disc space-y-2 pl-5">
              <li>Store rolled, not folded, on a horizontal pole.</li>
              <li>Keep at 18–22 °C, 55% relative humidity.</li>
              <li>Protect from direct sunlight — natural silk yellows over time.</li>
              <li>
                Avoid contact with deodorants, perfumes and chlorinated water —
                they damage the protein structure.
              </li>
            </ul>
          </div>
        )}
        {active === 2 && (
          <div>
            <h3 className="mb-4">How we produce it</h3>
            <p className="text-charcoal-soft">{fabric.production}</p>
          </div>
        )}
        {active === 3 && (
          <div>
            <h3 className="mb-4">Frequently asked</h3>
            <div className="space-y-6">
              <div>
                <h4 className="mb-1">What is the GSM equivalent of momme?</h4>
                <p className="text-muted">
                  Approximate: 19 mm ≈ 80 gsm, 22 mm ≈ 93 gsm at 114 cm width.
                  Exact GSM varies with weave.
                </p>
              </div>
              <div>
                <h4 className="mb-1">Can you ship CIF to my port?</h4>
                <p className="text-muted">
                  Yes — Kiswa ships FOB Karachi or CIF to most major ports on
                  request. Air freight available for samples and small lots.
                </p>
              </div>
              <div>
                <h4 className="mb-1">Do you offer custom colour matching?</h4>
                <p className="text-muted">
                  Yes — Pantone-matched custom dye lots from 200 m. Spectrophotometer
                  verified to ΔE ≤ 1.0 for repeat shades.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
