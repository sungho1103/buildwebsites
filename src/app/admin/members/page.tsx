import { createMember } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Button, PageHeader, Panel, Select, TextArea, TextInput } from "@/components/ui";
import { getAdminChurch, getMembers, requireRole } from "@/lib/data";

export default async function AdminMembersPage() {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  const members = await getMembers(church.id);
  return (
    <>
      <PageHeader title="교인관리" description="민감정보이므로 church_id와 관리자 권한 기준으로만 접근합니다." />
      <Panel title="교인 등록">
        <form action={createMember} className="grid gap-4 md:grid-cols-4">
          <label className="text-sm font-semibold">이름<TextInput name="name" required className="mt-1" /></label>
          <label className="text-sm font-semibold">전화<TextInput name="phone" className="mt-1" /></label>
          <label className="text-sm font-semibold">생년월일<TextInput name="birthdate" type="date" className="mt-1" /></label>
          <label className="text-sm font-semibold">직분<TextInput name="position" className="mt-1" /></label>
          <label className="text-sm font-semibold">구역<TextInput name="group_name" className="mt-1" /></label>
          <label className="text-sm font-semibold">상태<Select name="status" className="mt-1"><option value="active">활동</option><option value="inactive">비활동</option></Select></label>
          <label className="text-sm font-semibold md:col-span-2">주소<TextInput name="address" className="mt-1" /></label>
          <label className="text-sm font-semibold md:col-span-4">메모<TextArea name="memo" className="mt-1" /></label>
          <div className="md:col-span-4"><Button type="submit">등록</Button></div>
        </form>
      </Panel>
      <div className="mt-6"><DataTable headers={["이름", "전화", "직분", "구역", "상태"]} rows={members.map((item) => [item.name, item.phone ?? "-", item.position ?? "-", item.group_name ?? "-", item.status])} /></div>
    </>
  );
}
