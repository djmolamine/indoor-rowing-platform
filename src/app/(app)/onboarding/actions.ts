"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?next=/onboarding");

  const displayName = String(formData.get("displayName") ?? "").trim();
  const countryCode = String(formData.get("countryCode") ?? "");
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  if (!displayName || !/^[A-Z]{2}$/.test(countryCode) || !dateOfBirth) redirect("/onboarding?error=Complete%20the%20required%20fields");

  const machineKey = String(formData.get("preferredMachineModelId") ?? "");
  const { data: machine } = machineKey
    ? await supabase.from("machine_models").select("id,provider_key").eq("key", machineKey).maybeSingle()
    : { data: null };
  const city = String(formData.get("cityName") ?? "").trim();
  const manual = formData.get("citySource") === "manual";
  const profile = {
    display_name: displayName, date_of_birth: dateOfBirth, gender: String(formData.get("gender") ?? "") || null,
    country_code: countryCode, city_name: manual ? null : city || null, manual_city: manual ? city : null,
    city_region: String(formData.get("cityRegion") ?? "") || null, city_latitude: Number(formData.get("cityLatitude")) || null,
    city_longitude: Number(formData.get("cityLongitude")) || null, city_is_manual: manual,
    training_context: String(formData.get("trainingContext") ?? "") || null,
    preferred_machine_model_id: machine?.id ?? null, preferred_machine_label: String(formData.get("preferredMachine") ?? "") || null,
    preferred_units: { system: String(formData.get("preferredUnits") ?? "metric") },
    onboarding_status: "completed" as const, onboarding_completed_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("profiles").update(profile).eq("auth_user_id", user.id);
  if (error) { console.error("Onboarding profile update failed", error.code); redirect("/onboarding?error=Your%20profile%20could%20not%20be%20saved"); }

  const { error: passportError } = await supabase.from("athlete_passports").update({
    visibility: formData.get("publicPassport") === "on" ? "public" : "private",
    primary_machine_model_id: machine?.id ?? null, primary_machine_provider_id: machine?.provider_key ?? null,
  }).eq("profile_id", user.id);
  if (passportError) { console.error("Onboarding Passport update failed", passportError.code); redirect("/onboarding?error=Your%20Passport%20could%20not%20be%20saved"); }

  const communications = formData.get("communications") === "on";
  await supabase.from("communication_consents").upsert({ athlete_id: user.id, purpose: "product_and_event_updates", channel: "email", granted: communications, disclosure_version: "onboarding-v2", withdrawn_at: communications ? null : new Date().toISOString() }, { onConflict: "athlete_id,purpose,channel" });
  const clubName = String(formData.get("missingClubName") ?? "").trim();
  if (profile.training_context === "rowing_club" && clubName && city) await supabase.from("club_submissions").insert({ submitted_by: user.id, proposed_name: clubName, normalized_name: clubName.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), country_code: countryCode, city_name: city, city_region: profile.city_region, status: "pending" });
  redirect("/dashboard");
}
