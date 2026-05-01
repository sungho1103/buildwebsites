"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";
import { getYoutubeThumbnail, getYoutubeVideoId } from "@/lib/youtube";
import type { EditRequestStatus, SubscriptionStatus } from "@/types/database";

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" ? item : "";
}

export async function updateChurchInfo(formData: FormData) {
  const profile = await requireRole(["church_admin"]);
  if (!profile.church_id) redirect("/login");

  const payload = {
    name: value(formData, "name"),
    pastor_name: value(formData, "pastor_name"),
    intro: value(formData, "intro"),
    worship_time: value(formData, "worship_time"),
    address: value(formData, "address"),
    phone: value(formData, "phone")
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("churches").update(payload).eq("id", profile.church_id);
  revalidatePath("/admin/site");
  revalidatePath("/admin");
}

export async function createVideo(formData: FormData) {
  const profile = await requireRole(["church_admin"]);
  if (!profile.church_id) redirect("/login");

  const youtubeUrl = value(formData, "youtube_url");
  const payload = {
    church_id: profile.church_id,
    type: value(formData, "type"),
    title: value(formData, "title"),
    youtube_url: youtubeUrl,
    youtube_video_id: getYoutubeVideoId(youtubeUrl),
    thumbnail_url: getYoutubeThumbnail(youtubeUrl),
    speaker: value(formData, "speaker"),
    preached_at: value(formData, "preached_at") || null,
    description: value(formData, "description"),
    is_published: formData.get("is_published") === "on"
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("videos").insert(payload);
  revalidatePath("/admin/videos");
}

export async function createPost(formData: FormData) {
  const profile = await requireRole(["church_admin"]);
  if (!profile.church_id) redirect("/login");

  const payload = {
    church_id: profile.church_id,
    type: value(formData, "type"),
    title: value(formData, "title"),
    content: value(formData, "content"),
    is_published: formData.get("is_published") === "on"
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("posts").insert(payload);
  revalidatePath("/admin/posts");
}

export async function createMember(formData: FormData) {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  if (!profile.church_id) redirect("/login");

  const payload = {
    church_id: profile.church_id,
    name: value(formData, "name"),
    phone: value(formData, "phone"),
    birthdate: value(formData, "birthdate") || null,
    address: value(formData, "address"),
    position: value(formData, "position"),
    group_name: value(formData, "group_name"),
    status: value(formData, "status") || "active",
    memo: value(formData, "memo")
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("members").insert(payload);
  revalidatePath("/admin/members");
}

export async function createOffering(formData: FormData) {
  const profile = await requireRole(["church_admin", "finance_admin"]);
  if (!profile.church_id) redirect("/login");

  const payload = {
    church_id: profile.church_id,
    member_id: value(formData, "member_id") || null,
    giver_name: value(formData, "giver_name"),
    amount: Number(value(formData, "amount") || 0),
    offering_type: value(formData, "offering_type"),
    offered_at: value(formData, "offered_at"),
    memo: value(formData, "memo")
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("offerings").insert(payload);
  revalidatePath("/admin/offerings");
}

export async function createEditRequest(formData: FormData) {
  const profile = await requireRole(["church_admin"]);
  if (!profile.church_id) redirect("/login");

  const payload = {
    church_id: profile.church_id,
    requested_by: profile.user_id,
    request_text: value(formData, "request_text"),
    ai_summary: null,
    ai_action_plan: {},
    status: "pending"
  };

  const supabase = await getSupabase();
  if (supabase) await supabase.from("edit_requests").insert(payload);
  revalidatePath("/admin/edit-requests");
}

export async function updateEditRequestStatus(formData: FormData) {
  await requireRole(["master_admin"]);
  const id = value(formData, "id");
  const status = value(formData, "status") as EditRequestStatus;
  const master_memo = value(formData, "master_memo");

  const supabase = await getSupabase();
  if (supabase) await supabase.from("edit_requests").update({ status, master_memo }).eq("id", id);
  revalidatePath("/master/edit-requests");
}

export async function updateSubscriptionStatus(formData: FormData) {
  await requireRole(["master_admin"]);
  const id = value(formData, "id");
  const status = value(formData, "status") as SubscriptionStatus;
  const paid_until = value(formData, "paid_until") || null;

  const supabase = await getSupabase();
  if (supabase) await supabase.from("subscriptions").update({ status, paid_until }).eq("id", id);
  revalidatePath("/master/subscriptions");
}

export async function updateDeploymentStatus(formData: FormData) {
  await requireRole(["master_admin"]);
  const id = value(formData, "id");
  const status = value(formData, "status");
  const deployment_url = value(formData, "deployment_url");
  const memo = value(formData, "memo");

  const supabase = await getSupabase();
  if (supabase) await supabase.from("deployments").update({ status, deployment_url, memo }).eq("id", id);
  revalidatePath("/master/deployments");
}
