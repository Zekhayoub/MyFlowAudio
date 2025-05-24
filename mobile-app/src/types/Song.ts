
export interface Song {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  author: string;
  album?: string;
  language?: string;
  image_path?: string;
  song_path?: string;
  genre?: string;
  track_number?: number;
  release_date?: string;
  duration?: number;
  play_count: number;
}

// Type pour créer une nouvelle chanson (sans les champs auto-générés)
export interface CreateSongInput {
  title: string;
  author: string;
  album?: string;
  language?: string;
  image_path?: string;
  song_path?: string;
  genre?: string;
  track_number?: number;
  release_date?: string;
  duration?: number;
}
