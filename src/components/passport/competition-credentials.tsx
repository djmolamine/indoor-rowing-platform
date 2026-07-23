import { BadgeCheck, ShieldCheck } from "lucide-react";
import type { AthleteCredential } from "@/lib/credentials/types";

export function CompetitionCredentials({ credentials }: { credentials: AthleteCredential[] }) {
  return (
    <section className="rounded-3xl border border-[#dfe5e1] bg-white p-5 sm:p-6 lg:p-7" aria-labelledby="competition-credentials-title">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#687871]">Official endorsements</p>
      <h2 id="competition-credentials-title" className="mt-2 text-2xl font-black tracking-tight">Competition Credentials</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687871]">Verified authorizations issued or approved by organizers and governing bodies. Athletes cannot edit these records.</p>
      {credentials.length === 0 ? (
        <div className="mt-6 flex gap-3 rounded-2xl bg-[#f5f7f4] p-4">
          <ShieldCheck className="shrink-0 text-[#16725e]" aria-hidden="true" />
          <div><p className="font-black">No verified competition credentials yet</p><p className="mt-1 text-sm leading-6 text-[#687871]">Credentials appear only after authorized review. Your Passport never asks you to self-declare official eligibility.</p></div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">{credentials.map((credential) => <article key={credential.id} className="rounded-2xl border border-[#cfe0d9] bg-[#f7fbf9] p-5"><div className="flex items-start justify-between gap-3"><BadgeCheck className="text-[#16725e]" aria-hidden="true" /><span className="rounded-full bg-[#dff3eb] px-3 py-1 text-[10px] font-black uppercase text-[#12604f]">{credential.status}</span></div><h3 className="mt-4 text-lg font-black">{credential.name}</h3><p className="mt-1 text-sm font-bold text-[#36534a]">{credential.issuingOrganization}</p><dl className="mt-4 space-y-2 border-t border-[#dce8e3] pt-4 text-xs">{credential.serialReference && <div><dt className="text-[#718078]">Reference</dt><dd className="font-bold">{credential.serialReference}</dd></div>}<div><dt className="text-[#718078]">Verified</dt><dd className="font-bold">{credential.verifiedAt} by {credential.verifiedBy}</dd></div><div><dt className="text-[#718078]">Expiry</dt><dd className="font-bold">{credential.expiresAt ?? "No expiry recorded"}</dd></div></dl></article>)}</div>
      )}
    </section>
  );
}
