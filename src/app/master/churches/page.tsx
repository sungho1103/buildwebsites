import { DataTable } from "@/components/data-table";
import { Badge, PageHeader, TextInput, Select } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurches } from "@/lib/data";

export default async function MasterChurchesPage() {
  const churches = await getChurches();
  return (
    <>
      <PageHeader title="전체 교회 관리" description="교회별 서비스 상태와 구독 상태를 확인합니다." />
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <TextInput placeholder="교회명 검색" />
        <Select defaultValue=""><option value="">전체 구독 상태</option><option>trial</option><option>active</option><option>unpaid</option><option>paused</option><option>cancelled</option></Select>
        <Select defaultValue=""><option value="">전체 서비스 상태</option><option>active</option><option>paused</option><option>stopped</option></Select>
      </div>
      <DataTable headers={["교회명", "슬러그", "도메인", "구독", "서비스", "배포", "생성일"]} rows={churches.map((church) => [church.name, church.slug, church.domain ?? "-", <Badge key={`${church.id}-sub`} tone={church.subscription_status === "unpaid" ? "red" : "green"}>{church.subscription_status}</Badge>, <Badge key={`${church.id}-site`}>{church.site_status}</Badge>, church.deployment_status, date(church.created_at)])} />
    </>
  );
}
