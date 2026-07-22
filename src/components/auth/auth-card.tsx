export const authInputClass = "mt-1.5 min-h-11 w-full rounded-xl border border-[#ccd6d1] bg-white px-3 text-sm font-bold outline-none focus:border-[#16725e] focus:ring-2 focus:ring-[#16725e]/20";

export function AuthCard({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="mt-8 rounded-[1.75rem] border border-[#dfe5e1] bg-white p-5 shadow-[0_20px_60px_rgba(18,42,35,.08)] sm:p-7"><p className="text-xs font-black uppercase tracking-[.16em] text-[#d94d1c]">{eyebrow}</p><h1 className="mt-2 text-3xl font-black text-[#0d2b24]">{title}</h1><p className="mt-3 text-sm leading-6 text-[#62706b]">{description}</p>{children}</section>;
}
