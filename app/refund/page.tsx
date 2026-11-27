import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Taprizz",
  description: "Taprizz cancellation and refund policy for plates, plans and custom design.",
  alternates: { canonical: `${SITE_URL}/refund` },
  openGraph: { title: "Cancellation & Refund Policy | Taprizz", description: "Taprizz cancellation and refund policy for plates, plans and custom design.", url: `${SITE_URL}/refund`, siteName: "Taprizz", locale: "en_IN", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taprizz" }] },
};

export default function Page() {
  return <LegalPage title="Cancellation & Refund Policy" field="refund" />;
}
