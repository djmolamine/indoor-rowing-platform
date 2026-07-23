import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig, hasSupabaseConfig } from "./config";

const protectedPrefixes = ["/dashboard", "/workouts", "/passport", "/profile", "/rankings", "/leaderboard", "/challenges", "/expeditions", "/events", "/settings", "/onboarding"];

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseConfig()) {
    const protectedRequest = protectedPrefixes.some((prefix) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`));
    if (protectedRequest) return NextResponse.redirect(new URL("/sign-in?error=Authentication%20is%20not%20configured%20for%20this%20environment",request.url));
    return NextResponse.next({ request });
  }
  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const isProtected = protectedPrefixes.some((prefix) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`));
  const isAuthPage = request.nextUrl.pathname === "/sign-in" || request.nextUrl.pathname === "/sign-up";
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(url);
  }
  if (user && isAuthPage) return NextResponse.redirect(new URL("/dashboard", request.url));
  return response;
}
