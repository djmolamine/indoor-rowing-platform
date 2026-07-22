import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { WorkoutRow } from "@/types/database";
export async function getCurrentAthleteWorkout(id:string):Promise<WorkoutRow|null>{const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error("AUTH_REQUIRED");const {data,error}=await supabase.from("workouts").select("*").eq("id",id).eq("user_id",user.id).is("deleted_at",null).maybeSingle();if(error)throw new Error("WORKOUT_UNAVAILABLE");return data;}
