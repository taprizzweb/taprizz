"use client";
import { Nfc, Wifi } from "lucide-react";

// CSS plaque mockup — used until real product photos are uploaded.
export function Plaque({ brand = "Taprizz", className = "" }: { brand?: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[3/4] w-full max-w-[300px] rounded-[28px] border border-gold-400/40 bg-gradient-to-br from-[#1b1a22] via-[#0e0e14] to-[#1b1a22] p-6 shadow-[0_30px_80px_-20px_rgba(212,169,55,0.35)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.12)_50%,transparent_70%)]" />
      <div className="flex items-center justify-between text-gold-400">
        <span className="font-serif text-xl tracking-wide">{brand}</span>
        <Wifi className="h-5 w-5 rotate-90" />
      </div>
      <p className="mt-6 text-center font-serif text-lg leading-snug text-white/90">Loved your visit?</p>
      <p className="mt-1 text-center text-xs text-white/50">Tap here to leave a review</p>
      <div className="mx-auto mt-6 grid h-28 w-28 place-items-center rounded-full border border-gold-400/60 bg-gold-400/10">
        <Nfc className="h-12 w-12 text-gold-300" />
      </div>
      <div className="mx-auto mt-6 grid h-20 w-20 grid-cols-5 gap-[2px] rounded-lg bg-white p-1.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className={[0,1,2,4,5,7,9,10,12,14,15,17,19,20,22,23,24].includes(i) ? "bg-black" : "bg-white"} />
        ))}
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">Powered by AI</p>
    </div>
  );
}
