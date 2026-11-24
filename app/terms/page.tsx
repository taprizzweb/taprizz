import { LegalPage } from "@/components/LegalPage";

export const revalidate = 60;
export const metadata = { title: "Terms & Conditions | Taprizz" };

export default function Page() {
  return <LegalPage title="Terms & Conditions" field="terms" />;
}
