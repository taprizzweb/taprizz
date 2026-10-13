"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">{eyebrow}</p>}
      <h2 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-white/60 md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
