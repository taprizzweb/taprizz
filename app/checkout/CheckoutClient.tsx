"use client";
import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, Lock, MessageCircle, Smartphone } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, months } from "@/lib/format";
import type { SiteContent } from "@/lib/types";

type Step = "details" | "pay" | "done";

export function CheckoutClient({ settings }: { settings: SiteContent["settings"] }) {
  const { lines, subtotal, clear, setQty, remove } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<{ code: string; total: number; saved: boolean } | null>(null);
  const [utr, setUtr] = useState("");
  const [customerName, setCustomerName] = useState("");

  async function createOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const customer = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setCustomerName(customer.name);
    const items = lines.map((l) => ({ kind: l.kind, refId: l.refId, months: l.months, qty: l.qty }));
    try {
      const r = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer, items }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Failed");
      setOrder(j); setStep("pay");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (x: any) { setErr(x.message); } finally { setBusy(false); }
  }

  async function confirmPay(e: React.FormEvent) {
    e.preventDefault();
    if (!order) return;
    setErr(""); setBusy(true);
    try {
      const r = await fetch("/api/orders/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: order.code, utr }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Failed");
      clear(); setStep("done");
    } catch (x: any) { setErr(x.message); } finally { setBusy(false); }
  }

  const upi = order ? `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(settings.upiName)}&am=${order.total}&cu=INR&tn=${order.code}` : "";
  const wa = order ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi Taprizz, I paid ${inr(order.total)} for order ${order.code}. UTR: ${utr || "-"}`)}` : "";

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <Link href="/" className="font-serif text-2xl gold-text">{settings.brand}</Link>
      <ol className="mt-6 flex gap-3 text-xs text-white/50">
        {(["details", "pay", "done"] as Step[]).map((s, i) => (<li key={s} className={`rounded-full border px-3 py-1 ${step === s ? "border-gold-400 text-gold-300" : "border-line"}`}>{i + 1}. {s === "details" ? "Your details" : s === "pay" ? "Payment" : "Done"}</li>))}
      </ol>

      {step === "done" && order && (
        <div className="mt-16 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
          <h1 className="mt-4 font-serif text-4xl">Thank you{customerName ? `, ${customerName.split(" ")[0]}` : ""}!</h1>
          <p className="mt-3 text-white/60">Order <b className="text-gold-300">{order.code}</b> received. We will verify your payment and confirm on WhatsApp.</p>
          {!order.saved && <p className="mt-3 text-sm text-amber-400">Please send us your order code on WhatsApp so we can confirm it.</p>}
          <a href={wa} className="shimmer-btn animate-shimmer mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-black"><MessageCircle className="h-5 w-5" /> Message us on WhatsApp</a>
        </div>
      )}

      {step !== "done" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {step === "details" && (
              <form onSubmit={createOrder} className="space-y-4 rounded-3xl border border-line bg-panel p-6">
                <h1 className="font-serif text-3xl">Contact and delivery details</h1>
                <p className="text-sm text-white/50">Fill this in before payment. We use it to design your page and dispatch your plaque.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label className="lbl" htmlFor="name">Full name *</label><input id="name" name="name" required autoComplete="name" className="input" /></div>
                  <div><label className="lbl" htmlFor="business">Business name *</label><input id="business" name="business" required className="input" /></div>
                  <div><label className="lbl" htmlFor="phone">Phone / WhatsApp *</label><input id="phone" name="phone" required inputMode="tel" autoComplete="tel" className="input" /></div>
                  <div><label className="lbl" htmlFor="email">Email *</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /></div>
                </div>
                <div><label className="lbl" htmlFor="address">Delivery address *</label><textarea id="address" name="address" rows={2} required className="input" /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label className="lbl" htmlFor="city">City *</label><input id="city" name="city" required className="input" /></div>
                  <div><label className="lbl" htmlFor="pincode">Pincode *</label><input id="pincode" name="pincode" required inputMode="numeric" className="input" /></div>
                  <div><label className="lbl" htmlFor="instagram">Instagram link / handle</label><input id="instagram" name="instagram" className="input" /></div>
                  <div><label className="lbl" htmlFor="mapsLink">Google Maps listing link</label><input id="mapsLink" name="mapsLink" className="input" /></div>
                </div>
                <div><label className="lbl" htmlFor="notes">Notes / custom design instructions</label><textarea id="notes" name="notes" rows={3} className="input" /></div>
                {err && <p className="text-sm text-red-400">{err}</p>}
                <button disabled={busy || !lines.length} className="shimmer-btn animate-shimmer w-full rounded-full py-3.5 font-semibold text-black disabled:opacity-50">{busy ? "Please wait…" : "Continue to payment"}</button>
              </form>
            )}
            {step === "pay" && order && (
              <form onSubmit={confirmPay} className="space-y-5 rounded-3xl border border-line bg-panel p-6">
                <h1 className="font-serif text-3xl">Pay {inr(order.total)} via UPI</h1>
                <p className="text-sm text-white/50">Order code <b className="text-gold-300">{order.code}</b>. Online payment only.</p>
                <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-6 sm:flex-row sm:items-start">
                  <div className="rounded-2xl bg-white p-3"><QRCodeSVG value={upi} size={190} /></div>
                  <div className="text-sm text-white/70">
                    <p>UPI ID</p><p className="font-mono text-lg text-gold-300 break-all">{settings.upiId}</p>
                    <p className="mt-3">Amount</p><p className="font-serif text-2xl text-gold-300">{inr(order.total)}</p>
                    <a href={upi} className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-4 py-2 text-gold-300 sm:hidden"><Smartphone className="h-4 w-4" /> Open UPI app</a>
                    <p className="mt-3 text-xs text-white/40">Scan with any UPI app. Keep the amount exactly as shown.</p>
                  </div>
                </div>
                <div>
                  <label className="lbl" htmlFor="utr">After paying, enter the 12-digit UTR / reference number *</label>
                  <input id="utr" value={utr} onChange={(e) => setUtr(e.target.value.replace(/\D/g, "").slice(0, 12))} required inputMode="numeric" placeholder="e.g. 412345678901" className="input" />
                </div>
                {err && <p className="text-sm text-red-400">{err}</p>}
                <button disabled={busy || utr.length !== 12} className="shimmer-btn animate-shimmer w-full rounded-full py-3.5 font-semibold text-black disabled:opacity-50">{busy ? "Submitting…" : "I have paid, confirm order"}</button>
                <p className="flex items-center justify-center gap-2 text-xs text-white/40"><Lock className="h-3.5 w-3.5" /> We verify every payment manually before processing.</p>
              </form>
            )}
          </div>
          <aside className="h-fit rounded-3xl border border-line bg-panel p-6">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <div className="mt-4 space-y-3">
              {lines.map((l) => (
                <div key={l.key} className="flex justify-between gap-3 text-sm">
                  <div>
                    <p>{l.name}{l.kind === "plan" ? ` · ${months(l.months ?? 1)}` : ""}</p>
                    {l.kind === "product" && step === "details" ? (
                      <div className="mt-1 inline-flex items-center gap-2 text-white/50">
                        <button aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)} className="rounded border border-line px-2">−</button>{l.qty}
                        <button aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)} className="rounded border border-line px-2">+</button>
                        <button onClick={() => remove(l.key)} className="ml-2 text-xs text-red-400">remove</button>
                      </div>
                    ) : step === "details" ? (<button onClick={() => remove(l.key)} className="text-xs text-red-400">remove</button>) : <p className="text-white/40">Qty {l.qty}</p>}
                  </div>
                  <p className="text-gold-300">{inr(l.unitPrice * l.qty)}</p>
                </div>
              ))}
              {!lines.length && <p className="text-sm text-white/50">Cart is empty. <Link href="/#shop" className="text-gold-300 underline">Browse the shop</Link></p>}
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-4 text-lg"><span>Total</span><span className="text-gold-300">{inr(order ? order.total : subtotal)}</span></div>
          </aside>
        </div>
      )}
    </main>
  );
}
