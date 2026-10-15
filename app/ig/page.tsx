import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, PlayCircle, ShoppingBag } from "lucide-react";
import { getContent } from "@/lib/content";
import { IgLeadForm } from "./IgLeadForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Taprizz — Get more Google reviews",
  description: "Links from the Taprizz Instagram: live demo, plaques and WhatsApp.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

// Link-in-bio page for @taprizz.in. Use https://taprizz.in/ig?src=bio (or src=reel, src=story, src=dm) so leads show their source.
export default async function Ig({ searchParams }: { searchParams: { src?: string } }) {
  const c = await getContent();
  const s = c.settings;
  const src = `instagram-${(searchParams.src ?? "bio").replace(/[^a-z0-9_-]/gi, "").slice(0, 20) || "bio"}`;
  const wa = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hi Taprizz, I'm from Instagram (${src}). I want more Google reviews for my business.`)}`;
  const btn = "flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left text-white transition hover:border-lime-400";
  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto max-w-md space-y-8">
        <header className="text-center">
          <img src="/logo-light.svg" alt={s.brand} className="mx-auto h-14 w-auto" />
          <h1 className="mt-5 text-3xl leading-tight">More 5-star Google reviews with one tap</h1>
          <p className="mt-2 text-white/60">NFC + QR review plaques with Gemini AI, made in Jaipur.</p>
        </header>
        <nav className="space-y-3" aria-label="Links">
          <a href={wa} className="flex w-full items-center justify-between rounded-2xl bg-lime-400 px-5 py-4 font-semibold text-black"><span className="flex items-center gap-3"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</span><ArrowUpRight className="h-4 w-4" /></a>
          <a href="https://reviews.taprizz.in/s/001" className={btn}><span className="flex items-center gap-3"><PlayCircle className="h-5 w-5" /> Try the live demo</span><ArrowUpRight className="h-4 w-4" /></a>
          <a href="/#shop" className={btn}><span className="flex items-center gap-3"><ShoppingBag className="h-5 w-5" /> Plaques &amp; pricing</span><ArrowUpRight className="h-4 w-4" /></a>
          <a href="/" className={btn}><span>Visit taprizz.in</span><ArrowUpRight className="h-4 w-4" /></a>
        </nav>
        <section aria-labelledby="ig-lead">
          <h2 id="ig-lead" className="mb-4 text-xl">Free demo for your business</h2>
          <IgLeadForm source={src} />
        </section>
      </div>
    </main>
  );
}
