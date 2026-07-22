import { notFound } from "next/navigation";
import { ExpeditionDetail } from "@/components/expeditions/expedition-detail";
import { EXPEDITIONS, getExpedition } from "@/lib/expeditions/catalogue";

export function generateStaticParams() {
  return EXPEDITIONS.map((expedition) => ({ slug: expedition.slug }));
}

export default async function ExpeditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) notFound();
  return <ExpeditionDetail expedition={expedition} />;
}
