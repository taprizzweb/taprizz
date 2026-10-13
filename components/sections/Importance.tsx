import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { VideoFrame } from "@/components/ui/Video";
import { ScrollText } from "@/components/ui/ScrollText";
import { PillRows } from "@/components/ui/PillRows";

const TAGS = ["Google ranking", "First impressions", "More footfall", "Trust", "Fresh reviews", "Local SEO", "Word of mouth", "Brand reputation", "5-star proof", "Repeat guests"];

export function Importance({ c }: { c: SiteContent }) {
  const i = c.importance;
  const statement = `${c.settings.brand} turns happy guests into 5-star Google reviews. ${i.points.map((p) => p.title + ".").join(" ")}`;
  return (
    <section id="why" className="scroll-mt-20 bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <h2 className="text-6xl md:text-8xl">{i.title.length < 40 ? i.title : "Why reviews matter"}</h2>
        <ScrollText text={statement} className="mt-10 max-w-5xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl" />
      </div>
      <div className="mt-16"><PillRows tags={TAGS} /></div>
      <div className="mx-auto mt-24 max-w-[1100px] px-5 md:px-8">
        <Reveal><p className="mb-4 text-sm uppercase tracking-[0.25em] text-lime-400">The story · 1:40</p><VideoFrame src={c.settings.introVideo} label="The Importance of Reviews (1:40)" /></Reveal>
        <div className="mt-24">
          <Reveal><p className="mb-4 text-sm uppercase tracking-[0.25em] text-lime-400">Full product demo</p><VideoFrame src={c.settings.fullDemoVideo} label="Full Taprizz Demo" /></Reveal>
        </div>
      </div>
    </section>
  );
}
