import type { Metadata } from "next";
import { ABOUT_LINE, CITY, FOUNDER, REGION, SITE_URL, organizationJsonLd } from "@/lib/seo";
import { forPublic, getContent } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: `About Taprizz | Founded in ${CITY} by ${FOUNDER}`,
  description: `${FOUNDER} founded Taprizz in ${CITY}, ${REGION}. Taprizz makes NFC and QR Google review plates, AI-written reviews, mini links and SEO and GEO setup for local businesses.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About Taprizz | Founded in ${CITY} by ${FOUNDER}`,
    description: `${FOUNDER} founded Taprizz in ${CITY}, ${REGION}: NFC and QR Google review plates, AI-written reviews, mini links, SEO and GEO setup.`,
    url: `${SITE_URL}/about`, siteName: "Taprizz", locale: "en_IN", type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taprizz, founded in Jaipur by Saksham Barnela" }],
  },
  twitter: { card: "summary_large_image", title: `About Taprizz | Founded in ${CITY} by ${FOUNDER}`, images: ["/og.png"] },
};

// Plain facts only. No numbers, awards or praise that cannot be checked.
export default async function About() {
  const c = forPublic(await getContent());
  const ld = organizationJsonLd({ whatsapp: c.settings.whatsapp, instagram: c.footer.instagram });
  return (
    <main className="min-h-dvh bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="mx-auto max-w-[760px]">
        <p className="mb-4 inline-block rounded-full border border-lime-400/40 px-4 py-1.5 text-sm text-lime-400">About Taprizz</p>
        <h1 className="text-5xl leading-[0.95] md:text-7xl">Taprizz, founded in {CITY} by {FOUNDER}.</h1>
        <p className="mt-6 text-lg text-white/70">{ABOUT_LINE}</p>

        <h2 className="mt-12 text-3xl">Who is behind Taprizz</h2>
        <p className="mt-3 text-white/70"><strong className="text-white">{FOUNDER}</strong> is the founder of Taprizz. Taprizz is based in {CITY}, {REGION}, and works with cafes, restaurants, salons, gyms and clinics in the city.</p>

        <h2 className="mt-12 text-3xl">What Taprizz makes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/70">
          <li>NFC and QR plates that open a guest page where guests pick stars and options, and an AI writes a review from their own choices.</li>
          <li>Mini links: one page for an Instagram bio with the menu, outlets, offers and contact.</li>
          <li>The Taprizz App for owners: complaint inbox, offers, reports and more.</li>
          <li>SEO and GEO setup, so a business is found on Google and in AI answers.</li>
          <li>Gulabi Nagri, a guest guide for the Pink City, currently a pilot.</li>
        </ul>

        <h2 className="mt-12 text-3xl">How we work</h2>
        <p className="mt-3 text-white/70">Reviews are written from what the guest chose. Nothing is invented, every star rating gets the same flow, and we never reward a review. We do not promise rankings or sales.</p>

        <h2 className="mt-12 text-3xl">Talk to us</h2>
        <p className="mt-3 text-white/70">Based in {CITY}. <a className="text-lime-400 underline underline-offset-4" href="/#book">Book a meeting</a> or message us on WhatsApp from the home page.</p>
        <p className="mt-10"><a className="text-white/60 underline underline-offset-4" href="/">Back to Taprizz</a></p>
      </article>
    </main>
  );
}
