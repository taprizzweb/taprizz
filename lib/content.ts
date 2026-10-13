import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

// Older saved rows predate some fields; fill them so the admin editor always shows them.
// A video setting only counts if it is a real link or site path; blanks or stray text fall back to the bundled video.
const validVideo = (v?: string) => (v && /^(https?:\/\/|\/)\S+$/.test(v.trim()) ? v.trim() : null);

// Bundled videos (public/videos) are used until a different link is set in Admin → Settings.
const normalize = (c: SiteContent): SiteContent => ({
  ...c,
  settings: {
    ...c.settings,
    introVideo: validVideo(c.settings.introVideo) ?? defaultContent.settings.introVideo,
    fullDemoVideo: validVideo(c.settings.fullDemoVideo) ?? defaultContent.settings.fullDemoVideo,
  },
  products: (c.products ?? []).map((p) => ({ ...p, salePrice: p.salePrice ?? 0 })),
});

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
