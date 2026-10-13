import { Check, Minus, X } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

function Cell({ v, first }: { v: string; first: boolean }) {
  const yes = /^yes$/i.test(v);
  const no = /^no$/i.test(v);
  return (
    <td className={`px-4 py-4 text-center text-sm ${first ? "bg-gold-400/[0.06]" : ""}`}>
      {yes ? <Check className="mx-auto h-5 w-5 text-gold-400" /> : no ? <X className="mx-auto h-5 w-5 text-white/25" /> : v === "-" ? <Minus className="mx-auto h-4 w-4 text-white/25" /> : <span className="text-white/70">{v}</span>}
    </td>
  );
}

export function Comparison({ c }: { c: SiteContent }) {
  const t = c.comparison;
  return (
    <section id="compare" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHead eyebrow="Compare" title={t.title} subtitle={t.subtitle} />
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-line bg-panel">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-line text-sm">
                  <th className="px-4 py-5 text-left font-normal text-white/50">Feature</th>
                  {t.columns.map((col, i) => (<th key={col} className={`px-4 py-5 font-serif text-lg ${i === 0 ? "bg-gold-400/10 text-gold-300" : "text-white/70"}`}>{col}</th>))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.feature} className="border-b border-line/60 last:border-0">
                    <td className="px-4 py-4 text-sm text-white/80">{r.feature}</td>
                    {r.values.map((v, i) => (<Cell key={i} v={v} first={i === 0} />))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
