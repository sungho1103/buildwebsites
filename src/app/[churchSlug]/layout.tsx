import { notFound } from "next/navigation";
import { PublicNav } from "@/components/public-nav";
import { getChurchBySlug } from "@/lib/data";

export default async function ChurchLayout({ children, params }: { children: React.ReactNode; params: Promise<{ churchSlug: string }> }) {
  const { churchSlug } = await params;
  const church = await getChurchBySlug(churchSlug);
  if (!church) notFound();
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav church={church} />
      {children}
      <footer className="mt-10 border-t border-line bg-white px-4 py-8 text-center text-sm text-muted">{church.name} · {church.phone} · {church.address}</footer>
    </div>
  );
}
