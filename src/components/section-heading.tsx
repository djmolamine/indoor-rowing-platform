export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="wake-lines rowing-lanes relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_85%_20%,rgba(22,124,147,.28),transparent_25%),linear-gradient(125deg,#081f19,#0d2b24)] px-5 py-9 text-white shadow-[0_24px_70px_rgba(13,43,36,.14)] sm:px-9 sm:py-12">
      <div className="relative z-10 max-w-3xl"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#9fcabf]">{eyebrow}</p><h1 className="display-type mt-4 text-5xl font-black leading-[.9] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#c4d7d1] sm:text-base">{description}</p></div>
    </header>
  );
}
