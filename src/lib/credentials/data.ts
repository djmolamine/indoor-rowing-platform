import type { AthleteCredential, CredentialType, EventCredentialRequirement } from "./types";

export const credentialTypes: CredentialType[] = [
  { id: "adaptive-classification", name: "Adaptive Classification", category: "classification", sensitive: true },
  { id: "federation-licence", name: "Federation Licence", category: "licence", sensitive: false },
  { id: "competition-licence", name: "Official Competition Licence", category: "licence", sensitive: false },
  { id: "medical-clearance", name: "Medical Clearance", category: "medical", sensitive: true },
  { id: "national-team-status", name: "National Team Status", category: "accreditation", sensitive: false },
  { id: "coach-accreditation", name: "Coach Accreditation", category: "accreditation", sensitive: false },
  { id: "safety-certification", name: "Safety Certification", category: "safety", sensitive: false },
];

/** Prototype requirements. Production data will come from the event credential tables. */
export const eventCredentialRequirements: EventCredentialRequirement[] = [];

/** Empty by design: Rowform never invents an official athlete credential. */
export const currentAthleteCredentials: AthleteCredential[] = [];

export function requirementsForEvent(eventId: string) {
  return eventCredentialRequirements.filter((requirement) => requirement.eventId === eventId);
}
