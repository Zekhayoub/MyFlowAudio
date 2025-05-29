import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { View, Text, Modal, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../src/providers/AuthProvider';
import { LikesProvider } from '../../src/contexts/LikesContext';
import theme from '../../src/styles/theme';

// Simuler le contexte de navigation pour DrawerActions
let modalVisible = false;
let setModalVisible: ((visible: boolean) => void) | null = null;

// Export pour être utilisé par le Header
export const openDrawer = () => {
  if (setModalVisible) {
    setModalVisible(true);
  }
};

export default function DrawerLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { signOut } = useAuth();
  
  // Connecter la fonction globale
  React.useEffect(() => {
    setModalVisible = setIsModalVisible;
    return () => {
      setModalVisible = null;
    };
  }, []);

  const menuItems = [
    { id: 'index', label: 'Accueil', icon: '🏠', route: '/(drawer)/' },
    { id: 'liked', label: 'Liked Songs', icon: '😍', route: '/(drawer)/liked' },
    { id: 'search', label: 'Recherche', icon: '🔍', route: '/(drawer)/search' },
    { id: 'account', label: 'Compte', icon: '👤', route: '/(drawer)/account' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️', route: '/(drawer)/settings' },
  ];

  const handleMenuPress = (route: string) => {
    console.log('Navigation vers:', route);
    setIsModalVisible(false);
    router.push(route as any);
  };

  const handleLogout = async () => {
    try {
      setIsModalVisible(false);
      await signOut();
      // Forcer la navigation vers login après déconnexion
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <LikesProvider>
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="liked" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
        </Stack>

        {/* Menu Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalContainer}>
              {/* Header du menu */}
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Menu</Text>
                <Pressable 
                  style={styles.closeButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              {/* Items du menu */}
              <View style={styles.menuItems}>
                {menuItems.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.menuItem,
                      item.id === 'index' && styles.menuItemActive
                    ]}
                    onPress={() => handleMenuPress(item.route)}
                  >
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text style={[
                      styles.menuLabel,
                      item.id === 'index' && styles.menuLabelActive
                    ]}>
                      {item.label}
                    </Text>
                    {item.id === 'liked' && (
                      <View style={styles.playButton}>
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                    )}
                  </Pressable>
                ))}
                
                {/* Séparateur */}
                <View style={styles.separator} />
                
                {/* Bouton Logout */}
                <Pressable
                  style={styles.menuItem}
                  onPress={handleLogout}
                >
                  <Text style={styles.menuIcon}>🚪</Text>
                  <Text style={styles.menuLabel}>Logout</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </>
    </LikesProvider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    maxWidth: 300,
  },
  
  menuHeader: {
    backgroundColor: theme.colors.gradient1,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  menuTitle: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  
  closeButton: {
    padding: theme.spacing.sm,
  },
  
  closeIcon: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  menuItems: {
    flex: 1,
    padding: theme.spacing.md,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  
  menuItemActive: {
    backgroundColor: theme.colors.gradient1,
  },
  
  menuIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
    width: 32,
  },
  
  menuLabel: {
    flex: 1,
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  
  menuLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gradient2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  playIcon: {
    color: theme.colors.primary,
    fontSize: 14,
    marginLeft: 2,
  },
  
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
});