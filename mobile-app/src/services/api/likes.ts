import { getApiUrl, getAuthHeaders } from './config';
import { Song } from '../../types';

interface LikeResponse {
  success: boolean;
  songId?: string;
  error?: string;
}

// Récupérer les chansons likées
export const getLikedSongs = async (): Promise<Song[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(getApiUrl('/liked-songs'), { 
      method: 'GET',
      headers 
    });
    
    if (!response.ok) {
      console.error('Erreur API getLikedSongs:', response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur getLikedSongs:', error);
    return [];
  }
};

// Liker une chanson
export const likeSong = async (songId?: string, songData?: Partial<Song>): Promise<LikeResponse> => {
  try {
    const headers = await getAuthHeaders();
    
    const body: any = {};
    if (songId) {
      body.songId = songId;
    }
    if (!songId && songData) {
      body.songData = {
        title: songData.title,
        author: songData.author,
        album: songData.album || null,
        language: songData.language || 'Others',
        image_path: songData.image_path || '',
        song_path: songData.song_path || '',
        genre: songData.genre || 'Unknown',
      };
    }
    
    const response = await fetch(getApiUrl('/liked-songs'), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.error || 'Erreur lors du like' 
      };
    }
    
    const result = await response.json();
    return { 
      success: true, 
      songId: result.songId 
    };
  } catch (error) {
    console.error('Erreur likeSong:', error);
    return { 
      success: false, 
      error: 'Erreur de connexion' 
    };
  }
};

// Unliker une chanson
export const unlikeSong = async (songId: string): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(getApiUrl(`/liked-songs/${songId}`), {
      method: 'DELETE',
      headers,
    });
    
    return response.ok;
  } catch (error) {
    console.error('Erreur unlikeSong:', error);
    return false;
  }
};

// Export du namespace pour compatibilité
export const likesApi = {
  getLikedSongs,
  likeSong,
  unlikeSong,
};

export default likesApi;