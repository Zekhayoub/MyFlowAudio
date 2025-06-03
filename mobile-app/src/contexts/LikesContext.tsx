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
    const isDeezerSong = song.user_id === 'deezer';
    
    // Pour l'affichage UI, utiliser l'ID simplifié pour Deezer
    const displaySongId = isDeezerSong && song.id.startsWith('deezer-') 
      ? song.id.replace('deezer-', '') 
      : song.id;
    
    const wasLiked = isLiked(displaySongId);

    console.log('Toggle like for song:', {
      id: song.id,
      displayId: displaySongId,
      isDeezer: isDeezerSong,
      wasLiked
    });

    // Mise à jour optimiste de l'UI
    if (wasLiked) {
      setLikedSongIds(prev => prev.filter(id => id !== displaySongId));
      setLikedSongs(prev => prev.filter(s => s.id !== displaySongId));
    } else {
      setLikedSongIds(prev => [...prev, displaySongId]);
      setLikedSongs(prev => [...prev, { ...song, id: displaySongId }]);
    }

    try {
      if (wasLiked) {
        // Unlike - utiliser l'ID de notre base de données
        const success = await likesApi.unlikeSong(displaySongId);
        if (!success) {
          // Reverser si échec
          setLikedSongIds(prev => [...prev, displaySongId]);
          setLikedSongs(prev => [...prev, { ...song, id: displaySongId }]);
          alert('Erreur lors du retrait du like');
        }
      } else {
        // Like
        let result;
        
        if (isDeezerSong) {
          console.log('Liking Deezer song with original ID:', song.id);
          // Pour les chansons Deezer : passer null comme songId et toutes les données
          result = await likesApi.likeSong(null, {
            title: song.title,
            author: song.author,
            album: song.album || null,
            language: song.language || 'Others',
            image_path: song.image_path || '',
            song_path: song.song_path || '',
            genre: song.genre || 'Unknown',
            deezer_id: song.id // L'ID original Deezer (ex: "deezer-0")
          });
        } else {
          // Pour les chansons normales
          result = await likesApi.likeSong(song.id);
        }

        if (!result.success) {
          // Reverser si échec
          setLikedSongIds(prev => prev.filter(id => id !== displaySongId));
          setLikedSongs(prev => prev.filter(s => s.id !== displaySongId));
          alert(result.error || 'Erreur lors du like');
        } else if (result.songId && isDeezerSong) {
          // Si l'API a créé une nouvelle chanson avec un nouvel ID UUID
          // Mettre à jour l'ID dans notre état local
          console.log('Deezer song created with new UUID:', result.songId);
          setLikedSongs(prev => 
            prev.map(s => s.id === displaySongId ? { ...s, id: result.songId! } : s)
          );
          setLikedSongIds(prev => 
            prev.map(id => id === displaySongId ? result.songId! : id)
          );
        }
      }
    } catch (error) {
      console.error('Erreur toggle like:', error);
      // Reverser en cas d'erreur
      if (wasLiked) {
        setLikedSongIds(prev => [...prev, displaySongId]);
        setLikedSongs(prev => [...prev, { ...song, id: displaySongId }]);
      } else {
        setLikedSongIds(prev => prev.filter(id => id !== displaySongId));
        setLikedSongs(prev => prev.filter(s => s.id !== displaySongId));
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