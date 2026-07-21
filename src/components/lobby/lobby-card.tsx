import type { ReactNode } from "react";

interface LobbyCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "deep" | "warm";
}

const tones = {
  light: "border-[#dfe5e1] bg-white text-[#13211d]",
  deep: "border-[#173d34] bg-[#0d2b24] text-white",
  warm: "border-[#f1cfbf] bg-[#fff7f2] text-[#13211d]",
};

export function LobbyCard({ children, className = "", id, tone = "light" }: LobbyCardProps) {
  return (
    <section id={id} className={`rounded-3xl border p-5 sm:p-6 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
