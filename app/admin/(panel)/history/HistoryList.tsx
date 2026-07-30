"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Notice } from "@/components/admin/ui";
import { restoreBackupAction } from "@/app/admin/actions";
import type { BackupEntry } from "@/lib/content/types";

const KIND_LABEL: Record<BackupEntry["kind"], string> = {
  products: "Fabrics",
  gallery: "Gallery",
  site: "Site details",
};

export default function HistoryList({ backups }: { backups: BackupEntry[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const restore = async (entry: BackupEntry) => {
    const when = new Date(entry.savedAt).toLocaleString();
    if (
      !window.confirm(
        `Restore ${KIND_LABEL[entry.kind]} to the version from ${when}?\n\nYour current version will be backed up first, so this can be undone.`,
      )
    ) {
      return;
    }

    setBusy(entry.pathname);
    const result = await restoreBackupAction(entry.pathname, entry.kind);
    setBusy(null);

    setNotice(
      result.ok
        ? { tone: "ok", text: result.message ?? "Restored." }
        : { tone: "error", text: result.errors.join(" ") },
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold text-navy">History</h1>
        <p className="mt-1 text-sm text-navy/60">
          The last 10 versions of each section. Restoring backs up the current version first.
        </p>
      </header>

      {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}

      {backups.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-navy/50">
          No previous versions yet. One is saved automatically each time you save a change.
        </p>
      ) : (
        <ul className="space-y-2">
          {backups.map((entry) => (
            <li
              key={entry.pathname}
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-3.5"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium text-navy">{KIND_LABEL[entry.kind]}</div>
                <div className="text-[0.74rem] text-navy/50">
                  {new Date(entry.savedAt).toLocaleString()} · {(entry.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <button
                type="button"
                onClick={() => restore(entry)}
                disabled={busy !== null}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-navy/25 px-3 py-2 text-[0.78rem] font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {busy === entry.pathname ? "Restoring…" : "Restore"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
