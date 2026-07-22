"use client";

import Link from "next/link";
import { ArrowRight, Flag, MapPin } from "lucide-react";
import type { ExpeditionDefinition } from "@/lib/expeditions/types";

function km(meters: number) { return `${Math.round(meters / 1000).toLocaleString()} km`; }

export function ExpeditionCard({ expedition, completedMeters = 0 }: { expedition: ExpeditionDefinition; completedMeters?: number }) {
  const percent = Math.min(100, Math.round(completedMeters / expedition.totalDistanceMeters * 100));
  const routePoints = expedition.checkpoints.map((checkpoint, index) => `${8 + checkpoint.distanceMeters / expedition.totalDistanceMeters * 84},${24 + ((checkpoint.latitude ?? index) % 8) * 4}`).join(" ");
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#dfe5e1] bg-white shadow-[0_14px_45px_rgba(18,42,35,.06)]">
      <div className="relative h-40 overflow-hidden p-5 text-white" style={{ background: `linear-gradient(135deg, ${expedition.cover.from}, ${expedition.cover.to})` }}>
        <div className="absolute inset-0 surface-grid opacity-30" aria-hidden="true" />
        <svg viewBox="0 0 100 55" className="absolute inset-x-2 bottom-2 h-24 w-[calc(100%-1rem)] opacity-80" aria-hidden="true"><polyline points={routePoints} fill="none" stroke={expedition.cover.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8" cy={routePoints.split(" ")[0]?.split(",")[1]} r="2" fill="#fff" /><circle cx="92" cy={routePoints.split(" ").at(-1)?.split(",")[1]} r="2.5" fill={expedition.cover.accent} /></svg>
        <div className="relative flex items-start justify-between gap-4"><span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[10px] font-black uppercase tracking-[.14em]">{expedition.region}</span><span className="text-[10px] font-black uppercase tracking-[.14em] text-white/75">{expedition.difficulty}</span></div>
        <div className="absolute bottom-4 left-5 right-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/65">{expedition.cover.motif}</p><h3 className="mt-1 text-2xl font-black">{expedition.name}</h3></div>
      </div>
      <div className="p-5">
        <p className="min-h-12 text-sm leading-6 text-[#62706b]">{expedition.subtitle}. {expedition.introduction.split(".")[0]}.</p>
        <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-[#e7ebe8] py-4 text-xs"><div><dt className="text-[#82908a]">Distance</dt><dd className="mt-1 font-black">{km(expedition.totalDistanceMeters)}</dd></div><div><dt className="text-[#82908a]">Countries</dt><dd className="mt-1 font-black">{expedition.countriesCrossed.length}</dd></div><div><dt className="text-[#82908a]">Time</dt><dd className="mt-1 font-black">{expedition.estimatedCompletionRange}</dd></div></dl>
        <div className="mt-4 space-y-2 text-xs text-[#62706b]"><p className="flex items-center gap-2"><MapPin size={14} className="text-[#16725e]" />{expedition.checkpoints[0].name}</p><p className="flex items-center gap-2"><Flag size={14} className="text-[#d94d1c]" />{expedition.checkpoints.at(-1)?.name}</p></div>
        {completedMeters > 0 && <div className="mt-5"><div className="flex justify-between text-xs font-black"><span>{km(completedMeters)} completed</span><span className="text-[#d94d1c]">{percent}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e7ebe8]"><div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${percent}%` }} /></div></div>}
        <Link href={`/expeditions/${expedition.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0d2b24] px-5 text-sm font-black text-white transition hover:bg-[#164238] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Explore journey <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
