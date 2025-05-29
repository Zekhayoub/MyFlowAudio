import { getApiUrl, getAuthHeaders } from './config';
import { Song } from '../../types';

// Récupérer les chansons likées
export const getLikedSongs = async (): Promise<Song[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(getApiUrl('/liked-songs'), { 
      method: 'GET',
      headers 
    });
    
    if (!response.ok) {
      throw new Error('Erreur API');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur getLikedSongs:', error);
    return [];
  }
};

// Liker une chanson
export const likeSong = async (songId?: string, songData?: any): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(getApiUrl('/liked-songs'), {
      method: 'POST',
      headers,
      body: JSON.stringify({ songId, songData }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Erreur likeSong:', error);
    return false;
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