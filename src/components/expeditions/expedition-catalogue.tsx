"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Compass, Flag } from "lucide-react";
import { EXPEDITIONS } from "@/lib/expeditions/catalogue";
import type { ExpeditionDifficulty } from "@/lib/expeditions/types";
import { ExpeditionArtwork } from "./expedition-artwork";
import { ExpeditionCard } from "./expedition-card";
import { useExpeditionProgress } from "./use-expedition-progress";

function km(meters: number) {
  return Math.round(meters / 1000).toLocaleString();
}

function expeditionTitle(name: string) {
  return name.startsWith("The ") ? name : `The ${name}`;
}

export function ExpeditionCatalogue() {
  const { progress } = useExpeditionProgress();
  const [region, setRegion] = useState("All regions");
  const [difficulty, setDifficulty] = useState<ExpeditionDifficulty | "All levels">("All levels");
  const active = EXPEDITIONS.find((item) => item.slug === progress.activeSlug);
  const completed = EXPEDITIONS.filter((item) => item.status === "completed");
  const available = EXPEDITIONS.filter((item) => item.slug !== progress.activeSlug && item.status !== "completed");
  const filtered = available.filter((item) => (region === "All regions" || item.region === region) && (difficulty === "All levels" || item.difficulty === difficulty));
  const countryCount = new Set(EXPEDITIONS.flatMap((item) => item.countriesCrossed)).size;
  const totalDistance = EXPEDITIONS.reduce((sum, item) => sum + item.totalDistanceMeters, 0);
  const athleteCount = EXPEDITIONS.reduce((sum, item) => sum + item.community.participants, 0);
  const activeMeters = active ? progress.distanceBySlug[active.slug] ?? 0 : 0;
  const activePercent = active ? Math.min(100, Math.round(activeMeters / active.totalDistanceMeters * 100)) : 0;
  const reached = active ? [...active.checkpoints].reverse().find((checkpoint) => checkpoint.distanceMeters <= activeMeters) ?? active.checkpoints[0] : null;
  const next = active?.checkpoints.find((checkpoint) => checkpoint.distanceMeters > activeMeters);

  return (
    <div className="space-y-20 pb-10">
      <header className="wake-lines relative -mx-4 min-h-[34rem] overflow-hidden bg-[#071d18] px-5 py-16 text-white sm:-mx-6 sm:px-10 lg:-mx-8 lg:px-16">
        <ExpeditionArtwork slug="amazon" className="scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061914]/95 via-[#061914]/65 to-transparent" />
        <div className="relative z-10 flex min-h-[26rem] max-w-5xl flex-col justify-end">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[.24em] text-[#b7ddd1]"><Compass size={18} /> Rowform Expeditions</p>
          <h1 className="display-type mt-5 max-w-4xl text-5xl font-black leading-[.9] sm:text-7xl lg:text-8xl">Row Across the World&apos;s <span className="text-[#ff8055]">Greatest Rivers</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">Every workout moves you farther through real landscapes, history and cultures.</p>
          <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-sm sm:grid-cols-4">
            {[["Available expeditions", EXPEDITIONS.length.toLocaleString()], ["Countries crossed", countryCount.toLocaleString()], ["Total kilometres", km(totalDistance)], ["Athletes exploring", athleteCount.toLocaleString()]].map(([label, value]) => <div key={label} className="bg-[#08231d]/75 p-4 sm:p-5"><dt className="text-[10px] font-black uppercase tracking-[.13em] text-white/55">{label}</dt><dd className="metric-number mt-2 text-2xl font-black text-white">{value}</dd></div>)}
          </dl>
        </div>
      </header>

      <section aria-labelledby="active-expedition">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#d94d1c]">Current journey</p>
          <h2 id="active-expedition" className="display-type mt-2 text-4xl font-black sm:text-5xl">The river beneath every row.</h2>
        </div>
        {active && reached ? (
          <article className="premium-card relative min-h-[35rem] overflow-hidden rounded-[2rem] text-white">
            <ExpeditionArtwork slug={active.slug} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061914]/95 via-[#061914]/76 to-[#061914]/20" />
            <div className="relative z-10 grid min-h-[35rem] gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:p-12">
              <div className="flex flex-col justify-end">
                <p className="text-[11px] font-black uppercase tracking-[.2em] text-[#a9d6ca]">{active.region} · {active.difficulty}</p>
                <h3 className="display-type mt-3 text-5xl font-black leading-none sm:text-7xl">{expeditionTitle(active.name)}</h3>
                <p className="mt-5 max-w-xl text-lg font-bold text-white/85">You have reached {reached.name}.</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{reached.story}</p>
                <Link href={`/expeditions/${active.slug}`} className="mt-8 inline-flex min-h-13 w-fit items-center gap-2 rounded-full bg-[#ff6b35] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#f25b28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Continue Journey <ArrowRight size={17} /></Link>
              </div>
              <div className="self-end rounded-[1.75rem] border border-white/15 bg-[#071d18]/78 p-5 backdrop-blur-md sm:p-7">
                <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.15em] text-white/50">Journey complete</p><p className="metric-number mt-1 text-5xl font-black text-[#ff9a73]">{activePercent}%</p></div><p className="text-right text-sm font-bold text-white/75">{km(activeMeters)} of<br />{km(active.totalDistanceMeters)} km</p></div>
                <div className="relative mt-8 h-24" role="progressbar" aria-label={`${activePercent}% of ${active.name} completed`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={activePercent}>
                  <svg viewBox="0 0 600 90" className="h-full w-full" aria-hidden="true">
                    <path d="M8 60 C95 12 160 82 250 42 S410 14 592 52" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="8" strokeLinecap="round" pathLength="100" />
                    <path d="M8 60 C95 12 160 82 250 42 S410 14 592 52" fill="none" stroke={active.cover.accent} strokeWidth="8" strokeLinecap="round" pathLength="100" strokeDasharray={`${activePercent} 100`} className="progress-reveal" />
                    <circle cx={8 + activePercent * 5.84} cy="48" r="7" fill="#fff" />
                  </svg>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-5 text-sm">
                  <div><dt className="text-white/45">Current location</dt><dd className="mt-1 font-black">{reached.name}</dd></div>
                  <div><dt className="text-white/45">Destination</dt><dd className="mt-1 font-black">{active.finishLocation}</dd></div>
                  <div><dt className="text-white/45">Distance remaining</dt><dd className="mt-1 font-black">{km(active.totalDistanceMeters - activeMeters)} km</dd></div>
                  <div><dt className="text-white/45">Estimated completion</dt><dd className="mt-1 font-black">{active.estimatedCompletionRange}</dd></div>
                </dl>
                {next && <p className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-bold text-[#cce5dd]"><Flag size={16} className="text-[#ff9a73]" /> Next checkpoint: {next.name} · {km(next.distanceMeters - activeMeters)} km</p>}
              </div>
            </div>
          </article>
        ) : (
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0d2b24] p-10 text-white"><Compass size={30} className="text-[#ff8055]" /><h3 className="display-type mt-5 text-4xl font-black">Your first river is waiting.</h3><p className="mt-3 max-w-xl text-white/70">Choose a journey below. Every eligible indoor row will carry you toward its next landmark.</p><a href="#expedition-catalogue" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#ff6b35] px-6 text-sm font-black">Choose your river</a></div>
        )}
      </section>

      <section id="expedition-catalogue" aria-labelledby="catalogue-heading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#d94d1c]">Expedition catalogue</p><h2 id="catalogue-heading" className="display-type mt-2 text-4xl font-black sm:text-5xl">Where will you row next?</h2><p className="mt-3 text-sm text-[#62706b]">Choose a river with a story that pulls you forward.</p></div>
          <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm" aria-label="Expedition filters">
            <label className="sr-only" htmlFor="expedition-region">Region</label><select id="expedition-region" value={region} onChange={(event) => setRegion(event.target.value)} className="min-h-11 rounded-xl border-0 bg-[#eef3f0] px-3 text-xs font-black"><option>All regions</option>{[...new Set(EXPEDITIONS.map((item) => item.region))].map((item) => <option key={item}>{item}</option>)}</select>
            <label className="sr-only" htmlFor="expedition-difficulty">Difficulty</label><select id="expedition-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value as ExpeditionDifficulty | "All levels")} className="min-h-11 rounded-xl border-0 bg-[#eef3f0] px-3 text-xs font-black"><option>All levels</option>{["Accessible", "Moderate", "Endurance", "Epic"].map((item) => <option key={item}>{item}</option>)}</select>
          </div>
        </div>
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{filtered.map((expedition) => <ExpeditionCard key={expedition.slug} expedition={expedition} completedMeters={progress.distanceBySlug[expedition.slug] ?? 0} />)}</div>
        {filtered.length === 0 && <div className="mt-8 rounded-3xl bg-white p-10 text-center"><p className="font-black">No journeys match these filters.</p><button onClick={() => { setRegion("All regions"); setDifficulty("All levels"); }} className="mt-3 text-sm font-bold text-[#16725e] underline">Clear filters</button></div>}
      </section>

      <section aria-labelledby="completed-heading">
        <p className="text-xs font-black uppercase tracking-[.18em] text-[#16725e]">Athlete Passport</p>
        <h2 id="completed-heading" className="display-type mt-2 text-4xl font-black sm:text-5xl">Completed Expeditions</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{completed.map((expedition) => <ExpeditionCard key={expedition.slug} expedition={expedition} completedMeters={progress.distanceBySlug[expedition.slug] ?? expedition.totalDistanceMeters} />)}</div>
      </section>

      <section className="rowing-lanes relative overflow-hidden rounded-[2rem] bg-[#0d2b24] px-6 py-12 text-white sm:px-10" aria-labelledby="coming-soon">
        <div className="relative z-10 max-w-2xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#9ccfc0]">Coming soon</p><h2 id="coming-soon" className="display-type mt-3 text-4xl font-black sm:text-5xl">More waterways. More stories.</h2><p className="mt-4 leading-7 text-white/65">Future passages are being charted across the Zambezi, Paraná, Ganges and St. Lawrence. Each journey will be grounded in place, history and responsible storytelling.</p></div>
        <div className="relative z-10 mt-8 flex flex-wrap gap-3">{["Zambezi", "Paraná", "Ganges", "St. Lawrence"].map((name) => <span key={name} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-black">{name}</span>)}</div>
      </section>
    </div>
  );
}
