import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

// Older saved rows predate some fields; fill them so the admin editor always shows them.
// A video setting only counts if it is a real link or site path; blanks or stray text fall back to the bundled video.
const validVideo = (v?: string) => (v && /^(https?:\/\/|\/)\S+$/.test(v.trim()) ? v.trim() : null);

// Contact is Instagram-only. Saved rows may still hold a phone/WhatsApp number or text mentioning
// WhatsApp; drop those fields and fall back to the current default for any section that mentions them.
const mentionsRetiredContact = (v: unknown) => /whatsapp|wa\.me|9672999166|96729 ?99166/i.test(JSON.stringify(v ?? ""));
const REFRESH_IF_STALE = ["faq", "legal", "roadmap", "footer", "about", "hero", "audience", "importance", "showcase", "how", "demo", "comparison"] as const;

// Bundled videos (public/videos) are used until a different link is set in Admin → Settings.
const normalize = (raw: SiteContent): SiteContent => {
  const c = { ...raw } as SiteContent;
  for (const k of REFRESH_IF_STALE) if (mentionsRetiredContact(c[k])) (c as Record<string, unknown>)[k] = defaultContent[k];
  const settings = { ...c.settings } as SiteContent["settings"] & { phone?: string; whatsapp?: string };
  delete settings.phone;
  delete settings.whatsapp;
  if (mentionsRetiredContact(settings.announcement)) settings.announcement = defaultContent.settings.announcement;
  return {
  ...c,
  settings: {
    ...settings,
    introVideo: validVideo(c.settings.introVideo) ?? defaultContent.settings.introVideo,
    fullDemoVideo: validVideo(c.settings.fullDemoVideo) ?? defaultContent.settings.fullDemoVideo,
  },
  products: (c.products ?? []).map((p) => ({ ...p, salePrice: p.salePrice ?? 0 })),
  };
};

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

// The payment ID is only needed on the checkout page (for the QR). Keep it out of every other page's data.
export const forPublic = (c: SiteContent): SiteContent => ({ ...c, settings: { ...c.settings, upiId: "" } });
