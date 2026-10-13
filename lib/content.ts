import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

// Older saved rows predate some fields; fill them so the admin editor always shows them.
const normalize = (c: SiteContent): SiteContent => ({ ...c, products: (c.products ?? []).map((p) => ({ ...p, salePrice: p.salePrice ?? 0 })) });

// Public pages render on the server, so they read with the service key when it exists
// (no dependence on anon-key/RLS setup). The key never reaches the browser.
export async function getContent(): Promise<SiteContent> {
  const db = supabaseAdmin() ?? supabaseAnon();
  if (!db) return defaultContent;
  try {
    const { data, error } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
    if (error) console.error("site_content read failed:", error.message);
    return normalize({ ...defaultContent, ...(data?.data ?? {}) } as SiteContent);
  } catch (e) {
    console.error("site_content read threw:", e);
    return defaultContent;
  }
}

export async function getContentAdmin(): Promise<SiteContent> {
  const db = supabaseAdmin();
  if (!db) return defaultContent;
  const { data } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
  return normalize({ ...defaultContent, ...(data?.data ?? {}) } as SiteContent);
}
