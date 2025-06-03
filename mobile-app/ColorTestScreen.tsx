import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import theme from './src/styles/theme';
import globalStyles from './src/styles/globalStyles';

const ColorTestScreen: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView style={globalStyles.container}>
        
        {/* Header Test - Inspiré de votre Header web */}
        <View style={globalStyles.header}>
          <Text style={globalStyles.headerTitle}>🎵 MusicApp</Text>
          <Text style={[globalStyles.headerTitle, { fontSize: 24 }]}>☰</Text>
        </View>

        <View style={styles.content}>
          
          {/* Welcome Section - Inspiré de votre page d'accueil */}
          <Text style={globalStyles.welcomeText}>Bienvenue</Text>
          
          {/* Liked Songs Card - Inspiré de votre ListItem */}
          <Pressable style={styles.likedSongsCard}>
            <View style={styles.likedIcon}>
              <Text style={{ fontSize: 24 }}>😍</Text>
            </View>
            <Text style={[theme.typography.body, { flex: 1 }]}>Liked Songs</Text>
            <View style={styles.playButton}>
              <Text style={{ color: theme.colors.tertiary }}>▶</Text>
            </View>
          </Pressable>

          {/* Section Title */}
          <Text style={globalStyles.sectionTitle}>Your Playlists</Text>
          
          {/* Playlist Grid - Inspiré de votre PageContent */}
          <View style={globalStyles.grid2}>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.h3}>ss</Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.h3}>nn</Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.h3}>5</Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.h3}>222</Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.body}>add</Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.playlistCard]}>
              <Text style={theme.typography.body}>Nouvelle play</Text>
            </View>
          </View>

          {/* Section Title */}
          <Text style={globalStyles.sectionTitle}>Newest songs</Text>
          
          {/* Song Cards Grid */}
          <View style={globalStyles.grid2}>
            <View style={[globalStyles.gridItem2, globalStyles.songCard]}>
              <View style={styles.songIcon}>
                <Text style={{ fontSize: 32, color: theme.colors.primary }}>🎵</Text>
              </View>
              <Text style={[theme.typography.caption, { textAlign: 'center', marginTop: 8 }]}>
                J'oublie tout
              </Text>
            </View>
            <View style={[globalStyles.gridItem2, globalStyles.songCard]}>
              <View style={styles.songIcon}>
                <Text style={{ fontSize: 32, color: theme.colors.primary }}>🎵</Text>
              </View>
              <Text style={[theme.typography.caption, { textAlign: 'center', marginTop: 8 }]}>
                CIEL
              </Text>
            </View>
          </View>

          {/* Buttons Test */}
          <View style={{ marginTop: theme.spacing.xl }}>
            <Text style={globalStyles.sectionTitle}>Buttons Test</Text>
            
            <Pressable style={globalStyles.primaryButton}>
              <Text style={theme.typography.button}>Primary Button</Text>
            </Pressable>
            
            <View style={{ height: theme.spacing.md }} />
            
            <Pressable style={globalStyles.secondaryButton}>
              <Text style={[theme.typography.button, { color: theme.colors.primary }]}>
                Secondary Button
              </Text>
            </Pressable>
          </View>

          {/* Color Palette Display */}
          <View style={{ marginTop: theme.spacing.xl }}>
            <Text style={globalStyles.sectionTitle}>Color Palette</Text>
            <View style={styles.colorGrid}>
              {Object.entries(theme.colors).map(([name, color]) => (
                <View key={name} style={styles.colorItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                  <Text style={[theme.typography.caption, { fontSize: 12 }]}>
                    {name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
  },
  
  // Liked Songs Card (inspiré de votre ListItem web)
  likedSongsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.brightened}1A`, // 10% opacity
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
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
  
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.gradient2,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  
  // Song Card Icon
  songIcon: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  
  // Color Palette Display
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  colorItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
});

export default ColorTestScreen;