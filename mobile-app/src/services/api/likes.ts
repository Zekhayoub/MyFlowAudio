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
export const likeSong = async (songId?: string | null, songData?: Partial<Song>): Promise<LikeResponse> => {
  try {
    const headers = await getAuthHeaders();
    
    const body: any = {};
    
    // CORRECTION : Gérer les différents cas
    if (songId && !songData) {
      // Cas 1: Chanson normale avec ID UUID
      body.songId = songId;
      console.log('Liking normal song with ID:', songId);
      
    } else if (songData && songData.deezer_id) {
      // Cas 2: Chanson Deezer - envoyer null/undefined comme songId et les données complètes
      body.songId = null; // Explicitement null pour les chansons Deezer
      body.songData = {
        title: songData.title,
        author: songData.author,
        album: songData.album || null,
        language: songData.language || 'Others',
        image_path: songData.image_path || '',
        song_path: songData.song_path || '',
        genre: songData.genre || 'Unknown',
        deezer_id: songData.deezer_id // ESSENTIEL : L'ID Deezer original
      };
      console.log('Liking Deezer song:', songData.deezer_id);
      
    } else {
      // Cas d'erreur : ni songId ni songData valide
      console.error('Invalid like request: missing songId or songData');
      return {
        success: false,
        error: 'Données manquantes pour le like'
      };
    }
    
    console.log('Sending like request:', JSON.stringify(body, null, 2));
    
    const response = await fetch(getApiUrl('/liked-songs'), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: `HTTP ${response.status}` };
      }
      
      console.error('Like API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return { 
        success: false, 
        error: errorData.error || `Erreur ${response.status}` 
      };
    }
    
    const result = await response.json();
    console.log('Like API success:', result);
    
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
    
    if (!response.ok) {
      console.error('Unlike API error:', response.status, response.statusText);
    }
    
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