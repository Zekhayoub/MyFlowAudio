
"use server";

import { z } from "zod";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const PlaylistSchema = z.object({
  name: z.string().min(1, "Playlist name is required"),
  user_id: z.string().uuid("Invalid user ID"),
});

export async function createPlaylist(formData: FormData) {

  const rawData = {
    name: formData.get("name"),
    user_id: formData.get("user_id"),
  };

  const result = PlaylistSchema.safeParse(rawData);
  if (!result.success) {
    console.error("Validation failed:", result.error.flatten().fieldErrors);
    return;
  }

  const { name, user_id } = result.data;

  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase
    .from("playlists")
    .insert([{ name, user_id }]);

  if (!error) {
    redirect("/?created=1");
  } else {
    console.error("Supabase error:", error.message);
  }
}

