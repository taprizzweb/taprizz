import type { Metadata } from "next";
import { forPublic, getContent } from "@/lib/content";
import { StartClient } from "../StartClient";

export const revalidate = 60;
export const metadata: Metadata = { title: "Taprizz App: start | Taprizz", robots: { index: false, follow: false } };

// The quotation link for the Taprizz App plans. Not listed in search.
export default async function Page() {
  const c = forPublic(await getContent());
  return <StartClient track="app" whatsapp={c.settings.whatsapp} brand={c.settings.brand} />;
}
