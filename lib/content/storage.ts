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
import { copy, del, get, list, put } from "@vercel/blob";
import type { BackupEntry, ContentKind } from "./types";

/** Blob CDN cache. 60s is the documented minimum accepted by the API. */
const BLOB_CACHE_SECONDS = 60;

const MAX_BACKUPS_PER_KIND = 10;

const CONTENT_DIR = path.join(process.cwd(), "content");
const LOCAL_BACKUP_DIR = path.join(CONTENT_DIR, ".backups");

const blobPath = (kind: ContentKind) => `content/${kind}.json`;

export const usingBlob = (): boolean => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/* ─── store access mode ────────────────────────────────────── */

type BlobAccess = "public" | "private";

/**
 * A Vercel Blob store is created as either public or private, and every call
 * must declare the matching access level — passing the wrong one is a hard
 * error, not a default. Rather than make the operator configure this, the mode
 * is discovered on first use and remembered for the life of the instance.
 *
 * `BLOB_ACCESS` skips the discovery round-trip if you want to be explicit.
 */
let accessMode: BlobAccess | null =
  process.env.BLOB_ACCESS === "private" || process.env.BLOB_ACCESS === "public"
    ? process.env.BLOB_ACCESS
    : null;

const isAccessMismatch = (error: unknown): boolean =>
  error instanceof Error && /access on a (private|public) store/i.test(error.message);

/**
 * Run a Blob operation with the correct access level, learning it if unknown.
 * Both modes are always attempted so a remembered value can never strand us.
 */
async function withAccess<T>(operation: (access: BlobAccess) => Promise<T>): Promise<T> {
  const order: BlobAccess[] =
    accessMode === "private" ? ["private", "public"] : ["public", "private"];

  let lastError: unknown;
  for (const access of order) {
    try {
      const result = await operation(access);
      accessMode = access;
      return result;
    } catch (error) {
      if (!isAccessMismatch(error)) throw error;
      lastError = error;
    }
  }
  throw lastError;
}

/** Read and parse a JSON blob, or `null` if it does not exist. */
async function readBlobJson(pathname: string): Promise<unknown | null> {
  const result = await withAccess((access) =>
    // `useCache: false` reads from origin rather than the CDN, so a save is
    // visible on the very next read instead of waiting out the cache TTL.
    get(pathname, { access, useCache: false }),
  );
  if (!result) return null;
  return new Response(result.stream).json();
}

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
 */
export async function readDocument(kind: ContentKind): Promise<unknown | null> {
  if (usingBlob()) {
    try {
      return await readBlobJson(blobPath(kind));
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
      await withAccess((access) =>
        copy(blobPath(kind), `backups/${kind}-${stamp}.json`, {
          access,
          addRandomSuffix: false,
          cacheControlMaxAge: BLOB_CACHE_SECONDS,
        }),
      );
    } catch {
      // No previous version to back up (first save), or copy unavailable.
    }

    await withAccess((access) =>
      put(blobPath(kind), body, {
        access,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
        cacheControlMaxAge: BLOB_CACHE_SECONDS,
      }),
    );

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
      return await readBlobJson(pathname);
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
