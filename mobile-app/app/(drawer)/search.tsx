import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { debounce } from 'lodash';
import Header from '../../src/components/common/Header';
import SongCard from '../../src/components/common/SongCard';
import { Song } from '../../src/types';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';
import { useAudio } from '../../src/contexts/AudioContext';
import { songsApi } from '../../src/services/api/songs';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { setPlaylist, playTrack } = useAudio();

  // Charger toutes les chansons au montage pour les suggestions
  useEffect(() => {
    loadAllSongs();
  }, []);

  const loadAllSongs = async () => {
    try {
      const songs = await songsApi.getAll();
      setAllSongs(songs);
    } catch (error) {
      console.error('Error loading songs:', error);
    }
  };

  // Fonction de recherche avec debounce
  const performSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length === 0) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        // Utiliser l'API Deezer via l'app web
        const results = await songsApi.searchDeezer(query);
        
        // Transformer les résultats Deezer au format Song
        const formattedResults = results.map((item: any, index: number) => ({
          id: item.id?.toString() || `deezer-${index}`,
          user_id: 'deezer',
          title: item.title || 'Titre inconnu',
          author: item.artist?.name || 'Artiste inconnu',
          album: item.album?.title || '',
          image_path: item.album?.cover_medium || item.artist?.picture_medium || '',
          song_path: item.preview || '',
          created_at: new Date().toISOString(),
          duration: item.duration || 30, // Deezer renvoie la durée en secondes
        }));
        
        setSearchResults(formattedResults);
      } catch (error) {
        console.error('Search error:', error);
        setError('Impossible de se connecter à Deezer');
        
        // Fallback : recherche locale dans les chansons déjà chargées
        const localResults = allSongs.filter(song => {
          const q = query.toLowerCase();
          return (
            song.title.toLowerCase().includes(q) ||
            song.author.toLowerCase().includes(q) ||
            (song.album && song.album.toLowerCase().includes(q))
          );
        });
        
        if (localResults.length > 0) {
          setSearchResults(localResults);
          setError('Recherche Deezer indisponible - Résultats locaux affichés');
        } else {
          setSearchResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [allSongs]
  );

  // Effect pour déclencher la recherche
  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery, performSearch]);

  // Filtrer les résultats selon le filtre actif
  const filteredResults = searchResults.filter(song => {
    if (activeFilter === 'all') return true;
    // Pour l'instant, on affiche toutes les chansons pour tous les filtres
    // TODO: Implémenter les filtres artists et albums quand l'API le supportera
    return true;
  });

  // Obtenir des recherches récentes à partir des chansons
  const recentSearches = [...new Set(allSongs.slice(0, 10).map(s => s.author))].slice(0, 4);
  
  // Genres populaires basés sur les artistes
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
    console.log('Playing:', song.title, 'by', song.author);
    
    // Si c'est une chanson Deezer (preview de 30 secondes)
    if (song.user_id === 'deezer' && song.song_path) {
      // Créer une playlist temporaire avec juste cette chanson
      setPlaylist([song]);
      playTrack(0);
    } else {
      // Chanson locale : utiliser la playlist complète
      const playlist = searchQuery ? searchResults : allSongs;
      const index = playlist.findIndex(s => s.id === song.id);
      
      if (index !== -1) {
        setPlaylist(playlist);
        playTrack(index);
      }
    }
  };

  const handleSearchSelect = (search: string) => {
    setSearchQuery(search);
  };

  const handleGenrePress = (genre: string) => {
    setSearchQuery(genre);
  };

  const handleSurpriseMe = () => {
    // Jouer une chanson aléatoire
    if (allSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      const randomSong = allSongs[randomIndex];
      setPlaylist(allSongs);
      playTrack(randomIndex);
    }
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
                autoCorrect={false}
                autoCapitalize="none"
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
                {isSearching ? 'Recherche...' : `Résultats (${filteredResults.length})`}
              </Text>
              
              {isSearching ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={theme.colors.gradient1} />
                </View>
              ) : error ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>⚠️</Text>
                  <Text style={styles.emptyTitle}>{error}</Text>
                  <Text style={styles.emptySubtitle}>
                    Résultats de recherche locale
                  </Text>
                </View>
              ) : filteredResults.length > 0 ? (
                <View style={styles.songsContainer}>
                  {filteredResults.map((song) => (
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
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <Text style={globalStyles.sectionTitle}>Artistes populaires</Text>
                  
                  {recentSearches.map((search, index) => (
                    <Pressable
                      key={index}
                      style={styles.recentItem}
                      onPress={() => handleSearchSelect(search)}
                    >
                      <Text style={styles.recentIcon}>👤</Text>
                      <Text style={styles.recentText}>{search}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

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
                
                <Pressable style={styles.actionCard} onPress={handleSurpriseMe}>
                  <Text style={styles.actionIcon}>🎲</Text>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Surprise-moi !</Text>
                    <Text style={styles.actionSubtitle}>
                      Jouer une chanson aléatoire
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={[styles.actionCard, styles.actionCardSecondary]}>
                  <Text style={styles.actionIcon}>📻</Text>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Radio</Text>
                    <Text style={styles.actionSubtitle}>
                      Bientôt disponible
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
  
  loadingContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
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