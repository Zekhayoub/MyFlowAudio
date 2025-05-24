
export interface Playlist {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  description?: string;
  image_path?: string;
  is_public?: boolean;
}

// Type pour les chansons dans une playlist (relation many-to-many)
export interface PlaylistSong {
  id: string;
  playlist_id: string;
  song_id: string;
  added_at: string;
  position: number;
}

// Type étendu avec les chansons incluses
export interface PlaylistWithSongs extends Playlist {
  songs: Song[];
  song_count: number;
}