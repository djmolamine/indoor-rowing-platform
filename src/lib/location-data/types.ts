export interface CitySelection {
  name: string;
  countryCode: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  source: "dataset" | "manual";
}
