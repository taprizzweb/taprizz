"use client";
import { Check, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Plan, SiteContent } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { inr, months } from "@/lib/format";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

function PlanCard({ plan }: { plan: Plan }) {
  const { add, lines } = useCart();
  const router = useRouter();
  const hi = plan.highlight;
  const select = (t: Plan["tiers"][number], go: boolean) => {
    add({ kind: "plan", refId: plan.id, months: t.months, name: `${plan.name} (${months(t.months)})`, unitPrice: t.price });
    if (go) router.push("/checkout");
  };
  const mid = plan.tiers[1] ?? plan.tiers[0];
  return (
    <div className={`relative flex h-full flex-col rounded-[28px] p-8 ${hi ? "bg-lime-400 text-black" : "border border-white/12 bg-[#0c0c0c] text-white"}`}>
      {hi && <span className="absolute right-6 top-6 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-lime-400">Recommended</span>}
      <h3 className="text-4xl">{plan.name}</h3>
      <p className={`mt-1 ${hi ? "text-black/65" : "text-white/55"}`}>{plan.tagline}</p>
      <div className="mt-7 space-y-3">
        {plan.tiers.map((t) => {
          const saved = t.original - t.price;
          const chosen = lines.some((l) => l.kind === "plan" && l.refId === plan.id && l.months === t.months);
          return (
            <div key={t.months} className={`flex items-center justify-between gap-3 rounded-2xl border-2 p-4 ${chosen ? (hi ? "border-black bg-black/10" : "border-lime-400 bg-lime-400/10") : hi ? "border-black/15" : "border-white/10"}`}>
              <div><p className="text-lg font-semibold">{months(t.months)}</p>{saved > 0 && <p className={`text-xs font-medium ${hi ? "text-black/70" : "text-lime-400"}`}>Save {inr(saved)}</p>}</div>
              <div className="text-right"><p className="text-3xl font-bold">{inr(t.price)}</p>{saved > 0 && <p className="text-xs line-through opacity-45">{inr(t.original)}</p>}</div>
              <button onClick={() => select(t, false)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${hi ? "bg-black text-lime-400 hover:bg-black/80" : "bg-lime-400 text-black hover:bg-lime-300"}`}>{chosen ? "Added ✓" : "Select"}</button>
            </div>
          );
        })}
      </div>
      <ul className="mt-7 space-y-2.5 text-[15px]">
        {plan.features.map((f) => (
          <li key={f.text} className={`flex items-start gap-2.5 ${f.included ? "" : "opacity-35"}`}>
            {f.included ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}{f.text}
          </li>
        ))}
      </ul>
      <button onClick={() => select(mid, true)} className={`mt-auto w-full rounded-full py-4 font-semibold transition ${hi ? "bg-black text-lime-400 hover:bg-black/85" : "border border-white/25 hover:border-lime-400 hover:text-lime-400"} mt-8`}>
        Buy {plan.name} · {months(mid.months)}
      </button>
    </div>
  );
}

export function Plans({ c }: { c: SiteContent }) {
  return (
    <section id="plans" className="scroll-mt-20 bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <SectionHead title="Pick your retainer" subtitle="Two plans, three durations each. Select any of the six, or buy the popular 3-month plan in one click." />
        <div className="grid gap-6 md:grid-cols-2">
          {c.plans.map((p, i) => (<Reveal key={p.id} delay={i * 0.1}><PlanCard plan={p} /></Reveal>))}
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-white/50"><ShieldCheck className="h-4 w-4 text-lime-400" /> Plus Retainer includes 1-year replacement for broken, damaged or faded plaques.</p>
      </div>
    </section>
  );
}
