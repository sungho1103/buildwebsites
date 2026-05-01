import { createVideo } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Badge, Button, PageHeader, Panel, Select, TextArea, TextInput } from "@/components/ui";
import { date } from "@/lib/format";
import { getAdminChurch, getVideos, requireRole } from "@/lib/data";

export default async function AdminVideosPage() {
  const profile = await requireRole(["church_admin"]);
  const church = await getAdminChurch(profile);
  if (!church) return <PageHeader title="교회 정보 없음" />;
  const videos = await getVideos(church.id);
  return (
    <>
      <PageHeader title="설교/찬양 영상 관리" description="영상 파일은 저장하지 않고 유튜브 URL과 썸네일 정보만 저장합니다." />
      <Panel title="영상 등록">
        <form action={createVideo} className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold">종류<Select name="type" className="mt-1"><option value="sermon">설교</option><option value="praise">찬양</option></Select></label>
          <label className="text-sm font-semibold">제목<TextInput name="title" required className="mt-1" /></label>
          <label className="text-sm font-semibold">유튜브 URL<TextInput name="youtube_url" required className="mt-1" /></label>
          <label className="text-sm font-semibold">설교자/팀<TextInput name="speaker" className="mt-1" /></label>
          <label className="text-sm font-semibold">날짜<TextInput name="preached_at" type="date" className="mt-1" /></label>
          <label className="flex items-end gap-2 text-sm font-semibold"><input type="checkbox" name="is_published" defaultChecked /> 공개</label>
          <label className="text-sm font-semibold md:col-span-3">설명<TextArea name="description" className="mt-1" /></label>
          <div className="md:col-span-3"><Button type="submit">등록</Button></div>
        </form>
      </Panel>
      <div className="mt-6"><DataTable headers={["종류", "제목", "설교자/팀", "날짜", "공개"]} rows={videos.map((item) => [item.type === "sermon" ? "설교" : "찬양", item.title, item.speaker ?? "-", date(item.preached_at), <Badge key={item.id} tone={item.is_published ? "green" : "gray"}>{item.is_published ? "공개" : "비공개"}</Badge>])} /></div>
    </>
  );
}
