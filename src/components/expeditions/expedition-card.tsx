"use client";

import Link from "next/link";
import { ArrowRight, Award, Flag, Globe2, MapPin } from "lucide-react";
import type { ExpeditionDefinition } from "@/lib/expeditions/types";
import { ExpeditionArtwork } from "./expedition-artwork";

function km(meters: number) {
  return `${Math.round(meters / 1000).toLocaleString()} km`;
}

function expeditionTitle(name: string) {
  return name.startsWith("The ") ? name : `The ${name}`;
}

export function ExpeditionCard({ expedition, completedMeters = 0 }: { expedition: ExpeditionDefinition; completedMeters?: number }) {
  const percent = Math.min(100, Math.round(completedMeters / expedition.totalDistanceMeters * 100));
  const reached = [...expedition.checkpoints].reverse().find((checkpoint) => checkpoint.distanceMeters <= completedMeters) ?? expedition.checkpoints[0];
  const next = expedition.checkpoints.find((checkpoint) => checkpoint.distanceMeters > completedMeters);

  return (
    <article className="group lift premium-card flex h-full flex-col overflow-hidden rounded-[1.75rem]">
      <div className="relative aspect-video overflow-hidden p-5 text-white">
        <ExpeditionArtwork slug={expedition.slug} className="transition duration-700 group-hover:scale-105" />
        <div className="relative flex items-start justify-between gap-4"><span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] backdrop-blur">{expedition.region}</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] backdrop-blur">{expedition.difficulty}</span></div>
        <div className="absolute bottom-5 left-5 right-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/70">{expedition.routeTheme}</p><h3 className="display-type mt-2 text-4xl font-black leading-none">{expeditionTitle(expedition.name)}</h3></div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-bold leading-6 text-[#36534a]">{expedition.subtitle}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#718078]">{expedition.introduction}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-[#f3f6f4] p-4 text-xs">
          <div><dt className="text-[#82908a]">Distance</dt><dd className="mt-1 font-black">{km(expedition.totalDistanceMeters)}</dd></div>
          <div><dt className="text-[#82908a]">Countries</dt><dd className="mt-1 font-black">{expedition.countriesCrossed.length}</dd></div>
          <div><dt className="text-[#82908a]">Duration</dt><dd className="mt-1 font-black">{expedition.estimatedCompletionRange}</dd></div>
        </dl>
        <div className="mt-5 space-y-2 text-xs text-[#62706b]">
          <p className="flex items-center gap-2"><MapPin size={14} className="text-[#16725e]" />{completedMeters > 0 ? `You have reached ${reached.name}.` : `Begin at ${expedition.startLocation}.`}</p>
          <p className="flex items-center gap-2"><Flag size={14} className="text-[#d94d1c]" />{next ? `${next.name} lies ${km(next.distanceMeters - completedMeters)} ahead.` : `Journey complete at ${expedition.finishLocation}.`}</p>
          <p className="flex items-center gap-2"><Globe2 size={14} className="text-[#16725e]" />{expedition.countriesCrossed.join(", ")}</p>
          <p className="flex items-center gap-2"><Award size={14} className="text-[#b87520]" />{expedition.completionReward}</p>
        </div>
        <div className="mt-6 border-t border-[#e7ebe8] pt-5">
          <div className="flex items-baseline justify-between gap-4"><p className="text-sm font-black">{completedMeters > 0 ? `${percent}% of your journey complete` : "Your next adventure"}</p><p className="metric-number text-xl font-black text-[#d94d1c]">{percent}%</p></div>
          <div className="relative mt-3 h-8" aria-label={`${percent}% complete`}>
            <svg viewBox="0 0 400 34" className="h-full w-full" aria-hidden="true"><path d="M4 22 C65 2 108 31 169 15 S285 4 396 21" fill="none" stroke="#e0e8e4" strokeWidth="6" strokeLinecap="round" pathLength="100" /><path d="M4 22 C65 2 108 31 169 15 S285 4 396 21" fill="none" stroke={expedition.cover.accent} strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray={`${percent} 100`} className="progress-reveal" /></svg>
          </div>
        </div>
        <Link href={`/expeditions/${expedition.slug}`} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0d2b24] px-5 text-sm font-black text-white transition hover:bg-[#164238] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Explore {expeditionTitle(expedition.name)} <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
