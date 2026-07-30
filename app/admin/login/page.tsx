import { isAdminConfigured } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Never trust an incoming path to be somewhere we should return to.
  const target = next?.startsWith("/admin") ? next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-navy">Kiswa Silk Factory</h1>
          <div className="mx-auto mt-3 flex w-fit items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
              Admin Panel
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <LoginForm next={target} configured={isAdminConfigured()} />
        </div>
      </div>
    </div>
  );
}
