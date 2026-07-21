export function RowingMotif() {
  return (
    <div className="relative h-40 w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-x-0 top-2 flex justify-between text-[9px] font-black tracking-[0.18em] text-white/35">
        <span>0 M</span><span>500 M</span><span>1,000 M</span><span>1,500 M</span><span>2,000 M</span>
      </div>
      <div className="absolute inset-x-0 top-9 h-px bg-white/15" />
      <div className="absolute left-[8%] right-[5%] top-[5.7rem] h-[3px] -rotate-3 rounded-full bg-white/55" />
      <div className="absolute left-[12%] top-[4.45rem] size-12 rounded-full border-[5px] border-white/70" />
      <div className="absolute left-[15.5%] top-[5.55rem] size-3 rounded-full bg-[#ff6b35]" />
      <div className="absolute left-[29%] top-[4.95rem] h-4 w-12 -rotate-3 rounded-sm bg-white/80" />
      <div className="absolute right-[12%] top-[3.7rem] h-16 w-[3px] rotate-[22deg] rounded-full bg-white/70" />
      <div className="absolute right-[5%] top-[3.1rem] h-[3px] w-12 rotate-[22deg] rounded-full bg-[#ff9a73]" />
      <div className="absolute inset-x-[4%] bottom-3 flex items-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((marker) => (
          <div key={marker} className="flex flex-1 items-center gap-2">
            <span className={`size-1.5 rounded-full ${marker < 4 ? "bg-[#ff6b35]" : "bg-white/25"}`} />
            {marker < 5 && <span className={`h-px flex-1 ${marker < 3 ? "bg-[#ff6b35]/70" : "bg-white/20"}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}
