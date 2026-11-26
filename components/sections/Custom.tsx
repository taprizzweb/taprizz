"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/components/sections/Footerish";

const KINDS = [
  { id: "experience", label: "Customized customer experience", help: "What your guest sees and does after they tap or scan: your own flow, not just a menu." },
  { id: "website", label: "Build your website", help: "A website made for your business." },
  { id: "app", label: "Build your app", help: "An app made for your business." },
] as const;
const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-lime-400";

/** A section where a business tells us the experience it wants for its customers. Nothing is priced here: the owner talks to them first. */
export function Custom({ whatsapp, standalone = false }: { whatsapp: string; standalone?: boolean }) {
  const [kinds, setKinds] = useState<string[]>(["experience"]);
  const [f, setF] = useState({ name: "", business: "", phone: "", first: "", then: "", end: "", more: "", agree: false, website: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id: string) => setKinds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const wants = kinds.map((id) => KINDS.find((k) => k.id === id)?.label).join(", ");
  const flow = [f.first && `First, the guest should see: ${f.first.trim()}`, f.then && `Then they should go to: ${f.then.trim()}`, f.end && `At the end: ${f.end.trim()}`, f.more && `More: ${f.more.trim()}`].filter(Boolean).join(" | ");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ph = f.phone.replace(/\D/g, "").replace(/^(91|0)(?=[6-9]\d{9}$)/, "");
    if (!kinds.length) return setErr("Please choose what you want.");
    if (f.name.trim().length < 2) return setErr("Please type your name.");
    if (!/^[6-9]\d{9}$/.test(ph)) return setErr("Please type your 10 digit WhatsApp number.");
    if (f.first.trim().length < 3) return setErr("Please tell us what the guest should see first.");
    if (!f.agree) return setErr("Please tick the box so we can contact you.");
    setBusy(true); setErr(null);
    await fetch("/api/leads", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: f.name.trim(), business: f.business.trim(), phone: ph, website: f.website, message: `CUSTOM EXPERIENCE | Wants: ${wants} | ${flow}`.slice(0, 1700), fields: { track: "custom-experience", items: kinds.join("+"), custom: flow.slice(0, 290) } }),
    }).catch(() => null);
    setBusy(false); setDone(true);
  }

  const msg = `Hi Taprizz, I am ${f.name.trim()}${f.business.trim() ? ` from ${f.business.trim()}` : ""}. I want: ${wants}.\n${flow.split(" | ").join("\n")}\nI want to know more about this.`;
  return (
    <section id="custom" className={`scroll-mt-20 bg-gradient-to-b from-black to-[#0d1408] px-5 text-white md:px-8 ${standalone ? "min-h-dvh py-14" : "py-20 md:py-28"}`}>
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mb-10 max-w-3xl">
          <p className="mb-5 inline-block rounded-full border border-lime-400/40 px-4 py-1.5 text-sm text-lime-400">Made for you</p>
          <h2 className="text-5xl leading-[0.95] md:text-7xl">Be ready for your customized customer experience.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/60">How will your customer feel, according to you? Tell us the flow: what they should see when they open it, where they should go next, and how it should end. Not every cafe wants the menu first, so you decide.</p>
        </Reveal>

        {done ? (
          <div className="rounded-[24px] border border-lime-400/40 bg-lime-400/5 p-6 text-center md:p-10">
            <h3 className="text-3xl">Thank you, {f.name.trim()}.</h3>
            <p className="mt-3 text-white/70">We have your idea. One last step: send it to us on WhatsApp so we can start the chat.</p>
            {whatsapp && <a href={waLink(whatsapp, msg)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-4 font-semibold text-black transition hover:bg-lime-300">Continue on WhatsApp <ArrowUpRight className="h-4 w-4" /></a>}
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-6 rounded-[28px] border border-white/12 bg-[#0c0c0c] p-5 md:p-8">
            <div>
              <p className="mb-3 font-semibold">What do you want? <span className="font-normal text-white/50">(choose one or more)</span></p>
              <div className="grid gap-3 md:grid-cols-3">
                {KINDS.map((k) => {
                  const on = kinds.includes(k.id);
                  return (
                    <button key={k.id} type="button" aria-pressed={on} onClick={() => toggle(k.id)} className={`rounded-2xl border-2 p-4 text-left transition ${on ? "border-lime-400 bg-lime-400/10" : "border-white/10 hover:border-white/30"}`}>
                      <span className="flex items-center gap-2 font-semibold">{on && <Check className="h-4 w-4 text-lime-400" />}{k.label}</span>
                      <span className="mt-1 block text-xs text-white/55">{k.help}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">The flow for your customers</p>
              <label className="block text-sm text-white/70">1. The guest opens it. What should they see first? *
                <textarea className={`${input} mt-1`} rows={2} maxLength={300} placeholder="For example: our new dessert, not the menu" value={f.first} onChange={(e) => set("first", e.target.value)} />
              </label>
              <label className="block text-sm text-white/70">2. Then where should they go?
                <textarea className={`${input} mt-1`} rows={2} maxLength={300} placeholder="For example: the offers, then the menu" value={f.then} onChange={(e) => set("then", e.target.value)} />
              </label>
              <label className="block text-sm text-white/70">3. How should it end?
                <textarea className={`${input} mt-1`} rows={2} maxLength={300} placeholder="For example: a review and a follow on Instagram" value={f.end} onChange={(e) => set("end", e.target.value)} />
              </label>
              <label className="block text-sm text-white/70">Anything else you imagine?
                <textarea className={`${input} mt-1`} rows={2} maxLength={300} value={f.more} onChange={(e) => set("more", e.target.value)} />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className={input} placeholder="Your name *" aria-label="Your name" autoComplete="name" maxLength={100} value={f.name} onChange={(e) => set("name", e.target.value)} />
              <input className={input} placeholder="Business name" aria-label="Business name" autoComplete="organization" maxLength={150} value={f.business} onChange={(e) => set("business", e.target.value)} />
              <input className={`${input} sm:col-span-2`} placeholder="WhatsApp number *" aria-label="WhatsApp number" inputMode="numeric" autoComplete="tel" maxLength={14} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.website} onChange={(e) => set("website", e.target.value)} />
            <label className="flex items-start gap-2 text-sm text-white/70"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-lime-400" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} />I agree to be contacted on WhatsApp or phone about this.</label>
            {err && <p role="alert" className="text-sm font-medium text-rose-300">{err}</p>}
            <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 text-lg font-semibold text-black transition hover:bg-lime-300 disabled:opacity-50">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Send my idea</button>
            <p className="text-center text-xs text-white/40">No payment here. We talk to you first and tell you what is possible.</p>
          </form>
        )}
      </div>
    </section>
  );
}
