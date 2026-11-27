// One place for the facts search engines and AI answers read about Taprizz. Only true, checkable facts go here.
export const SITE_URL = "https://www.taprizz.in";
export const FOUNDER = "Saksham Barnela";
export const CITY = "Jaipur";
export const REGION = "Rajasthan";
export const ABOUT_LINE = `Taprizz is a Jaipur company, founded by ${FOUNDER}, that helps cafes, restaurants, salons and clinics get honest Google reviews with NFC and QR plates, AI-written reviews from the guest's own choices, a mini link for Instagram, and SEO and GEO setup.`;

export function organizationJsonLd(o: { whatsapp?: string; instagram?: string }) {
  const sameAs = [o.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "Taprizz", url: SITE_URL, logo: `${SITE_URL}/logo-light.svg`, image: `${SITE_URL}/og.png`,
        description: ABOUT_LINE, slogan: "Reviews, followers and repeat guests from one tap.",
        founder: { "@id": `${SITE_URL}/#founder` },
        address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "IN" },
        areaServed: { "@type": "City", name: CITY },
        ...(sameAs.length ? { sameAs } : {}),
        ...(o.whatsapp ? { contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: `+${o.whatsapp.replace(/\D/g, "")}`, areaServed: "IN", availableLanguage: ["English", "Hindi"] }] } : {}),
      },
      { "@type": "Person", "@id": `${SITE_URL}/#founder`, name: FOUNDER, jobTitle: "Founder", worksFor: { "@id": `${SITE_URL}/#org` }, url: `${SITE_URL}/about`, workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "IN" } } },
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: "Taprizz", publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en-IN" },
    ],
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.slice(0, 20).map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) };
}
