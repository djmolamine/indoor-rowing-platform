export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  return { url, publishableKey };
}

export function getAuthProviderConfig(){return {google:process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED==="true",apple:process.env.NEXT_PUBLIC_SUPABASE_APPLE_ENABLED==="true"};}

export function getApplicationUrl(){const value=process.env.NEXT_PUBLIC_APP_URL??process.env.NEXT_PUBLIC_SITE_URL;if(!value)throw new Error("NEXT_PUBLIC_APP_URL is required.");return value.replace(/\/$/,"");}
