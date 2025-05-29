import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song } from '../types';
import likesApi from '../services/api/likes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LikesContextType {
  likedSongs: Song[];
  likedSongIds: string[];
  isLiked: (songId: string) => boolean;
  toggleLike: (song: Song) => Promise<void>;
  refreshLikes: () => Promise<void>;
  isLoading: boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};

interface LikesProviderProps {
  children: ReactNode;
}

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [likedSongIds, setLikedSongIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les likes au démarrage et quand l'auth change
  useEffect(() => {
    checkAuthAndLoadLikes();
  }, []);

  const checkAuthAndLoadLikes = async () => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      refreshLikes();
    } else {
      setLikedSongs([]);
      setLikedSongIds([]);
    }
  };

  const refreshLikes = async () => {
    try {
      setIsLoading(true);
      const songs = await likesApi.getLikedSongs();
      setLikedSongs(songs);
      setLikedSongIds(songs.map(song => song.id));
    } catch (error) {
      console.error('Erreur lors du chargement des likes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLiked = (songId: string): boolean => {
    return likedSongIds.includes(songId);
  };

  const toggleLike = async (song: Song) => {
    const songId = song.id;
    const wasLiked = isLiked(songId);

    // Mise à jour optimiste de l'UI
    if (wasLiked) {
      setLikedSongIds(prev => prev.filter(id => id !== songId));
      setLikedSongs(prev => prev.filter(s => s.id !== songId));
    } else {
      setLikedSongIds(prev => [...prev, songId]);
      setLikedSongs(prev => [...prev, song]);
    }

    try {
      if (wasLiked) {
        // Unlike
        const success = await likesApi.unlikeSong(songId);
        if (!success) {
          // Reverser si échec
          setLikedSongIds(prev => [...prev, songId]);
          setLikedSongs(prev => [...prev, song]);
          alert('Erreur lors du retrait du like');
        }
      } else {
        // Like
        // Pour les chansons Deezer qui n'ont pas encore d'ID dans notre DB
        const isDeezerNewSong = song.user_id === 'deezer' && !songId.includes('-');
        
        const result = await likesApi.likeSong(
          isDeezerNewSong ? null : songId,
          isDeezerNewSong ? song : undefined
        );

        if (!result.success) {
          // Reverser si échec
          setLikedSongIds(prev => prev.filter(id => id !== songId));
          setLikedSongs(prev => prev.filter(s => s.id !== songId));
          alert(result.error || 'Erreur lors du like');
        } else if (result.songId && result.songId !== songId) {
          // Si l'API a créé une nouvelle chanson avec un nouvel ID
          // Mettre à jour l'ID dans notre état local
          const updatedSong = { ...song, id: result.songId };
          setLikedSongs(prev => 
            prev.map(s => s.id === songId ? updatedSong : s)
          );
          setLikedSongIds(prev => 
            prev.map(id => id === songId ? result.songId! : id)
          );
        }
      }
    } catch (error) {
      console.error('Erreur toggle like:', error);
      // Reverser en cas d'erreur
      if (wasLiked) {
        setLikedSongIds(prev => [...prev, songId]);
        setLikedSongs(prev => [...prev, song]);
      } else {
        setLikedSongIds(prev => prev.filter(id => id !== songId));
        setLikedSongs(prev => prev.filter(s => s.id !== songId));
      }
      alert('Erreur de connexion');
    }
  };

  return (
    <LikesContext.Provider 
      value={{
        likedSongs,
        likedSongIds,
        isLiked,
        toggleLike,
        refreshLikes,
        isLoading
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export default LikesContext;