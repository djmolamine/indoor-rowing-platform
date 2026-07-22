import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

function safeNext(value: string | null) { return value?.startsWith("/") && !value.startsWith("//") ? value : "/dashboard"; }

export async function GET(request: Request) {
  const url = new URL(request.url); const code = url.searchParams.get("code"); const next = safeNext(url.searchParams.get("next"));
  if (!hasSupabaseConfig()) return NextResponse.redirect(new URL("/sign-in?error=Supabase%20is%20not%20configured", url.origin));
  if (code) { const supabase = await createClient(); const { error } = await supabase.auth.exchangeCodeForSession(code); if (!error) return NextResponse.redirect(new URL(next, url.origin)); }
  return NextResponse.redirect(new URL("/sign-in?error=Authentication%20link%20is%20invalid%20or%20expired", url.origin));
}
