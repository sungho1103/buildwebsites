import { AdminShell } from "@/components/admin-shell";
import { requireRole } from "@/lib/data";

export default async function MasterLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireRole(["master_admin"]);
  return <AdminShell profile={profile} mode="master">{children}</AdminShell>;
}
