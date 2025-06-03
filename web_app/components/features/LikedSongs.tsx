"use client";

import { useState, useMemo, useEffect } from "react";
import HeartButton from "@/components/features/HeartButton";
import TrackListItem from "@/components/features/TrackListItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";

interface LikedSongsProps {
  songs: Song[];
}

const LikedSongs: React.FC<LikedSongsProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [search, setSearch] = useState("");

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  // Filtrer par recherche (titre ou artiste)
  const filteredSongs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return songs;
    return songs.filter(
      song =>
        song.title.toLowerCase().includes(term) ||
        song.author.toLowerCase().includes(term)
    );
  }, [search, songs]);

  // Grouper par artiste
  const songsByArtist = useMemo(() => {
    return filteredSongs.reduce((acc, song) => {
      if (!acc[song.author]) acc[song.author] = [];
      acc[song.author].push(song);
      return acc;
    }, {} as { [artist: string]: Song[] });
  }, [filteredSongs]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-secondary">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 w-full p-6">
      {/* --- BARRE DE RECHERCHE --- */}
      <div className="w-full mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
            w-full
            md:w-1/2
            px-4
            py-2
            rounded-xl
            bg-neutral-900
            border border-neutral-800
            text-white
            placeholder:text-neutral-400
            focus:outline-none
            focus:ring-2 focus:ring-blue-400
            transition
            shadow
          "
        />
      </div>
      {/* --- AFFICHAGE DES GROUPES PAR ARTISTE --- */}
      {Object.entries(songsByArtist).length === 0 ? (
        <div className="text-center text-secondary">
          No result for this search.
        </div>
      ) : (
        Object.entries(songsByArtist).map(([artist, songs]) => (
          <div
            key={artist}
            className="bg-neutral-900 rounded-2xl shadow-lg px-6 py-4 mb-2"
          >
            <div className="flex items-center mb-3 gap-x-2">
              {/* Emoji micro artiste */}
              <span className="text-2xl">🎤</span>
              <h2 className="text-2xl font-extrabold tracking-tight">{artist}</h2>
            </div>
            <div className="flex flex-col gap-y-2">
              {songs.map(song => (
                <div
                  key={song.id}
                  className="flex items-center gap-x-4 w-full p-3 rounded-xl hover:bg-neutral-800 transition"
                >
                  <div className="flex-1">
                    <TrackListItem
                      onClick={(id: string) => onPlay(id)}
                      data={song}
                    />
                  </div>
                  <HeartButton song={song} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LikedSongs;
