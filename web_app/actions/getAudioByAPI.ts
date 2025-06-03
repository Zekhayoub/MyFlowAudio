import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const DEFAULT_ALBUM_IMAGE = "/images/music-placeholder.png";
const MAX_RESULTS = 10;

const getSongsWithDeezer = async (title: string): Promise<Song[]> => {
  if (!title || title.trim() === "") {
    return getRecentSongs();
  }

  const url = `https://api.deezer.com/search?q=${encodeURIComponent(title)}&limit=${MAX_RESULTS}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache de 5 minutes pour les recherches
    });

    if (!response.ok) {
      console.error(` Erreur API Deezer: ${response.status}`);
      return searchInDatabase(title);
    }

    const data = await response.json();
    const trackItems = data?.data || [];

    if (trackItems.length === 0) {
      console.log(`Aucun résultat Deezer pour "${title}", recherche dans la DB`);
      return searchInDatabase(title);
    }

    const songs: Song[] = [];

    for (const track of trackItems) {
      const songObj: Song = {
        id: `deezer-${track.id}`,
        title: track.title || "Unknown Title",
        author: track.artist?.name || "Unknown Artist",
        image_path: track.album?.cover_medium || track.album?.cover || DEFAULT_ALBUM_IMAGE,
        song_path: track.preview || "",
        language: "Unknown",
        user_id: "deezer-api", 
      };
      
      songs.push(songObj);
    }

    return songs;

  } catch (error) {
    console.error(" Erreur lors de l'appel API Deezer:", error);
    return searchInDatabase(title);
  }
};


async function getRecentSongs(): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(MAX_RESULTS);

  if (error) {
    console.error("Erreur Supabase:", error);
    return [];
  }

  return (data || []).map(song => ({
    ...song,
    id: song.id || `db-${Date.now()}-${Math.random()}`
  }));
}

async function searchInDatabase(query: string): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
    .limit(MAX_RESULTS);

  if (error) {
    console.error("Erreur recherche Supabase:", error);
    return [];
  }

  return (data || []).map(song => ({
    ...song,
    id: song.id || `db-${Date.now()}-${Math.random()}`
  }));
}

export default getSongsWithDeezer;


