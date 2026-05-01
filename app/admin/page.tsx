import { AdminLayout } from '@/components/admin-layout';
export default function Page(){return <AdminLayout><h1 className='text-xl font-bold'>교회 관리자 대시보드</h1><p>미납 시 경고 배너 표시 영역</p><div className='mt-3 rounded bg-amber-100 p-3'>구독 상태 unpaid 시 서비스 제한 안내</div></AdminLayout>}
