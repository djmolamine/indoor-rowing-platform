import { Crown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { leaderboard } from "@/lib/mock-data";

export default function LeaderboardPage() {
  return (
    <div>
      <SectionHeading eyebrow="July · All machines" title="Leaderboard" description="A friendly monthly distance table across the Rowform community." />
      <section className="mt-8 overflow-hidden rounded-3xl border border-[#dfe5e1] bg-white">
        {leaderboard.map((row) => (
          <article key={row.rank} className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 border-b border-[#e7ebe8] p-4 last:border-0 sm:px-6 ${row.current ? "bg-[#fff8f4]" : ""}`}>
            <div className="text-center font-black text-[#718078]">{row.rank === 1 ? <Crown className="mx-auto text-[#e0a528]" size={21} /> : row.rank}</div>
            <div className="flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dceae5] text-xs font-black text-[#0d2b24]">{row.initials}</span><div className="min-w-0"><h2 className="truncate font-black text-[#263a34]">{row.name}</h2>{row.current && <p className="text-xs font-bold text-[#e45522]">You</p>}</div></div>
            <div className="text-right"><p className="font-black text-[#263a34]">{row.distance}</p><p className={`text-xs font-bold ${row.change.startsWith("+") ? "text-[#198767]" : "text-[#8b9892]"}`}>{row.change}</p></div>
          </article>
        ))}
      </section>
    </div>
  );
}
