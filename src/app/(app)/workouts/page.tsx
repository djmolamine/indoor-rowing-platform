import { Info } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { WorkoutHistory, type WorkoutRow } from "@/components/workouts/workout-history";
import { listCurrentAthleteWorkouts } from "@/server/repositories/workout-repository";
import type { MachineClassId, VerificationId } from "@/lib/competition-taxonomy";
import type { MachineProviderId } from "@/lib/machine-data";

function duration(ms: number | null) {
  if (ms == null) return "Not recorded";
  const seconds = ms / 1000;
  return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;
}

export default async function WorkoutsPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const query = await searchParams;
  const data = await listCurrentAthleteWorkouts();
  const rows: WorkoutRow[] = data.map((row) => ({
    id: row.id,
    title: row.title ?? "Indoor row",
    providerId: (row.machine_provider_key ?? "unknown") as MachineProviderId,
    modelId: row.machine_model_key ?? "unknown-model",
    machineClassId: (row.machine_class ?? "unknown") as Exclude<MachineClassId, "all-comparable">,
    connectionMethod: row.source_method,
    verificationId: (row.verification_tier ?? "manual") as Exclude<VerificationId, "all-accepted">,
    sessionType: row.workout_role,
    distance: row.distance_meters == null ? "Not recorded" : `${Number(row.distance_meters).toLocaleString()} m`,
    time: duration(row.duration_ms),
    pace: row.average_pace_ms_per_500m == null ? "Not recorded" : duration(row.average_pace_ms_per_500m),
    date: new Date(row.started_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
  }));
  return <div>
    <SectionHeading eyebrow="Training history" title="Workouts" description="One athlete-owned record across every rower and every source." />
    {query.error && <p role="alert" className="mt-5 rounded-xl bg-[#fff1eb] p-3 text-sm font-bold text-[#a43f20]">{query.error}</p>}
    {query.message && <p role="status" className="mt-5 rounded-xl bg-[#eaf6f1] p-3 text-sm font-bold text-[#176a55]">{query.message}</p>}
    <p className="mt-5 flex items-center gap-2 text-xs font-bold text-[#687871]"><Info size={15} aria-hidden="true" /> Coming next: monitor scan and provider imports. Manual logging is available now.</p>
    <WorkoutHistory initialRows={rows} />
  </div>;
}
