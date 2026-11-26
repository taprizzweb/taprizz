import { DEMO_FOR } from "@/lib/home-data";
import { Reveal } from "@/components/ui/Reveal";

// "We made demos for them too": real businesses that are not partners yet. A demo is a sample page, not an endorsement.
export function DemosFor() {
  if (DEMO_FOR.length === 0) return null;
  return (
    <section id="demos" className="scroll-mt-20 bg-white px-5 py-16 text-ink md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 inline-block rounded-full border border-black/20 px-4 py-1.5 text-sm text-black/70">Demos, not partners</p>
          <h2 className="text-4xl leading-[0.95] md:text-6xl">We have made demos for them too.</h2>
          <p className="mt-4 max-w-2xl text-lg text-black/55">These businesses are not our partners yet. We built a sample Taprizz page for each, to show what it could look like for them. It does not mean they use or endorse Taprizz.</p>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_FOR.map((d) => (
            <li key={d.name} className="list-none rounded-[22px] border border-black/10 bg-[#f6f6f3] p-5">
              <p className="text-2xl">{d.name}</p>
              <p className="mt-1 text-sm text-black/55">{d.kind}</p>
              <p className="mt-3 inline-block rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">Demo made</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
