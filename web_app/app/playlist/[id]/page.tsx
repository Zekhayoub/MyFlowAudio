import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/features/Header";
import TrackListItem from "@/components/features/TrackListItem";
import { Song } from "@/types";
import { notFound } from "next/navigation";

interface PlaylistPageProps {
  params: {
    id: string;
  };
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: playlist, error: playlistError } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", params.id)
    .single();

  if (playlistError || !playlist) return notFound();

  const { data: songsData, error: songError } = await supabase
    .from("playlist_songs")
    .select("songs(*)") // jointure
    .eq("playlist_id", params.id);

  if (songError) return notFound();

  const songs: Song[] = songsData.map((entry) => entry.songs);

  return (
    <div className="bg-background rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-bold">{playlist.name}</h1>
        </div>
      </Header>
      <div className="px-6">
        {songs.length === 0 ? (
          <p className="text-secondary mt-4">No songs in this playlist.</p>
        ) : (
          songs.map((song) => (
            <TrackListItem key={song.id} data={song} onClick={() => {}} />
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
