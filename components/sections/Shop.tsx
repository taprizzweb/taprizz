"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Palette, Plus, ShoppingBag, Zap } from "lucide-react";
import type { Addon, Product, SiteContent } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { inr, offPercent, sellPrice } from "@/lib/format";
import { Plaque } from "@/components/ui/Plaque";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const price = sellPrice(p);
  const off = offPercent(p);
  const line = { kind: "product" as const, refId: p.id, name: p.name, unitPrice: price, image: p.images[0], qty };
  const out = p.stock <= 0;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-lime-400 text-black">
      <div className="relative grid aspect-[5/4] place-items-center p-8">
        {p.badge && <span className="absolute left-5 top-5 z-10 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white">{p.badge}</span>}
        {off > 0 && <span className="absolute right-5 top-5 z-10 rounded-full border-2 border-black px-4 py-1 text-xs font-bold">{off}% OFF</span>}
        {p.images[img] ? <img src={p.images[img]} alt={p.name} className="h-full w-full object-contain" /> : <Plaque variant={p.id.includes("luxe") ? "blue" : "graphite"} className="max-w-[250px] border-black/20 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]" />}
      </div>
      {p.images.length > 1 && (
        <div className="flex gap-2 px-8">
          {p.images.map((src, i) => (<button key={i} onClick={() => setImg(i)} className={`h-12 w-12 overflow-hidden rounded-lg border-2 ${i === img ? "border-black" : "border-transparent"}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>))}
        </div>
      )}
      <div className="flex flex-1 flex-col rounded-t-[28px] bg-black p-7 text-white">
        <h3 className="text-3xl">{p.name}</h3>
        <p className="mt-1 text-sm text-white/55">{p.tagline}</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-white/75">
          {p.features.map((f) => (<li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-lime-400" />{f}</li>))}
        </ul>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-4xl font-bold text-lime-400">{inr(price)}</span>
          {off > 0 && <span className="text-white/35 line-through">{inr(p.price)}</span>}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <div className="inline-flex items-center rounded-full border border-white/20">
            <button className="p-2.5" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button className="p-2.5" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))}><Plus className="h-4 w-4" /></button>
          </div>
          <button disabled={out} onClick={() => add(line)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-lime-400 px-4 py-2.5 text-sm text-lime-400 transition hover:bg-lime-400 hover:text-black disabled:opacity-40"><ShoppingBag className="h-4 w-4" /> {out ? "Sold out" : "Add to Cart"}</button>
          <button disabled={out} onClick={() => { add(line); router.push("/checkout"); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:opacity-40"><Zap className="h-4 w-4" /> Buy Now</button>
        </div>
      </div>
    </div>
  );
}

function AddonCard({ a }: { a: Addon }) {
  const { add, lines } = useCart();
  const has = lines.some((l) => l.kind === "addon" && l.refId === a.id);
  return (
    <div className="mt-6 flex flex-wrap items-center gap-6 rounded-[28px] border border-black/10 bg-white p-7">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lime-400"><Palette className="h-7 w-7" /></div>
      <div className="min-w-[220px] flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40">Add-on</p>
        <h4 className="text-2xl">{a.name}</h4>
        <p className="text-sm text-black/55">{a.description}</p>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold">+ {inr(a.price)}</p>
        <button disabled={has} onClick={() => add({ kind: "addon", refId: a.id, name: `Add-on: ${a.name}`, unitPrice: a.price })} className="mt-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{has ? "Added ✓" : "Add to order"}</button>
      </div>
    </div>
  );
}

export function Shop({ c }: { c: SiteContent }) {
  const products = c.products.filter((p) => p.active);
  const addons = c.addons.filter((a) => a.active);
  return (
    <section id="shop" className="grid-light scroll-mt-20 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Shop the plaque" subtitle="Online payment only · Secure UPI · Dispatched across India" />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (<Reveal key={p.id} delay={i * 0.08}><ProductCard p={p} /></Reveal>))}
        </div>
        {addons.map((a) => (<AddonCard key={a.id} a={a} />))}
      </div>
    </section>
  );
}
