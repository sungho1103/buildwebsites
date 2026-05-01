import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import {
  mockChurches,
  mockDeployments,
  mockEditRequests,
  mockMembers,
  mockOfferings,
  mockPosts,
  mockProfile,
  mockSubscriptions,
  mockVideos
} from "@/lib/mock-data";
import type {
  Church,
  Deployment,
  EditRequest,
  Member,
  Offering,
  Post,
  PostType,
  Profile,
  Role,
  Subscription,
  Video,
  VideoType
} from "@/types/database";

export async function getCurrentProfile(): Promise<Profile | null> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockProfile;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("user_id", userData.user.id).single();
  return data as Profile | null;
}

export async function requireRole(roles: Role[]) {
  const profile = await getCurrentProfile();
  const supabase = await getSupabase();
  if (!supabase && profile) return { ...profile, role: roles[0] };
  if (!profile || !roles.includes(profile.role)) redirect("/login");
  return profile;
}

export async function getChurches(): Promise<Church[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockChurches;
  const { data } = await supabase.from("churches").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Church[];
}

export async function getChurchBySlug(slug: string): Promise<Church | null> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockChurches.find((church) => church.slug === slug) ?? null;
  const { data } = await supabase.from("churches").select("*").eq("slug", slug).eq("site_status", "active").single();
  return data as Church | null;
}

export async function getChurchById(id: string): Promise<Church | null> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockChurches.find((church) => church.id === id) ?? null;
  const { data } = await supabase.from("churches").select("*").eq("id", id).single();
  return data as Church | null;
}

export async function getAdminChurch(profile: Profile) {
  if (!profile.church_id) return null;
  return getChurchById(profile.church_id);
}

export async function getVideos(churchId: string, type?: VideoType): Promise<Video[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockVideos.filter((item) => item.church_id === churchId && (!type || item.type === type));
  let query = supabase.from("videos").select("*").eq("church_id", churchId).order("preached_at", { ascending: false });
  if (type) query = query.eq("type", type);
  const { data } = await query;
  return (data ?? []) as Video[];
}

export async function getPosts(churchId: string, type?: PostType): Promise<Post[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockPosts.filter((item) => item.church_id === churchId && (!type || item.type === type));
  let query = supabase.from("posts").select("*").eq("church_id", churchId).order("created_at", { ascending: false });
  if (type) query = query.eq("type", type);
  const { data } = await query;
  return (data ?? []) as Post[];
}

export async function getMembers(churchId: string): Promise<Member[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockMembers.filter((item) => item.church_id === churchId);
  const { data } = await supabase.from("members").select("*").eq("church_id", churchId).order("created_at", { ascending: false });
  return (data ?? []) as Member[];
}

export async function getOfferings(churchId: string): Promise<Offering[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockOfferings.filter((item) => item.church_id === churchId);
  const { data } = await supabase.from("offerings").select("*").eq("church_id", churchId).order("offered_at", { ascending: false });
  return (data ?? []) as Offering[];
}

export async function getEditRequests(churchId?: string): Promise<EditRequest[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockEditRequests.filter((item) => !churchId || item.church_id === churchId);
  let query = supabase.from("edit_requests").select("*").order("created_at", { ascending: false });
  if (churchId) query = query.eq("church_id", churchId);
  const { data } = await query;
  return (data ?? []) as EditRequest[];
}

export async function getDeployments(): Promise<Deployment[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockDeployments;
  const { data } = await supabase.from("deployments").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Deployment[];
}

export async function getSubscriptions(): Promise<Subscription[]> {
  noStore();
  const supabase = await getSupabase();
  if (!supabase) return mockSubscriptions;
  const { data } = await supabase.from("subscriptions").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Subscription[];
}
