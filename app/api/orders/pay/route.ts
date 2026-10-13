import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { code, utr } = await req.json().catch(() => ({}));
  if (typeof code !== "string" || !/^\d{12}$/.test(String(utr ?? "").trim())) {
    return NextResponse.json({ error: "Enter the 12-digit UTR / UPI reference number." }, { status: 400 });
  }
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: true, saved: false });
  const { data, error } = await db.from("orders").update({ utr: String(utr).trim(), status: "payment_submitted" }).eq("code", code).eq("status", "awaiting_payment").select("code").maybeSingle();
  if (error || !data) return NextResponse.json({ error: "Order not found or already submitted." }, { status: 404 });
  return NextResponse.json({ ok: true, saved: true });
}
