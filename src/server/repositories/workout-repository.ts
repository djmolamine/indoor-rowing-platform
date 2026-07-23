import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { WorkoutRow } from "@/types/database";

type SafeSupabaseError = { code?: string; message?: string };

function reportDevelopmentError(operation: string, error: SafeSupabaseError) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[supabase:${operation}]`, {
      code: error.code ?? "unknown",
      message: error.message ?? "Unknown Supabase error",
    });
  }
}

function isExpiredJwtError(error: SafeSupabaseError) {
  const diagnostic = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  return error.code === "PGRST301" || diagnostic.includes("jwt expired") || diagnostic.includes("expired jwt");
}

export async function listCurrentAthleteWorkouts(): Promise<WorkoutRow[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("AUTH_REQUIRED");

  const runQuery = () => supabase
      .from("workouts")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .order("started_at", { ascending: false });

  let { data, error } = await runQuery();
  if (error && isExpiredJwtError(error)) {
    reportDevelopmentError("workouts.list.expired-session", error);
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
      reportDevelopmentError("workouts.list.refresh-session", refreshError);
    } else {
      ({ data, error } = await runQuery());
    }
  }
  if (error) {
    reportDevelopmentError("workouts.list", error);
    throw new Error("WORKOUTS_UNAVAILABLE", { cause: error });
  }
  return data ?? [];
}

export async function createManualWorkout(input: { title: string; startedAt: string; distanceMeters?: number; durationMs?: number; providerKey?: string | null; modelKey?: string | null; machineClass?: string | null; notes?: string | null }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("AUTH_REQUIRED");
  const pace = input.distanceMeters && input.durationMs ? Math.round(input.durationMs / (input.distanceMeters / 500)) : null;
  const { data, error } = await supabase.from("workouts").insert({
    user_id: user.id,
    title: input.title,
    started_at: input.startedAt,
    distance_meters: input.distanceMeters,
    duration_ms: input.durationMs,
    average_pace_ms_per_500m: pace,
    machine_provider_key: input.providerKey,
    machine_model_key: input.modelKey,
    machine_class: input.machineClass,
    source_method: "manual",
    verification_tier: "manual",
    workout_type: "fixed_distance",
    workout_role: "training",
    visibility: "private",
    ranking_eligible: false,
    notes: input.notes,
  }).select("*").single();
  if (error) {
    reportDevelopmentError("workouts.create", error);
    throw new Error("WORKOUT_CREATE_FAILED", { cause: error });
  }
  return data;
}

export async function softDeleteCurrentWorkout(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("AUTH_REQUIRED");
  const { error } = await supabase.from("workouts").update({ deleted_at: new Date().toISOString() }).eq("id", id).eq("user_id", user.id);
  if (error) {
    reportDevelopmentError("workouts.delete", error);
    throw new Error("WORKOUT_DELETE_FAILED", { cause: error });
  }
}
