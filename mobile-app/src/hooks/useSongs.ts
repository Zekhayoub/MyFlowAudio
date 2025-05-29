import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { songsApi } from '../services/api/songs';
import { likesApi } from '../services/api/likes';

export interface Song {
  id: string;
  user_id: string;
  title: string;
  author: string;
  album?: string;
  image_path?: string;
  song_path: string;
  created_at: string;
}

// Hook pour récupérer toutes les chansons
export const useSongs = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = useCallback(async () => {
    // Attendre que l'auth soit chargée
    if (authLoading) {
      console.log('Auth loading...');
      return;
    }

    // Si pas d'utilisateur, on met à jour l'état mais on ne fait pas de requête
    if (!user) {
      console.log('No user, skipping songs fetch');
      setSongs([]);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Fetching songs...');
      setIsLoading(true);
      
      const data = await songsApi.getAll();
      console.log('Songs received:', data);
      
      setSongs(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des chansons');
      console.error('Error fetching songs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs,
    isLoading: isLoading || authLoading,
    error,
    refresh: fetchSongs,
  };
};

// Hook pour la recherche
export const useSearchSongs = () => {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!user || !query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await songsApi.search(query);
      setSearchResults(results);
      setSearchError(null);
    } catch (err) {
      setSearchError('Erreur lors de la recherche');
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [user]);

  return {
    searchResults,
    isSearching,
    searchError,
    search,
  };
};

// Hook pour les chansons likées
export const useLikedSongs = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLikedSongs = useCallback(async () => {
    if (authLoading) return;

    if (!user) {
      setLikedSongs([]);
      setLikedSongIds(new Set());
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await likesApi.getLikedSongs();
      setLikedSongs(data);
      
      // Créer un Set des IDs pour vérification rapide
      const ids = new Set(data.map(song => song.id));
      setLikedSongIds(ids);
      
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des favoris');
      console.error('Error fetching liked songs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  const toggleLike = async (song: Song) => {
    if (!user) return false;

    try {
      const isLiked = likedSongIds.has(song.id);
      
      if (isLiked) {
        const success = await likesApi.unlikeSong(song.id);
        if (success) {
          // Mettre à jour l'état local immédiatement
          setLikedSongIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(song.id);
            return newSet;
          });
          setLikedSongs(prev => prev.filter(s => s.id !== song.id));
        }
        return success;
      } else {
        const success = await likesApi.likeSong(song.id);
        if (success) {
          // Mettre à jour l'état local immédiatement
          setLikedSongIds(prev => {
            const newSet = new Set(prev);
            newSet.add(song.id);
            return newSet;
          });
          setLikedSongs(prev => [...prev, song]);
        }
        return success;
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      return false;
    }
  };

  const isLiked = (songId: string) => {
    return likedSongIds.has(songId);
  };

  return {
    likedSongs,
    isLoading: isLoading || authLoading,
    error,
    toggleLike,
    isLiked,
    refresh: fetchLikedSongs,
  };
};