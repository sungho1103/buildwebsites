import { createOffering } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Button, PageHeader, Panel, Select, TextArea, TextInput } from "@/components/ui";
import { date, money } from "@/lib/format";
import { getAdminChurch, getMembers, getOfferings, requireRole } from "@/lib/data";

export default async function AdminOfferingsPage() {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  const [members, offerings] = await Promise.all([getMembers(church.id), getOfferings(church.id)]);
  return (
    <>
      <PageHeader title="헌금관리" description="헌금 데이터는 공개 화면에 노출하지 않는 관리자 전용 데이터입니다." />
      <Panel title="헌금 등록">
        <form action={createOffering} className="grid gap-4 md:grid-cols-4">
          <label className="text-sm font-semibold">교인<Select name="member_id" className="mt-1"><option value="">직접 입력</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</Select></label>
          <label className="text-sm font-semibold">헌금자<TextInput name="giver_name" required className="mt-1" /></label>
          <label className="text-sm font-semibold">금액<TextInput name="amount" type="number" required className="mt-1" /></label>
          <label className="text-sm font-semibold">일자<TextInput name="offered_at" type="date" required className="mt-1" /></label>
          <label className="text-sm font-semibold">종류<Select name="offering_type" className="mt-1"><option>십일조</option><option>감사헌금</option><option>주일헌금</option><option>선교헌금</option><option>기타</option></Select></label>
          <label className="text-sm font-semibold md:col-span-3">메모<TextArea name="memo" className="mt-1" /></label>
          <div className="md:col-span-4"><Button type="submit">등록</Button></div>
        </form>
      </Panel>
      <div className="mt-6"><DataTable headers={["헌금자", "종류", "금액", "일자", "메모"]} rows={offerings.map((item) => [item.giver_name, item.offering_type, money(item.amount), date(item.offered_at), item.memo ?? "-"])} /></div>
    </>
  );
}
