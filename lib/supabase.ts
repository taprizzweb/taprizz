import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && anon);
export const hasAdminDb = Boolean(url && service);

// Never let Next's data cache serve stale rows: content edits must show up immediately.
const noStore: typeof fetch = (input, init) => fetch(input, { ...init, cache: "no-store" });
const opts = { auth: { persistSession: false }, global: { fetch: noStore } };

export const supabaseAnon = () => (url && anon ? createClient(url, anon, opts) : null);
export const supabaseAdmin = () => (url && service ? createClient(url, service, opts) : null);
