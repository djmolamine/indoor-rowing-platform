export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#e45522]">{eyebrow}</p>
      <h1 className="display-type mt-1 text-4xl font-black text-[#0d2b24] sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#718078]">{description}</p>
    </div>
  );
}
