import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAudio = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("User not found or error:", userError);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Erreur récupération songs:", error);
  }

  return (data as any) || [];
};

export default getAudio;
