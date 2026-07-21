import { ChevronRight, Database, Ruler, Settings2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export default function ProfilePage() {
  return (
    <div>
      <SectionHeading eyebrow="Your account" title="Profile" description="Manage how Rowform presents and handles your rowing data." />
      <section className="mt-8 rounded-3xl border border-[#dfe5e1] bg-white p-5 sm:p-7">
        <div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-full bg-[#d4e8e1] text-xl font-black text-[#0d2b24]">MD</span><div><h2 className="text-xl font-black text-[#263a34]">Mohamed Djebbari</h2><p className="mt-1 text-sm text-[#718078]">Member since July 2026</p></div></div>
      </section>
      <section className="mt-5 overflow-hidden rounded-3xl border border-[#dfe5e1] bg-white">
        {[
          { icon: Ruler, title: "Units & preferences", note: "Meters · Kilograms" },
          { icon: Database, title: "Workout sources", note: "3 connected" },
          { icon: Settings2, title: "Account settings", note: "Privacy, export, and access" },
        ].map(({ icon: Icon, title, note }) => (
          <button key={title} className="flex w-full items-center gap-4 border-b border-[#e7ebe8] p-5 text-left last:border-0 sm:px-6">
            <span className="grid size-10 place-items-center rounded-xl bg-[#eef3f0] text-[#0d2b24]"><Icon size={19} /></span>
            <span className="flex-1"><strong className="block text-sm text-[#263a34]">{title}</strong><span className="mt-1 block text-xs text-[#718078]">{note}</span></span>
            <ChevronRight size={18} className="text-[#a3ada8]" />
          </button>
        ))}
      </section>
      <p className="mt-6 text-center text-xs text-[#8b9892]">Mock profile data · Authentication is not connected</p>
    </div>
  );
}
