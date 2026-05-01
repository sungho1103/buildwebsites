import { createPost } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Badge, Button, PageHeader, Panel, Select, TextArea, TextInput } from "@/components/ui";
import { date } from "@/lib/format";
import { getAdminChurch, getPosts, requireRole } from "@/lib/data";

export default async function AdminPostsPage() {
  const profile = await requireRole(["church_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  const posts = await getPosts(church.id);
  return (
    <>
      <PageHeader title="교회소식/게시판 관리" description="공지와 게시판 글을 한 화면에서 관리합니다." />
      <Panel title="게시글 등록">
        <form action={createPost} className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">종류<Select name="type" className="mt-1"><option value="news">교회소식</option><option value="board">게시판</option></Select></label>
          <label className="text-sm font-semibold">제목<TextInput name="title" required className="mt-1" /></label>
          <label className="text-sm font-semibold md:col-span-2">내용<TextArea name="content" required className="mt-1" /></label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="is_published" defaultChecked /> 공개</label>
          <div><Button type="submit">등록</Button></div>
        </form>
      </Panel>
      <div className="mt-6"><DataTable headers={["종류", "제목", "등록일", "공개"]} rows={posts.map((item) => [item.type === "news" ? "교회소식" : "게시판", item.title, date(item.created_at), <Badge key={item.id} tone={item.is_published ? "green" : "gray"}>{item.is_published ? "공개" : "비공개"}</Badge>])} /></div>
    </>
  );
}
