import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getContentAdmin } from "@/lib/content";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getContentAdmin());
}

export async function PUT(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "Database not connected. Add Supabase env vars." }, { status: 503 });
  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object" || !data.settings || !Array.isArray(data.products) || !Array.isArray(data.plans)) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
  const { error } = await db.from("site_content").upsert({ id: 1, data, updated_at: new Date().toISOString() });
  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ ok: true });
}
