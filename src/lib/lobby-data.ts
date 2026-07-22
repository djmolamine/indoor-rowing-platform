export type VerificationTier = "Community" | "Verified" | "Competition-ready";

export interface AthleteSummary {
  firstName: string;
  fullName: string;
  country: string;
  countryCode: string;
  trainingIdentity: string;
  season: string;
  passport: {
    status: VerificationTier;
    completion: number;
    readiness: string;
    lifetimeDistanceKm: number;
    personalBestCount: number;
    completedExpeditions: number;
  };
}

export interface ReasonToRow {
  id: string;
  label: string;
  value: string;
  action: string;
  kind: "streak" | "expedition" | "target" | "event" | "crew";
}

export interface TodayPlan {
  motivation: string;
  suggestedWorkout: {
    title: string;
    detail: string;
    duration: string;
  };
  reasons: ReasonToRow[];
}

export interface ExpeditionMilestone {
  label: string;
  distanceKm: number;
  state: "passed" | "current" | "ahead";
}

export interface ExpeditionSummary {
  name: string;
  subtitle: string;
  startLocation: string;
  finishLocation: string;
  totalKm: number;
  completedKm: number;
  currentLocation: string;
  nextMilestone: string;
  distanceToNextKm: number;
  story: string;
  contributionKm: number;
  participants: number;
  countriesCrossed: number;
  milestones: ExpeditionMilestone[];
}

export interface UpcomingEvent {
  name: string;
  eventType: string;
  raceFormat: string;
  date: string;
  registrationDeadline: string;
  registrationStatus: string;
  verification: string;
  machineEligibility: string;
}

export interface ProgressSnapshot {
  personalBest: { distance: string; result: string; improvement: string; date: string; verified: boolean };
  recentWorkout: { title: string; distance: string; duration: string; pace: string; strokeRate: string; source: string };
  ranking: { position: number; fieldSize: number; category: string; scope: string; machineClass: string };
  weeklyConsistency: { completedDays: number; targetDays: number; label: string; strokeProfile: number[] };
  insight: string;
}

export interface CommunityUpdate {
  id: string;
  category: "Expedition" | "Crew" | "Event" | "National" | "Verified result";
  message: string;
  detail: string;
}

export interface LobbyData {
  athlete: AthleteSummary;
  today: TodayPlan;
  expedition: ExpeditionSummary;
  event: UpcomingEvent;
  progress: ProgressSnapshot;
  community: CommunityUpdate[];
}

export const lobbyData: LobbyData = {
  athlete: {
    firstName: "Athlete",
    fullName: "Athlete",
    country: "Not set",
    countryCode: "",
    trainingIdentity: "Independent athlete",
    season: "2026 season",
    passport: {
      status: "Community",
      completion: 0,
      readiness: "Complete the useful parts of your Athlete Passport",
      lifetimeDistanceKm: 0,
      personalBestCount: 0,
      completedExpeditions: 0,
    },
  },
  today: {
    motivation: "Thirty steady minutes puts Vienna within one more row.",
    suggestedWorkout: {
      title: "Steady 30-minute row",
      detail: "Comfortable rhythm · 20–24 spm · finish controlled",
      duration: "30 min",
    },
    reasons: [
      { id: "streak", label: "Current rhythm", value: "12 active days", action: "Keep the habit moving", kind: "streak" },
      { id: "expedition", label: "Next landmark", value: "36 km to Vienna", action: "About four steady rows", kind: "expedition" },
      { id: "target", label: "Weekly target", value: "18.6 km remaining", action: "62% complete", kind: "target" },
      { id: "event", label: "Entry window", value: "6 days remaining", action: "Global Virtual 2K", kind: "event" },
      { id: "crew", label: "Danube crew", value: "8.5 km needed", action: "Reach the next crew marker", kind: "crew" },
    ],
  },
  expedition: {
    name: "The Danube",
    subtitle: "From the Black Forest to the Black Sea",
    startLocation: "Donaueschingen, Germany",
    finishLocation: "Sulina, Romania",
    totalKm: 2850,
    completedKm: 428.6,
    currentLocation: "Approaching Vienna, Austria",
    nextMilestone: "Vienna",
    distanceToNextKm: 36,
    story: "The river widens toward Vienna, where rowing clubs, trade routes, and imperial history have gathered along the same current for generations.",
    contributionKm: 12.4,
    participants: 1842,
    countriesCrossed: 10,
    milestones: [
      { label: "Black Forest", distanceKm: 0, state: "passed" },
      { label: "Ulm", distanceKm: 258, state: "passed" },
      { label: "Vienna", distanceKm: 465, state: "current" },
      { label: "Budapest", distanceKm: 680, state: "ahead" },
      { label: "Black Sea", distanceKm: 2850, state: "ahead" },
    ],
  },
  event: {
    name: "Global Virtual 2K",
    eventType: "Virtual regatta · Open individual",
    raceFormat: "2,000 m time trial",
    date: "2 August 2026 · 00:00–23:59 UTC",
    registrationDeadline: "27 July 2026 · 23:59 UTC",
    registrationStatus: "Registered",
    verification: "Tier 2 · Provider-signed or trusted import",
    machineEligibility: "Approved machine classes shown in event rules",
  },
  progress: {
    personalBest: { distance: "5,000 m", result: "20:41.6", improvement: "8.2 sec faster", date: "18 July", verified: true },
    recentWorkout: { title: "Aerobic intervals", distance: "8,420 m", duration: "38:12", pace: "2:16 /500 m", strokeRate: "23 spm", source: "Manual entry" },
    ranking: { position: 0, fieldSize: 0, category: "Not ranked", scope: "No eligible result", machineClass: "Verification required" },
    weeklyConsistency: { completedDays: 4, targetDays: 5, label: "4 of 5 rowing days", strokeProfile: [38, 55, 48, 70, 66, 78, 62, 83, 74, 58, 44, 32] },
    insight: "Your last three steady rows held a more even split while average stroke rate stayed at 23 spm.",
  },
  community: [
    { id: "milestone", category: "Expedition", message: "Nadia reached Passau on The Danube.", detail: "Three Rivers milestone · 2 hours ago" },
    { id: "crew", category: "Crew", message: "A community crew completed a shared 250 km stage.", detail: "12 athletes contributed · Today" },
    { id: "event", category: "Event", message: "Registration opened for the Mediterranean Indoor Open.", detail: "Virtual and in-person · 14 September" },
    { id: "national", category: "National", message: "Athletes in one national community passed 10,000 km this season.", detail: "184 independent and club athletes" },
    { id: "pb", category: "Verified result", message: "Yacine set a verified 2,000 m personal best.", detail: "Tier 2 result · 6:58.4" },
  ],
};
