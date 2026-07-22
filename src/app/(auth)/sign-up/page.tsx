import Link from "next/link";
import { AuthCard, authInputClass } from "@/components/auth/auth-card";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { signUp } from "../auth-actions";

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
  return <AuthCard eyebrow="Your lifelong record" title="Create an athlete account" description="Start with a secure account. Your Passport details and communication choices come later, with a clear reason.">
    <div className="mt-6"><OAuthButtons /></div>
    <div className="my-5 flex items-center gap-3 text-xs text-[#8a9691]"><span className="h-px flex-1 bg-[#e3e8e5]" />or use email<span className="h-px flex-1 bg-[#e3e8e5]" /></div>
    {query.error && <p role="alert" className="mb-4 rounded-xl bg-[#fff1eb] p-3 text-sm font-bold text-[#a43f20]">{query.error}</p>}
    <form action={signUp} className="space-y-4">
      <label className="block text-xs font-bold text-[#475b54]">Email<input className={authInputClass} name="email" type="email" autoComplete="email" required /></label>
      <label className="block text-xs font-bold text-[#475b54]">Password<input className={authInputClass} name="password" type="password" autoComplete="new-password" minLength={8} required /><span className="mt-1 block text-[11px] font-normal text-[#718078]">At least eight characters. Use a unique password.</span></label>
      <label className="flex items-start gap-3 text-xs leading-5 text-[#62706b]"><input type="checkbox" name="legalAccepted" required className="mt-1 size-4 accent-[#16725e]" />I accept the current Terms and Privacy Notice.</label>
      <button className="min-h-12 w-full rounded-full bg-[#ff6b35] px-5 font-black text-white hover:bg-[#e95b29]">Create account</button>
    </form>
    <p className="mt-5 text-center text-sm text-[#62706b]">Already registered? <Link href="/sign-in" className="font-black text-[#16725e] underline">Sign in</Link></p>
  </AuthCard>;
}
