"use server";
import { revalidatePath } from "next/cache";
import type { PassportAthlete } from "@/lib/passport-data";
import { updateCurrentAthlete } from "@/server/repositories/profile-repository";
const trainingMap={Home:"home","Commercial gym":"commercial_gym","Rowing club":"rowing_club","School or university":"school_university","National training centre":"national_training_centre",Other:"other"} as const;
const visibilityMap={Private:"private","Connections only":"connections","Public athlete profile":"public","Event organizers":"event_organizers"} as const;
export async function saveAthleteProfile(athlete:PassportAthlete){try{await updateCurrentAthlete({displayName:athlete.name,countryCode:athlete.countryCode,manualCity:athlete.citySource==="manual"?athlete.city:null,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,trainingContext:trainingMap[athlete.trainingContext],preferredMachineKey:athlete.preferredMachineId,preferredMachineLabel:athlete.preferredMachine,bio:athlete.biography,passportVisibility:visibilityMap[athlete.visibility]});revalidatePath("/profile");revalidatePath("/dashboard");return {persisted:true,message:"Athlete Passport saved."};}catch(error){console.error("Passport update failed",error instanceof Error?error.message:"unknown");return {persisted:false,message:"Your Passport could not be saved. Please retry."};}}
