import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const NAME = "tz_admin";
const token = () => (process.env.ADMIN_PASSWORD ? createHmac("sha256", process.env.ADMIN_PASSWORD).update("taprizz-admin-v1").digest("hex") : "");

export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkPassword(p: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = createHmac("sha256", "k").update(p).digest();
  const b = createHmac("sha256", "k").update(real).digest();
  return timingSafeEqual(a, b);
}

export function isAdmin() {
  const t = token();
  const got = cookies().get(NAME)?.value ?? "";
  if (!t || got.length !== t.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(t));
}

export const setAdminCookie = () => ({ name: NAME, value: token(), httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
export const ADMIN_COOKIE = NAME;
