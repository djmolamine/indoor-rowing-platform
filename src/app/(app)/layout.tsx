import { DashboardShell } from "@/components/dashboard-shell";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if(!hasSupabaseConfig())redirect("/sign-in?error=Authentication%20is%20not%20configured%20for%20this%20environment");
  const {data:{user}}=await (await createClient()).auth.getUser();if(!user)redirect("/sign-in");
  return <DashboardShell>{children}</DashboardShell>;
}
