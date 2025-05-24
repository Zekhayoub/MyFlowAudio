export type { Song, CreateSongInput } from './Song';
export type { Playlist, PlaylistSong, PlaylistWithSongs } from './Playlist';
export type { User } from './User';
export type { LikedSong } from './LikedSong';

// Types utilitaires pour l'UI
export interface NavigationProps {
  navigation: any; // TODO: typer avec React Navigation
}

export interface ScreenProps {
  route: any;
  navigation: any;
}