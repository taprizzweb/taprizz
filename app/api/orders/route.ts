import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { priceItems } from "@/lib/pricing";
import { supabaseAdmin } from "@/lib/supabase";

const clean = (v: unknown, n = 300) => String(v ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  const c = body.customer ?? {};
  const customer = {
    name: clean(c.name, 100), business: clean(c.business, 150), phone: clean(c.phone, 20), email: clean(c.email, 150),
    address: clean(c.address, 400), city: clean(c.city, 80), pincode: clean(c.pincode, 10),
    instagram: clean(c.instagram, 150), mapsLink: clean(c.mapsLink, 400), notes: clean(c.notes, 1000),
  };
  if (!customer.name || !customer.business || !/^[+\d][\d\s-]{8,17}$/.test(customer.phone) || !/^\S+@\S+\.\S+$/.test(customer.email) || !customer.address || !customer.city || !customer.pincode) {
    return NextResponse.json({ error: "Please fill all required details correctly." }, { status: 400 });
  }
  const content = await getContent();
  const priced = priceItems(Array.isArray(body.items) ? body.items : [], content);
  if ("error" in priced) return NextResponse.json({ error: priced.error }, { status: 400 });

  const code = "TZ" + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase();
  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from("orders").insert({ code, customer, items: priced.items, total: priced.total, status: "awaiting_payment" });
    if (error) return NextResponse.json({ error: "Could not create order. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ code, total: priced.total, items: priced.items, saved: Boolean(db) });
}
