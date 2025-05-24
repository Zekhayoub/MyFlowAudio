
import colors from './colors';
import { TextStyle, ViewStyle } from 'react-native';

interface Theme {
  colors: typeof colors;
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    button: TextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
  };
}

export const theme: Theme = {
  colors,
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.primary,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.primary,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.primary,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.primary,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.secondary,
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: colors.background0,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    md: {
      shadowColor: colors.background0,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: colors.background0,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export default theme;