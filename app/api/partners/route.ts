import { NextResponse } from "next/server";
import { forPublic, getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 60;

// The partners list for other pages (the Taprizz mini link shows it). One list, kept here: when it changes, those pages change too within a minute.
export async function GET() {
  const c = forPublic(await getContent());
  const partners = c.partners.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    about: p.about ?? "",
    image: p.image ? (/^https?:/i.test(p.image) ? p.image : `${SITE_URL}${p.image}`) : "",
  }));
  return NextResponse.json({ partners }, { headers: { "access-control-allow-origin": "*", "cache-control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
