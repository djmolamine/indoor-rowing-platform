import type { ReactNode } from "react";

export function SectionLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p className={`text-xs font-black uppercase tracking-[0.14em] ${inverse ? "text-[#9fc1b7]" : "text-[#687871]"}`}>
      {children}
    </p>
  );
}
