import Link from "next/link";
import { ArrowRight, Flame, Gauge, Timer, TrendingUp } from "lucide-react";
import { workouts } from "@/lib/mock-data";

const stats = [
  { label: "Distance", value: "62.4", unit: "km", note: "+14% vs last month", icon: TrendingUp },
  { label: "Rowing time", value: "4:32", unit: "hrs", note: "8 total sessions", icon: Timer },
  { label: "Average pace", value: "2:08", unit: "/500m", note: "3.2 sec faster", icon: Gauge },
  { label: "Current streak", value: "4", unit: "weeks", note: "Personal best", icon: Flame },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#e45522]">Welcome back, Mohamed</p>
          <h1 className="display-type mt-1 text-4xl font-black text-[#0d2b24] sm:text-5xl">Your rowing, at a glance.</h1>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Monthly rowing summary">
        {stats.map(({ label, value, unit, note, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-[#dfe5e1] bg-white p-4 sm:rounded-3xl sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#718078]">{label}</p>
              <Icon size={17} className="text-[#ff6b35]" aria-hidden="true" />
            </div>
            <p className="mt-4 text-3xl font-black tracking-tight text-[#13211d] sm:text-4xl">
              {value} <span className="text-sm font-bold text-[#718078]">{unit}</span>
            </p>
            <p className="mt-2 text-xs text-[#718078]">{note}</p>
          </article>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <section className="rounded-3xl border border-[#dfe5e1] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#13211d]">Training volume</h2>
              <p className="mt-1 text-sm text-[#718078]">Distance over the last 8 weeks</p>
            </div>
            <span className="rounded-full bg-[#eef3f0] px-3 py-1.5 text-xs font-bold text-[#476159]">8 weeks</span>
          </div>
          <div className="mt-8 flex h-52 items-end gap-2 sm:gap-4" aria-label="Mock eight-week distance chart">
            {[42, 55, 48, 68, 61, 74, 70, 84].map((height, index) => (
              <div key={index} className="flex h-full flex-1 flex-col justify-end gap-2">
                <div className={`w-full rounded-t-lg ${index === 7 ? "bg-[#ff6b35]" : "bg-[#cfe2dc]"}`} style={{ height: `${height}%` }} />
                <span className="text-center text-[10px] font-bold text-[#8b9892]">W{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#0d2b24] p-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8eb4a8]">Active challenge</p>
          <h2 className="mt-4 text-2xl font-black">July 100K</h2>
          <p className="mt-2 text-sm leading-6 text-[#a9c1ba]">You’re closing in. Three focused sessions can get you across the line.</p>
          <div className="mt-8 flex items-end justify-between">
            <p className="text-4xl font-black">62.4<span className="text-lg text-[#8eb4a8]"> km</span></p>
            <p className="text-sm font-bold text-[#ff9a73]">62%</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-[#ff6b35]" />
          </div>
          <Link href="/challenges" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-white">
            View challenge <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-[#dfe5e1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e7ebe8] p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-black text-[#13211d]">Recent workouts</h2>
            <p className="mt-1 text-sm text-[#718078]">Your latest sessions from every source</p>
          </div>
          <Link href="/workouts" className="text-sm font-black text-[#e45522]">View all</Link>
        </div>
        <div className="divide-y divide-[#e7ebe8]">
          {workouts.slice(0, 3).map((workout) => (
            <article key={workout.id} className="grid grid-cols-[1fr_auto] items-center gap-4 p-5 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:px-6">
              <div className="min-w-0">
                <h3 className="truncate font-black text-[#263a34]">{workout.title}</h3>
                <p className="mt-1 truncate text-xs text-[#718078]">{workout.date} · {workout.source}</p>
              </div>
              <p className="hidden text-sm font-bold text-[#263a34] sm:block">{workout.distance}</p>
              <p className="hidden text-sm font-bold text-[#263a34] sm:block">{workout.time}</p>
              <p className="text-sm font-black text-[#e45522]">{workout.pace}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
