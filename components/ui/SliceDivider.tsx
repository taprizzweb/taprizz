"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Bar({ i, n, p, from }: { i: number; n: number; p: MotionValue<number>; from: string }) {
  const dir = i % 2 ? 1 : -1;
  const s = (i / n) * 0.4;
  const x = useTransform(p, [s, s + 0.55], ["0%", `${dir * 105}%`]);
  return <motion.div style={{ x, background: from }} className="h-full flex-1" />;
}

// Slices of the previous section slide away to reveal the next (CSS stand-in for a shader transition).
export function SliceDivider({ from, to, bars = 9 }: { from: string; to: string; bars?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.35"] });
  return (
    <div ref={ref} aria-hidden className="relative flex h-40 flex-col overflow-hidden md:h-56" style={{ background: to }}>
      {Array.from({ length: bars }).map((_, i) => (<Bar key={i} i={i} n={bars} p={scrollYProgress} from={from} />))}
    </div>
  );
}
