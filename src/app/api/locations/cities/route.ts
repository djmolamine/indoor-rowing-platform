import { NextResponse } from "next/server";
import { City } from "country-state-city";

const CITY_ALIASES: Record<string, Record<string, string[]>> = { DZ: { Algiers:["alger","الجزائر"], Oran:["wahran","وهران"], Constantine:["qacentina","قسنطينة"], "Bejaïa":["bejaia","bougie","بجاية"] } };
function searchable(value:string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase(); }

export async function GET(request: Request) {
  const url = new URL(request.url);
  const countryCode = (url.searchParams.get("country") ?? "").toUpperCase();
  const query = searchable((url.searchParams.get("q") ?? "").trim());
  if (!/^[A-Z]{2}$/.test(countryCode)) return NextResponse.json({ cities: [] });
  const cities = (City.getCitiesOfCountry(countryCode) ?? [])
    .filter((city) => !query || searchable(`${city.name} ${city.stateCode} ${(CITY_ALIASES[countryCode]?.[city.name] ?? []).join(" ")}`).includes(query))
    .slice(0, 100)
    .map((city) => ({ name: city.name, countryCode: city.countryCode, region: city.stateCode || undefined, latitude: city.latitude ? Number(city.latitude) : undefined, longitude: city.longitude ? Number(city.longitude) : undefined, source: "dataset" as const }));
  return NextResponse.json({ cities, limited: cities.length === 100 });
}
