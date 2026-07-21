import Link from "next/link";
import { ArrowRight, Check, Gauge, Layers3, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";

const benefits = [
  {
    icon: Layers3,
    title: "Every machine, one history",
    body: "Bring together sessions from connected equipment, uploads, photos, or manual entry.",
  },
  {
    icon: Gauge,
    title: "Metrics that make sense",
    body: "See pace, power, stroke rate, heart rate, and distance in one consistent format.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Keep a portable training record that does not disappear when you change equipment.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f4]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Brand />
        <nav className="flex items-center gap-2" aria-label="Landing navigation">
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#263a34] transition hover:bg-white sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-[#0d2b24] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#16483d]"
          >
            View demo
          </Link>
        </nav>
      </header>

      <section className="surface-grid relative border-y border-[#dfe5e1]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-28">
          <div className="rise relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfd8d3] bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#4b5e57]">
              <span className="size-2 rounded-full bg-[#ff6b35]" />
              Built for every indoor rower
            </div>
            <h1 className="display-type max-w-3xl text-[3.5rem] font-black leading-[0.94] text-[#0d2b24] sm:text-7xl lg:text-[5.5rem]">
              Every row.
              <br />
              One record.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#56665f] sm:text-xl">
              Your training should belong to you—not your machine. Rowform brings every indoor rowing workout into one clear, continuous history.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 font-black text-white shadow-[0_8px_30px_rgba(255,107,53,.25)] transition hover:bg-[#e65a27]"
              >
                Explore the dashboard <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cfd8d3] bg-white px-6 py-3 font-bold text-[#263a34] transition hover:border-[#9caaa4]"
              >
                How it works
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-[#697871]">
              <Check size={16} className="text-[#198767]" aria-hidden="true" /> No machine lock-in. No data silos.
            </p>
          </div>

          <div className="rise-delayed relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -left-16 top-12 size-36 rounded-full bg-[#ffd8c7] blur-3xl" />
            <div className="absolute -right-10 bottom-6 size-44 rounded-full bg-[#bce3d7] blur-3xl" />
            <div className="relative rotate-[1.5deg] rounded-[2rem] border border-white/70 bg-[#102f27] p-4 shadow-[0_30px_80px_rgba(13,43,36,.22)] sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8eb4a8]">Latest session</p>
                  <p className="mt-1 font-bold text-white">Tuesday steady row</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#cce0da]">WaterRower</span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-3">
                {[
                  ["10,000", "meters"],
                  ["42:18", "duration"],
                  ["2:06.9", "/500m"],
                  ["24", "strokes/min"],
                  ["177", "avg watts"],
                  ["146", "avg heart rate"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/[0.07] p-4">
                    <p className="text-xl font-black tracking-tight text-white sm:text-2xl">{value}</p>
                    <p className="mt-1 text-xs text-[#8eb4a8]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-[#f2f5f2] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#263a34]">Pace consistency</p>
                  <p className="text-xs font-bold text-[#198767]">Strong</p>
                </div>
                <div className="flex h-20 items-end gap-1.5" aria-label="Mock pace consistency chart">
                  {[52, 64, 58, 71, 68, 76, 72, 82, 75, 86, 79, 91, 85, 88, 94, 90].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-t bg-[#ff6b35]"
                      style={{ height: `${height}%`, opacity: 0.45 + index / 32 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e45522]">One platform, any rower</p>
          <h2 className="display-type mt-3 text-4xl font-black leading-tight text-[#0d2b24] sm:text-5xl">Built around your training, not a logo.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }, index) => (
            <article key={title} className="rounded-3xl border border-[#dfe5e1] bg-white p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#eef3f0] text-[#0d2b24]">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="text-xs font-black text-[#a3ada8]">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-black tracking-tight text-[#13211d]">{title}</h3>
              <p className="mt-3 leading-7 text-[#62706b]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#0d2b24] px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Brand light />
          <p className="text-sm text-[#9ab6ad]">A universal record for indoor rowing.</p>
        </div>
      </footer>
    </main>
  );
}
