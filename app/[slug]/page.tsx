import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getContent } from "@/lib/content";
import { landings, landingBySlug } from "@/lib/landing";
import { SITE_URL } from "@/lib/site";
import { Footer } from "@/components/sections/Footerish";

export const dynamicParams = false;
export const generateStaticParams = () => landings.map((l) => ({ slug: l.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const l = landingBySlug(params.slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { type: "article", url: `/${l.slug}`, title: l.title, description: l.description, locale: "en_IN", images: [{ url: "/plaques/graphite.png", width: 1181, height: 1181 }] },
  };
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const l = landingBySlug(params.slug);
  if (!l) notFound();
  const c = await getContent();
  const s = c.settings;
  const url = `${SITE_URL}/${l.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name: l.title, description: l.description, isPartOf: { "@id": `${SITE_URL}/#site` }, inLanguage: "en-IN" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: l.h1, item: url }] },
      { "@type": "FAQPage", mainEntity: l.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  const wa = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hi Taprizz, I found you via "${l.h1}". I'd like to know more.`)}`;
  const related = landings.filter((x) => x.slug !== l.slug).slice(0, 4);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label={s.brand}><img src="/logo-light.svg" alt={s.brand} className="h-9 w-auto" /></Link>
          <Link href="/#shop" className="text-sm text-white/70 hover:text-lime-400">Shop plaques</Link>
        </div>
      </header>
      <main>
        <section className="bg-black px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50"><Link href="/" className="hover:text-lime-400">Home</Link> / {l.keyword}</nav>
            <h1 className="text-4xl leading-tight md:text-6xl">{l.h1}</h1>
            <p className="mt-6 text-lg text-white/70">{l.lead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={wa} className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300"><MessageCircle className="h-4 w-4" /> Talk to us on WhatsApp</a>
              {l.demoUrl && <a href={l.demoUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-lime-400 px-7 py-3.5 text-lime-400 transition hover:bg-lime-400 hover:text-black">Try the live demo <ArrowUpRight className="h-4 w-4" /></a>}
              <Link href="/#shop" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-white transition hover:border-lime-400 hover:text-lime-400">See plaques &amp; pricing <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
        <article className="grid-light px-5 py-16 text-ink md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl space-y-12">
            {l.sections.map((sec) => (
              <section key={sec.h2}>
                <h2 className="text-3xl md:text-4xl">{sec.h2}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/70">{sec.body}</p>
                {sec.bullets && <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] text-black/70">{sec.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </section>
            ))}
            <section>
              <h2 className="text-3xl md:text-4xl">Frequently asked questions</h2>
              <dl className="mt-4 space-y-5">
                {l.faq.map((f) => (<div key={f.q}><dt className="font-semibold">{f.q}</dt><dd className="mt-1 text-black/70">{f.a}</dd></div>))}
              </dl>
            </section>
            <section className="rounded-3xl bg-black p-8 text-white">
              <h2 className="text-3xl">Ready to get more Google reviews?</h2>
              <p className="mt-3 text-white/70">We are onboarding a limited number of premium businesses in Jaipur. Message us and we will set up your page and plaque.</p>
              <a href={wa} className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black hover:bg-lime-300"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            </section>
            <nav aria-label="Related pages">
              <h2 className="text-xl">Related</h2>
              <ul className="mt-3 space-y-2">{related.map((r) => (<li key={r.slug}><Link href={`/${r.slug}`} className="text-black/70 underline hover:text-black">{r.h1}</Link></li>))}</ul>
            </nav>
          </div>
        </article>
      </main>
      <Footer c={c} />
    </>
  );
}
