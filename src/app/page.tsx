import Link from "next/link";
import { PageHeader, Panel } from "@/components/ui";
import { getChurches } from "@/lib/data";

export default async function HomePage() {
  const churches = await getChurches();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader title="교회 홈페이지 플랫폼" description="중소형 교회를 위한 홈페이지, 교인관리, 헌금관리, 운영자 시스템 MVP" action={<Link className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white" href="/admin">관리자 접속</Link>} />
      <section className="grid gap-4 md:grid-cols-3">
        {churches.map((church) => (
          <Link key={church.id} href={`/${church.slug}`} className="rounded-lg border border-line bg-white p-5 hover:border-brand">
            <div className="text-lg font-bold text-ink">{church.name}</div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{church.intro}</p>
            <div className="mt-4 text-xs text-slate-500">{church.address}</div>
          </Link>
        ))}
      </section>
      <div className="mt-8">
        <Panel title="MVP 범위">
          <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-4">
            <div>공개 홈페이지</div>
            <div>교회 관리자 CRUD</div>
            <div>헌금/교인 권한 분리</div>
            <div>마스터 운영 상태 관리</div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
