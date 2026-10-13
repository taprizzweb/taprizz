"use client";
import { useCallback, useEffect, useState } from "react";
import { LogOut, Save } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { inr } from "@/lib/format";
import { JsonEditor } from "./JsonEditor";

const STATUSES = ["awaiting_payment", "payment_submitted", "paid", "designing", "shipped", "delivered", "rejected", "cancelled"];
const SECTIONS: [keyof SiteContent, string][] = [
  ["settings", "Settings & UPI"], ["products", "Products"], ["addons", "Add-ons"], ["plans", "Retainer plans"], ["hero", "Hero"],
  ["importance", "Why reviews"], ["showcase", "Plaque scroll"], ["how", "How it works"], ["demo", "Live demo"],
  ["comparison", "Comparison table"], ["audience", "Audience"], ["roadmap", "Roadmap"], ["about", "About"], ["faq", "FAQ"],
];

export function AdminClient({ enabled, authed }: { enabled: boolean; authed: boolean }) {
  const [ok, setOk] = useState(authed);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  if (!enabled) return <Shell><p className="text-amber-400">Admin is disabled. Set the <code>ADMIN_PASSWORD</code> environment variable and redeploy.</p></Shell>;
  if (!ok) {
    return (
      <Shell>
        <form onSubmit={async (e) => { e.preventDefault(); setErr(""); const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) }); r.ok ? setOk(true) : setErr("Wrong password"); }} className="mx-auto mt-24 max-w-sm space-y-4 rounded-3xl border border-line bg-panel p-8">
          <h1 className="font-serif text-3xl gold-text">Taprizz Admin</h1>
          <div><label className="lbl" htmlFor="pw">Password</label><input id="pw" type="password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus /></div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button className="shimmer-btn animate-shimmer w-full rounded-full py-3 font-semibold text-black">Sign in</button>
        </form>
      </Shell>
    );
  }
  return <Dashboard onLogout={() => setOk(false)} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen px-4 py-8">{children}</main>;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<string>("orders");
  return (
    <Shell>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl gold-text">Taprizz Admin</h1>
          <button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); onLogout(); }} className="flex items-center gap-2 text-sm text-white/60 hover:text-white"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[["orders", "Orders"], ["leads", "Leads"], ...SECTIONS].map(([k, t]) => (
            <button key={k} onClick={() => setTab(k as string)} className={`rounded-full border px-4 py-1.5 text-sm ${tab === k ? "border-gold-400 bg-gold-400 text-black" : "border-line text-white/70 hover:border-gold-400/60"}`}>{t as string}</button>
          ))}
        </div>
        <div className="mt-6">{tab === "orders" || tab === "leads" ? <Inbox kind={tab} /> : <ContentEditor key={tab} section={tab as keyof SiteContent} />}</div>
      </div>
    </Shell>
  );
}

function ContentEditor({ section }: { section: keyof SiteContent }) {
  const [all, setAll] = useState<SiteContent | null>(null);
  const [msg, setMsg] = useState("");
  useEffect(() => { fetch("/api/admin/content").then((r) => r.json()).then(setAll); }, []);
  if (!all) return <p className="text-white/50">Loading…</p>;
  const save = async () => {
    setMsg("Saving…");
    const r = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(all) });
    const j = await r.json();
    setMsg(r.ok ? "Saved. The live site is updated." : j.error);
  };
  return (
    <div className="rounded-3xl border border-line bg-panel p-6">
      <JsonEditor value={all[section]} name={section} onChange={(v) => setAll({ ...all, [section]: v })} />
      <div className="sticky bottom-4 mt-6 flex items-center gap-4">
        <button onClick={save} className="shimmer-btn animate-shimmer flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold text-black"><Save className="h-4 w-4" /> Save changes</button>
        {msg && <span className="rounded-full bg-ink px-3 py-1 text-sm text-white/70">{msg}</span>}
      </div>
    </div>
  );
}

function Inbox({ kind }: { kind: string }) {
  const [d, setD] = useState<{ orders: any[]; leads: any[]; connected: boolean } | null>(null);
  const load = useCallback(() => { fetch("/api/admin/orders").then((r) => r.json()).then(setD); }, []);
  useEffect(load, [load]);
  if (!d) return <p className="text-white/50">Loading…</p>;
  if (!d.connected) return <p className="text-amber-400">Database not connected. Add the Supabase env vars to see orders and leads.</p>;
  if (kind === "leads") {
    return <div className="space-y-3">{d.leads.length === 0 && <p className="text-white/50">No leads yet.</p>}{d.leads.map((l) => (
      <div key={l.id} className="rounded-2xl border border-line bg-panel p-4 text-sm"><b>{l.name}</b> · {l.business} · <a className="text-gold-300" href={`https://wa.me/${String(l.phone).replace(/\D/g, "")}`}>{l.phone}</a><p className="mt-1 text-white/60">{l.message}</p><p className="mt-1 text-xs text-white/30">{new Date(l.created_at).toLocaleString()}</p></div>
    ))}</div>;
  }
  return (
    <div className="space-y-4">
      {d.orders.length === 0 && <p className="text-white/50">No orders yet.</p>}
      {d.orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-line bg-panel p-5 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><b className="text-gold-300">{o.code}</b> <span className="text-white/40">· {new Date(o.created_at).toLocaleString()}</span></div>
            <div className="flex items-center gap-3"><span className="font-serif text-xl text-gold-300">{inr(o.total)}</span>
              <select value={o.status} onChange={async (e) => { await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: o.code, status: e.target.value }) }); load(); }} className="input !w-auto !py-1.5 text-xs">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
          </div>
          <p className="mt-2">{o.customer.name} · {o.customer.business} · <a className="text-gold-300" href={`https://wa.me/${String(o.customer.phone).replace(/\D/g, "")}`}>{o.customer.phone}</a> · {o.customer.email}</p>
          <p className="text-white/55">{o.customer.address}, {o.customer.city} {o.customer.pincode}</p>
          {o.customer.mapsLink && <p className="text-white/55">Maps: {o.customer.mapsLink}</p>}{o.customer.instagram && <p className="text-white/55">Instagram: {o.customer.instagram}</p>}
          {o.customer.notes && <p className="mt-1 text-white/55">Notes: {o.customer.notes}</p>}
          <ul className="mt-2 list-disc pl-5 text-white/70">{o.items.map((i: any, k: number) => <li key={k}>{i.name} × {i.qty} — {inr(i.unitPrice * i.qty)}</li>)}</ul>
          <p className="mt-2">UTR: <b className={o.utr ? "text-emerald-400" : "text-white/40"}>{o.utr || "not submitted"}</b></p>
        </div>
      ))}
    </div>
  );
}
