export type CompetitionDivisionId = "men" | "women" | "lightweight-men" | "lightweight-women" | "adaptive-para";
export type WeightCategoryId = "open-weight" | "lightweight";
export type RankingFormatKind = "fixed-distance" | "fixed-time" | "relay-distance";
export type OfficialStatusId = "world-rowing-official" | "federation-official" | "organizer-official" | "rowform-standard" | "community-challenge";
export type VerificationId = "all-accepted" | "manual" | "photo-confirmed" | "provider-imported" | "device-attested" | "organizer-verified" | "federation-certified";
export type MachineClassId = "all-comparable" | "static-air-resistance" | "dynamic-air-resistance" | "water-resistance" | "air-resistance" | "magnetic" | "hybrid-resistance" | "event-approved" | "unknown";

export interface TaxonomyOption<T extends string> { id: T; label: string }
export interface AgeCategory extends TaxonomyOption<string> { minimumAge: number; maximumAge: number | null; kind: "youth" | "championship" | "masters"; optional?: boolean }
export interface EventFormat extends TaxonomyOption<string> { kind: RankingFormatKind; targetMeters?: number; targetSeconds?: number; officialStatus: OfficialStatusId }
export interface AdaptiveClassification extends TaxonomyOption<string> { eventId: string; applicableFormatIds: string[]; eligibilityStatus: "self-declared" | "evidence-submitted" | "confirmed"; verificationAuthority: string; demonstration?: boolean }

export const COMPETITION_DIVISIONS: TaxonomyOption<CompetitionDivisionId>[] = [
  { id: "men", label: "Men" }, { id: "women", label: "Women" },
  { id: "lightweight-men", label: "Lightweight Men" }, { id: "lightweight-women", label: "Lightweight Women" },
  { id: "adaptive-para", label: "Adaptive / Para" },
];

export const WEIGHT_CATEGORIES: (TaxonomyOption<WeightCategoryId> & { maximumKg?: Partial<Record<CompetitionDivisionId, number>> })[] = [
  { id: "open-weight", label: "Open weight" },
  { id: "lightweight", label: "Lightweight", maximumKg: { "lightweight-men": 75, "lightweight-women": 61.5 } },
];

export const LIGHTWEIGHT_EVIDENCE_STATUSES = [
  { id: "declared", label: "Declared" }, { id: "evidence-submitted", label: "Evidence submitted" },
  { id: "organizer-verified", label: "Organizer verified" }, { id: "federation-verified", label: "Federation verified" },
] as const;

export const AGE_CATEGORIES: AgeCategory[] = [
  { id: "u13", label: "Under 13", minimumAge: 0, maximumAge: 12, kind: "youth", optional: true },
  { id: "u15", label: "Under 15", minimumAge: 0, maximumAge: 14, kind: "youth", optional: true },
  { id: "u17", label: "Under 17", minimumAge: 0, maximumAge: 16, kind: "youth", optional: true },
  { id: "u19", label: "Under 19", minimumAge: 0, maximumAge: 18, kind: "championship" },
  { id: "u23", label: "Under 23", minimumAge: 19, maximumAge: 22, kind: "championship" },
  { id: "senior-23-39", label: "Senior: 23–39", minimumAge: 23, maximumAge: 39, kind: "championship" },
  ...[[40,44],[45,49],[50,54],[55,59],[60,64],[65,69],[70,74],[75,79],[80,84],[85,89]].map(([minimumAge, maximumAge]) => ({ id:`masters-${minimumAge}-${maximumAge}`, label:`Masters ${minimumAge}–${maximumAge}`, minimumAge, maximumAge, kind:"masters" as const })),
  { id: "masters-90-plus", label: "Masters 90+", minimumAge: 90, maximumAge: null, kind: "masters" },
];

export const RANKING_FORMATS: EventFormat[] = [
  ...[[100,"100 m"],[250,"250 m"],[500,"500 m"],[1000,"1,000 m"],[2000,"2,000 m"],[5000,"5,000 m"],[6000,"6,000 m"],[10000,"10,000 m"],[20000,"20,000 m"],[21097,"Half Marathon — 21,097 m"],[42195,"Marathon — 42,195 m"]].map(([targetMeters,label]) => ({ id:`distance-${targetMeters}`, label:String(label), kind:"fixed-distance" as const, targetMeters:Number(targetMeters), officialStatus: [1000,5000].includes(Number(targetMeters)) ? "world-rowing-official" as const : "rowform-standard" as const })),
  ...[[60,"1 minute"],[240,"4 minutes"],[1800,"30 minutes"],[3600,"60 minutes"]].map(([targetSeconds,label]) => ({ id:`time-${targetSeconds}`, label:String(label), kind:"fixed-time" as const, targetSeconds:Number(targetSeconds), officialStatus: Number(targetSeconds) === 60 ? "world-rowing-official" as const : "rowform-standard" as const })),
  { id:"relay-2000", label:"2,000 m relay", kind:"relay-distance", targetMeters:2000, officialStatus:"organizer-official" },
  { id:"relay-5000", label:"5,000 m relay", kind:"relay-distance", targetMeters:5000, officialStatus:"world-rowing-official" },
];

export const OFFICIAL_STATUSES: TaxonomyOption<OfficialStatusId>[] = [
  { id:"world-rowing-official", label:"World Rowing official event" }, { id:"federation-official", label:"Federation official event" },
  { id:"organizer-official", label:"Organizer official event" }, { id:"rowform-standard", label:"Rowform standard ranking" },
  { id:"community-challenge", label:"Community challenge" },
];

export const MACHINE_CLASSES: TaxonomyOption<MachineClassId>[] = [
  { id:"all-comparable", label:"Comparable machines only" }, { id:"static-air-resistance", label:"Static air-resistance" },
  { id:"dynamic-air-resistance", label:"Dynamic air-resistance" }, { id:"water-resistance", label:"Water-resistance" },
  { id:"air-resistance", label:"Air-resistance" }, { id:"magnetic", label:"Magnetic" },
  { id:"hybrid-resistance", label:"Hybrid resistance" }, { id:"event-approved", label:"Event-approved class" }, { id:"unknown", label:"Unknown" },
];

export const VERIFICATION_OPTIONS: TaxonomyOption<VerificationId>[] = [
  { id:"all-accepted", label:"All accepted results" }, { id:"manual", label:"Manual" },
  { id:"photo-confirmed", label:"Photo-confirmed" }, { id:"provider-imported", label:"Provider-imported" },
  { id:"device-attested", label:"Device-attested" }, { id:"organizer-verified", label:"Organizer-verified" },
  { id:"federation-certified", label:"Federation-certified" },
];

export const ADAPTIVE_CLASSIFICATIONS: AdaptiveClassification[] = Array.from({ length: 7 }, (_, index) => ({
  id:`iar${index + 1}`, label:`IAR${index + 1} — demonstration`, eventId:"wr-virtual-2026-demo",
  applicableFormatIds:["time-60","distance-1000"], eligibilityStatus:"confirmed", verificationAuthority:"Event classification team", demonstration:true,
}));

export function ageOnDate(dateOfBirth: string, calculationDate: string) {
  const birth = new Date(`${dateOfBirth}T00:00:00Z`); const on = new Date(`${calculationDate}T00:00:00Z`);
  let age = on.getUTCFullYear() - birth.getUTCFullYear();
  if (on.getUTCMonth() < birth.getUTCMonth() || (on.getUTCMonth() === birth.getUTCMonth() && on.getUTCDate() < birth.getUTCDate())) age--;
  return age;
}

export function deriveAgeCategory(dateOfBirth: string, calculationDate: string, enabledIds = AGE_CATEGORIES.filter((item) => !item.optional).map((item) => item.id)) {
  const age = ageOnDate(dateOfBirth, calculationDate);
  return AGE_CATEGORIES.find((item) => enabledIds.includes(item.id) && age >= item.minimumAge && (item.maximumAge === null || age <= item.maximumAge));
}

export function compatibleWeightCategories(division: CompetitionDivisionId) {
  return division === "lightweight-men" || division === "lightweight-women" ? WEIGHT_CATEGORIES.filter((item) => item.id === "lightweight") : WEIGHT_CATEGORIES.filter((item) => item.id === "open-weight");
}

export const labelFor = <T extends string>(options: TaxonomyOption<T>[], id: T) => options.find((item) => item.id === id)?.label ?? id;
