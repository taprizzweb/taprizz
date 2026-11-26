import type { Metadata } from "next";
import { forPublic, getContent } from "@/lib/content";
import { Custom } from "@/components/sections/Custom";

export const revalidate = 60;
export const metadata: Metadata = { title: "Your customized customer experience | Taprizz", robots: { index: false, follow: false } };

// A link the owner can send to a business that wants its own customer flow, website or app.
export default async function Page() {
  const c = forPublic(await getContent());
  return <main><Custom standalone whatsapp={c.settings.whatsapp} /></main>;
}
