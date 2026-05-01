import Link from "next/link";
import type { Church } from "@/types/database";

const menu = [
  ["교회안내", ""],
  ["설교영상", "sermons"],
  ["찬양영상", "praise"],
  ["교회소식", "news"],
  ["게시판", "board"],
  ["오시는 길", "location"]
];

export function PublicNav({ church }: { church: Church }) {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/${church.slug}`} className="text-xl font-bold text-ink">
          {church.name}
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
          {menu.map(([label, path]) => (
            <Link key={label} href={`/${church.slug}${path ? `/${path}` : ""}`} className="rounded-md px-3 py-2 hover:bg-slate-100">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
