import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { VideoFrame } from "@/components/ui/Video";
import { SpotlightCard } from "@/components/ui/Spotlight";

export function Importance({ c }: { c: SiteContent }) {
  const i = c.importance;
  return (
    <section id="why" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Start here" title={i.title} subtitle={i.subtitle} />
        <Reveal><VideoFrame src={c.settings.introVideo} label="The Importance of Reviews (1:40)" /></Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {i.points.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.08}>
              <SpotlightCard className="h-full p-7">
                <span className="font-serif text-4xl text-gold-500/60">0{idx + 1}</span>
                <h3 className="mt-2 font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-white/60">{p.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <SectionHead eyebrow="Full product demo" title="See Taprizz in action, start to finish" />
          <Reveal><VideoFrame src={c.settings.fullDemoVideo} label="Full Taprizz Demo" /></Reveal>
        </div>
      </div>
    </section>
  );
}
