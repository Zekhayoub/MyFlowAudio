
"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateUserName(formData: FormData) {
  const fullName = formData.get("full_name");
  const userId = formData.get("user_id");

  if (!fullName || !userId) return;

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase
    .from("users")
    .update({ full_name: fullName })
    .eq("id", userId);

  if (!error) {
    redirect("/account/edit?success=1");
  }
}
