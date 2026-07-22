export type ExpeditionDifficulty = "Accessible" | "Moderate" | "Endurance" | "Epic";
export type ExpeditionStatus = "active" | "recommended" | "available" | "completed";
export type CheckpointType = "start" | "city" | "landmark" | "confluence" | "border" | "finish";

export interface ExpeditionCheckpoint {
  id: string;
  name: string;
  country: string;
  distanceMeters: number;
  latitude?: number;
  longitude?: number;
  story: string;
  context: string;
  type: CheckpointType;
  reward?: string;
}

export interface ExpeditionDefinition {
  slug: string;
  name: string;
  subtitle: string;
  region: string;
  startLocation: string;
  finishLocation: string;
  totalDistanceMeters: number;
  countriesCrossed: string[];
  difficulty: ExpeditionDifficulty;
  estimatedCompletionRange: string;
  introduction: string;
  routeTheme: string;
  cover: { from: string; to: string; accent: string; motif: string };
  community: { participants: number; crews: number; contributedMeters: number };
  status: ExpeditionStatus;
  checkpoints: ExpeditionCheckpoint[];
  completionReward: string;
  certificateTitle: string;
}

export interface ExpeditionContribution {
  id: string;
  workoutId: string;
  title: string;
  occurredOn: string;
  distanceMeters: number;
  source: string;
}

export interface ExpeditionProgress {
  activeSlug: string;
  distanceBySlug: Record<string, number>;
  unlockedCheckpointIds: string[];
  contributions: ExpeditionContribution[];
}
