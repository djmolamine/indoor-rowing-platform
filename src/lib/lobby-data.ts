export type VerificationTier = "Community" | "Verified" | "Competition-ready";

export interface AthleteSummary {
  name: string;
  country: string;
  countryCode: string;
  trainingLocation?: string;
  season: string;
  passport: {
    status: VerificationTier;
    completion: number;
  };
}

export interface TodayPlan {
  streakDays: number;
  suggestedWorkout: {
    title: string;
    detail: string;
    duration: string;
  };
  target: {
    label: string;
    completedKm: number;
    goalKm: number;
    period: string;
  };
}

export interface RiverExpedition {
  name: string;
  route: string;
  completedKm: number;
  totalKm: number;
  contributionKm: number;
  contributors: number;
  nextMilestone: string;
}

export interface UpcomingEvent {
  name: string;
  format: string;
  date: string;
  registration: string;
  verification: string;
  location: string;
}

export interface ProgressSnapshot {
  personalBest: { distance: string; result: string; improvement: string; date: string };
  recentWorkout: { title: string; distance: string; duration: string; pace: string; source: string };
  ranking: { position: number; fieldSize: number; category: string; scope: string };
}

export interface CommunityUpdate {
  id: string;
  group: string;
  message: string;
  detail: string;
}

export interface LobbyData {
  athlete: AthleteSummary;
  today: TodayPlan;
  expedition: RiverExpedition;
  event: UpcomingEvent;
  progress: ProgressSnapshot;
  community: CommunityUpdate[];
}

export const lobbyData: LobbyData = {
  athlete: {
    name: "Mohamed",
    country: "Algeria",
    countryCode: "DZ",
    trainingLocation: "Riyadh · Independent athlete",
    season: "2026 season",
    passport: { status: "Verified", completion: 82 },
  },
  today: {
    streakDays: 12,
    suggestedWorkout: {
      title: "Steady 30-minute row",
      detail: "Comfortable rhythm · 20–24 spm",
      duration: "30 min",
    },
    target: {
      label: "July distance target",
      completedKm: 62.4,
      goalKm: 100,
      period: "10 days remaining",
    },
  },
  expedition: {
    name: "Source to Sea: The Danube",
    route: "Black Forest → Black Sea",
    completedKm: 428.6,
    totalKm: 2850,
    contributionKm: 12.4,
    contributors: 1842,
    nextMilestone: "Vienna · 36 km ahead",
  },
  event: {
    name: "Global Virtual 2K",
    format: "2,000 m · Open individual",
    date: "2 August 2026",
    registration: "Registered · Entries close 27 July",
    verification: "Verified result required",
    location: "Row from any compatible machine",
  },
  progress: {
    personalBest: { distance: "5,000 m", result: "20:41.6", improvement: "8.2 sec faster", date: "18 July" },
    recentWorkout: { title: "Aerobic intervals", distance: "8,420 m", duration: "38:12", pace: "2:16 /500 m", source: "Manual entry" },
    ranking: { position: 34, fieldSize: 628, category: "Men 30–39 · Open weight", scope: "Algeria · 2,000 m" },
  },
  community: [
    { id: "expedition", group: "Danube crew", message: "The crew passed Ulm together.", detail: "4,218 km contributed today" },
    { id: "country", group: "Algeria", message: "18 athletes rowed this week.", detail: "Ranked 41st by participation" },
    { id: "global", group: "Global community", message: "Newcomers logged 3,406 first rows.", detail: "Across 52 countries" },
  ],
};
