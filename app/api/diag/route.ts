import { NextResponse } from "next/server";
import { supabaseAdmin, supabaseAnon } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Safe diagnostics: booleans and error text only, never keys or content.
export async function GET() {
  const out: Record<string, unknown> = {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    urlHost: process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host : null,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
  };
  for (const [name, db] of [["serviceRead", supabaseAdmin()], ["anonRead", supabaseAnon()]] as const) {
    if (!db) { out[name] = "no client (missing env)"; continue; }
    const { data, error } = await db.from("site_content").select("updated_at").eq("id", 1).maybeSingle();
    out[name] = error ? `ERROR: ${error.message}` : data ? `ok, row saved at ${data.updated_at}` : "ok, but no row saved yet";
  }
  return NextResponse.json(out);
}
