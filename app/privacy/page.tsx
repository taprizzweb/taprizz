import { LegalPage } from "@/components/LegalPage";

export const revalidate = 60;
export const metadata = { title: "Privacy Policy | Taprizz" };

export default function Page() {
  return <LegalPage title="Privacy Policy" field="privacy" />;
}
