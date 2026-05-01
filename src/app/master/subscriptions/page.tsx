import { updateSubscriptionStatus } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { Badge, Button, PageHeader, Select, TextInput } from "@/components/ui";
import { date, money } from "@/lib/format";
import { getChurches, getSubscriptions } from "@/lib/data";

export default async function MasterSubscriptionsPage() {
  const [subscriptions, churches] = await Promise.all([getSubscriptions(), getChurches()]);
  const churchName = (id: string) => churches.find((church) => church.id === id)?.name ?? id;
  return (
    <>
      <PageHeader title="구독/요금 관리" description="PG 연동 전까지 마스터 관리자가 수동으로 납부 상태를 체크합니다." />
      <DataTable headers={["교회", "플랜", "금액", "상태", "만료일", "상태 변경"]} rows={subscriptions.map((item) => [
        churchName(item.church_id),
        item.plan_name,
        money(item.amount),
        <Badge key={`${item.id}-status`} tone={item.status === "unpaid" ? "red" : "green"}>{item.status}</Badge>,
        date(item.paid_until),
        <form key={item.id} action={updateSubscriptionStatus} className="flex min-w-[320px] gap-2"><input type="hidden" name="id" value={item.id} /><Select name="status" defaultValue={item.status}><option value="trial">trial</option><option value="active">active</option><option value="unpaid">unpaid</option><option value="paused">paused</option><option value="cancelled">cancelled</option></Select><TextInput name="paid_until" type="date" defaultValue={item.paid_until ?? ""} /><Button type="submit">저장</Button></form>
      ])} />
    </>
  );
}
