"use client";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Plaque } from "@/components/ui/Plaque";

export function Hero({ c }: { c: SiteContent }) {
  const h = c.hero;
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-44">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-32 top-10 h-96 w-96 animate-aurora rounded-full bg-gold-500/20 blur-[120px]" />
      <div className="absolute -right-20 top-40 h-96 w-96 animate-aurora rounded-full bg-amber-700/20 blur-[120px] [animation-delay:-7s]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs text-gold-300">
            <ShieldCheck className="h-3.5 w-3.5" /> {h.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
            {h.title} <span className="gold-text">{h.highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-xl text-lg text-white/60">{h.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap gap-4">
            <a href="#shop" className="shimmer-btn animate-shimmer inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-black">{h.cta} <ArrowRight className="h-4 w-4" /></a>
            <a href="#why" className="rounded-full border border-white/20 px-8 py-3.5 text-white/80 transition hover:border-gold-400 hover:text-gold-300">Watch the story</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -25 }} animate={{ opacity: 1, scale: 1, rotateY: -12 }} transition={{ duration: 1.1, delay: 0.2 }} className="flex justify-center [perspective:1200px]">
          <div className="animate-float"><Plaque /></div>
        </motion.div>
      </div>
      <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {h.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-panel/70 p-5 text-center backdrop-blur">
            <p className="font-serif text-3xl gold-text">{s.value}</p>
            <p className="mt-1 text-xs text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-panel/60 py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-white/40">
        {row.map((t, i) => (<span key={i} className="flex items-center gap-12">{t}<span className="text-gold-500">✦</span></span>))}
      </div>
    </div>
  );
}
