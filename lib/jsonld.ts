import type { SiteContent } from "./types";
import { sellPrice } from "./format";
import { SITE_URL } from "./site";

// Structured data for Google rich results and AI answer engines.
export function buildJsonLd(c: SiteContent) {
  const s = c.settings;
  const org = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#org`,
    name: s.brand,
    alternateName: [`${s.brand}.in`, "Taprizz India", "Taprizz Jaipur"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/plaques/graphite.png`,
    description: c.footer.tagline,
    email: s.email,
    telephone: s.phone,
    address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    areaServed: { "@type": "City", name: "Jaipur" },
    sameAs: [c.footer.instagram].filter(Boolean),
  };
  const products = c.products.filter((p) => p.active).map((p) => ({
    "@type": "Product",
    name: p.name,
    description: [p.tagline, ...p.features].filter(Boolean).join(". "),
    image: (p.images[0] ? [p.images[0]] : [`/plaques/${p.id.includes("luxe") ? "blue" : "graphite"}.png`]).map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`)),
    brand: { "@type": "Brand", name: s.brand },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#shop`,
      priceCurrency: "INR",
      price: sellPrice(p),
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#org` },
    },
  }));
  const faq = {
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const site = { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: s.brand, alternateName: `${s.brand}.in`, publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en-IN" };
  return { "@context": "https://schema.org", "@graph": [org, site, ...products, faq] };
}
