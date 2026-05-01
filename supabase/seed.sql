insert into public.churches (
  id, name, slug, pastor_name, intro, worship_time, address, phone, subscription_status, payment_due_date
) values (
  '11111111-1111-1111-1111-111111111111',
  '은혜샘교회',
  'grace-spring',
  '김은혜',
  '말씀과 돌봄을 중심으로 지역과 함께 걷는 중소형 교회입니다.',
  '주일 오전 11:00 / 수요 오후 7:30',
  '서울시 마포구 월드컵북로 12',
  '02-123-4567',
  'trial',
  '2026-06-01'
) on conflict (id) do nothing;

insert into public.videos (church_id, type, title, youtube_url, youtube_video_id, thumbnail_url, speaker, preached_at, description)
values (
  '11111111-1111-1111-1111-111111111111',
  'sermon',
  '다시 시작하는 믿음',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  '김은혜 목사',
  '2026-04-26',
  '요한복음 15장 말씀'
);

insert into public.posts (church_id, type, title, content)
values (
  '11111111-1111-1111-1111-111111111111',
  'news',
  '5월 가정예배 안내',
  '5월 첫 주부터 가정예배 자료를 주보와 홈페이지에 함께 제공합니다.'
);

insert into public.subscriptions (church_id, plan_name, amount, status, paid_until, memo)
values (
  '11111111-1111-1111-1111-111111111111',
  'Starter',
  29000,
  'trial',
  '2026-06-01',
  '체험 기간'
);
