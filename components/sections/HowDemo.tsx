"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Smartphone, Sparkles, Send, Hand } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

const icons = [Hand, Star, Sparkles, Send];

export function How({ c }: { c: SiteContent }) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Simple by design" title={c.how.title} />
        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent md:block" />
          {c.how.steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.title} delay={i * 0.1} className="relative text-center">
                <div className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full border border-gold-400/50 bg-ink"><Icon className="h-7 w-7 text-gold-300" /></div>
                <h3 className="mt-5 font-serif text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LiveDemo({ c }: { c: SiteContent }) {
  const d = c.demo;
  const [stars, setStars] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (o: string) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));
  const text = stars
    ? `${stars >= 4 ? "Wonderful" : "Decent"} experience at ${c.settings.demoBusiness}${picked.length ? `. I especially loved the ${picked.map((x) => x.toLowerCase()).join(", ")}.` : "."} ${stars === 5 ? "Highly recommended in " + c.settings.city.split(",")[0] + "!" : ""}`
    : "";
  return (
    <section id="demo" className="scroll-mt-24 bg-gradient-to-b from-transparent via-panel/60 to-transparent px-4 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-400">Live demo</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{d.title}</h2>
          <p className="mt-4 text-white/60">{d.subtitle}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/40"><Smartphone className="h-4 w-4" /> Try it on the phone, a real working preview.</p>
        </div>
        <div className="mx-auto w-full max-w-[320px] rounded-[44px] border-[6px] border-[#1e1e27] bg-ink p-5 shadow-[0_40px_100px_-30px_rgba(212,169,55,0.4)]">
          <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-[#1e1e27]" />
          <p className="text-center font-serif text-lg">{c.settings.demoBusiness}</p>
          <div className="mt-3 flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} aria-label={`${n} star`} onClick={() => setStars(n)}>
                <Star className={`h-8 w-8 transition ${n <= stars ? "fill-gold-400 text-gold-400" : "text-white/20"}`} />
              </button>
            ))}
          </div>
          {stars > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              <p className="mb-2 text-sm">{d.question}</p>
              <div className="flex flex-wrap gap-2">
                {d.options.map((o) => (
                  <button key={o} onClick={() => toggle(o)} className={`rounded-full border px-3 py-1.5 text-xs transition ${picked.includes(o) ? "border-gold-400 bg-gold-400 text-black" : "border-line text-white/70 hover:border-gold-400/60"}`}>{o}</button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-gold-400/30 bg-gold-400/5 p-3 text-xs italic text-white/80"><Sparkles className="mb-1 h-3.5 w-3.5 text-gold-400" />{text}</div>
              <button className="shimmer-btn animate-shimmer mt-4 w-full rounded-full py-2.5 text-sm font-semibold text-black">Post on Google</button>
            </motion.div>
          )}
          {stars === 0 && <p className="mt-6 pb-4 text-center text-xs text-white/40">Tap a star to begin</p>}
        </div>
      </div>
    </section>
  );
}
