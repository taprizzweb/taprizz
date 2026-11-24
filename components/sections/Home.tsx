"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon, igDm, waLink, waShow } from "@/components/sections/Footerish";
import type { Partner } from "@/lib/types";
import { CATEGORIES, type CategoryId } from "@/lib/home-data";

/* ------------------------------------------------------------------ partners */
const miniUrl = (slug: string) => `https://link.taprizz.in/${slug}`;

// A thin row at the very top of the page: logo and name of every partner. It slides when there are many; with a few it just stands still.
export function ClientsMarquee({ partners }: { partners: Partner[] }) {
  const slide = partners.length >= 5;
  const row = slide ? [...partners, ...partners, ...partners] : partners;
  return (
    <div className="flex items-center gap-4 overflow-hidden px-5 md:px-8">
      <p className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:block">Working with Taprizz</p>
      <div className={`min-w-0 flex-1 overflow-hidden ${slide ? "[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]" : ""}`}>
        <ul className={`flex items-center gap-8 ${slide ? "w-max animate-marquee hover:[animation-play-state:paused]" : "flex-wrap"}`}>
          {row.map((c, i) => (
            <li key={`${c.name}-${i}`} aria-hidden={i >= partners.length || undefined}>
              <a href="#partners" tabIndex={i >= partners.length ? -1 : undefined} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-white/85 transition hover:text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={i < partners.length ? `${c.name} logo` : ""} width={40} height={40} className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapsUrl = (name: string, address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address.replace(/^[^:]*:\s*/, "")}`)}`;

export function Partners({ partners }: { partners: Partner[] }) {
  const [cat, setCat] = useState<"all" | CategoryId>("all");
  const shown = cat === "all" ? partners : partners.filter((c) => c.category === cat);
  const count = (id: CategoryId) => partners.filter((c) => c.category === id).length;
  const chip = (on: boolean) => `rounded-full border px-5 py-2.5 text-sm font-semibold transition ${on ? "border-black bg-black text-white" : "border-black/20 bg-white hover:border-black/50"}`;
  const catLabel = (id: CategoryId) => CATEGORIES.find((x) => x.id === id)!.label;
  return (
    <section id="partners" className="grid-light scroll-mt-20 px-5 py-20 text-ink md:px-8 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Our partners in Jaipur" subtitle="Real businesses already using Taprizz. See all of them, or pick a category. Tap a mini link to open their page." />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Partner categories">
          <button type="button" aria-pressed={cat === "all"} onClick={() => setCat("all")} className={chip(cat === "all")}>All <span className="ml-1 opacity-60">{partners.length}</span></button>
          {CATEGORIES.map((c) => (<button type="button" key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={chip(cat === c.id)}>{c.label} <span className="ml-1 opacity-60">{count(c.id)}</span></button>))}
        </div>
        {shown.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-black/25 bg-white/60 p-8 md:p-12">
            <p className="text-2xl font-semibold md:text-3xl">No {CATEGORIES.find((x) => x.id === cat)?.one} partner here yet.</p>
            <p className="mt-2 max-w-xl text-black/60">Be the first {CATEGORIES.find((x) => x.id === cat)?.one} in Jaipur on Taprizz. Your logo, name and address will show here.</p>
            <a href="#book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-black/85">Book a meeting <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <li key={c.name} className="list-none">
                <article className="flex h-full flex-col rounded-[26px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={`${c.name} logo`} width={120} height={120} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl border border-black/5 bg-white object-contain" />
                    <div className="min-w-0">
                      <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-black/60">{catLabel(c.category)}</span>
                      <h3 className="mt-2 text-2xl leading-tight md:text-3xl">{c.name}</h3>
                    </div>
                  </div>
                  {c.about && <p className="mt-4 text-[15px] leading-snug text-black/70">{c.about}</p>}
                  <ul className="mt-5 space-y-2.5">
                    {c.addresses.map((a) => (
                      <li key={a}><a href={mapsUrl(c.name, a)} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-sm text-black/65 transition hover:text-black"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span>{a}</span></a></li>
                    ))}
                  </ul>
                  {c.slug && <a href={miniUrl(c.slug)} target="_blank" rel="noopener noreferrer" className="mt-auto flex w-fit items-center gap-1.5 pt-6 text-sm font-semibold break-all underline-offset-4 hover:underline">link.taprizz.in/{c.slug}<ArrowUpRight className="h-4 w-4 shrink-0" /></a>}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ two products */
const APP_POINTS = [
  "One tap opens your own page: review, offers, menu and a way to raise a complaint",
  "Honest Google reviews, drafted from what the guest liked and edited by them",
  "Private feedback reaches you first, so you can fix problems early",
  "Grow your Instagram followers: guests send photos and videos, you post and tag them",
  "Offers, events and a mini link for your Instagram bio",
  "Table ordering, call-the-waiter and a kitchen screen, if you want them",
  "Team alerts on phones, and a dashboard for reviews, feedback and taps",
  "A listing in Gulabi Nagri, our Jaipur guest guide (pilot)",
];
const QR_POINTS = [
  "NFC tap and QR code on a premium plaque",
  "Guest picks stars and what they liked; AI drafts the review; the guest posts it on Google",
  "A review page made for your business, with your keywords",
  "AI drafts replies to your Google reviews, in the guest's language",
  "Ready to order today in the shop below",
];

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-black px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead title="Two products. Pick one, or take both." />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <article className="flex h-full flex-col rounded-[30px] border border-lime-400/40 bg-[#0c0c0c] p-7 md:p-9">
              <span className="w-fit rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-black">Taprizz App</span>
              <h3 className="mt-5 text-4xl leading-[1.02] md:text-5xl">Your whole customer experience, on one tap.</h3>
              <ul className="mt-6 space-y-3">{APP_POINTS.map((p) => (<li key={p} className="flex gap-3 text-white/75"><Check className="mt-1 h-4 w-4 shrink-0 text-lime-400" />{p}</li>))}</ul>
              <a href="#book" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">Book a meeting <ArrowUpRight className="h-4 w-4" /></a>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col rounded-[30px] border border-white/15 p-7 md:p-9">
              <span className="w-fit rounded-full border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">AI Review QR</span>
              <h3 className="mt-5 text-4xl leading-[1.02] md:text-5xl">A plaque that gets honest reviews written.</h3>
              <ul className="mt-6 space-y-3">{QR_POINTS.map((p) => (<li key={p} className="flex gap-3 text-white/70"><Check className="mt-1 h-4 w-4 shrink-0" />{p}</li>))}</ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <a href="#shop" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold transition hover:border-lime-400 hover:text-lime-400">Shop plaques <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <div className="mt-6 rounded-[24px] bg-lime-400 p-6 text-black md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <p className="text-2xl font-semibold leading-snug md:text-3xl">Keep your Pet Pooja POS, or any POS. No new software to buy.</p>
            <p className="mt-2 max-w-md text-black/70 md:mt-0">Reviews, feedback, offers, your mini link and Gulabi Nagri work alongside your billing system. Taprizz ordering is optional.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ advantages */
const ADV: { group: string; items: { t: string; x: string }[] }[] = [
  { group: "More reviews, more trust", items: [
    { t: "More honest Google reviews", x: "A tap, a few choices, a draft the guest edits and posts themselves." },
    { t: "Fewer public surprises", x: "Guests can tell you privately what went wrong, so you hear it first." },
    { t: "Replies in seconds", x: "AI drafts a reply to each review, in the guest's language. You approve." },
  ] },
  { group: "More followers, more repeat guests", items: [
    { t: "More Instagram followers", x: "Instagram buttons on your page, and guests send photos and videos for you to post and tag." },
    { t: "Offers that bring people back", x: "Show offers on your page and let guests claim them at your counter." },
    { t: "Your own mini link", x: "One page for your Instagram bio. Edit it yourself and see which buttons get tapped." },
  ] },
  { group: "Easier for your team", items: [
    { t: "Alerts on every phone", x: "Orders, table requests and chats reach the right person." },
    { t: "Each person sees their part", x: "Owner, manager, reception, waiter and kitchen each get their own sign-in." },
    { t: "Several outlets, one view", x: "Plaques and pages for each outlet, managed together." },
  ] },
  { group: "Found by more people", items: [
    { t: "Found on Google and Maps", x: "SEO: a complete profile, fresh reviews and clear page markup." },
    { t: "Found in AI answers", x: "GEO: clear, consistent information so AI assistants can describe you." },
    { t: "Listed in Gulabi Nagri", x: "Guests nearby discover you in our Jaipur guide." },
  ] },
  { group: "No waste of money", items: [
    { t: "Keep your POS", x: "No new billing software. Pet Pooja or any POS keeps working." },
    { t: "Start small", x: "Begin with the AI Review QR plaque. Add the Taprizz App when you are ready." },
    { t: "Honest by design", x: "No fake reviews, no rewards for reviews, no guaranteed rank." },
  ] },
];

export function Advantages() {
  return (
    <section id="advantages" className="grid-light scroll-mt-20 px-5 py-20 text-ink md:px-8 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="What your business gets." subtitle="Every advantage below is something the product does today, or something we do for you." />
        <div className="space-y-10">
          {ADV.map((g) => (
            <div key={g.group}>
              <Reveal><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/50">{g.group}</h3></Reveal>
              <ul className="grid gap-3 md:grid-cols-3">
                {g.items.map((a, i) => (
                  <Reveal key={a.t} delay={i * 0.04} className="h-full">
                    <li className="h-full list-none rounded-[22px] border border-black/10 bg-white p-6">
                      <p className="flex items-start gap-2 text-xl font-semibold leading-snug"><Check className="mt-1 h-5 w-5 shrink-0" />{a.t}</p>
                      <p className="mt-2 pl-7 text-sm text-black/60">{a.x}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Gulabi Nagri and the Jaipur network */
const NETWORK = [
  { t: "Your guest sees nearby partners", x: "When a guest taps your plaque, Gulabi Nagri shows the best places near them, ranked by what real guests say." },
  { t: "Their guests see you", x: "Every partner shows the others to its own guests, so people who already go out in Jaipur find you." },
  { t: "Each new partner helps all", x: "More partners make the guide more useful, and that brings more guests back to every one of them." },
];

export function GulabiNetwork({ partners }: { partners: Partner[] }) {
  const slots = Math.max(5, partners.length + 1);
  const nodes = Array.from({ length: slots }, (_, i) => {
    const a = ((i * 360) / slots - 90) * (Math.PI / 180);
    const c = partners[i];
    return { key: c?.name ?? `open-${i}`, name: c?.name ?? "Your business", logo: c?.image ?? null, x: 50 + 37 * Math.cos(a), y: 50 + 37 * Math.sin(a) };
  });
  return (
    <section id="gulabi" className="scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#1f0d14] to-black px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <Reveal>
            <p className="mb-5 inline-block rounded-full border border-rose-300/40 px-4 py-1.5 text-sm text-rose-200">Pilot in Jaipur</p>
            <h2 className="text-5xl leading-[0.95] md:text-7xl">Gulabi Nagri: how the Jaipur network grows.</h2>
            <p className="mt-6 max-w-xl text-lg text-white/65">A guest guide for the Pink City. Cafes, salons, gyms and more, within 10 km of the guest, ranked by real guest ratings, with a gold, silver and bronze crown for the top three.</p>
          </Reveal>
          <ol className="mt-8 space-y-4">
            {NETWORK.map((n, i) => (
              <Reveal key={n.t} delay={i * 0.06}>
                <li className="flex gap-4 rounded-[20px] border border-white/12 bg-white/[0.04] p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-200 text-sm font-bold text-[#1f0d14]">{i + 1}</span>
                  <div><h3 className="text-xl">{n.t}</h3><p className="mt-1 text-sm text-white/60">{n.x}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 max-w-xl text-sm text-white/45">Gulabi Nagri is a pilot, and we are building the network partner by partner. We cannot promise a number of visits or sales.</p>
          <a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-200 px-8 py-4 font-semibold text-[#1f0d14] transition hover:bg-rose-100">Join the network: book a meeting <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-square w-full max-w-[440px]" role="img" aria-label="Partners connected through Gulabi Nagri">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {nodes.map((n) => (<line key={n.key} x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(253,205,220,0.35)" strokeWidth="0.4" strokeDasharray="1.2 1.2" />))}
            </svg>
            <div className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose-200 text-center text-[#1f0d14] shadow-[0_0_60px_rgba(253,205,220,0.35)]"><span className="text-[11px] font-bold leading-tight md:text-sm">Gulabi<br />Nagri</span></div>
            {nodes.map((n) => (
              <div key={n.key} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${n.x}%`, top: `${n.y}%`, width: "19%" }}>
                {n.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.logo} alt={`${n.name} logo`} width={80} height={80} loading="lazy" className="mx-auto aspect-square w-full rounded-full bg-white object-contain p-1 shadow-lg" />
                ) : (
                  <a href="#book" aria-label="Join the Gulabi Nagri network" className="mx-auto grid aspect-square w-full place-items-center rounded-full border-2 border-dashed border-rose-200/50 text-lg text-rose-200/70 transition hover:border-rose-200 hover:text-rose-100">+</a>
                )}
                <p className={`mt-1 text-[10px] font-medium leading-tight md:text-xs ${n.logo ? "text-white/75" : "text-white/40"}`}>{n.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ book a meeting */
const SLOTS = ["Morning, 11 AM", "Afternoon, 3 PM", "Evening, 6 PM"];
const WANTS = ["Taprizz App", "AI Review QR", "Both"];
type Day = { key: string; label: string };

// Next seven days in Indian time, starting tomorrow.
function nextDays(): Day[] {
  const f = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  const k = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.now() + (i + 1) * 864e5); return { key: k.format(d), label: f.format(d) }; });
}

export function BookMeeting({ c }: { c: SiteContent }) {
  const dm = igDm(c.footer);
  const wa = c.settings.whatsapp;
  const [days, setDays] = useState<Day[]>([]);
  const [day, setDay] = useState<Day | null>(null);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [want, setWant] = useState(WANTS[2]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "err">("idle");
  useEffect(() => { const d = nextDays(); setDays(d); setDay(d[0]); }, []);

  async function book() {
    if (!day) return;
    setState("sending");
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "slot", slot: `${day.label}, ${slot}`, interest: want }) });
      setState(r.ok ? "done" : "err");
    } catch { setState("err"); }
  }
  const chip = (on: boolean) => `rounded-full border px-4 py-2.5 text-sm font-semibold transition ${on ? "border-black bg-black text-white" : "border-black/20 bg-white hover:border-black/50"}`;

  return (
    <section id="book" className="light grid-light scroll-mt-20 border-t border-black/10 px-5 py-20 text-ink md:px-8 md:py-28">
      <span id="contact" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-6xl md:text-8xl">Book a meeting.</h2>
          <p className="mt-6 max-w-md text-lg text-black/60">Pick a day and a time. No forms, no phone number. About 20 minutes on a real phone, and we will also look at how your business shows up on Google today.</p>
          {wa && <a href={waLink(wa, "Hi Taprizz, I would like to know more.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition hover:brightness-95"><WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp {waShow(wa)}</a>}
          <ul className="mt-6 space-y-2 text-black/70">
            {["The Taprizz App and the AI Review QR plaque", "Gulabi Nagri and the Jaipur network", "How to use it with your existing POS"].map((t) => (<li key={t} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0" />{t}</li>))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
          {state === "done" || state === "err" ? (
            <div role="status">
              <p className="text-2xl font-semibold">{state === "done" ? `Your slot is noted: ${day?.label}, ${slot}.` : `Your slot: ${day?.label}, ${slot}.`}</p>
              {state === "err" && <p className="mt-2 text-black/60">We could not save it online just now, but you can send it to us below and we will confirm it.</p>}
              <p className="mt-2 text-black/60">One last step: send us the message on WhatsApp or Instagram so we can confirm it with you. Without a message we cannot reach you.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {wa && <a href={waLink(wa, `Hi Taprizz, I booked a meeting for ${day?.label}, ${slot} (${want}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition hover:brightness-95"><WhatsAppIcon className="h-5 w-5" /> Confirm on WhatsApp</a>}
                <a href={dm} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-black/85"><InstagramIcon className="h-5 w-5" /> Or on Instagram</a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <fieldset><legend className="lbl">What would you like to see?</legend><div className="flex flex-wrap gap-2">{WANTS.map((w) => (<button type="button" key={w} aria-pressed={want === w} onClick={() => setWant(w)} className={chip(want === w)}>{w}</button>))}</div></fieldset>
              <fieldset><legend className="lbl">Pick a day</legend><div className="flex flex-wrap gap-2">{days.map((d) => (<button type="button" key={d.key} aria-pressed={day?.key === d.key} onClick={() => setDay(d)} className={chip(day?.key === d.key)}>{d.label}</button>))}</div></fieldset>
              <fieldset><legend className="lbl">Pick a time</legend><div className="flex flex-wrap gap-2">{SLOTS.map((s) => (<button type="button" key={s} aria-pressed={slot === s} onClick={() => setSlot(s)} className={chip(slot === s)}>{s}</button>))}</div></fieldset>
              <button type="button" onClick={book} disabled={!day || state === "sending"} className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-black/85 disabled:opacity-60">{state === "sending" ? "Booking…" : "Book this slot"}</button>
              <p className="text-sm text-black/50">After booking, you send us one message on WhatsApp or Instagram, and we confirm.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */
