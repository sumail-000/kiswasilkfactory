/**
 * Image hosts that Next's optimizer is allowed to fetch from.
 *
 * `next/image` answers with HTTP 400 for any remote host that is not listed in
 * `next.config.ts`. Since the admin panel lets you paste a link from anywhere,
 * this list is the single source of truth shared by two places:
 *
 *   - `next.config.ts` builds its `remotePatterns` from it.
 *   - `<SmartImage>` checks it to decide whether a URL can be optimised, and
 *     falls back to rendering unoptimised instead of failing.
 *
 * Adding a host here (and redeploying) upgrades it from "renders" to "renders
 * optimised". Nothing breaks if a host is missing.
 */

export const OPTIMIZABLE_IMAGE_HOSTS = [
  "res.cloudinary.com",
  "ik.imagekit.io",
  "i.ibb.co",
  "i.imgur.com",
  "i.postimg.cc",
  "lh3.googleusercontent.com",
  "drive.google.com",
  "images.unsplash.com",
  "images.pexels.com",
  "cdn.shopify.com",
  "raw.githubusercontent.com",
  "**.public.blob.vercel-storage.com",
] as const;

/** True when `next/image` may optimise this source. */
export function canOptimize(src: string): boolean {
  // Root-relative paths are files in /public — always optimisable.
  if (src.startsWith("/")) return !src.startsWith("//");

  let hostname: string;
  try {
    hostname = new URL(src).hostname.toLowerCase();
  } catch {
    return false;
  }

  return OPTIMIZABLE_IMAGE_HOSTS.some((pattern) =>
    pattern.startsWith("**.")
      ? hostname === pattern.slice(3) || hostname.endsWith(pattern.slice(2))
      : hostname === pattern,
  );
}
