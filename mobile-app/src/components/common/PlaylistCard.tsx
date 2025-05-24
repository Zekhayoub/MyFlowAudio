
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Playlist } from '../../types';
import theme from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress?: (playlist: Playlist) => void;
  songCount?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ 
  playlist, 
  onPress,
  songCount 
}) => {
  const handlePress = () => {
    onPress?.(playlist);
  };

  return (
    <Pressable 
      style={[globalStyles.playlistCard, styles.card]}
      onPress={handlePress}
    >
      <Text style={theme.typography.h3}>{playlist.name}</Text>
      {songCount !== undefined && (
        <Text style={[theme.typography.caption, styles.songCount]}>
          {songCount} chanson{songCount > 1 ? 's' : ''}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  songCount: {
    marginTop: theme.spacing.xs,
    opacity: 0.7,
  },
});

export default PlaylistCard;
