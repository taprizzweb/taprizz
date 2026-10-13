import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  const file = (await req.formData()).get("file");
  if (!(file instanceof File) || !TYPES[file.type] || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Upload a JPG/PNG/WebP image under 5MB" }, { status: 400 });
  }
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${TYPES[file.type]}`;
  const { error } = await db.storage.from("media").upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ url: db.storage.from("media").getPublicUrl(path).data.publicUrl });
}
