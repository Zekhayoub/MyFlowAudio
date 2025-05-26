import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import Header from '../../src/components/common/Header';
import PlaylistCard from '../../src/components/common/PlaylistCard';
import SongCard from '../../src/components/common/SongCard';
import { useAudio } from '../../src/contexts/AudioContext';
import mockData from '../../src/data/mockData';
import { Song, Playlist } from '../../src/types';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const HomeScreen: React.FC = () => {
  const { playSong, currentSong } = useAudio();

  // Handlers pour les interactions
  const handleLikedSongsPress = () => {
    console.log('Navigate to Liked Songs');
    router.push('/(drawer)/liked');
  };

  const handlePlaylistPress = (playlist: Playlist) => {
    console.log('Open playlist:', playlist.name);
    // TODO: Navigation vers l'écran de playlist
  };

  const handleSongPress = async (song: Song) => {
    console.log('🎵 Play song:', song.title);
    try {
      await playSong(song);
      console.log('✅ Song started successfully');
    } catch (error) {
      console.error('❌ Error starting song:', error);
    }
  };

  const handleCreatePlaylist = () => {
    console.log('Create new playlist');
    // TODO: Ouvrir modal de création de playlist
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: currentSong ? 100 : 20 // Espace pour le lecteur audio
        }}
      >
        <View style={styles.content}>
          
          {/* Section Bienvenue */}
          <Text style={globalStyles.welcomeText}>Bienvenue</Text>
          
          {/* Carte Liked Songs */}
          <Pressable style={styles.likedSongsCard} onPress={handleLikedSongsPress}>
            <View style={styles.likedIcon}>
              <Text style={styles.likedEmoji}>😍</Text>
            </View>
            <Text style={[theme.typography.body, { flex: 1 }]}>Liked Songs</Text>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </Pressable>

          {/* Section Your Playlists */}
          <View style={styles.sectionHeader}>
            <Text style={globalStyles.sectionTitle}>Your Playlists</Text>
          </View>
          
          <View style={globalStyles.grid2}>
            {mockData.playlistsWithSongs.map((playlist) => (
              <View key={playlist.id} style={globalStyles.gridItem2}>
                <PlaylistCard 
                  playlist={playlist}
                  songCount={playlist.song_count}
                  onPress={handlePlaylistPress}
                />
              </View>
            ))}
            
            {/* Bouton Add Playlist */}
            <View style={globalStyles.gridItem2}>
              <Pressable 
                style={[globalStyles.playlistCard, styles.addPlaylistCard]}
                onPress={handleCreatePlaylist}
              >
                <Text style={[theme.typography.h2, styles.addIcon]}>+</Text>
                <Text style={[theme.typography.body, styles.addText]}>
                  Nouvelle playlist
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Section Newest Songs */}
          <View style={styles.sectionHeader}>
            <Text style={globalStyles.sectionTitle}>Newest songs</Text>
          </View>
          
          <View style={styles.songsContainer}>
            {mockData.songs.map((song) => (
              <SongCard 
                key={song.id}
                song={song}
                onPress={handleSongPress}
              />
            ))}
          </View>

          {/* Message d'aide */}
          <View style={styles.helpMessage}>
            <Text style={styles.helpText}>
              🎵 Cliquez sur une chanson pour commencer la lecture !
            </Text>
            <Text style={styles.helpSubtext}>
              Le lecteur apparaîtra en bas de l'écran
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: theme.spacing.md,
  },
  
  sectionHeader: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  
  // Liked Songs Card
  likedSongsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.brightened}1A`, // 10% opacity
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  
  likedIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  likedEmoji: {
    fontSize: 24,
  },
  
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.gradient2,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  
  playIcon: {
    color: theme.colors.primary,
    fontSize: 16,
    marginLeft: 2, // Centrer visuellement le triangle
  },
  
  // Add Playlist Card
  addPlaylistCard: {
    backgroundColor: theme.colors.slider,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },
  
  addIcon: {
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  
  addText: {
    color: theme.colors.secondary,
    textAlign: 'center',
    fontSize: 14,
  },
  
  // Songs Container
  songsContainer: {
    gap: theme.spacing.sm,
  },

  // Help Message
  helpMessage: {
    backgroundColor: theme.colors.gradient1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  
  helpText: {
    color: theme.colors.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  
  helpSubtext: {
    color: theme.colors.primary,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default HomeScreen;