"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { inr } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/components/sections/Footerish";

// Prices are the owner's: 1,700 / 2,700 / 3,500 a month. 6 months get 5% off, 12 months get 10% off. Nothing is paid on this website.
type Pkg = { id: string; name: string; price: number; tagline: string; lead: string; features: string[]; hi?: boolean };
const PACKAGES: Pkg[] = [
  {
    id: "starter", name: "Starter", price: 1700, tagline: "Everything to start collecting real Google reviews.", lead: "You get",
    features: [
      "AI Review page: guests tap stars and options, and a review is written from their own choices (editable, never invented)",
      "Menu link and offers strip on your guest page",
      "Search keyword strip for your business",
      "WhatsApp contact capture (guests share only if they choose)",
      "Gallery photos (up to 2) and extra link buttons (up to 2)",
      "Basic monthly report",
      "Review replies by copy",
    ],
  },
  {
    id: "growth", name: "Growth", price: 2700, tagline: "Hear every complaint first, and run offers and events.", lead: "Everything in Starter, plus", hi: true,
    features: [
      "Complaint and suggestion inbox, with voice notes",
      "Offers with claim codes, and events",
      "Creators corner: guests tag, follow and share photos or clips",
      "More gallery photos (up to 6) and link buttons (up to 5)",
      "Full monthly report",
      "Review replies with approve and post",
      "Some WhatsApp campaign messages included",
    ],
  },
  {
    id: "pro", name: "Pro", price: 3500, tagline: "For busy cafes and restaurants that run the whole floor on Taprizz.", lead: "Everything in Growth, plus",
    features: [
      "Table ordering links: each table plate opens its own ordering link",
      "Call server bell and membership",
      "Content help: editing, posting and a calendar",
      "Review replies done automatically for 4 and 5 stars",
      "Most gallery photos (up to 15) and link buttons (up to 12)",
      "Monthly report with a call",
      "WhatsApp campaigns included up to a cap",
      "All upcoming updates and new features, as we ship them",
    ],
  },
];
const TERMS = [
  { months: 1, off: 0, label: "1 month" },
  { months: 6, off: 5, label: "6 months" },
  { months: 12, off: 10, label: "12 months" },
] as const;
const total = (price: number, t: (typeof TERMS)[number]) => Math.round(price * t.months * (1 - t.off / 100));

type Step = "term" | "form" | "done";

function Picker({ pkg, whatsapp, onClose }: { pkg: Pkg; whatsapp: string; onClose: () => void }) {
  const [step, setStep] = useState<Step>("term");
  const [term, setTerm] = useState<(typeof TERMS)[number]>(TERMS[1]);
  const [intent, setIntent] = useState<"demo" | "details">("demo");
  const [f, setF] = useState({ name: "", business: "", phone: "", note: "", agree: false, website: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const sum = total(pkg.price, term);
  const want = intent === "demo" ? "book a demo" : "get the full details";
  const summary = `${pkg.name} plan, ${term.label}, ${inr(sum)}${term.off ? ` (${term.off}% off)` : ""}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ph = f.phone.replace(/\D/g, "").replace(/^(91|0)(?=[6-9]\d{9}$)/, "");
    if (f.name.trim().length < 2) return setErr("Please type your name.");
    if (f.business.trim().length < 2) return setErr("Please type your business name.");
    if (!/^[6-9]\d{9}$/.test(ph)) return setErr("Please type a 10 digit mobile number.");
    if (!f.agree) return setErr("Please tick the box so we can contact you.");
    setBusy(true); setErr(null);
    // The lead is saved for the team. If saving fails the visitor still goes on to WhatsApp, so nobody is stuck.
    await fetch("/api/leads", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: f.name.trim(), business: f.business.trim(), phone: ph, website: f.website, message: `PLAN ENQUIRY: ${summary} | Wants to: ${want}${f.note.trim() ? ` | Note: ${f.note.trim().slice(0, 400)}` : ""}` }),
    }).catch(() => null);
    setBusy(false); setStep("done");
  }

  const msg = `Hi Taprizz, I am ${f.name.trim()} from ${f.business.trim()}. I want to ${want} for the ${summary}. I want to know more about this.${f.note.trim() ? ` ${f.note.trim().slice(0, 300)}` : ""}`;
  const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-lime-400";
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`${pkg.name} plan`}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] border border-white/12 bg-[#0c0c0c] p-6 text-white sm:rounded-[28px]">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10"><X className="h-4 w-4" /></button>
        <h3 className="pr-10 text-3xl">{pkg.name}</h3>
        {step === "term" && (
          <>
            <p className="mt-1 text-white/60">How long do you want to start for?</p>
            <div className="mt-5 space-y-3">
              {TERMS.map((t) => {
                const tot = total(pkg.price, t), on = t.months === term.months;
                return (
                  <button key={t.months} type="button" onClick={() => setTerm(t)} aria-pressed={on} className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition ${on ? "border-lime-400 bg-lime-400/10" : "border-white/10 hover:border-white/30"}`}>
                    <span><span className="block text-lg font-semibold">{t.label}</span><span className={`text-xs ${t.off ? "font-medium text-lime-400" : "text-white/50"}`}>{t.off ? `${t.off}% off, ${inr(tot / t.months)} a month` : "No discount"}</span></span>
                    <span className="text-right"><span className="block text-2xl font-bold">{inr(tot)}</span>{t.off > 0 && <span className="text-xs line-through opacity-45">{inr(pkg.price * t.months)}</span>}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-white/45">Nothing is paid on this website. Our team talks to you first and tells you how to start.</p>
            <button onClick={() => setStep("form")} className="mt-5 w-full rounded-full bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300">Continue with {term.label}</button>
          </>
        )}
        {step === "form" && (
          <form onSubmit={submit} className="mt-1 space-y-3" noValidate>
            <p className="text-white/60">{summary}. Tell us who you are and we will get in touch.</p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="What do you want">
              {([["demo", "Book a demo"], ["details", "Full details"]] as const).map(([k, l]) => (
                <button key={k} type="button" aria-pressed={intent === k} onClick={() => setIntent(k)} className={`rounded-xl border-2 py-3 text-sm font-semibold ${intent === k ? "border-lime-400 bg-lime-400/10" : "border-white/10"}`}>{l}</button>
              ))}
            </div>
            <input className={input} placeholder="Your name *" aria-label="Your name" autoComplete="name" maxLength={100} value={f.name} onChange={(e) => set("name", e.target.value)} />
            <input className={input} placeholder="Business name *" aria-label="Business name" autoComplete="organization" maxLength={150} value={f.business} onChange={(e) => set("business", e.target.value)} />
            <input className={input} placeholder="Mobile number *" aria-label="Mobile number" inputMode="numeric" autoComplete="tel" maxLength={14} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
            <textarea className={input} rows={3} placeholder="Anything you want us to know (optional)" aria-label="Message" maxLength={400} value={f.note} onChange={(e) => set("note", e.target.value)} />
            <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.website} onChange={(e) => set("website", e.target.value)} />
            <label className="flex items-start gap-2 text-sm text-white/70"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-lime-400" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} />I agree to be contacted on WhatsApp or phone about this plan.</label>
            {err && <p role="alert" className="text-sm font-medium text-rose-300">{err}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep("term")} className="rounded-full border border-white/20 px-6 py-4 font-semibold">Back</button>
              <button type="submit" disabled={busy} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300 disabled:opacity-50">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Send</button>
            </div>
          </form>
        )}
        {step === "done" && (
          <div className="mt-2 text-center">
            <p className="text-white/70">Thank you, {f.name.trim()}. We have your details.</p>
            <p className="mt-2 text-white/70">One last step: send us the message on WhatsApp so we can start the chat.</p>
            {whatsapp
              ? <a href={waLink(whatsapp, msg)} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300">Continue on WhatsApp <ArrowUpRight className="h-4 w-4" /></a>
              : <p className="mt-4 text-sm text-white/55">We will call you on the number you gave.</p>}
            <button onClick={onClose} className="mt-3 w-full rounded-full border border-white/20 py-3 font-semibold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Pricing({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState<Pkg | null>(null);
  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-12 max-w-4xl md:mb-14">
          <p className="mb-5 inline-block rounded-full border border-lime-400/40 px-4 py-1.5 text-sm text-lime-400">Plans for Jaipur</p>
          <h2 className="text-5xl leading-[0.95] text-white md:text-7xl">Powerful technology at a price that suits every cafe and restaurant in Jaipur.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/60">Three plans. Start for 1 month, or take 6 months with 5% off, or 12 months with 10% off. And we are launching more.</p>
        </Reveal>

        <Reveal className="mb-12">
          <a href="#gulabi" className="block rounded-[24px] border border-rose-300/30 bg-gradient-to-r from-[#2a1019] to-[#120709] p-6 transition hover:border-rose-300/60 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">There will be a great launch</p>
            <h3 className="mt-2 text-3xl text-white md:text-4xl">Gulabi Nagri, the guest guide app for the Pink City</h3>
            <p className="mt-3 max-w-3xl text-white/65">A guide for guests in Jaipur. It lists cafes, salons, gyms and more near them, ranked by real guest ratings, with a gold, silver and bronze crown for the top three. Taprizz partners join the network first. It is a pilot and we are building it partner by partner, so we cannot promise a number of visits or sales. <span className="font-semibold text-rose-200">See how it works →</span></p>
          </a>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <div className={`relative flex h-full flex-col rounded-[28px] p-7 ${p.hi ? "bg-lime-400 text-black" : "border border-white/12 bg-[#0c0c0c] text-white"}`}>
                {p.hi && <span className="absolute right-6 top-6 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-lime-400">Popular</span>}
                <h3 className="text-4xl">{p.name}</h3>
                <p className={`mt-1 min-h-[3rem] ${p.hi ? "text-black/65" : "text-white/55"}`}>{p.tagline}</p>
                <p className="mt-5 text-5xl font-bold">{inr(p.price)}<span className={`ml-1 text-base font-medium ${p.hi ? "text-black/60" : "text-white/50"}`}>/ month</span></p>
                <p className={`mt-1 text-sm ${p.hi ? "text-black/70" : "text-lime-400"}`}>6 months: 5% off · 12 months: 10% off</p>
                <p className={`mt-6 text-sm font-semibold uppercase tracking-wide ${p.hi ? "text-black/70" : "text-white/55"}`}>{p.lead}</p>
                <ul className="mt-3 space-y-2.5 text-[15px]">
                  {p.features.map((f) => (<li key={f} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0" />{f}</li>))}
                </ul>
                <button onClick={() => setOpen(p)} className={`mt-8 w-full rounded-full py-4 font-semibold transition ${p.hi ? "bg-black text-lime-400 hover:bg-black/85" : "bg-lime-400 text-black hover:bg-lime-300"}`}>Choose {p.name}</button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/45">Prices are per month before the discount. Setup and stand costs may be extra; our team confirms them with you. Nothing is paid on this website.</p>
      </div>
      {open && <Picker pkg={open} whatsapp={c.settings.whatsapp} onClose={() => setOpen(null)} />}
    </section>
  );
}
