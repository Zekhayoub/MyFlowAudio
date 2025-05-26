import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import Header from '../../src/components/common/Header';
import SongCard from '../../src/components/common/SongCard';
import mockData from '../../src/data/mockData';
import { Song } from '../../src/types';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const LikedScreen: React.FC = () => {
  // Simulation des chansons aimées (basé sur play_count > 2000)
  const likedSongs = mockData.songs.filter(song => song.play_count > 2000);

  const handleSongPress = (song: Song) => {
    console.log('Play song:', song.title);
    // TODO: Démarrer lecture
  };

  const handlePlayAll = () => {
    console.log('Play all liked songs');
    // TODO: Lecture de toutes les chansons aimées
  };

  const handleShuffle = () => {
    console.log('Shuffle liked songs');
    // TODO: Lecture aléatoire
  };

  const handleDownload = () => {
    console.log('Download liked songs');
    // TODO: Téléchargement hors ligne
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Liked Songs" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>😍</Text>
          <Text style={styles.heroTitle}>Liked Songs</Text>
          <Text style={styles.heroSubtitle}>
            {likedSongs.length} chansons aimées
          </Text>
          
          {/* Action Buttons */}
          <View style={styles.heroActions}>
            <Pressable style={styles.playAllButton} onPress={handlePlayAll}>
              <Text style={styles.playIcon}>▶️</Text>
              <Text style={styles.playAllText}>Tout lire</Text>
            </Pressable>
            
            <Pressable style={styles.shuffleButton} onPress={handleShuffle}>
              <Text style={styles.shuffleIcon}>🔀</Text>
              <Text style={styles.shuffleText}>Aléatoire</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.content}>
          {/* Songs List */}
          {likedSongs.length > 0 ? (
            <>
              <Text style={globalStyles.sectionTitle}>
                Vos chansons préférées
              </Text>
              
              <View style={styles.songsContainer}>
                {likedSongs.map((song, index) => (
                  <View key={song.id} style={styles.songWrapper}>
                    {/* Track Number */}
                    <View style={styles.trackNumber}>
                      <Text style={styles.trackNumberText}>{index + 1}</Text>
                    </View>
                    
                    {/* Song Card */}
                    <View style={styles.songCardWrapper}>
                      <SongCard
                        song={song}
                        onPress={handleSongPress}
                        showDuration={true}
                      />
                    </View>
                    
                    {/* Actions */}
                    <View style={styles.songActions}>
                      <Pressable style={styles.actionButton}>
                        <Text style={styles.actionIcon}>❤️</Text>
                      </Pressable>
                      <Pressable style={styles.actionButton}>
                        <Text style={styles.actionIcon}>⋯</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : (
            // Empty State
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💔</Text>
              <Text style={styles.emptyTitle}>Aucune chanson aimée</Text>
              <Text style={styles.emptySubtitle}>
                Explorez la musique et ajoutez vos favoris !
              </Text>
              
              <Pressable style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>
                  Découvrir la musique
                </Text>
              </Pressable>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={globalStyles.sectionTitle}>Actions rapides</Text>
            
            <View style={styles.actionsGrid}>
              <Pressable style={styles.actionCard} onPress={handleShuffle}>
                <Text style={styles.actionCardIcon}>🔀</Text>
                <Text style={styles.actionCardText}>Lecture aléatoire</Text>
              </Pressable>
              
              <Pressable style={styles.actionCard} onPress={handleDownload}>
                <Text style={styles.actionCardIcon}>📥</Text>
                <Text style={styles.actionCardText}>Télécharger</Text>
              </Pressable>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={globalStyles.sectionTitle}>Statistiques</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{likedSongs.length}</Text>
                <Text style={styles.statLabel}>Chansons</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {Math.floor(likedSongs.reduce((acc, song) => acc + (song.duration || 0), 0) / 60)}
                </Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {likedSongs.reduce((acc, song) => acc + song.play_count, 0)}
                </Text>
                <Text style={styles.statLabel}>Écoutes</Text>
              </View>
            </View>
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

  // Hero Section
  heroSection: {
    backgroundColor: theme.colors.gradient1,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  
  heroEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  
  heroTitle: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  
  heroSubtitle: {
    color: theme.colors.primary,
    fontSize: 16,
    opacity: 0.8,
    marginBottom: theme.spacing.lg,
  },
  
  heroActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  
  playAllButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  playIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  
  playAllText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  
  shuffleButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  shuffleIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  
  shuffleText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Content
  content: {
    padding: theme.spacing.md,
  },

  // Songs List
  songsContainer: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  
  songWrapper: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  
  trackNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gradient1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  trackNumberText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  
  songCardWrapper: {
    flex: 1,
  },
  
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  actionButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  
  actionIcon: {
    fontSize: 18,
  },

  // Empty State
  emptyState: {
    backgroundColor: theme.colors.modal,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  
  emptyTitle: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  emptySubtitle: {
    color: theme.colors.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  
  exploreButton: {
    backgroundColor: theme.colors.gradient1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  
  exploreButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Quick Actions
  quickActions: {
    marginBottom: theme.spacing.xl,
  },
  
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  actionCard: {
    backgroundColor: theme.colors.modal,
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  
  actionCardIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  
  actionCardText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Stats
  statsSection: {
    marginBottom: theme.spacing.xl,
  },
  
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  statCard: {
    backgroundColor: theme.colors.modal,
    flex: 1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  
  statNumber: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  
  statLabel: {
    color: theme.colors.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LikedScreen;