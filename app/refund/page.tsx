import { LegalPage } from "@/components/LegalPage";

export const revalidate = 60;
export const metadata = { title: "Cancellation & Refund Policy | Taprizz" };

export default function Page() {
  return <LegalPage title="Cancellation & Refund Policy" field="refund" />;
}
