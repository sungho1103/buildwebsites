import { updateDeploymentStatus } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Button, PageHeader, Select, TextInput } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurches, getDeployments } from "@/lib/data";

export default async function MasterDeploymentsPage() {
  const [deployments, churches] = await Promise.all([getDeployments(), getChurches()]);
  const churchName = (id: string) => churches.find((church) => church.id === id)?.name ?? id;
  return (
    <>
      <PageHeader title="배포 관리" description="초기 버전은 실제 Vercel API 호출 없이 상태와 URL만 관리합니다." />
      <DataTable headers={["교회", "상태", "URL", "배포일", "상태 변경"]} rows={deployments.map((item) => [
        churchName(item.church_id),
        item.status,
        item.deployment_url ?? "-",
        date(item.deployed_at),
        <form key={item.id} action={updateDeploymentStatus} className="flex min-w-[420px] gap-2"><input type="hidden" name="id" value={item.id} /><Select name="status" defaultValue={item.status}><option value="waiting">waiting</option><option value="deploying">deploying</option><option value="success">success</option><option value="failed">failed</option></Select><TextInput name="deployment_url" placeholder="URL" defaultValue={item.deployment_url ?? ""} /><TextInput name="memo" placeholder="메모" defaultValue={item.memo ?? ""} /><Button type="submit">저장</Button></form>
      ])} />
    </>
  );
}
