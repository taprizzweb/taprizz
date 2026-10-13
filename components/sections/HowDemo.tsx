"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Smartphone, Sparkles } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

export function How({ c }: { c: SiteContent }) {
  return (
    <section className="grid-light px-5 pb-24 pt-8 text-ink md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title={c.how.title} subtitle="Four taps from a happy guest to a published review." />
        <div className="grid gap-5 md:grid-cols-2">
          {c.how.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[28px] bg-black p-8 text-white">
                <span className="text-7xl font-bold leading-none text-white/20">0{i + 1}</span>
                <div><h3 className="text-4xl">{s.title}</h3><p className="mt-2 max-w-sm text-white/65">{s.text}</p></div>
              </div>
            </Reveal>
          ))}
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
    <section id="demo" className="scroll-mt-20 bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="text-5xl leading-[0.95] md:text-7xl">{d.title}</h2>
          <p className="mt-5 max-w-md text-lg text-white/55">{d.subtitle}</p>
          <p className="mt-8 flex items-center gap-2 text-sm text-lime-400"><Smartphone className="h-4 w-4" /> A real working preview. Tap the stars.</p>
        </div>
        <div className="mx-auto w-full max-w-[330px] rounded-[44px] border-[6px] border-[#1d1d1d] bg-[#0a0a0a] p-5 shadow-[0_0_120px_-30px_rgba(255,255,255,0.12)]">
          <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-[#1d1d1d]" />
          <p className="text-center text-lg font-semibold">{c.settings.demoBusiness}</p>
          <div className="mt-3 flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (<button key={n} aria-label={`${n} star`} onClick={() => setStars(n)}><Star className={`h-8 w-8 transition ${n <= stars ? "fill-lime-400 text-lime-400" : "text-white/20"}`} /></button>))}
          </div>
          {stars > 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              <p className="mb-2 text-sm">{d.question}</p>
              <div className="flex flex-wrap gap-2">
                {d.options.map((o) => (<button key={o} onClick={() => toggle(o)} className={`rounded-full border px-3 py-1.5 text-xs transition ${picked.includes(o) ? "border-lime-400 bg-lime-400 text-black" : "border-white/15 text-white/70 hover:border-lime-400"}`}>{o}</button>))}
              </div>
              <div className="mt-4 rounded-2xl border border-lime-400/30 bg-lime-400/5 p-3 text-xs italic text-white/80"><Sparkles className="mb-1 h-3.5 w-3.5 text-lime-400" />{text}</div>
              <button className="mt-4 w-full rounded-full bg-lime-400 py-2.5 text-sm font-semibold text-black">Post on Google</button>
            </motion.div>
          ) : (<p className="mt-6 pb-4 text-center text-xs text-white/40">Tap a star to begin</p>)}
        </div>
      </div>
    </section>
  );
}
