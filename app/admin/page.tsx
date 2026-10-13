import { adminEnabled, isAdmin } from "@/lib/adminAuth";
import { AdminClient } from "./AdminClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Taprizz Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminClient enabled={adminEnabled()} authed={isAdmin()} />;
}
