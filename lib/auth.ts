/**
 * Admin authentication.
 *
 * A single operator account, credentials supplied as environment variables, and
 * a stateless HMAC-signed session cookie. No database, no user table.
 *
 * Built on Web Crypto rather than `node:crypto` so the same helpers run in both
 * the Node runtime (server actions, pages) and the Edge runtime (`proxy.ts`).
 */

import { cookies } from "next/headers";

export const SESSION_COOKIE = "kiswa_admin_session";

/** Sessions last a week; long enough to be convenient, short enough to expire. */
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type Session = { username: string; expiresAt: number };

/* ─── configuration ────────────────────────────────────────── */

export type AdminConfig = { username: string; password: string; secret: string };

/**
 * Admin credentials, or `null` when the deployment has not been configured.
 * When null, login is refused outright — an unconfigured deployment must never
 * fall back to a default password.
 */
export function getAdminConfig(): AdminConfig | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!username || !password || !secret) return null;
  return { username, password, secret };
}

export const isAdminConfigured = (): boolean => getAdminConfig() !== null;

/* ─── encoding helpers ─────────────────────────────────────── */

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

/** Length-independent, content constant-time comparison. */
function safeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  // Compare a fixed number of bytes so the loop count never depends on input.
  const length = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < length; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

/* ─── credentials ──────────────────────────────────────────── */

export function checkCredentials(username: string, password: string): boolean {
  const config = getAdminConfig();
  if (!config) return false;
  // Both comparisons always run, so a wrong username and a wrong password are
  // indistinguishable by timing.
  const userOk = safeEqual(username.trim(), config.username);
  const passOk = safeEqual(password, config.password);
  return userOk && passOk;
}

/* ─── session tokens ───────────────────────────────────────── */

export async function createSessionToken(username: string): Promise<string | null> {
  const config = getAdminConfig();
  if (!config) return null;
  const session: Session = {
    username,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const payload = toBase64Url(encoder.encode(JSON.stringify(session)));
  return `${payload}.${await sign(payload, config.secret)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<Session | null> {
  const config = getAdminConfig();
  if (!config || !token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  try {
    if (!safeEqual(signature, await sign(payload, config.secret))) return null;
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as Session;
    if (typeof session.expiresAt !== "number" || session.expiresAt < Date.now()) return null;
    if (!safeEqual(session.username, config.username)) return null;
    return session;
  } catch {
    return null;
  }
}

/* ─── cookie access (Node runtime) ─────────────────────────── */

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
} as const;
