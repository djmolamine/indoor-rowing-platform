import Link from "next/link";
import { Bell, Plus } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { Brand } from "@/components/brand";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7f4] md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-[#dfe5e1] bg-white px-4 py-6 md:sticky md:top-0 md:flex md:h-screen md:flex-col">
        <div className="px-2"><Brand /></div>
        <div className="mt-10"><AppNav /></div>
        <div className="mt-auto rounded-2xl bg-[#0d2b24] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8eb4a8]">This month</p>
          <p className="mt-2 text-2xl font-black">62.4 km</p>
          <p className="mt-1 text-xs text-[#a9c1ba]">8 sessions completed</p>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-[#dfe5e1] bg-[#f5f7f4]/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="md:hidden"><Brand /></div>
            <p className="hidden text-sm font-bold text-[#718078] md:block">Tuesday, 21 July</p>
            <div className="flex items-center gap-2">
              <button className="grid size-10 place-items-center rounded-full border border-[#dfe5e1] bg-white text-[#263a34]" aria-label="Notifications">
                <Bell size={18} aria-hidden="true" />
              </button>
              <Link href="/workouts" className="hidden min-h-10 items-center gap-2 rounded-full bg-[#ff6b35] px-4 text-sm font-black text-white sm:inline-flex">
                <Plus size={17} aria-hidden="true" /> Add workout
              </Link>
              <div className="grid size-10 place-items-center rounded-full bg-[#d4e8e1] text-sm font-black text-[#0d2b24]" aria-label="User profile">MD</div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 lg:px-8 md:pb-10">{children}</main>
      </div>
      <div className="md:hidden"><AppNav /></div>
    </div>
  );
}
