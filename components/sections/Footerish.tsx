"use client";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";

export function Audience({ c }: { c: SiteContent }) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Who it is for" title={c.audience.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.audience.items.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <SpotlightCard className="h-full p-7"><h3 className="font-serif text-xl">{a.name}</h3><p className="mt-2 text-sm text-white/60">{a.text}</p></SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap({ c }: { c: SiteContent }) {
  const r = c.roadmap;
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="What's next" title={r.title} subtitle={r.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.06}>
              <SpotlightCard className="h-full p-6">
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${it.status === "Live" ? "bg-emerald-400/15 text-emerald-300" : "border border-gold-400/40 text-gold-300"}`}>{it.status}</span>
                <h3 className="mt-4 font-serif text-xl">{it.name}</h3>
                <p className="mt-2 text-sm text-white/60">{it.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ c }: { c: SiteContent }) {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-24">
      <Reveal className="mx-auto max-w-4xl rounded-[32px] border border-gold-400/20 bg-gradient-to-br from-panel to-ink p-10 md:p-14">
        <h2 className="font-serif text-4xl">{c.about.title}</h2>
        <p className="mt-5 text-lg text-white/65">{c.about.text}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {c.about.points.map((p) => (<li key={p} className="rounded-2xl border border-line p-4 text-sm text-gold-300">{p}</li>))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Faq({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHead title="Questions, answered" />
        <div className="space-y-3">
          {c.faq.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-line bg-panel">
              <button className="flex w-full items-center justify-between p-5 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="font-medium">{f.q}</span><ChevronDown className={`h-5 w-5 transition ${open === i ? "rotate-180 text-gold-400" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm text-white/60">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ c }: { c: SiteContent }) {
  const s = c.settings;
  const [state, setState] = useState<"idle" | "sending" | "done" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      setState(r.ok ? "done" : "err");
    } catch { setState("err"); }
  }
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl">Talk to Taprizz</h2>
          <p className="mt-3 text-white/60">Not sure which plan suits you? Leave your details and we'll reach out.</p>
          <ul className="mt-8 space-y-4 text-white/75">
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold-400" />{s.phone}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold-400" />{s.email}</li>
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gold-400" />{s.city}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-3xl border border-line bg-panel p-6">
          <div><label className="lbl" htmlFor="c-name">Your name</label><input id="c-name" name="name" required className="input" /></div>
          <div><label className="lbl" htmlFor="c-biz">Business name</label><input id="c-biz" name="business" className="input" /></div>
          <div><label className="lbl" htmlFor="c-phone">Phone / WhatsApp</label><input id="c-phone" name="phone" required inputMode="tel" className="input" /></div>
          <div><label className="lbl" htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" rows={3} className="input" /></div>
          <button disabled={state === "sending"} className="shimmer-btn animate-shimmer w-full rounded-full py-3 font-semibold text-black">{state === "sending" ? "Sending…" : "Send enquiry"}</button>
          {state === "done" && <p className="text-sm text-emerald-400">Thanks. We will contact you shortly.</p>}
          {state === "err" && <p className="text-sm text-red-400">Could not send. Please WhatsApp us instead.</p>}
        </form>
      </div>
    </section>
  );
}

export function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="border-t border-line px-4 py-10 text-center text-sm text-white/40">
      <p className="font-serif text-xl gold-text">{c.settings.brand}</p>
      <p className="mt-2">Premium AI review plaques · {c.settings.city}</p>
      <p className="mt-4">© {new Date().getFullYear()} {c.settings.brand}. All rights reserved.</p>
      <a href={`https://wa.me/${c.settings.whatsapp}`} aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"><MessageCircle className="h-7 w-7" /></a>
    </footer>
  );
}
