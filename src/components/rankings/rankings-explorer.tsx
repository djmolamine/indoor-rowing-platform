"use client";

import { useEffect, useMemo, useState } from "react";
import { Crown, Filter, MapPin, RotateCcw, ShieldCheck } from "lucide-react";
import { COUNTRIES } from "@/lib/location-data/countries";
import {
  ADAPTIVE_CLASSIFICATIONS, AGE_CATEGORIES, COMPETITION_DIVISIONS, compatibleWeightCategories,
  labelFor, MACHINE_CLASSES, OFFICIAL_STATUSES, RANKING_FORMATS, VERIFICATION_OPTIONS,
  type CompetitionDivisionId, type MachineClassId, type VerificationId,
} from "@/lib/competition-taxonomy";
import { filterRankings, formatRankingResult, RANKING_RECORDS, type GeographicScope, type RankingFilters } from "@/lib/rankings/data";
import type { RankingRegion } from "@/lib/rankings/regions";
import { comparabilityLabel,getMachineModel,getMachineProvider,MACHINE_MODELS,MACHINE_PROVIDERS,modelsForProvider,type MachineProviderId } from "@/lib/machine-data";

const scopes:GeographicScope[]=["World","Continent","Country","Club"];
const regions:RankingRegion[]=["Africa","Asia","Europe","North America","South America","Oceania"];
const clubs=[...new Map(RANKING_RECORDS.filter((row)=>row.clubId).map((row)=>[row.clubId!,row.club!])).entries()];
const selectClass="mt-1.5 min-h-11 w-full rounded-xl border border-[#ccd6d1] bg-white px-3 text-sm font-bold outline-none focus:border-[#16725e] focus:ring-2 focus:ring-[#16725e]/20";
const defaults:RankingFilters={scope:"World",region:"Africa",countryCode:"DZ",clubId:clubs[0]?.[0]??"",season:"2026",formatId:"distance-2000",ageCategoryId:"senior-23-39",competitionDivisionId:"men",weightCategoryId:"open-weight",adaptiveClassificationId:"iar1",providerId:"all",modelId:"all",machineClassId:"all-comparable",verificationId:"all-accepted"};
const queryKeys:Record<keyof RankingFilters,string>={scope:"scope",region:"continent",countryCode:"country",clubId:"club",season:"season",formatId:"format",ageCategoryId:"age",competitionDivisionId:"division",weightCategoryId:"weight",adaptiveClassificationId:"adaptive",providerId:"brand",modelId:"model",machineClassId:"machine",verificationId:"verification"};

function filtersFromQuery(query:Record<string,string|string[]|undefined>){
  const restored={...defaults};
  const allowed:Record<keyof RankingFilters,string[]>={scope:scopes,region:regions,countryCode:COUNTRIES.map((item)=>item.code),clubId:clubs.map(([id])=>id),season:["2025","2026"],formatId:RANKING_FORMATS.map((item)=>item.id),ageCategoryId:AGE_CATEGORIES.map((item)=>item.id),competitionDivisionId:COMPETITION_DIVISIONS.map((item)=>item.id),weightCategoryId:["open-weight","lightweight"],adaptiveClassificationId:["",...ADAPTIVE_CLASSIFICATIONS.map((item)=>item.id)],providerId:["all",...MACHINE_PROVIDERS.map((item)=>item.id)],modelId:["all",...MACHINE_MODELS.map((item)=>item.id)],machineClassId:MACHINE_CLASSES.map((item)=>item.id),verificationId:VERIFICATION_OPTIONS.map((item)=>item.id)};
  (Object.keys(queryKeys) as (keyof RankingFilters)[]).forEach((key)=>{const value=query[queryKeys[key]]; if(typeof value==="string"&&allowed[key].includes(value))Object.assign(restored,{[key]:value});});
  const validWeight=compatibleWeightCategories(restored.competitionDivisionId).some((item)=>item.id===restored.weightCategoryId); if(!validWeight)restored.weightCategoryId=compatibleWeightCategories(restored.competitionDivisionId)[0].id;
  if(restored.competitionDivisionId!=="adaptive-para")restored.adaptiveClassificationId="";
  const restoredModel=getMachineModel(restored.modelId);if(restoredModel)restored.providerId=restoredModel.providerId;
  return restored;
}

function SelectField({label,value,onChange,children}:{label:string;value:string;onChange:(value:string)=>void;children:React.ReactNode}) {
  return <label className="text-xs font-bold text-[#475b54]">{label}<select className={selectClass} value={value} onChange={(event)=>onChange(event.target.value)}>{children}</select></label>;
}

export function RankingsExplorer({initialQuery}:{initialQuery:Record<string,string|string[]|undefined>}) {
  const [filters,setFilters]=useState(()=>filtersFromQuery(initialQuery));
  const [filtersOpen,setFiltersOpen]=useState(false);
  const formatKind=RANKING_FORMATS.find((item)=>item.id===filters.formatId)?.kind??"fixed-distance";
  useEffect(()=>{const query=new URLSearchParams(); (Object.keys(queryKeys) as (keyof RankingFilters)[]).forEach((key)=>query.set(queryKeys[key],String(filters[key]))); window.history.replaceState(null,"",`${window.location.pathname}?${query}`);},[filters]);
  const compatibleFormats=RANKING_FORMATS.filter((item)=>item.kind===formatKind);
  const weights=compatibleWeightCategories(filters.competitionDivisionId);
  const adaptiveOptions=ADAPTIVE_CLASSIFICATIONS.filter((item)=>item.eventId==="wr-virtual-2026-demo" && item.applicableFormatIds.includes(filters.formatId));
  const machineModels=filters.providerId==="all"?MACHINE_MODELS:modelsForProvider(filters.providerId);
  const rows=useMemo(()=>filterRankings(RANKING_RECORDS,filters),[filters]);
  const currentAthlete=RANKING_RECORDS.find((row)=>row.current); const currentRank=rows.findIndex((row)=>row.current)+1;
  const selectedFormat=RANKING_FORMATS.find((item)=>item.id===filters.formatId)!;
  const officialStatus=OFFICIAL_STATUSES.find((item)=>item.id===selectedFormat.officialStatus)!;
  function update<K extends keyof RankingFilters>(key:K,value:RankingFilters[K]) { setFilters((current)=>({...current,[key]:value})); }
  function changeDivision(value:CompetitionDivisionId){const weight=compatibleWeightCategories(value)[0].id; setFilters((current)=>({...current,competitionDivisionId:value,weightCategoryId:weight,adaptiveClassificationId:value==="adaptive-para"?(ADAPTIVE_CLASSIFICATIONS.find((item)=>item.applicableFormatIds.includes(current.formatId))?.id??""):""}));}
  function changeKind(value:typeof formatKind){const first=RANKING_FORMATS.find((item)=>item.kind===value)!; setFilters((current)=>({...current,formatId:first.id,adaptiveClassificationId:current.competitionDivisionId==="adaptive-para"?(ADAPTIVE_CLASSIFICATIONS.find((item)=>item.applicableFormatIds.includes(first.id))?.id??""):""}));}
  function changeFormat(value:string){setFilters((current)=>({...current,formatId:value,adaptiveClassificationId:current.competitionDivisionId==="adaptive-para"?(ADAPTIVE_CLASSIFICATIONS.find((item)=>item.applicableFormatIds.includes(value))?.id??""):""}));}
  function changeProvider(value:MachineProviderId|"all"){setFilters((current)=>({...current,providerId:value,modelId:"all"}));}
  function changeModel(value:string){const model=getMachineModel(value);setFilters((current)=>({...current,modelId:value,providerId:model?.providerId??current.providerId}));}
  const controls=<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {filters.scope==="Continent"&&<SelectField label="Continent" value={filters.region} onChange={(value)=>update("region",value as RankingRegion)}>{regions.map((item)=><option key={item}>{item}</option>)}</SelectField>}
    {filters.scope==="Country"&&<SelectField label="Country" value={filters.countryCode} onChange={(value)=>update("countryCode",value)}>{COUNTRIES.map((item)=><option key={item.code} value={item.code}>{item.name}</option>)}</SelectField>}
    {filters.scope==="Club"&&<SelectField label="Club" value={filters.clubId} onChange={(value)=>update("clubId",value)}>{clubs.map(([id,name])=><option key={id} value={id}>{name}</option>)}</SelectField>}
    <SelectField label="Season" value={filters.season} onChange={(value)=>update("season",value)}><option>2026</option><option>2025</option></SelectField>
    <SelectField label="Event format" value={formatKind} onChange={(value)=>changeKind(value as typeof formatKind)}><option value="fixed-distance">Fixed distance</option><option value="fixed-time">Fixed time</option><option value="relay-distance">Relay</option></SelectField>
    <SelectField label={formatKind==="fixed-time"?"Duration":formatKind==="relay-distance"?"Relay distance":"Distance"} value={filters.formatId} onChange={changeFormat}>{compatibleFormats.map((item)=><option key={item.id} value={item.id}>{item.label}</option>)}</SelectField>
    <SelectField label="Competition division" value={filters.competitionDivisionId} onChange={(value)=>changeDivision(value as CompetitionDivisionId)}>{COMPETITION_DIVISIONS.map((item)=><option key={item.id} value={item.id}>{item.label}</option>)}</SelectField>
    <SelectField label="Weight category" value={filters.weightCategoryId} onChange={(value)=>update("weightCategoryId",value as RankingFilters["weightCategoryId"])}>{weights.map((item)=><option key={item.id} value={item.id}>{item.label}</option>)}</SelectField>
    <SelectField label="Age category" value={filters.ageCategoryId} onChange={(value)=>update("ageCategoryId",value)}>{AGE_CATEGORIES.map((item)=><option key={item.id} value={item.id}>{item.label}{item.optional?" · event-specific":""}</option>)}</SelectField>
    {filters.competitionDivisionId==="adaptive-para"&&<SelectField label="Adaptive classification" value={filters.adaptiveClassificationId} onChange={(value)=>update("adaptiveClassificationId",value)}>{adaptiveOptions.length?adaptiveOptions.map((item)=><option key={item.id} value={item.id}>{item.label}</option>):<option value="">Not offered for this format</option>}</SelectField>}
    <SelectField label="Machine brand" value={filters.providerId} onChange={(value)=>changeProvider(value as MachineProviderId|"all")}><option value="all">All brands</option>{MACHINE_PROVIDERS.filter((item)=>item.active).map((item)=><option key={item.id} value={item.id}>{item.displayName}</option>)}</SelectField>
    <SelectField label="Machine model" value={filters.modelId} onChange={changeModel}><option value="all">All models</option>{machineModels.map((item)=><option key={item.id} value={item.id}>{filters.providerId==="all"?`${getMachineProvider(item.providerId)?.displayName} ${item.model}`:item.model}</option>)}</SelectField>
    <SelectField label="Machine class" value={filters.machineClassId} onChange={(value)=>update("machineClassId",value as MachineClassId)}>{MACHINE_CLASSES.map((item)=><option key={item.id} value={item.id}>{item.label}</option>)}</SelectField>
    <SelectField label="Verification tier" value={filters.verificationId} onChange={(value)=>update("verificationId",value as VerificationId)}>{VERIFICATION_OPTIONS.map((item)=><option key={item.id} value={item.id}>{item.label}</option>)}</SelectField>
  </div>;
  return <div><header><p className="text-xs font-black uppercase tracking-[.16em] text-[#d94d1c]">Comparable performance</p><h1 className="display-type mt-3 text-4xl font-black sm:text-5xl">Rankings</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-[#62706b]">Every table states its geography, competition division, machine class, verification provenance, and governing definition. Provider-neutral history does not imply cross-machine equivalence.</p></header>
    <section className="mt-6 rounded-3xl border border-[#dfe5e1] bg-white p-4 sm:p-6" aria-labelledby="ranking-filters"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Filter size={18} className="text-[#16725e]" aria-hidden="true"/><h2 id="ranking-filters" className="font-black">Ranking definition</h2></div><button onClick={()=>setFilters(defaults)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black text-[#16725e]"><RotateCcw size={15}/> Reset filters</button></div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Geographic scope">{scopes.map((scope)=><button key={scope} onClick={()=>update("scope",scope)} aria-pressed={filters.scope===scope} className={`min-h-11 rounded-full px-4 text-sm font-black ${filters.scope===scope?"bg-[#0d2b24] text-white":"border border-[#d6dfda] bg-white"}`}>{scope}</button>)}</div>
      <button type="button" aria-expanded={filtersOpen} aria-controls="ranking-filter-controls" onClick={()=>setFiltersOpen((open)=>!open)} className="mt-5 min-h-11 w-full rounded-xl border border-[#ccd6d1] px-4 text-left text-sm font-black md:hidden">{filtersOpen?"Close filters":"Open filters"}</button><div id="ranking-filter-controls" className={`${filtersOpen?"block":"hidden"} mt-5 md:block`}>{controls}</div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold"><span className={`rounded-full px-3 py-2 ${selectedFormat.officialStatus==="rowform-standard"?"bg-[#fff0ea] text-[#a94420]":"bg-[#eaf6f1] text-[#176a55]"}`}>{officialStatus.label}</span><span className="rounded-full bg-[#eef3f0] px-3 py-2">{selectedFormat.kind==="fixed-time"?"Ranked by greatest distance":"Ranked by shortest elapsed time"}</span>{filters.weightCategoryId==="lightweight"&&<span className="rounded-full bg-[#eef3f0] px-3 py-2">Eligibility requires event weigh-in evidence</span>}</div>
    </section>
    {currentAthlete&&<aside className="sticky top-20 z-20 mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#f2cbb8] bg-[#fff8f4] p-4 shadow-sm"><div><p className="text-xs font-black uppercase tracking-[.12em] text-[#d94d1c]">Your position</p><p className="mt-1 font-black">{currentRank?`#${currentRank} of ${rows.length}`:"Outside this definition"} · {formatRankingResult(currentAthlete)}</p></div><p className="hidden text-xs text-[#718078] sm:block">Your result remains visible while filters change</p></aside>}
    <section className="mt-5 overflow-hidden rounded-3xl border border-[#dfe5e1] bg-white" aria-label={`${filters.scope} ranking results`}>{rows.length?rows.map((row,index)=>{const provider=getMachineProvider(row.providerId);const model=getMachineModel(row.modelId);const comparison=comparabilityLabel(row.providerId,row.modelId,row.machineClassId,filters);return <article key={row.id} className={`grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-[#e7ebe8] p-4 last:border-0 sm:px-6 ${row.current?"bg-[#fff8f4]":""}`}><div className="text-center font-black text-[#718078]">{index===0?<Crown className="mx-auto text-[#d79a20]" size={20} aria-label="First place"/>:index+1}</div><div className="flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dceae5] text-xs font-black">{row.initials}</span><div className="min-w-0"><h2 className="truncate font-black">{row.athleteName}{row.current&&<span className="ml-2 text-xs text-[#d94d1c]">You</span>}</h2><p className="mt-1 flex items-center gap-1 truncate text-xs text-[#718078]"><MapPin size={12} aria-hidden="true"/>{row.country}{row.club?` · ${row.club}`:" · Independent"}</p><p className="mt-1 text-[10px] font-bold text-[#475b54]">{provider?.displayName??"Unknown"} {model?.model??"Unknown model"} · {labelFor(MACHINE_CLASSES,row.machineClassId)}</p><p className="mt-1 text-[10px] font-bold text-[#718078]">{comparison} · {labelFor(OFFICIAL_STATUSES,row.officialStatusId)}</p></div></div><div className="text-right"><p className="font-black tabular-nums">{formatRankingResult(row)}</p><p className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-[#16725e]"><ShieldCheck size={11}/>{labelFor(VERIFICATION_OPTIONS,row.verificationId)}</p></div></article>}):<div className="p-10 text-center"><p className="font-black">No comparable results match this definition.</p><p className="mt-2 text-sm text-[#718078]">Try another division, format, geography, brand, model, machine class, or verification tier.</p></div>}</section>
    <p className="mt-4 text-xs leading-5 text-[#718078]">Prototype results demonstrate filtering only and are not records. Official status belongs to a specific event definition and never implies a general World Rowing endorsement of Rowform.</p></div>;
}
