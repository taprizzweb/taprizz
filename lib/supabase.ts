import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && anon);
export const hasAdminDb = Boolean(url && service);

// Never let Next's data cache serve stale rows: content edits must show up immediately.
const noStore: typeof fetch = (input, init) => fetch(input, { ...init, cache: "no-store", signal: AbortSignal.timeout(8000) });
const opts = { auth: { persistSession: false }, global: { fetch: noStore } };

// Public pages read content through this one: the answer is cached for a minute (and refreshed at once when Admin saves),
// and a database that does not answer within 3 seconds is skipped, so a page never waits on it.
const cachedFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: AbortSignal.timeout(3000), next: { revalidate: 60, tags: ["site-content"] } } as RequestInit);
const readOpts = { auth: { persistSession: false }, global: { fetch: cachedFetch } };
export const supabaseRead = () => {
  const key = service ?? anon;
  return url && key ? createClient(url, key, readOpts) : null;
};

export const supabaseAnon = () => (url && anon ? createClient(url, anon, opts) : null);
export const supabaseAdmin = () => (url && service ? createClient(url, service, opts) : null);
