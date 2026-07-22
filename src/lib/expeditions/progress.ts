import type { ExpeditionProgress } from "./types";

export const INITIAL_EXPEDITION_PROGRESS: ExpeditionProgress = {
  activeSlug: "danube",
  distanceBySlug: { danube: 428_600, thames: 346_000 },
  unlockedCheckpointIds: ["danube-source", "danube-ulm", "thames-head", "thames-oxford", "thames-henley", "thames-windsor", "thames-putney", "thames-greenwich", "thames-estuary"],
  contributions: [
    { id: "contribution-3", workoutId: "workout-water-participation", title: "Steady state row", occurredOn: "21 July 2026", distanceMeters: 12_400, source: "Manual entry" },
    { id: "contribution-2", workoutId: "workout-interval-rp3", title: "Aerobic intervals", occurredOn: "19 July 2026", distanceMeters: 8_420, source: "Photo-confirmed" },
    { id: "contribution-1", workoutId: "workout-rp3-dynamic", title: "Easy recovery row", occurredOn: "17 July 2026", distanceMeters: 6_180, source: "RP3 import" },
  ],
};

export const EXPEDITION_SESSION_KEY = "rowform-expedition-progress-v1";
