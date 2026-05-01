import { Badge, PageHeader, Panel } from "@/components/ui";
import { DataTable } from "@/components/data-table";
import { date, money } from "@/lib/format";
import { getAdminChurch, getEditRequests, getMembers, getOfferings, getPosts, getVideos, requireRole } from "@/lib/data";

export default async function AdminDashboardPage() {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회가 연결되지 않았습니다" />;
  const [videos, posts, members, offerings, requests] = await Promise.all([getVideos(church.id), getPosts(church.id), getMembers(church.id), getOfferings(church.id), getEditRequests(church.id)]);
  const totalOffering = offerings.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <PageHeader title="교회 관리자 대시보드" description={`${church.name} 운영 현황`} />
      <div className="grid gap-4 md:grid-cols-4">
        <Panel title="영상"><div className="text-2xl font-bold">{videos.length}</div></Panel>
        <Panel title="게시글"><div className="text-2xl font-bold">{posts.length}</div></Panel>
        <Panel title="교인"><div className="text-2xl font-bold">{members.length}</div></Panel>
        <Panel title="헌금 합계"><div className="text-2xl font-bold">{money(totalOffering)}</div></Panel>
      </div>
      <div className="mt-6">
        <DataTable headers={["최근 수정 요청", "상태", "등록일"]} rows={requests.slice(0, 5).map((item) => [item.request_text, <Badge key={item.id}>{item.status}</Badge>, date(item.created_at)])} />
      </div>
    </>
  );
}
