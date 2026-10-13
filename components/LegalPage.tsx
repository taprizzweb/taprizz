import Link from "next/link";
import { getContent } from "@/lib/content";
import { Footer } from "@/components/sections/Footerish";

export async function LegalPage({ title, field }: { title: string; field: "terms" | "privacy" | "refund" }) {
  const c = await getContent();
  const blocks = c.legal[field].split(/\n\n+/);
  return (
    <>
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label={c.settings.brand}><img src="/logo-light.svg" alt={c.settings.brand} className="h-9 w-auto" /></Link>
          <Link href="/" className="text-sm text-white/70 hover:text-lime-400">← Back to site</Link>
        </div>
      </header>
      <main className="grid-light px-5 py-16 text-ink md:px-8 md:py-24">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-5xl leading-tight md:text-6xl">{title}</h1>
          <p className="mt-3 text-sm text-black/50">Last updated: {c.legal.updated}</p>
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-black/75">
            {blocks.map((b, i) =>
              b.startsWith("# ") ? <h2 key={i} className="pt-4 text-2xl text-ink">{b.slice(2)}</h2> : <p key={i} className="whitespace-pre-line">{b}</p>
            )}
          </div>
        </article>
      </main>
      <Footer c={c} />
    </>
  );
}
