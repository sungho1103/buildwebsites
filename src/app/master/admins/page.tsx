import { DataTable } from "@/components/data-table";
import { Badge, PageHeader, Panel, Select, TextInput, Button } from "@/components/ui";
import { mockProfile } from "@/lib/mock-data";

export default function MasterAdminsPage() {
  return (
    <>
      <PageHeader title="관리자 계정 관리" description="Supabase Auth 사용자와 profiles.role을 연결해 권한을 관리합니다." />
      <Panel title="관리자 초대 준비">
        <form className="grid gap-4 md:grid-cols-4">
          <TextInput placeholder="이메일" />
          <TextInput placeholder="이름" />
          <Select><option value="church_admin">church_admin</option><option value="finance_admin">finance_admin</option><option value="master_admin">master_admin</option></Select>
          <Button type="button">초대 UI 준비됨</Button>
        </form>
      </Panel>
      <div className="mt-6">
        <DataTable headers={["이름", "이메일", "권한", "교회"]} rows={[[mockProfile.name ?? "-", mockProfile.email ?? "-", <Badge key="role">{mockProfile.role}</Badge>, mockProfile.church_id ?? "-"]]} />
      </div>
    </>
  );
}
