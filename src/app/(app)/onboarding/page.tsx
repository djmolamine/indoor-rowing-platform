import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="mx-auto max-w-3xl"><p className="text-xs font-black uppercase tracking-[.16em] text-[#d94d1c]">A useful start</p><h1 className="display-type mt-3 text-4xl font-black sm:text-5xl">Set up your athlete identity</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-[#62706b]">We need three details to operate your account safely. Everything else is optional and tied to a visible benefit.</p>{error && <p role="alert" className="mt-5 rounded-xl bg-[#fff1eb] p-3 text-sm font-bold text-[#a43f20]">{error}</p>}<section className="mt-6 rounded-3xl border border-[#dfe5e1] bg-white p-5 sm:p-7"><OnboardingForm /></section></div>;
}
