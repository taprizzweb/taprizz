"use client";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Navbar({ brand, announcement }: { brand: string; announcement?: string }) {
  const { count, setOpen } = useCart();
  const links = [["#why", "Why Reviews"], ["#plaque", "Plaque"], ["#shop", "Shop"], ["#plans", "Plans"], ["#about", "About"]];
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {announcement && <div className="bg-lime-400 px-4 py-1.5 text-center text-[11px] font-medium text-black md:text-xs">{announcement}</div>}
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label={brand}><img src="/logo-light.svg" alt={brand} className="h-9 w-auto" /></Link>
          <nav className="hidden gap-9 text-[15px] text-white/85 lg:flex">
            {links.map(([h, t]) => (<a key={h} href={`/${h}`} className="transition hover:text-lime-400">{t}</a>))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} aria-label="Open cart" className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-lime-400 hover:text-lime-400">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime-400 px-1 text-[11px] font-bold text-black">{count}</span>}
            </button>
            <a href="/#contact" className="hidden items-center gap-2 rounded-full border border-lime-400 px-5 py-2.5 text-xs font-semibold tracking-wide text-lime-400 transition hover:bg-lime-400 hover:text-black sm:flex">LET&apos;S TALK <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
