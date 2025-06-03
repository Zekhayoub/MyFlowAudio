import { supabase } from '../lib/supabase';
import { Database } from '../types/database.types';

type Song = Database['public']['Tables']['songs']['Row'];
type LikedSong = Database['public']['Tables']['liked_songs']['Row'];

export const songsService = {
  // Récupérer toutes les chansons de l'utilisateur connecté
  async getUserSongs(userId: string): Promise<Song[]> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user songs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserSongs:', error);
      return [];
    }
  },

  // Récupérer toutes les chansons (pour la recherche)
  async getAllSongs(): Promise<Song[]> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all songs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllSongs:', error);
      return [];
    }
  },

  // Récupérer les chansons par titre
  async searchSongsByTitle(title: string): Promise<Song[]> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching songs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchSongsByTitle:', error);
      return [];
    }
  },

  // Récupérer les chansons likées
  async getLikedSongs(userId: string): Promise<Song[]> {
    try {
      const { data, error } = await supabase
        .from('liked_songs')
        .select(`
          song_id,
          songs (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching liked songs:', error);
        return [];
      }

      // Extraire les chansons du résultat
      const songs = data?.map(item => (item as any).songs).filter(Boolean) || [];
      return songs;
    } catch (error) {
      console.error('Error in getLikedSongs:', error);
      return [];
    }
  },

  // Vérifier si une chanson est likée
  async isSongLiked(userId: string, songId: number): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('liked_songs')
        .select('song_id')
        .eq('user_id', userId)
        .eq('song_id', songId)
        .single();

      return !!data && !error;
    } catch (error) {
      return false;
    }
  },

  // Toggle like/unlike
  async toggleLikeSong(userId: string, songId: number): Promise<boolean> {
    try {
      const isLiked = await this.isSongLiked(userId, songId);

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('liked_songs')
          .delete()
          .eq('user_id', userId)
          .eq('song_id', songId);

        if (error) throw error;
        return false;
      } else {
        // Like
        const { error } = await supabase
          .from('liked_songs')
          .insert({
            user_id: userId,
            song_id: songId,
          });

        if (error) throw error;
        return true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  // Obtenir l'URL publique d'une chanson
  getSongUrl(songPath: string | null): string | null {
    if (!songPath) return null;
    
    const { data } = supabase.storage
      .from('songs')
      .getPublicUrl(songPath);
    
    return data.publicUrl;
  },

  // Obtenir l'URL publique d'une image
  getImageUrl(imagePath: string | null): string | null {
    if (!imagePath) return null;
    
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  },
};