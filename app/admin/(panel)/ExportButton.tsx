"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { exportAllAction } from "@/app/admin/actions";

/** Downloads the current content as a dated JSON file. */
export default function ExportButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await exportAllAction();
      if (!result.ok) {
        setError(result.errors.join(" "));
        return;
      }

      const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kiswa-content-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Export failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={download}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md border border-navy/25 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {busy ? "Preparing…" : "Download backup"}
      </button>
      {error && <p className="text-[0.78rem] text-red-600">{error}</p>}
    </div>
  );
}
