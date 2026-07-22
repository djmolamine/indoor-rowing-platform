import { NextResponse } from "next/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { seedClubsForLocation } from "@/lib/location-data/seed-clubs";

export async function GET(request: Request) {
  const url = new URL(request.url); const countryCode = (url.searchParams.get("country") ?? "").toUpperCase(); const city = (url.searchParams.get("city") ?? "").trim();
  if (!/^[A-Z]{2}$/.test(countryCode)) return NextResponse.json({ clubs:[] });
  if (!hasSupabaseConfig()) return NextResponse.json({ clubs:seedClubsForLocation(countryCode,city).map((club)=>({ id:club.id, officialName:club.officialName, countryCode:club.countryCode, city:club.city, clubType:club.clubType, website:club.website, federationAffiliation:club.federationAffiliation, verificationStatus:club.verificationStatus, activeStatus:club.activeStatus, sourceLabel:club.source.label })) });
  const supabase = await createClient(); let query = supabase.from("clubs").select("id,official_name,country_code,city_name,club_type,website,federation_affiliation,verification_status,active,source_label").eq("country_code",countryCode).eq("active",true); if(city) query=query.ilike("city_name",city); const { data,error }=await query.limit(100); if(error) return NextResponse.json({clubs:[],error:error.message},{status:500});
  return NextResponse.json({ clubs:(data??[]).map((club)=>({id:club.id,officialName:club.official_name,countryCode:club.country_code,city:club.city_name,clubType:club.club_type,website:club.website,federationAffiliation:club.federation_affiliation,verificationStatus:club.verification_status,activeStatus:club.active?"Active":"Inactive",sourceLabel:club.source_label})) });
}
