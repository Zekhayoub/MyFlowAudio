import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Camera, CameraView } from 'expo-camera';
import Header from '../../src/components/common/Header';
import mockData from '../../src/data/mockData';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const AccountScreen: React.FC = () => {
  // États pour la caméra
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>('back');

  // Demander les permissions au montage du composant
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Calcul des statistiques utilisateur
  const userStats = {
    totalSongs: mockData.songs.length,
    totalPlaylists: mockData.playlists.length,
    totalPlaytime: mockData.songs.reduce((total, song) => total + (song.duration || 0), 0),
    likedSongs: mockData.songs.filter(song => song.play_count > 2000).length,
  };

  // Formatage du temps total d'écoute
  const formatPlaytime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  // Handler pour ouvrir la caméra
  const handleOpenCamera = () => {
    if (hasPermission === null) {
      Alert.alert('Permissions', 'Vérification des permissions en cours...');
      return;
    }
    if (hasPermission === false) {
      Alert.alert('Permission refusée', 'L\'accès à la caméra a été refusé.');
      return;
    }
    setShowCamera(true);
  };

  // Handler pour changer de caméra
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Handlers existants
  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleViewPlaylists = () => {
    router.push('/(drawer)/');
  };

  const handleViewLiked = () => {
    router.push('/(drawer)/liked');
  };

  const handleLocationSettings = () => {
    alert('Géolocalisation sera disponible bientôt !');
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Mon Compte" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          
          {/* Section Profil */}
          <View style={styles.profileSection}>
            {/* Container Avatar avec bouton caméra */}
            <View style={styles.avatarWrapper}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {mockData.user.username?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              </View>
              
              {/* Bouton Caméra */}
              <Pressable 
                style={styles.cameraButton} 
                onPress={handleOpenCamera}
              >
                <Text style={styles.cameraIcon}>📷</Text>
              </Pressable>
            </View>
            
            {/* Infos utilisateur */}
            <View style={styles.userInfo}>
              <Text style={[theme.typography.h2, styles.username]}>
                {mockData.user.username || 'Utilisateur'}
              </Text>
              <Text style={[theme.typography.caption, styles.email]}>
                {mockData.user.email}
              </Text>
              
              {/* Badge Premium */}
              {mockData.user.is_premium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>⭐ Premium</Text>
                </View>
              )}
            </View>
            
            {/* Bouton Modifier */}
            <Pressable style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Modifier</Text>
            </Pressable>
          </View>

          {/* Statistiques */}
          <Text style={globalStyles.sectionTitle}>Mes statistiques</Text>
          
          <View style={globalStyles.grid2}>
            {/* Total de chansons */}
            <View style={globalStyles.gridItem2}>
              <View style={[globalStyles.card, styles.statCard]}>
                <Text style={styles.statNumber}>{userStats.totalSongs}</Text>
                <Text style={[theme.typography.caption, styles.statLabel]}>
                  Chansons
                </Text>
                <Text style={styles.statIcon}>🎵</Text>
              </View>
            </View>
            
            {/* Total playlists */}
            <View style={globalStyles.gridItem2}>
              <View style={[globalStyles.card, styles.statCard]}>
                <Text style={styles.statNumber}>{userStats.totalPlaylists}</Text>
                <Text style={[theme.typography.caption, styles.statLabel]}>
                  Playlists
                </Text>
                <Text style={styles.statIcon}>📁</Text>
              </View>
            </View>
            
            {/* Temps d'écoute */}
            <View style={globalStyles.gridItem2}>
              <View style={[globalStyles.card, styles.statCard]}>
                <Text style={styles.statNumber}>{formatPlaytime(userStats.totalPlaytime)}</Text>
                <Text style={[theme.typography.caption, styles.statLabel]}>
                  Temps d'écoute
                </Text>
                <Text style={styles.statIcon}>⏰</Text>
              </View>
            </View>
            
            {/* Chansons aimées */}
            <View style={globalStyles.gridItem2}>
              <View style={[globalStyles.card, styles.statCard]}>
                <Text style={styles.statNumber}>{userStats.likedSongs}</Text>
                <Text style={[theme.typography.caption, styles.statLabel]}>
                  Favoris
                </Text>
                <Text style={styles.statIcon}>❤️</Text>
              </View>
            </View>
          </View>

          {/* Actions rapides */}
          <Text style={globalStyles.sectionTitle}>Actions rapides</Text>
          
          <View style={styles.actionsContainer}>
            {/* Mes Playlists */}
            <Pressable style={styles.actionItem} onPress={handleViewPlaylists}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>📁</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={[theme.typography.body, styles.actionTitle]}>
                  Mes Playlists
                </Text>
                <Text style={[theme.typography.caption, styles.actionSubtitle]}>
                  {userStats.totalPlaylists} playlists créées
                </Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </Pressable>
            
            {/* Chansons aimées */}
            <Pressable style={styles.actionItem} onPress={handleViewLiked}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>❤️</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={[theme.typography.body, styles.actionTitle]}>
                  Chansons aimées
                </Text>
                <Text style={[theme.typography.caption, styles.actionSubtitle]}>
                  {userStats.likedSongs} titres favoris
                </Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </Pressable>
            
            {/* Localisation */}
            <Pressable style={styles.actionItem} onPress={handleLocationSettings}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>📍</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={[theme.typography.body, styles.actionTitle]}>
                  Localisation
                </Text>
                <Text style={[theme.typography.caption, styles.actionSubtitle]}>
                  Musique locale à proximité
                </Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </Pressable>
          </View>

          {/* Informations du compte */}
          <Text style={globalStyles.sectionTitle}>Informations</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={[theme.typography.caption, styles.infoLabel]}>
                Membre depuis
              </Text>
              <Text style={[theme.typography.body, styles.infoValue]}>
                {new Date(mockData.user.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long'
                })}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[theme.typography.caption, styles.infoLabel]}>
                Type de compte
              </Text>
              <Text style={[theme.typography.body, styles.infoValue]}>
                {mockData.user.is_premium ? 'Premium' : 'Gratuit'}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[theme.typography.caption, styles.infoLabel]}>
                Version de l'app
              </Text>
              <Text style={[theme.typography.body, styles.infoValue]}>
                1.0.0
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Modal Caméra */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.cameraOverlay}>
              {/* Header avec bouton retour */}
              <View style={styles.cameraHeader}>
                <Pressable 
                  style={styles.closeButton}
                  onPress={() => setShowCamera(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
                <Text style={styles.cameraTitle}>Caméra</Text>
                <View style={{ width: 40 }} />
              </View>

              {/* Contrôles en bas */}
              <View style={styles.cameraControls}>
                {/* Bouton flip camera */}
                <Pressable 
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.flipIcon}>🔄</Text>
                </Pressable>

                {/* Texte informatif */}
                <Text style={styles.infoText}>Caméra active</Text>

                {/* Placeholder pour l'équilibre */}
                <View style={{ width: 50 }} />
              </View>
            </View>
          </CameraView>
        </View>
      </Modal>
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

  // Section Profil
  profileSection: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  
  avatarWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  
  avatarContainer: {
    position: 'relative',
  },
  
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.gradient1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  
  // Bouton caméra
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gradient2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.modal,
    ...theme.shadows.md,
  },
  
  cameraIcon: {
    fontSize: 20,
  },
  
  userInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  
  username: {
    marginBottom: theme.spacing.xs,
  },
  
  email: {
    marginBottom: theme.spacing.sm,
  },
  
  premiumBadge: {
    backgroundColor: theme.colors.gradient2,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  
  premiumText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  
  editButton: {
    backgroundColor: theme.colors.button_and_input,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  
  editButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // Statistiques
  statCard: {
    alignItems: 'center',
    position: 'relative',
    minHeight: 100,
    justifyContent: 'center',
  },
  
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  
  statLabel: {
    textAlign: 'center',
  },
  
  statIcon: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    fontSize: 20,
    opacity: 0.5,
  },

  // Actions
  actionsContainer: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  
  actionItem: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  actionEmoji: {
    fontSize: 24,
  },
  
  actionContent: {
    flex: 1,
  },
  
  actionTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  
  actionSubtitle: {
    opacity: 0.7,
  },
  
  actionArrow: {
    fontSize: 18,
    color: theme.colors.secondary,
  },

  // Informations
  infoContainer: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.button_and_input,
  },
  
  infoLabel: {
    opacity: 0.7,
  },
  
  infoValue: {
    fontWeight: '600',
  },

  // Styles pour la caméra
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  camera: {
    flex: 1,
  },
  
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  cameraTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  flipIcon: {
    fontSize: 24,
  },
  
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AccountScreen;