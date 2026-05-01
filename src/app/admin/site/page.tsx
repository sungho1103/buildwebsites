import { updateChurchInfo } from "@/lib/actions";
import { getAdminChurch, requireRole } from "@/lib/data";
import { Button, PageHeader, Panel, TextArea, TextInput } from "@/components/ui";

export default async function AdminSitePage() {
  const profile = await requireRole(["church_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  return (
    <>
      <PageHeader title="교회 기본정보 관리" description="공개 홈페이지에 표시되는 기본 내용을 수정합니다." />
      <Panel>
        <form action={updateChurchInfo} className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">교회명<TextInput name="name" defaultValue={church.name} className="mt-1" /></label>
          <label className="text-sm font-semibold">담임목사<TextInput name="pastor_name" defaultValue={church.pastor_name ?? ""} className="mt-1" /></label>
          <label className="text-sm font-semibold md:col-span-2">소개<TextArea name="intro" defaultValue={church.intro ?? ""} className="mt-1" /></label>
          <label className="text-sm font-semibold">예배시간<TextInput name="worship_time" defaultValue={church.worship_time ?? ""} className="mt-1" /></label>
          <label className="text-sm font-semibold">전화<TextInput name="phone" defaultValue={church.phone ?? ""} className="mt-1" /></label>
          <label className="text-sm font-semibold md:col-span-2">주소<TextInput name="address" defaultValue={church.address ?? ""} className="mt-1" /></label>
          <div className="md:col-span-2"><Button type="submit">저장</Button></div>
        </form>
      </Panel>
    </>
  );
}
