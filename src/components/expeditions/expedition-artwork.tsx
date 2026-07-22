const positions:Record<string,string>={nile:"0% 0%",danube:"33.333% 0%",rhine:"66.667% 0%",thames:"100% 0%",mississippi:"0% 100%",amazon:"33.333% 100%",mekong:"66.667% 100%",murray:"100% 100%"};

export function ExpeditionArtwork({ slug, className="" }:{slug:string;className?:string}) {
  return <div className={`expedition-art water-shift absolute inset-0 bg-cover ${className}`} style={{backgroundPosition:positions[slug]??"50% 50%"}} role="img" aria-label={`Cinematic view inspired by the ${slug} river journey`}><div className="absolute inset-0 bg-gradient-to-t from-[#061914]/90 via-[#0d2b24]/10 to-black/20"/></div>;
}
