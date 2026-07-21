import { ShieldCheck } from "lucide-react";

export function VerificationBadge({ label, inverse = false }: { label: string; inverse?: boolean }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black ${inverse ? "bg-white/10 text-[#a9d7c8]" : "bg-[#e5f3ee] text-[#126650]"}`}><ShieldCheck size={13} aria-hidden="true" />{label}</span>;
}
