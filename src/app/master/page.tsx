import { DataTable } from "@/components/data-table";
import { Badge, PageHeader, Panel } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurches, getDeployments, getEditRequests, getSubscriptions } from "@/lib/data";

export default async function MasterDashboardPage() {
  const [churches, requests, deployments, subscriptions] = await Promise.all([getChurches(), getEditRequests(), getDeployments(), getSubscriptions()]);
  return (
    <>
      <PageHeader title="마스터 관리자 대시보드" description="전체 교회 서비스, 구독, 수정 요청, 배포 상태를 확인합니다." />
      <div className="grid gap-4 md:grid-cols-4">
        <Panel title="교회 수"><div className="text-2xl font-bold">{churches.length}</div></Panel>
        <Panel title="수정 요청"><div className="text-2xl font-bold">{requests.length}</div></Panel>
        <Panel title="배포 건"><div className="text-2xl font-bold">{deployments.length}</div></Panel>
        <Panel title="구독"><div className="text-2xl font-bold">{subscriptions.length}</div></Panel>
      </div>
      <div className="mt-6">
        <DataTable headers={["교회", "구독", "사이트", "납부기한"]} rows={churches.map((church) => [church.name, <Badge key={church.id} tone={church.subscription_status === "unpaid" ? "red" : "green"}>{church.subscription_status}</Badge>, church.site_status, date(church.payment_due_date)])} />
      </div>
    </>
  );
}
