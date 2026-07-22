"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function savePreferredUnits(formData:FormData){const system=String(formData.get("units"));if(system!=="metric"&&system!=="imperial")redirect("/settings?error=Choose%20a%20valid%20unit%20system");const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/sign-in?next=/settings");const {error}=await supabase.from("profiles").update({preferred_units:{system}}).eq("auth_user_id",user.id);if(error){console.error("Unit update failed",error.code);redirect("/settings?error=Units%20could%20not%20be%20saved");}redirect("/settings?message=Preferred%20units%20saved");}
