"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ title, subtitle, light = false }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <h2 className={`text-5xl leading-[0.95] md:text-7xl ${light ? "text-ink" : "text-white"}`}>{title}</h2>
      {subtitle && <p className={`mt-5 max-w-xl text-lg ${light ? "text-black/55" : "text-white/55"}`}>{subtitle}</p>}
    </Reveal>
  );
}

export function LimeButton({ children, className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300 disabled:opacity-40 ${className}`}>{children}</button>;
}
