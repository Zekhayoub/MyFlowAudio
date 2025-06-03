import { StyleSheet, Platform } from 'react-native';
import theme from './theme';

// Helper pour créer des shadows cross-platform
const createShadow = (elevation: number) => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${0.08 + elevation * 0.02})`,
    };
  }
  
  // Pour iOS
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: 0.08 + elevation * 0.02,
      shadowRadius: elevation,
    };
  }
  
  // Pour Android
  return {
    elevation: elevation,
  };
};

const globalStyles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Header
  header: {
    backgroundColor: theme.colors.gradient1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    ...createShadow(4),
  },

  headerTitle: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },

  // Cards
  card: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...createShadow(2),
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  cardContent: {
    flex: 1,
  },

  // Section Titles
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },

  // Grids
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.sm,
  },

  gridItem: {
    width: '50%',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  // Grid 2 colonnes
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },

  gridItem2: {
    width: '50%',
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },

  // Buttons
  button: {
    backgroundColor: theme.colors.gradient1,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...createShadow(2),
  },

  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonSecondary: {
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSecondaryText: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Input
  input: {
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.primary,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  listItemContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.primary,
    marginBottom: 2,
  },

  listItemSubtitle: {
    fontSize: 14,
    color: theme.colors.secondary,
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },

  emptyStateText: {
    fontSize: 16,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Error
  errorContainer: {
    backgroundColor: '#fee',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },

  errorText: {
    color: '#c00',
    fontSize: 14,
  },
});

export default globalStyles;