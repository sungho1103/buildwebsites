import type { Church, Deployment, EditRequest, Member, Offering, Post, Profile, Subscription, Video } from "@/types/database";

export const mockChurches: Church[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "은혜샘교회",
    slug: "grace-spring",
    domain: null,
    pastor_name: "김은혜",
    intro: "말씀과 돌봄을 중심으로 지역과 함께 걷는 중소형 교회입니다.",
    worship_time: "주일 오전 11:00 / 수요 오후 7:30",
    address: "서울시 마포구 월드컵북로 12",
    phone: "02-123-4567",
    template_id: "simple",
    site_status: "active",
    subscription_status: "trial",
    payment_due_date: "2026-06-01",
    deployment_status: "not_deployed",
    created_at: "2026-01-10T00:00:00Z"
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "새길교회",
    slug: "new-road",
    domain: "newroad.example.com",
    pastor_name: "박새길",
    intro: "다음 세대와 가정을 세우는 교회입니다.",
    worship_time: "주일 오전 10:30",
    address: "경기도 성남시 분당구 정자일로 21",
    phone: "031-555-1200",
    template_id: "simple",
    site_status: "active",
    subscription_status: "unpaid",
    payment_due_date: "2026-04-25",
    deployment_status: "deployed",
    created_at: "2026-02-01T00:00:00Z"
  }
];

export const mockProfile: Profile = {
  id: "profile-demo",
  user_id: "user-demo",
  church_id: mockChurches[0].id,
  role: "church_admin",
  name: "데모 관리자",
  email: "admin@example.com",
  created_at: "2026-01-10T00:00:00Z"
};

export const mockVideos: Video[] = [
  {
    id: "video-1",
    church_id: mockChurches[0].id,
    type: "sermon",
    title: "다시 시작하는 믿음",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    speaker: "김은혜 목사",
    preached_at: "2026-04-26",
    description: "요한복음 15장 말씀",
    is_published: true,
    created_at: "2026-04-26T00:00:00Z"
  },
  {
    id: "video-2",
    church_id: mockChurches[0].id,
    type: "praise",
    title: "주와 함께 걷는 길",
    youtube_url: "https://youtu.be/dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    speaker: "주일 찬양팀",
    preached_at: "2026-04-26",
    description: "주일 2부 예배 찬양",
    is_published: true,
    created_at: "2026-04-26T00:00:00Z"
  }
];

export const mockPosts: Post[] = [
  {
    id: "post-1",
    church_id: mockChurches[0].id,
    type: "news",
    title: "5월 가정예배 안내",
    content: "5월 첫 주부터 가정예배 자료를 주보와 홈페이지에 함께 제공합니다.",
    is_published: true,
    created_at: "2026-04-28T00:00:00Z",
    updated_at: "2026-04-28T00:00:00Z"
  },
  {
    id: "post-2",
    church_id: mockChurches[0].id,
    type: "board",
    title: "청년부 모임 장소 안내",
    content: "이번 주 청년부 모임은 2층 교육관에서 진행합니다.",
    is_published: true,
    created_at: "2026-04-29T00:00:00Z",
    updated_at: "2026-04-29T00:00:00Z"
  }
];

export const mockMembers: Member[] = [
  {
    id: "member-1",
    church_id: mockChurches[0].id,
    name: "이사랑",
    phone: "010-1111-2222",
    birthdate: "1987-03-12",
    address: "서울시 마포구",
    position: "집사",
    group_name: "1구역",
    status: "active",
    memo: "새가족 섬김팀",
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z"
  }
];

export const mockOfferings: Offering[] = [
  {
    id: "offering-1",
    church_id: mockChurches[0].id,
    member_id: "member-1",
    giver_name: "이사랑",
    amount: 100000,
    offering_type: "십일조",
    offered_at: "2026-04-26",
    memo: "온라인 이체",
    created_at: "2026-04-26T00:00:00Z"
  }
];

export const mockEditRequests: EditRequest[] = [
  {
    id: "edit-1",
    church_id: mockChurches[0].id,
    requested_by: "user-demo",
    request_text: "메인 화면 예배 시간을 더 잘 보이게 바꿔주세요.",
    ai_summary: "홈 상단 예배 시간 강조 요청",
    ai_action_plan: { target: "home", priority: "normal" },
    status: "pending",
    master_memo: null,
    created_at: "2026-04-30T00:00:00Z",
    updated_at: "2026-04-30T00:00:00Z"
  }
];

export const mockDeployments: Deployment[] = [
  {
    id: "deploy-1",
    church_id: mockChurches[0].id,
    status: "waiting",
    deployment_url: null,
    memo: "초기 배포 대기",
    deployed_at: null,
    created_at: "2026-04-30T00:00:00Z"
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "sub-1",
    church_id: mockChurches[0].id,
    plan_name: "Starter",
    amount: 29000,
    status: "trial",
    paid_until: "2026-06-01",
    memo: "체험 기간",
    created_at: "2026-04-01T00:00:00Z"
  }
];
