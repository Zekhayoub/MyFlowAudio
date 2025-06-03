import { createClient } from "@supabase/supabase-js";
import { SaveSongSchema, validateData } from "@/lib/validations";
import type { SaveSongData, ValidationResult } from "@/lib/validations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveSongToSupabase = async (songData: {
  title: string;
  song_path: string;
  album?: string;
  artist: string; 
  language?: string;
  genre?: string;
  track_number?: number;
  release_date?: string;
  duration?: number;
  play_count?: number;
  image_path?: string;
  user_id: string; 
}): Promise<ValidationResult<{ message: string; action: 'inserted' | 'exists' }>> => {
  
  const validationData = {
    title: songData.title,
    artist: songData.artist,
    user_id: songData.user_id,
    song_path: songData.song_path
  };

  const validation = validateData(SaveSongSchema, validationData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  const { title, artist, user_id, song_path } = validation.data!;

  try {
    const { data: existing, error: selectError } = await supabase
      .from("songs")
      .select("*")
      .eq("title", title)
      .eq("artist", artist)
      .eq("user_id", user_id)
      .maybeSingle();

    if (selectError) {
      return {
        success: false,
        errors: { general: [`Database error: ${selectError.message}`] }
      };
    }

    if (!existing) {
      const songToInsert = {
        title,
        artist,
        user_id,
        song_path,
        album: songData.album || null,
        language: songData.language || null,
        genre: songData.genre || null,
        track_number: songData.track_number || null,
        release_date: songData.release_date || null,
        duration: songData.duration || null,
        play_count: songData.play_count || 0,
        image_path: songData.image_path || null
      };

      const { error: insertError } = await supabase
        .from("songs")
        .insert([songToInsert]);

      if (insertError) {
        return {
          success: false,
          errors: { general: [`Failed to save song: ${insertError.message}`] }
        };
      }

      return {
        success: true,
        data: {
          message: `Successfully added: ${title} - ${artist}`,
          action: 'inserted'
        }
      };
    } else {
      return {
        success: true,
        data: {
          message: `Song already exists: ${title} - ${artist}`,
          action: 'exists'
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: { 
        general: [error instanceof Error ? error.message : "Unknown error occurred"] 
      }
    };
  }
};