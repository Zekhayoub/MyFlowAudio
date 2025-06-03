
export interface Settings {
  id: string;
  full_name: string;
  avatar_path: string;
}

export interface Song {
  id: string;
  user_id?: string;
  author: string;
  title: string;
  song_path: string;
  image_path?: string;
  language?: string;
  album?: string;
  genre?: string;
  created_at?: string;
  play_count?: number;
}

export interface Playlist {
  id: string;
  name: string;
  user_id: string;
  created_at?: string;
  songs?: Song[];
}