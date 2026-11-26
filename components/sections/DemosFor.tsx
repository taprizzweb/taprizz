import { ArrowUpRight } from "lucide-react";
import { DEMO_FOR } from "@/lib/home-data";
import { Reveal } from "@/components/ui/Reveal";

// "We have built demos for them too": real businesses that are not partners yet. A demo is a sample page, not an endorsement.
export function DemosFor() {
  if (DEMO_FOR.length === 0) return null;
  return (
    <section id="demos" className="scroll-mt-20 bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 inline-block rounded-full border border-lime-400/50 px-4 py-1.5 text-sm text-lime-400">Demos, not partners</p>
          <h2 className="text-5xl leading-[0.95] md:text-7xl">We have built demos for them too.</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">These businesses are not our partners yet. We built a sample Taprizz page for each, to show what it could look like for them. It does not mean they use or endorse Taprizz.</p>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_FOR.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <li className="list-none rounded-[24px] border-2 border-lime-400/50 bg-[#0c0c0c] p-6">
                <span className="inline-block rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">Demo built</span>
                <p className="mt-4 text-3xl leading-tight">{d.name}</p>
                <p className="mt-1 text-sm text-white/55">{d.kind}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">Want a demo for your business? Book a meeting <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
