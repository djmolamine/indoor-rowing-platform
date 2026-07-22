import { notFound } from "next/navigation";
import { PerformanceDetail } from "@/components/performance/performance-detail";
import { WORKOUT_RECORDS,workoutById } from "@/lib/performance-records";

export function generateStaticParams(){return WORKOUT_RECORDS.map(({id})=>({id}));}
export default async function WorkoutDetailPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const workout=workoutById(id);if(!workout)notFound();return <PerformanceDetail workout={workout}/>;}
