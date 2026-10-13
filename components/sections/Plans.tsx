"use client";
import { Check, Crown, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Plan, SiteContent } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { inr, months } from "@/lib/format";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

function PlanCard({ plan }: { plan: Plan }) {
  const { add, lines } = useCart();
  const router = useRouter();
  const select = (t: Plan["tiers"][number], go: boolean) => {
    add({ kind: "plan", refId: plan.id, months: t.months, name: `${plan.name} (${months(t.months)})`, unitPrice: t.price });
    if (go) router.push("/checkout");
  };
  return (
    <div className={`relative flex h-full flex-col rounded-3xl p-[1.5px] ${plan.highlight ? "bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600/30 shadow-[0_0_80px_-20px_rgba(212,169,55,0.5)]" : "bg-line"}`}>
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold-400 px-4 py-1 text-xs font-bold text-black"><Crown className="h-3.5 w-3.5" /> RECOMMENDED</span>
      )}
      <div className="flex h-full flex-col rounded-[22px] bg-panel p-7">
        <h3 className="font-serif text-3xl">{plan.name}</h3>
        <p className="mt-1 text-sm text-white/55">{plan.tagline}</p>
        <div className="mt-6 space-y-3">
          {plan.tiers.map((t) => {
            const saved = t.original - t.price;
            const chosen = lines.some((l) => l.kind === "plan" && l.refId === plan.id && l.months === t.months);
            return (
              <div key={t.months} className={`flex items-center justify-between gap-3 rounded-2xl border p-4 ${chosen ? "border-gold-400 bg-gold-400/10" : "border-line"}`}>
                <div>
                  <p className="font-medium">{months(t.months)}</p>
                  {saved > 0 && <p className="text-xs text-emerald-400">Save {inr(saved)}</p>}
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-gold-300">{inr(t.price)}</p>
                  {saved > 0 && <p className="text-xs text-white/35 line-through">{inr(t.original)}</p>}
                </div>
                <button onClick={() => select(t, false)} className="rounded-full border border-gold-400/50 px-4 py-2 text-sm text-gold-300 transition hover:bg-gold-400 hover:text-black">{chosen ? "Added ✓" : "Select"}</button>
              </div>
            );
          })}
        </div>
        <ul className="mt-6 space-y-2.5 text-sm">
          {plan.features.map((f) => (
            <li key={f.text} className={`flex items-start gap-2 ${f.included ? "text-white/80" : "text-white/30"}`}>
              {f.included ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}{f.text}
            </li>
          ))}
        </ul>
        <button onClick={() => select(plan.tiers[1] ?? plan.tiers[0], true)} className={`mt-auto w-full rounded-full py-3 font-semibold ${plan.highlight ? "shimmer-btn animate-shimmer pt-3 text-black" : "border border-white/20 hover:border-gold-400"} mt-7`}>
          Buy {plan.name} · {months((plan.tiers[1] ?? plan.tiers[0]).months)}
        </button>
      </div>
    </div>
  );
}

export function Plans({ c }: { c: SiteContent }) {
  return (
    <section id="plans" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Retainer plans" title="Pick the care level that fits your brand" subtitle="Two plans, three durations each. Select any of the six, or buy the popular 3-month plan in one click." />
        <div className="grid gap-8 md:grid-cols-2">
          {c.plans.map((p, i) => (<Reveal key={p.id} delay={i * 0.12}><PlanCard plan={p} /></Reveal>))}
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-white/50"><ShieldCheck className="h-4 w-4 text-gold-400" /> Plus Retainer includes 1-year replacement for broken, damaged or faded plaques.</p>
      </div>
    </section>
  );
}
