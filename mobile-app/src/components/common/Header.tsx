import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { openDrawer } from '../../../app/(drawer)/_layout';
import { router } from 'expo-router';
import theme from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'MusicApp', 
  showMenu = true 
}) => {
  const handleMenuPress = () => {
    openDrawer();
  };

  const handleLogoPress = () => {
    // Navigation vers la page d'accueil
    router.push('/(drawer)/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.header}>
        {/* Menu hamburger à gauche */}
        {showMenu && (
          <Pressable 
            style={styles.menuButton}
            onPress={handleMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
        )}

        {/* Spacer pour pousser le logo à droite */}
        <View style={styles.spacer} />

        {/* Logo + titre à droite (cliquable) */}
        <Pressable 
          style={styles.logoContainer}
          onPress={handleLogoPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.musicIcon}>🎵</Text>
          <Text style={globalStyles.headerTitle}>{title}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.gradient1,
  },
  
  spacer: {
    flex: 1,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  
  musicIcon: {
    fontSize: 28,
    color: theme.colors.primary,
  },
  
  menuButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  
  menuIcon: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default Header;