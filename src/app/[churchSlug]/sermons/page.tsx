import { notFound } from "next/navigation";
import { Empty, PageHeader } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurchBySlug, getVideos } from "@/lib/data";

export default async function SermonsPage({ params }: { params: Promise<{ churchSlug: string }> }) {
  const { churchSlug } = await params;
  const church = await getChurchBySlug(churchSlug);
  if (!church) notFound();
  const videos = await getVideos(church.id, "sermon");
  return <VideoList title="설교영상" videos={videos} />;
}

function VideoList({ title, videos }: { title: string; videos: Awaited<ReturnType<typeof getVideos>> }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader title={title} description="영상 파일은 저장하지 않고 유튜브 URL만 연결합니다." />
      {videos.length === 0 ? <Empty>등록된 영상이 없습니다.</Empty> : <div className="grid gap-5 md:grid-cols-3">{videos.map((video) => <a key={video.id} href={video.youtube_url} target="_blank" className="rounded-lg border border-line bg-white p-4"><img src={video.thumbnail_url ?? ""} alt="" className="aspect-video w-full rounded-md bg-slate-100 object-cover" /><div className="mt-3 font-bold">{video.title}</div><div className="mt-1 text-sm text-muted">{video.speaker} · {date(video.preached_at)}</div></a>)}</div>}
    </main>
  );
}
