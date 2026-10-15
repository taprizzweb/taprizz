"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Lead form for Instagram traffic. The source is stored in the message so no DB change is needed.
export function IgLeadForm({ source }: { source: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    f.message = `[source: ${source}] ${f.message ?? ""}`.trim();
    setState("sending");
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      setState(r.ok ? "done" : "err");
    } catch { setState("err"); }
  }
  if (state === "done") return <p className="rounded-2xl bg-lime-400 p-5 font-medium text-black">Thanks! We will WhatsApp you shortly.</p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      <div><label className="lbl" htmlFor="ig-name">Name</label><input id="ig-name" name="name" required className="input" /></div>
      <div><label className="lbl" htmlFor="ig-biz">Business name</label><input id="ig-biz" name="business" className="input" /></div>
      <div><label className="lbl" htmlFor="ig-phone">WhatsApp number</label><input id="ig-phone" name="phone" required inputMode="tel" placeholder="+91" className="input" /></div>
      <button disabled={state === "sending"} className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">{state === "sending" ? "Sending…" : "Get a free demo"} <ArrowUpRight className="h-4 w-4" /></button>
      {state === "err" && <p className="text-sm text-red-400">Could not send. Please WhatsApp us instead.</p>}
    </form>
  );
}
