import { COUNTRIES } from "@/lib/location-data/countries";

export type RankingRegion = "Africa" | "Asia" | "Europe" | "North America" | "South America" | "Oceania";

const REGION_CODES: Record<RankingRegion, string[]> = {
  Africa: "DZ AO BJ BW BF BI CV CM CF TD KM CD CG CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RE RW SH ST SN SC SL SO ZA SS SD TZ TG TN UG EH ZM ZW YT TF BV".split(" "),
  Asia: "AF AM AZ BH BD BT BN KH CN CY GE HK IN ID IR IQ IL JP JO KZ KW KG LA LB MO MY MV MN MM NP KP OM PK PS PH QA SA SG KR LK SY TW TJ TH TL TR TM AE UZ VN YE IO".split(" "),
  Europe: "AX AL AD AT BY BE BA BG HR CZ DK EE FO FI FR DE GI GR GG VA HU IS IE IM IT JE LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SJ SE CH UA GB".split(" "),
  "North America": "AI AG AW BS BB BZ BM BQ VG CA KY CR CU CW DM DO SV GL GD GP GT HT HN JM MQ MX MS NI PA PR BL KN LC MF PM VC SX TT TC US VI".split(" "),
  "South America": "AR BO BR CL CO EC FK GF GY PY PE SR UY VE GS".split(" "),
  Oceania: "AS AU CX CC CK FJ PF GU HM KI MH FM NR NC NZ NU NF MP PW PG PN WS SB TK TO TV UM VU WF AQ".split(" "),
};

export const COUNTRY_RANKING_REGION: Record<string, RankingRegion> = Object.fromEntries(Object.entries(REGION_CODES).flatMap(([region, codes]) => codes.map((code) => [code, region as RankingRegion])));

const unmapped = COUNTRIES.filter((country) => !COUNTRY_RANKING_REGION[country.code]);
const duplicates = Object.values(REGION_CODES).flat().filter((code, index, all) => all.indexOf(code) !== index);
if (unmapped.length || duplicates.length) throw new Error(`Invalid ranking-region map. Unmapped: ${unmapped.map((country) => country.code).join(", ")}; duplicates: ${duplicates.join(", ")}`);

// Explicit exceptional choices: Russia ranks in Europe; Türkiye, Kazakhstan,
// Armenia, Azerbaijan, Georgia, and Cyprus rank in Asia. Antarctic and remote
// territories are assigned to a stable operational region instead of guessed
// dynamically. These assignments are reviewable product data.
