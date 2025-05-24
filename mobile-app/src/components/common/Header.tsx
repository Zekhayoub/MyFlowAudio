
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.header}>
        {/* Logo + titre */}
        <View style={styles.logoContainer}>
          <Text style={styles.musicIcon}>🎵</Text>
          <Text style={globalStyles.headerTitle}>{title}</Text>
        </View>

        {/* Menu hamburger */}
        {showMenu && (
          <Pressable 
            style={styles.menuButton}
            onPress={openDrawer}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.gradient1,
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