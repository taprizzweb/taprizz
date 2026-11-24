"use client";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { InstagramIcon, igDm } from "@/components/sections/Footerish";

type State = "idle" | "sending" | "done" | "err" | "phone";

const TYPES = ["Cafe or restaurant", "Salon or spa", "Clinic", "Gym", "Hotel", "Showroom or shop", "Other"];
const INTEREST = ["AI Review Plaque", "Guest Platform", "Both, I want to see everything"];
const SLOTS = ["Morning, 10 to 1", "Afternoon, 2 to 5", "Evening, 6 to 9"];

export function BookDemo({ c }: { c: SiteContent }) {
  const s = c.settings;
  const dm = igDm(c.footer);
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (f.website) { setState("done"); return; } // a hidden field only a bot fills in
    if ((f.phone ?? "").replace(/\D/g, "").length < 10) { setState("phone"); return; }
    const message = [
      "DEMO REQUEST",
      `Interested in: ${f.interest}`,
      `Business type: ${f.type}`,
      f.city && `City: ${f.city}`,
      `Preferred: ${f.date || "any day"}, ${f.slot}`,
      f.notes && `Notes: ${f.notes}`,
    ].filter(Boolean).join(" | ");
    setState("sending");
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, business: f.business, phone: f.phone, message }) });
      setState(r.ok ? "done" : "err");
    } catch { setState("err"); }
  }

  return (
    <section id="book" className="light grid-light scroll-mt-20 border-t border-black/10 px-5 py-24 text-ink md:px-8 md:py-32">
      <span id="contact" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-6xl md:text-8xl">Book a demo.</h2>
          <p className="mt-6 max-w-sm text-lg text-black/60">Tell us about your place and when suits you. We will show you the plaque, the guest platform and Gulabi Nagri on a real phone, and answer your questions. It takes about 20 minutes.</p>
          <a href={dm} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-black/85"><InstagramIcon className="h-5 w-5" /> Or message us on Instagram</a>
          <ul className="mt-8 space-y-4 text-lg">
            <li className="flex items-center gap-3"><Mail className="h-5 w-5" />{s.email}</li>
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5" />{s.city}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="space-y-4" noValidate={false}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="lbl" htmlFor="d-name">Your name</label><input id="d-name" name="name" required maxLength={100} autoComplete="name" className="input" /></div>
            <div><label className="lbl" htmlFor="d-biz">Business name</label><input id="d-biz" name="business" required maxLength={150} autoComplete="organization" className="input" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="lbl" htmlFor="d-type">Type of business</label><select id="d-type" name="type" className="input" defaultValue={TYPES[0]}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label className="lbl" htmlFor="d-city">City</label><input id="d-city" name="city" maxLength={60} defaultValue="Jaipur" autoComplete="address-level2" className="input" /></div>
          </div>
          <div><label className="lbl" htmlFor="d-phone">Your phone number, so we can confirm the time</label><input id="d-phone" name="phone" required inputMode="tel" autoComplete="tel" maxLength={20} placeholder="+91" className="input" /></div>
          <div><label className="lbl" htmlFor="d-int">What would you like to see?</label><select id="d-int" name="interest" className="input" defaultValue={INTEREST[2]}>{INTEREST.map((t) => <option key={t}>{t}</option>)}</select></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="lbl" htmlFor="d-date">Preferred day</label><input id="d-date" name="date" type="date" className="input" /></div>
            <div><label className="lbl" htmlFor="d-slot">Preferred time</label><select id="d-slot" name="slot" className="input" defaultValue={SLOTS[1]}>{SLOTS.map((t) => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div><label className="lbl" htmlFor="d-notes">Anything we should know? (optional)</label><textarea id="d-notes" name="notes" rows={3} maxLength={400} className="input" /></div>
          <div className="hidden" aria-hidden><label htmlFor="d-web">Website</label><input id="d-web" name="website" tabIndex={-1} autoComplete="off" /></div>
          <button disabled={state === "sending"} className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-black/85 disabled:opacity-60">{state === "sending" ? "Sending…" : "Book my demo"}</button>
          {state === "done" && <p role="status" className="text-sm font-medium text-green-700">Thank you. We will contact you soon to confirm your demo.</p>}
          {state === "phone" && <p role="alert" className="text-sm text-red-600">Please enter a phone number with at least 10 digits.</p>}
          {state === "err" && <p role="alert" className="text-sm text-red-600">Could not send. Please message us on Instagram instead.</p>}
        </form>
      </div>
    </section>
  );
}
