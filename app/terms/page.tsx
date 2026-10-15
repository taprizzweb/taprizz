import { LegalPage } from "@/components/LegalPage";

export const dynamic = "force-dynamic";
export const metadata = { title: "Terms & Conditions | Taprizz", alternates: { canonical: "/terms" } };

export default function Page() {
  return <LegalPage title="Terms & Conditions" field="terms" />;
}
