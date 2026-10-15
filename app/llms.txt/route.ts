import { SITE_URL } from "@/lib/site";
import { landings } from "@/lib/landing";
import { posts } from "@/lib/posts";

// Plain-text site summary for AI assistants and answer engines.
export function GET() {
  const body = `# Taprizz

> Taprizz makes NFC + QR Google review plaques with an AI-assisted review page, for premium cafes, salons and stores in Jaipur, Rajasthan, India. Instagram: @taprizz.in

## Pages
- [Home](${SITE_URL}/): products, pricing, plans, FAQ
${landings.map((l) => `- [${l.h1}](${SITE_URL}/${l.slug}): ${l.description}`).join("\n")}

## Blog
${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
