import React, { createContext, useContext, useState, useRef } from 'react';
import { Song } from '../types';

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  playSong: (song: Song) => Promise<void>;
  pauseSong: () => void;
  resumeSong: () => void;
  stopSong: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      audioRef.current = null;
    }
  };

  const playSong = async (song: Song): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setIsLoading(true);
        console.log('🎵 Playing:', song.title);
        
        cleanupAudio();
        
        if (!song.song_path) {
          throw new Error('No audio file');
        }
        
        let audioUrl;
        if (song.song_path.startsWith('http')) {
          audioUrl = song.song_path;
        } else {
          const testUrls = [
            'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav', 
            'https://www.soundjay.com/misc/sounds/bell-ringing-03.wav',
          ];
          const index = Math.abs(song.id.charCodeAt(song.id.length - 1)) % testUrls.length;
          audioUrl = testUrls[index];
        }
        
        const audio = new Audio();
        audioRef.current = audio;
        
        audio.addEventListener('canplaythrough', () => {
          setIsLoading(false);
          audio.play()
            .then(() => {
              setCurrentSong(song);
              setIsPlaying(true);
              console.log('✅ Playing successfully');
              resolve();
            })
            .catch((error) => {
              console.error('❌ Play failed:', error);
              setIsLoading(false);
              reject(error);
            });
        });
        
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentSong(null);
          cleanupAudio();
        });
        
        audio.addEventListener('error', () => {
          setIsLoading(false);
          reject(new Error('Audio loading failed'));
        });
        
        audio.src = audioUrl;
        audio.load();
        
      } catch (error) {
        setIsLoading(false);
        reject(error);
      }
    });
  };

  const pauseSong = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const stopSong = () => {
    cleanupAudio();
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const value: AudioContextType = {
    currentSong,
    isPlaying,
    isLoading,
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};