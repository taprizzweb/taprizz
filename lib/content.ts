import { defaultContent } from "./defaults";
import { supabaseAdmin, supabaseAnon } from "./supabase";
import type { SiteContent } from "./types";

// Contact is Instagram-only. Saved rows may still hold a phone/WhatsApp number or text mentioning
// WhatsApp; drop those fields and fall back to the current default for any section that mentions them.
const mentionsRetiredContact = (v: unknown) => /whatsapp|wa\.me|9672999166|96729 ?99166/i.test(JSON.stringify(v ?? ""));
// The hero text this site shipped with before the two-offer page. A saved hero that still has it is replaced; an edited one is left alone.
const OLD_HERO_TITLE = "One tap turns a happy guest into a";
const OLD_FOOTER_TAGLINE = "AI-powered Google review plaques for premium businesses in Jaipur.";
const REFRESH_IF_STALE = ["faq", "legal", "footer", "hero"] as const;

const normalize = (raw: SiteContent): SiteContent => {
  const c = { ...raw } as SiteContent;
  for (const k of REFRESH_IF_STALE) if (mentionsRetiredContact(c[k])) (c as Record<string, unknown>)[k] = defaultContent[k];
  if (c.hero?.title === OLD_HERO_TITLE) c.hero = defaultContent.hero;
  c.footer = { ...defaultContent.footer, ...c.footer }; // a saved footer may hold only some fields
  if (c.footer?.tagline === OLD_FOOTER_TAGLINE) c.footer = { ...c.footer, tagline: defaultContent.footer.tagline };
  const settings = { ...defaultContent.settings, ...c.settings } as SiteContent["settings"] & { phone?: string; whatsapp?: string };
  delete settings.phone;
  delete settings.whatsapp;
  if (mentionsRetiredContact(settings.announcement)) settings.announcement = defaultContent.settings.announcement;
  return {
  ...c,
  settings,
  partners: Array.isArray(c.partners) ? c.partners.filter((p) => p?.name).map((p) => ({ ...p, slug: p.slug ?? "", addresses: Array.isArray(p.addresses) ? p.addresses.filter(Boolean) : [] })) : defaultContent.partners,
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
