"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import TrackCard from "@/components/features/TrackCard";
import { Song, Playlist } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPlaylists(data);
      }
    };

    fetchPlaylists();
  }, [user, supabaseClient]);

  return (
    <div className="px-4 py-2">
      {playlists.length > 0 && (
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">Your Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-secondary rounded-lg p-4 text-white hover:bg-secondary/80 cursor-pointer"
              >
                {playlist.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-white text-xl font-semibold mb-4">Recently played</h2>
      {songs.length === 0 ? (
        <div className="text-secondary">No songs available.</div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
          "
        >
          {songs.map((item) => (
            <TrackCard key={item.id} onClick={(id: string) => onPlay(id)} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContent;
