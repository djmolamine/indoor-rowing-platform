import Link from "next/link";
import { Bell, Plus } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { Brand } from "@/components/brand";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { signOut } from "@/app/(auth)/auth-actions";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = hasSupabaseConfig() ? (await (await createClient()).auth.getUser()).data.user : null;
  const initials = user?.user_metadata?.display_name?.split(" ").map((part: string) => part[0]).join("").slice(0, 2).toUpperCase() || "MD";
  return (
    <div className="min-h-screen bg-[#f5f7f4] md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-[#dfe5e1] bg-white px-4 py-6 md:sticky md:top-0 md:flex md:h-screen md:flex-col">
        <div className="px-2"><Brand /></div>
        <div className="mt-10"><AppNav /></div>
        <div className="mt-auto rounded-2xl bg-[#0d2b24] p-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8eb4a8]">Current journey</p>
          <p className="mt-2 text-lg font-black">The Danube</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs"><div><p className="text-[#8eb4a8]">Location</p><p className="mt-1 font-black">Ulm</p></div><div><p className="text-[#8eb4a8]">Next</p><p className="mt-1 font-black">Passau</p></div><div><p className="text-[#8eb4a8]">Today</p><p className="mt-1 font-black">12.4 km</p></div><div><p className="text-[#8eb4a8]">Remaining</p><p className="mt-1 font-black">2,421 km</p></div></div>
          <Link href="/expeditions/danube" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-white px-3 text-xs font-black text-[#0d2b24]">Quick resume</Link>
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
                <Plus size={17} aria-hidden="true" /> Log workout
              </Link>
              <Link href="/settings" className="hidden max-w-52 text-right sm:block"><span className="block truncate text-xs font-bold text-[#263a34]">{user?.email ?? "Prototype account"}</span><span className="block text-[10px] text-[#718078]">{user?.email_confirmed_at ? "Verified email" : user ? "Verification pending" : "Supabase not configured"}</span></Link>
              <div className="grid size-10 place-items-center rounded-full bg-[#d4e8e1] text-sm font-black text-[#0d2b24]" aria-label="User profile">{initials}</div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 lg:px-8 md:pb-10">{children}</main>
      </div>
      <div className="md:hidden"><AppNav /></div>
      <form action={signOut} className="sr-only"><button>Sign out</button></form>
    </div>
  );
}
