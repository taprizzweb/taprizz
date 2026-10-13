"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Navbar({ brand, announcement }: { brand: string; announcement?: string }) {
  const { count, setOpen } = useCart();
  const links = [["#why", "Why Reviews"], ["#plaque", "Plaque"], ["#demo", "Demo"], ["#compare", "Compare"], ["#shop", "Shop"], ["#plans", "Plans"], ["#about", "About"]];
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {announcement && (
        <div className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-4 py-1.5 text-center text-[11px] font-medium text-black md:text-xs">{announcement}</div>
      )}
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-ink/70 px-5 py-2.5 backdrop-blur-xl">
        <Link href="/" className="font-serif text-xl tracking-wide">
          <span className="gold-text">{brand}</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-white/70 lg:flex">
          {links.map(([h, t]) => (
            <a key={h} href={`/${h}`} className="transition hover:text-gold-300">{t}</a>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} aria-label="Open cart" className="relative flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-1.5 text-sm text-gold-300 transition hover:bg-gold-400/10">
          <ShoppingBag className="h-4 w-4" /> Cart
          {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-black">{count}</span>}
        </button>
      </div>
    </header>
  );
}
