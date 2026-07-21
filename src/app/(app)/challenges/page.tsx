import { CheckCircle2, Lock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const challenges = [
  { title: "July 100K", detail: "Row 100 kilometers this month", progress: 62, value: "62.4 / 100 km", active: true },
  { title: "Consistency club", detail: "Complete 3 sessions a week for 4 weeks", progress: 75, value: "3 / 4 weeks", active: true },
  { title: "Early bird", detail: "Complete 10 workouts before 8 AM", progress: 100, value: "Completed", active: false },
];

export default function ChallengesPage() {
  return (
    <div>
      <SectionHeading eyebrow="Keep moving" title="Challenges" description="Simple goals that reward consistency, wherever you choose to row." />
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <article key={challenge.title} className="rounded-3xl border border-[#dfe5e1] bg-white p-6">
            <div className="flex items-center justify-between"><span className={`grid size-11 place-items-center rounded-2xl ${challenge.progress === 100 ? "bg-[#e7f5ef] text-[#198767]" : "bg-[#fff0ea] text-[#e45522]"}`}>{challenge.progress === 100 ? <CheckCircle2 size={21} /> : <Lock size={20} />}</span><span className="text-xs font-black text-[#8b9892]">{challenge.active ? "ACTIVE" : "COMPLETE"}</span></div>
            <h2 className="mt-8 text-xl font-black text-[#263a34]">{challenge.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#718078]">{challenge.detail}</p>
            <div className="mt-8 flex justify-between text-xs font-bold"><span className="text-[#263a34]">{challenge.value}</span><span className="text-[#e45522]">{challenge.progress}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7ebe8]"><div className="h-full rounded-full bg-[#ff6b35]" style={{ width: `${challenge.progress}%` }} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}
