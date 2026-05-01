# Church MVP Platform

Next.js + Supabase 기반 중소형 교회 홈페이지/관리 시스템 MVP.

## 실행
1. `cp .env.example .env.local`
2. Supabase URL/Anon key 입력
3. `npm install && npm run dev`

## 포함 기능
- 공개 교회 페이지 및 메뉴
- 교회 관리자: 사이트/영상/게시글/교인/헌금/수정요청
- 마스터 관리자: 교회/수정요청/배포/구독/관리자
- Supabase 스키마 + RLS 정책 (`supabase/migrations/001_init.sql`)
- OpenAI 연동 확장 대비 컬럼(`ai_summary`, `ai_action_plan`) 준비
