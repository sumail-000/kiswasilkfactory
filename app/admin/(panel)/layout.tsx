import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { getSession } from "@/lib/auth";
import { storageBackend } from "@/lib/content/storage";

/**
 * Panel chrome for every signed-in admin screen.
 *
 * The session check here is the real one — `proxy.ts` only performs an
 * optimistic redirect and is explicitly not an authorisation boundary.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const backend = storageBackend();

  return (
    <div className="min-h-screen lg:pl-60">
      <AdminNav username={session.username} />

      {!backend.writable && (
        <div className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-[0.8rem] text-amber-900 lg:px-8">
          <strong className="font-semibold">Read-only.</strong> {backend.detail}
        </div>
      )}

      {/* Bottom padding clears the mobile tab bar. */}
      <main className="px-4 py-6 pb-28 lg:px-8 lg:py-8 lg:pb-8">{children}</main>
    </div>
  );
}
