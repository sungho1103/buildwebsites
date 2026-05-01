import { notFound } from "next/navigation";
import { Empty, PageHeader, Panel } from "@/components/ui";
import { date } from "@/lib/format";
import { getChurchBySlug, getPosts } from "@/lib/data";

export default async function BoardPage({ params }: { params: Promise<{ churchSlug: string }> }) {
  const { churchSlug } = await params;
  const church = await getChurchBySlug(churchSlug);
  if (!church) notFound();
  const posts = await getPosts(church.id, "board");
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader title="게시판" />
      {posts.length === 0 ? <Empty>등록된 게시글이 없습니다.</Empty> : <div className="space-y-4">{posts.map((post) => <Panel key={post.id}><div className="font-bold">{post.title}</div><div className="mt-1 text-xs text-muted">{date(post.created_at)}</div><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{post.content}</p></Panel>)}</div>}
    </main>
  );
}
