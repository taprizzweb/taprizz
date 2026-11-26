import type { Metadata } from "next";
import { forPublic, getContent } from "@/lib/content";
import { StartClient } from "./StartClient";

export const revalidate = 60;
// A page the owner sends to a customer after a meeting. It is not listed in search.
export const metadata: Metadata = { title: "Start with Taprizz", robots: { index: false, follow: false } };

export default async function Start() {
  const c = forPublic(await getContent());
  return <StartClient whatsapp={c.settings.whatsapp} brand={c.settings.brand} />;
}
