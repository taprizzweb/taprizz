import { getContent } from "@/lib/content";
import { CheckoutClient } from "./CheckoutClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Checkout | Taprizz", robots: { index: false, follow: false } };

export default async function CheckoutPage() {
  const c = await getContent();
  return <CheckoutClient settings={c.settings} />;
}
