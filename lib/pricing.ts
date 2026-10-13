import type { SiteContent } from "./types";
import { months, sellPrice } from "./format";

export type OrderItemInput = { kind: "product" | "addon" | "plan"; refId: string; months?: number; qty?: number };
export type PricedItem = { kind: string; refId: string; name: string; months?: number; unitPrice: number; qty: number };

// Server-side re-pricing: never trust prices coming from the browser.
export function priceItems(items: OrderItemInput[], c: SiteContent): { items: PricedItem[]; total: number } | { error: string } {
  const out: PricedItem[] = [];
  for (const it of items.slice(0, 20)) {
    const qty = Math.max(1, Math.min(99, Math.floor(Number(it.qty) || 1)));
    if (it.kind === "product") {
      const p = c.products.find((x) => x.id === it.refId && x.active);
      if (!p) return { error: "A product in your cart is no longer available." };
      if (p.stock < qty) return { error: `${p.name}: only ${p.stock} left in stock.` };
      out.push({ kind: "product", refId: p.id, name: p.name, unitPrice: sellPrice(p), qty });
    } else if (it.kind === "addon") {
      const a = c.addons.find((x) => x.id === it.refId && x.active);
      if (!a) return { error: "An add-on in your cart is no longer available." };
      out.push({ kind: "addon", refId: a.id, name: a.name, unitPrice: a.price, qty: 1 });
    } else if (it.kind === "plan") {
      const pl = c.plans.find((x) => x.id === it.refId);
      const t = pl?.tiers.find((x) => x.months === it.months);
      if (!pl || !t) return { error: "A plan in your cart is no longer available." };
      out.push({ kind: "plan", refId: pl.id, months: t.months, name: `${pl.name} (${months(t.months)})`, unitPrice: t.price, qty: 1 });
    } else return { error: "Invalid item." };
  }
  if (!out.length) return { error: "Your cart is empty." };
  return { items: out, total: out.reduce((a, i) => a + i.unitPrice * i.qty, 0) };
}
