import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../src/components/common/Header';
import SongCard from '../../src/components/common/SongCard';
import { Song } from '../../src/types';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';
import { useAudio } from '../../src/contexts/AudioContext';
import { useLikes } from '../../src/contexts/LikesContext';

const LikedScreen: React.FC = () => {
  const { likedSongs, refreshLikes, isLoading } = useLikes();
  const { setPlaylist, playTrack } = useAudio();
  const router = useRouter();

  // Rafraîchir les likes quand on arrive sur la page
  useEffect(() => {
    refreshLikes();
  }, []);

  const handleSongPress = (song: Song) => {
    const index = likedSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setPlaylist(likedSongs);
      playTrack(index);
    }
  };

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      setPlaylist(likedSongs);
      playTrack(0);
    }
  };

  const handleShuffle = () => {
    if (likedSongs.length > 0) {
      const shuffled = [...likedSongs].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
      playTrack(0);
    }
  };

  const navigateToSearch = () => {
    router.push('/search');
  };

  // Calculer les stats
  const totalDuration = likedSongs.reduce((acc, song) => acc + (song.duration || 0), 0);
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalPlays = likedSongs.reduce((acc, song) => acc + (song.play_count || 0), 0);

  if (isLoading) {
    return (
      <View style={globalStyles.container}>
        <Header title="Liked Songs" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.gradient1} />
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Header title="Liked Songs" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>😍</Text>
          <Text style={styles.heroTitle}>Liked Songs</Text>
          <Text style={styles.heroSubtitle}>
            {likedSongs.length} chanson{likedSongs.length > 1 ? 's' : ''} aimée{likedSongs.length > 1 ? 's' : ''}
          </Text>
          
          {/* Action Buttons */}
          {likedSongs.length > 0 && (
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
          )}
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
                        showLikeButton={true}
                      />
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
              
              <Pressable style={styles.exploreButton} onPress={navigateToSearch}>
                <Text style={styles.exploreButtonText}>
                  Découvrir la musique
                </Text>
              </Pressable>
            </View>
          )}

          {/* Quick Actions */}
          {likedSongs.length > 0 && (
            <View style={styles.quickActions}>
              <Text style={globalStyles.sectionTitle}>Actions rapides</Text>
              
              <View style={styles.actionsGrid}>
                <Pressable style={styles.actionCard} onPress={handleShuffle}>
                  <Text style={styles.actionCardIcon}>🔀</Text>
                  <Text style={styles.actionCardText}>Lecture aléatoire</Text>
                </Pressable>
                
                <Pressable style={styles.actionCard} onPress={refreshLikes}>
                  <Text style={styles.actionCardIcon}>🔄</Text>
                  <Text style={styles.actionCardText}>Actualiser</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Stats Section */}
          {likedSongs.length > 0 && (
            <View style={styles.statsSection}>
              <Text style={globalStyles.sectionTitle}>Statistiques</Text>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{likedSongs.length}</Text>
                  <Text style={styles.statLabel}>Chansons</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{totalMinutes}</Text>
                  <Text style={styles.statLabel}>Minutes</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{totalPlays}</Text>
                  <Text style={styles.statLabel}>Écoutes</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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