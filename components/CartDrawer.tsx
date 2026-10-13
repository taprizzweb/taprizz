"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, months } from "@/lib/format";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-line bg-panel"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-line p-5">
              <h3 className="font-serif text-2xl">Your Cart</h3>
              <button onClick={() => setOpen(false)} aria-label="Close cart"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {lines.length === 0 && <p className="mt-10 text-center text-white/50">Your cart is empty.</p>}
              {lines.map((l) => (
                <div key={l.key} className="rounded-2xl border border-line bg-ink p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{l.name}</p>
                      {l.kind === "plan" && <p className="text-xs text-white/50">{months(l.months ?? 1)} retainer</p>}
                      <p className="mt-1 text-sm text-gold-300">{inr(l.unitPrice)}</p>
                    </div>
                    <button onClick={() => remove(l.key)} aria-label="Remove" className="text-white/40 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  {l.kind === "product" && (
                    <div className="mt-3 inline-flex items-center rounded-full border border-line">
                      <button className="p-2" aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{l.qty}</span>
                      <button className="p-2" aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-line p-5">
              <div className="mb-4 flex justify-between text-lg"><span>Subtotal</span><span className="text-gold-300">{inr(subtotal)}</span></div>
              <Link
                href="/checkout" onClick={() => setOpen(false)}
                className={`block rounded-full py-3 text-center font-semibold text-black ${lines.length ? "shimmer-btn animate-shimmer" : "pointer-events-none bg-white/20"}`}
              >Proceed to Checkout</Link>
              <p className="mt-3 text-center text-xs text-white/40">Online payment only · UPI · No COD</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
