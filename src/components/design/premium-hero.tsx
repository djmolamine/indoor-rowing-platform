import type { ReactNode } from "react";

export function PremiumHero({ eyebrow, title, accent, description, actions, meta, className="" }: { eyebrow:string; title:string; accent?:string; description:string; actions?:ReactNode; meta?:ReactNode; className?:string }) {
  return <header className={`wake-lines rowing-lanes relative isolate overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_86%_20%,rgba(22,124,147,.32),transparent_26%),linear-gradient(125deg,#071d18,#0d2b24_55%,#164c3e)] px-5 py-9 text-white shadow-[0_30px_90px_rgba(8,31,25,.18)] sm:px-9 sm:py-12 lg:px-12 lg:py-16 ${className}`}>
    <div className="relative z-10 max-w-4xl">
      <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#9fd1c2]">{eyebrow}</p>
      <h1 className="display-type mt-5 text-5xl font-black leading-[.88] sm:text-6xl lg:text-7xl">{title}{accent&&<><br/><span className="text-[#ff7747]">{accent}</span></>}</h1>
      <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#c1d7d0] sm:text-base">{description}</p>
      {meta&&<div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-white/70">{meta}</div>}
      {actions&&<div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  </header>;
}
