import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import Header from '../../src/components/common/Header';
import SongCard from '../../src/components/common/SongCard';
import mockData from '../../src/data/mockData';
import { Song } from '../../src/types';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');

  // Filtrer les chansons selon la recherche
  const filteredSongs = mockData.songs.filter(song => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.author.toLowerCase().includes(query) ||
      (song.album && song.album.toLowerCase().includes(query))
    );
  });

  const recentSearches = ['GIMS', 'Rap français', 'Pop music', 'Chill vibes'];
  
  const trendingGenres = [
    { name: 'Pop', emoji: '🎵', color: theme.colors.gradient1 },
    { name: 'Rap', emoji: '🎤', color: '#DC2626' },
    { name: 'R&B', emoji: '💫', color: '#7C3AED' },
    { name: 'Rock', emoji: '🎸', color: '#EA580C' },
    { name: 'Jazz', emoji: '🎺', color: '#059669' },
    { name: 'Électro', emoji: '⚡', color: '#0891B2' },
  ];

  const filters = [
    { key: 'all', label: 'Tout' },
    { key: 'songs', label: 'Chansons' },
    { key: 'artists', label: 'Artistes' },
    { key: 'albums', label: 'Albums' },
  ];

  const handleSongPress = (song: Song) => {
    console.log('Play song:', song.title);
    // TODO: Démarrer lecture
  };

  const handleSearchSelect = (search: string) => {
    setSearchQuery(search);
  };

  const handleGenrePress = (genre: string) => {
    setSearchQuery(genre);
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Recherche" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Chansons, artistes, albums..."
                placeholderTextColor={theme.colors.secondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearIcon}>✕</Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Filter Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {filters.map((filter) => (
              <Pressable
                key={filter.key}
                style={[
                  styles.filterTab,
                  activeFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setActiveFilter(filter.key as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  activeFilter === filter.key && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Search Results */}
          {searchQuery.length > 0 ? (
            <View style={styles.resultsSection}>
              <Text style={globalStyles.sectionTitle}>
                Résultats ({filteredSongs.length})
              </Text>
              
              {filteredSongs.length > 0 ? (
                <View style={styles.songsContainer}>
                  {filteredSongs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      onPress={handleSongPress}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>😔</Text>
                  <Text style={styles.emptyTitle}>Aucun résultat</Text>
                  <Text style={styles.emptySubtitle}>
                    Essayez d'autres mots-clés
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <>
              {/* Recent Searches */}
              <View style={styles.section}>
                <Text style={globalStyles.sectionTitle}>Recherches récentes</Text>
                
                {recentSearches.map((search, index) => (
                  <Pressable
                    key={index}
                    style={styles.recentItem}
                    onPress={() => handleSearchSelect(search)}
                  >
                    <Text style={styles.recentIcon}>🕒</Text>
                    <Text style={styles.recentText}>{search}</Text>
                    <Pressable style={styles.removeButton}>
                      <Text style={styles.removeIcon}>✕</Text>
                    </Pressable>
                  </Pressable>
                ))}
              </View>

              {/* Trending Genres */}
              <View style={styles.section}>
                <Text style={globalStyles.sectionTitle}>Genres populaires</Text>
                
                <View style={styles.genresGrid}>
                  {trendingGenres.map((genre, index) => (
                    <Pressable
                      key={index}
                      style={[styles.genreCard, { backgroundColor: genre.color }]}
                      onPress={() => handleGenrePress(genre.name)}
                    >
                      <Text style={styles.genreEmoji}>{genre.emoji}</Text>
                      <Text style={styles.genreName}>{genre.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Quick Actions */}
              <View style={styles.section}>
                <Text style={globalStyles.sectionTitle}>Découvrir</Text>
                
                <Pressable style={styles.actionCard}>
                  <Text style={styles.actionIcon}>🎲</Text>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Surprise-moi !</Text>
                    <Text style={styles.actionSubtitle}>
                      Découvrez de nouveaux sons
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={[styles.actionCard, styles.actionCardSecondary]}>
                  <Text style={styles.actionIcon}>📻</Text>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Radio</Text>
                    <Text style={styles.actionSubtitle}>
                      Stations basées sur vos goûts
                    </Text>
                  </View>
                </Pressable>
              </View>
            </>
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
  
  content: {
    padding: theme.spacing.md,
  },

  // Search Input
  searchContainer: {
    marginBottom: theme.spacing.lg,
  },
  
  searchInputContainer: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  
  searchIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
    color: theme.colors.secondary,
  },
  
  searchInput: {
    flex: 1,
    color: theme.colors.primary,
    fontSize: 16,
    paddingVertical: theme.spacing.md,
  },
  
  clearIcon: {
    fontSize: 16,
    color: theme.colors.secondary,
    padding: theme.spacing.sm,
  },

  // Filters
  filtersContainer: {
    marginBottom: theme.spacing.lg,
  },
  
  filterTab: {
    backgroundColor: theme.colors.modal,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  
  filterTabActive: {
    backgroundColor: theme.colors.gradient1,
  },
  
  filterTabText: {
    color: theme.colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  
  filterTabTextActive: {
    color: theme.colors.primary,
  },

  // Results
  resultsSection: {
    marginTop: theme.spacing.md,
  },
  
  songsContainer: {
    gap: theme.spacing.sm,
  },
  
  emptyState: {
    backgroundColor: theme.colors.modal,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  
  emptyTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  emptySubtitle: {
    color: theme.colors.secondary,
    fontSize: 14,
    textAlign: 'center',
  },

  // Recent Searches
  section: {
    marginBottom: theme.spacing.xl,
  },
  
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.modal,
  },
  
  recentIcon: {
    fontSize: 16,
    marginRight: theme.spacing.md,
    color: theme.colors.secondary,
  },
  
  recentText: {
    flex: 1,
    color: theme.colors.primary,
    fontSize: 16,
  },
  
  removeButton: {
    padding: theme.spacing.sm,
  },
  
  removeIcon: {
    fontSize: 16,
    color: theme.colors.secondary,
  },

  // Genres
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  genreCard: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    justifyContent: 'space-between',
  },
  
  genreEmoji: {
    fontSize: 32,
  },
  
  genreName: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  // Actions
  actionCard: {
    backgroundColor: theme.colors.gradient1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  actionCardSecondary: {
    backgroundColor: theme.colors.modal,
  },
  
  actionIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  
  actionContent: {
    flex: 1,
  },
  
  actionTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  actionSubtitle: {
    color: theme.colors.primary,
    fontSize: 14,
    opacity: 0.8,
  },
});

export default SearchScreen;