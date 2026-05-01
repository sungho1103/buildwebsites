import { createEditRequest } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Badge, Button, PageHeader, Panel, TextArea } from "@/components/ui";
import { date } from "@/lib/format";
import { getAdminChurch, getEditRequests, requireRole } from "@/lib/data";

export default async function AdminEditRequestsPage() {
  const profile = await requireRole(["church_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  const requests = await getEditRequests(church.id);
  return (
    <>
      <PageHeader title="AI 수정 요청" description="초기 버전에서는 요청 저장과 상태 확인까지만 처리합니다." />
      <Panel title="수정 요청 등록">
        <form action={createEditRequest} className="space-y-4">
          <TextArea name="request_text" required placeholder="예: 메인 화면에 다음 주 부흥회 배너를 추가해주세요." />
          <Button type="submit">요청 등록</Button>
        </form>
      </Panel>
      <div className="mt-6"><DataTable headers={["요청 내용", "AI 요약", "상태", "등록일"]} rows={requests.map((item) => [item.request_text, item.ai_summary ?? "-", <Badge key={item.id} tone="blue">{item.status}</Badge>, date(item.created_at)])} /></div>
    </>
  );
}
