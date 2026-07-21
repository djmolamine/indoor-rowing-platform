import type { ReactNode } from "react";

export function PassportSection({ id, eyebrow, title, description, action, children }: { id?: string; eyebrow: string; title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-[#dfe5e1] bg-white p-5 sm:p-6 lg:p-7" aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#687871]">{eyebrow}</p>
          <h2 id={id ? `${id}-title` : undefined} className="mt-2 text-2xl font-black tracking-tight text-[#13211d]">{title}</h2>
          {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687871]">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
