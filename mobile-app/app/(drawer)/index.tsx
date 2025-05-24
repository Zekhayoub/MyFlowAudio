import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import mockData from '../../src/data/mockData';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView style={globalStyles.container}>
        
        {/* Header */}
        <View style={globalStyles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.musicIcon}>🎵</Text>
            <Text style={globalStyles.headerTitle}>MusicApp</Text>
          </View>
          <Text style={styles.menuIcon}>☰</Text>
        </View>

        <View style={styles.content}>
          {/* Section Bienvenue */}
          <Text style={globalStyles.welcomeText}>Bienvenue</Text>
          
          {/* Carte Liked Songs */}
          <Pressable style={styles.likedSongsCard}>
            <View style={styles.likedIcon}>
              <Text style={styles.likedEmoji}>😍</Text>
            </View>
            <Text style={[theme.typography.body, { flex: 1 }]}>Liked Songs</Text>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </Pressable>

          {/* Section Your Playlists */}
          <Text style={globalStyles.sectionTitle}>Your Playlists</Text>
          
          <View style={globalStyles.grid2}>
            {mockData.playlists.map((playlist) => (
              <View key={playlist.id} style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
                <Text style={theme.typography.h3}>{playlist.name}</Text>
              </View>
            ))}
          </View>

          {/* Section Newest Songs */}
          <Text style={globalStyles.sectionTitle}>Newest songs</Text>
          
          {mockData.songs.map((song) => (
            <View key={song.id} style={styles.songCard}>
              <View style={styles.songIcon}>
                <Text style={styles.musicNote}>🎵</Text>
              </View>
              <View style={styles.songInfo}>
                <Text style={[theme.typography.body, styles.songTitle]}>
                  {song.title}
                </Text>
                <Text style={[theme.typography.caption, styles.songArtist]}>
                  {song.author}
                </Text>
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  musicIcon: {
    fontSize: 28,
    color: theme.colors.primary,
  },
  
  menuIcon: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  
  // Liked Songs Card
  likedSongsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.brightened}1A`,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  
  likedIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.modal,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  likedEmoji: {
    fontSize: 24,
  },
  
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.gradient2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  playIcon: {
    color: theme.colors.primary,
    fontSize: 16,
    marginLeft: 2,
  },
  
  // Song Cards
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.modal,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  
  songIcon: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  musicNote: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  
  songInfo: {
    flex: 1,
  },
  
  songTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  
  songArtist: {
    opacity: 0.7,
  },
});

export default HomeScreen;