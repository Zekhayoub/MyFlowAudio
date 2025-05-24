
import { StyleSheet } from 'react-native';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  // Conteneurs
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background0,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },

  // Header styles (inspiré de votre Header web)
  header: {
    backgroundColor: theme.colors.gradient1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },

  // Cards (inspiré de vos ListItem et SongItem)
  card: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    ...theme.shadows.sm,
  },

  playlistCard: {
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    margin: theme.spacing.xs,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  songCard: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    margin: theme.spacing.xs,
    ...theme.shadows.sm,
  },

  // Buttons (inspiré de votre design web)
  primaryButton: {
    backgroundColor: theme.colors.gradient1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButton: {
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text styles
  welcomeText: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.md,
  },

  sectionTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },

  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Grid layouts (inspiré de votre CSS grid web)
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem2: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },

  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem3: {
    width: '31%',
    marginBottom: theme.spacing.md,
  },
});

export default globalStyles;