
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Song } from '../../types';
import { formatDuration } from '../../data/mockData';
import theme from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';

interface SongCardProps {
  song: Song;
  onPress?: (song: Song) => void;
  showDuration?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onPress,
  showDuration = true 
}) => {
  const handlePress = () => {
    onPress?.(song);
  };

  return (
    <Pressable 
      style={[globalStyles.songCard, styles.card]}
      onPress={handlePress}
    >
      {/* Icône de la chanson */}
      <View style={styles.songIcon}>
        <Text style={styles.musicNote}>🎵</Text>
      </View>
      
      {/* Infos de la chanson */}
      <View style={styles.songInfo}>
        <Text style={[theme.typography.body, styles.title]} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={[theme.typography.caption, styles.artist]} numberOfLines={1}>
          {song.author}
        </Text>
        
        {showDuration && song.duration && (
          <Text style={[theme.typography.caption, styles.duration]}>
            {formatDuration(song.duration)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  songIcon: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  musicNote: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  
  songInfo: {
    flex: 1,
  },
  
  title: {
    fontWeight: '600',
    marginBottom: 2,
  },
  
  artist: {
    marginBottom: 2,
  },
  
  duration: {
    fontSize: 12,
    opacity: 0.6,
  },
});

export default SongCard;