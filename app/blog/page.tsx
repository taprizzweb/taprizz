import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { posts } from "@/lib/posts";
import { Footer } from "@/components/sections/Footerish";

export const metadata: Metadata = {
  title: "Taprizz Blog — Google Review Tips for Jaipur Businesses",
  description: "Practical guides on getting more genuine Google reviews for cafes, salons and premium stores in Jaipur.",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const c = await getContent();
  return (
    <>
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label={c.settings.brand}><img src="/logo-light.svg" alt={c.settings.brand} className="h-9 w-auto" /></Link>
          <Link href="/" className="text-sm text-white/70 hover:text-lime-400">← Back to site</Link>
        </div>
      </header>
      <main className="grid-light px-5 py-16 text-ink md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl md:text-6xl">Taprizz Blog</h1>
          <p className="mt-4 text-black/60">Practical tips for earning more genuine Google reviews.</p>
          <ul className="mt-10 space-y-6">
            {posts.map((p) => (
              <li key={p.slug} className="rounded-2xl border border-black/10 bg-white p-6">
                <h2 className="text-2xl"><Link href={`/blog/${p.slug}`} className="hover:underline">{p.title}</Link></h2>
                <p className="mt-2 text-black/60">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer c={c} />
    </>
  );
}
