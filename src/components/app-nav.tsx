"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, IdCard, Medal, Route, Settings, Target, UsersRound } from "lucide-react";

const items = [
  { label: "Lobby", href: "/dashboard", icon: Home },
  { label: "Workouts", href: "/workouts", icon: Target },
  { label: "Passport", href: "/profile", icon: IdCard },
  { label: "Rankings", href: "/leaderboard", icon: Medal },
  { label: "Community", href: "/dashboard#community", icon: UsersRound },
  { label: "Expeditions", href: "/expeditions", icon: Route },
  { label: "Events", href: "/dashboard#event", icon: CalendarDays },
  { label: "Settings", href: "/profile#settings", icon: Settings },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#dfe5e1] bg-white/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-full items-center gap-1 overflow-x-auto md:max-w-none md:flex-col md:items-stretch md:gap-1 md:overflow-visible">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href && !href.includes("#");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[4.25rem] flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold transition md:min-w-0 md:flex-none md:flex-row md:gap-3 md:px-3 md:py-3 md:text-sm ${
                active ? "bg-[#eef3f0] text-[#0d2b24]" : "text-[#718078] hover:bg-[#f5f7f4] hover:text-[#263a34]"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
