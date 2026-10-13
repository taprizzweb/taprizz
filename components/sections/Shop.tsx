"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Palette, Plus, ShoppingBag, Zap } from "lucide-react";
import type { Addon, Product, SiteContent } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { discounted, inr } from "@/lib/format";
import { Plaque } from "@/components/ui/Plaque";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const price = discounted(p.price, p.discount);
  const line = { kind: "product" as const, refId: p.id, name: p.name, unitPrice: price, image: p.images[0], qty };
  const out = p.stock <= 0;
  return (
    <SpotlightCard className="flex h-full flex-col">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-b from-[#16151c] to-ink p-6">
        {p.badge && <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold text-black">{p.badge}</span>}
        {p.discount > 0 && <span className="absolute right-4 top-4 z-10 rounded-full border border-gold-400/60 px-3 py-1 text-[11px] text-gold-300">{p.discount}% OFF</span>}
        {p.images[img] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.images[img]} alt={p.name} className="h-full w-full object-contain" />
        ) : (
          <Plaque variant={p.id.includes("luxe") ? "blue" : "graphite"} className="max-w-[230px]" />
        )}
      </div>
      {p.images.length > 1 && (
        <div className="flex gap-2 px-6 pt-3">
          {p.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <button key={i} onClick={() => setImg(i)} className={`h-12 w-12 overflow-hidden rounded-lg border ${i === img ? "border-gold-400" : "border-line"}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl">{p.name}</h3>
        <p className="mt-1 text-sm text-white/55">{p.tagline}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-white/70">
          {p.features.map((f) => (<li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold-400" />{f}</li>))}
        </ul>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-serif text-3xl text-gold-300">{inr(price)}</span>
          {p.discount > 0 && <span className="text-white/35 line-through">{inr(p.price)}</span>}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <div className="inline-flex items-center rounded-full border border-line">
            <button className="p-2.5" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button className="p-2.5" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))}><Plus className="h-4 w-4" /></button>
          </div>
          <button disabled={out} onClick={() => add(line)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold-400/50 px-4 py-2.5 text-sm text-gold-300 transition hover:bg-gold-400/10 disabled:opacity-40"><ShoppingBag className="h-4 w-4" /> {out ? "Sold out" : "Add to Cart"}</button>
          <button disabled={out} onClick={() => { add(line); router.push("/checkout"); }} className="shimmer-btn animate-shimmer flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-black disabled:opacity-40"><Zap className="h-4 w-4" /> Buy Now</button>
        </div>
      </div>
    </SpotlightCard>
  );
}

function AddonCard({ a }: { a: Addon }) {
  const { add, lines } = useCart();
  const has = lines.some((l) => l.kind === "addon" && l.refId === a.id);
  return (
    <SpotlightCard className="mx-auto mt-8 max-w-3xl p-6">
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-gold-400/40 bg-gold-400/10"><Palette className="h-6 w-6 text-gold-300" /></div>
        <div className="min-w-[200px] flex-1">
          <p className="text-xs uppercase tracking-widest text-gold-400">Add-on</p>
          <h4 className="font-serif text-xl">{a.name}</h4>
          <p className="text-sm text-white/55">{a.description}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl text-gold-300">+ {inr(a.price)}</p>
          <button disabled={has} onClick={() => add({ kind: "addon", refId: a.id, name: `Add-on: ${a.name}`, unitPrice: a.price })} className="mt-2 rounded-full border border-gold-400/50 px-5 py-2 text-sm text-gold-300 hover:bg-gold-400/10 disabled:opacity-50">{has ? "Added ✓" : "Add to order"}</button>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Shop({ c }: { c: SiteContent }) {
  const products = c.products.filter((p) => p.active);
  const addons = c.addons.filter((a) => a.active);
  return (
    <section id="shop" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Shop" title="Choose your Taprizz plaque" subtitle="Online payment only · Secure UPI · Dispatched across India" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (<Reveal key={p.id} delay={i * 0.08}><ProductCard p={p} /></Reveal>))}
        </div>
        {addons.map((a) => (<AddonCard key={a.id} a={a} />))}
      </div>
    </section>
  );
}
