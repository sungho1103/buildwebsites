import Link from 'next/link';
export default function Page(){return <main className='max-w-4xl mx-auto p-6 space-y-4'><h1 className='text-2xl font-bold'>중소형 교회 홈페이지 플랫폼</h1><p>교회 목록에서 공개 홈페이지로 이동하세요.</p><Link className='text-blue-600 underline' href='/grace'>샘플 교회 보기</Link></main>}
