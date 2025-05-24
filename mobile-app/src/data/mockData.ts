
import { Song, Playlist, PlaylistWithSongs, User } from '../types';

// Mock User (utilisateur connecté)
export const mockUser: User = {
  id: 'user-1',
  email: 'test@musicapp.com',
  username: 'nnnn99',
  created_at: '2024-01-01T00:00:00Z',
  avatar_url: undefined,
  is_premium: false,
};

// Mock Songs (basées sur votre interface de test)
export const mockSongs: Song[] = [
  {
    id: 'song-1',
    created_at: '2024-01-15T10:00:00Z',
    user_id: 'user-1',
    title: "J'oublie tout",
    author: 'Artiste Français',
    album: 'Album Test',
    language: 'fr',
    image_path: '/images/joublie-tout.jpg',
    song_path: '/audio/joublie-tout.mp3',
    genre: 'Pop',
    track_number: 1,
    release_date: '2024-01-01',
    duration: 210, // 3:30 en secondes
    play_count: 1250,
  },
  {
    id: 'song-2',
    created_at: '2024-01-20T14:30:00Z',
    user_id: 'user-2',
    title: 'CIEL',
    author: 'GIMS & DYSTINCT',
    album: 'Single',
    language: 'fr',
    image_path: '/images/ciel.jpg',
    song_path: '/audio/ciel.mp3',
    genre: 'Rap',
    track_number: 1,
    release_date: '2024-01-15',
    duration: 195, // 3:15 en secondes
    play_count: 2100,
  },
  {
    id: 'song-3',
    created_at: '2024-01-22T09:15:00Z',
    user_id: 'user-3',
    title: 'SPIDER',
    author: 'GIMS & DYSTINCT',
    album: 'Collaboration',
    language: 'fr',
    image_path: '/images/spider.jpg',
    song_path: '/audio/spider.mp3',
    genre: 'Rap',
    track_number: 2,
    release_date: '2024-01-20',
    duration: 180, // 3:00 en secondes
    play_count: 1800,
  },
  {
    id: 'song-4',
    created_at: '2024-01-25T16:45:00Z',
    user_id: 'user-1',
    title: 'POP!',
    author: 'NAYEON',
    album: 'IM NAYEON',
    language: 'ko',
    image_path: '/images/pop.jpg',
    song_path: '/audio/pop.mp3',
    genre: 'K-Pop',
    track_number: 3,
    release_date: '2024-01-22',
    duration: 165, // 2:45 en secondes
    play_count: 3200,
  },
];

// Mock Playlists (basées sur votre interface)
export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'ss',
    user_id: 'user-1',
    created_at: '2024-01-10T00:00:00Z',
    description: 'Ma première playlist',
    image_path: undefined,
    is_public: false,
  },
  {
    id: 'playlist-2',
    name: 'nn',
    user_id: 'user-1',
    created_at: '2024-01-12T00:00:00Z',
    description: 'Playlist numéro 2',
    image_path: undefined,
    is_public: false,
  },
  {
    id: 'playlist-3',
    name: '5',
    user_id: 'user-1',
    created_at: '2024-01-14T00:00:00Z',
    description: 'Cinquième playlist',
    image_path: undefined,
    is_public: true,
  },
  {
    id: 'playlist-4',
    name: '222',
    user_id: 'user-1',
    created_at: '2024-01-16T00:00:00Z',
    description: 'Playlist avec beaucoup de chansons',
    image_path: undefined,
    is_public: false,
  },
  {
    id: 'playlist-5',
    name: 'Nouvelle play',
    user_id: 'user-1',
    created_at: '2024-01-18T00:00:00Z',
    description: 'Ma playlist la plus récente',
    image_path: undefined,
    is_public: false,
  },
];

// Mock Playlists avec chansons
export const mockPlaylistsWithSongs: PlaylistWithSongs[] = mockPlaylists.map((playlist, index) => ({
  ...playlist,
  songs: mockSongs.slice(0, (index % 3) + 1), // Différent nombre de chansons par playlist
  song_count: (index % 3) + 1,
}));

// Mock données pour "Liked Songs"
export const mockLikedSongs: Song[] = [
  mockSongs[0], // J'oublie tout
  mockSongs[2], // SPIDER
];

// Fonctions utilitaires pour les mocks
export const getMockSongById = (id: string): Song | undefined => {
  return mockSongs.find(song => song.id === id);
};

export const getMockPlaylistById = (id: string): PlaylistWithSongs | undefined => {
  return mockPlaylistsWithSongs.find(playlist => playlist.id === id);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Export par défaut avec toutes les données
export default {
  user: mockUser,
  songs: mockSongs,
  playlists: mockPlaylists,
  playlistsWithSongs: mockPlaylistsWithSongs,
  likedSongs: mockLikedSongs,
};