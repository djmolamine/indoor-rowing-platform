export type PassportVisibility = "Private" | "Connections only" | "Public athlete profile" | "Event organizers";
export type TrainingContext = "Home" | "Commercial gym" | "Rowing club" | "School or university" | "National training centre" | "Other";

export interface CustomClubDraft {
  officialName: string;
  countryCode: string;
  country: string;
  city: string;
  website: string;
  federation: string;
}

export interface PassportAthlete {
  name: string;
  initials: string;
  country: string;
  countryCode: string;
  city: string;
  cityIsOther: boolean;
  cityRegion?: string;
  cityLatitude?: number;
  cityLongitude?: number;
  citySource?: "dataset" | "manual";
  trainingContext: TrainingContext;
  selectedClubId: string;
  customClub: CustomClubDraft;
  preferredMachineId: string;
  memberSince: string;
  currentSeason: string;
  passportId: string;
  verificationStatus: string;
  completion: number;
  preferredMachine: string;
  biography: string;
  visibility: PassportVisibility;
}

export interface PassportMetric {
  label: string;
  value: string;
  detail: string;
}

export interface PersonalBest {
  effort: string;
  result: string;
  date: string;
  machineClass: string;
  verification: string;
  improvement?: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  detail: string;
  kind: "identity" | "verified" | "performance" | "competition" | "expedition" | "ranking" | "community";
  eventResultId?: string;
  registrationId?: string;
}

export interface ActiveExpedition {
  name: string;
  subtitle: string;
  currentPosition: string;
  completedKm: number;
  totalKm: number;
  nextLandmark: string;
  distanceToNextKm: number;
}

export interface CompletedExpedition {
  name: string;
  completedOn: string;
  distance: string;
  certificate: string;
}

export interface CompetitionRecord {
  id: string;
  event: string;
  date: string;
  format: string;
  result: string;
  category: string;
  machineClass: string;
  verification: string;
  placing: string;
  eventId?: string;
  raceId?: string;
  eventResultId?: string;
  registrationId?: string;
  rankingRecordId?: string;
}

export interface Achievement {
  id: string;
  type: "Consistency" | "Improvement" | "Verified performance" | "Expedition" | "Event" | "Community" | "Lifetime";
  title: string;
  detail: string;
  earnedOn: string;
}

export interface PassportData {
  athlete: PassportAthlete;
  summary: PassportMetric[];
  personalBests: PersonalBest[];
  timeline: TimelineEntry[];
  expeditions: { active: ActiveExpedition; completed: CompletedExpedition[] };
  competitions: CompetitionRecord[];
  achievements: Achievement[];
  affiliations: {
    federation: string;
    providers: string[];
    machineClasses: string[];
  };
}

export const passportData: PassportData = {
  athlete: {
    name: "Mohamed Djebbari",
    initials: "MD",
    country: "Algeria",
    countryCode: "DZ",
    city: "Algiers",
    cityIsOther: false,
    citySource: "dataset",
    trainingContext: "Home",
    selectedClubId: "",
    customClub: { officialName: "", countryCode: "DZ", country: "Algeria", city: "Algiers", website: "", federation: "" },
    preferredMachineId: "concept2-rowerg",
    memberSince: "21 July 2025",
    currentSeason: "2026 season",
    passportId: "RF-DZ-MD-7K2P",
    verificationStatus: "Identity verified",
    completion: 82,
    preferredMachine: "Concept2 RowErg",
    biography: "Independent indoor rower building endurance across machines, cities, and seasons.",
    visibility: "Private",
  },
  summary: [
    { label: "Lifetime distance", value: "1,842.7 km", detail: "Across all eligible sources" },
    { label: "Rowing time", value: "128 h 46 min", detail: "Canonical workout time" },
    { label: "Workouts", value: "286", detail: "Since July 2025" },
    { label: "Current rhythm", value: "12 days", detail: "Active-day streak" },
    { label: "Personal bests", value: "9", detail: "Across 6 standard efforts" },
    { label: "Expeditions", value: "2", detail: "Completed journeys" },
    { label: "Competition entries", value: "7", detail: "Virtual and in-person" },
    { label: "Verified results", value: "14", detail: "Tier 2 or higher" },
  ],
  personalBests: [
    { effort: "500 m", result: "1:36.8", date: "6 June 2026", machineClass: "Concept2 RowErg", verification: "Tier 2 · Provider-signed", improvement: "1.4 sec" },
    { effort: "1,000 m", result: "3:28.2", date: "28 May 2026", machineClass: "Concept2 RowErg", verification: "Tier 2 · Provider-signed", improvement: "2.1 sec" },
    { effort: "2,000 m", result: "7:12.4", date: "12 July 2026", machineClass: "Standard flywheel class", verification: "Tier 4 · Organizer-verified", improvement: "4.8 sec" },
    { effort: "5,000 m", result: "20:41.6", date: "18 July 2026", machineClass: "Concept2 RowErg", verification: "Tier 2 · Provider-signed", improvement: "8.2 sec" },
    { effort: "10,000 m", result: "43:18.9", date: "30 April 2026", machineClass: "Water-resistance class", verification: "Tier 1 · Photo-confirmed" },
    { effort: "30 minutes", result: "7,214 m", date: "3 July 2026", machineClass: "RP3 dynamic class", verification: "Tier 2 · Trusted import", improvement: "86 m" },
  ],
  timeline: [
    { id: "t1", date: "18 July 2026", title: "Set a verified 5,000 m personal best", detail: "20:41.6 · 8.2 seconds faster", kind: "performance" },
    { id: "t2", date: "12 July 2026", title: "Reached Algeria’s top 50 for 2,000 m", detail: "Rank 34 · Men 30–39 · verified standard class", kind: "ranking" },
    { id: "t3", date: "2 July 2026", title: "Completed the Thames Expedition", detail: "346 km · Source to Tideway certificate issued", kind: "expedition" },
    { id: "t4", date: "20 June 2026", title: "Finished the Mediterranean Virtual Open", detail: "2,000 m · 7:18.7 · 18th of 146 · organizer-verified", kind: "competition", eventResultId:"result-mvo-md-001", registrationId:"registration-mvo-md-001" },
    { id: "t5", date: "3 May 2026", title: "Crew passed its first 1,000 km", detail: "Riyadh Rowers · 42.6 km personal contribution", kind: "community" },
    { id: "t6", date: "19 March 2026", title: "Completed the Seine Expedition", detail: "777 km · Burgundy to the Channel", kind: "expedition" },
    { id: "t7", date: "8 January 2026", title: "Recorded first verified workout", detail: "Provider-signed · canonical record established", kind: "verified" },
    { id: "t8", date: "21 July 2025", title: "Joined Rowform", detail: "Athlete Passport RF-DZ-MD-7K2P created", kind: "identity" },
  ],
  expeditions: {
    active: { name: "The Danube", subtitle: "From the Black Forest to the Black Sea", currentPosition: "Approaching Vienna, Austria", completedKm: 428.6, totalKm: 2850, nextLandmark: "Vienna", distanceToNextKm: 36 },
    completed: [
      { name: "The Thames", completedOn: "2 July 2026", distance: "346 km", certificate: "RF-EXP-THA-0241" },
      { name: "The Seine", completedOn: "19 March 2026", distance: "777 km", certificate: "RF-EXP-SEI-0088" },
    ],
  },
  competitions: [
    { id: "c1", event: "Mediterranean Virtual Open", date: "20 June 2026", format: "2,000 m time trial", result: "7:18.7", category: "Men 30–39 · Open weight", machineClass: "Concept2 static air-resistance class", verification: "Tier 4 · Organizer-verified", placing: "18th of 146 · Top 13%", eventId:"event-mvo-2026", raceId:"race-mvo-2k", eventResultId:"result-mvo-md-001", registrationId:"registration-mvo-md-001", rankingRecordId:"rank-mvo-2026-md" },
    { id: "c2", event: "Algeria Indoor Series · Round 2", date: "11 April 2026", format: "1,000 m sprint", result: "3:31.5", category: "Senior open", machineClass: "Concept2 RowErg", verification: "Tier 2 · Provider-signed", placing: "7th of 58 · Top 12%" },
    { id: "c3", event: "Global 30-Minute Challenge", date: "8 February 2026", format: "30-minute distance", result: "7,128 m", category: "Men 30–39 · Independent", machineClass: "RP3 dynamic class", verification: "Tier 2 · Trusted import", placing: "64th percentile" },
  ],
  achievements: [
    { id: "a1", type: "Consistency", title: "Twelve-day rhythm", detail: "Rowed on 12 consecutive active days without a missed planned session.", earnedOn: "July 2026" },
    { id: "a2", type: "Improvement", title: "Five-minute breakthrough", detail: "Improved the verified 5,000 m result by more than eight seconds.", earnedOn: "July 2026" },
    { id: "a3", type: "Verified performance", title: "Competition-standard 2K", detail: "Completed an organizer-verified 2,000 m result.", earnedOn: "June 2026" },
    { id: "a4", type: "Expedition", title: "Source to Tideway", detail: "Completed all 346 km and 14 stories of The Thames.", earnedOn: "July 2026" },
    { id: "a5", type: "Event", title: "Mediterranean finisher", detail: "Completed the Mediterranean Virtual Open under published rules.", earnedOn: "June 2026" },
    { id: "a6", type: "Community", title: "Crew contributor", detail: "Contributed more than 250 km to shared crew journeys.", earnedOn: "May 2026" },
    { id: "a7", type: "Lifetime", title: "One million meters", detail: "Passed 1,000 km of athlete-owned indoor rowing history.", earnedOn: "April 2026" },
  ],
  affiliations: {
    federation: "No federation relationship declared",
    providers: ["Concept2", "RP3", "Manual entry", "Photo-confirmed"],
    machineClasses: ["Standard flywheel", "Dynamic", "Water resistance"],
  },
};
