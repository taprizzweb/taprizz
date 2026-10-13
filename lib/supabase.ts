import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && anon);
export const hasAdminDb = Boolean(url && service);

export const supabaseAnon = () => (url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null);
export const supabaseAdmin = () => (url && service ? createClient(url, service, { auth: { persistSession: false } }) : null);
