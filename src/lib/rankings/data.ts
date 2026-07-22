import type { CompetitionDivisionId, MachineClassId, OfficialStatusId, VerificationId, WeightCategoryId } from "@/lib/competition-taxonomy";
import { RANKING_FORMATS } from "@/lib/competition-taxonomy";
import { COUNTRY_RANKING_REGION, type RankingRegion } from "./regions";

export type GeographicScope = "World" | "Continent" | "Country" | "Club";
export interface RankingRecord {
  id:string; athleteName:string; initials:string; countryCode:string; country:string; clubId?:string; club?:string;
  season:string; formatId:string; ageCategoryId:string; competitionDivisionId:CompetitionDivisionId; weightCategoryId:WeightCategoryId;
  adaptiveClassificationId?:string; machineClassId:Exclude<MachineClassId,"all-comparable">; verificationId:Exclude<VerificationId,"all-accepted">;
  officialStatusId:OfficialStatusId; resultValue:number; current?:boolean;
}
export interface RankingFilters {
  scope:GeographicScope; region:RankingRegion; countryCode:string; clubId:string; season:string; formatId:string;
  ageCategoryId:string; competitionDivisionId:CompetitionDivisionId; weightCategoryId:WeightCategoryId; adaptiveClassificationId:string;
  machineClassId:MachineClassId; verificationId:VerificationId;
}

const base = { season:"2026", ageCategoryId:"senior-23-39", weightCategoryId:"open-weight" as const, officialStatusId:"rowform-standard" as const };
export const RANKING_RECORDS: RankingRecord[] = [
  { ...base,id:"r1",athleteName:"Jonas Richter",initials:"JR",countryCode:"DE",country:"Germany",clubId:"00000000-0000-4000-8000-000000000108",club:"Berliner Ruder-Club",formatId:"distance-2000",competitionDivisionId:"men",machineClassId:"air-resistance",verificationId:"provider-imported",resultValue:391800 },
  { ...base,id:"r2",athleteName:"Samuel Okafor",initials:"SO",countryCode:"NG",country:"Nigeria",formatId:"distance-2000",competitionDivisionId:"men",machineClassId:"static-flywheel",verificationId:"photo-confirmed",resultValue:402100 },
  { ...base,id:"r3",athleteName:"Mohamed Djebbari",initials:"MD",countryCode:"DZ",country:"Algeria",formatId:"distance-2000",competitionDivisionId:"men",machineClassId:"static-flywheel",verificationId:"device-attested",resultValue:432400,current:true },
  { ...base,id:"r4",athleteName:"Noah Williams",initials:"NW",countryCode:"US",country:"United States",clubId:"00000000-0000-4000-8000-000000000104",club:"Community Rowing, Inc.",formatId:"distance-2000",competitionDivisionId:"men",machineClassId:"dynamic",verificationId:"organizer-verified",resultValue:399500 },
  { ...base,id:"r5",athleteName:"Maya Chen",initials:"MC",countryCode:"CA",country:"Canada",formatId:"distance-2000",competitionDivisionId:"women",machineClassId:"air-resistance",verificationId:"provider-imported",resultValue:438900 },
  { ...base,id:"r6",athleteName:"Amina Diallo",initials:"AD",countryCode:"SN",country:"Senegal",formatId:"distance-5000",competitionDivisionId:"women",machineClassId:"static-flywheel",verificationId:"photo-confirmed",resultValue:1268000 },
  { ...base,id:"r7",athleteName:"Elena Rossi",initials:"ER",countryCode:"IT",country:"Italy",formatId:"distance-6000",competitionDivisionId:"women",machineClassId:"air-resistance",verificationId:"provider-imported",resultValue:1512000 },
  { ...base,id:"r8",athleteName:"Lucas Pereira",initials:"LP",countryCode:"BR",country:"Brazil",formatId:"distance-10000",competitionDivisionId:"men",machineClassId:"water-resistance",verificationId:"manual",resultValue:2515000 },
  { ...base,id:"r9",athleteName:"Hiro Tanaka",initials:"HT",countryCode:"JP",country:"Japan",formatId:"distance-20000",competitionDivisionId:"men",machineClassId:"dynamic",verificationId:"device-attested",resultValue:4998000 },
  { ...base,id:"r10",athleteName:"Priya Shah",initials:"PS",countryCode:"IN",country:"India",formatId:"distance-21097",competitionDivisionId:"women",machineClassId:"static-flywheel",verificationId:"provider-imported",resultValue:5485000 },
  { ...base,id:"r11",athleteName:"Grace Walker",initials:"GW",countryCode:"AU",country:"Australia",formatId:"distance-42195",competitionDivisionId:"women",machineClassId:"air-resistance",verificationId:"organizer-verified",resultValue:11223000 },
  { ...base,id:"r12",athleteName:"Lina Berg",initials:"LB",countryCode:"SE",country:"Sweden",formatId:"time-60",competitionDivisionId:"women",machineClassId:"static-flywheel",verificationId:"federation-certified",officialStatusId:"world-rowing-official",resultValue:318 },
  { ...base,id:"r13",athleteName:"Omar Haddad",initials:"OH",countryCode:"DZ",country:"Algeria",formatId:"time-60",competitionDivisionId:"lightweight-men",weightCategoryId:"lightweight",machineClassId:"static-flywheel",verificationId:"organizer-verified",officialStatusId:"world-rowing-official",resultValue:350 },
  { ...base,id:"r14",athleteName:"Sofia Martin",initials:"SM",countryCode:"FR",country:"France",formatId:"distance-1000",competitionDivisionId:"lightweight-women",weightCategoryId:"lightweight",machineClassId:"static-flywheel",verificationId:"organizer-verified",officialStatusId:"world-rowing-official",resultValue:224000 },
  { ...base,id:"r15",athleteName:"David Mensah",initials:"DM",countryCode:"GH",country:"Ghana",formatId:"distance-500",competitionDivisionId:"men",ageCategoryId:"u23",machineClassId:"air-resistance",verificationId:"photo-confirmed",resultValue:90100 },
  { ...base,id:"r16",athleteName:"Ana Silva",initials:"AS",countryCode:"PT",country:"Portugal",formatId:"distance-5000",competitionDivisionId:"women",ageCategoryId:"masters-45-49",machineClassId:"static-flywheel",verificationId:"device-attested",resultValue:1301000 },
  { ...base,id:"r17",athleteName:"Demo Adaptive Athlete",initials:"DA",countryCode:"GB",country:"United Kingdom",formatId:"distance-1000",competitionDivisionId:"adaptive-para",adaptiveClassificationId:"iar2",machineClassId:"event-approved",verificationId:"organizer-verified",officialStatusId:"organizer-official",resultValue:280000 },
  { ...base,id:"r18",athleteName:"Demo Adaptive Rower",initials:"DR",countryCode:"NZ",country:"New Zealand",formatId:"time-60",competitionDivisionId:"adaptive-para",adaptiveClassificationId:"iar5",machineClassId:"event-approved",verificationId:"organizer-verified",officialStatusId:"organizer-official",resultValue:235 },
];

const comparableClasses: RankingRecord["machineClassId"][] = ["static-flywheel","dynamic","air-resistance"];
export function filterRankings(records:RankingRecord[], filters:RankingFilters) {
  const format = RANKING_FORMATS.find((item)=>item.id===filters.formatId);
  return records.filter((record)=> record.season===filters.season && record.formatId===filters.formatId && record.ageCategoryId===filters.ageCategoryId && record.competitionDivisionId===filters.competitionDivisionId && record.weightCategoryId===filters.weightCategoryId && (filters.competitionDivisionId!=="adaptive-para" || record.adaptiveClassificationId===filters.adaptiveClassificationId) && (filters.machineClassId==="all-comparable" ? comparableClasses.includes(record.machineClassId) : record.machineClassId===filters.machineClassId) && (filters.verificationId==="all-accepted" || record.verificationId===filters.verificationId) && (filters.scope==="World" || (filters.scope==="Continent" && COUNTRY_RANKING_REGION[record.countryCode]===filters.region) || (filters.scope==="Country" && record.countryCode===filters.countryCode) || (filters.scope==="Club" && record.clubId===filters.clubId))).sort((a,b)=>format?.kind==="fixed-time" ? b.resultValue-a.resultValue : a.resultValue-b.resultValue);
}

export function formatRankingResult(record:RankingRecord) {
  const format=RANKING_FORMATS.find((item)=>item.id===record.formatId);
  if(format?.kind==="fixed-time") return `${record.resultValue.toLocaleString()} m`;
  const totalTenths=Math.round(record.resultValue/100); const minutes=Math.floor(totalTenths/600); const seconds=((totalTenths%600)/10).toFixed(1).padStart(4,"0");
  return `${minutes}:${seconds}`;
}
