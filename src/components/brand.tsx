import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Rowform home">
      <span
        className={`grid size-8 place-items-center rounded-full border-2 text-sm font-black ${
          light ? "border-white text-white" : "border-[#0d2b24] text-[#0d2b24]"
        }`}
      >
        R
      </span>
      <span className={`text-lg font-black tracking-[-0.04em] ${light ? "text-white" : "text-[#13211d]"}`}>
        ROWFORM
      </span>
    </Link>
  );
}
