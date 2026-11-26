"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Plaque } from "@/components/ui/Plaque";
import { ShaderBg } from "@/components/ui/ShaderBg";
import { ClientsMarquee } from "@/components/sections/Home";
import { waLink } from "@/components/sections/Footerish";

export function Hero({ c }: { c: SiteContent }) {
  const h = c.hero;
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const b = ref.current!.getBoundingClientRect();
    mx.set(((e.clientX - b.left) / b.width) * 2 - 1);
    my.set(((e.clientY - b.top) / b.height) * 2 - 1);
  };
  return (
    <section ref={ref} onMouseMove={onMove} className="relative overflow-hidden bg-black pt-28">
      <ShaderBg />
      <div className="relative border-y border-white/10 bg-black/55 py-3 backdrop-blur"><ClientsMarquee partners={c.partners} /></div>
      <a href="#offers-hero" className="relative block bg-lime-400 px-4 py-3 text-center text-black transition hover:bg-lime-300">
        <span className="text-sm font-bold md:text-base">Get your SEO &amp; GEO done FREE by Taprizz (first-time customers)</span>
        <span className="mx-2 hidden opacity-50 sm:inline">|</span>
        <span className="block text-sm font-bold sm:inline md:text-base">Earn ₹1,200 on every referral</span>
      </a>
      <div className="relative mx-auto grid min-h-[72vh] max-w-[1280px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-6 inline-block rounded-full border border-lime-400/50 px-4 py-1.5 text-sm text-lime-400">{h.eyebrow}</p>
          <h1 className="text-[clamp(2.8rem,7.4vw,6.6rem)] leading-[0.92] text-white">
            {h.title} <span className="metal-text">{h.highlight}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-white/65">{h.subtitle}</p>
          <div id="offers-hero" className="mt-7 grid max-w-2xl scroll-mt-32 gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border-2 border-lime-400 bg-lime-400/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">Free for first-time customers</p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-white">Get your SEO &amp; GEO done free by Taprizz</p>
              <p className="mt-2 text-sm text-white/65">We set up the search and AI-search keywords and page text for your business. We cannot promise rankings.</p>
            </div>
            <div className="rounded-[22px] border-2 border-rose-300/70 bg-rose-300/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200">Earn rewards</p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-white">Get ₹1,200 on every referral</p>
              <p className="mt-2 text-sm text-white/65">Refer a business. When they buy Taprizz through you, you get ₹1,200, as cash or as a discount. Contact us to claim.</p>
            </div>
          </div>
          {c.settings.whatsapp && <a href={waLink(c.settings.whatsapp, "Hi Taprizz, I saw the free SEO & GEO offer and the ₹1,200 referral reward. I want to know more.")} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-lime-400 underline underline-offset-4">Contact us about these offers <ArrowUpRight className="h-4 w-4" /></a>}
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#book" className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-4 font-semibold text-black transition hover:bg-lime-300">{h.cta} <ArrowUpRight className="h-4 w-4" /></a>
            <a href="https://app.taprizz.in/create" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-white transition hover:border-lime-400 hover:text-lime-400">Create your free mini link <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="flex justify-center [perspective:1200px]">
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
            <Plaque className="max-w-[420px] shadow-[0_40px_120px_-20px_rgba(255,255,255,0.14)]" />
          </motion.div>
        </div>
      </div>
      {h.stats.length > 0 && <div className="relative border-t border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-8">
          {h.stats.map((s) => (
            <div key={s.label} className="py-7 pr-4">
              <p className="text-4xl font-bold text-lime-400 md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>}
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-lime-400 py-4 text-black">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-lg font-semibold">
        {row.map((t, i) => (<span key={i} className="flex items-center gap-10">{t}<span>✦</span></span>))}
      </div>
    </div>
  );
}
