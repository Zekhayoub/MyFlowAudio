import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../src/components/common/Header';
import theme from '../../../src/styles/theme';
import globalStyles from '../../../src/styles/globalStyles';

export default function PlaylistEditScreen() {
  return (
    <View style={globalStyles.container}>
      <Header title="Éditer Playlist" />
      <View style={styles.content}>
        <Text style={styles.text}>Page d'édition de playlist</Text>
        <Text style={styles.subtext}>Cette page sera implémentée plus tard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtext: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
});