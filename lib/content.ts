import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

// Older saved rows predate some fields; fill them so the admin editor always shows them.
const normalize = (c: SiteContent): SiteContent => ({ ...c, products: (c.products ?? []).map((p) => ({ ...p, salePrice: p.salePrice ?? 0 })) });

export async function getContent(): Promise<SiteContent> {
  const db = supabaseAnon();
  if (!db) return defaultContent;
  try {
    const { data } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
    return normalize({ ...defaultContent, ...(data?.data ?? {}) } as SiteContent);
  } catch {
    return defaultContent;
  }
}

export async function getContentAdmin(): Promise<SiteContent> {
  const db = supabaseAdmin();
  if (!db) return defaultContent;
  const { data } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
  return normalize({ ...defaultContent, ...(data?.data ?? {}) } as SiteContent);
}
