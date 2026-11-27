import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Privacy Policy | Taprizz",
  description: "How Taprizz collects, uses and protects your information when you order from us or contact us.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { title: "Privacy Policy | Taprizz", description: "How Taprizz collects, uses and protects your information when you order from us or contact us.", url: `${SITE_URL}/privacy`, siteName: "Taprizz", locale: "en_IN", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taprizz" }] },
};

export default function Page() {
  return <LegalPage title="Privacy Policy" field="privacy" />;
}
