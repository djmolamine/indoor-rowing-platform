"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import { EXPEDITIONS } from "@/lib/expeditions/catalogue";
import type { ExpeditionDifficulty } from "@/lib/expeditions/types";
import { ExpeditionCard } from "./expedition-card";
import { useExpeditionProgress } from "./use-expedition-progress";

export function ExpeditionCatalogue() {
  const { progress } = useExpeditionProgress();
  const [region, setRegion] = useState("All regions");
  const [difficulty, setDifficulty] = useState<ExpeditionDifficulty | "All levels">("All levels");
  const filtered = EXPEDITIONS.filter((expedition) => (region === "All regions" || expedition.region === region) && (difficulty === "All levels" || expedition.difficulty === difficulty));
  const sections = [
    { title: "Active Expedition", description: "New eligible workouts advance this journey.", items: filtered.filter((item) => item.slug === progress.activeSlug) },
    { title: "Recommended next journeys", description: "Distinct routes selected for your next chapter.", items: filtered.filter((item) => item.status === "recommended" && item.slug !== progress.activeSlug) },
    { title: "Available Expeditions", description: "Curated journeys ready when you are.", items: filtered.filter((item) => item.status === "available") },
    { title: "Completed Expeditions", description: "Routes preserved in your Athlete Passport.", items: filtered.filter((item) => item.status === "completed") },
  ];

  return (
    <div>
      <header className="wake-lines rowing-lanes relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_80%_20%,rgba(22,124,147,.35),transparent_30%),linear-gradient(125deg,#061b16,#0d2b24)] px-5 py-11 text-white shadow-[0_30px_90px_rgba(13,43,36,.2)] sm:px-10 sm:py-16"><div className="relative z-10 max-w-4xl"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-[#9ccfc0]"><Compass size={17} /> Row the world</p><h1 className="display-type mt-5 text-5xl font-black leading-[.88] sm:text-7xl">Row across the world’s<br /><span className="text-[#ff8055]">greatest rivers.</span></h1><p className="mt-6 max-w-2xl text-sm leading-7 text-[#c4d7d1] sm:text-base">Every indoor meter becomes distance through a real place—its history, wildlife, cities, and rowing culture.</p></div></header>
      <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-[#dfe5e1] bg-white p-4" aria-label="Expedition filters"><label className="text-xs font-black text-[#475b54]">Region<select value={region} onChange={(event) => setRegion(event.target.value)} className="ml-2 min-h-11 rounded-xl border border-[#ccd6d1] bg-white px-3"><option>All regions</option>{[...new Set(EXPEDITIONS.map((item) => item.region))].map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-xs font-black text-[#475b54]">Difficulty<select value={difficulty} onChange={(event) => setDifficulty(event.target.value as ExpeditionDifficulty | "All levels")} className="ml-2 min-h-11 rounded-xl border border-[#ccd6d1] bg-white px-3"><option>All levels</option>{["Accessible", "Moderate", "Endurance", "Epic"].map((item) => <option key={item}>{item}</option>)}</select></label></div>
      {sections.map((section) => section.items.length > 0 && <section key={section.title} className="mt-10" aria-labelledby={section.title.replaceAll(" ", "-")}><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#d94d1c]">Curated catalogue</p><h2 id={section.title.replaceAll(" ", "-")} className="mt-2 text-2xl font-black sm:text-3xl">{section.title}</h2><p className="mt-2 text-sm text-[#62706b]">{section.description}</p></div><div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{section.items.map((expedition) => <ExpeditionCard key={expedition.slug} expedition={expedition} completedMeters={progress.distanceBySlug[expedition.slug] ?? 0} />)}</div></section>)}
      {filtered.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-[#bccac4] p-10 text-center"><p className="font-black">No journeys match these filters.</p><button onClick={() => { setRegion("All regions"); setDifficulty("All levels"); }} className="mt-3 text-sm font-bold text-[#16725e] underline">Clear filters</button></div>}
    </div>
  );
}
