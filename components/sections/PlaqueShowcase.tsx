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
  const blueOpacity = useTransform(p, [0.47, 0.53], [0, 1]);
  const glow = useTransform(p, [0, 1], [0.15, 0.5]);
  const steps = c.showcase.steps;

  return (
    <section id="plaque" ref={ref} className="grid-light relative scroll-mt-20 text-ink" style={{ height: `${steps.length * 100 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4">
        <motion.div style={{ opacity: glow }} className="absolute left-[68%] top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400 blur-[150px]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-5xl leading-[0.95] md:text-7xl">{c.showcase.title}</h2>
            <p className="mt-4 max-w-md text-black/55">{c.showcase.subtitle}</p>
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
              <div className="relative w-[260px] md:w-[340px]">
                <Plaque variant="graphite" className="max-w-none border-black/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]" />
                <motion.div style={{ opacity: blueOpacity }} className="absolute inset-0"><Plaque variant="blue" className="max-w-none border-black/10" /></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ i, n, p, title, text }: { i: number; n: number; p: ReturnType<typeof useSpring>; title: string; text: string }) {
  // Sequential fades (no overlap) so two steps never show on top of each other.
  const a = i / n, b = (i + 1) / n, pad = 0.035;
  const pts = i === 0 ? [a, b - pad, b] : i === n - 1 ? [a, a + pad, b] : [a, a + pad, b - pad, b];
  const op = i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const dy = i === 0 ? [0, 0, -24] : i === n - 1 ? [24, 0, 0] : [24, 0, 0, -24];
  const opacity = useTransform(p, pts, op);
  const y = useTransform(p, pts, dy);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <h3 className="text-3xl">{title}</h3>
      <p className="mt-2 max-w-md text-lg text-black/60">{text}</p>
    </motion.div>
  );
}

function Dot({ i, n, p }: { i: number; n: number; p: ReturnType<typeof useSpring> }) {
  const w = useTransform(p, [i / n - 0.05, i / n + 0.02, (i + 1) / n - 0.02, (i + 1) / n + 0.05], [8, 28, 28, 8]);
  return <motion.span style={{ width: w }} className="h-2 rounded-full bg-black" />;
}
