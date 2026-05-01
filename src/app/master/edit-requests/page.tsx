import { updateEditRequestStatus } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Badge, Button, PageHeader, Select, TextInput } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurches, getEditRequests } from "@/lib/data";

export default async function MasterEditRequestsPage() {
  const [requests, churches] = await Promise.all([getEditRequests(), getChurches()]);
  const churchName = (id: string) => churches.find((church) => church.id === id)?.name ?? id;
  return (
    <>
      <PageHeader title="전체 수정 요청 관리" description="AI 수정안 승인/거절과 상태 변경을 수동으로 처리합니다." />
      <DataTable headers={["교회", "요청", "상태", "등록일", "상태 변경"]} rows={requests.map((item) => [
        churchName(item.church_id),
        item.request_text,
        <Badge key={`${item.id}-status`} tone="blue">{item.status}</Badge>,
        date(item.created_at),
        <form key={item.id} action={updateEditRequestStatus} className="flex min-w-[360px] gap-2"><input type="hidden" name="id" value={item.id} /><Select name="status" defaultValue={item.status}><option value="pending">pending</option><option value="ai_reviewed">ai_reviewed</option><option value="approved">approved</option><option value="rejected">rejected</option><option value="applied">applied</option><option value="deployed">deployed</option></Select><TextInput name="master_memo" placeholder="메모" defaultValue={item.master_memo ?? ""} /><Button type="submit">저장</Button></form>
      ])} />
    </>
  );
}
