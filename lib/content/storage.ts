/**
 * Content storage adapter.
 *
 * Two backends, chosen automatically:
 *
 *   - Vercel Blob  — used whenever BLOB_READ_WRITE_TOKEN is set (i.e. production).
 *   - Local files  — used in development without a token, so the admin panel is
 *                    fully testable offline by writing to `content/*.json`.
 *
 * Callers never care which is active. Both return `null` when a document has
 * never been saved, which is the signal for the loader to fall back to seed.
 *
 * Server-only: never import this from a client component.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { copy, del, head, list, put } from "@vercel/blob";
import type { BackupEntry, ContentKind } from "./types";

/** Cache tag shared by every content fetch; invalidated on save. */
export const CONTENT_TAG = "kiswa-content";

/** How long a cached read may live before Next revalidates it anyway. */
const REVALIDATE_SECONDS = 300;

/** Blob CDN cache. 60s is the documented minimum accepted by the API. */
const BLOB_CACHE_SECONDS = 60;

const MAX_BACKUPS_PER_KIND = 10;

const CONTENT_DIR = path.join(process.cwd(), "content");
const LOCAL_BACKUP_DIR = path.join(CONTENT_DIR, ".backups");

const blobPath = (kind: ContentKind) => `content/${kind}.json`;

export const usingBlob = (): boolean => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Human-readable description of the active backend, shown on the dashboard. */
export function storageBackend(): { name: string; writable: boolean; detail: string } {
  if (usingBlob()) {
    return {
      name: "Vercel Blob",
      writable: true,
      detail: "Changes are saved to Blob storage and go live within seconds.",
    };
  }
  if (process.env.VERCEL) {
    return {
      name: "Read-only",
      writable: false,
      detail:
        "BLOB_READ_WRITE_TOKEN is not set on this deployment. The site is serving its built-in content and saving is disabled.",
    };
  }
  return {
    name: "Local files",
    writable: true,
    detail: "Development mode — changes are written to content/*.json in the project.",
  };
}

/* ─── read ─────────────────────────────────────────────────── */

/**
 * Read a stored document. Returns `null` if it has never been saved or if the
 * backend is unreachable — callers fall back to seed content in both cases.
 *
 * On Blob, `head()` supplies a fresh `uploadedAt` which is appended as a cache
 * buster, so a save is visible immediately rather than waiting out the CDN TTL.
 * The body fetch itself is cached by Next under CONTENT_TAG.
 */
export async function readDocument(kind: ContentKind): Promise<unknown | null> {
  if (usingBlob()) {
    try {
      const meta = await head(blobPath(kind));
      const version = meta.uploadedAt instanceof Date ? meta.uploadedAt.getTime() : Date.now();
      const res = await fetch(`${meta.url}?v=${version}`, {
        next: { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      // Not found, no store, network failure — all mean "use the seed".
      return null;
    }
  }

  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${kind}.json`), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ─── write ────────────────────────────────────────────────── */

/**
 * Persist a document, snapshotting the previous version first.
 *
 * A backup failure never blocks the save — losing a snapshot is an acceptable
 * outcome, refusing to save the user's work is not.
 */
export async function writeDocument(kind: ContentKind, data: unknown): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  if (usingBlob()) {
    try {
      await copy(blobPath(kind), `backups/${kind}-${stamp}.json`, {
        access: "public",
        addRandomSuffix: false,
        cacheControlMaxAge: BLOB_CACHE_SECONDS,
      });
    } catch {
      // No previous version to back up (first save), or copy unavailable.
    }

    await put(blobPath(kind), body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: BLOB_CACHE_SECONDS,
    });

    await pruneBackups(kind);
    return;
  }

  await fs.mkdir(LOCAL_BACKUP_DIR, { recursive: true });
  const target = path.join(CONTENT_DIR, `${kind}.json`);
  try {
    const previous = await fs.readFile(target, "utf8");
    await fs.writeFile(path.join(LOCAL_BACKUP_DIR, `${kind}-${stamp}.json`), previous, "utf8");
  } catch {
    // First save — nothing to snapshot.
  }
  await fs.writeFile(target, body, "utf8");
  await pruneBackups(kind);
}

/* ─── backups ──────────────────────────────────────────────── */

export async function listBackups(kind?: ContentKind): Promise<BackupEntry[]> {
  const parse = (pathname: string, size: number, savedAt: string): BackupEntry | null => {
    const file = pathname.split("/").pop() ?? "";
    const match = file.match(/^(products|gallery|site)-(.+)\.json$/);
    if (!match) return null;
    return { pathname, kind: match[1] as ContentKind, savedAt, size };
  };

  let entries: BackupEntry[] = [];

  if (usingBlob()) {
    try {
      const { blobs } = await list({ prefix: "backups/" });
      entries = blobs
        .map((b) =>
          parse(b.pathname, b.size, b.uploadedAt instanceof Date ? b.uploadedAt.toISOString() : String(b.uploadedAt)),
        )
        .filter((e): e is BackupEntry => e !== null);
    } catch {
      return [];
    }
  } else {
    try {
      const files = await fs.readdir(LOCAL_BACKUP_DIR);
      entries = (
        await Promise.all(
          files.map(async (file) => {
            const full = path.join(LOCAL_BACKUP_DIR, file);
            const stat = await fs.stat(full);
            return parse(file, stat.size, stat.mtime.toISOString());
          }),
        )
      ).filter((e): e is BackupEntry => e !== null);
    } catch {
      return [];
    }
  }

  return entries
    .filter((e) => !kind || e.kind === kind)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function readBackup(pathname: string): Promise<unknown | null> {
  if (usingBlob()) {
    try {
      const meta = await head(pathname);
      const res = await fetch(meta.url, { cache: "no-store" });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  }
  try {
    const file = path.basename(pathname);
    return JSON.parse(await fs.readFile(path.join(LOCAL_BACKUP_DIR, file), "utf8"));
  } catch {
    return null;
  }
}

async function pruneBackups(kind: ContentKind): Promise<void> {
  try {
    const stale = (await listBackups(kind)).slice(MAX_BACKUPS_PER_KIND);
    if (!stale.length) return;

    if (usingBlob()) {
      await del(stale.map((e) => e.pathname));
      return;
    }
    await Promise.all(stale.map((e) => fs.unlink(path.join(LOCAL_BACKUP_DIR, path.basename(e.pathname)))));
  } catch {
    // Pruning is housekeeping; never let it surface as a save failure.
  }
}
