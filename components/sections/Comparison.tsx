import { Check, Minus, X } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

function Cell({ v, first }: { v: string; first: boolean }) {
  const yes = /^yes$/i.test(v), no = /^no$/i.test(v);
  return (
    <td className={`px-4 py-5 text-center text-sm ${first ? "bg-black/[0.06]" : ""}`}>
      {yes ? <Check className="mx-auto h-5 w-5 text-black" /> : no ? <X className="mx-auto h-5 w-5 text-black/25" /> : v === "-" ? <Minus className="mx-auto h-4 w-4 text-black/25" /> : <span className="text-black/65">{v}</span>}
    </td>
  );
}

export function Comparison({ c }: { c: SiteContent }) {
  const t = c.comparison;
  return (
    <section id="compare" className="grid-light scroll-mt-20 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <SectionHead light title={t.title} subtitle={t.subtitle} />
        <Reveal>
          <div className="overflow-x-auto rounded-[28px] border border-black/10 bg-white">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-black/10 text-sm">
                  <th className="px-5 py-6 text-left font-medium text-black/45">Feature</th>
                  {t.columns.map((col, i) => (<th key={col} className={`px-4 py-6 text-xl font-bold ${i === 0 ? "bg-black text-white" : "text-black/70"}`}>{col}</th>))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.feature} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-5 text-[15px] font-medium">{r.feature}</td>
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
