"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  ChevronRight,
  CircleGauge,
  MapPin,
  Medal,
  Pencil,
  Route,
  Settings,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import { PassportSection } from "@/components/passport/passport-section";
import { VerificationBadge } from "@/components/passport/verification-badge";
import { CompetitionCredentials } from "@/components/passport/competition-credentials";
import { SearchCombobox, type ComboboxOption } from "@/components/ui/search-combobox";
import { CityCombobox } from "@/components/ui/city-combobox";
import { COUNTRIES, getCountry } from "@/lib/location-data/countries";
import { seedClubsForLocation, SEED_CLUBS } from "@/lib/location-data/seed-clubs";
import { getMachineModel, MACHINE_MODELS, machineDisplayName } from "@/lib/machine-data";
import { labelFor, MACHINE_CLASSES } from "@/lib/competition-taxonomy";
import { passportData, type PassportAthlete, type PassportVisibility, type TrainingContext } from "@/lib/passport-data";
import { saveAthleteProfile } from "@/app/(app)/profile/actions";
import { currentAthleteCredentials } from "@/lib/credentials/data";

const visibilityOptions: { value: PassportVisibility; description: string }[] = [
  { value: "Private", description: "Only you can view your full Passport." },
  { value: "Connections only", description: "Approved Rowform connections see selected public fields." },
  { value: "Public athlete profile", description: "Anyone with your public Passport link sees selected claims." },
  { value: "Event organizers", description: "Registered-event organizers receive only required entry claims." },
];

const personalBestResult:Record<string,string>={"500 m":"result-2k-pb","1,000 m":"result-2k-pb","2,000 m":"result-mvo-md-001","5,000 m":"result-2k-pb","10,000 m":"result-water-participation","30 minutes":"result-30min-rp3"};
const competitionResult:Record<string,string>={c1:"result-mvo-md-001",c2:"result-2k-pb",c3:"result-30min-rp3"};

const fieldClass = "mt-1.5 min-h-11 w-full rounded-xl border border-[#ccd6d1] bg-white px-3 text-sm font-bold text-[#13211d] outline-none transition focus:border-[#16725e] focus:ring-2 focus:ring-[#16725e]/20";
const MISSING_CLUB = "__missing_club__";
const trainingContexts: TrainingContext[] = ["Home", "Commercial gym", "Rowing club", "School or university", "National training centre", "Other"];
const countryOptions: ComboboxOption[] = COUNTRIES.map((country) => ({ id: country.code, label: country.name, description: country.code }));
const OTHER_MACHINE = "__other_machine__";
const machineOptions: ComboboxOption[] = [
  ...MACHINE_MODELS.map((machine) => ({ id: machine.id, label: machineDisplayName(machine), description: labelFor(MACHINE_CLASSES, machine.suggestedClassId) })),
  { id: OTHER_MACHINE, label: "My machine is not listed", description: "Enter its provider and model manually" },
];

function percentage(value: number, total: number) { return total > 0 ? Math.round((value / total) * 100) : 0; }

function athleteIdentity(athlete: PassportAthlete) {
  if (athlete.trainingContext === "Rowing club") {
    if (athlete.selectedClubId === MISSING_CLUB && athlete.customClub.officialName) return athlete.customClub.officialName;
    return SEED_CLUBS.find((club) => club.id === athlete.selectedClubId)?.officialName ?? "Club athlete";
  }
  return { Home: "Home athlete", "Commercial gym": "Commercial gym athlete", "School or university": "University athlete", "National training centre": "National training centre athlete", Other: "Independent athlete" }[athlete.trainingContext];
}

export function AthletePassport({ initialAthlete = passportData.athlete }: { initialAthlete?: PassportAthlete }) {
  const [athlete, setAthlete] = useState<PassportAthlete>(initialAthlete);
  const [draft, setDraft] = useState<PassportAthlete>(initialAthlete);
  const [editorVersion, setEditorVersion] = useState(0);
  const [formError, setFormError] = useState("");
  const [directoryClubs, setDirectoryClubs] = useState<Array<{ id:string; officialName:string; city:string; clubType:string; verificationStatus:string; activeStatus:string; sourceLabel:string }>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expedition = passportData.expeditions.active;
  const expeditionProgress = percentage(expedition.completedKm, expedition.totalKm);
  const identity = athleteIdentity(athlete);
  useEffect(() => { if (!draft.countryCode || !draft.city) return; const controller=new AbortController(); fetch(`/api/clubs?country=${draft.countryCode}&city=${encodeURIComponent(draft.city)}`,{signal:controller.signal}).then((response)=>response.ok?response.json():{clubs:[]}).then((payload:{clubs:typeof directoryClubs})=>setDirectoryClubs(payload.clubs)).catch(()=>undefined); return ()=>controller.abort(); },[draft.countryCode,draft.city]);
  const availableClubs = directoryClubs.length ? directoryClubs : seedClubsForLocation(draft.countryCode, draft.city);
  const clubOptions: ComboboxOption[] = [...availableClubs.map((club) => ({ id: club.id, label: club.officialName, description: `${club.city} · ${club.clubType} · ${club.verificationStatus}` })), { id: MISSING_CLUB, label: "My club is not listed", description: "Submit club details for future review" }];

  function openEditor() {
    setDraft(athlete);
    setFormError("");
    setEditorVersion((version) => version + 1);
    dialogRef.current?.showModal();
  }

  async function savePrototypeChanges(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.countryCode || !draft.city) { setFormError("Choose a country and city, or enter an Other city value."); return; }
    if (draft.trainingContext === "Rowing club" && !draft.selectedClubId) { setFormError("Choose a club or select “My club is not listed.”"); return; }
    if (draft.trainingContext === "Rowing club" && draft.selectedClubId === MISSING_CLUB && !draft.customClub.officialName.trim()) { setFormError("Enter the club name for review."); return; }
    if (!draft.preferredMachineId) { setFormError("Choose a rowing machine or select “My machine is not listed.”"); return; }
    if (draft.preferredMachineId === OTHER_MACHINE && !draft.preferredMachine.trim()) { setFormError("Enter the provider and model of your rowing machine."); return; }
    const result = await saveAthleteProfile(draft);
    if (!result.persisted && !result.message.startsWith("Prototype")) { setFormError(result.message); return; }
    setAthlete(draft);
    dialogRef.current?.close();
  }

  function setVisibility(visibility: PassportVisibility) {
    setAthlete((current) => ({ ...current, visibility }));
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="surface-grid relative overflow-hidden rounded-[1.75rem] bg-[#0d2b24] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/10 bg-white/[0.025] lg:block" aria-hidden="true">
          <div className="absolute left-8 right-8 top-1/2 h-px bg-white/15" />
          {[0, 1, 2, 3, 4].map((mark) => <span key={mark} className="absolute top-[calc(50%-3px)] size-2 rounded-full bg-[#ff6b35]" style={{ left: `${12 + mark * 19}%` }} />)}
          <p className="absolute bottom-8 left-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Every row · one lifelong record</p>
        </div>
        <div className="relative grid gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="grid size-20 shrink-0 place-items-center rounded-3xl border border-white/15 bg-[#d4e8e1] text-2xl font-black text-[#0d2b24] shadow-[0_12px_35px_rgba(0,0,0,.18)]">{athlete.initials}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-black uppercase tracking-[0.14em] text-[#8eb4a8]">Athlete Passport</span><VerificationBadge label={athlete.verificationStatus} inverse /></div>
              <h1 className="display-type mt-3 text-4xl font-black leading-none sm:text-5xl">{athlete.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#b6cec7]"><span>{athlete.countryCode} · {athlete.country}</span><span>{identity}</span><span>{athlete.city ? `${athlete.city}, ${athlete.country}` : athlete.country}</span></div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a9c1ba]">{athlete.biography}</p>
            </div>
          </div>
          <div className="relative z-10 flex flex-col gap-3 lg:min-w-56 lg:items-end">
            <button onClick={openEditor} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-5 text-sm font-black text-white hover:bg-[#e95b28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Pencil size={16} aria-hidden="true" /> Edit Passport</button>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs lg:text-right">
              <div><dt className="text-[#789d91]">Passport ID</dt><dd className="mt-1 font-black tracking-wide">{athlete.passportId}</dd></div>
              <div><dt className="text-[#789d91]">Current season</dt><dd className="mt-1 font-black">{athlete.currentSeason}</dd></div>
              <div><dt className="text-[#789d91]">Member since</dt><dd className="mt-1 font-black">{athlete.memberSince}</dd></div>
              <div><dt className="text-[#789d91]">Visibility</dt><dd className="mt-1 font-black">{athlete.visibility}</dd></div>
            </dl>
            <div className="w-full lg:max-w-56"><div className="mb-2 flex justify-between text-xs font-bold"><span>Passport readiness</span><span>{athlete.completion}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label={`Passport is ${athlete.completion} percent complete`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={athlete.completion}><div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${athlete.completion}%` }} /></div></div>
          </div>
        </div>
      </header>

      <section aria-labelledby="summary-title">
        <div className="px-1"><p className="text-xs font-black uppercase tracking-[0.14em] text-[#687871]">Athlete summary</p><h2 id="summary-title" className="mt-2 text-2xl font-black">A life in rowing, carried forward.</h2></div>
        <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {passportData.summary.map((metric) => <div key={metric.label} className="rounded-2xl border border-[#dfe5e1] bg-white p-4"><dt className="text-[10px] font-black uppercase tracking-[0.11em] text-[#687871]">{metric.label}</dt><dd className="mt-3 text-xl font-black tabular-nums text-[#13211d] sm:text-2xl">{metric.value}</dd><p className="mt-1 text-xs leading-5 text-[#718078]">{metric.detail}</p></div>)}
        </dl>
      </section>

      <PassportSection id="personal-bests" eyebrow="Verified performance" title="Personal bests" description="Standard efforts remain attached to their machine class and evidence tier, so every result keeps its meaning.">
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {passportData.personalBests.map((record) => <Link key={record.effort} href={`/results/${personalBestResult[record.effort]}`} className="block rounded-2xl border border-[#e2e7e4] p-4 hover:bg-[#fbfcfb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]" aria-label={`View detailed ${record.effort} personal best`}><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-[#687871]">{record.effort}</p><h3 className="mt-2 text-3xl font-black tabular-nums">{record.result}</h3></div>{record.improvement && <span className="rounded-full bg-[#fff0e9] px-2.5 py-1 text-[10px] font-black text-[#c64c20]">↑ {record.improvement}</span>}</div><p className="mt-4 text-xs font-bold text-[#475b54]">{record.machineClass}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-2"><VerificationBadge label={record.verification} /><time className="text-xs text-[#718078]">{record.date}</time></div></Link>)}
        </div>
      </PassportSection>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_.92fr]">
        <PassportSection id="expeditions" eyebrow="Journey record" title="Expeditions" description="Real eligible distance, place-based stories, and completion artifacts carried in your Passport." action={<Route size={22} className="text-[#d94d1c]" aria-hidden="true" />}>
          <article className="mt-6 rounded-2xl bg-[#0d2b24] p-5 text-white sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8eb4a8]">{expedition.totalKm > 0 ? "Active · Ambitious" : "Journey not started"}</p><h3 className="mt-2 text-2xl font-black">{expedition.name}</h3><p className="mt-1 text-sm text-[#a9c1ba]">{expedition.subtitle}</p></div><p className="text-3xl font-black text-[#ff9a73]">{expedition.totalKm > 0 ? `${expeditionProgress}%` : "—"}</p></div>{expedition.totalKm > 0 ? <><div className="mt-6 h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label={`${expeditionProgress} percent of ${expedition.name} completed`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={expeditionProgress}><div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${expeditionProgress}%` }} /></div><div className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><p className="text-[#8eb4a8]">Current position</p><p className="mt-1 font-black">{expedition.currentPosition}</p></div><div><p className="text-[#8eb4a8]">Next landmark</p><p className="mt-1 font-black">{expedition.nextLandmark} · {expedition.distanceToNextKm} km</p></div><div><p className="text-[#8eb4a8]">Distance completed</p><p className="mt-1 font-black">{expedition.completedKm} / {expedition.totalKm.toLocaleString()} km</p></div></div></> : <p className="mt-5 text-sm leading-6 text-[#a9c1ba]">Choose a river and your first eligible workout will create the opening entry in this lifelong journey record.</p>}<Link href="/expeditions" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#0d2b24]">{expedition.totalKm > 0 ? "Open Expedition" : "Choose an Expedition"} <ArrowRight size={16} aria-hidden="true" /></Link></article>
          <div className="mt-4 space-y-3">{passportData.expeditions.completed.map((item) => <article key={item.certificate} className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e7ebe8] p-4"><div className="grid size-10 place-items-center rounded-full bg-[#eef3f0] text-[#16725e]"><Check size={18} aria-hidden="true" /></div><div className="min-w-0 flex-1"><h3 className="font-black">{item.name}</h3><p className="mt-1 text-xs text-[#718078]">Completed {item.completedOn} · {item.distance}</p></div><div className="text-right"><p className="text-[10px] font-bold uppercase text-[#718078]">Certificate</p><p className="mt-1 text-xs font-black tracking-wide">{item.certificate}</p></div></article>)}</div>
        </PassportSection>

        <PassportSection id="timeline" eyebrow="Rowing journey" title="Athlete timeline" description="Milestones from training, Expeditions, community, and competition—not a social feed.">
          <ol className="relative mt-6 space-y-0 border-l border-[#cdd9d4] pl-6">
            {passportData.timeline.map((entry) => {const resultId=entry.eventResultId??(entry.kind==="performance"||entry.kind==="ranking"?"result-2k-pb":undefined);return <li key={entry.id} className="relative pb-5 last:pb-0"><span className="absolute -left-[1.78rem] top-1 size-3 rounded-full border-2 border-white bg-[#ff6b35] ring-1 ring-[#d5dfdb]" /><time className="text-[10px] font-black uppercase tracking-[0.1em] text-[#718078]">{entry.date}</time><h3 className="mt-1 text-sm font-black">{resultId?<Link href={`/results/${resultId}`} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">{entry.title}</Link>:entry.title}</h3><p className="mt-1 text-xs leading-5 text-[#718078]">{entry.detail}</p></li>;})}
          </ol>
        </PassportSection>
      </div>

      <CompetitionCredentials credentials={currentAthleteCredentials} />

      <PassportSection id="competitions" eyebrow="Competition record" title="Results with credible provenance" description="Each performance remains tied to its event rules, category, machine class, and verification tier.">
        <div className="mt-6 grid gap-3 lg:grid-cols-3">{passportData.competitions.map((record) => <Link key={record.id} href={`/results/${record.eventResultId??competitionResult[record.id]}`} className="block rounded-2xl border border-[#e2e7e4] p-4 hover:bg-[#fbfcfb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]" aria-label={`View detailed result for ${record.event}`}><div className="flex items-start justify-between gap-3"><Medal size={19} className="text-[#d39820]" aria-hidden="true" /><time className="text-xs text-[#718078]">{record.date}</time></div><h3 className="mt-4 font-black">{record.event}</h3><p className="mt-1 text-xs text-[#718078]">{record.format}</p><p className="mt-4 text-3xl font-black tabular-nums">{record.result}</p><p className="mt-1 text-sm font-bold text-[#16725e]">{record.placing}</p><dl className="mt-4 space-y-2 border-t border-[#e7ebe8] pt-4 text-xs"><div><dt className="text-[#718078]">Category</dt><dd className="mt-0.5 font-bold">{record.category}</dd></div><div><dt className="text-[#718078]">Machine class</dt><dd className="mt-0.5 font-bold">{record.machineClass}</dd></div></dl><div className="mt-4"><VerificationBadge label={record.verification} /></div></Link>)}</div>
      </PassportSection>

      <PassportSection id="recognition" eyebrow="Recognition" title="Achievements that carry meaning" description="Recognition reflects consistency, progress, verified effort, participation, contribution, and lifelong distance.">
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{passportData.achievements.map((achievement) => <article key={achievement.id} className="rounded-2xl bg-[#f5f7f4] p-4"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-black uppercase tracking-[0.11em] text-[#d94d1c]">{achievement.type}</span><Award size={17} className="text-[#658279]" aria-hidden="true" /></div><h3 className="mt-3 font-black">{achievement.title}</h3><p className="mt-2 text-xs leading-5 text-[#687871]">{achievement.detail}</p><p className="mt-3 text-[10px] font-bold text-[#8b9892]">Earned {achievement.earnedOn}</p></article>)}</div>
      </PassportSection>

      <div className="grid gap-5 lg:grid-cols-2">
        <PassportSection id="affiliations" eyebrow="Independent identity" title="Affiliations and equipment" description="Providers contribute records to your Passport; they do not own your identity.">
          <dl className="mt-6 space-y-4 text-sm"><div className="flex gap-3"><UsersRound size={18} className="mt-0.5 shrink-0 text-[#16725e]" aria-hidden="true" /><div><dt className="text-xs text-[#718078]">Training context</dt><dd className="mt-1 font-black">{identity}</dd></div></div><div className="flex gap-3"><Building2 size={18} className="mt-0.5 shrink-0 text-[#16725e]" aria-hidden="true" /><div><dt className="text-xs text-[#718078]">National federation</dt><dd className="mt-1 font-black">{passportData.affiliations.federation}</dd></div></div><div className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#16725e]" aria-hidden="true" /><div><dt className="text-xs text-[#718078]">Primary training location</dt><dd className="mt-1 font-black">{athlete.city ? `${athlete.city}, ${athlete.country}` : athlete.country}</dd></div></div><div className="flex gap-3"><CircleGauge size={18} className="mt-0.5 shrink-0 text-[#16725e]" aria-hidden="true" /><div><dt className="text-xs text-[#718078]">Preferred machine</dt><dd className="mt-1 font-black">{athlete.preferredMachine}</dd></div></div></dl>
          <div className="mt-6 border-t border-[#e7ebe8] pt-5"><p className="text-xs font-bold text-[#718078]">Workout providers represented</p><div className="mt-3 flex flex-wrap gap-2">{passportData.affiliations.providers.length ? passportData.affiliations.providers.map((provider) => <span key={provider} className="rounded-full bg-[#eef3f0] px-3 py-1.5 text-xs font-black text-[#36534a]">{provider}</span>) : <span className="text-sm text-[#718078]">No workout provider recorded yet.</span>}</div><p className="mt-5 text-xs font-bold text-[#718078]">Machine classes in history</p><div className="mt-3 flex flex-wrap gap-2">{passportData.affiliations.machineClasses.length ? passportData.affiliations.machineClasses.map((machineClass) => <span key={machineClass} className="rounded-full border border-[#dfe5e1] px-3 py-1.5 text-xs font-bold">{machineClass}</span>) : <span className="text-sm text-[#718078]">Your first workout will establish this history.</span>}</div></div>
        </PassportSection>

        <PassportSection id="visibility" eyebrow="Athlete-controlled sharing" title="Passport visibility" description="Your Passport is private by default. You choose which fields and verified claims to present; contact information is never public by default.">
          <fieldset className="mt-6 space-y-2"><legend className="sr-only">Choose Passport visibility</legend>{visibilityOptions.map((option) => <label key={option.value} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition focus-within:ring-2 focus-within:ring-[#16725e]/30 ${athlete.visibility === option.value ? "border-[#16725e] bg-[#eef8f4]" : "border-[#e2e7e4]"}`}><input type="radio" name="passport-visibility" value={option.value} checked={athlete.visibility === option.value} onChange={() => setVisibility(option.value)} className="mt-1 accent-[#16725e]" /><span><strong className="block text-sm">{option.value}</strong><span className="mt-1 block text-xs leading-5 text-[#718078]">{option.description}</span></span></label>)}</fieldset>
          <p className="mt-4 rounded-xl bg-[#fff7f2] p-3 text-xs leading-5 text-[#6d4a3a]"><ShieldCheck size={15} className="mr-1 inline text-[#d94d1c]" aria-hidden="true" /> Prototype visibility changes apply only in this browser session and are not saved permanently.</p>
        </PassportSection>
      </div>

      <aside id="settings" className="flex flex-col gap-4 rounded-3xl border border-dashed border-[#cbd7d2] bg-white/60 p-5 sm:flex-row sm:items-center sm:justify-between" aria-label="Account settings separation"><div className="flex gap-3"><Settings size={20} className="mt-0.5 shrink-0 text-[#687871]" aria-hidden="true" /><div><h2 className="font-black">Account controls live in Settings</h2><p className="mt-1 text-sm text-[#718078]">Units, workout sources, notifications, export, security, and account access are separate from your Athlete Passport.</p></div></div><button disabled className="inline-flex min-h-11 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#d5ddd9] px-4 text-sm font-bold text-[#8b9892]" aria-label="Settings are not available in this prototype">Open Settings <ChevronRight size={16} aria-hidden="true" /></button></aside>

      <dialog ref={dialogRef} aria-labelledby="edit-passport-title" className="m-auto max-h-[90vh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-[#13211d] shadow-2xl backdrop:bg-[#061b16]/70">
        <form onSubmit={savePrototypeChanges} className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#d94d1c]">Session prototype</p><h2 id="edit-passport-title" className="mt-2 text-2xl font-black">Edit Athlete Passport</h2><p className="mt-2 text-sm leading-6 text-[#718078]">Changes appear immediately after applying but are not saved to a server or retained after refresh.</p></div><button type="button" onClick={() => dialogRef.current?.close()} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dfe5e1] hover:bg-[#f5f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]" aria-label="Close Passport editor"><X size={18} aria-hidden="true" /></button></div>
          <div key={editorVersion} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#475b54]">Athlete name<input className={fieldClass} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
            <SearchCombobox
              label="Country or territory"
              value={draft.countryCode}
              options={countryOptions}
              placeholder="Search 249 ISO countries"
              required
              onChange={(countryCode) => {
                const country = getCountry(countryCode);
                setDraft((current) => ({ ...current, countryCode, country: country?.name ?? "", city: "", cityRegion:undefined, cityLatitude:undefined, cityLongitude:undefined, citySource:undefined, cityIsOther: false, selectedClubId: "", customClub: { ...current.customClub, countryCode, country: country?.name ?? "", city: "" } }));
              }}
            />
            <CityCombobox key={`${editorVersion}-${draft.countryCode}`} countryCode={draft.countryCode} required value={draft.city ? { name:draft.city, countryCode:draft.countryCode, region:draft.cityRegion, latitude:draft.cityLatitude, longitude:draft.cityLongitude, source:draft.citySource ?? (draft.cityIsOther ? "manual" : "dataset") } : null} onChange={(city) => setDraft((current) => ({ ...current, city:city?.name ?? "", cityRegion:city?.region, cityLatitude:city?.latitude, cityLongitude:city?.longitude, citySource:city?.source, cityIsOther:city?.source === "manual", selectedClubId:"", customClub:{ ...current.customClub, city:city?.name ?? "" } }))} />
            <label className="text-xs font-bold text-[#475b54]">Where do you usually row?<select className={fieldClass} value={draft.trainingContext} onChange={(event) => setDraft((current) => ({ ...current, trainingContext: event.target.value as TrainingContext, selectedClubId: event.target.value === "Rowing club" ? current.selectedClubId : "" }))}>{trainingContexts.map((context) => <option key={context}>{context}</option>)}</select><span className="mt-2 block text-[11px] font-normal leading-5 text-[#718078]">Club membership is optional and never required for an Athlete Passport.</span></label>

            {draft.trainingContext === "Rowing club" && <div className="rounded-2xl border border-[#dfe5e1] bg-[#f8faf8] p-4 sm:col-span-2">
              <SearchCombobox key={`${editorVersion}-${draft.countryCode}-${draft.city}`} label="Rowing club" value={draft.selectedClubId} options={clubOptions} placeholder="Search the local seed directory" required disabled={!draft.countryCode || !draft.city} onChange={(selectedClubId) => setDraft((current) => ({ ...current, selectedClubId }))} />
              <p className="mt-2 text-[11px] leading-5 text-[#718078]">This is a small, incomplete directory sourced from official club websites. “Source reviewed” does not mean federation verified.</p>
              {draft.selectedClubId && draft.selectedClubId !== MISSING_CLUB && (() => { const club = availableClubs.find((item) => item.id === draft.selectedClubId); return club ? <div className="mt-3 rounded-xl bg-white p-3 text-xs"><p className="font-black">{club.officialName}</p><p className="mt-1 text-[#718078]">{club.city} · {club.clubType} · {club.activeStatus}</p><p className="mt-1 text-[#16725e]">{club.verificationStatus} · {"source" in club ? club.source.label : club.sourceLabel}</p></div> : null; })()}
              {draft.selectedClubId === MISSING_CLUB && <fieldset className="mt-4 grid gap-4 border-t border-[#dfe5e1] pt-4 sm:grid-cols-2"><legend className="sr-only">Missing club submission</legend><label className="text-xs font-bold text-[#475b54] sm:col-span-2">Club official name<input required className={fieldClass} value={draft.customClub.officialName} onChange={(event) => setDraft((current) => ({ ...current, customClub: { ...current.customClub, officialName: event.target.value } }))} /></label><label className="text-xs font-bold text-[#475b54]">Country<input readOnly className={`${fieldClass} bg-[#eef3f0]`} value={`${draft.country} (${draft.countryCode})`} /></label><label className="text-xs font-bold text-[#475b54]">City<input readOnly className={`${fieldClass} bg-[#eef3f0]`} value={draft.city} /></label><label className="text-xs font-bold text-[#475b54]">Website <span className="font-normal">(optional)</span><input type="url" className={fieldClass} value={draft.customClub.website} onChange={(event) => setDraft((current) => ({ ...current, customClub: { ...current.customClub, website: event.target.value } }))} /></label><label className="text-xs font-bold text-[#475b54]">Federation <span className="font-normal">(optional)</span><input className={fieldClass} value={draft.customClub.federation} onChange={(event) => setDraft((current) => ({ ...current, customClub: { ...current.customClub, federation: event.target.value } }))} /></label><p className="rounded-xl bg-[#fff7f2] p-3 text-xs leading-5 text-[#6d4a3a] sm:col-span-2">Submitted clubs would enter a review queue. They would not appear as verified until their identity, source, and federation relationship were checked.</p></fieldset>}
            </div>}

            <div className="sm:col-span-2">
              <SearchCombobox key={`${editorVersion}-${draft.preferredMachineId}`} label="Preferred rowing machine" value={draft.preferredMachineId} options={machineOptions} placeholder="Search providers and models" required onChange={(preferredMachineId) => { const machine = getMachineModel(preferredMachineId); setDraft((current) => ({ ...current, preferredMachineId, preferredMachine: machine ? machineDisplayName(machine) : preferredMachineId === OTHER_MACHINE ? "" : current.preferredMachine })); }} />
              {draft.preferredMachineId === OTHER_MACHINE && <label className="mt-3 block text-xs font-bold text-[#475b54]">Provider and model<input required className={fieldClass} placeholder="For example: provider and model name" value={draft.preferredMachine} onChange={(event) => setDraft((current) => ({ ...current, preferredMachine: event.target.value }))} /></label>}
              <p className="mt-2 text-[11px] leading-5 text-[#718078]">This records your preference only. It does not connect a provider account or imply equivalent performance across machine classes.</p>
            </div>
            <label className="text-xs font-bold text-[#475b54] sm:col-span-2">Biography<textarea rows={3} className={`${fieldClass} py-3`} value={draft.biography} onChange={(event) => setDraft({ ...draft, biography: event.target.value })} /></label>
            <label className="text-xs font-bold text-[#475b54] sm:col-span-2">Passport visibility<select className={fieldClass} value={draft.visibility} onChange={(event) => setDraft({ ...draft, visibility: event.target.value as PassportVisibility })}>{visibilityOptions.map((option) => <option key={option.value}>{option.value}</option>)}</select></label>
          </div>
          {formError && <p role="alert" className="mt-4 rounded-xl bg-[#fff0e9] p-3 text-sm font-bold text-[#9e3718]">{formError}</p>}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => dialogRef.current?.close()} className="min-h-11 rounded-full border border-[#d5ddd9] px-5 text-sm font-black">Cancel</button><button type="submit" className="min-h-11 rounded-full bg-[#ff6b35] px-5 text-sm font-black text-white hover:bg-[#e95b28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2b24]">Apply prototype changes</button></div>
        </form>
      </dialog>
    </div>
  );
}
