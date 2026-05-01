import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Panel } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurchBySlug, getPosts, getVideos } from "@/lib/data";

export default async function ChurchHomePage({ params }: { params: Promise<{ churchSlug: string }> }) {
  const { churchSlug } = await params;
  const church = await getChurchBySlug(churchSlug);
  if (!church) notFound();
  const [sermons, posts] = await Promise.all([getVideos(church.id, "sermon"), getPosts(church.id, "news")]);
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_0.8fr] md:items-center">
          <div>
            <Badge tone="blue">중소형 교회 홈페이지</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink">{church.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{church.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${church.slug}/sermons`} className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">설교 보기</Link>
              <Link href={`/${church.slug}/location`} className="rounded-md border border-line bg-white px-4 py-2 text-sm font-bold text-slate-700">오시는 길</Link>
            </div>
          </div>
          <Panel title="예배 안내">
            <div className="space-y-3 text-sm text-slate-700">
              <p><b>담임목사</b> {church.pastor_name}</p>
              <p><b>예배시간</b> {church.worship_time}</p>
              <p><b>주소</b> {church.address}</p>
              <p><b>전화</b> {church.phone}</p>
            </div>
          </Panel>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 md:grid-cols-2">
        <Panel title="최근 설교">
          <div className="space-y-4">
            {sermons.slice(0, 3).map((video) => <div key={video.id} className="border-b border-line pb-3"><div className="font-bold">{video.title}</div><div className="text-sm text-muted">{video.speaker} · {date(video.preached_at)}</div></div>)}
          </div>
        </Panel>
        <Panel title="교회소식">
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => <div key={post.id} className="border-b border-line pb-3"><div className="font-bold">{post.title}</div><div className="text-sm text-muted">{date(post.created_at)}</div></div>)}
          </div>
        </Panel>
      </section>
    </main>
  );
}
