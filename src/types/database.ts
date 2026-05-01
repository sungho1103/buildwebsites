export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Role = "master_admin" | "church_admin" | "finance_admin";
export type VideoType = "sermon" | "praise";
export type PostType = "news" | "board";
export type EditRequestStatus = "pending" | "ai_reviewed" | "approved" | "rejected" | "applied" | "deployed";
export type DeploymentStatus = "waiting" | "deploying" | "success" | "failed";
export type SubscriptionStatus = "trial" | "active" | "unpaid" | "paused" | "cancelled";

export type Church = {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  pastor_name: string | null;
  intro: string | null;
  worship_time: string | null;
  address: string | null;
  phone: string | null;
  template_id: string | null;
  site_status: "active" | "paused" | "stopped";
  subscription_status: SubscriptionStatus;
  payment_due_date: string | null;
  deployment_status: "not_deployed" | "waiting" | "deployed" | "failed";
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  church_id: string | null;
  role: Role;
  name: string | null;
  email: string | null;
  created_at: string;
};

export type Video = {
  id: string;
  church_id: string;
  type: VideoType;
  title: string;
  youtube_url: string;
  youtube_video_id: string | null;
  thumbnail_url: string | null;
  speaker: string | null;
  preached_at: string | null;
  description: string | null;
  is_published: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  church_id: string;
  type: PostType;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Member = {
  id: string;
  church_id: string;
  name: string;
  phone: string | null;
  birthdate: string | null;
  address: string | null;
  position: string | null;
  group_name: string | null;
  status: string;
  memo: string | null;
  created_at: string;
  updated_at: string;
};

export type Offering = {
  id: string;
  church_id: string;
  member_id: string | null;
  giver_name: string;
  amount: number;
  offering_type: string;
  offered_at: string;
  memo: string | null;
  created_at: string;
};

export type EditRequest = {
  id: string;
  church_id: string;
  requested_by: string | null;
  request_text: string;
  ai_summary: string | null;
  ai_action_plan: Json;
  status: EditRequestStatus;
  master_memo: string | null;
  created_at: string;
  updated_at: string;
};

export type Deployment = {
  id: string;
  church_id: string;
  status: DeploymentStatus;
  deployment_url: string | null;
  memo: string | null;
  deployed_at: string | null;
  created_at: string;
};

export type Subscription = {
  id: string;
  church_id: string;
  plan_name: string;
  amount: number;
  status: SubscriptionStatus;
  paid_until: string | null;
  memo: string | null;
  created_at: string;
};
