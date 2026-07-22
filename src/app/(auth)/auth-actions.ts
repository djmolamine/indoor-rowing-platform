"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

function safeNext(value: FormDataEntryValue | null, fallback = "/dashboard") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function messageUrl(path: string, key: "error" | "message", value: string) {
  return `${path}?${key}=${encodeURIComponent(value)}`;
}

export async function signIn(formData: FormData) {
  if (!hasSupabaseConfig()) redirect(messageUrl("/sign-in", "error", "Supabase project credentials are not configured yet."));
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(messageUrl("/sign-in", "error", error.message));
  redirect(next);
}

export async function signUp(formData: FormData) {
  if (!hasSupabaseConfig()) redirect(messageUrl("/sign-up", "error", "Supabase project credentials are not configured yet."));
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (formData.get("legalAccepted") !== "on") redirect(messageUrl("/sign-up", "error", "Accept the Terms and Privacy Notice to create an account."));
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/auth/callback?next=/onboarding`, data:{ legal_accepted_at:new Date().toISOString(), terms_version:"2026-07-22", privacy_version:"2026-07-22" } } });
  if (error) redirect(messageUrl("/sign-up", "error", error.message));
  if (data.session) redirect("/onboarding");
  redirect(messageUrl("/sign-in", "message", "Check your email to verify your account, then sign in."));
}

export async function requestPasswordReset(formData: FormData) {
  if (!hasSupabaseConfig()) redirect(messageUrl("/forgot-password", "error", "Supabase project credentials are not configured yet."));
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const email = String(formData.get("email") ?? "").trim();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
  if (error) redirect(messageUrl("/forgot-password", "error", error.message));
  redirect(messageUrl("/forgot-password", "message", "If an account exists, a secure reset link has been sent."));
}

export async function signOut() {
  if (hasSupabaseConfig()) { const supabase = await createClient(); await supabase.auth.signOut(); }
  redirect("/sign-in");
}

export async function changeEmail(formData: FormData) {
  if (!hasSupabaseConfig()) redirect(messageUrl("/settings", "error", "Supabase project credentials are not configured yet."));
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const { error } = await supabase.auth.updateUser({ email });
  if (error) redirect(messageUrl("/settings", "error", error.message));
  redirect(messageUrl("/settings", "message", "Verification messages were sent as required. Your current email remains active until the change is confirmed."));
}
