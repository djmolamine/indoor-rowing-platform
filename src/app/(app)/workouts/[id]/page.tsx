import { notFound } from "next/navigation";
import { PerformanceDetail } from "@/components/performance/performance-detail";
import type { WorkoutRecord } from "@/lib/performance-records";
import { getCurrentAthleteWorkout } from "@/server/repositories/workout-detail-repository";
import { requireCurrentAccount } from "@/server/repositories/profile-repository";
import { getCountry } from "@/lib/location-data/countries";

export default async function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [row, { profile }] = await Promise.all([getCurrentAthleteWorkout(id), requireCurrentAccount()]);
  if (!row) notFound();
  const country = getCountry(profile.country_code ?? "");
  const workout = {
    id: row.id,
    athlete: { name: profile.display_name ?? "Athlete", country: country?.name ?? "Not set", countryCode: profile.country_code ?? "—", affiliation: profile.training_context?.replaceAll("_", " ") ?? "Independent athlete" },
    title: row.title ?? "Indoor row", resultType: row.workout_role,
    kind: row.workout_type === "fixed_time" ? "fixed-time" : row.workout_type === "interval" ? "interval" : "fixed-distance",
    startedAt: row.started_at, timezone: row.timezone ?? profile.timezone,
    metrics: { distanceMeters: row.distance_meters == null ? undefined : Number(row.distance_meters), durationSeconds: row.duration_ms == null ? undefined : row.duration_ms / 1000, paceSecondsPer500: row.average_pace_ms_per_500m == null ? undefined : row.average_pace_ms_per_500m / 1000, averageWatts: row.average_power_watts == null ? undefined : Number(row.average_power_watts), averageSpm: row.average_spm == null ? undefined : Number(row.average_spm), averageHeartRate: row.average_heart_rate_bpm ?? undefined, calories: row.calories_kcal == null ? undefined : Number(row.calories_kcal) },
    machine: { brand: row.machine_provider_key ?? "Unknown", model: row.machine_model_key ?? "Not recorded", machineClass: row.machine_class ?? "Unknown", connectionMethod: row.source_method, comparability: row.ranking_eligible ? "Provider class ranking" : "Not ranking eligible" },
    verification: { tier: 0, label: row.verification_tier ?? "Manual", authority: "Athlete declaration", sourceProvider: row.machine_provider_key ?? "Manual", importMethod: row.source_method, evidenceType: "No external evidence", evidenceTimestamp: row.created_at, rankingEligible: row.ranking_eligible },
    sourceMethod: row.source_method, sampleBasis: "imported summary only", samples: [], splits: [], intervals: [], providerMetrics: {}, notes: row.notes ?? undefined, tags: [], visibility: row.visibility === "public" ? "Public" : row.visibility === "connections" ? "Connections" : "Private", owner: true, attachments: [],
  } satisfies WorkoutRecord;
  return <PerformanceDetail workout={workout} />;
}
