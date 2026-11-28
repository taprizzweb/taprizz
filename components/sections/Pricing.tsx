"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { inr } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/components/sections/Footerish";
import { AI_QR_TERMS, KIT, PACKAGES, SETUP_CAP, SETUP_PER_PLATE, aiSaved, aiTotal, freeMonths, fullPrice, savedFor, termsFor, totalFor, type Pkg, type Term } from "@/lib/plans";

type Step = "term" | "form" | "done";

function Picker({ pkg, whatsapp, onClose }: { pkg: Pkg; whatsapp: string; onClose: () => void }) {
  const [step, setStep] = useState<Step>("term");
  const TERMS = termsFor(pkg);
  const [term, setTerm] = useState<Term>(TERMS[1]);
  const [intent, setIntent] = useState<"demo" | "details">("demo");
  const [f, setF] = useState({ name: "", business: "", phone: "", note: "", agree: false, website: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const sum = totalFor(pkg, term);
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
                const tot = totalFor(pkg, t), on = t.months === term.months, saved = savedFor(pkg, t);
                return (
                  <button key={t.months} type="button" onClick={() => setTerm(t)} aria-pressed={on} className={`relative flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition ${on ? "border-lime-400 bg-lime-400/10" : "border-white/10 hover:border-white/30"}`}>
                    {t.special && <span className="absolute -top-3 left-4 rounded-full bg-lime-400 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">Special offer</span>}
                    <span>
                      <span className="block text-lg font-semibold">{t.label}</span>
                      <span className={`block text-xs ${t.off ? "font-medium text-lime-400" : "text-white/50"}`}>{t.off ? `${t.off}% off, ${inr(tot / t.months)} a month` : "No discount"}</span>
                      {saved > 0 && <span className="mt-0.5 block text-xs text-white/70">You save {inr(saved)}, about {freeMonths(pkg, t)} months free</span>}
                    </span>
                    <span className="text-right"><span className="block text-2xl font-bold">{inr(tot)}</span>{t.off > 0 && <span className="text-xs line-through opacity-45">{inr(fullPrice(pkg, t))}</span>}</span>
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
  const [tab, setTab] = useState<"app" | "ai">("app");
  // The prices stay hidden until someone taps "See plans and prices" on the AI plates or the Taprizz App card, or follows a #pricing link.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const open = (t?: "app" | "ai") => {
      setShown(true);
      if (t) setTab(t);
      setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    };
    const onEvent = (e: Event) => open((e as CustomEvent<"app" | "ai">).detail);
    const onHash = () => { if (window.location.hash === "#pricing") open(); };
    window.addEventListener("taprizz:pricing", onEvent);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => { window.removeEventListener("taprizz:pricing", onEvent); window.removeEventListener("hashchange", onHash); };
  }, []);
  if (!shown) return <div id="pricing" className="scroll-mt-20" />;
  const seg = (on: boolean) => `flex-1 rounded-full px-5 py-3 text-sm font-semibold transition md:text-base ${on ? "bg-lime-400 text-black" : "text-white/70 hover:text-white"}`;
  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-12 max-w-4xl md:mb-14">
          <p className="mb-5 inline-block rounded-full border border-lime-400/40 px-4 py-1.5 text-sm text-lime-400">Plans for Jaipur</p>
          <h2 className="text-5xl leading-[0.95] text-white md:text-7xl">Powerful technology at a price that suits every cafe and restaurant in Jaipur.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/60">Three plans. Start for 1 month, or take 6 months with 5% off, or 12 months with 10% off (15% off on Pro). And we are launching more.</p>
        </Reveal>

        <Reveal className="mb-12">
          <a href="#gulabi" className="block rounded-[24px] border border-rose-300/30 bg-gradient-to-r from-[#2a1019] to-[#120709] p-6 transition hover:border-rose-300/60 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">There will be a great launch</p>
            <h3 className="mt-2 text-3xl text-white md:text-4xl">Gulabi Nagri, the guest guide app for the Pink City</h3>
            <p className="mt-3 max-w-3xl text-white/65">A guide for guests in Jaipur. It lists cafes, salons, gyms and more near them, ranked by real guest ratings, with a gold, silver and bronze crown for the top three. Taprizz partners join the network first. It is a pilot and we are building it partner by partner, so we cannot promise a number of visits or sales. <span className="font-semibold text-rose-200">See how it works →</span></p>
          </a>
        </Reveal>

        <div role="tablist" aria-label="Choose a product" className="mb-8 flex max-w-xl gap-1 rounded-full border border-white/15 bg-white/5 p-1">
          <button role="tab" aria-selected={tab === "app"} onClick={() => setTab("app")} className={seg(tab === "app")}>Taprizz App</button>
          <button role="tab" aria-selected={tab === "ai"} onClick={() => setTab("ai")} className={seg(tab === "ai")}>AI Review plates</button>
        </div>

        {tab === "app" ? (
          <>
        <Reveal className="mb-6">
          <p className="rounded-2xl border border-lime-400/50 bg-lime-400/10 px-5 py-3 text-center font-semibold text-white">Special offer running on Pro: 15% off when you take 12 months. Other plans get 10%.</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <div className={`relative flex h-full flex-col rounded-[28px] p-7 ${p.special ? "border-2 border-lime-400 bg-[#0c0c0c] text-white" : "border border-white/12 bg-[#0c0c0c] text-white"}`}>
                {p.special && <span className="absolute right-6 top-6 rounded-full bg-lime-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black">Special offer</span>}
                {p.tag && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">{p.tag}</p>}
                <h3 className="text-4xl">{p.name}</h3>
                <p className="mt-1 min-h-[3rem] text-white/55">{p.tagline}</p>
                <p className="mt-5 text-5xl font-bold">{inr(p.price)}<span className="ml-1 text-base font-medium text-white/50">/ month</span></p>
                <p className="mt-1 text-sm text-lime-400">{p.special ? "6 months: 5% off · 12 months: 15% off" : "6 months: 5% off · 12 months: 10% off"}</p>
                {p.special && <p className="mt-1 text-sm font-semibold text-white">Special offer: 15% off on 12 months. You save {inr(savedFor(p, termsFor(p)[2]))}.</p>}
                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/55">{p.lead}</p>
                <ul className="mt-3 space-y-2.5 text-[15px]">
                  {p.features.map((f) => (<li key={f.text} className={`flex items-start gap-2.5 ${f.included === false ? "opacity-40" : ""}`}>{f.included === false ? <X className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0" />}{f.text}</li>))}
                </ul>
                <button onClick={() => setOpen(p)} className="mt-8 w-full rounded-full bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300">Choose {p.name}</button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="rounded-[24px] border-2 border-lime-400/60 bg-lime-400/5 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">Claim your free tabletops</p>
            <h3 className="mt-2 text-3xl">Start with tabletops on the house.</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="relative rounded-2xl border-2 border-lime-400 p-4 pt-6"><span className="absolute -top-3 left-4 rounded-full bg-lime-400 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">Latest technology · Most recommended</span><p className="text-4xl font-bold">{KIT.freeNfcTabletops}</p><p className="mt-1 text-white/75">NFC technology based tabletops, free</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-4xl font-bold">{KIT.freeQrTabletops}</p><p className="mt-1 text-white/75">QR technology based tabletops, free</p></div>
            </div>
            <p className="mt-3 text-sm text-white/60">With any app plan. More tabletops after that: QR technology based {inr(KIT.tabletopPrice.qr)} each, NFC technology based {inr(KIT.tabletopPrice.nfc)} each. Want your own design? Customize it and send us your requirement. Our team confirms the final number with you.</p>
            <a href="/start/app" className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-300">Claim your free tabletops <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
          </>
        ) : (
        <div>
          <Reveal className="mb-6">
            <h3 className="text-4xl text-white md:text-5xl">AI Review plates</h3>
            <p className="mt-3 max-w-3xl text-lg text-white/60">Only want the review plates for your tables? Guests tap or scan the plate, pick stars and options, and get a review written from their own choices (editable, never invented). Made for cafes and restaurants in Jaipur.</p>
          </Reveal>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/55">1. Choose your plate</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative rounded-[24px] border-2 border-lime-400 bg-[#0c0c0c] p-6 pt-8">
              <span className="absolute -top-3 left-5 rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black">Latest technology · Most recommended</span>
              <h4 className="text-3xl">NFC + QR plate</h4>
              <p className="mt-1 text-5xl font-bold">{inr(KIT.platePrice.nfcqr)}<span className="ml-1 text-base font-medium text-white/50">each</span></p>
              <p className="mt-3 text-white/65">Guests tap the phone on the plate, or scan the QR. A slim plate that sits flat on the table.</p>
            </div>
            <div className="rounded-[24px] border border-white/12 bg-[#0c0c0c] p-6 pt-8">
              <h4 className="text-3xl">QR plate</h4>
              <p className="mt-1 text-5xl font-bold">{inr(KIT.platePrice.qr)}<span className="ml-1 text-base font-medium text-white/50">each</span></p>
              <p className="mt-3 text-white/65">Guests scan the QR to open their review page. A slim plate that sits flat on the table.</p>
            </div>
          </div>

          <p className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-white/55">2. Choose your AI QR plan</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {AI_QR_TERMS.map((t) => (
              <div key={t.months} className="rounded-[22px] border border-white/12 bg-[#0c0c0c] p-5">
                <p className="text-white/55">{t.label}</p>
                <p className="mt-1 text-4xl font-bold">{inr(t.perMonth)}<span className="text-sm font-medium text-white/50"> / month</span></p>
                <p className="mt-1 text-sm text-white/60">{inr(aiTotal(t))} in all</p>
                {aiSaved(t) > 0 ? <p className="mt-1 text-sm font-medium text-lime-400">You save {inr(aiSaved(t))}</p> : <p className="mt-1 text-sm text-white/40">No discount</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/12 bg-[#0c0c0c] p-6">
            <h4 className="text-2xl">One-time setup</h4>
            <ul className="mt-3 space-y-1.5 text-white/75">
              <li>1 plate: {inr(SETUP_PER_PLATE)} setup + the plate</li>
              <li>2 plates: {inr(SETUP_CAP)} setup + the plates</li>
              <li>3 or more plates: the setup stays {inr(SETUP_CAP)}</li>
            </ul>
            <p className="mt-3 text-sm text-white/55">Example: 1 NFC + QR plate is {inr(SETUP_PER_PLATE)} + {inr(KIT.platePrice.nfcqr)} = {inr(SETUP_PER_PLATE + KIT.platePrice.nfcqr)} one time, plus the monthly plan. Want your own design? Customize it and send us your requirement. Our team confirms the final amount.</p>
            <a href="/start/ai-qr" className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-300">Get my AI QR quote <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        )}
        <p className="mt-8 text-sm text-white/45">Prices are per month before the discount. Setup and stand costs may be extra; our team confirms them with you. Nothing is paid on this website.</p>
      </div>
      {open && <Picker pkg={open} whatsapp={c.settings.whatsapp} onClose={() => setOpen(null)} />}
    </section>
  );
}
