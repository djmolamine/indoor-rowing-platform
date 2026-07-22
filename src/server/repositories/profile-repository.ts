import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { PassportRow,ProfileRow,VisibilityRow } from "@/types/database";

export interface AthleteAccount { profile:ProfileRow;passport:PassportRow;visibility:VisibilityRow }
export async function requireCurrentAccount():Promise<AthleteAccount>{
 const supabase=await createClient(); const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||!user)throw new Error("AUTH_REQUIRED");
 const [{data:profile,error:profileError},{data:passport,error:passportError},{data:visibility,error:visibilityError}]=await Promise.all([
  supabase.from("profiles").select("*").eq("auth_user_id",user.id).is("deleted_at",null).single(),
  supabase.from("athlete_passports").select("*").eq("profile_id",user.id).single(),
  supabase.from("profile_visibility_settings").select("*").eq("profile_id",user.id).single(),
 ]);
 if(profileError||passportError||visibilityError||!profile||!passport||!visibility)throw new Error("PROFILE_UNAVAILABLE");
 return {profile,passport,visibility};
}

export async function updateCurrentAthlete(input:{displayName:string;dateOfBirth?:string|null;gender?:string|null;countryCode:string;cityId?:string|null;manualCity?:string|null;timezone?:string;trainingContext?:string|null;preferredUnits?:"metric"|"imperial";preferredMachineKey?:string|null;preferredMachineLabel?:string|null;bio?:string|null;passportVisibility?:PassportRow["visibility"]}){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error("AUTH_REQUIRED");
 const {data:model}=input.preferredMachineKey?await supabase.from("machine_models").select("id,provider_key").eq("key",input.preferredMachineKey).maybeSingle():{data:null};
 const {error:profileError}=await supabase.from("profiles").update({display_name:input.displayName,date_of_birth:input.dateOfBirth??null,gender:input.gender??null,country_code:input.countryCode,city_id:input.cityId??null,manual_city:input.manualCity??null,timezone:input.timezone??"UTC",training_context:input.trainingContext??null,preferred_units:{system:input.preferredUnits??"metric"},preferred_machine_model_id:model?.id??null,preferred_machine_label:input.preferredMachineLabel??null,onboarding_status:"completed",onboarding_completed_at:new Date().toISOString()}).eq("auth_user_id",user.id);
 if(profileError)throw new Error("PROFILE_UPDATE_FAILED");
 const {error:passportError}=await supabase.from("athlete_passports").update({bio:input.bio??null,visibility:input.passportVisibility??"private",primary_machine_model_id:model?.id??null,primary_machine_provider_id:model?.provider_key??null}).eq("profile_id",user.id);
 if(passportError)throw new Error("PASSPORT_UPDATE_FAILED");
}
