import { AthletePassport } from "@/components/passport/athlete-passport";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { passportData, type PassportAthlete, type PassportVisibility, type TrainingContext } from "@/lib/passport-data";
import { getCountry } from "@/lib/location-data/countries";

const training: Record<string, TrainingContext> = { home:"Home", commercial_gym:"Commercial gym", rowing_club:"Rowing club", school_university:"School or university", national_training_centre:"National training centre", other:"Other" };
const visibility: Record<string, PassportVisibility> = { private:"Private", connections:"Connections only", public:"Public athlete profile", event_organizers:"Event organizers" };

export default async function ProfilePage() {
  let initial: PassportAthlete | undefined;
  if (hasSupabaseConfig()) {
    const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser();
    if (user) { const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single(); if (data) { const country = getCountry(data.country_code ?? ""); initial = { ...passportData.athlete, name:data.display_name ?? passportData.athlete.name, initials:(data.display_name ?? "Athlete").split(" ").map((part:string)=>part[0]).join("").slice(0,2).toUpperCase(), passportId:data.passport_id ?? passportData.athlete.passportId, countryCode:data.country_code ?? passportData.athlete.countryCode, country:country?.name ?? passportData.athlete.country, city:data.city_name ?? "", cityRegion:data.city_region ?? undefined, cityLatitude:data.city_latitude ? Number(data.city_latitude):undefined, cityLongitude:data.city_longitude ? Number(data.city_longitude):undefined, citySource:data.city_is_manual ? "manual":"dataset", cityIsOther:Boolean(data.city_is_manual), trainingContext:training[data.training_context] ?? "Other", preferredMachine:data.preferred_machine_label ?? passportData.athlete.preferredMachine, biography:data.biography ?? "", visibility:visibility[data.visibility] ?? "Private" }; } }
  }
  return <AthletePassport initialAthlete={initial} />;
}
