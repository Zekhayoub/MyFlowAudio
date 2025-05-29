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

const AudioPlayerBar: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    isLoading, 
    pauseSong, 
    resumeSong, 
    stopSong 
  } = useAudio();

  // Animation pour les boutons
  const playButtonScale = new Animated.Value(1);

  // Si pas de chanson, ne pas afficher
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

  // Gestion du stop + fermeture
  const handleClose = () => {
    animateButton();
    stopSong(); // Arrête la musique ET ferme la barre
  };

  return (
    <View style={styles.playerContainer}>
      {/* Barre de progression visuelle simple */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: isPlaying ? '50%' : '0%' }]} />
      </View>

      <View style={styles.playerContent}>
        {/* Infos de la chanson */}
        <View style={styles.songInfo}>
          <View style={styles.albumArt}>
            <Text style={styles.albumArtIcon}>
              {isPlaying ? '🎵' : '⏸️'}
            </Text>
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
          {/* Bouton Play/Pause */}
          <Pressable 
            style={styles.playButton} 
            onPress={handlePlayPause}
            disabled={isLoading}
          >
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
          
          {/* Bouton Fermer/Stop */}
          <Pressable 
            style={styles.closeButton} 
            onPress={handleClose}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>
      </View>

      {/* Indicateur de statut */}
      <View style={styles.statusIndicator}>
        <View style={[
          styles.statusDot, 
          { backgroundColor: isPlaying ? '#22C55E' : '#EF4444' }
        ]} />
        <Text style={styles.statusText}>
          {isLoading ? 'Chargement...' : isPlaying ? 'En lecture' : 'En pause'}
        </Text>
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
    elevation: 10, // Pour Android
  },
  
  progressBar: {
    height: 3,
    backgroundColor: theme.colors.button_and_input,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.gradient1,
    transition: 'width 0.3s ease',
  },
  
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
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
    backgroundColor: theme.colors.gradient1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  albumArtIcon: {
    fontSize: 24,
    color: theme.colors.primary,
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
    gap: theme.spacing.sm,
  },
  
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gradient1,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  
  controlIcon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  closeIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },

  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  
  statusText: {
    color: theme.colors.secondary,
    fontSize: 12,
  },
});

export default AudioPlayerBar;