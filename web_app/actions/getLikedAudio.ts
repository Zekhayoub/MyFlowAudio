import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedAudio = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs!fk_song(*)") 
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération liked songs :", error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedAudio;
