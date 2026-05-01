import { notFound } from "next/navigation";
import { PageHeader, Panel } from "@/components/ui";
import { getChurchBySlug } from "@/lib/data";

export default async function LocationPage({ params }: { params: Promise<{ churchSlug: string }> }) {
  const { churchSlug } = await params;
  const church = await getChurchBySlug(churchSlug);
  if (!church) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader title="오시는 길" />
      <Panel>
        <div className="space-y-3 text-sm text-slate-700">
          <p><b>주소</b> {church.address}</p>
          <p><b>전화</b> {church.phone}</p>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-100 text-muted">지도 연동 영역</div>
        </div>
      </Panel>
    </main>
  );
}
