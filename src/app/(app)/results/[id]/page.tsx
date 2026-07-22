import { notFound } from "next/navigation";
import { PerformanceDetail } from "@/components/performance/performance-detail";
import { RESULT_RECORDS,resolveResultView } from "@/lib/performance-records";
import { EVENT_RESULTS } from "@/lib/events/data";
import { RANKING_RECORDS } from "@/lib/rankings/data";

export function generateStaticParams(){return [...new Set([...RESULT_RECORDS.map(({id})=>id),...EVENT_RESULTS.map(({id})=>id),...RANKING_RECORDS.map(({id})=>id)])].map((id)=>({id}));}
export default async function ResultDetailPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const view=resolveResultView(id);if(!view)notFound();return <PerformanceDetail workout={view.workout} result={view.result}/>;}
