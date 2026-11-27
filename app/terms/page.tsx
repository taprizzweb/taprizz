import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Terms & Conditions | Taprizz",
  description: "Terms and conditions for using the Taprizz website and ordering Taprizz plates, plans and services in Jaipur.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: { title: "Terms & Conditions | Taprizz", description: "Terms and conditions for using the Taprizz website and ordering Taprizz plates, plans and services in Jaipur.", url: `${SITE_URL}/terms`, siteName: "Taprizz", locale: "en_IN", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taprizz" }] },
};

export default function Page() {
  return <LegalPage title="Terms & Conditions" field="terms" />;
}
