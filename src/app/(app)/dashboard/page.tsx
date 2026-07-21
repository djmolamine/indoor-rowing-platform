import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Flag,
  Flame,
  Map,
  Medal,
  Navigation,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { LobbyCard } from "@/components/lobby/lobby-card";
import { SectionLabel } from "@/components/lobby/section-label";
import { lobbyData } from "@/lib/lobby-data";

function ProgressBar({ value, label, inverse = false }: { value: number; label: string; inverse?: boolean }) {
  return (
    <div
      className={`h-2 overflow-hidden rounded-full ${inverse ? "bg-white/15" : "bg-[#e7ebe8]"}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export default function LobbyPage() {
  const { athlete, today, expedition, event, progress, community } = lobbyData;
  const targetProgress = (today.target.completedKm / today.target.goalKm) * 100;
  const expeditionProgress = (expedition.completedKm / expedition.totalKm) * 100;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="overflow-hidden rounded-[2rem] bg-[#0d2b24] text-white">
        <div className="relative p-5 sm:p-8 lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-2/5 opacity-25 lg:block" aria-hidden="true">
            <div className="absolute right-[-8%] top-[-20%] size-72 rounded-full border border-white/30" />
            <div className="absolute right-[8%] top-[4%] size-72 rounded-full border border-white/20" />
            <div className="absolute right-[24%] top-[28%] size-72 rounded-full border border-white/10" />
          </div>
          <div className="relative max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#b6cec7]">
              <span className="rounded-full bg-white/10 px-3 py-1.5">{athlete.countryCode} · {athlete.country}</span>
              <span>{athlete.trainingLocation}</span>
              <span aria-hidden="true">·</span>
              <span>{athlete.season}</span>
            </div>
            <h1 className="display-type mt-5 max-w-2xl text-4xl font-black leading-[0.98] sm:text-5xl lg:text-6xl">
              Ready for your next row, {athlete.name}?
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#b6cec7] sm:text-base">
              Your training, competitions, and rowing community—together in one athlete-owned home.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/workouts"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-black text-white shadow-[0_10px_30px_rgba(255,107,53,.22)] transition hover:bg-[#e95b28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Start rowing <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/profile" className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-bold text-white hover:text-[#ffb398]">
                <ShieldCheck size={18} className="text-[#75c9ae]" aria-hidden="true" />
                Passport {athlete.passport.status.toLowerCase()} · {athlete.passport.completion}%
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <LobbyCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <SectionLabel>Today</SectionLabel>
            <h2 className="mt-2 text-2xl font-black tracking-tight">One useful row is enough.</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#fff0e9] px-3 py-2 text-sm font-black text-[#d94d1c]">
            <Flame size={17} aria-hidden="true" /> {today.streakDays} days
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl bg-[#eef3f0] p-4 sm:p-5">
            <div className="flex gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#0d2b24]"><CircleGauge size={20} aria-hidden="true" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#687871]">Suggested row</p>
                <h3 className="mt-1 font-black text-[#13211d]">{today.suggestedWorkout.title}</h3>
                <p className="mt-1 text-sm text-[#62706b]">{today.suggestedWorkout.detail}</p>
              </div>
              <span className="ml-auto whitespace-nowrap text-sm font-black text-[#0d2b24]">{today.suggestedWorkout.duration}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7ebe8] p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#687871]">{today.target.label}</p>
                <p className="mt-2 text-2xl font-black">{today.target.completedKm}<span className="text-sm text-[#687871]"> / {today.target.goalKm} km</span></p>
              </div>
              <p className="text-xs font-bold text-[#687871]">{today.target.period}</p>
            </div>
            <div className="mt-4"><ProgressBar value={targetProgress} label={`${Math.round(targetProgress)} percent of July distance target completed`} /></div>
          </div>
        </div>
      </LobbyCard>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <LobbyCard tone="deep">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel inverse>River Expedition</SectionLabel>
              <h2 className="mt-3 text-2xl font-black">{expedition.name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-[#a9c1ba]"><Navigation size={15} aria-hidden="true" /> {expedition.route}</p>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#ff9a73]"><Map size={21} aria-hidden="true" /></div>
          </div>
          <div className="mt-8 flex items-end justify-between gap-4">
            <p className="text-4xl font-black tabular-nums">{expedition.completedKm}<span className="text-base text-[#9fc1b7]"> / {expedition.totalKm.toLocaleString()} km</span></p>
            <p className="text-sm font-black text-[#ff9a73]">{Math.round(expeditionProgress)}%</p>
          </div>
          <div className="mt-3"><ProgressBar value={expeditionProgress} label={`${Math.round(expeditionProgress)} percent of the Danube expedition completed`} inverse /></div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-sm">
            <div><p className="text-[#9fc1b7]">Your contribution</p><p className="mt-1 font-black">{expedition.contributionKm} km this week</p></div>
            <div><p className="text-[#9fc1b7]">Community crew</p><p className="mt-1 font-black">{expedition.contributors.toLocaleString()} athletes</p></div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold text-[#9fc1b7]"><Flag size={14} className="mr-1 inline" aria-hidden="true" /> {expedition.nextMilestone}</p>
            <Link href="/challenges" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#0d2b24] hover:bg-[#edf5f2]">
              View mission <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </LobbyCard>

        <LobbyCard id="event" tone="warm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel>Upcoming event</SectionLabel>
              <h2 className="mt-3 text-2xl font-black">{event.name}</h2>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#d94d1c]"><CalendarDays size={21} aria-hidden="true" /></div>
          </div>
          <p className="mt-2 text-sm font-bold text-[#475b54]">{event.format}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex gap-3"><dt className="w-24 shrink-0 text-[#687871]">Date</dt><dd className="font-bold">{event.date}</dd></div>
            <div className="flex gap-3"><dt className="w-24 shrink-0 text-[#687871]">Entry</dt><dd className="font-bold text-[#16725e]">{event.registration}</dd></div>
            <div className="flex gap-3"><dt className="w-24 shrink-0 text-[#687871]">Verification</dt><dd className="font-bold">{event.verification}</dd></div>
          </dl>
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-white/75 p-3 text-xs font-bold text-[#475b54]"><CheckCircle2 size={16} className="text-[#16725e]" aria-hidden="true" /> {event.location}</p>
          <Link href="/dashboard#event" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#d94d1c]">
            Review event <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </LobbyCard>
      </div>

      <LobbyCard>
        <div className="flex items-end justify-between gap-4">
          <div><SectionLabel>Athlete progress</SectionLabel><h2 className="mt-2 text-2xl font-black">Form worth carrying forward.</h2></div>
          <Link href="/workouts" className="hidden text-sm font-black text-[#d94d1c] sm:inline-flex">Workout history</Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-[#e7ebe8] p-4">
            <Sparkles size={18} className="text-[#ff6b35]" aria-hidden="true" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#687871]">Latest personal best</p>
            <h3 className="mt-2 text-2xl font-black tabular-nums">{progress.personalBest.result}</h3>
            <p className="mt-1 text-sm font-bold">{progress.personalBest.distance} · {progress.personalBest.improvement}</p>
            <p className="mt-2 text-xs text-[#687871]">{progress.personalBest.date}</p>
          </article>
          <article className="rounded-2xl border border-[#e7ebe8] p-4">
            <CircleGauge size={18} className="text-[#16725e]" aria-hidden="true" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#687871]">Recent workout</p>
            <h3 className="mt-2 font-black">{progress.recentWorkout.title}</h3>
            <p className="mt-2 text-xl font-black tabular-nums">{progress.recentWorkout.distance} <span className="text-sm text-[#687871]">· {progress.recentWorkout.duration}</span></p>
            <p className="mt-2 text-xs text-[#687871]">{progress.recentWorkout.pace} · {progress.recentWorkout.source}</p>
          </article>
          <article className="rounded-2xl border border-[#e7ebe8] p-4">
            <Medal size={18} className="text-[#d39820]" aria-hidden="true" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#687871]">Ranking snapshot</p>
            <h3 className="mt-2 text-2xl font-black tabular-nums">#{progress.ranking.position} <span className="text-sm text-[#687871]">of {progress.ranking.fieldSize}</span></h3>
            <p className="mt-1 text-sm font-bold">{progress.ranking.scope}</p>
            <p className="mt-2 text-xs text-[#687871]">{progress.ranking.category}</p>
          </article>
        </div>
      </LobbyCard>

      <LobbyCard id="community">
        <div className="flex items-start justify-between gap-4">
          <div><SectionLabel>Community</SectionLabel><h2 className="mt-2 text-2xl font-black">Rowing together, with purpose.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#687871]">A quiet view of the crews and communities your rowing helps move forward.</p></div>
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eef3f0] text-[#0d2b24]"><UsersRound size={21} aria-hidden="true" /></div>
        </div>
        <div className="mt-6 divide-y divide-[#e7ebe8] border-y border-[#e7ebe8]">
          {community.map((update) => (
            <article key={update.id} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-4">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-[#687871]">{update.group}</p>
              <p className="text-sm font-bold">{update.message}</p>
              <p className="text-xs text-[#687871]">{update.detail}</p>
            </article>
          ))}
        </div>
        <Link href="/dashboard#community" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#d94d1c]">Open community <ArrowRight size={16} aria-hidden="true" /></Link>
      </LobbyCard>
    </div>
  );
}
