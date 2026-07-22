import Link from "next/link";
import { Brand } from "@/components/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="surface-grid min-h-screen bg-[#f5f7f4] px-4 py-8 sm:py-14"><div className="mx-auto max-w-md"><Link href="/" className="inline-block"><Brand /></Link>{children}<p className="mt-6 text-center text-xs leading-5 text-[#718078]">Authentication email is required to operate your account and remains private. It never appears on your public Athlete Passport.</p></div></main>;
}
