import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

const STATUSES = ["awaiting_payment", "payment_submitted", "paid", "designing", "shipped", "delivered", "rejected", "cancelled"];

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ orders: [], leads: [], connected: false });
  const [o, l] = await Promise.all([
    db.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
    db.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
  ]);
  return NextResponse.json({ orders: o.data ?? [], leads: l.data ?? [], connected: true });
}

export async function PATCH(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { code, status } = await req.json().catch(() => ({}));
  if (!STATUSES.includes(status) || typeof code !== "string") return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "No database" }, { status: 503 });
  const { error } = await db.from("orders").update({ status }).eq("code", code);
  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ ok: true });
}
