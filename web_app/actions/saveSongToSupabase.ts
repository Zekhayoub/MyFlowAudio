import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveSongToSupabase = async (song: {
  title: string;
  song_path: string;
  album: string;
  author: string;
  language: string;
  genre: string;
  track_number: number;
  release_date: string;
  duration: number;
  play_count: number;
  image_path?: string; 
}) => {
  try {
    const { data: existing, error: selectError } = await supabase
      .from("songs")
      .select("*")
      .eq("title", song.title)
      .eq("author", song.author)
      .maybeSingle();

    if (selectError) {
      console.error("Erreur vérification existence :", selectError.message);
      return;
    }

    if (!existing) {
      const { error: insertError } = await supabase.from("songs").insert([song]);

      if (insertError) {
        console.error("Erreur insertion chanson :", insertError.message);
      } else {
        console.log(` Ajouté à Supabase : ${song.title} - ${song.author}`);
      }
    } else {
      console.log(` Déjà présent : ${song.title} - ${song.author}`);
    }
  } catch (err) {
    console.error("Erreur saveSongToSupabase :", err);
  }
};
