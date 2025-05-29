import { getApiUrl } from './config';
import { getToken } from './auth';

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

// Helper pour ajouter les headers d'auth
const getAuthHeaders = async () => {
  const token = await getToken();
  
  if (!token) {
    console.warn('⚠️ No token found for API request');
    throw new Error('Non authentifié');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const songsApi = {
  // Récupérer toutes les chansons
  getAll: async (): Promise<Song[]> => {
    try {
      console.log('📡 Fetching songs from API...');
      const headers = await getAuthHeaders();
      console.log('🔑 Headers prepared with token');
      
      const url = getApiUrl('/songs');
      console.log('🌐 API URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      console.log('📊 Response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token invalide ou expiré');
        }
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Songs received:', data.length, 'songs');
      return data;
    } catch (error) {
      console.error('❌ Error fetching songs:', error);
      throw error;
    }
  },

  // Rechercher des chansons via l'API Deezer (app web)
  searchDeezer: async (query: string): Promise<any[]> => {
    try {
      console.log('🔍 Searching on Deezer:', query);
      
      // Utiliser l'IP au lieu de localhost pour éviter les problèmes CORS
      const webAppUrl = 'http://192.168.0.241:3000';
      const response = await fetch(`${webAppUrl}/api/songs/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const results = await response.json();
      console.log(`✅ Found ${results.length} songs on Deezer`);
      return results;
    } catch (error) {
      console.error('❌ Deezer search error:', error);
      throw error;
    }
  },

  // Rechercher dans les chansons locales (Laravel API)
  search: async (query: string): Promise<Song[]> => {
    try {
      console.log('🔍 Searching local songs with query:', query);
      const headers = await getAuthHeaders();
      
      const response = await fetch(getApiUrl(`/songs/search?q=${encodeURIComponent(query)}`), {
        method: 'GET',
        headers,
      });

      console.log('🔍 Search response status:', response.status);

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const results = await response.json();
      console.log('✅ Search results:', results.length, 'songs found');
      return results;
    } catch (error) {
      console.error('❌ Error searching songs:', error);
      throw error;
    }
  },

  // Récupérer une chanson par ID
  getById: async (id: string): Promise<Song> => {
    try {
      const headers = await getAuthHeaders();
      
      const response = await fetch(getApiUrl(`/songs/${id}`), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Chanson non trouvée');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching song:', error);
      throw error;
    }
  },

  // Créer une nouvelle chanson
  create: async (songData: Partial<Song>): Promise<Song> => {
    try {
      const headers = await getAuthHeaders();
      
      const response = await fetch(getApiUrl('/songs'), {
        method: 'POST',
        headers,
        body: JSON.stringify(songData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating song:', error);
      throw error;
    }
  },

  // Mettre à jour une chanson
  update: async (id: string, songData: Partial<Song>): Promise<Song> => {
    try {
      const headers = await getAuthHeaders();
      
      const response = await fetch(getApiUrl(`/songs/${id}`), {
        method: 'PUT',
        headers,
        body: JSON.stringify(songData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  },

  // Supprimer une chanson
  delete: async (id: string): Promise<boolean> => {
    try {
      const headers = await getAuthHeaders();
      
      const response = await fetch(getApiUrl(`/songs/${id}`), {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      return true;
    } catch (error) {
      console.error('Error deleting song:', error);
      throw error;
    }
  },
};