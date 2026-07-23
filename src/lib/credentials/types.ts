export type CredentialStatus = "submitted" | "under_review" | "verified" | "rejected" | "expired" | "revoked";
export type EligibilityDecision = "pending" | "approved" | "rejected" | "more_information_required";

export interface CredentialType {
  id: string;
  name: string;
  category: "classification" | "licence" | "identity" | "medical" | "accreditation" | "compliance" | "safety";
  sensitive: boolean;
}

export interface EventCredentialRequirement {
  id: string;
  eventId: string;
  credentialTypeId: string;
  required: boolean;
  acceptedIssuers: string[];
  documentRequired: boolean;
  organizerApprovalRequired: boolean;
}

export interface AthleteCredential {
  id: string;
  athleteId: string;
  credentialTypeId: string;
  name: string;
  status: CredentialStatus;
  issuingOrganization: string;
  serialReference?: string;
  issuedAt?: string;
  verifiedAt: string;
  expiresAt?: string;
  verifiedBy: string;
  eventHistory: string[];
}
