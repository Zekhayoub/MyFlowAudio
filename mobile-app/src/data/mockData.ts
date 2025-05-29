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

// Mock Songs avec fichiers audio (URLs publiques + locaux)
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
    // URL audio publique pour test
    song_path: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop',
    track_number: 1,
    release_date: '2024-01-01',
    duration: 210000, // 3:30 en millisecondes
    play_count: 3200,
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
    // URL audio publique - exemple de musique libre
    song_path: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav',
    genre: 'Rap',
    track_number: 1,
    release_date: '2024-01-15',
    duration: 195000, // 3:15 en millisecondes
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
    // Fichier local (vous placerez vos mp3 dans assets/audio/)
    song_path: 'spider.mp3',
    genre: 'Rap',
    track_number: 2,
    release_date: '2024-01-20',
    duration: 180000, // 3:00 en millisecondes
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
    // Fichier local
    song_path: 'pop.mp3',
    genre: 'K-Pop',
    track_number: 3,
    release_date: '2024-01-22',
    duration: 165000, // 2:45 en millisecondes
    play_count: 1250,
  },
  {
    id: 'song-5',
    created_at: '2024-02-01T12:00:00Z',
    user_id: 'user-1',
    title: 'Bella',
    author: 'Maître GIMS',
    album: 'Subliminal',
    language: 'fr',
    image_path: '/images/bella.jpg',
    // URL audio publique
    song_path: 'https://www.soundjay.com/misc/sounds/bell-ringing-03.wav',
    genre: 'Pop',
    track_number: 4,
    release_date: '2023-05-10',
    duration: 212000, // 3:32 en millisecondes
    play_count: 4500,
  },
  {
    id: 'song-6',
    created_at: '2024-02-05T14:30:00Z',
    user_id: 'user-2',
    title: 'Summer Vibes',
    author: 'Artist Example',
    album: 'Test Album',
    language: 'en',
    image_path: '/images/summer.jpg',
    // Fichier local que vous ajouterez
    song_path: 'summer-vibes.mp3',
    genre: 'Pop',
    track_number: 5,
    release_date: '2024-02-01',
    duration: 198000, // 3:18 en millisecondes
    play_count: 2800,
  },
];

// Mock Playlists (inchangées)
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
  songs: mockSongs.slice(0, (index % 4) + 2), // 2 à 5 chansons par playlist
  song_count: (index % 4) + 2,
}));

// Mock données pour "Liked Songs" (basé sur play_count > 2000)
export const mockLikedSongs: Song[] = mockSongs.filter(song => song.play_count > 2000);

// Fonctions utilitaires pour les mocks
export const getMockSongById = (id: string): Song | undefined => {
  return mockSongs.find(song => song.id === id);
};

export const getMockPlaylistById = (id: string): PlaylistWithSongs | undefined => {
  return mockPlaylistsWithSongs.find(playlist => playlist.id === id);
};

export const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Export par défaut avec toutes les données
export default {
  user: mockUser,
  songs: mockSongs,
  playlists: mockPlaylists,
  playlistsWithSongs: mockPlaylistsWithSongs,
  likedSongs: mockLikedSongs,
};