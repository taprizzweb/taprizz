"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  key: string;
  kind: "product" | "addon" | "plan";
  refId: string; // product id / addon id / plan id
  months?: number; // plans only
  name: string;
  unitPrice: number;
  qty: number;
  image?: string;
};

type Ctx = {
  lines: CartLine[];
  add: (l: Omit<CartLine, "qty" | "key"> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "taprizz-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add: Ctx["add"] = useCallback((l) => {
    const key = `${l.kind}:${l.refId}:${l.months ?? 0}`;
    setLines((prev) => {
      const ex = prev.find((p) => p.key === key);
      if (ex) {
        // a plan or add-on is a single line; products stack
        if (l.kind !== "product") return prev;
        return prev.map((p) => (p.key === key ? { ...p, qty: Math.min(99, p.qty + (l.qty ?? 1)) } : p));
      }
      // only one retainer plan per order
      const base = l.kind === "plan" ? prev.filter((p) => p.kind !== "plan") : prev;
      return [...base, { ...l, key, qty: l.qty ?? 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback(
    (key: string, qty: number) =>
      setLines((p) => p.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l))),
    []
  );
  const remove = useCallback((key: string) => setLines((p) => p.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      add,
      setQty,
      remove,
      clear,
      open,
      setOpen,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.qty * l.unitPrice, 0),
    }),
    [lines, add, setQty, remove, clear, open]
  );
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
