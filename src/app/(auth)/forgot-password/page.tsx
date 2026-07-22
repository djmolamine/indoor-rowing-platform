import Link from "next/link";
import { AuthCard, authInputClass } from "@/components/auth/auth-card";
import { requestPasswordReset } from "../auth-actions";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const query = await searchParams;
  return <AuthCard eyebrow="Account recovery" title="Reset your password" description="We’ll send a secure reset link if the email belongs to a Rowform account.">{query.error && <p role="alert" className="mt-5 rounded-xl bg-[#fff1eb] p-3 text-sm font-bold text-[#a43f20]">{query.error}</p>}{query.message && <p role="status" className="mt-5 rounded-xl bg-[#eaf6f1] p-3 text-sm font-bold text-[#176a55]">{query.message}</p>}<form action={requestPasswordReset} className="mt-6 space-y-4"><label className="block text-xs font-bold text-[#475b54]">Account email<input className={authInputClass} name="email" type="email" autoComplete="email" required /></label><button className="min-h-12 w-full rounded-full bg-[#0d2b24] px-5 font-black text-white">Send reset link</button></form><Link href="/sign-in" className="mt-5 block text-center text-sm font-black text-[#16725e] underline">Return to sign in</Link></AuthCard>;
}
