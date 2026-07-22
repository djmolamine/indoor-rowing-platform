"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { authInputClass } from "./auth-card";

export function ResetPasswordForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!hasSupabaseConfig()) { setError("Supabase project credentials are not configured yet."); return; }
    const form = new FormData(event.currentTarget); const password = String(form.get("password") ?? ""); const confirmation = String(form.get("confirmation") ?? "");
    if (password !== confirmation) { setError("Passwords do not match."); return; }
    setLoading(true); const { error: updateError } = await createClient().auth.updateUser({ password }); setLoading(false);
    if (updateError) { console.error("Password update failed", updateError.code); setError("This recovery link is invalid or expired. Request a new password-reset email."); return; }
    router.replace("/dashboard"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-6 space-y-4">{error && <p role="alert" className="rounded-xl bg-[#fff1eb] p-3 text-sm font-bold text-[#a43f20]">{error}</p>}<label className="block text-xs font-bold text-[#475b54]">New password<input className={authInputClass} name="password" type="password" autoComplete="new-password" minLength={8} required /></label><label className="block text-xs font-bold text-[#475b54]">Confirm new password<input className={authInputClass} name="confirmation" type="password" autoComplete="new-password" minLength={8} required /></label><button disabled={loading} className="min-h-12 w-full rounded-full bg-[#ff6b35] px-5 font-black text-white disabled:opacity-60">{loading ? "Updating…" : "Update password"}</button></form>;
}
