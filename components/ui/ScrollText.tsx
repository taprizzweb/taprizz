"use client";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = (i / n) * 0.8, end = start + 0.2;
  const opacity = useTransform(p, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}

// Statement whose words light up as you scroll.
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (<Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />))}
    </p>
  );
}
