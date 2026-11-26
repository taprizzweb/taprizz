"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_PLATES } from "@/lib/home-data";

const EVERY_MS = 2600;

/** The plate designs, one after another, every few seconds. The pictures are shown exactly as they were supplied.
 *  All plates are in the page from the start, so a change never waits for a download. It keeps changing on phones too. */
export function PlateShowcase({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const calm = useReducedMotion(); // a simple fade instead of sliding
  const n = HERO_PLATES.length;
  useEffect(() => {
    if (n < 2 || hold) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), EVERY_MS);
    return () => clearInterval(t);
  }, [n, hold]);
  if (n === 0) return null;
  const p = HERO_PLATES[i];
  return (
    <div className={`mx-auto w-[min(78vw,360px)] ${className}`} onPointerEnter={(e) => { if (e.pointerType === "mouse") setHold(true); }} onPointerLeave={(e) => { if (e.pointerType === "mouse") setHold(false); }}>
      <div className="relative aspect-[2/3] w-full [perspective:900px]">
        {HERO_PLATES.map((x, k) => {
          const on = k === i;
          const side = k < i ? -1 : 1;
          return (
            <motion.div
              key={x.src}
              className="absolute inset-0 overflow-hidden rounded-[26px]"
              style={{ pointerEvents: on ? "auto" : "none" }}
              initial={false}
              animate={on ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : calm ? { opacity: 0 } : { opacity: 0, x: side * 70, scale: 0.9, rotateY: side * -18 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={!on}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.src} alt={`${x.name} plate`} width={x.w} height={x.h} loading="eager" decoding="async" className="h-full w-full object-contain" />
            </motion.div>
          );
        })}
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
