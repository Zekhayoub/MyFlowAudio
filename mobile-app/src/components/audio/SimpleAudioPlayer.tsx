import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { useAudio } from '../../contexts/AudioContext';
import theme from '../../styles/theme';

const SimpleAudioPlayer: React.FC = () => {
  const { currentSong, isPlaying, isLoading, pauseSong, resumeSong, stopSong } = useAudio();

  // Animation pour le bouton play
  const playButtonScale = new Animated.Value(1);

  // Si pas de chanson en cours, ne pas afficher
  if (!currentSong) return null;

  // Animation du bouton
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(playButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(playButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Gestion du play/pause
  const handlePlayPause = () => {
    animateButton();
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  // Gestion du stop
  const handleStop = () => {
    animateButton();
    stopSong();
  };

  return (
    <View style={styles.playerContainer}>
      {/* Barre de progression simple (visuelle seulement) */}
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: '30%' }]} />
      </View>

      <View style={styles.playerContent}>
        {/* Infos de la chanson */}
        <View style={styles.songInfo}>
          <View style={styles.albumArt}>
            <Text style={styles.albumArtIcon}>🎵</Text>
          </View>
          
          <View style={styles.songDetails}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.songArtist} numberOfLines={1}>
              {currentSong.author}
            </Text>
          </View>
        </View>

        {/* Contrôles */}
        <View style={styles.controls}>
          <Pressable style={styles.controlButton} onPress={handlePlayPause}>
            <Animated.View style={{ transform: [{ scale: playButtonScale }] }}>
              {isLoading ? (
                <Text style={styles.controlIcon}>⏳</Text>
              ) : (
                <Text style={styles.controlIcon}>
                  {isPlaying ? '⏸️' : '▶️'}
                </Text>
              )}
            </Animated.View>
          </Pressable>
          
          <Pressable style={styles.controlButton} onPress={handleStop}>
            <Text style={styles.controlIcon}>⏹️</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.modal,
    borderTopWidth: 1,
    borderTopColor: theme.colors.button_and_input,
    ...theme.shadows.lg,
  },
  
  progressBar: {
    height: 3,
    backgroundColor: theme.colors.button_and_input,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.gradient1,
  },
  
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  
  songInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.button_and_input,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  albumArtIcon: {
    fontSize: 24,
  },
  
  songDetails: {
    flex: 1,
  },
  
  songTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  songArtist: {
    color: theme.colors.secondary,
    fontSize: 14,
  },
  
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gradient1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  
  controlIcon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
});

export default SimpleAudioPlayer;