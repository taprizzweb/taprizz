import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

export async function getContent(): Promise<SiteContent> {
  const db = supabaseAnon();
  if (!db) return defaultContent;
  try {
    const { data } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
    return { ...defaultContent, ...(data?.data ?? {}) } as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function getContentAdmin(): Promise<SiteContent> {
  const db = supabaseAdmin();
  if (!db) return defaultContent;
  const { data } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
  return { ...defaultContent, ...(data?.data ?? {}) } as SiteContent;
}
