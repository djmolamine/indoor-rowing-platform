"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export async function completeOnboarding(formData: FormData) {
  if (!hasSupabaseConfig()) redirect("/onboarding?error=Supabase%20is%20not%20configured");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?next=/onboarding");
  const displayName = String(formData.get("displayName") ?? "").trim(); const countryCode = String(formData.get("countryCode") ?? ""); const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  if (!displayName || !/^[A-Z]{2}$/.test(countryCode) || !dateOfBirth) redirect("/onboarding?error=Complete%20the%20required%20fields");
  const cityName = String(formData.get("cityName") ?? "").trim() || null; const trainingContext = String(formData.get("trainingContext") ?? "") || null;
  const profile = {
    id: user.id, display_name: displayName, date_of_birth: dateOfBirth, country_code: countryCode, city_name: cityName,
    city_region: String(formData.get("cityRegion") ?? "") || null, city_latitude: Number(formData.get("cityLatitude")) || null, city_longitude: Number(formData.get("cityLongitude")) || null,
    city_is_manual: formData.get("citySource") === "manual", training_context: trainingContext, preferred_machine_label: String(formData.get("preferredMachine") ?? "") || null,
    onboarding_completed_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
  if (error) redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
  const communications = formData.get("communications") === "on";
  await supabase.from("communication_consents").upsert({ athlete_id: user.id, purpose: "product_and_event_updates", channel: "email", granted: communications, disclosure_version: "onboarding-v1", withdrawn_at: communications ? null : new Date().toISOString() }, { onConflict: "athlete_id,purpose,channel" });
  const clubName = String(formData.get("missingClubName") ?? "").trim();
  if (trainingContext === "rowing_club" && clubName && cityName) await supabase.from("club_submissions").insert({ submitted_by: user.id, proposed_name: clubName, normalized_name: clubName.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), country_code: countryCode, city_name: cityName, city_region: profile.city_region, status: "pending" });
  redirect("/dashboard");
}
