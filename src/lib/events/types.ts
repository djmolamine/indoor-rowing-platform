import type { CompetitionDivisionId, MachineClassId, VerificationId, WeightCategoryId } from "@/lib/competition-taxonomy";
import type { MachineProviderId } from "@/lib/machine-data";

export type EventFormat = "physical" | "virtual" | "hybrid";
export type EventType = "club" | "university" | "school" | "indoor-league" | "national-championship" | "continental-championship" | "world-championship" | "charity" | "virtual" | "provider-challenge" | "commercial";
export type EventLevel = "club" | "university" | "national" | "continental" | "international" | "community";
export type EventCommerceMode = "external_registration" | "rowform_registration" | "information_only" | "invite_only";
export type EventOperationalStatus = "active" | "postponed" | "cancelled" | "registration_suspended";
export type RegistrationStatus = "not_open" | "open" | "closed" | "live" | "completed";
export type OrganizerVerification = "unverified" | "identity_checked" | "organization_checked" | "federation_verified" | "platform_approved";
export type OwnershipStatus = "unclaimed_public_listing" | "claimed_by_organizer" | "verified_organizer_owned" | "rowform_managed";
export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "partially_refunded" | "refunded" | "disputed";
export type PayoutStatus = "not_applicable" | "pending" | "scheduled" | "paid" | "held" | "reversed";
export type ChargebackStatus = "none" | "inquiry" | "disputed" | "won" | "lost";
export type FeeMode = "organizer_funded" | "athlete_paid" | "hybrid" | "waived";
export type PromotionType = "featured_event" | "sponsored_event" | "promoted_search" | "homepage_feature" | "newsletter" | "regional" | "club_targeted";
export type ResultStatus = "provisional" | "verified" | "disqualified" | "appealed" | "corrected" | "official";

export interface Organizer {
  id: string;
  name: string;
  type: "club" | "university" | "school" | "company" | "event_organizer" | "national_federation" | "continental_body" | "international_body";
  contactEmail: string;
  supportContact: string;
  website?: string;
  billingProfileStatus: "not_configured" | "prototype" | "ready";
  verificationStatus: OrganizerVerification;
  ownershipStatus: OwnershipStatus;
  payoutAccountStatus: "not_configured" | "pending" | "ready";
  commercialAgreementStatus: "none" | "draft" | "prototype" | "active";
  federationAffiliation?: string;
  worldRowingAffiliationVerified: boolean;
  authorizedAdministratorIds: string[];
}

export interface OrganizerUser { id:string; organizerId:string; userId:string; role:"owner"|"administrator"|"registration_manager"|"finance"|"results_official"; status:"invited"|"active"|"suspended"; startsAt:string; endsAt?:string }

export interface EventPromotion {
  id: string;
  type: PromotionType;
  startsAt: string;
  endsAt: string;
  targetRegion?: string;
  targetAthleteSegment?: string;
  commercialCampaignId: string;
  disclosureLabel: "Featured" | "Sponsored" | "Promoted";
}

export interface Race {
  id: string;
  eventId: string;
  name: string;
  formatId: string;
  distanceMeters?: number;
  durationSeconds?: number;
  divisions: CompetitionDivisionId[];
  ageCategoryIds: string[];
  weightCategoryIds: WeightCategoryId[];
  adaptiveClassificationIds: string[];
  credentialRequirementIds?: string[];
  machineProviderIds: MachineProviderId[];
  machineClassIds: Exclude<MachineClassId, "all-comparable">[];
  verificationRequirement: Exclude<VerificationId, "all-accepted">;
  rankingDefinitionId?: string;
  scoring: "elapsed_time_ascending" | "distance_descending" | "team_aggregate";
  medals: string[];
  capacity?: number;
  remainingCapacity?: number;
  entryFeeMinor: number;
}

export interface FeeConfiguration {
  id: string;
  eventId: string;
  mode: FeeMode;
  percentageBasisPoints: number;
  fixedFeeMinor: number;
  organizerSubsidyMinor: number;
  promotionalDiscountMinor: number;
  couponCode?: string;
  taxRateBasisPoints: number;
}

export interface EventResult {
  id: string;
  eventId: string;
  raceId: string;
  registrationId: string;
  athleteId: string;
  athleteName: string;
  age: number;
  countryCode: string;
  affiliation: string;
  divisionLabel: string;
  machineLabel: string;
  resultType: "Race" | "Verified" | "Submitted";
  resultValue: number;
  displayResult: string;
  pacePer500m: string;
  averageWatts?: number;
  averageSpm?: number;
  status: ResultStatus;
  verificationAuthority: string;
  verificationTier: Exclude<VerificationId, "all-accepted">;
  rankingDefinitionId?: string;
  rankingRecordId?: string;
  passportCompetitionRecordId?: string;
  passportTimelineEntryId?: string;
  placing: string;
}

export interface EventNotice { id: string; eventId: string; publishedAt: string; title: string; body: string; severity: "information" | "important" | "urgent" }
export interface EventSource { id: string; eventId: string; label: string; url?: string; ownerName: string; reviewedAt: string }
export interface Waiver { id: string; eventId: string; version: string; title: string; summary: string; required: boolean }

export interface EventDefinition {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  organizerId: string;
  type: EventType;
  level: EventLevel;
  format: EventFormat;
  lifecycle: "published" | "registration_open" | "registration_closed" | "competition_live" | "results_pending" | "results_verified" | "archived";
  operationalStatus: EventOperationalStatus;
  registrationStatus: RegistrationStatus;
  commerceMode: EventCommerceMode;
  countryCode: string;
  country: string;
  continent: string;
  city: string;
  venue: string;
  timezone: string;
  startsAt: string;
  endsAt: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  currency: string;
  logoText: string;
  website?: string;
  externalRegistrationUrl?: string;
  contactEmail: string;
  refundPolicy: string;
  transferPolicy: string;
  eligibilitySummary: string;
  machineRuleSummary: string;
  verificationAuthority: string;
  verificationLevel: Exclude<VerificationId, "all-accepted">;
  raceIds: string[];
  promotionIds: string[];
  noticeIds: string[];
  sourceIds: string[];
  waiverIds: string[];
}

export interface Registration {
  id: string;
  reference: string;
  athleteId: string;
  passportId: string;
  eventId: string;
  raceId: string;
  paymentId: string;
  resultId?: string;
  divisionId: CompetitionDivisionId;
  ageCategoryId: string;
  weightCategoryId: WeightCategoryId;
  credentialSubmissionIds?: string[];
  affiliation: "independent" | "club";
  registrationStatus: "draft" | "pending_payment" | "confirmed" | "cancelled";
  paymentStatus: PaymentStatus;
  acceptedWaiverIds: string[];
  createdAt: string;
}

export interface RegistrationEntry { id:string; registrationId:string; raceId:string; athleteId:string; divisionId:CompetitionDivisionId; ageCategoryId:string; weightCategoryId:WeightCategoryId; credentialSubmissionIds?:string[]; eligibilityStatus:"pending"|"eligible"|"ineligible"|"withdrawn"|"more_information_required" }

export interface PaymentRecord {
  id: string;
  registrationId: string;
  providerId?: string;
  checkoutSessionId?: string;
  paymentIntentId?: string;
  currency: string;
  subtotalMinor: number;
  rowformServiceFeeMinor: number;
  organizerPayoutMinor: number;
  taxMinor: number;
  refundMinor: number;
  status: PaymentStatus;
  payoutStatus: PayoutStatus;
  chargebackStatus: ChargebackStatus;
  createdAt: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface Discount { id:string; eventId:string; code?:string; type:"fixed"|"percentage"; amountMinor?:number; percentageBasisPoints?:number; startsAt:string; endsAt:string; redemptionLimit?:number }
export interface Payout { id:string; organizerId:string; eventId:string; paymentProviderId?:string; amountMinor:number; currency:string; status:PayoutStatus; scheduledAt?:string; paidAt?:string }
export interface Refund { id:string; paymentId:string; registrationId:string; amountMinor:number; currency:string; reason:string; status:"requested"|"pending"|"succeeded"|"failed"; providerRefundId?:string; createdAt:string; completedAt?:string }

export interface FeeBreakdown { subtotalMinor: number; serviceFeeMinor: number; taxMinor: number; discountMinor: number; organizerSubsidyMinor: number; totalMinor: number; organizerPayoutMinor: number }
