"use client";

import { useMemo, useState } from "react";
import { Flag, LockKeyhole, MapPin } from "lucide-react";
import type { ExpeditionDefinition } from "@/lib/expeditions/types";

const WIDTH = 820;
const HEIGHT = 330;
const X_START = 48;
const X_RANGE = 724;

function formatDistance(meters: number) {
  return meters >= 1000 ? `${Math.round(meters / 1000).toLocaleString()} km` : `${meters.toLocaleString()} m`;
}

function checkpointPoints(expedition: ExpeditionDefinition) {
  const latitudes = expedition.checkpoints.map((checkpoint) => checkpoint.latitude ?? 0);
  const minimum = Math.min(...latitudes);
  const spread = Math.max(Math.max(...latitudes) - minimum, 1);
  return expedition.checkpoints.map((checkpoint, index) => ({
    checkpoint,
    x: X_START + (checkpoint.distanceMeters / expedition.totalDistanceMeters) * X_RANGE,
    y: 95 + ((checkpoint.latitude ?? minimum) - minimum) / spread * 120 + (index % 2 ? 12 : -12),
  }));
}

export function ExpeditionRouteMap({ expedition, completedMeters }: { expedition: ExpeditionDefinition; completedMeters: number }) {
  const progress = Math.min(100, Math.max(0, completedMeters / expedition.totalDistanceMeters * 100));
  const points = useMemo(() => checkpointPoints(expedition), [expedition]);
  const [selectedId, setSelectedId] = useState(() => {
    const reached = [...expedition.checkpoints].reverse().find((checkpoint) => checkpoint.distanceMeters <= completedMeters);
    return reached?.id ?? expedition.checkpoints[0].id;
  });
  const selected = expedition.checkpoints.find((checkpoint) => checkpoint.id === selectedId) ?? expedition.checkpoints[0];
  const route = points.map((point) => `${point.x},${point.y}`).join(" ");
  const nextIndex = points.findIndex((point) => point.checkpoint.distanceMeters > completedMeters);
  const left = points[Math.max(0, nextIndex - 1)] ?? points[0];
  const right = points[nextIndex] ?? points.at(-1)!;
  const segmentRange = Math.max(right.checkpoint.distanceMeters - left.checkpoint.distanceMeters, 1);
  const segmentProgress = Math.min(1, Math.max(0, (completedMeters - left.checkpoint.distanceMeters) / segmentRange));
  const athlete = { x: left.x + (right.x - left.x) * segmentProgress, y: left.y + (right.y - left.y) * segmentProgress };

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-[#071c19] text-white shadow-[0_24px_70px_rgba(5,25,21,.18)]" aria-labelledby="route-map-title">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
        <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#86aa9f]">Route briefing</p><h2 id="route-map-title" className="mt-2 text-2xl font-black">{expedition.name} passage</h2></div>
        <div className="text-right"><p className="text-3xl font-black tabular-nums text-[#ff8055]">{progress.toFixed(1)}%</p><p className="text-xs text-[#9fb9b1]">{formatDistance(completedMeters)} of {formatDistance(expedition.totalDistanceMeters)}</p></div>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.65fr)_minmax(17rem,.75fr)]">
        <div className="overflow-x-auto border-b border-white/10 lg:border-b-0 lg:border-r" aria-label={`Stylized route representation for ${expedition.name}`}>
          <div className="relative min-w-[760px]">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-[310px] w-full" role="img" aria-labelledby="route-svg-title route-svg-desc">
              <title id="route-svg-title">{expedition.name} checkpoint route</title>
              <desc id="route-svg-desc">A stylized, non-navigation-grade route showing {expedition.checkpoints.length} checkpoints and the athlete at {progress.toFixed(1)} percent.</desc>
              <defs><pattern id={`grid-${expedition.slug}`} width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="rgba(255,255,255,.055)" strokeWidth="1" /></pattern></defs>
              <rect width={WIDTH} height={HEIGHT} fill={`url(#grid-${expedition.slug})`} />
              <path d="M35 265 C180 230 245 294 390 258 S650 216 790 260" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="3 8" />
              <polyline points={route} fill="none" stroke="rgba(182,211,201,.25)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
              <polyline points={route} fill="none" stroke={expedition.cover.accent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray={`${progress} 100`} />
              {points.map(({ checkpoint, x, y }) => {
                const reached = checkpoint.distanceMeters <= completedMeters;
                return <g key={checkpoint.id}><circle cx={x} cy={y} r={checkpoint.type === "start" || checkpoint.type === "finish" ? 9 : 7} fill={reached ? expedition.cover.accent : "#173a33"} stroke={reached ? "#fff" : "#6a817a"} strokeWidth="2" /><text x={x} y={y + (y > 165 ? -18 : 27)} textAnchor="middle" fill={reached ? "#fff" : "#91aaa2"} fontSize="10" fontWeight="700">{checkpoint.name}</text><text x={x} y={y + (y > 165 ? -6 : 40)} textAnchor="middle" fill="#718d84" fontSize="9">{formatDistance(checkpoint.distanceMeters)}</text></g>;
              })}
              <circle cx={athlete.x} cy={athlete.y} r="15" fill="none" stroke="#ff6b35" strokeWidth="2" className="motion-safe:animate-pulse" /><circle cx={athlete.x} cy={athlete.y} r="5" fill="#ff6b35" stroke="#fff" strokeWidth="2" />
            </svg>
            {points.map(({ checkpoint, x, y }) => <button key={checkpoint.id} type="button" onClick={() => setSelectedId(checkpoint.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedId(checkpoint.id); } }} className="absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8055]" style={{ left: `${x / WIDTH * 100}%`, top: `${y / HEIGHT * 100}%` }} aria-label={`${checkpoint.name}, ${formatDistance(checkpoint.distanceMeters)}. ${checkpoint.distanceMeters <= completedMeters ? "Reached" : "Locked"}`} aria-pressed={selectedId === checkpoint.id} />)}
            <p className="absolute bottom-3 left-5 text-[9px] font-bold uppercase tracking-[.15em] text-[#718d84]">Stylized route · not a navigation map</p>
          </div>
        </div>
        <div className="flex min-h-[260px] flex-col p-5 sm:p-7" aria-live="polite">
          <div className="flex items-center gap-2 text-[#ff8055]">{selected.distanceMeters <= completedMeters ? <MapPin size={18} /> : <LockKeyhole size={17} />}<span className="text-[10px] font-black uppercase tracking-[.16em]">{selected.type} · {formatDistance(selected.distanceMeters)}</span></div>
          <h3 className="mt-4 text-2xl font-black">{selected.name}</h3><p className="mt-1 text-xs font-bold text-[#91aaa2]">{selected.country}</p>
          <p className="mt-5 text-sm leading-6 text-[#d3dfdb]">{selected.story}</p><p className="mt-3 text-xs leading-5 text-[#91aaa2]">{selected.context}</p>
          {selected.reward && <p className="mt-auto flex items-center gap-2 pt-5 text-xs font-black text-[#f3d58a]"><Flag size={15} /> {selected.reward}</p>}
        </div>
      </div>
    </section>
  );
}
