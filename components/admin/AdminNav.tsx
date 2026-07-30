"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Images, Building2, History, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: Home, exact: true },
  { href: "/admin/products", label: "Fabrics", icon: Layers, exact: false },
  { href: "/admin/gallery", label: "Gallery", icon: Images, exact: false },
  { href: "/admin/site", label: "Details", icon: Building2, exact: false },
  { href: "/admin/history", label: "History", icon: History, exact: false },
];

/**
 * Admin navigation.
 *
 * Two presentations of one list: a fixed sidebar from `lg` up, and a bottom tab
 * bar below it — thumb-reachable, which a top nav on mobile is not.
 */
export default function AdminNav({ username }: { username: string }) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-black/10 bg-navy text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-display text-lg font-bold leading-tight">Kiswa Admin</div>
          <div className="mt-1 text-[0.7rem] text-white/50">Signed in as {username}</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {ITEMS.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive(href, exact)
                  ? "bg-gold text-navy font-semibold"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="block rounded-md px-3 py-2 text-xs text-white/60 hover:bg-white/10 hover:text-white"
          >
            View live site ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.6} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-navy px-4 py-3 text-white">
        <span className="font-display text-base font-bold">Kiswa Admin</span>
        <form action={logoutAction}>
          <button type="submit" className="flex items-center gap-1.5 text-xs text-white/70">
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.6} />
            Sign out
          </button>
        </form>
      </header>

      {/* ── Mobile bottom tabs ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 grid grid-cols-5 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)]">
        {ITEMS.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-2.5 text-[0.62rem] font-medium transition-colors ${
              isActive(href, exact) ? "text-gold-deep" : "text-navy/55"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
