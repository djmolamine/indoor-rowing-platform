export type ClubType = "Community club" | "High-performance club" | "School or university club" | "Multi-sport club";
export type ClubVerificationStatus = "Source reviewed" | "Federation verified" | "Unverified";
export type ClubActiveStatus = "Active" | "Inactive" | "Unknown";

export interface SeedClub {
  id: string;
  officialName: string;
  countryCode: string;
  city: string;
  clubType: ClubType;
  website?: string;
  federationAffiliation?: string;
  verificationStatus: ClubVerificationStatus;
  source: { label: string; url: string; reviewedOn: string };
  activeStatus: ClubActiveStatus;
}

/**
 * Small prototype seed directory sourced from clubs' official websites.
 * Inclusion means source-reviewed for discovery, not federation verification.
 * The directory is intentionally incomplete and is replaceable by repository data.
 */
export const SEED_CLUBS: SeedClub[] = [
  {
    id: "00000000-0000-4000-8000-000000000101",
    officialName: "Leander Club",
    countryCode: "GB",
    city: "Henley-on-Thames",
    clubType: "High-performance club",
    website: "https://www.leander.co.uk/",
    federationAffiliation: "British Rowing",
    verificationStatus: "Source reviewed",
    source: { label: "Leander Club official website", url: "https://www.leander.co.uk/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000102",
    officialName: "Tideway Scullers School",
    countryCode: "GB",
    city: "London",
    clubType: "Community club",
    website: "https://www.tidewayscullers.com/",
    federationAffiliation: "British Rowing",
    verificationStatus: "Source reviewed",
    source: { label: "Tideway Scullers School official website", url: "https://www.tidewayscullers.com/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000103",
    officialName: "Riverside Boat Club",
    countryCode: "US",
    city: "Cambridge",
    clubType: "Community club",
    website: "https://www.riversideboatclub.com/",
    federationAffiliation: "USRowing",
    verificationStatus: "Source reviewed",
    source: { label: "Riverside Boat Club official website", url: "https://www.riversideboatclub.com/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000104",
    officialName: "Community Rowing, Inc.",
    countryCode: "US",
    city: "Boston",
    clubType: "Community club",
    website: "https://www.communityrowing.org/",
    federationAffiliation: "USRowing",
    verificationStatus: "Source reviewed",
    source: { label: "Community Rowing official website", url: "https://www.communityrowing.org/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000105",
    officialName: "Sydney Rowing Club",
    countryCode: "AU",
    city: "Sydney",
    clubType: "High-performance club",
    website: "https://www.sydneyrowingclub.com.au/",
    federationAffiliation: "Rowing Australia",
    verificationStatus: "Source reviewed",
    source: { label: "Sydney Rowing Club official website", url: "https://www.sydneyrowingclub.com.au/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000106",
    officialName: "UTS Haberfield Rowing Club",
    countryCode: "AU",
    city: "Sydney",
    clubType: "School or university club",
    website: "https://www.utsrowing.com.au/",
    federationAffiliation: "Rowing NSW",
    verificationStatus: "Source reviewed",
    source: { label: "UTS Haberfield Rowing Club official website", url: "https://www.utsrowing.com.au/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000107",
    officialName: "Rowing Club Lausanne",
    countryCode: "CH",
    city: "Lausanne",
    clubType: "Community club",
    website: "https://www.rowing-club-lausanne.ch/",
    federationAffiliation: "Swiss Rowing",
    verificationStatus: "Source reviewed",
    source: { label: "Rowing Club Lausanne official website", url: "https://www.rowing-club-lausanne.ch/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
  {
    id: "00000000-0000-4000-8000-000000000108",
    officialName: "Berliner Ruder-Club",
    countryCode: "DE",
    city: "Berlin",
    clubType: "Community club",
    website: "https://www.berliner-ruder-club.de/",
    federationAffiliation: "Deutscher Ruderverband",
    verificationStatus: "Source reviewed",
    source: { label: "Berliner Ruder-Club official website", url: "https://www.berliner-ruder-club.de/", reviewedOn: "2026-07-22" },
    activeStatus: "Active",
  },
];

export function seedClubsForLocation(countryCode: string, city?: string) {
  const countryClubs = SEED_CLUBS.filter((club) => club.activeStatus === "Active" && club.countryCode === countryCode);
  const cityClubs = city ? countryClubs.filter((club) => club.city === city) : countryClubs;
  return city && cityClubs.length > 0 ? cityClubs : countryClubs;
}

export interface ClubDirectory {
  search(input: { countryCode: string; city?: string; query?: string }): Promise<SeedClub[]>;
}

export const localClubDirectory: ClubDirectory = {
  async search({ countryCode, city, query = "" }) {
    const pool = seedClubsForLocation(countryCode, city);
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return normalizedQuery ? pool.filter((club) => club.officialName.toLocaleLowerCase().includes(normalizedQuery)) : pool;
  },
};
