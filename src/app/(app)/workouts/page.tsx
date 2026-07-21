import { Camera, Plus, Upload } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { workouts } from "@/lib/mock-data";

export default function WorkoutsPage() {
  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Training history" title="Workouts" description="One clear record across every rower and every source." />
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-5 text-sm font-black text-white">
          <Plus size={17} aria-hidden="true" /> Add workout
        </button>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button className="flex items-center gap-4 rounded-2xl border border-[#dfe5e1] bg-white p-4 text-left">
          <span className="grid size-11 place-items-center rounded-xl bg-[#eef3f0] text-[#0d2b24]"><Camera size={20} /></span>
          <span><strong className="block text-sm text-[#263a34]">Scan a monitor</strong><span className="mt-1 block text-xs text-[#718078]">Review extracted metrics before saving</span></span>
        </button>
        <button className="flex items-center gap-4 rounded-2xl border border-[#dfe5e1] bg-white p-4 text-left">
          <span className="grid size-11 place-items-center rounded-xl bg-[#fff0ea] text-[#e45522]"><Upload size={20} /></span>
          <span><strong className="block text-sm text-[#263a34]">Import workout</strong><span className="mt-1 block text-xs text-[#718078]">Choose a connected source or file</span></span>
        </button>
      </div>
      <section className="mt-6 overflow-hidden rounded-3xl border border-[#dfe5e1] bg-white">
        {workouts.map((workout) => (
          <article key={workout.id} className="border-b border-[#e7ebe8] p-5 last:border-0 sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:items-center sm:px-6">
            <div><h2 className="font-black text-[#263a34]">{workout.title}</h2><p className="mt-1 text-xs text-[#718078]">{workout.date} · {workout.source}</p></div>
            <div className="mt-4 flex justify-between sm:mt-0 sm:block"><span className="text-xs text-[#8b9892] sm:hidden">Distance</span><strong className="text-sm text-[#263a34]">{workout.distance}</strong></div>
            <div className="mt-2 flex justify-between sm:mt-0 sm:block"><span className="text-xs text-[#8b9892] sm:hidden">Time</span><strong className="text-sm text-[#263a34]">{workout.time}</strong></div>
            <div className="mt-2 flex justify-between sm:mt-0 sm:block"><span className="text-xs text-[#8b9892] sm:hidden">Pace</span><strong className="text-sm text-[#e45522]">{workout.pace} /500m</strong></div>
          </article>
        ))}
      </section>
    </div>
  );
}
