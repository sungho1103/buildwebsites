import { PageHeader, Panel, TextInput, Button } from "@/components/ui";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <PageHeader title="관리자 로그인" description="Supabase Auth 연결 후 이메일 로그인 또는 매직링크를 붙일 수 있는 자리입니다." />
      <Panel>
        <form className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">이메일<TextInput name="email" type="email" placeholder="admin@example.com" className="mt-1" /></label>
          <label className="block text-sm font-semibold text-slate-700">비밀번호<TextInput name="password" type="password" placeholder="********" className="mt-1" /></label>
          <Button type="button" className="w-full">로그인 UI 준비됨</Button>
        </form>
      </Panel>
    </main>
  );
}
