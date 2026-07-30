/**
 * Proxy (Next.js 16's replacement for Middleware).
 *
 * This performs an *optimistic* check only: it bounces signed-out visitors away
 * from /admin before a page is rendered, which is a UX nicety rather than a
 * security boundary. The Next.js docs are explicit that Proxy must not be used
 * as the authorisation solution, so every admin page and every server action
 * re-checks the session itself. This layer can be bypassed without consequence.
 */

import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  // Signed-in users have no reason to see the login form again.
  if (pathname === "/admin/login") {
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
