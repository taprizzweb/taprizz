import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (b?.website) return NextResponse.json({ ok: true }); // a hidden field only a bot fills in
  if (b?.kind === "slot") {
    // A meeting slot picked on the site. No name or phone is asked; the visitor confirms by messaging on Instagram.
    const slot = String(b.slot ?? "").slice(0, 80);
    if (!slot) return NextResponse.json({ error: "Pick a slot" }, { status: 400 });
    const db0 = supabaseAdmin();
    if (!db0) return NextResponse.json({ error: "Not configured" }, { status: 503 });
    const { error: e0 } = await db0.from("leads").insert({ name: "Website visitor", business: "", phone: "", message: `MEETING SLOT: ${slot} | Interested in: ${String(b.interest ?? "").slice(0, 60)} | Waiting for their Instagram message` });
    return e0 ? NextResponse.json({ error: "Failed" }, { status: 500 }) : NextResponse.json({ ok: true });
  }
  if (!b?.name || !b?.phone) return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  const row = { name: String(b.name).slice(0, 100), business: String(b.business ?? "").slice(0, 150), phone: String(b.phone).slice(0, 20), message: String(b.message ?? "").slice(0, 1000) };
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const { error } = await db.from("leads").insert(row);
  return error ? NextResponse.json({ error: "Failed" }, { status: 500 }) : NextResponse.json({ ok: true });
}
