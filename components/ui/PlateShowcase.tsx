"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HERO_PLATES } from "@/lib/home-data";

/** The plate designs, one after another. The pictures are shown exactly as they were supplied. */
export function PlateShowcase({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  const n = HERO_PLATES.length;
  useEffect(() => {
    if (n < 2 || hold || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(t);
  }, [n, hold, reduce]);
  if (n === 0) return null;
  const p = HERO_PLATES[i];
  return (
    <div className={`w-full ${className}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-black/40">
        <AnimatePresence mode="wait">
          <motion.div key={p.src} className="absolute inset-0 grid place-items-center" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={`${p.name} plate`} width={p.w} height={p.h} className="h-full w-full object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center text-sm text-white/60">{p.name}{p.note ? <span className="ml-2 rounded-full border border-white/25 px-2 py-0.5 text-[11px] text-white/70">{p.note}</span> : null}</p>
      {n > 1 && (
        <div className="mt-2 flex justify-center gap-2" role="group" aria-label="Plate designs">
          {HERO_PLATES.map((x, k) => (<button key={x.src} type="button" aria-label={`Show ${x.name}`} aria-pressed={k === i} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-6 bg-lime-400" : "w-2.5 bg-white/30"}`} />))}
        </div>
      )}
    </div>
  );
}
