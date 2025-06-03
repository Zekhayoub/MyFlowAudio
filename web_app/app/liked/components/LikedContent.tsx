"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import TrackListItem from "@/components/features/TrackListItem";
import HeartButton from "@/components/features/HeartButton";
import useOnPlay from "@/hooks/useOnPlay";
import { FiSearch } from "react-icons/fi";
import { useUser } from "@/hooks/useUser";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs: initialSongs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(initialSongs);
  
  const [songs, setSongs] = useState(initialSongs);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'all' | 'recent' | 'alphabetical' | 'oldest'>('all');

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  // Filtrage et tri
  useEffect(() => {
    let filteredSongs = [...initialSongs];

    // Recherche
    if (searchQuery) {
      filteredSongs = filteredSongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tri
    switch (sortBy) {
      case 'recent':
        filteredSongs.sort((a, b) => 
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        break;
      case 'alphabetical':
        filteredSongs.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'oldest':
        filteredSongs.sort((a, b) => 
          new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
        );
        break;
    }

    setSongs(filteredSongs);
  }, [searchQuery, sortBy, initialSongs]);

  // Écouter les événements de tri depuis les boutons du header
  useEffect(() => {
    const handleSortEvent = (event: CustomEvent) => {
      setSortBy(event.detail);
    };

    window.addEventListener('sortLikedSongs', handleSortEvent as any);
    return () => window.removeEventListener('sortLikedSongs', handleSortEvent as any);
  }, []);

  if (songs.length === 0 && !searchQuery) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
        <input
          type="text"
          placeholder="Search in liked songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            pl-10
            pr-4
            py-3
            bg-neutral-800
            text-white
            placeholder-neutral-400
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-purple-600
            transition
          "
        />
      </div>

      {/* Boutons de tri */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => setSortBy('all')}
          className={`
            px-4
            py-2
            text-sm
            font-medium
            rounded-full
            transition
            ${sortBy === 'all' 
              ? 'text-white bg-neutral-800' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}
          `}
        >
          All
        </button>
        <button 
          onClick={() => setSortBy('recent')}
          className={`
            px-4
            py-2
            text-sm
            font-medium
            rounded-full
            transition
            ${sortBy === 'recent' 
              ? 'text-white bg-neutral-800' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}
          `}
        >
          Recently Added
        </button>
        <button 
          onClick={() => setSortBy('alphabetical')}
          className={`
            px-4
            py-2
            text-sm
            font-medium
            rounded-full
            transition
            ${sortBy === 'alphabetical' 
              ? 'text-white bg-neutral-800' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}
          `}
        >
          Artists A-Z
        </button>
        <button 
          onClick={() => setSortBy('oldest')}
          className={`
            px-4
            py-2
            text-sm
            font-medium
            rounded-full
            transition
            ${sortBy === 'oldest' 
              ? 'text-white bg-neutral-800' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}
          `}
        >
          Oldest First
        </button>
      </div>

      {/* Résultats de recherche */}
      {searchQuery && (
        <p className="text-sm text-neutral-400 mb-2">
          {songs.length} result{songs.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {/* Liste des chansons */}
      {songs.length === 0 ? (
        <p className="text-neutral-400 text-center py-8">
          No songs found matching "{searchQuery}"
        </p>
      ) : (
        songs.map((song) => (
          <div 
            key={song.id} 
            className="
              flex 
              items-center 
              gap-x-4 
              w-full
              group
              hover:bg-neutral-800/50
              p-2
              rounded-md
              transition
            "
          >
            <div className="flex-1">
              <TrackListItem 
                onClick={(id) => onPlay(id)} 
                data={song} 
              />
            </div>
            <HeartButton song={song} />
          </div>
        ))
      )}
    </div>
  );
};

export default LikedContent;