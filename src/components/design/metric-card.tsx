import type { ReactNode } from "react";

export function MetricCard({ label, value, detail, icon, tone="default" }: { label:string; value:string; detail?:string; icon?:ReactNode; tone?:"default"|"river"|"gold" }) {
  const palette=tone==="river"?"bg-[#eaf5f7] text-[#0d5868]":tone==="gold"?"bg-[#fff8e9] text-[#805814]":"bg-white text-[#13211d]";
  return <article className={`premium-card rounded-[1.4rem] p-5 ${palette}`}><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-black uppercase tracking-[.16em] opacity-65">{label}</p>{icon}</div><p className="metric-number mt-5 text-3xl font-black sm:text-4xl">{value}</p>{detail&&<p className="mt-2 text-xs font-semibold leading-5 opacity-65">{detail}</p>}</article>;
}
