import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getContent } from "@/lib/content";
import { posts, postBySlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { Footer } from "@/components/sections/Footerish";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = postBySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} | Taprizz`,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", url: `/blog/${p.slug}`, title: p.title, description: p.description, publishedTime: p.date, locale: "en_IN", images: [{ url: "/plaques/graphite.png", width: 1181, height: 1181 }] },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) notFound();
  const c = await getContent();
  const url = `${SITE_URL}/blog/${p.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    mainEntityOfPage: url,
    image: `${SITE_URL}/plaques/graphite.png`,
    author: { "@type": "Organization", name: c.settings.brand, url: SITE_URL },
    publisher: { "@type": "Organization", name: c.settings.brand, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } },
  };
  const wa = `https://wa.me/${c.settings.whatsapp}?text=${encodeURIComponent("Hi Taprizz, I read your blog and want to know more.")}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label={c.settings.brand}><img src="/logo-light.svg" alt={c.settings.brand} className="h-9 w-auto" /></Link>
          <Link href="/blog" className="text-sm text-white/70 hover:text-lime-400">← All articles</Link>
        </div>
      </header>
      <main className="grid-light px-5 py-16 text-ink md:px-8 md:py-24">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl leading-tight md:text-5xl">{p.title}</h1>
          <p className="mt-3 text-sm text-black/50">By {c.settings.brand} · {new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-black/75">
            {p.blocks.map((b, i) =>
              "h2" in b ? <h2 key={i} className="pt-4 text-2xl text-ink">{b.h2}</h2>
              : "ul" in b ? <ul key={i} className="list-disc space-y-2 pl-6">{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>
              : <p key={i}>{b.p}</p>
            )}
          </div>
          <div className="mt-12 rounded-3xl bg-black p-8 text-white">
            <h2 className="text-2xl">Want this set up for your business?</h2>
            <p className="mt-2 text-white/70">Taprizz NFC + QR plaques with an AI review page, made in Jaipur.</p>
            <a href={wa} className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black hover:bg-lime-300"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </article>
      </main>
      <Footer c={c} />
    </>
  );
}
