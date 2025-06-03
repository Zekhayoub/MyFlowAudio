"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreatePlaylistSchema, validateData } from "@/lib/validations";
import type { ValidationResult } from "@/lib/validations";

export async function createPlaylist(formData: FormData): Promise<ValidationResult<void>> {
  const rawData = {
    name: formData.get("name"),
    user_id: formData.get("user_id"),
  };


  const validation = validateData(CreatePlaylistSchema, rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  const { name, user_id } = validation.data!;

  try {
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase
      .from("playlists")
      .insert([{ name, user_id }]);

    if (error) {
      return {
        success: false,
        errors: { general: [error.message] }
      };
    }

    redirect("/?created=1");
  } catch (error) {
    return {
      success: false,
      errors: { general: ["An unexpected error occurred"] }
    };
  }
}