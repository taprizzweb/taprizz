"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { inr } from "@/lib/format";
import { AI_QR_TERMS, KIT, PACKAGES, PLACEMENTS, aiSaved, aiTotal, freeMonths, savedFor, setupFee, termsFor, totalFor, type Pkg } from "@/lib/plans";
import { waLink } from "@/components/sections/Footerish";

type Track = "app" | "plates";
const box = "rounded-[24px] border border-white/12 bg-[#0c0c0c] p-5 md:p-7";
const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-lime-400";
const num = (v: string) => Math.max(0, Math.min(999, Math.floor(Number(v) || 0)));

function Pill({ on, onClick, children, sub, tag }: { on: boolean; onClick: () => void; children: React.ReactNode; sub?: string; tag?: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`relative rounded-2xl border-2 p-4 text-left transition ${on ? "border-lime-400 bg-lime-400/10" : "border-white/10 hover:border-white/30"}`}>
      {tag && <span className="absolute -top-3 left-3 rounded-full bg-lime-400 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">{tag}</span>}
      <span className="flex items-center gap-2 font-semibold">{on && <Check className="h-4 w-4 text-lime-400" />}{children}</span>
      {sub && <span className="mt-1 block text-xs text-white/55">{sub}</span>}
    </button>
  );
}

export function StartClient({ whatsapp, brand, track }: { whatsapp: string; brand: string; track: Track }) {
  const [pkgId, setPkgId] = useState<Pkg["id"]>("growth");
  const pkg = PACKAGES.find((p) => p.id === pkgId)!;
  const TERMS = termsFor(pkg);
  const [months, setMonths] = useState(6);
  const term = TERMS.find((t) => t.months === months) ?? TERMS[1];
  const [place, setPlace] = useState<string[]>(["tabletop"]);
  const [tap, setTap] = useState<"nfcqr" | "qr">("nfcqr");
  const [plateType, setPlateType] = useState<"qr" | "nfcqr">("nfcqr");
  const [aiMonths, setAiMonths] = useState<number>(6);
  const aiTerm = AI_QR_TERMS.find((t) => t.months === aiMonths) ?? AI_QR_TERMS[1];
  const [tables, setTables] = useState("");
  const [counterYes, setCounterYes] = useState(false);
  const [counters, setCounters] = useState("1");
  const [custom, setCustom] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [f, setF] = useState({ name: "", phone: "", location: "", business: "", agree: false, website: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id: string) => setPlace((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const nTables = num(tables), nCounters = counterYes ? num(counters) : 0;
  const spots = nTables + nCounters;
  const plateCost = spots * KIT.platePrice[plateType];
  const setup = setupFee(spots);
  const oneTime = plateCost + setup;
  const freeTop = tap === "nfcqr" ? KIT.freeNfcTabletops : KIT.freeQrTabletops;
  const extraTop = Math.max(0, spots - freeTop);
  const extraCost = extraTop * KIT.tabletopPrice[tap === "nfcqr" ? "nfc" : "qr"];

  const lines = useMemo(() => {
    const L: string[] = [];
    if (track === "app") {
      L.push(`Taprizz App: ${pkg.name} plan, ${term.label}, ${inr(totalFor(pkg, term))}${term.off ? ` (${term.off}% off, saves ${inr(savedFor(pkg, term))})` : ""}`);
      L.push(`Wants: ${place.map((id) => PLACEMENTS.find((x) => x.id === id)?.label).join(", ") || "not chosen"} (${tap === "nfcqr" ? "NFC + QR" : "QR only"})`);
      if (place.includes("tabletop")) L.push(`Tabletops for ${spots}: ${freeTop} free${extraTop > 0 ? `, ${extraTop} more = ${inr(extraCost)}` : ""} (to be confirmed)`);
    } else {
      L.push(`AI QR: ${plateType === "qr" ? "QR plate" : "NFC + QR plate"} at ${inr(KIT.platePrice[plateType])} each`);
      L.push(`AI QR plan: ${aiTerm.label}, ${inr(aiTerm.perMonth)} a month, ${inr(aiTotal(aiTerm))}${aiSaved(aiTerm) > 0 ? ` (saves ${inr(aiSaved(aiTerm))})` : ""}`);
    }
    L.push(`Tables: ${nTables}${counterYes ? `, counters: ${nCounters}` : ", no counter plate"}`);
    if (track === "plates") L.push(`One-time: setup ${inr(setup)} + ${spots} plate${spots === 1 ? "" : "s"} ${inr(plateCost)} = ${inr(oneTime)}, plus the plan above (to be confirmed)`);
    if (custom) L.push(`Wants a custom design${customNote.trim() ? `: ${customNote.trim().slice(0, 300)}` : ""}`);
    return L;
  }, [track, pkg, term, place, tap, plateType, aiTerm, nTables, nCounters, counterYes, custom, customNote, oneTime, setup, plateCost, spots, freeTop, extraTop, extraCost]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ph = f.phone.replace(/\D/g, "").replace(/^(91|0)(?=[6-9]\d{9}$)/, "");
    if (f.name.trim().length < 2) return setErr("Please type your name.");
    if (!/^[6-9]\d{9}$/.test(ph)) return setErr("Please type your 10 digit WhatsApp number.");
    if (f.location.trim().length < 2) return setErr("Please type your location (area and city).");
    if (track === "app" && !place.length) return setErr("Please choose what you want on your tables.");
    if (nTables < 1) return setErr("Please tell us how many tables you have.");
    if (!f.agree) return setErr("Please tick the box so we can contact you.");
    setBusy(true); setErr(null);
    // Saved for the team (and the sheet, if one is connected). If it fails the customer still goes on to WhatsApp.
    await fetch("/api/leads", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: f.name.trim(), business: f.business.trim(), phone: ph, website: f.website,
        message: `ORDER FORM | Location: ${f.location.trim()} | ${lines.join(" | ")}`.slice(0, 1700),
        fields: { location: f.location.trim(), track, plan: track === "app" ? pkg.name : "", months: track === "app" ? term.months : "", tables: nTables, counters: nCounters, items: track === "app" ? place.join("+") : plateType, custom: custom ? customNote.trim() : "" },
      }),
    }).catch(() => null);
    setBusy(false); setDone(true);
  }

  const msg = `Hi Taprizz, this is ${f.name.trim()}${f.business.trim() ? ` from ${f.business.trim()}` : ""}. Location: ${f.location.trim()}. WhatsApp: ${f.phone.replace(/\D/g, "")}.\n${lines.join("\n")}\nI want to know more about this.`;

  if (done) {
    return (
      <main className="min-h-dvh bg-black px-5 py-16 text-white">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-5xl">Thank you, {f.name.trim()}.</h1>
          <p className="mt-4 text-white/70">We have your details and our team will contact you. One last step: send us the message on WhatsApp so we can start the chat.</p>
          {whatsapp && <a href={waLink(whatsapp, msg)} target="_blank" rel="noopener noreferrer" className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300">Continue on WhatsApp <ArrowUpRight className="h-4 w-4" /></a>}
          <pre className="mt-8 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm text-white/70">{msg}</pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-black text-white">
      <div className="mx-auto max-w-[900px] px-5 py-12 md:py-16">
        <p className="inline-block rounded-full border border-lime-400/40 px-4 py-1.5 text-sm text-lime-400">{brand}</p>
        <h1 className="mt-5 text-5xl leading-[0.95] md:text-7xl">{track === "app" ? "Let's get you started." : "AI QR plates for your tables."}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60">{track === "app" ? "Choose what you want, how long, and how many tables." : "Guests tap or scan your plate, pick stars, and get a review written from their own choices, made for cafes and restaurants in Jaipur."} No payment here: our team confirms everything with you on WhatsApp first.</p>

        <section className="mt-8 rounded-[24px] border border-rose-300/30 bg-gradient-to-r from-[#2a1019] to-[#120709] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">There will be a great launch</p>
          <h2 className="mt-2 text-3xl">Gulabi Nagri, the guest guide app for the Pink City</h2>
          <p className="mt-2 text-white/65">A guide for guests in Jaipur. It lists cafes, salons, gyms and more near them, ranked by real guest ratings, with a gold, silver and bronze crown for the top three. Taprizz partners join first. It is a pilot, so we cannot promise a number of visits or sales.</p>
        </section>

        <form onSubmit={submit} noValidate className="mt-8 space-y-6">
          {track === "app" && (
            <>
              <section className={box}>
                <h2 className="text-2xl">1. Pick your plan</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {PACKAGES.map((p) => (
                    <button key={p.id} type="button" aria-pressed={pkgId === p.id} onClick={() => setPkgId(p.id)} className={`relative rounded-2xl border-2 p-4 text-left transition ${pkgId === p.id ? "border-lime-400 bg-lime-400/10" : "border-white/10 hover:border-white/30"}`}>
                      {p.special && <span className="absolute -top-3 right-3 rounded-full bg-lime-400 px-3 py-0.5 text-[11px] font-bold uppercase text-black">Special offer</span>}
                      <span className="block text-2xl">{p.name}</span>
                      <span className="block text-3xl font-bold">{inr(p.price)}<span className="text-sm font-medium text-white/50"> / month</span></span>
                      <span className="mt-1 block text-xs text-white/55">{p.lead}</span>
                    </button>
                  ))}
                </div>
                <ul className="mt-4 space-y-2 text-[15px] text-white/80">
                  {pkg.features.map((x) => (<li key={x.text} className={`flex items-start gap-2 ${x.included === false ? "opacity-40" : ""}`}><Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />{x.text}</li>))}
                </ul>
              </section>

              <section className={box}>
                <h2 className="text-2xl">2. How many months?</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {TERMS.map((t) => (
                    <Pill key={t.months} on={months === t.months} onClick={() => setMonths(t.months)} sub={t.off ? `${t.off}% off${t.special ? " (special offer)" : ""}. You save ${inr(savedFor(pkg, t))}, about ${freeMonths(pkg, t)} months free.` : "No discount"}>
                      {t.label}: {inr(totalFor(pkg, t))}
                    </Pill>
                  ))}
                </div>
              </section>

              <section className={box}>
                <h2 className="text-2xl">3. What should we put on your tables?</h2>
                <p className="mt-1 text-sm text-white/55">Choose one or more.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {PLACEMENTS.map((x) => (<Pill key={x.id} on={place.includes(x.id)} onClick={() => toggle(x.id)} sub={x.help}>{x.label}</Pill>))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Tap type">
                  <Pill on={tap === "nfcqr"} onClick={() => setTap("nfcqr")} tag="Latest technology · Most recommended" sub="Guests tap the phone or scan.">NFC + QR</Pill>
                  <Pill on={tap === "qr"} onClick={() => setTap("qr")} sub="Guests scan.">QR only</Pill>
                </div>
                <div className="mt-4 rounded-xl bg-lime-400/10 p-4 text-sm text-white/85">
                  <p>With an app plan you start with <strong>{KIT.freeNfcTabletops} NFC technology based tabletops free</strong>, or <strong>{KIT.freeQrTabletops} QR technology based tabletops free</strong>.</p>
                  <p className="mt-1">After the free ones: QR based {inr(KIT.tabletopPrice.qr)} each, NFC based {inr(KIT.tabletopPrice.nfc)} each. NFC is the latest technology.</p>
                  {place.includes("tabletop") && spots > 0 && <p className="mt-2">For {spots} tabletop{spots === 1 ? "" : "s"}: {extraTop > 0 ? <>{freeTop} free + {extraTop} more = <strong>{inr(extraCost)}</strong></> : <>all {spots} free</>}.</p>}
                  <p className="mt-2 text-xs text-white/50">Our team confirms the final amount with you.</p>
                </div>
              </section>
            </>
          )}

          {track === "plates" && (
            <>
              <section className={box}>
                <h2 className="text-2xl">1. Pick your plate</h2>
                <p className="mt-1 text-sm text-white/55">A plate is slim and sits flat on the table.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Pill on={plateType === "nfcqr"} onClick={() => setPlateType("nfcqr")} tag="Latest technology · Most recommended" sub="Guests tap the phone or scan.">NFC + QR plate: {inr(KIT.platePrice.nfcqr)} each</Pill>
                  <Pill on={plateType === "qr"} onClick={() => setPlateType("qr")} sub="Guests scan to get their review page.">QR plate: {inr(KIT.platePrice.qr)} each</Pill>
                </div>
              </section>
              <section className={box}>
                <h2 className="text-2xl">2. How long do you want the AI QR plan?</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {AI_QR_TERMS.map((t) => (
                    <Pill key={t.months} on={aiMonths === t.months} onClick={() => setAiMonths(t.months)} sub={aiSaved(t) > 0 ? `${inr(aiTotal(t))} in all. You save ${inr(aiSaved(t))}.` : `${inr(aiTotal(t))} in all`}>
                      {t.label}: {inr(t.perMonth)} a month
                    </Pill>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className={box}>
            <h2 className="text-2xl">{track === "app" ? "4" : "3"}. Your place</h2>
            <label className="mt-4 block text-sm font-medium">How many tables do you have? *
              <input className={`${input} mt-1`} inputMode="numeric" aria-label="Number of tables" value={tables} onChange={(e) => setTables(e.target.value.replace(/\D/g, "").slice(0, 3))} />
            </label>
            <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Counter plate">
              <Pill on={counterYes} onClick={() => setCounterYes(true)}>Yes, also at the counter</Pill>
              <Pill on={!counterYes} onClick={() => setCounterYes(false)}>No, only on tables</Pill>
            </div>
            {counterYes && (
              <label className="mt-4 block text-sm font-medium">How many counters?
                <input className={`${input} mt-1`} inputMode="numeric" aria-label="Number of counters" value={counters} onChange={(e) => setCounters(e.target.value.replace(/\D/g, "").slice(0, 2))} />
              </label>
            )}
            {track === "plates" && spots > 0 && (
              <div className="mt-4 rounded-xl bg-lime-400/10 p-4 text-sm text-white/85">
                <p>Setup: <strong>{inr(setup)}</strong> {spots === 1 ? "(for 1 plate)" : spots === 2 ? "(for 2 plates)" : "(the setup stays the same for 3 or more plates)"}</p>
                <p className="mt-1">{spots} plate{spots === 1 ? "" : "s"} x {inr(KIT.platePrice[plateType])}: <strong>{inr(plateCost)}</strong></p>
                <p className="mt-1">One-time total: <strong>{inr(oneTime)}</strong>, plus {inr(aiTerm.perMonth)} a month for the plan.</p>
                <p className="mt-2 text-xs text-white/50">Our team confirms the final amount with you.</p>
              </div>
            )}
          </section>

          <section className={box}>
            <h2 className="text-2xl">{track === "app" ? "5" : "4"}. Your design</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Design">
              <Pill on={!custom} onClick={() => setCustom(false)} sub="We will use the standard design we show you.">Standard design</Pill>
              <Pill on={custom} onClick={() => setCustom(true)} sub="Tell us what you want and we will talk to you directly.">Customize your design</Pill>
            </div>
            {custom && <textarea className={`${input} mt-4`} rows={3} maxLength={300} placeholder="What do you need? Colours, logo, size, words..." aria-label="Design request" value={customNote} onChange={(e) => setCustomNote(e.target.value)} />}
          </section>

          <section className={box}>
            <h2 className="text-2xl">{track === "app" ? "6" : "5"}. Who are you?</h2>
            <div className="mt-4 space-y-3">
              <input className={input} placeholder="Your name *" aria-label="Your name" autoComplete="name" maxLength={100} value={f.name} onChange={(e) => set("name", e.target.value)} />
              <input className={input} placeholder="Business name" aria-label="Business name" autoComplete="organization" maxLength={150} value={f.business} onChange={(e) => set("business", e.target.value)} />
              <input className={input} placeholder="WhatsApp number *" aria-label="WhatsApp number" inputMode="numeric" autoComplete="tel" maxLength={14} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
              <input className={input} placeholder="Location: area and city *" aria-label="Location" autoComplete="street-address" maxLength={150} value={f.location} onChange={(e) => set("location", e.target.value)} />
              <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.website} onChange={(e) => set("website", e.target.value)} />
              <label className="flex items-start gap-2 text-sm text-white/70"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-lime-400" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} />I agree to be contacted on WhatsApp or phone about this.</label>
            </div>
          </section>

          <section className="rounded-[24px] border border-lime-400/40 bg-lime-400/5 p-5" aria-live="polite">
            <h2 className="text-xl">Your choice</h2>
            <ul className="mt-2 space-y-1 text-white/80">{lines.map((l) => (<li key={l}>{l}</li>))}</ul>
          </section>

          {err && <p role="alert" className="text-sm font-medium text-rose-300">{err}</p>}
          <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 text-lg font-semibold text-black transition hover:bg-lime-300 disabled:opacity-50">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Send my choice</button>
          <p className="text-center text-xs text-white/40">Nothing is paid on this page.</p>
        </form>
      </div>
    </main>
  );
}
