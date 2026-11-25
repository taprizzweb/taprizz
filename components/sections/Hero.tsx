"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Plaque } from "@/components/ui/Plaque";
import { ShaderBg } from "@/components/ui/ShaderBg";
import { ClientsMarquee } from "@/components/sections/Home";

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
      <div className="relative mx-auto grid min-h-[72vh] max-w-[1280px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-6 inline-block rounded-full border border-lime-400/50 px-4 py-1.5 text-sm text-lime-400">{h.eyebrow}</p>
          <h1 className="text-[clamp(2.8rem,7.4vw,6.6rem)] leading-[0.92] text-white">
            {h.title} <span className="metal-text">{h.highlight}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-white/65">{h.subtitle}</p>
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
