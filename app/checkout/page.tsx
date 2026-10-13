import { getContent } from "@/lib/content";
import { CheckoutClient } from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const c = await getContent();
  return <CheckoutClient settings={c.settings} />;
}
