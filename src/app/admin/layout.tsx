import { AdminShell } from "@/components/admin-shell";
import { getAdminChurch, requireRole } from "@/lib/data";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  const church = await getAdminChurch(profile);
  return <AdminShell profile={profile} church={church} mode="admin">{children}</AdminShell>;
}
