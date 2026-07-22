"use server";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import type { PassportAthlete } from "@/lib/passport-data";

const trainingMap = { Home:"home", "Commercial gym":"commercial_gym", "Rowing club":"rowing_club", "School or university":"school_university", "National training centre":"national_training_centre", Other:"other" } as const;
const visibilityMap = { Private:"private", "Connections only":"connections", "Public athlete profile":"public", "Event organizers":"event_organizers" } as const;

export async function saveAthleteProfile(athlete: PassportAthlete) {
  if (!hasSupabaseConfig()) return { persisted: false, message: "Prototype updated for this session; Supabase is not configured." };
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) return { persisted:false, message:"Your session expired. Sign in again." };
  const { error } = await supabase.from("profiles").update({ display_name:athlete.name, country_code:athlete.countryCode, city_name:athlete.city, city_region:athlete.cityRegion ?? null, city_latitude:athlete.cityLatitude ?? null, city_longitude:athlete.cityLongitude ?? null, city_is_manual:athlete.citySource === "manual", training_context:trainingMap[athlete.trainingContext], preferred_machine_label:athlete.preferredMachine, biography:athlete.biography, visibility:visibilityMap[athlete.visibility] }).eq("id", user.id);
  if (error) return { persisted:false, message:error.message };
  await supabase.from("athlete_club_memberships").delete().eq("athlete_id", user.id).eq("active", true);
  if (athlete.trainingContext === "Rowing club" && athlete.selectedClubId && athlete.selectedClubId !== "__missing_club__") await supabase.from("athlete_club_memberships").insert({ athlete_id:user.id, club_id:athlete.selectedClubId });
  if (athlete.trainingContext === "Rowing club" && athlete.selectedClubId === "__missing_club__") {
    const name = athlete.customClub.officialName.trim(); const { data: submission, error: submissionError } = await supabase.from("club_submissions").insert({ submitted_by:user.id, proposed_name:name, normalized_name:name.toLocaleLowerCase().replace(/[^a-z0-9]+/g," ").trim(), country_code:athlete.countryCode, city_name:athlete.city, city_region:athlete.cityRegion ?? null, website:athlete.customClub.website || null, federation_affiliation:athlete.customClub.federation || null, status:"pending" }).select("id").single();
    if (submissionError) return { persisted:false, message:submissionError.message };
    await supabase.from("athlete_club_memberships").insert({ athlete_id:user.id, pending_submission_id:submission.id });
  }
  return { persisted:true, message:"Athlete Passport saved." };
}
