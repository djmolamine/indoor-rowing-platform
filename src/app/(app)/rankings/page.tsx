import { RankingsExplorer } from "@/components/rankings/rankings-explorer";

export default async function RankingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <RankingsExplorer initialQuery={await searchParams} />;
}
