"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type ActionResult } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({ next, configured }: { next: string; configured: boolean }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(loginAction, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {!configured && (
        <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-[0.78rem] leading-relaxed text-amber-900">
          Admin credentials are not set on this deployment. Add <code>ADMIN_USERNAME</code>,{" "}
          <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> in your Vercel project
          settings, then redeploy.
        </p>
      )}

      {state && !state.ok && (
        <p className="rounded-md border border-red-300 bg-red-50 p-3 text-[0.8rem] text-red-800">
          {state.errors.join(" ")}
        </p>
      )}

      <label className="block">
        <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
          Username
        </span>
        <input
          name="username"
          required
          autoComplete="username"
          autoCapitalize="none"
          className="w-full rounded-md border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-navy/70">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <SubmitButton />
    </form>
  );
}
