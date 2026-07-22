import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Clock3,
  Flag,
  Flame,
  IdCard,
  MapPin,
  Medal,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { LobbyCard } from "@/components/lobby/lobby-card";
import { RowingMotif } from "@/components/lobby/rowing-motif";
import { SectionLabel } from "@/components/lobby/section-label";
import { TimeAwareGreeting } from "@/components/lobby/time-aware-greeting";
import { lobbyData, type ReasonToRow } from "@/lib/lobby-data";

function ProgressBar({ value, label, inverse = false }: { value: number; label: string; inverse?: boolean }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full ${inverse ? "bg-white/15" : "bg-[#e7ebe8]"}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}>
      <div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

const reasonIcons = {
  streak: Flame,
  expedition: Route,
  target: Target,
  event: CalendarClock,
  crew: UsersRound,
} satisfies Record<ReasonToRow["kind"], typeof Flame>;

function ReasonCard({ reason }: { reason: ReasonToRow }) {
  const Icon = reasonIcons[reason.kind];
  return (
    <article className="min-w-[13.5rem] flex-1 rounded-2xl border border-[#e3e8e5] bg-white p-4">
      <div className="flex items-center gap-2 text-[#d94d1c]"><Icon size={17} aria-hidden="true" /><p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#687871]">{reason.label}</p></div>
      <p className="mt-3 text-base font-black text-[#13211d]">{reason.value}</p>
      <p className="mt-1 text-xs leading-5 text-[#687871]">{reason.action}</p>
    </article>
  );
}

export default function LobbyPage() {
  const { athlete, today, expedition, event, progress, community } = lobbyData;
  const expeditionProgress = (expedition.completedKm / expedition.totalKm) * 100;
  const weeklyProgress = (progress.weeklyConsistency.completedDays / progress.weeklyConsistency.targetDays) * 100;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="surface-grid overflow-hidden rounded-[1.75rem] bg-[#0d2b24] text-white">
        <div className="grid min-h-[21rem] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative z-10 flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#b6cec7]">
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">{athlete.season}</span>
              <span>{athlete.countryCode} · {athlete.country}</span>
              <span aria-hidden="true">·</span>
              <span>{athlete.trainingIdentity}</span>
            </div>
            <h1 className="display-type mt-5 max-w-2xl text-4xl font-black leading-none sm:text-5xl">
              <TimeAwareGreeting name={athlete.firstName} />
            </h1>
            <p className="mt-4 max-w-lg text-base font-bold leading-6 text-white sm:text-lg">{today.motivation}</p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#9fc1b7]">Suggested: {today.suggestedWorkout.title} · {today.suggestedWorkout.detail}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/workouts?mode=start" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-black text-white shadow-[0_10px_30px_rgba(255,107,53,.22)] transition hover:bg-[#e95b28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Start rowing <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/workouts?mode=completed" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Log a completed workout
              </Link>
            </div>
          </div>
          <div className="relative hidden items-center justify-center overflow-hidden border-l border-white/10 bg-white/[0.025] p-8 lg:flex">
            <RowingMotif />
            <p className="absolute bottom-8 right-9 text-right text-[10px] font-black uppercase tracking-[0.18em] text-white/40">Drive · Finish · Recovery · Catch</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="reasons-title">
        <div className="flex items-end justify-between gap-4 px-1">
          <div><SectionLabel>Today’s reasons to row</SectionLabel><h2 id="reasons-title" className="mt-2 text-2xl font-black tracking-tight">Every meter moves something.</h2></div>
          <span className="hidden text-xs font-bold text-[#687871] sm:block">{today.suggestedWorkout.duration} suggested</span>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {today.reasons.map((reason) => <ReasonCard key={reason.id} reason={reason} />)}
        </div>
      </section>

      <LobbyCard tone="deep" className="relative overflow-hidden p-0 sm:p-0">
        <div className="absolute inset-0 surface-grid opacity-20" aria-hidden="true" />
        <div className="relative grid lg:grid-cols-[1.12fr_.88fr]">
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex items-center gap-2"><SectionLabel inverse>Active Expedition</SectionLabel><span className="rounded-full bg-[#ff6b35]/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#ff9a73]">Ambitious</span></div>
            <h2 className="display-type mt-4 text-4xl font-black sm:text-5xl">{expedition.name}</h2>
            <p className="mt-2 text-base font-bold text-[#b9d2ca]">{expedition.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#9fc1b7]">
              <span><MapPin size={14} className="mr-1 inline" aria-hidden="true" /> {expedition.startLocation}</span>
              <span aria-hidden="true">→</span>
              <span>{expedition.finishLocation}</span>
            </div>
            <blockquote className="mt-6 max-w-2xl border-l-2 border-[#ff6b35] pl-4 text-sm leading-6 text-[#d9e6e2]">“{expedition.story}”</blockquote>
            <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9fc1b7]">Your position</p><p className="mt-1 text-xl font-black">{expedition.currentLocation}</p></div>
              <p className="text-3xl font-black tabular-nums">{expedition.completedKm}<span className="text-sm text-[#9fc1b7]"> / {expedition.totalKm.toLocaleString()} km</span></p>
            </div>
          </div>
          <div className="border-t border-white/10 bg-black/10 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.14em] text-[#9fc1b7]">Route position</p><p className="text-2xl font-black text-[#ff9a73]">{Math.round(expeditionProgress)}%</p></div>
            <div className="relative mt-8 h-24" aria-label={`Route from ${expedition.startLocation} to ${expedition.finishLocation}; next milestone ${expedition.nextMilestone} in ${expedition.distanceToNextKm} kilometers`}>
              <div className="absolute left-0 right-0 top-8 h-px bg-white/20" />
              <div className="absolute left-0 top-8 h-px bg-[#ff6b35]" style={{ width: `${expeditionProgress}%` }} />
              {expedition.milestones.map((milestone, index) => (
                <div key={milestone.label} className="absolute top-[1.55rem]" style={{ left: `${(index / (expedition.milestones.length - 1)) * 96}%` }}>
                  <span className={`block size-3 rounded-full border-2 ${milestone.state === "passed" ? "border-[#ff6b35] bg-[#ff6b35]" : milestone.state === "current" ? "border-white bg-[#ff6b35] ring-4 ring-[#ff6b35]/20" : "border-white/40 bg-[#0d2b24]"}`} />
                  <span className={`mt-3 block -translate-x-1/3 whitespace-nowrap text-[9px] font-bold ${milestone.state === "current" ? "text-white" : "text-[#789d91]"}`}>{milestone.label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="flex items-center gap-2 text-sm font-black"><Flag size={16} className="text-[#ff9a73]" aria-hidden="true" /> {expedition.distanceToNextKm} km until {expedition.nextMilestone}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div><p className="text-[#789d91]">Your week</p><p className="mt-1 font-black">{expedition.contributionKm} km</p></div>
                <div><p className="text-[#789d91]">Athletes</p><p className="mt-1 font-black">{expedition.participants.toLocaleString()}</p></div>
                <div><p className="text-[#789d91]">Countries</p><p className="mt-1 font-black">{expedition.countriesCrossed}</p></div>
              </div>
            </div>
            <Link href="/expeditions/danube" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#0d2b24] hover:bg-[#edf5f2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Open the Expedition <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </LobbyCard>

      <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
        <LobbyCard id="event" tone="warm">
          <div className="flex items-start justify-between gap-4"><div><SectionLabel>Next on the race calendar</SectionLabel><h2 className="mt-3 text-2xl font-black">{event.name}</h2><p className="mt-2 text-sm font-bold text-[#475b54]">{event.eventType}</p></div><span className="rounded-full bg-[#dff2eb] px-3 py-1.5 text-xs font-black text-[#126650]">{event.registrationStatus}</span></div>
          <div className="mt-6 rounded-2xl border border-[#eddbd2] bg-white/75 p-4">
            <p className="text-3xl font-black tabular-nums">{event.raceFormat}</p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#687871]">Race window</dt><dd className="mt-1 font-bold">{event.date}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#687871]">Entries close</dt><dd className="mt-1 font-bold text-[#b84620]">{event.registrationDeadline}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#687871]">Result standard</dt><dd className="mt-1 flex gap-2 font-bold"><ShieldCheck size={16} className="shrink-0 text-[#16725e]" aria-hidden="true" /> {event.verification}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#687871]">Eligibility</dt><dd className="mt-1 font-bold">{event.machineEligibility}</dd></div>
            </dl>
          </div>
          <Link href="/dashboard#event" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#d94d1c]">View regatta details <ArrowRight size={16} aria-hidden="true" /></Link>
        </LobbyCard>

        <LobbyCard className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-2 bg-[#0d2b24]" aria-hidden="true" />
          <div className="flex items-start justify-between gap-4"><div><SectionLabel>Athlete Passport</SectionLabel><h2 className="mt-3 text-2xl font-black">{athlete.fullName}</h2><p className="mt-1 text-sm text-[#687871]">{athlete.countryCode} · {athlete.country} · {athlete.trainingIdentity}</p></div><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#eef3f0] text-[#0d2b24]"><IdCard size={23} aria-hidden="true" /></div></div>
          <div className="mt-5 flex items-center gap-2 text-sm font-black text-[#16725e]"><CheckCircle2 size={17} aria-hidden="true" /> {athlete.passport.status} athlete identity</div>
          <p className="mt-2 text-xs text-[#687871]">{athlete.passport.readiness}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-[#e7ebe8] py-5 text-center">
            <div><dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#687871]">Lifetime</dt><dd className="mt-2 text-lg font-black tabular-nums">{athlete.passport.lifetimeDistanceKm.toLocaleString()} km</dd></div>
            <div><dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#687871]">Personal bests</dt><dd className="mt-2 text-lg font-black">{athlete.passport.personalBestCount}</dd></div>
            <div><dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#687871]">Expeditions</dt><dd className="mt-2 text-lg font-black">{athlete.passport.completedExpeditions}</dd></div>
          </dl>
          <div className="mt-5"><div className="mb-2 flex items-center justify-between text-xs font-bold"><span>Profile readiness</span><span>{athlete.passport.completion}%</span></div><ProgressBar value={athlete.passport.completion} label={`Athlete Passport is ${athlete.passport.completion} percent complete`} /></div>
          <Link href="/profile" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#d94d1c]">View Athlete Passport <ArrowRight size={16} aria-hidden="true" /></Link>
        </LobbyCard>
      </div>

      <LobbyCard>
        <div className="flex items-end justify-between gap-4"><div><SectionLabel>Athlete progress</SectionLabel><h2 className="mt-2 text-2xl font-black">The form behind the meters.</h2></div><Link href="/workouts" className="hidden text-sm font-black text-[#d94d1c] sm:inline-flex">Workout history</Link></div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <article className="rounded-2xl border border-[#e7ebe8] p-4"><Sparkles size={18} className="text-[#ff6b35]" aria-hidden="true" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#687871]">Latest personal best</p><h3 className="mt-2 text-2xl font-black tabular-nums">{progress.personalBest.result}</h3><p className="mt-1 text-sm font-bold">{progress.personalBest.distance} · {progress.personalBest.improvement}</p><p className="mt-2 flex items-center gap-1 text-xs text-[#16725e]"><ShieldCheck size={13} aria-hidden="true" /> Verified · {progress.personalBest.date}</p></article>
          <article className="rounded-2xl border border-[#e7ebe8] p-4"><CircleGauge size={18} className="text-[#16725e]" aria-hidden="true" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#687871]">Recent workout</p><h3 className="mt-2 font-black">{progress.recentWorkout.title}</h3><p className="mt-2 text-xl font-black tabular-nums">{progress.recentWorkout.distance}</p><p className="mt-2 text-xs text-[#687871]">{progress.recentWorkout.pace} · {progress.recentWorkout.strokeRate}</p></article>
          <article className="rounded-2xl border border-[#e7ebe8] p-4"><Medal size={18} className="text-[#d39820]" aria-hidden="true" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#687871]">Ranking snapshot</p><h3 className="mt-2 text-2xl font-black tabular-nums">#{progress.ranking.position} <span className="text-sm text-[#687871]">of {progress.ranking.fieldSize}</span></h3><p className="mt-1 text-sm font-bold">{progress.ranking.scope}</p><p className="mt-2 text-xs text-[#687871]">{progress.ranking.machineClass}</p></article>
          <article className="rounded-2xl border border-[#e7ebe8] p-4"><Clock3 size={18} className="text-[#0d2b24]" aria-hidden="true" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#687871]">Weekly consistency</p><h3 className="mt-2 text-xl font-black">{progress.weeklyConsistency.label}</h3><div className="mt-4"><ProgressBar value={weeklyProgress} label={`${progress.weeklyConsistency.completedDays} of ${progress.weeklyConsistency.targetDays} rowing days completed this week`} /></div><div className="mt-4 flex h-7 items-end gap-1" aria-label="Compact stroke profile showing a controlled drive and recovery rhythm">{progress.weeklyConsistency.strokeProfile.map((height, index) => <span key={index} className="flex-1 rounded-sm bg-[#b8d0c8]" style={{ height: `${height}%` }} />)}</div></article>
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#eef3f0] p-4 text-sm font-bold leading-6 text-[#36534a]"><Sparkles size={17} className="mt-1 shrink-0 text-[#d94d1c]" aria-hidden="true" /> {progress.insight}</p>
      </LobbyCard>

      <LobbyCard id="community">
        <div className="flex items-start justify-between gap-4"><div><SectionLabel>Across the rowing community</SectionLabel><h2 className="mt-2 text-2xl font-black">Movement worth noticing.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#687871]">A finite summary of milestones, crews, verified results, and events—not a social feed.</p></div><div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eef3f0] text-[#0d2b24]"><UsersRound size={21} aria-hidden="true" /></div></div>
        <div className="mt-6 divide-y divide-[#e7ebe8] border-y border-[#e7ebe8]">
          {community.map((update) => <article key={update.id} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:gap-4"><p className="text-[10px] font-black uppercase tracking-[0.11em] text-[#687871]">{update.category}</p><p className="text-sm font-bold">{update.message}</p><p className="text-xs text-[#687871]">{update.detail}</p></article>)}
        </div>
        <Link href="/dashboard#community" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#d94d1c]">View community summary <ChevronRight size={16} aria-hidden="true" /></Link>
      </LobbyCard>
    </div>
  );
}
