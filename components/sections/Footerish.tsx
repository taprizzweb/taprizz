"use client";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

export function Audience({ c }: { c: SiteContent }) {
  return (
    <section className="grid-light px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Who it's for" subtitle={c.audience.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.audience.items.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05}>
              <div className="group flex h-full min-h-[190px] flex-col justify-between rounded-[26px] border border-black/10 bg-white p-7 transition hover:bg-lime-400">
                <ArrowUpRight className="h-6 w-6 self-end opacity-40 transition group-hover:opacity-100" />
                <div><h3 className="text-2xl">{a.name}</h3><p className="mt-2 text-sm text-black/55 group-hover:text-black/70">{a.text}</p></div>
              </div>
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
    <section className="bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead title={r.title} subtitle={r.subtitle} />
        <div className="grid gap-5 md:grid-cols-2">
          {r.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.06}>
              <div className={`flex h-full min-h-[170px] items-center justify-between gap-5 rounded-[26px] p-8 ${it.status === "Live" ? "bg-lime-400 text-black" : "border border-white/12 bg-[#0c0c0c]"}`}>
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${it.status === "Live" ? "bg-black text-lime-400" : "border border-lime-400/50 text-lime-400"}`}>{it.status}</span>
                  <h3 className="mt-4 text-3xl">{it.name}</h3>
                  <p className={`mt-1 ${it.status === "Live" ? "text-black/65" : "text-white/55"}`}>{it.text}</p>
                </div>
                <ArrowUpRight className="h-7 w-7 shrink-0 opacity-60" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ c }: { c: SiteContent }) {
  return (
    <section id="about" className="grid-light scroll-mt-20 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal><h2 className="text-6xl md:text-8xl">{c.about.title}</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-8 max-w-4xl text-2xl font-medium leading-snug text-black/70 md:text-4xl">{c.about.text}</p></Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {c.about.points.map((p) => (<li key={p} className="rounded-[22px] bg-lime-400 p-6 text-lg font-semibold">{p}</li>))}
        </ul>
      </div>
    </section>
  );
}

export function Faq({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="grid-light px-5 pb-24 text-ink md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Questions, answered" />
        <div className="max-w-3xl space-y-3">
          {c.faq.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-black/10 bg-white">
              <button className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="text-lg font-semibold">{f.q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-black/60">{f.a}</p>}
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
    <section id="contact" className="light grid-light scroll-mt-20 border-t border-black/10 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-2">
        <div>
          <h2 className="text-6xl md:text-8xl">Let&apos;s talk.</h2>
          <p className="mt-6 max-w-sm text-lg text-black/55">Not sure which plan suits you? Leave your details and we&apos;ll reach out.</p>
          <ul className="mt-10 space-y-4 text-lg">
            <li className="flex items-center gap-3"><Phone className="h-5 w-5" />{s.phone}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5" />{s.email}</li>
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5" />{s.city}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="lbl" htmlFor="c-name">Name</label><input id="c-name" name="name" required placeholder="Your name" className="input" /></div>
            <div><label className="lbl" htmlFor="c-biz">Business</label><input id="c-biz" name="business" placeholder="Business name" className="input" /></div>
          </div>
          <div><label className="lbl" htmlFor="c-phone">Phone / WhatsApp</label><input id="c-phone" name="phone" required inputMode="tel" placeholder="+91" className="input" /></div>
          <div><label className="lbl" htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" rows={4} placeholder="Tell us what you have in mind" className="input" /></div>
          <button disabled={state === "sending"} className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-4 font-semibold text-black transition hover:bg-lime-300">{state === "sending" ? "Sending…" : "Send message"} <ArrowUpRight className="h-4 w-4" /></button>
          {state === "done" && <p className="text-sm font-medium text-green-700">Thanks. We will contact you shortly.</p>}
          {state === "err" && <p className="text-sm text-red-600">Could not send. Please WhatsApp us instead.</p>}
        </form>
      </div>
    </section>
  );
}

export function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="bg-black px-5 py-14 md:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
        <img src="/logo-light.svg" alt={c.settings.brand} className="h-14 w-auto" />
        <p className="max-w-sm text-sm text-white/50">Premium AI review plaques · {c.settings.city}. © {new Date().getFullYear()} {c.settings.brand}.</p>
        <p className="text-sm text-white/50">{c.settings.email}<br />{c.settings.phone}</p>
      </div>
      <a href={`https://wa.me/${c.settings.whatsapp}`} aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"><MessageCircle className="h-7 w-7" /></a>
    </footer>
  );
}
