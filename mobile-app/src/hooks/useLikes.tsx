import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './useAuth';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface LikesContextType {
  likedSongs: string[];
  isLiked: (songId: string) => boolean;
  toggleLike: (songId: string | null, songData?: any) => Promise<void>;
  fetchLikedSongs: () => Promise<void>;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

const getAuthToken = async () => {
  try {
    const sessionData = await AsyncStorage.getItem('supabase-session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      return session.access_token;
    }
    return null;
  } catch (error) {
    console.error('Erreur récupération token:', error);
    return null;
  }
};

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const { user } = useAuth();

  const fetchLikedSongs = async () => {
    if (!user) return;

    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/api/liked-songs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const songs = await response.json();
        setLikedSongs(songs.map((song: any) => song.id));
      }
    } catch (error) {
      console.error('Erreur récupération liked songs:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLikedSongs();
    }
  }, [user]);

  const isLiked = (songId: string) => {
    return likedSongs.includes(songId);
  };

  const toggleLike = async (songId: string | null, songData?: any) => {
    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour liker une chanson');
      return;
    }

    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Erreur', 'Vous devez être connecté');
        return;
      }

      // Pour les chansons Deezer, on vérifie l'ID
      const isDeezerSong = songId && songId.startsWith('deezer-');
      
      // Si c'est déjà liké, on unlike
      if (songId && isLiked(songId)) {
        const response = await fetch(`${API_URL}/api/liked-songs/${songId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du unlike');
        }

        setLikedSongs(prev => prev.filter(id => id !== songId));
      } else {
        // Like - Pour Deezer on envoie null comme songId
        const response = await fetch(`${API_URL}/api/liked-songs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            songId: isDeezerSong ? null : songId,  // NULL pour les chansons Deezer
            songData: songData
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Erreur lors du like');
        }

        const result = await response.json();
        if (result.songId) {
          setLikedSongs(prev => [...prev, result.songId]);
        }
      }
    } catch (error) {
      console.error('Erreur toggleLike:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  return (
    <LikesContext.Provider value={{ likedSongs, isLiked, toggleLike, fetchLikedSongs }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};