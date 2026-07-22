"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export function OAuthButtons() {
  const [error, setError] = useState("");
  async function continueWith(provider: "google" | "apple") {
    setError("");
    if (!hasSupabaseConfig()) { setError("Supabase must be configured before social sign-in can start."); return; }
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` } });
    if (authError) setError(authError.message);
  }
  return <div><div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => continueWith("google")} className="min-h-11 rounded-xl border border-[#ccd6d1] bg-white px-4 text-sm font-black hover:bg-[#f5f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Continue with Google</button><button type="button" onClick={() => continueWith("apple")} className="min-h-11 rounded-xl bg-black px-4 text-sm font-black text-white hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Continue with Apple</button></div>{error && <p role="alert" className="mt-3 text-sm font-bold text-[#b44222]">{error}</p>}<p className="mt-3 text-xs leading-5 text-[#718078]">Facebook identity linking is architecturally supported by Supabase Auth but intentionally deferred.</p></div>;
}
