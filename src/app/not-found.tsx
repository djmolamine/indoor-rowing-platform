import Link from "next/link";
import { ArrowLeft, Waves } from "lucide-react";
import { Brand } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="rowing-lanes min-h-screen bg-[#071d18] px-5 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
        <Brand light />
        <section className="my-auto max-w-3xl py-16">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#9fcabf]">404 · Off course</p>
          <Waves className="mt-8 text-[#ff8055]" size={44} aria-hidden="true" />
          <h1 className="display-type mt-6 text-6xl font-black leading-[.88] sm:text-8xl">This route leaves the water.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/65">The Rowform page you followed does not exist or has moved to a permanent new route.</p>
          <Link href="/dashboard" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-black text-white"><ArrowLeft size={17} /> Return to the Lobby</Link>
        </section>
      </div>
    </main>
  );
}
