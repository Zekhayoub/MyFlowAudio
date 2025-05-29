import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Song } from '../../types';
import theme from '../../styles/theme';
import { useAudio } from '../../contexts/AudioContext';
import { useLikes } from '../../contexts/LikesContext';

interface SongCardProps {
  song: Song;
  onPress: (song: Song) => void;
  showLikeButton?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPress, showLikeButton = true }) => {
  const { currentTrack } = useAudio();
  const { isLiked, toggleLike } = useLikes();
  const isPlaying = currentTrack?.id === song.id;
  
  // Pour les chansons Deezer, utiliser l'ID numérique au lieu de "deezer-X"
  const songIdForLike = song.user_id === 'deezer' && song.id.startsWith('deezer-') 
    ? song.id.replace('deezer-', '') 
    : song.id;
    
  const liked = isLiked(songIdForLike);
  
  // Vérifier si c'est une chanson Deezer
  const isDeezerSong = song.user_id === 'deezer';
  
  // Image par défaut si pas d'image
  const imageSource = song.image_path 
    ? { uri: song.image_path }
    : require('../../assets/images/default-album.jpg');

  // Fonction pour formater la durée si elle existe
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLikePress = async (e: any) => {
    e.stopPropagation(); // Empêcher le déclenchement du onPress parent
    await toggleLike(song);
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        isPlaying && styles.containerActive,
        pressed && styles.pressed
      ]}
      onPress={() => onPress(song)}
    >
      <Image 
        source={imageSource}
        style={[styles.image, isPlaying && styles.imageActive]}
        defaultSource={require('../../assets/images/default-album.jpg')}
      />
      
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isPlaying && styles.titleActive]} numberOfLines={1}>
            {song.title}
          </Text>
          {isDeezerSong && (
            <View style={styles.deezerBadge}>
              <Text style={styles.deezerBadgeText}>Deezer</Text>
            </View>
          )}
        </View>
        <Text style={[styles.artist, isPlaying && styles.artistActive]} numberOfLines={1}>
          {song.author || 'Artiste inconnu'}
          {song.album && ` • ${song.album}`}
        </Text>
        {isDeezerSong && (
          <Text style={styles.previewText}>Aperçu 30s</Text>
        )}
      </View>
      
      <View style={styles.rightSection}>
        {song.duration && (
          <Text style={styles.duration}>
            {formatDuration(song.duration)}
          </Text>
        )}
        {showLikeButton && (
          <Pressable 
            onPress={handleLikePress} 
            style={styles.likeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.likeIcon, liked && styles.likeIconActive]}>
              {liked ? '♥' : '♡'}
            </Text>
          </Pressable>
        )}
        {isPlaying ? (
          <View style={styles.nowPlayingIndicator}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
          </View>
        ) : (
          <Text style={styles.playIcon}>▶</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  
  containerActive: {
    backgroundColor: theme.colors.gradient1 + '15',
    borderColor: theme.colors.gradient1,
    borderWidth: 1,
  },
  
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  image: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.slider,
  },
  
  imageActive: {
    borderWidth: 2,
    borderColor: theme.colors.gradient1,
  },
  
  info: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  
  title: {
    ...theme.typography.body,
    fontWeight: '600',
    flex: 1,
  },
  
  titleActive: {
    color: theme.colors.gradient1,
  },
  
  deezerBadge: {
    backgroundColor: '#FF6D42',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    marginLeft: 6,
  },
  
  deezerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  
  artist: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
  },
  
  artistActive: {
    color: theme.colors.gradient1,
  },
  
  previewText: {
    fontSize: 11,
    color: '#FF6D42',
    marginTop: 2,
    fontStyle: 'italic',
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  
  duration: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
  },
  
  likeButton: {
    padding: theme.spacing.xs,
  },
  
  likeIcon: {
    fontSize: 20,
    color: theme.colors.secondary,
  },
  
  likeIconActive: {
    color: theme.colors.gradient1,
  },
  
  playIcon: {
    fontSize: 12,
    color: theme.colors.secondary,
    marginLeft: theme.spacing.xs,
  },
  
  nowPlayingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 16,
    gap: 2,
    marginLeft: theme.spacing.xs,
  },
  
  bar: {
    width: 2,
    backgroundColor: theme.colors.gradient1,
    borderRadius: 1,
  },
  
  bar1: {
    height: 8,
    opacity: 0.8,
  },
  
  bar2: {
    height: 16,
  },
  
  bar3: {
    height: 6,
    opacity: 0.8,
  },
});

export default SongCard;