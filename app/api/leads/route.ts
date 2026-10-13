import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b?.name || !b?.phone) return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  const row = { name: String(b.name).slice(0, 100), business: String(b.business ?? "").slice(0, 150), phone: String(b.phone).slice(0, 20), message: String(b.message ?? "").slice(0, 1000) };
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const { error } = await db.from("leads").insert(row);
  return error ? NextResponse.json({ error: "Failed" }, { status: 500 }) : NextResponse.json({ ok: true });
}
