import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Church, Profile } from "@/types/database";

const adminMenu = [
  ["대시보드", "/admin"],
  ["기본정보", "/admin/site"],
  ["영상관리", "/admin/videos"],
  ["게시글관리", "/admin/posts"],
  ["교인관리", "/admin/members"],
  ["헌금관리", "/admin/offerings"],
  ["AI 수정요청", "/admin/edit-requests"]
];

const masterMenu = [
  ["대시보드", "/master"],
  ["전체 교회", "/master/churches"],
  ["수정 요청", "/master/edit-requests"],
  ["배포 관리", "/master/deployments"],
  ["구독 관리", "/master/subscriptions"],
  ["관리자 계정", "/master/admins"]
];

export function AdminShell({ children, profile, church, mode }: { children: React.ReactNode; profile: Profile; church?: Church | null; mode: "admin" | "master" }) {
  const menu = mode === "master" ? masterMenu : adminMenu;
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-white p-5 lg:block">
        <div className="mb-8">
          <div className="text-lg font-bold text-ink">{mode === "master" ? "마스터 운영" : church?.name ?? "교회 관리자"}</div>
          <div className="mt-1 text-xs text-muted">{profile.email}</div>
        </div>
        <nav className="space-y-1">
          {menu.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2 lg:hidden">
              {menu.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                  {label}
                </Link>
              ))}
            </div>
            <div className="text-sm text-muted">{mode === "master" ? "전체 교회 운영 상태 관리" : "교회 홈페이지와 운영 데이터를 관리합니다."}</div>
            {church?.subscription_status === "unpaid" ? <Badge tone="red">구독 미납 상태</Badge> : null}
          </div>
        </header>
        {church?.subscription_status === "unpaid" ? (
          <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 lg:px-8">
            구독 요금이 미납되었습니다. 서비스 중지 전에 결제 상태를 확인해 주세요.
          </div>
        ) : null}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
