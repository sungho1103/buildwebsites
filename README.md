# 중소형 교회 홈페이지 제작 플랫폼 MVP

Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth/PostgreSQL/RLS 기준으로 만든 1차 MVP입니다.

## 포함 기능

- 교회별 공개 홈페이지: `/[churchSlug]`
- 설교/찬양 영상 목록: 유튜브 URL만 저장
- 교회소식/게시판 공개 화면
- 교회 관리자: 기본정보, 영상, 게시글, 교인, 헌금, AI 수정 요청
- 마스터 관리자: 전체 교회, 수정 요청, 배포, 구독, 관리자 계정
- Supabase RLS 마이그레이션: `supabase/migrations/001_initial_schema.sql`
- OpenAI API와 Vercel 배포 API는 나중에 붙일 수 있도록 컬럼과 UI 자리만 준비

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

Supabase 환경변수가 없으면 더미 데이터로 실행됩니다.

## 환경변수

`.env.example`을 참고해 `.env.local`을 만듭니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase 적용 순서

1. Supabase 프로젝트 생성
2. `supabase/migrations/001_initial_schema.sql` 실행
3. 필요하면 `supabase/seed.sql` 실행
4. Supabase Auth 사용자 생성
5. `profiles` 테이블에 `master_admin`, `church_admin`, `finance_admin` 역할 연결

## 주요 경로

- `/` 전체 교회 샘플 목록
- `/grace-spring` 교회 공개 홈페이지
- `/admin` 교회 관리자 대시보드
- `/master` 마스터 관리자 대시보드

## 검증

```bash
npm run typecheck
npm run build
```
