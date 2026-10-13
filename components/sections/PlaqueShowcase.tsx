"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { SiteContent } from "@/lib/types";
import { Plaque } from "@/components/ui/Plaque";

// Tall section; the plaque stays sticky and rotates/zooms as you scroll while feature copy swaps.
export function PlaqueShowcase({ c }: { c: SiteContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const rotateY = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [-35, 20, -20, 30, 0]);
  const rotateX = useTransform(p, [0, 0.5, 1], [12, -8, 6]);
  const scale = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [0.85, 1.05, 1.2, 1.0, 1.1]);
  const glow = useTransform(p, [0, 1], [0.15, 0.5]);
  const steps = c.showcase.steps;

  return (
    <section id="plaque" ref={ref} className="relative scroll-mt-20" style={{ height: `${steps.length * 100 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4">
        <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500 blur-[160px]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-400">The product</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">{c.showcase.title}</h2>
            <p className="mt-3 text-white/60">{c.showcase.subtitle}</p>
            <div className="relative mt-8 h-40">
              {steps.map((s, i) => (
                <Step key={s.title} i={i} n={steps.length} p={p} title={s.title} text={s.text} />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {steps.map((_, i) => (<Dot key={i} i={i} n={steps.length} p={p} />))}
            </div>
          </div>
          <div className="order-1 flex justify-center [perspective:1400px] md:order-2">
            <motion.div style={{ rotateY, rotateX, scale, transformStyle: "preserve-3d" }}>
              <Plaque brand={c.settings.brand} className="max-w-[260px] md:max-w-[320px]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ i, n, p, title, text }: { i: number; n: number; p: ReturnType<typeof useSpring>; title: string; text: string }) {
  const a = i / n, b = (i + 1) / n, pad = 0.04;
  const opacity = useTransform(p, [a - pad, a + pad, b - pad, b + pad], [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]);
  const y = useTransform(p, [a - pad, a + pad, b - pad, b + pad], [i === 0 ? 0 : 30, 0, 0, i === n - 1 ? 0 : -30]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <h3 className="font-serif text-2xl text-gold-300">{title}</h3>
      <p className="mt-2 max-w-md text-white/70">{text}</p>
    </motion.div>
  );
}

function Dot({ i, n, p }: { i: number; n: number; p: ReturnType<typeof useSpring> }) {
  const w = useTransform(p, [i / n - 0.05, i / n + 0.02, (i + 1) / n - 0.02, (i + 1) / n + 0.05], [8, 28, 28, 8]);
  return <motion.span style={{ width: w }} className="h-2 rounded-full bg-gold-400" />;
}
