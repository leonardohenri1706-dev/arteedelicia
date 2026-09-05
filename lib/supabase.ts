import { createClient } from "@supabase/supabase-js";

function getClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return mock for build/SSR without configured Supabase
    if (typeof window === "undefined") {
      return null as any;
    }
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getClient();

export function getSupabaseAdmin() {
  if (typeof window !== "undefined") return null;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!url) return null;
  return createClient(url, serviceKey);
}